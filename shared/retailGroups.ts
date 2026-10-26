// shared/retailGroups.ts
//
// The single list of retail categories. The retail category page
// (pages/shop/retail/[groupDescription].vue) uses it to recognise a URL slug and to map it to the
// API's group code, and the sitemap route (server/routes/sitemap.xml.ts) uses it to decide which
// category URLs to publish. Add, rename or remove a category here and both follow.
//
// `urlDescrip` is the slug in /shop/retail/<slug>, `code` is the API's retail group code, and
// `inSitemap` is false for pages that must not be advertised to search engines.

export interface RetailGroup {
  description: string;
  code: number;
  urlDescrip: string;
  inSitemap: boolean;
}

export const RETAIL_GROUPS: RetailGroup[] = [
  { description: "Top Sellers", code: 14, urlDescrip: "top-sellers", inSitemap: true },
  { description: "Shampoo", code: 1, urlDescrip: "shampoo", inSitemap: true },
  { description: "Conditioner", code: 2, urlDescrip: "conditioner", inSitemap: true },
  { description: "Hair Sprays", code: 3, urlDescrip: "hair-sprays", inSitemap: true },
  { description: "Styling Aids", code: 4, urlDescrip: "styling-aids", inSitemap: true },
  { description: "Men's", code: 5, urlDescrip: "men's", inSitemap: true },
  { description: "Nails", code: 6, urlDescrip: "nails", inSitemap: true },
  { description: "Skin Care", code: 7, urlDescrip: "skin-care", inSitemap: true },
  { description: "Tools", code: 9, urlDescrip: "tools", inSitemap: true },
  // Noindexed, personalized content - deliberately kept out of the sitemap
  { description: "Technician Favorites", code: 16, urlDescrip: "technician-favorites", inSitemap: false }
];

// Slugs published in the sitemap
export const RETAIL_SITEMAP_SLUGS: string[] = RETAIL_GROUPS
  .filter((group) => group.inSitemap)
  .map((group) => group.urlDescrip);
