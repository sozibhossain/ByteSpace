# Verification record

## Automated checks

The data-layer suite checks eight unique available thumbnails, one shared video, actual
lesson counts/duration, review totals/distribution, combined filters, bounded pagination,
sorting, query key isolation, typed missing records, cancellation, idempotent completion,
foreign-lesson rejection, retry policy, HTTP status handling and response validation.

Final checks passed: `npm test` (9/9), `npm run lint`, `npm run typecheck`,
`npm run format:check`, and `npm run build` (all routes generated successfully).
Some restricted Windows shells block Node/Next worker processes with EPERM; run the same
checks in an authorized shell when that happens rather than changing application behavior.

## Browser flows

- Home search navigates to a shareable catalog URL and shows the matching course.
- Pagination reaches the remaining two courses and level changes reset the page.
- Combining mismatched category/level filters produces a resettable empty state.
- Mobile course preview plays the supplied MP4 with native controls.
- Completing a lesson changes progress from 0% to 6% and disables duplicate completion.
- Rating filters produce the correct review subset and explicit empty feedback.
- Creator Follow updates its button and follower count in demo mode.
- Invalid auth submissions display field errors; valid submissions explicitly remain a demo.
- Forced mock network failures offer bounded automatic retries and a manual Retry action.
- Mobile navigation opens and closes with Escape, restoring focus to its toggle.

The nine mockup routes were checked at viewport widths 320, 768 and 1440 pixels
(27 route/viewport combinations). No horizontal document overflow was found after
fixing narrow course-card grids. Additional 390-pixel checks covered forms and video playback.

Browser QA includes desktop/mobile layout inspection. This is a functional/visual review,
not a comprehensive accessibility audit or proof of exact PNG equality.

## Animation update

- Ten routes (including the creators directory) passed overflow checks at 320, 768 and
  1440 pixels: 30 combinations. Desktop and 390-pixel hero screenshots were inspected.
- Computed hero styles showed distinct 5.5–8 second loops and 2–4px travel from center;
  student centering stayed at -300px desktop / -220px mobile.
- Mobile disclosure still opened and closed with Escape. Lesson completion reached 6%
  with a `scaleX(0.06)` fill; review loading increased the visible count from four to eight.
- Reduced-motion behavior was reviewed in CSS and Motion configuration; OS-level
  reduced-motion emulation was not exercised in this browser session.
