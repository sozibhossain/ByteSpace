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
            <div className="auth-art" aria-hidden inert>
              <div className="auth-card-back">
                <CourseArtwork index={1} />
              </div>
              <div className="auth-card-front">
                <CourseArtwork index={2} />
              </div>
              <Shape file="shape-yellow-torus-arch" className="!left-8 !top-16 !w-40 !h-40" />
              <Shape eager file="shape-yellow-pyramid" className="!left-0 !bottom-0 !w-40 !h-40" />
              <Shape file="shape-white-spring" className="!right-0 !bottom-20 !w-36 !h-40" />
              <div className="floating-stat">
                <HappyStudents />
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
                    f
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
                    G
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
