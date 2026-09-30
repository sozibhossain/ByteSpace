"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Brand } from "@/components/layout/Brand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CourseArtwork, HappyStudents, Shape } from "@/components/ui/MarketingArt";
import { authenticate } from "@/services/auth";
import { safeErrorMessage } from "@/services/errors";

type FieldErrors = Partial<Record<"name" | "email" | "password", string>>;
/** One form handles both auth screens, accessible validation and explicit demo feedback. */
export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const register = mode === "register";
  const [errors, setErrors] = useState<FieldErrors>({});
  const [socialMessage, setSocialMessage] = useState("");
  const mutation = useMutation({
    mutationFn: (input: { email: string; password: string; name?: string }) =>
      authenticate(mode, input),
  });
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mutation.isPending) return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const name = String(data.get("name") || "").trim();
    const next: FieldErrors = {};
    if (register && name.length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (password.length < 8) next.password = "Use a password with at least 8 characters.";
    setErrors(next);
    mutation.reset();
    const first = Object.keys(next)[0];
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLInputElement)?.focus();
      return;
    }
    mutation.mutate({ email, password, ...(register ? { name } : {}) });
  }
  return (
    <main id="main-content" className="auth-page grid-blue">
      <div className="container">
        <Brand iconOnly />
        <div className="auth-layout">
          <section className="auth-intro">
            <h2>{register ? "Sign up and come in" : "Sign in with ease"}</h2>
            <p>
              {register
                ? "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost."
                : "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."}
            </p>
            <div className="auth-art">
              <div className="auth-card-back">
                <CourseArtwork index={1} />
              </div>
              <div className="auth-card-front">
                <CourseArtwork index={2} />
              </div>
              <Shape file="shape-lime-ring" className="auth-ring" />
              <Shape eager file="shape-yellow-pyramid" className="auth-pyramid" />
              <Shape file="shape-white-spring" className="auth-spring" />
              <div className="floating-stat" aria-hidden>
                <HappyStudents avatarCount={7} />
              </div>
            </div>
          </section>
          <Reveal className="auth-form-panel">
            <p className="auth-eyebrow">{register ? "Create an Account" : "Sign In"}</p>
            <h1>
              {register ? (
                <>
                  Welcome to
                  <br />
                  ByteSpace
                </>
              ) : (
                "Welcome Back"
              )}
            </h1>
            <form noValidate onSubmit={submit} aria-label={register ? "Create account" : "Sign in"}>
              {register && (
                <label className="form-field">
                  <span>Full Name</span>
                  <input
                    aria-label="Full Name"
                    name="name"
                    placeholder="Jamie Davis"
                    autoComplete="name"
                    maxLength={100}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </label>
              )}
              <label className="form-field">
                <span>Email</span>
                <input
                  aria-label="Email"
                  name="email"
                  type="email"
                  placeholder="designer@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="field-error">
                    {errors.email}
                  </p>
                )}
              </label>
              <label className="form-field">
                <span>Password</span>
                <input
                  aria-label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  autoComplete={register ? "new-password" : "current-password"}
                  minLength={8}
                  maxLength={128}
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && (
                  <p id="password-error" className="field-error">
                    {errors.password}
                  </p>
                )}
              </label>
              <div className="form-submit">
                <Button type="submit" isLoading={mutation.isPending}>
                  {register ? "Continue" : "Sign In"}
                </Button>
              </div>
              {mutation.isError && (
                <p role="alert" className="feedback">
                  {safeErrorMessage(mutation.error)}
                </p>
              )}
              {mutation.isSuccess && (
                <p role="status" className="feedback">
                  {mutation.data.message}
                </p>
              )}
            </form>
            {!register && (
              <>
                <div className="auth-divider">or</div>
                <div className="social-buttons">
                  <button
                    aria-label="Sign in with Facebook"
                    className="social-button"
                    onClick={() =>
                      setSocialMessage(
                        "Facebook sign-in will be available when authentication is connected.",
                      )
                    }
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M24 12a12 12 0 1 0-13.875 11.855v-8.386H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.386A12.003 12.003 0 0 0 24 12Z"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Sign in with Google"
                    className="social-button"
                    onClick={() =>
                      setSocialMessage(
                        "Google sign-in will be available when authentication is connected.",
                      )
                    }
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36ZM12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.9.6-2.04.96-3.37.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.59A10 10 0 0 0 12 22ZM6.4 13.92a6 6 0 0 1 0-3.84V7.49H3.06a10 10 0 0 0 0 9.02l3.34-2.59ZM12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.34 2.59A5.99 5.99 0 0 1 12 5.96Z"
                      />
                    </svg>
                  </button>
                </div>
                {socialMessage && (
                  <p role="status" className="demo-note text-center mt-4">
                    {socialMessage}
                  </p>
                )}
              </>
            )}
            <p className="auth-switch">
              {register ? "Already have an account? " : "New user? "}
              <Link href={register ? "/login" : "/register"}>
                {register ? "Login" : "Create an account"}
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
