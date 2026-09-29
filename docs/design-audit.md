# Design review

Reviewed all nine 1440px reference PNGs in `public/website-figma/mockups`.
Desktop references define the visual target; mobile and tablet behavior is inferred.

## Corrections

- Home: replaced the elliptical dome with a clipped circle; retained independent
  positioning and animation layers. Added the missing CTA decorations and second
  revenue card. Adjusted decorative scale, section text width and feature shadows.
- Shared colors: sampled blue `#003BE2`, button lime `#D4FB20`, illustration green
  `#CBFC01` and input border `#E5E6E8` directly from reference pixels. CSS owns these
  tokens and `theme.ts` references them for button variants.
- Catalog and profile cards: use Poppins semibold headings and a compact title before
  the colon while preserving the full accessible course link title.
- Auth: aligned desktop panel to y=120, corrected panel padding, input label spacing,
  illustration height and floating-card placement. Replaced important position
  utilities with named, documented CSS classes.
- Cleanup: consolidated motion tokens and progress styling, removed the superseded
  button active rule and unused Poppins weight imports. Existing component/service
  purpose comments remain; JSON documentation stays in types rather than invalid
  JSON comments. A selector usage scan found no obvious unused application classes.

## Remaining reference differences

- Course details/lessons/reviews use the supplied demo video and its actual poster.
  The reference's purple-sweater instructor poster and four gallery exports are absent.
- Partner vector marks, several reviewer portraits and the complete auth torus are
  absent as standalone assets; available supplied assets remain in use.
- Search reference repeats 18 course cards; the working catalog has eight distinct
  examples with six per page as previously requested. Creator totals and rating,
  lesson and progress values reflect that data rather than contradictory mockup values.
- Functional button labels, current copyright year and explicit demo feedback differ
  intentionally from static reference copy. Fonts are matched by visual inspection,
  not verified against original Figma text properties.

All ten working routes passed horizontal-overflow checks at 320, 768 and 1440px
after these changes (30 combinations). This is not a verified 100% pixel match.
