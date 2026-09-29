import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { LoaderCircle } from "lucide-react";
import { THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";

export type ButtonVariant = keyof typeof THEME.buttons.variants;
export type ButtonSize = keyof typeof THEME.buttons.sizes;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

/** Shared button: explicit submit opt-in, accessible busy state, and token styles. */
export function Button({
  variant = "lime",
  size = "md",
  type = "button",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  children,
  disabled,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        "button",
        THEME.buttons.variants[variant],
        THEME.buttons.sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {isLoading ? <LoaderCircle className="animate-spin" size={18} aria-hidden /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
      {isLoading && <span className="sr-only">Loading</span>}
    </button>
  );
}
