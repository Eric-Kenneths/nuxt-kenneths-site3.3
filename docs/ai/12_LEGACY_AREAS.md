# 12_LEGACY_AREAS

Areas that stay on Kenneths-API-9 and the old patterns for now. Do not delete them in the removal phase and do not copy their patterns into new code.

## Retail (kept)

Files: `pages/shop/retail/**` (category, product, cart, shipping, payment, confirmation), `composables/retailGlobal.js`, `useRetailFunctions.js`, `useCart.js`, `shared/retailGroups.ts`, `components/cart-menu.vue`, `retail-total.vue`, `product-menu.vue`, `RetailTechnicianLinkModal.vue`.

Legacy endpoints: `/pos/WebOrderRetail*`, `/khsds/SearchWord`, `/khsds/ItemWeb/Search`, KHSDS item/web lookups. Will be rewired to Salon `product.*` tables (see `13_PRODUCT_MODEL.md`).

### Shared Code Retail Depends On (verified)

These look like removal targets but retail still uses them:

- `verify-form.vue` + `accountGlobal` (SMS phone verification in retail payment: `showVerify`, `mobilePhone`, `textCode`).
- `useKhsds.js` functions: `getTablesByCategoryType` (shipping, payment), `getLocationByLocationCode` (confirmation), `getTechnicianLiteById` (category page), `getLocationListLite`, `getTechniciansForWebRetailLink` (technician link modal).
- `dataGlobal`, `appGlobal`, `useLocalStorage`, `useFilters`, `useResponse`.
- `layouts/default.vue` mounts `<cart-menu />` and uses `retailGlobal`.
- Retail confirmation fires `retail_purchase` through `gtag` and `dataLayer`.

## Hair Quiz (kept)

`pages/hair-quiz/**`, `components/quiz/**`, `quiz-section.vue`, `mhhGlobal`. The "found your match" component links to `/book/new/promo?...`; that link needs a Zenoti or redirect decision when booking is removed.

## Pricing Grids (kept)

`model-pricing-grid.vue` and `sub-type-pricing-grid.vue` use `dataGlobal`. Source of pricing is undecided.

## Reviews

Until moved, location, Academy and stylist pages read rating/review data from the legacy API. Target: Salon-API-10 using `marketing.SocialRating` / `SocialReview`.
