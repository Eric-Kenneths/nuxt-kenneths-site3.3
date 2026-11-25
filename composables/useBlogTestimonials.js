// Adds "read more / close it up" behavior to testimonials embedded in blog HTML from the database.
// Markup contract: <blockquote class="blog-testimonial"><p>…</p><cite>— Name</cite></blockquote>
// Client-only and idempotent. The full text is server-rendered, so crawlers and no-JS visitors see all of it.
// A ResizeObserver re-checks each testimonial when its width changes (rotation, window resize), so the
// button only shows while the text actually overflows 2 lines. Expanded testimonials are left alone.

const SELECTOR = 'blockquote.blog-testimonial:not([data-enhanced])'

export function useBlogTestimonials(containerId = 'main-container') {
  // Per-call (per-component) state, not module-level, so nothing is shared between visitors.
  const items = new Map() // blockquote -> { text, button, expanded, width }
  let observer = null

  function bindBlogTestimonials() {
    if (!import.meta.client) return

    const container = document.getElementById(containerId)
    if (!container) return

    container.querySelectorAll(SELECTOR).forEach(enhance)
  }

  function enhance(quote) {
    quote.dataset.enhanced = 'true'

    // Wrap everything except <cite> so only the testimonial text is clamped.
    const text = document.createElement('div')
    text.className = 'blog-testimonial__text is-clamped'
    Array.from(quote.childNodes)
      .filter((node) => node.nodeName !== 'CITE')
      .forEach((node) => text.appendChild(node))
    quote.prepend(text)

    const textId = `testimonial-${Math.random().toString(36).slice(2, 9)}`
    text.id = textId

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'blog-testimonial__toggle'
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-controls', textId)
    button.textContent = '…read more'
    button.hidden = true
    text.after(button)

    const item = { text, button, expanded: false, width: quote.clientWidth }
    items.set(quote, item)

    button.addEventListener('click', () => {
      item.expanded = !item.expanded
      text.classList.toggle('is-clamped', !item.expanded)
      button.setAttribute('aria-expanded', String(item.expanded))
      button.textContent = item.expanded ? 'Close it up' : '…read more'

      // Collapsing a long testimonial can leave the reader far below it; bring it back into view.
      if (!item.expanded) {
        quote.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    })

    measure(item)
    getObserver()?.observe(quote)
  }

  // Collapsed: the button shows only while the text overflows the 2-line clamp.
  // Expanded: the button always stays so the reader can close it up.
  function measure(item) {
    if (item.expanded) {
      item.button.hidden = false
      return
    }
    item.button.hidden = item.text.scrollHeight <= item.text.clientHeight + 1
  }

  function getObserver() {
    if (observer) return observer
    if (typeof ResizeObserver === 'undefined') return null

    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const item = items.get(entry.target)
        if (!item) continue

        // Only width changes can change line wrapping. Ignoring height avoids a loop with our own toggling.
        const width = Math.round(entry.contentRect.width)
        if (width === item.width) continue
        item.width = width
        measure(item)
      }
    })
    return observer
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    items.clear()
  })

  return { bindBlogTestimonials }
}
