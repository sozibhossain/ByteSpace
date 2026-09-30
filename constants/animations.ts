/** Shared timings keep motion consistent; continuous decorative loops live in CSS. */
export const ANIMATION = {
  ease: [0.22, 1, 0.36, 1] as const,
  reveal: { duration: 0.5, distance: 14 },
} as const;
