# Meeting Recorder – Overview

This template provides ax minimal setup to get React working in Vite with HMR and some ESLint rules.
+Front-end application built with React + Vite to browse mocked meeting recordings, view their metadata, and trigger on-demand AI summaries based on the transcript. The UI provides search, filters (industry, favorites), and local persistence of favorite recordings.

Currently, two official plugins are available:
+## How it works

- **Meeting list**: The home page fetches mocked recordings, displays a preview (title, industry, date, duration), and lets users mark items as favorites (persisted in `localStorage`).
- **Meeting details**: Each detail page shows metadata, participants, and the raw transcript.
- **AI summaries**: Two buttons manually trigger summaries (simple and detailed) rendered as Markdown. Calls are intentionally disabled by default (`enabled: false`) to prevent automatic traffic.
- **Filters and search**: Case-insensitive search (title, industry, participants), industry filter, and a "favorites only" toggle that can be combined with search.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Technical flows and API calls
### Mocked data
- Recordings come from `src/mocks/recordings.json` and are exposed via `fetchRecordings` and `fetchRecordingById` (`src/features/recordings/api.ts`).
- Each mocked request adds a slight delay (300–500 ms) to simulate network latency.

## React Compiler
### OpenAI calls
- `useAI` (`src/features/ai/useAI.ts`) builds a `POST https://api.openai.com/v1/chat/completions` request with the `gpt-4.1-mini` model.
- Two prompts are available:
  
  - **Simple**: 3–5 concise bullet points.
  - **Detailed**: Structured sections (Key Points, Decisions Made, Risks/Concerns, Next Steps) rendered as bullet lists.

- The API key is read from `VITE_OPENAI_API_KEY` (see installation). If missing, a clear error is thrown before sending the request.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Filters
- Case-insensitive search on title, industry, and participants.
- Industry filter generated dynamically from the loaded data.
- "Favorites only" toggle uses IDs stored in `localStorage` (`favoriteRecordings`). Filters are combined before rendering the list.

## Expanding the ESLint configuration
## Tech stack
- **Framework**: React 19 + TypeScript, Vite.
- **Routing**: `react-router-dom` (list/detail pages).
- **Data**: `@tanstack/react-query` for caching and manual AI requests.
- **UI**: Tailwind CSS, custom components (`Button`, `Card`, `Input`, `Spinner`), `@heroicons/react` icons, Markdown rendering via `react-markdown`.
- **Quality**: ESLint (TypeScript + React config).

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

## Installation and start
1. Install dependencies:
```bash
   npm install
   ```
2. Create a `.env` (or `.env.local`) file at the project root with your OpenAI key:
```bash
   VITE_OPENAI_API_KEY=sk-...
   ```
3. Start the dev server:
```bash
   npm run dev
   ```
4. (Optional) Run linting:
```bash
   npm run lint
   ```

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
```


## Working on the project
- Data hooks live in `src/features/**/`. The list page is `src/pages/RecordingsPage.tsx`; the detail page is `src/pages/RecordingDetailsPage.tsx`.
- Reusable UI components are in `src/components/ui/`.
- To add a new API call, create the function in `src/features/<domain>/api.ts`, expose it through a `use...` hook based on React Query, then consume it in the relevant page.
- Type your data in `src/features/<domain>/types.ts` to benefit from TypeScript checking.

- Remove tseslint.configs.recommended and replace with this
`tseslint.configs.recommendedTypeChecked`
- Alternatively, use this for stricter rules `tseslint.configs.strictTypeChecked`
- Optionally, add this for stylistic rules `tseslint.configs.stylisticTypeChecked`

## Improvement ideas

### Product
- Export AI summaries (copy, PDF, shareable link).
- Annotation or highlighting of key transcript passages.
- Additional filters by participant or date range.
- History of AI summaries to compare multiple runs.
- Allow user to enter its own transcript and add a meeting

## Technical
   - Replace mocks with a real API and handle authentication (token/bearer): using auth0 for example.
   - Add unit tests for filters and AI orchestration.
   - Enable streaming of OpenAI responses for progressive rendering.
   - Internationalization (i18n) and client-side timezone handling.
   - Centralize configuration (API URLs, timeouts) and add fallbacks when `localStorage` is unavailable.
   - Using a database (Supabase for example), and exposing GraphQL api


