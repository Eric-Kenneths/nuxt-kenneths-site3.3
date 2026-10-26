/*
 * Search-result friendly title and meta description for a blog post.
 *
 * The stored post title stays exactly as written: it is the page H1, and the
 * article URL is built from it, so nothing here changes it. These helpers only
 * shape the <title> tag and the meta description the page publishes.
 *
 *   Title       "<title> | Kenneth's Blog" when that fits in 65 characters,
 *               else "<title> | Kenneth's" (always, even past 65, so it never
 *               matches the H1). The title itself is never truncated.
 *   Description the subtitle, tidied and cut to 155 characters - at the end of
 *               a sentence when there is one in range, otherwise at a word
 *               boundary with an ellipsis.
 */
export function useBlogSeo() {

    const maxTitleLength = 65
    const maxDescriptionLength = 155
    const minSentenceLength = 90

    // Strips tags, decodes the few entities that turn up, and collapses whitespace.
    function cleanText(value) {
        return String(value || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/gi, ' ')
            .replace(/&amp;/gi, '&')
            .replace(/&quot;/gi, '"')
            .replace(/&#0?39;|&apos;/gi, "'")
            .replace(/\s+/g, ' ')
            .trim()
    }

    // The post title with stray spaces removed, for the H1-equivalent uses (social, schema).
    function cleanBlogTitle(title) {
        return cleanText(title)
    }

    function buildBlogTitle(title, fallback) {
        const clean = cleanText(title)

        if (!clean) return fallback

        const candidates = [`${clean} | Kenneth's Blog`, `${clean} | Kenneth's`]

        // Long titles still get the short suffix so the <title> never duplicates the H1;
        // search results would cut off only the suffix, not the title.
        return candidates.find(candidate => candidate.length <= maxTitleLength) || candidates[1]
    }

    function buildBlogDescription(subTitle, fallback) {
        const text = cleanText(subTitle)

        if (!text) return fallback
        if (text.length <= maxDescriptionLength) return text

        // Prefer ending on a full sentence that still leaves a useful description
        let sentenceEnd = -1
        for (const match of text.slice(0, maxDescriptionLength).matchAll(/[.!?](?=\s|$)/g)) {
            sentenceEnd = match.index + 1
        }

        if (sentenceEnd >= minSentenceLength) {
            return text.slice(0, sentenceEnd)
        }

        // Otherwise cut at a word boundary and add an ellipsis (still within the limit)
        const room = text.slice(0, maxDescriptionLength - 1)
        const lastSpace = room.lastIndexOf(' ')
        const cut = lastSpace > 60 ? room.slice(0, lastSpace) : room

        return cut.replace(/[\s,;:–—-]+$/, '') + '…'
    }

    return {
        cleanBlogTitle,
        buildBlogTitle,
        buildBlogDescription
    }
}
