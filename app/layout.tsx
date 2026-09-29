import type { Metadata } from "next";
import "@fontsource/poppins/600.css";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: { default: "ByteSpace — Learn, Create, Grow", template: "%s | ByteSpace" },
  description:
    "Discover your passion, build your skills, and learn from creative experts at ByteSpace.",
  icons: { icon: "/assets/brand/logo-icon.png" },
};

/** Server root owns metadata and document semantics; providers isolate client state. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
