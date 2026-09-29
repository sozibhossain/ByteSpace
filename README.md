# ByteSpace

Responsive learning-platform demo built from the nine PNG references in
`public/website-figma/mockups`. It runs with local JSON and has no backend or API routes.

## Run and verify

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

Open http://localhost:3000. Dynamic route parameters follow the installed Next.js
16 documentation and are awaited in Server Components.

## Structure

- `app/`: server route entries, metadata, loading and error boundaries.
- `components/`: shared UI, navigation and feature-specific views. Stateful components
  declare their client boundary; no data-source selection belongs in JSX.
- `data/`: eight complete example courses, one creator and consistent review fixtures.
- `types/course.ts`: domain interfaces; `services/schema.ts`: runtime response validation.
- `services/contract.ts`: one adapter contract for JSON and HTTP sources.
- `services/mock/`: abortable local reads, filtering, sorting, pagination and session mutations.
- `services/http/`: status-aware requests, timeout, cancellation and validated API responses.
- `hooks/use-catalog.ts`: stable query keys, queries and mutation cache updates.
- `app/globals.css`: CSS tokens, typography, layout and responsive rules.
- `constants/theme.ts`: component variants referencing CSS tokens and shared motion presets.
- `tests/`: meaningful fixture, filter, cache-key, cancellation, mutation and HTTP checks.

Components and non-obvious logic have purpose/behavior comments. JSON remains valid JSON;
its field documentation lives in types and this README. `cn()` uses clsx and tailwind-merge
so consumers can override styles safely.

## Pages

- `/`: all home sections, category filtering and search.
- `/courses`: URL-based search, level/category filters, sorting and pagination.
- `/courses/[slug]`: course description, gallery, outcomes and video preview.
- `/courses/[slug]/lessons`: curriculum, video player and session completion tracking.
- `/courses/[slug]/reviews`: rating distribution, filters and progressive review loading.
- `/creators/purepearl-studio`: creator profile, following and filtered catalog.
- `/creators`: directory supporting the navbar's creator destination.
- `/login`, `/register`: validated auth forms with explicit demo submission feedback.
- Unknown routes/course/creator identifiers: custom not-found page.
- `/information/[topic]`: clearly identified launch placeholders for footer destinations.
- `/search`: redirects to the canonical catalog and preserves scalar query parameters.

## Data and API integration

Copy `.env.example` to `.env.local` when configuration is needed. Default operation uses
the mock adapter even without an environment file.

```env
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

Restart the development server after changing environment values; rebuild for production.
Endpoint paths are centralized in `constants/endpoints.ts`. UI components and query hooks
remain unchanged if the backend follows the response schemas. Otherwise, normalize backend
responses in the HTTP adapter. Public environment variables must not contain credentials.

| Method / path                | Request                                                                         | Response                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET `/courses`               | `search`, `category`, `level`, `sort`, `page`, `pageSize`, optional `creatorId` | `{data: Course[], pagination: {page, pageSize, total, totalPages}}` |
| GET `/courses/:slug`         | Course slug                                                                     | `Course`                                                            |
| GET `/creators`              | None                                                                            | `Creator[]`                                                         |
| GET `/creators/:slug`        | Creator slug                                                                    | `Creator`                                                           |
| GET `/courses/:id/reviews`   | `rating` (`0` means all ratings)                                                | `Review[]`                                                          |
| GET `/courses/:id/progress`  | Session cookie                                                                  | `{courseId, completedLessonIds}`                                    |
| POST `/courses/:id/progress` | `{lessonId}`                                                                    | Updated progress                                                    |
| POST `/creators/:id/follow`  | `{following: boolean}`                                                          | `{following: boolean}`                                              |
| POST `/auth/login`           | `{email, password}`                                                             | `{message}` and backend session cookie                              |
| POST `/auth/register`        | `{name, email, password}`                                                       | `{message}` and backend session cookie                              |

Curriculum is included in course details, so no separate lesson endpoint is required by
the current contract. The API must enforce authorization, validate mutations and support
credentialed CORS if it uses a different origin. Cookie-based authentication is the current
transport convention; a different auth scheme needs a transport adapter change. Social
login, payments and newsletter submission require their own real integration before launch.

## Loading and failure behavior

Queries have a one-minute stale time. Network, timeout and temporary server failures get
at most two automatic retries; invalid requests, permission errors, 404s and malformed
responses do not. Mutations do not retry automatically. Query signals cancel abandoned
requests; the HTTP client applies a ten-second timeout. Skeleton, background refresh,
empty, not-found, retry and mutation feedback states are shared across views.

Mock-only verification URLs (open/reload directly to avoid an existing query cache):

- `/courses?demoState=slow`: longer initial loading.
- `/courses?demoState=empty`: empty collection.
- `/courses?demoState=error`: bounded retries and safe error feedback.
- `/courses?search=no-matching-course`: normal filtered empty result.

Remove `demoState` and reload to recover from forced scenarios. These switches have no
effect when the HTTP adapter is selected.

## Media, fonts and animation

All eight courses use `/assets/courses/videos/course-preview-demo.mp4`. The first six
thumbnails are the supplied course images; the last two use the existing student and
instructor assets, so every course has a distinct image. The video poster is extracted
from the supplied clip. Galleries reuse supplied course imagery until dedicated exports
are provided. The clip is a short demonstration, not the actual 5-hour course content.
Caption text describes the sample clip; real course videos need their corresponding
caption tracks. Configure precise Next.js `images.remotePatterns` when using remote media.

Satoshi and Clash Display are hosted locally; Poppins is bundled through Fontsource.
See `public/assets/fonts/README.md` for sources. Partner marks are placeholders rather
than original vector exports. Four supplied portraits are reused across sample reviews.

Motion for React handles section transitions and navigation disclosure. CSS handles simple
hover/floating effects. Reduced-motion preferences are respected. Marketing artwork is
decorative, while native video controls, semantic forms, focus styles and status regions
support keyboard and assistive-technology use.

## Demo boundaries and visual fidelity

No accounts, enrollment, purchases or newsletter subscriptions are created in mock mode.
Progress and follow state are temporary and reset on reload. Statistics, testimonials,
reviews and course text are illustrative. Course lesson counts, duration and review
distribution are internally consistent rather than repeating conflicting mockup values.

Desktop references are 1440px wide. Mobile/tablet layouts are inferred because those
references were not supplied. Exact visual equality is limited by missing gallery images,
partner vectors, different video content and two additional example-course thumbnails.
Do not call this implementation a verified 100% pixel match.
