# 01_ARCHITECTURE

## Technology Stack

- Nuxt 3 (file-based routing, server routes in `server/`)
- Vue 3 Composition API, `<script setup>`
- Pinia (via `@pinia/nuxt`) — target; added in Phase 2
- PrimeVue 4 in unstyled mode with one shared preset — target; today Volt wrappers
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `@nuxtjs/google-fonts`

## Rendering Model

- Indexed public pages are server-rendered. Data they need for SEO must be loaded in `useAsyncData` (or `await`ed in setup through a store action called from it).
- Static pages use `routeRules` `prerender: true`; dynamic content uses `swr` caching. Keep `routeRules` the single place for caching and redirect rules.
- Anything behind Zenoti or a checkout is not indexed (see `07_SEO_PATTERNS.md`).

## Folder Layout (target)

```text
api/ or utils/apiClient.js      shared request helper
repositories/                   one file per API resource
stores/                         Pinia stores, grouped by feature
filters/                        display formatting helpers
presets/                        primevue-tailwind-preset.js
pages/                          routes
components/                     reusable UI, grouped by feature
layouts/  plugins/  server/  shared/
```

Existing `composables/*Global.js` files are legacy until their area is migrated.

## Data Flow

```text
Page / Component
→ Pinia store (state + workflow)
→ Repository (endpoint wrapper)
→ apiClient
→ Salon-API-10 | Kenneths-API-9
```

## Two APIs During Transition

`runtimeConfig.public` holds both base URLs (names to be fixed in Phase 2, e.g. `salonApiBaseUrl`, `legacyApiBaseUrl`). A repository chooses one. Legacy areas keep using the legacy URL until moved.

## Server Routes

`server/routes/sitemap.xml.ts`, `feed.ts` and `post.ts` read data from the API. They run on the server, so they use `$fetch`/`fetch` against the same runtime-config URLs and must not depend on Pinia or browser state. `robots.txt` and the sitemap are served by this app.

## Backend Boundary

Describe the endpoint needed; do not write backend code here.
