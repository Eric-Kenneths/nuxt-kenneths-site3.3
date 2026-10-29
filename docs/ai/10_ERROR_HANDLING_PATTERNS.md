# 10_ERROR_HANDLING_PATTERNS

## Decisions

- Keep `error.vue` and the catch-all 404 page (`pages/[...path].vue`). Both are `noindex`.
- Backend error logging (kenfo4's `useErrorHandler` / `errorLogRepo`) is **deferred**.

## Rules

- `apiRequest` throws an `Error` with `status`, `body` and `source`. Stores catch, set `errorMessage`, and re-throw.
- A page decides the response:
  - Missing record: `createError({ statusCode: 404 })` (or `setResponseStatus(event, 404)`).
  - Discontinued/removed: 410.
  - API down while rendering: let the error surface as a 5xx. Never render empty content with a 200.
- Server routes (sitemap, feed) must return an error status when the API fails.
- Do not `console.log` page state in production code paths (existing `console.log` calls in `error.vue` and the 404 page are stale and can go).
