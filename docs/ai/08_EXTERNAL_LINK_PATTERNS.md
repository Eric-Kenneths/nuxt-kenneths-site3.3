# 08_EXTERNAL_LINK_PATTERNS

Booking and gift cards are handled by Zenoti. The site only links out.

## Source Of Truth

Zenoti links live in `runtimeConfig.public.zenoti` (`servicesUrl`, `giftCardsUrl`). Until Phase 2 adds the app store, read them with `composables/useZenotiLinks.js` (`bookUrl()`, `giftCardsUrl()`); Phase 2 moves them into `appStore`. For a Book button use `components/BookNowButton.vue`, which wraps `useZenotiLinks`.

| Purpose | Stage value |
| --- | --- |
| Book (services page) | `https://kennethsstg.zenotistage.com/webstoreNew/services` |
| Gift cards | `https://kennethsstg.zenotistage.com/webstoreNew/giftcards` |

Production values replace these through environment variables at deploy time: `NUXT_PUBLIC_ZENOTI_SERVICES_URL` and `NUXT_PUBLIC_ZENOTI_GIFT_CARDS_URL`. Never hard-code a Zenoti URL in a page or component.

## Preset Codes

Booking links that used to carry preset codes (`?s=` service, `?fl=` location, `?mid=`, `?mc=`, `?t=`, `?d=` and so on) still pass them as the `query` prop of `BookNowButton`, or as the argument to `bookUrl()`. Zenoti does not read these codes yet, so they are ignored. They are kept on purpose in case Zenoti adds support. Do not strip them.

## Usage

- Every "Book", "Make an Appointment" and "New Customer" button links to the booking URL from the store.
- Every gift-card link points to the gift-card URL.
- Outbound Zenoti links are plain anchors; use `rel="noopener"`. They do not need `nofollow` unless SEO guidance changes.
- Booking CTAs are not indexed content; do not put them in JSON-LD as potential actions without review.

## Removed Routes

Removed booking and gift card routes are redirected by `server/middleware/zenoti-redirects.ts`, not `routeRules`, because `routeRules` targets are fixed at build time and the Zenoti URLs come from `runtimeConfig` at runtime. The middleware redirects `/book/**`, `/book-now`, `/appointment-book/**`, `/new-customers/**`, `/webab/**`, `/xb`, `/author/appointment-` and `/customer-find` to the services URL, and `/gc/**`, `/shop/gift-cards/**`, `/gift-certificate/**` and `/webgc/**` to the gift card URL. It forwards only `utm_*`, `gclid` and `fbclid`.

These are **302s** while the Zenoti URLs are stage values, because a 301 is cached permanently by browsers and search engines. Once the production URLs are final, change `REDIRECT_STATUS` in the middleware to 301.

`/model` and `/models` (the removed model program page) are a normal `routeRules` 301 to `/locations/academy`. Keep all of these out of the sitemap.
