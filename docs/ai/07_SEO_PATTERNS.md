# 07_SEO_PATTERNS

The site recently went through a search audit and many fixes are live. Migration must not regress them.

## Indexing

- Indexed pages: server-rendered, one canonical (`https://kenneths.com` + path, no query), `title` and `description` sized for results, Open Graph and Twitter tags, JSON-LD where a type applies (`BeautySalon`, `Organization`/`WebSite` on home, `Article`, `Product`/`Offer`, `Person`, `FAQPage`, `Review`).
- Non-indexed pages (checkout, cart, confirmation, promo, admin, 404, error): `robots` `noindex`. Retail checkout stays noindex.
- `og:image` must be an absolute `https://` URL. (The layouts currently have a malformed `https:/kenneths.com/...`; fix it when touching them.)
- Do not add pages to the sitemap unless they are indexable.

## Data Loading

Anything that must be in the first HTML (headings, body copy, product names and prices, review text matching `Review` markup) is loaded in `useAsyncData`, not in `onMounted`.

## Redirects

Every removed or renamed route gets a 301 in `routeRules`. Legacy `.aspx` and `/service-guide` redirects stay. The lowercase-URL middleware stays.

## Sitemap And Robots

Both are served by this app (`server/routes/sitemap.xml.ts`, `public/robots.txt`).

- `lastmod` only where the API supplies a real date. No `changefreq`.
- Sitemap must never be empty or partial on API failure: on error return an error status, not a 200 with fewer URLs.
- Cutover check: compare old and new sitemaps and crawl for 404s.

## Reviews

Review markup must match what the page shows. The visible rating and count equal `aggregateRating`. Source: `marketing.SocialRating` / `SocialReview` via Salon-API-10 once migrated.

## Retail Discovery

Category and problem-intent pages ("frizzy hair shampoos", "smoothing conditioners") are server-rendered collections with their own title, canonical, `ItemList` markup and links from related blog and service pages. See `13_PRODUCT_MODEL.md`.

## Checklist For Any Migrated Page

Same URL, status, canonical, title, description, H1, JSON-LD and visible text as before (or better), verified by comparing the old and new HTML.
