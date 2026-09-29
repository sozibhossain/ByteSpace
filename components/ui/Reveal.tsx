"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ANIMATION } from "@/constants/animations";

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
      whileInView={
        reduced ? { y: 0, opacity: 1 } : { y: [ANIMATION.reveal.distance, 0], opacity: [0.92, 1] }
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.reveal.duration,
        ease: ANIMATION.ease,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
