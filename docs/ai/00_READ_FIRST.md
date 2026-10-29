# 00_READ_FIRST

First instruction file for the Nuxt public website.

## Purpose

These files keep generated code consistent with the architecture this site is moving to (modeled on `kenfo4`, adapted for Nuxt server rendering) instead of letting Claude invent new patterns.

## Current Versus Target State

The site is mid-migration. Some of what these docs describe does not exist yet.

| Area | Today | Target |
| --- | --- | --- |
| State | Module-level `reactive` globals in `composables/*Global.js` | Pinia stores, one per feature |
| API calls | `useKhsds.js` and per-page `$fetch` using `appGlobal.apiBaseUrl` | Repository → apiClient with `runtimeConfig` URLs |
| Content API | Kenneths-API-9 | Salon-API-10 |
| PrimeVue | Volt wrappers in `volt/` | Unstyled mode with one preset |
| Booking / gift cards | In-site flows | Links to Zenoti |

New code in a migrated area follows the target. Do not copy the old patterns into new files.

## Migration Phases

0. Docs (this folder).
1. Removal: booking, gift cards, accounts, customer-find, model booking, first-timer popup, marketing tracking. Add 301s and fix the sitemap.
2. Foundation: Pinia, apiClient, app store, filters, runtime config, PrimeVue module.
3. Backend (Salon-API-10): services sync, `website.*` tables, read-only `WebsiteController`, reviews (`marketing.SocialRating` / `SocialReview`), product tables.
4. Frontend move, one area at a time: locations, services, team, blog + feed/sitemap, reviews.
5. Cutover: finish the preset, delete `volt/`, point production at Salon-API-10, compare sitemaps and crawl for 404s.

## Kept On Purpose

These stay and are rewired later. Do not delete them in the removal phase:

- Retail (`pages/shop/retail/**`, `retailGlobal`, `useRetailFunctions`, `shared/retailGroups.ts`, `cart-menu`, `retail-total`, `product-menu`, `RetailTechnicianLinkModal`) — see `13_PRODUCT_MODEL.md`.
- Hair quiz (`pages/hair-quiz/**`, `components/quiz/**`, `mhhGlobal`).
- Pricing grids.

See `12_LEGACY_AREAS.md`.

## Do Not Mix Projects

This is the frontend. Do not create ASP.NET controllers, entities, SQL or EF code here. If backend work is needed, say that `Salon-API-10` is required and describe the endpoint.

`kenfo4` is read-only reference.

## Core Instruction

```text
Page / Component → Pinia store → Repository → apiClient → API
```
