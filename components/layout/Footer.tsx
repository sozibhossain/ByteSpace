"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Brand } from "./Brand";
import { Button } from "@/components/ui/Button";

const columns = [
  [
    { name: "Featured Courses", href: "/courses" },
    { name: "Featured Categories", href: "/courses" },
    { name: "Business", href: "/courses?category=Freelance+%26+Entrepreneurship" },
    { name: "IT", href: "/courses?category=Web+Development" },
    { name: "Design", href: "/courses?category=UI%2FUX+Design" },
  ],
  ["Development", "Marketing", "Photography", "Finance", "Sport"].map((name) => ({
    name,
    href: `/courses?search=${encodeURIComponent(name)}`,
  })),
  [
    { name: "Become a Creator", href: "/register" },
    { name: "Affiliate Program", href: "/information/affiliate" },
    { name: "Contact", href: "/information/contact" },
    { name: "Help", href: "/information/help" },
    { name: "About", href: "/information/about" },
  ],
];
/** Newsletter is deliberately a demo until a subscription endpoint is configured. */
export function Footer() {
  const [message, setMessage] = useState("");
  function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Thanks for your interest! Newsletter subscriptions will be available when ByteSpace launches.",
    );
  }
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-newsletter">
            <Brand />
            <p>Stay up to date with our latest features and releases by joining our newsletter.</p>
            <form className="newsletter-form" onSubmit={subscribe}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="newsletter-consent">
              By subscribing, you agree to our{" "}
              <Link href="/information/privacy">Privacy Policy</Link> and consent to receive updates
              from our company.
            </p>
            {message && <p role="status">{message}</p>}
          </div>
          <nav aria-label="Footer" className="footer-links">
            {columns.map((column, i) => (
              <div key={i}>
                {column.map((l) => (
                  <Link className="block" key={l.name} href={l.href}>
                    {l.name}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ByteSpace. All rights reserved.</p>
          <div>
            <Link href="/information/privacy">Privacy Policy</Link>
            <Link href="/information/terms">Terms of Service</Link>
            <Link href="/information/cookies">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
