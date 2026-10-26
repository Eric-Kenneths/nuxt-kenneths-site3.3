<template>
  <nav v-if="totalPages > 1" class="mt-8 flex flex-col items-center gap-3" aria-label="Pagination Navigation">
    <p class="sr-only" aria-live="polite" aria-atomic="true">
      Page {{ currentPage }} of {{ totalPages }}
    </p>

    <p class="text-sm font-medium text-primary-900">
      Page {{ currentPage }} of {{ totalPages }}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <!-- First -->
      <a v-if="currentPage > 1" :href="pageHref(1)" rel="first" :class="edgeLinkClass" @click="onClick($event, 1)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span>First</span>
      </a>
      <span v-else :class="[edgeLinkClass, 'opacity-40']" aria-disabled="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span>First</span>
      </span>

      <!-- Previous -->
      <a v-if="currentPage > 1" :href="pageHref(currentPage - 1)" rel="prev" :class="edgeLinkClass"
        @click="onClick($event, currentPage - 1)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </a>
      <span v-else :class="[edgeLinkClass, 'opacity-40']" aria-disabled="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </span>

      <!-- Numbered pages -->
      <ul class="flex flex-wrap items-center justify-center gap-2" role="list">
        <li v-for="page in visiblePages" :key="page">
          <a v-if="typeof page === 'number'" :href="pageHref(page)"
            :aria-current="page === currentPage ? 'page' : undefined"
            :aria-label="page === currentPage ? `Current page, Page ${page}` : `Go to page ${page}`"
            class="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            :class="page === currentPage
              ? 'border-primary-900 bg-primary-900 text-white'
              : 'border-primary-900 text-primary-900 hover:text-primary-500'" @click="onClick($event, page)">
            {{ page }}
          </a>

          <span v-else class="inline-flex min-h-10 min-w-10 items-center justify-center px-2 py-2 text-primary-900"
            aria-hidden="true">
            &hellip;
          </span>
        </li>
      </ul>

      <!-- Next -->
      <a v-if="currentPage < totalPages" :href="pageHref(currentPage + 1)" rel="next" :class="edgeLinkClass"
        @click="onClick($event, currentPage + 1)">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
      <span v-else :class="[edgeLinkClass, 'opacity-40']" aria-disabled="true">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>

      <!-- Last -->
      <a v-if="currentPage < totalPages" :href="pageHref(totalPages)" rel="last" :class="edgeLinkClass"
        @click="onClick($event, totalPages)">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </a>
      <span v-else :class="[edgeLinkClass, 'opacity-40']" aria-disabled="true">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="h-5 w-5" aria-hidden="true" focusable="false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </nav>
</template>

<script setup>
/*
 * Pagination for the blog listing pages. Every control is a real link to a real, crawlable URL
 * (page 1 is the base path, page N is `<base>/page/N`), so search engines can reach every post
 * from the listing pages. A plain click is handled in the page without a full reload: the page
 * listens for `navigate`. Modified clicks (new tab, middle click) fall through to the link.
 */
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  // '/blog' or '/blog/hair'
  basePath: { type: String, required: true }
})

const emit = defineEmits(['navigate'])

const edgeLinkClass =
  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-primary-900 transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

function pageHref(page) {
  return page <= 1 ? props.basePath : `${props.basePath}/page/${page}`
}

function onClick(event, page) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  event.preventDefault()
  emit('navigate', page)
}

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 4) {
    pages.push('start-ellipsis')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 3) {
    pages.push('end-ellipsis')
  }

  pages.push(total)

  return pages
})
</script>
