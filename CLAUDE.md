# CLAUDE.md — nuxt-kenneths-site3.3

This repository is the public website for Kenneth's Salons and Day Spas (kenneths.com), built with Nuxt 3.

Claude should treat this file as the starting point for all work in this project.

## Read These Files First

Read the numbered files in `docs/ai/` in order before suggesting code changes, adding features, refactoring, or creating new files:

1. `docs/ai/00_READ_FIRST.md`
2. `docs/ai/01_ARCHITECTURE.md`
3. `docs/ai/02_NAMING_CONVENTIONS.md`
4. `docs/ai/03_PROJECT_STANDARDS.md`
5. `docs/ai/04_REPOSITORY_PATTERNS.md`
6. `docs/ai/05_PINIA_PATTERNS.md`
7. `docs/ai/06_PAGE_AND_COMPONENT_PATTERNS.md`
8. `docs/ai/07_SEO_PATTERNS.md`
9. `docs/ai/08_EXTERNAL_LINK_PATTERNS.md`
10. `docs/ai/09_PRIMEVUE_PATTERNS.md`
11. `docs/ai/10_ERROR_HANDLING_PATTERNS.md`
12. `docs/ai/11_API_CLIENT_PATTERNS.md`
13. `docs/ai/12_LEGACY_AREAS.md`
14. `docs/ai/13_PRODUCT_MODEL.md`

## Reference Projects

- `Salon-API-10` — the new ASP.NET Core backend this site is moving to. Read its `CLAUDE.md` and `docs/ai/` before any backend work. Schema scripts live in `docs/ai/database/`.
- `kenfo4` — the internal Vue admin app. It is the pattern reference for repositories, stores, filters and the PrimeVue preset. **Read-only: never modify files in kenfo4.**
- `Kenneths-API-9` — the legacy API. Retail, the hair quiz, pricing grids and (until moved) reviews still use it.

Do not edit backend or reference projects from this repository unless the user explicitly asks and the project was added with `--add-dir`.

## Highest Priority Rules

Follow existing patterns before introducing anything new. The target data flow is:

```text
Page / Component
→ Pinia store
→ Repository
→ apiClient
→ Salon-API-10 (or Kenneths-API-9 for legacy areas)
```

- Pages that search engines index must load their data with `useAsyncData` so the server renders full content (see `07_SEO_PATTERNS.md`).
- No module-level reactive state. State shared across requests leaks between visitors on the server. Use Pinia.
- Do not call `fetch`/`$fetch` directly from pages or components in migrated areas.
- Do not hard-code API or Zenoti URLs; read them from `runtimeConfig`.
- Keep `error.vue` and the 404 handling.
- Brand colors and shapes must not change when styling is moved to the PrimeVue preset.
- Do not regress existing SEO: canonical, JSON-LD, noindex rules, 301 redirects, sitemap and robots (served by this app).

## Migration Status

See `docs/ai/00_READ_FIRST.md` for the phase list and what is legacy. Retail and the hair quiz are **kept**; do not remove them.

## Common Commands

```bash
npm install
npm run dev
npm run build
```

Run `npm run build` before considering work complete.

## Response Expectations

- Read the relevant numbered docs first.
- Explain the intended change briefly and list the exact files that will change.
- Mention API/database dependencies, route changes, store changes and SEO impact separately.
- Avoid unrelated refactors.
- Show a plan and wait for approval before editing files when the user asks for a plan first.

## First Prompt Recommendation

```text
Read CLAUDE.md first, then read docs/ai in numeric order. Do not edit files yet. Summarize the architecture and confirm the patterns you will follow.
```
