/*
 * Tracks file-download clicks (PDF, Office docs, zip) that originate from
 * CMS-authored blog HTML rendered via v-html into #main-container.
 *
 * A single delegated click listener is bound to the container, so it keeps
 * working when the article HTML changes and needs no per-link wiring. Blog
 * authors only add a normal link:
 *
 *   <a class="blog-button"
 *      href="https://kenneths.com/pdfs/bridal-glow-guide.pdf" download>
 *     The Bridal Glow Guide
 *   </a>
 *
 * Each qualifying click fires a GA4 `file_download` event (via nuxt-gtag)
 * and a matching GTM dataLayer push.
 */
export function useBlogDownloads() {

    const { gtag } = useGtag()

    // Extensions treated as downloads (mirrors GA4 Enhanced Measurement's list).
    const trackedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'zip']

    // Change this if GA4 Enhanced Measurement "File downloads" is left ON, to
    // avoid two `file_download` events per click (e.g. 'blog_file_download').
    const eventName = 'file_download'

    function stripQueryAndHash(url) {
        return url.split('?')[0].split('#')[0]
    }

    function getFileName(url) {
        const path = stripQueryAndHash(url)
        return decodeURIComponent(path.substring(path.lastIndexOf('/') + 1))
    }

    function getExtension(url) {
        const name = getFileName(url)
        const dot = name.lastIndexOf('.')
        return dot === -1 ? '' : name.substring(dot + 1).toLowerCase()
    }

    function trackDownloadClick(event) {
        const link = event.target.closest('a[href]')
        if (!link) return

        const url = link.href
        const extension = getExtension(url)
        if (!trackedExtensions.includes(extension)) return

        const payload = {
            file_name: getFileName(url),
            file_extension: extension,
            link_text: (link.textContent || '').trim(),
            link_url: url,
            event_source: 'blog_post'
        }

        if (gtag) {
            gtag('event', eventName, payload)
        }

        if (window.dataLayer) {
            window.dataLayer.push({ event: eventName, ...payload })
        }
    }

    /*
     * Bind the delegated listener to the article container. Safe to call more
     * than once - it only binds a single listener per container.
     */
    function bindBlogDownloadTracking(containerId = 'main-container') {
        if (!import.meta.client) return

        const container = document.getElementById(containerId)
        if (!container || container.dataset.downloadTrackingBound) return

        container.dataset.downloadTrackingBound = 'true'
        container.addEventListener('click', trackDownloadClick)
    }

    return {
        bindBlogDownloadTracking
    }
}
