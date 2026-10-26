/*
 * Picks a contextual call-to-action link for a blog post - a plain,
 * server-rendered link to the service or retail page the article is about,
 * shown alongside the generic booking CTA.
 *
 * The target is chosen in this order, stopping at the first match:
 *
 *   1. body    - the service / retail page the article body links to most
 *                (the author already chose it). Specific pages beat hubs.
 *   2. title   - a keyword match on the post title (never for `news` posts,
 *                where words like "nail" or "stylist" show up in careers and
 *                culture stories). Restricted to pages that fit the post group.
 *   3. group   - the hub page for the post group (hair, skin, nails, products).
 *
 * `news` posts only use rule 1, and only when the article links to that page at
 * least twice, so a passing mention doesn't become the CTA. Posts about careers,
 * ownership, awards and votes never get a service CTA.
 *
 * Only pages listed in `targets` are ever returned, so a typo or a retired
 * page in the article HTML can never become a CTA.
 */
export function useBlogCta() {

    const { gtag } = useGtag()

    // Every page a CTA may point at. `kind` drives the label and the ranking:
    // 'service' and 'shop' are specific; 'hub' is a broad landing page.
    const targets = {
        '/services/hair': { name: 'Hair Services', kind: 'hub' },
        '/services/hair/cuts-and-styles': { name: 'Hair Cuts & Styles', kind: 'service' },
        '/services/hair/color': { name: 'Hair Color', kind: 'service' },
        '/services/hair/highlights': { name: 'Highlights', kind: 'service' },
        '/services/hair/treatments': { name: 'Hair Treatments', kind: 'service' },
        '/services/hair/smoothing-and-perms': { name: 'Smoothing & Perms', kind: 'service' },
        '/services/hair/extensions': { name: 'Hair Extensions', kind: 'service' },
        '/services/hair/japanese-head-spa': { name: 'Japanese Head Spa', kind: 'service' },
        '/services/spa': { name: 'Spa Services', kind: 'hub' },
        '/services/spa/facials': { name: 'Facials', kind: 'service' },
        '/services/spa/waxing': { name: 'Waxing', kind: 'service' },
        '/services/spa/brow-and-lash': { name: 'Brow & Lash Services', kind: 'service' },
        '/services/spa/makeup': { name: 'Makeup Services', kind: 'service' },
        '/services/spa/massage': { name: 'Massage', kind: 'service' },
        '/services/spa/spa-bar': { name: 'Spa Bar', kind: 'service' },
        '/services/nail': { name: 'Nail Services', kind: 'hub' },
        '/services/nail/manicures': { name: 'Manicures', kind: 'service' },
        '/services/nail/pedicures': { name: 'Pedicures', kind: 'service' },
        '/shop/retail/top-sellers': { name: 'Top Sellers', kind: 'hub-shop' },
        '/shop/retail/shampoo': { name: 'Shampoo', kind: 'shop' },
        '/shop/retail/conditioner': { name: 'Conditioner', kind: 'shop' },
        '/shop/retail/hair-sprays': { name: 'Hair Sprays', kind: 'shop' },
        '/shop/retail/styling-aids': { name: 'Styling Aids', kind: 'shop' },
        '/shop/retail/nails': { name: 'Nail Products', kind: 'shop' },
        '/shop/retail/skin-care': { name: 'Skin Care', kind: 'shop' },
        '/shop/retail/tools': { name: 'Styling Tools', kind: 'shop' }
    }

    // Which parts of the site a title keyword may send each post group to.
    const groupPrefixes = {
        hair: ['/services/hair', '/shop/retail'],
        skin: ['/services/spa', '/shop/retail'],
        spa: ['/services/spa', '/shop/retail'],
        nails: ['/services/nail', '/shop/retail'],
        products: ['/shop/retail', '/services']
    }

    // Fallback hub per post group. `news` has none on purpose.
    const groupHubs = {
        hair: '/services/hair',
        skin: '/services/spa',
        spa: '/services/spa',
        nails: '/services/nail',
        products: '/shop/retail/top-sellers'
    }

    // Title keyword rules, most specific first.
    const titleRules = [
        [/head spa/i, '/services/hair/japanese-head-spa'],
        [/extension/i, '/services/hair/extensions'],
        [/balayage|highlight|ombre/i, '/services/hair/highlights'],
        [/colou?r|gray|grey|blond|gloss/i, '/services/hair/color'],
        [/keratin|smoothing|\bperms?\b|frizz/i, '/services/hair/smoothing-and-perms'],
        [/facial|skin|acne|dermaplan|peel|hydrafacial/i, '/services/spa/facials'],
        [/\bwax/i, '/services/spa/waxing'],
        [/\bbrows?\b|lash/i, '/services/spa/brow-and-lash'],
        [/make-?up/i, '/services/spa/makeup'],
        [/massage/i, '/services/spa/massage'],
        [/spa bar/i, '/services/spa/spa-bar'],
        [/pedicure/i, '/services/nail/pedicures'],
        [/manicure|\bnails?\b|gel polish/i, '/services/nail/manicures'],
        [/treatment|repair|damage|bond/i, '/services/hair/treatments'],
        [/hair ?cuts?|\bbangs?\b|hairstyles?|\bstyl(e|es|ing)\b/i, '/services/hair/cuts-and-styles'],
        [/shampoo/i, '/shop/retail/shampoo'],
        [/conditioner/i, '/shop/retail/conditioner'],
        [/hair ?sprays?/i, '/shop/retail/hair-sprays'],
        [/\btools?\b|flat iron|curling iron|blow ?dry/i, '/shop/retail/tools']
    ]

    // Titles of posts that are about the company, not a service - no service CTA.
    const companyTitlePattern = /\bcareers?\b|\bhiring\b|join (our|the) team|apprentice|scholarship|ownership in action|\bvot(e|ed|ing)\b|nominated|top picks/i

    // A news post needs at least this many links to a page before it is used.
    const newsMinBodyLinks = 2

    // Reduces an href to a lowercase site path, or null for external links.
    function normalizePath(href) {
        let path = String(href || '').trim()

        if (/^https?:\/\//i.test(path)) {
            if (!/^https?:\/\/(www\.)?kenneths\.com(\/|$|\?|#)/i.test(path)) return null
            path = path.replace(/^https?:\/\/(www\.)?kenneths\.com/i, '')
        }

        if (!path.startsWith('/')) return null

        path = path.split('#')[0].split('?')[0]

        try {
            path = decodeURIComponent(path)
        } catch {
            // leave the path as written
        }

        return path.replace(/\/+$/, '').toLowerCase() || '/'
    }

    function rank(path) {
        const kind = targets[path].kind
        return kind === 'service' || kind === 'shop' ? 2 : 1
    }

    // The most-linked target in the article body ({ path, count }); specific pages beat hubs.
    function findBodyTarget(html) {
        const counts = new Map()

        for (const match of String(html || '').matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
            const path = normalizePath(match[1])
            if (path && targets[path]) {
                counts.set(path, (counts.get(path) || 0) + 1)
            }
        }

        let best = null
        for (const [path, count] of counts) {
            if (!best || rank(path) > rank(best.path) || (rank(path) === rank(best.path) && count > best.count)) {
                best = { path, count }
            }
        }

        return best
    }

    function findTitleTarget(title, group) {
        const prefixes = groupPrefixes[group]
        if (!prefixes) return null

        for (const [pattern, path] of titleRules) {
            if (pattern.test(title || '') && prefixes.some(prefix => path.startsWith(prefix))) {
                return path
            }
        }

        return null
    }

    function buildCta(path, source) {
        const target = targets[path]
        const verb = target.kind === 'shop' || target.kind === 'hub-shop' ? 'Shop' : 'Explore our'

        return { href: path, label: `${verb} ${target.name}`, source }
    }

    /*
     * post: the blogDetail object from the API (htmlContent, title, postGroup).
     * Returns { href, label, source } or null when no contextual CTA fits.
     */
    function resolveBlogCta(post) {
        if (!post) return null

        const group = String(post.postGroup || '').toLowerCase()

        if (companyTitlePattern.test(post.title || '')) return null

        const body = findBodyTarget(post.htmlContent)
        if (body && (group !== 'news' || body.count >= newsMinBodyLinks)) {
            return buildCta(body.path, 'body')
        }

        if (group !== 'news') {
            const titlePath = findTitleTarget(post.title, group)
            if (titlePath) return buildCta(titlePath, 'title')
        }

        if (groupHubs[group]) return buildCta(groupHubs[group], 'group')

        return null
    }

    // Fires a GA4 event (and a matching GTM dataLayer push) when the CTA is clicked.
    function trackBlogCtaClick(cta, postGroup, postRouteName) {
        if (!cta) return

        const payload = {
            cta_target: cta.href,
            cta_text: cta.label,
            cta_source: cta.source,
            post_group: postGroup || '',
            post_route: postRouteName || ''
        }

        if (gtag) {
            gtag('event', 'blog_cta_click', payload)
        }

        if (import.meta.client && window.dataLayer) {
            window.dataLayer.push({ event: 'blog_cta_click', ...payload })
        }
    }

    return {
        resolveBlogCta,
        trackBlogCtaClick
    }
}
