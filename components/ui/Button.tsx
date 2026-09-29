import React from "react";
import { cn } from "@/lib/utils";
import { THEME } from "@/constants/theme";

/**
 * Button component visual style variants
 */
export type ButtonVariant = keyof typeof THEME.buttons.variants;

/**
 * Button component size scale
 */
export type ButtonSize = keyof typeof THEME.buttons.sizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant style (defaults to 'lime') */
  variant?: ButtonVariant;
  /** Size scale (defaults to 'md') */
  size?: ButtonSize;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Optional icon rendered on the left of button text */
  leftIcon?: React.ReactNode;
  /** Optional icon rendered on the right of button text */
  rightIcon?: React.ReactNode;
  /** Whether the button should stretch to full width */
  fullWidth?: boolean;
}

/**
 * ==============================================================================
 * REUSABLE ENTERPRISE BUTTON COMPONENT
 * ==============================================================================
 * 
 * Production-ready, fully accessible, and type-safe Button component.
 * All styling, colors, and dimensions are strictly driven by centralized `THEME` tokens.
 * 
 * @example
 * ```tsx
 * <Button variant="lime" size="lg" onClick={handleJoin}>Join as Creator</Button>
 * <Button variant="blue" size="md">Enroll Now</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "lime",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Fetch variant and size classes from centralized theme configuration
    const variantClass = THEME.buttons.variants[variant] || THEME.buttons.variants.lime;
    const sizeClass = THEME.buttons.sizes[size] || THEME.buttons.sizes.md;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base flexbox layout and smooth transitions
          "inline-flex items-center justify-center gap-2 cursor-pointer select-none",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#CBFC01] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          // Theme token classes
          sizeClass,
          variantClass,
          fullWidth ? "w-full" : "w-auto",
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon Slot */}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}

        {/* Button Content Label */}
        <span>{children}</span>

        {/* Right Icon Slot */}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
