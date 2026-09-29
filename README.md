# ByteSpace

ByteSpace is a responsive course discovery and learning platform built with Next.js and TypeScript. Visitors can explore courses and creators, preview lessons, read reviews, and browse a catalog with shareable search and filter URLs.

**Live demo:** [byte-space-eosin.vercel.app](https://byte-space-eosin.vercel.app/)

By default, the application uses local sample data. Accounts, enrollment, payments, and newsletter subscriptions require backend services before they can process real requests.

## Features

- Course catalog with search, category and level filters, sorting, and pagination.
- Course detail pages with curriculum, video previews, ratings, and reviews.
- Creator directory and profiles with course filtering and session-based follow feedback.
- Lesson viewer with session-based completion tracking.
- Responsive layouts, keyboard-accessible controls, loading and error states, and reduced-motion support.
- A data service layer that can use local JSON or an HTTP API without changing page components.

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, TanStack Query, Zod, and Motion. The project uses locally hosted Satoshi and Clash Display fonts alongside Poppins.

## Getting started

Requirements: Node.js 20.9.0 or newer and npm.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Local sample data is the default, so no API key or backend is needed.

| Command                | Purpose                           |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the development server      |
| `npm run build`        | Create a production build         |
| `npm run start`        | Serve the production build        |
| `npm run lint`         | Run ESLint                        |
| `npm run typecheck`    | Check TypeScript types            |
| `npm test`             | Run the catalog and service tests |
| `npm run format:check` | Check formatting                  |

## Project structure

| Directory        | Responsibility                                               |
| ---------------- | ------------------------------------------------------------ |
| `app/`           | Routes, metadata, and loading/error boundaries               |
| `components/`    | Page sections and reusable interface components              |
| `data/`          | Sample courses, creators, and reviews                        |
| `hooks/`         | TanStack Query hooks and cache keys                          |
| `services/`      | Local and HTTP data adapters, validation, and error handling |
| `types/`         | Shared domain types                                          |
| `constants/`     | Theme, catalog options, animations, and API paths            |
| `public/assets/` | Images, fonts, captions, and course video                    |
| `tests/`         | Catalog and service behavior tests                           |

## Connecting a backend

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

The HTTP adapter implements the same contract as the local data adapter. API paths are defined in `constants/endpoints.ts`; response validation lives in `services/schema.ts`. A backend matching those contracts can be connected without changing the catalog components or query hooks. If its response format differs, normalize it in `services/http/`.

The expected API covers courses, creators, reviews, lesson progress, creator follows, and authentication. The client uses cookie-based requests, a ten-second timeout, cancellation, and bounded retries for temporary query failures. Configure credentialed CORS when the API is hosted on another origin. Never put secrets in `NEXT_PUBLIC_*` variables.

## Sample content and current scope

The local catalog contains eight example courses with distinct thumbnails and one shared preview video. Reviews and community statistics are illustrative. In local mode, progress and follow state reset on reload; validated login and registration forms do not create accounts. Course enrollment, checkout, and newsletter submission are available as interface previews only.

Video captions describe the shared preview clip. Replace the sample content and captions with course-specific media when connecting real courses.
