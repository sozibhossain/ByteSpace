"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QueryError } from "@/components/ui/QueryState";

/** Unexpected route failures offer recovery without exposing server error details. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container py-24">
        <QueryError error={error} onRetry={reset} />
      </main>
      <Footer />
    </>
  );
}
