# 06_PAGE_AND_COMPONENT_PATTERNS

## Pages

- A page loads its data, calls store actions, renders state and coordinates child components.
- Indexed pages load in `useAsyncData`, set `useSeoMeta`/`useHead` from the loaded data, and emit JSON-LD (see `07_SEO_PATTERNS.md`).
- A missing record returns a real 404 (`createError({ statusCode: 404 })` or `setResponseStatus`); a permanently gone record returns 410. Never render "not found" with a 200.
- Keep exactly one `<h1>` per page.

## Layouts

Frame-level UI only (header, footer, drawer, slot). The default layout must not own data loading or modal flows for removed features.

## Components

- Props in, events out. Display formatting comes from `filters/`, not inline.
- A component must not fetch its own data on an indexed page unless it is client-only content. Content search engines should see is passed from the page.
- Client-only widgets are wrapped in `<ClientOnly>`.
- Book buttons are links built from `appStore` Zenoti URLs — no booking logic in components.

## Images

Always `alt` text, explicit dimensions or aspect ratio, and `loading="lazy"` below the fold. Images stay where they are; tables store file names or URLs.

## Search Dialogs

Reusable pick-a-record modals are `<Entity>SearchDialog.vue` under `components/<feature>/`, reusing the feature's repo/store.
