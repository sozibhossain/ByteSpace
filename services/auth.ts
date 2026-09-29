import { z } from "zod";
import { request } from "./http/client";
import { ServiceError } from "./errors";
import { ENDPOINTS } from "@/constants/endpoints";

export interface AuthInput {
  email: string;
  password: string;
  name?: string;
}
/** Credentials never enter fixtures, localStorage, query keys or logs. */
export async function authenticate(mode: "login" | "register", input: AuthInput) {
  if (!input.email || !input.password)
    throw new ServiceError("VALIDATION", "Please enter your email and password.");
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "api") {
    const result = await request(ENDPOINTS.auth(mode), z.object({ message: z.string() }), {
      method: "POST",
      body: JSON.stringify(input),
    });
    return { ...result, demo: false };
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  return {
    demo: true,
    message:
      "Your form is valid. This preview does not create an account or sign you in. Authentication will be available when the platform launches.",
  };
}
