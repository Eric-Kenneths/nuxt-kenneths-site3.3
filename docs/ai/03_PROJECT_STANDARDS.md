# 03_PROJECT_STANDARDS

## Coding Style

- Vue 3 Composition API with `<script setup>`.
- Match the local style of the file being edited (the repo mixes JS and TS; `server/` and `shared/` use TS, pages use JS).
- Clear async/await. No new TypeScript outside `server/` and `shared/` unless asked.

## Build

Run `npm run build` before considering work complete.

## State Responsibility

- Local UI state: component `ref`/`reactive`.
- Shared or server-loaded data: Pinia.
- Never use module-level `reactive`/`ref` for data. On the server it is shared by every request.

## API Responsibility

- Repositories make API calls; stores call repositories; pages call stores.
- No second API client. No hard-coded URLs in pages or components.

## Environment

Base URLs and Zenoti links come from `runtimeConfig.public`. Stage and production values differ; never inline them.

## Loading State

Each store keeps its own `loading`. There is no global loading flag: server rendering must not wait on UI state. The legacy `busy-spinner` and `appGlobal` loading go away with the areas that use them.

## Error State

Stores keep `errorMessage`, re-throw, and let the page decide. Error logging to the backend is deferred.

## Marketing Tracking

Tracking is being dropped. Do not add new GTM, Meta pixel, or `gtag` calls. (Retail confirmation currently fires purchase events; see `12_LEGACY_AREAS.md` before touching them.)

## Avoid Unrelated Refactors

Only modify files required for the change. Mention larger cleanups separately.

## Comments

Useful and specific; preserve existing comments unless stale. No comments that restate code.
