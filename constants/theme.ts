/** Component variants reference CSS tokens; globals.css owns visual values. */
export const THEME = {
  buttons: {
    variants: {
      lime: "bg-brand-lime text-brand-black hover:bg-[var(--lime-hover)]",
      blue: "bg-brand-blue text-white hover:bg-[var(--blue-hover)]",
      secondary: "bg-brand-surface text-text-primary hover:bg-[var(--surface-hover)]",
      outline: "border border-[var(--border)] bg-white text-text-primary hover:bg-brand-surface",
      ghost: "bg-transparent text-text-primary hover:bg-brand-surface",
    },
    sizes: {
      sm: "min-h-9 px-4 text-sm",
      md: "min-h-12 px-6 text-base",
      lg: "min-h-14 px-8 text-base",
    },
  },
} as const;
