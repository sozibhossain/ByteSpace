import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

/**
 * ==============================================================================
 * GOOGLE FONT CONFIGURATION (POPPINS - DISPLAY / HEADINGS)
 * ==============================================================================
 * Loaded via Next.js font optimization to ensure zero layout shift (CLS) 
 * and automatic font file preloading.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * ==============================================================================
 * APPLICATION METADATA
 * ==============================================================================
 */
export const metadata: Metadata = {
  title: "ByteSpace — Online Learning Platform",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of online courses.",
  icons: {
    icon: "/assets/brand/logo-icon.png",
  },
};

/**
 * ==============================================================================
 * ROOT LAYOUT COMPONENT
 * ==============================================================================
 * Global HTML structure providing font CSS variables, base styling, and meta tags.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#242528]">
        {children}
      </body>
    </html>
  );
}
