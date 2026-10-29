# 08_EXTERNAL_LINK_PATTERNS

Booking and gift cards are handled by Zenoti. The site only links out.

## Source Of Truth

Zenoti links live in `runtimeConfig.public` and are exposed by the app store:

| Purpose | Stage value |
| --- | --- |
| Book (services page) | `https://kennethsstg.zenotistage.com/webstoreNew/services` |
| Gift cards | `https://kennethsstg.zenotistage.com/webstoreNew/giftcards` |

Production values replace these through environment variables (`NUXT_PUBLIC_...`) at deploy time. Never hard-code a Zenoti URL in a page or component.

## Usage

- Every "Book", "Make an Appointment" and "New Customer" button links to the booking URL from the store.
- Every gift-card link points to the gift-card URL.
- Outbound Zenoti links are plain anchors; use `rel="noopener"`. They do not need `nofollow` unless SEO guidance changes.
- Booking CTAs are not indexed content; do not put them in JSON-LD as potential actions without review.

## Removed Routes

`/book/**`, `/book-now`, `/gc/**`, `/shop/gift-cards/**`, `/model`, `/customer-find` and `/app` links are replaced with 301s to the right Zenoti link or the closest remaining page. Keep these in `routeRules` and out of the sitemap.
