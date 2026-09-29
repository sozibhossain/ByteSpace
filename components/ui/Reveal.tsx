"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { THEME } from "@/constants/theme";

/** Progressive enhancement: SSR content stays visible even before hydration. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [THEME.motion.distance, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: THEME.motion.duration, ease: THEME.motion.ease, delay }}
    >
      {children}
    </motion.div>
  );
}
