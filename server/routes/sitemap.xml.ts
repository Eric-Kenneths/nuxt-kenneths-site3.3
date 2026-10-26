// server/routes/sitemap.xml.ts
//
// Automated replacement for the manual admin-tool-and-upload sitemap workflow
// (pages/admin/site-map-generator.vue). Pulls live data from the same API
// endpoints that tool referenced, builds a real sitemap.xml, and deliberately
// excludes anything noindexed elsewhere in the app (booking funnel, checkout,
// search/technician-favorites, /blog/test, gift-card flow, etc.) rather than
// mirroring the admin tool's older list, which included some of those.
//
// NOTE: this route is served from wherever this Nuxt app is deployed
// (mhh.kenneths.com). The web server is configured to forward the specific path 
// for kenneths.com/sitemap.xml — kenneths.com and mhh.kenneths.com are
// separate folders on the server, and robots.txt/sitemap.xml is now served by
// mhh.kenneths.com

import { RETAIL_SITEMAP_SLUGS } from '../../shared/retailGroups';

const API_BASE = 'https://api.kenneths.com/api';
const SITE_URL = 'https://kenneths.com';

const LOCATIONS = [
  'dublin', 'powell', 'polaris', 'westerville', 'new-albany',
  'hilliard', 'upper-arlington', 'pickerington', 'grove-city', 'academy'
];

const SERVICE_SUBTYPES = {
  hair: ['cuts-and-styles', 'color', 'highlights', 'treatments', 'smoothing-and-perms', 'extensions', 'japanese-head-spa'],
  nail: ['manicures', 'pedicures'],
  spa: ['facials', 'waxing', 'brow-and-lash', 'makeup', 'massage', 'spa-bar']
};

const BLOG_CATEGORIES = ['hair', 'skin', 'nails', 'products', 'news'];

// The retail categories come from shared/retailGroups.ts, the same list the category page uses to
// recognise a URL slug, so the sitemap can never list a category the page doesn't know.
// technician-favorites is flagged out there (noindexed, personalized content).
const RETAIL_CATEGORIES = RETAIL_SITEMAP_SLUGS;

// <lastmod> is only written where the API supplies a real date (blog posts, geo-stack pages and
// supporting articles). Pages with no reliable modified date are left without one on purpose:
// a made-up or deploy-date lastmod teaches search engines to ignore the field. <changefreq> is
// omitted for the same reason - it was "daily" for every URL, which isn't true.
interface UrlEntry {
  loc: string;
  priority?: string;
  lastmod?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toLastmodDate(raw: unknown): string | undefined {
  if (typeof raw !== 'string' || !raw) return undefined;
  const match = raw.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : undefined;
}

async function fetchJson(path: string): Promise<any> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${path}`);
  }

  return response.json();
}

async function buildEntries(): Promise<UrlEntry[]> {
  const entries: UrlEntry[] = [];

  // Route values come straight from the database, and a few carry stray spaces (trailing, or inside
  // the slug). Trim each path segment and percent-encode any space left inside it so every <loc>
  // is a valid URL.
  const cleanPath = (path: string) =>
    path.split('/').map((segment) => segment.trim().replace(/ /g, '%20')).join('/');

  const add = (loc: string, priority: string, lastmod?: string) => {
    entries.push({ loc: `${SITE_URL}${cleanPath(loc)}`, priority, lastmod });
  };

  // ---- Static / prerendered pages ----
  add('/', '1.00');
  add('/about', '0.80');
  add('/accessibility-statement', '0.60');
  add('/contact-us', '0.70');
  add('/join-our-team', '0.70');
  add('/privacy-policy', '0.50');
  add('/referral-program', '0.70');
  add('/return-policy', '0.50');
  add('/salon-policy', '0.60');
  add('/services', '0.90');
  add('/training', '0.70');
  add('/blog', '0.80');
  add('/locations', '0.90');
  add('/our-team', '0.80');
  add('/service-menu', '0.80');
  add('/shop/gift-cards', '0.80');
  add('/hair-quiz', '0.70');
  add('/model', '0.70');

  // ---- Blog category pages ----
  for (const category of BLOG_CATEGORIES) {
    add(`/blog/${category}`, '0.85');
  }

  // ---- Locations ----
  for (const loca of LOCATIONS) {
    add(`/locations/${loca}`, '0.85');
  }

  // ---- Service hub + subtype pages ----
  for (const [category, subtypes] of Object.entries(SERVICE_SUBTYPES)) {
    add(`/services/${category}`, '0.85');
    for (const subtype of subtypes) {
      add(`/services/${category}/${subtype}`, '0.85');
    }
  }

  // ---- Retail categories ----
  for (const slug of RETAIL_CATEGORIES) {
    add(`/shop/retail/${slug}`, '0.80');
  }

  // ---- Blog posts ----
  const blogHeaders = await fetchJson('/khsds/Blog/ListHeaders');
  for (const post of Array.isArray(blogHeaders) ? blogHeaders : (blogHeaders?.blogHeaders ?? [])) {
    // Some stored route names carry a trailing space; it must not leak into the <loc>
    const routeName = String(post?.routeName ?? '').trim();

    if (routeName) {
      add(`/blog/post/${routeName}`, '0.75', toLastmodDate(post.audttm) || toLastmodDate(post.publishDate));
    }
  }

  // ---- Geo stack pages ----
  const geoStackResponse = await fetchJson('/Khsds/GeoStackPagesForPublish');
  for (const page of geoStackResponse?.geoStackPageViewModels ?? []) {
    if (page?.locationRoute && page?.pointOfInterestRoute) {
      add(
        `/locations/${page.locationRoute}/${page.pointOfInterestRoute}`,
        '0.70',
        toLastmodDate(page.audttm) || toLastmodDate(page.addttm)
      );
    }
  }

  // ---- Service supporting-stack articles ----
  const stackPageResponse = await fetchJson('/Khsds/SupportingStackPagesForPublish');
  for (const page of stackPageResponse?.supportingStackPages ?? []) {
    if (page?.serviceCategory && page?.serviceTypeRoute && page?.stackPageRoute) {
      add(
        `/services/${page.serviceCategory}/${page.serviceTypeRoute}/${page.stackPageRoute}`,
        '0.70',
        toLastmodDate(page.audttm) || toLastmodDate(page.addttm)
      );
    }
  }

  // ---- Retail products ----
  const itemWebResponse = await fetchJson('/khsds/ItemWeb/SiteMap');
  for (const item of itemWebResponse?.listItemWebForSiteMapViewModels ?? []) {
    if (item?.urlRouteName) {
      add(`/shop/retail/product/${String(item.urlRouteName).toLowerCase()}`, '0.80');
    }
  }

  // ---- Staff profiles ----
  const technicianPositionIds = new Set([26, 33, 34, 35, 43]);
  const employeeResponse = await fetchJson('/employees/SocialMedia/ForWeb/AL');
  for (const employee of employeeResponse?.listSocialMediaByLocationForWebViewModels ?? []) {
    if (employee?.city && employee?.emalias && technicianPositionIds.has(employee.positionId)) {
      add(`/our-team/profile/${employee.city}/${String(employee.emalias).toLowerCase()}`, '0.85');
    }
  }

  return entries;
}

export default defineEventHandler(async (event) => {
  let entries: UrlEntry[];

  try {
    entries = await buildEntries();
  } catch (e: any) {
    setResponseStatus(event, 500);
    return `Sitemap generation failed: ${e?.message || 'unknown error'}`;
  }

  const body = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '';
      return `<url><loc>${escapeXml(entry.loc)}</loc>${lastmod}<priority>${entry.priority}</priority></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  event.node.res.setHeader('content-type', 'application/xml; charset=utf-8');
  event.node.res.end(xml);
});
