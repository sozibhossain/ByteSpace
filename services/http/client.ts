import type { z } from "zod";
import { ServiceError } from "@/services/errors";

/** Central HTTP transport: status checks, timeout, cancellation and contract validation. */
export async function request<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestInit = {},
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new ServiceError("CONTRACT", "The API connection has not been configured.");
  const timeout = AbortSignal.timeout(10_000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  const headers = new Headers(options.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}${path}`, {
      ...options,
      credentials: "include",
      headers,
      signal,
    });
    if (!response.ok) {
      const code =
        response.status === 404
          ? "NOT_FOUND"
          : response.status === 401
            ? "UNAUTHORIZED"
            : response.status === 403
              ? "FORBIDDEN"
              : response.status >= 500
                ? "SERVER"
                : "VALIDATION";
      const messages = {
        NOT_FOUND: "This content could not be found.",
        UNAUTHORIZED: "Please sign in to continue.",
        FORBIDDEN: "You do not have permission to access this content.",
        SERVER: "The service is temporarily unavailable. Please try again.",
        VALIDATION: "We couldn't process your request. Please check your details.",
      };
      throw new ServiceError(code, messages[code], response.status);
    }
    const parsed = schema.safeParse(await response.json());
    if (!parsed.success)
      throw new ServiceError(
        "CONTRACT",
        "The service returned an unexpected response. Please try again later.",
      );
    return parsed.data;
  } catch (error) {
    if (options.signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    if (timeout.aborted)
      throw new ServiceError("TIMEOUT", "The request took too long. Please try again.");
    if (error instanceof ServiceError) throw error;
    if (error instanceof SyntaxError)
      throw new ServiceError("CONTRACT", "The service returned an unreadable response.");
    throw new ServiceError(
      "NETWORK",
      "Unable to connect. Please check your connection and try again.",
    );
  }
}
