/**
 * ==============================================================================
 * BYTESPACE DESIGN SYSTEM - SINGLE SOURCE OF TRUTH (TOKENS & CONSTANTS)
 * ==============================================================================
 * 
 * Centralized design tokens defining typography, color palette, gradients,
 * effects, and button specifications extracted directly from the Figma designs.
 * Follows enterprise software engineering standards for type safety and scalability.
 */

export const THEME = {
  /**
   * --------------------------------------------------------------------------
   * 1. TYPOGRAPHY (Font families, sizes, line heights, and Figma presets)
   * --------------------------------------------------------------------------
   */
  typography: {
    // Core font families
    fonts: {
      /** Dedicated brand font for logo */
      logo: "var(--font-logo), 'Clash Display', sans-serif",
      /** Display and heading font */
      heading: "var(--font-heading), 'Poppins', sans-serif",
      /** Body, navigation, and component text font */
      body: "var(--font-body), 'Satoshi', sans-serif",
    },

    // Exact Figma typography presets
    presets: {
      /**
       * 1. Logo Text
       * Clash Display | Bold (700) | 24px | 100% line-height | 0% letter-spacing
       */
      logo: {
        fontFamily: "var(--font-logo), 'Clash Display', sans-serif",
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "100%",
        letterSpacing: "0%",
      },

      /**
       * 2. Hero Primary Display Headline
       * Poppins | SemiBold (600) | 72px | 120% line-height | -1% letter-spacing | Center
       */
      heroDisplay: {
        fontFamily: "var(--font-heading), 'Poppins', sans-serif",
        fontWeight: "600",
        fontSize: "72px",
        lineHeight: "120%",
        letterSpacing: "-0.01em",
        textAlign: "center" as const,
      },

      /**
       * 3. Section Title / Heading (H2)
       * Poppins | SemiBold (600) | 44px | 120% line-height | -1% letter-spacing | Center
       */
      sectionHeading: {
        fontFamily: "var(--font-heading), 'Poppins', sans-serif",
        fontWeight: "600",
        fontSize: "44px",
        lineHeight: "120%",
        letterSpacing: "-0.01em",
        textAlign: "center" as const,
      },

      /**
       * 4. Card Title / Sub-heading
       * Satoshi | Medium (500) | 20px | 120% line-height | 0% letter-spacing
       */
      cardTitle: {
        fontFamily: "var(--font-body), 'Satoshi', sans-serif",
        fontWeight: "500",
        fontSize: "20px",
        lineHeight: "120%",
        letterSpacing: "0%",
      },

      /**
       * 5. Section Description / Lead Text
       * Satoshi | Regular (400) | 18px | 160% line-height | 0% letter-spacing | Center
       */
      bodyLead: {
        fontFamily: "var(--font-body), 'Satoshi', sans-serif",
        fontWeight: "400",
        fontSize: "18px",
        lineHeight: "160%",
        letterSpacing: "0%",
        textAlign: "center" as const,
      },

      /**
       * 6. Navbar Links, Buttons, and Filter Pills
       * Satoshi | Medium (500) | 16px | 120% line-height | 0% letter-spacing | Middle
       */
      navMedium: {
        fontFamily: "var(--font-body), 'Satoshi', sans-serif",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "120%",
        letterSpacing: "0%",
      },

      /**
       * 7. Badges, Status Tags, and Category Labels
       * Satoshi | Medium (500) | 12px | 120% line-height | 0% letter-spacing | Center
       */
      badgeMedium: {
        fontFamily: "var(--font-body), 'Satoshi', sans-serif",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "120%",
        letterSpacing: "0%",
      },

      /**
       * 8. Caption and Metadata Text (Lessons, Duration, Comments)
       * Satoshi | Regular (400) | 12px | 160% line-height | 0% letter-spacing
       */
      captionRegular: {
        fontFamily: "var(--font-body), 'Satoshi', sans-serif",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "160%",
        letterSpacing: "0%",
      },
    },

    // Standardized typography scale
    fontSize: {
      caption: "12px",
      sm: "14px",
      nav: "16px",
      body: "18px",
      card: "20px",
      logo: "24px",
      title: "44px",
      hero: "72px",
    },
  },

  /**
   * --------------------------------------------------------------------------
   * 2. COLOR PALETTE (Brand colors, surface backgrounds, and text shades)
   * --------------------------------------------------------------------------
   */
  colors: {
    // Brand identity colors
    brand: {
      /** ByteSpace primary electric blue */
      blue: "#003BE2",
      /** ByteSpace signature lime-green accent */
      lime: "#CBFC01",
      /** Electric purple accent */
      purple: "#711EE3",
      /** Light surface neutral */
      surface: "#F5F5F6",
      /** Pure white */
      white: "#FFFFFF",
      /** Pure black */
      black: "#000000",
    },

    // Exact text color shades
    text: {
      /** Primary dark charcoal body text */
      primary: "#242528",
      /** Secondary dark gray text */
      secondary: "#4F4F4F",
      /** Slate gray for card metadata (lessons, duration, comments) */
      slate: "#82868E",
      /** Muted light text for dark backgrounds */
      muted: "#D1D1D1",
      /** Pure white text */
      white: "#FFFFFF",
    },

    // Border tokens
    border: {
      lime: "#CBFC01",
      subtle: "rgba(36, 37, 40, 0.1)",
      light: "#E5E5E7",
    },
  },

  /**
   * --------------------------------------------------------------------------
   * 3. GRADIENTS & VISUAL EFFECTS
   * --------------------------------------------------------------------------
   */
  effects: {
    gradients: {
      /** Radial lime glow for accents and hero glow */
      radialLimeGlow:
        "radial-gradient(50% 50% at 50% 50%, rgba(203, 252, 1, 0.4) 0%, rgba(203, 252, 1, 0.092) 53%, rgba(203, 252, 1, 0.024) 75%, rgba(203, 252, 1, 0) 100%)",

      /** Subtle blue radial glow for card backgrounds */
      radialBlueSubtle:
        "radial-gradient(50% 50% at 50% 50%, rgba(0, 59, 226, 0.08) 0%, rgba(0, 59, 226, 0.0184) 53%, rgba(0, 59, 226, 0.0048) 75%, rgba(0, 59, 226, 0) 100%)",

      /** Intense blue radial glow for backdrop depth */
      radialBlueIntense:
        "radial-gradient(50% 50% at 50% 50%, rgba(0, 59, 226, 0.24) 0%, rgba(0, 59, 226, 0.0552) 53%, rgba(0, 59, 226, 0.0144) 75%, rgba(0, 59, 226, 0) 100%)",
    },

    /** Glassmorphism backdrop blur */
    blur: {
      glass: "40px",
    },
  },

  /**
   * --------------------------------------------------------------------------
   * 4. BUTTON CONFIGURATION
   * --------------------------------------------------------------------------
   */
  buttons: {
    variants: {
      lime: "bg-[#CBFC01] text-[#000000] hover:bg-[#b8e600] active:scale-[0.98] transition-all duration-200 shadow-sm font-semibold",
      blue: "bg-[#003BE2] text-[#FFFFFF] hover:bg-[#0031BD] active:scale-[0.98] transition-all duration-200 shadow-sm font-semibold",
      secondary: "bg-[#F5F5F6] text-[#242528] hover:bg-[#EBEBEF] active:scale-[0.98] transition-all duration-200 font-medium",
      outline: "border border-[#CBFC01] text-[#242528] hover:bg-[#CBFC01]/10 active:scale-[0.98] transition-all duration-200 font-medium",
      ghost: "bg-transparent text-[#242528] hover:bg-black/5 active:scale-[0.98] transition-all duration-200 font-medium",
    },

    sizes: {
      sm: "h-9 px-4 text-xs rounded-full",
      md: "h-12 px-6 text-sm rounded-full",
      lg: "h-14 px-8 text-base rounded-full",
    },
  },
} as const;

export type ThemeTokens = typeof THEME;
