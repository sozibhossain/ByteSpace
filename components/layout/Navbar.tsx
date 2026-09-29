"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Brand } from "./Brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/creators", label: "Creators" },
];
/** Shared navigation with keyboard-accessible mobile disclosure and route feedback. */
export function Navbar() {
  const path = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const open = menuPath === path;
  return (
    <header
      className="site-header grid-blue"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setMenuPath(null);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/login">Sign In</Link>
          <Link href="/register">Join Us</Link>
          <Link href="/information/enrollment" aria-label="Enrollment information">
            <ShoppingBag size={20} aria-hidden />
          </Link>
        </div>
        <button
          ref={toggleRef}
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setMenuPath(open ? null : path)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[
              ...links,
              { href: "/login", label: "Sign In" },
              { href: "/register", label: "Join Us" },
            ].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuPath(null)}>
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
