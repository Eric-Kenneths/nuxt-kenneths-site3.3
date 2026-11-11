# 12_LEGACY_AREAS

Areas that stay on Kenneths-API-9 and the old patterns for now. Do not delete them in the removal phase and do not copy their patterns into new code.

## Retail (kept)

Files: `pages/shop/retail/**` (category, product, cart, shipping, payment, confirmation), `composables/retailGlobal.js`, `useRetailFunctions.js`, `useCart.js`, `shared/retailGroups.ts`, `components/cart-menu.vue`, `retail-total.vue`, `product-menu.vue`, `RetailTechnicianLinkModal.vue`.

Legacy endpoints: `/pos/WebOrderRetail*`, `/khsds/SearchWord`, `/khsds/ItemWeb/Search`, KHSDS item/web lookups. Will be rewired to Salon `product.*` tables (see `13_PRODUCT_MODEL.md`).

### Shared Code Retail Depends On (verified)

These look like removal targets but retail still uses them:

- `verify-form.vue` + `accountGlobal` (SMS phone verification in retail payment: `showVerify`, `mobilePhone`, `textCode`). After Phase 1 these only do phone verification: the login step and the "appointment already booked" check were removed. The `/appointmentbook/SendVerificationCode` and `/AppointmentBook/VerifyCode` endpoints on Kenneths-API-9 are still called, so they must stay.
- `useKhsds.getWebBookServices` (`/khsds/WebBookServices`): the public `pages/service-menu` still loads its data this way until the services area moves to Salon-API-10 in Phase 4.
- `useKhsds.js` functions: `getTablesByCategoryType` (shipping, payment), `getLocationByLocationCode` (confirmation), `getTechnicianLiteById` (category page), `getLocationListLite`, `getTechniciansForWebRetailLink` (technician link modal).
- `dataGlobal`, `appGlobal`, `useLocalStorage`, `useFilters`, `useResponse`.
- `layouts/default.vue` mounts `<cart-menu />` and uses `retailGlobal`.
- Retail confirmation fires `retail_purchase` through `gtag` and `dataLayer`.

## Hair Quiz (kept)

`pages/hair-quiz/**`, `components/quiz/**`, `quiz-section.vue`, `mhhGlobal`. The "found your match" component now links to the Zenoti services URL with the existing match codes (`mid`, `mc`, `qti`, `c`) appended. Zenoti ignores them for now, so the quiz result no longer carries the stylist match into booking.

## Pricing Grids (kept)

`sub-type-pricing-grid.vue` uses `dataGlobal`. Source of pricing is undecided. (`model-pricing-grid.vue` was removed with the model page in Phase 1.)

## Reviews

Until moved, location, Academy and stylist pages read rating/review data from the legacy API. Target: Salon-API-10 using `marketing.SocialRating` / `SocialReview`.
