# 13_PRODUCT_MODEL

Retail products are being moved from the KHSDS `wan.Item*` tables to the Salon database `product` schema, fed from Zenoti through the DataLake. This file records the decisions. Backend tables are built in Salon-API-10.

## Source Feed

Zenoti S3 extracts land in the DataLake database. `DataLake.dbo.DimProduct` (and `DimItems`) are the feed. A SQL Agent sync fills a master product table in Salon, like the planned `DimService` sync. Synced columns are overwritten by the sync; website-controlled columns are never overwritten.

## Legacy To New Mapping

| KHSDS | Salon `product` schema | Role |
| --- | --- | --- |
| `wan.Item` | `Product` | Master list; sync only. One row per sellable size/variant |
| `wan.ItemWeb` | `ProductWeb` | What staff chooses to show: name, description, URL route, default size, group, order, brand |
| `wan.ItemWebGroup` | `ProductWebGroup` | Top-level groups (Shampoo, Conditioner, ...) |
| `wan.ItemWebCategory` | `ProductWebCategory` | "Shop by" categories within a group |
| `wan.ItemWebShopBy` | `ProductWebShopBy` | Links a web product to categories |
| `wan.ItemWebSearch` | `ProductWebSearch` | Search words |

Names are suggestions until reviewed in Salon-API-10 (use schema `product`, not "Item").

## Business Rules

- `Product` is the master; `ProductWeb` is the subset shown on the site. Not everything in `Product` is shown.
- **Professional products** (used in-house by stylists, technicians, estheticians and spa staff) are never shown on the web. The sync must keep them identifiable and they must never be exposed by a website endpoint.
- One master product can have several rows (sizes). A web product is a single page with size options, not several pages. `ProductWeb.defsizeitemid` (legacy) picks the default size.
- Staff manage `ProductWeb`: what is shown, descriptions, URL route name, order and any consumer-facing information.
- Preserve current product URL slugs (`UrlRouteName`) and the 410 behavior for discontinued products.

## DataLake Gaps (to confirm against real data)

`DimProduct` has name, code, brand, category, `MRP`, `Retail`, `void`, sold-out, new/recommended, meta text, tags, volume and size. It has no images, no web-order/sort fields, no shipping weight/dimensions, and no URL slug. Those come from `ProductWeb` or must be mapped from KHSDS during a one-time migration.

## SEO Goal

Rank for problem-intent searches ("frizzy hair shampoos", "frizzy hair conditioners", "smoothing shampoos", "smoothing conditioners"). The shop-by categories and search words should drive indexable, server-rendered collection pages with `ItemList` markup, linked from related blog and service pages.

## Rules For Frontend Code

- Do not touch retail checkout when working on discovery pages.
- Keep `shared/retailGroups.ts` as the single category list until `ProductWebGroup` replaces it.
