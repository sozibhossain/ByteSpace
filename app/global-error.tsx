"use client";

/** Root-layout failures cannot assume fonts, providers or application chrome exist. */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: "48px", textAlign: "center" }}>
        <main>
          <h1>Something went wrong</h1>
          <p>Please try loading ByteSpace again.</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
