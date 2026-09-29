/** Expected request failures retain machine-readable codes and safe UI messages. */
export class ServiceError extends Error {
  constructor(
    public code:
      | "NOT_FOUND"
      | "VALIDATION"
      | "UNAUTHORIZED"
      | "FORBIDDEN"
      | "NETWORK"
      | "TIMEOUT"
      | "SERVER"
      | "CONTRACT",
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}
export function shouldRetry(failureCount: number, error: Error) {
  return (
    failureCount < 2 &&
    error instanceof ServiceError &&
    ["NETWORK", "TIMEOUT", "SERVER"].includes(error.code)
  );
}
export function safeErrorMessage(error: unknown) {
  return error instanceof ServiceError ? error.message : "Something went wrong. Please try again.";
}
