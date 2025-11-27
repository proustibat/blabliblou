# Meeting Recorder

Front-end application built with React, TypeScript, Vite, Tailwind CSS, and TanStack Query.

The app lets users browse mocked meeting recordings, search and filter them, save favorites locally, open a detailed recording page, read the transcript, and manually generate AI summaries from the transcript.

## Features

- Browse a list of meeting recordings.
- Search recordings by title, industry, or participant.
- Filter recordings by industry.
- Toggle a favorites-only view.
- Persist favorite recordings in `localStorage`.
- Open a detail page for each recording.
- Display meeting metadata: title, date, duration, industry, participants.
- Display the full transcript.
- Trigger AI summaries on demand:
  - Simple summary: short bullet-point summary.
  - Detailed summary: structured sections for key points, decisions, risks, and next steps.
- Render AI output as Markdown.

## Tech Stack

- **React 19**: UI layer.
- **TypeScript**: typed data contracts and stricter maintainability.
- **Vite**: local development server and production build.
- **React Router**: client-side routing between list and detail pages.
- **TanStack Query**: async data fetching, caching, loading states, and manual AI requests.
- **Tailwind CSS**: utility-first styling.
- **Heroicons**: icon library.
- **React Markdown**: Markdown rendering for AI-generated summaries.
- **ESLint**: static checks and import/style consistency.

## Architecture

The project uses a lightweight feature-based structure:

```txt
src/
  components/
    ui/                 Reusable UI primitives
  features/
    ai/                 AI prompt and summary logic
    recordings/         Recording types, API functions, data hooks
  mocks/                Mocked recordings dataset
  pages/                Route-level page components
  styles/               Global Tailwind styles
```

This keeps reusable UI separate from domain-specific logic. The `recordings` feature owns its data model, mock API, and React Query hooks. The `ai` feature owns prompt construction and the OpenAI request logic.

## Data Flow

Recordings are currently loaded from `src/mocks/recordings.json`.

The mock data is exposed through async functions in `src/features/recordings/api.ts`:

- `fetchRecordings`
- `fetchRecordingById`

Those functions are consumed through React Query hooks:

- `useRecordings`
- `useRecording`

This mirrors the shape of a real API integration while keeping the current app simple to run locally.

## AI Summary Flow

AI summaries are handled in `src/features/ai/useAI.ts`.

The hook uses React Query with `enabled: false`, so OpenAI requests are not fired automatically when the detail page loads. The user explicitly triggers summary generation by clicking one of the summary buttons.

The current implementation sends a `POST` request to:

```txt
https://api.openai.com/v1/chat/completions
```

The API key is read from:

```txt
VITE_OPENAI_API_KEY
```

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file at the project root:

```bash
VITE_OPENAI_API_KEY=sk-...
```

Start the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Design And Engineering Choices

### Feature-Based Organization

The code is organized around product domains rather than technical folders only. This keeps feature logic easier to find and makes future extraction easier if the app grows.

### React Query For Async State

TanStack Query is used even though the data is currently mocked. This makes loading, caching, refetching, and future API migration explicit from the beginning.

For AI summaries, `enabled: false` is important because generating a summary is a user-triggered action, not a background fetch.

### Mock API Boundary

The mock data is not imported directly inside pages. It goes through `api.ts` and custom hooks. This makes replacing mocked recordings with a real backend less invasive.

### Small UI Components

The UI layer uses small custom primitives such as `Button`, `Card`, `Input`, and `Spinner`. This avoids repeating Tailwind classes everywhere while keeping the abstraction simple.

### Prompt Separation

The simple and detailed prompts live in `src/features/ai/prompts.ts`. Keeping prompts separate from the hook makes the AI behavior easier to review, test, and evolve.

## Known Limitations

- The OpenAI API key is currently used from the browser through a Vite environment variable. This is acceptable for a local prototype, but not production-ready. A production version should call OpenAI from a backend or serverless API route.
- The app uses mocked data only. There is no persistence layer or authenticated backend.
- AI summary errors are not yet surfaced with a full user-facing retry/error state.
- The detail page currently contains several responsibilities and could be split into smaller components.
- There are no automated tests yet.
- Favorites depend on `localStorage`; the app should handle unavailable storage more defensively for production.
- The production bundle currently triggers a Vite chunk-size warning, so dependency cleanup and code splitting should be considered as the app grows.

## Potential Improvements

### Product

- Add summary export: copy, PDF, or shareable link.
- Store summary history per recording.
- Add filters by date range or participant.
- Allow users to upload or paste their own transcript.
- Highlight transcript passages that support AI summary points.
- Add loading, retry, and empty states for AI failures.

### Technical

- Move OpenAI calls behind a backend or serverless endpoint.
- Replace mocked recordings with a real API.
- Add authentication and user-scoped favorites.
- Add unit tests for filters, favorites, and API hooks.
- Add integration tests for list/detail navigation.
- Add streaming AI responses for progressive rendering.
- Split large route-level bundles with dynamic imports.
- Remove unused dependencies.
- Add stricter type-aware ESLint rules.
- Centralize app configuration such as API URLs, model names, and storage keys.

## Notes

This project can be presented as a focused frontend prototype with production-oriented boundaries:

- Data access is isolated behind API functions and React Query hooks.
- Business domains are grouped by feature.
- UI primitives avoid duplicated styling without introducing a heavy design system.
- AI generation is explicit and user-triggered.
- The current limitations are clear and have realistic next steps.

