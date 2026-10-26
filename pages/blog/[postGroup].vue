<template>
  <div class="min-h-screen bg-primary-900 text-primary-100 pt-35 max-w-[1600px] mx-auto">
    <!-- Header -->
    <div class="grid grid-cols-1 items-center">
      <div class="flex items-center justify-center space-x-6 pt-25 lg:pt-10 pb-15 lg:pb-10 bg-primary-100">
        <h1 class="text-4xl lg:text-6xl text-primary-900 font-thin uppercase text-center">
          Inside the Salon + Spa <br>
          {{ categoryLabel }}
        </h1>
      </div>
    </div>

    <blog-menu />

    <div class="min-h-screen bg-primary-100 text-primary-900">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Row 1: Controls -->
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 mb-6">
          <!-- Left: Search -->
          <div class="flex flex-col md:flex-row md:items-center md:space-x-4 w-full justify-start">
            <div class="w-full md:w-80 mt-3 md:mt-0">
              <label for="blog-search" class="sr-only">Search blog titles</label>

              <input id="blog-search" v-model.trim="searchQuery" @input="applySearch" @keyup.enter="applySearch"
                type="search" placeholder="Search titles..."
                class="w-full px-4 py-2 border border-primary-900 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-primary-900 cursor-text caret-primary-900"
                aria-describedby="search-help" />

              <p id="search-help" class="sr-only">
                Type keywords to filter results by title.
              </p>
            </div>
          </div>

          <!-- Spacer -->
          <div></div>

          <!-- Right: Results text -->
          <div class="text-left md:text-right text-sm md:text-base justify-self-end">
            Showing {{ paginatedItems.length }} of {{ totalResults }} results
          </div>
        </div>

        <!-- Error State -->
        <div v-if="state.error" class="text-center py-20 text-red-600 text-xl font-semibold" role="alert">
          {{ state.error }}
        </div>

        <!-- Posts Grid -->
        <div v-else-if="!state.loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(header, id) in paginatedItems" :key="header.routeName || id"
            class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
            <div class="bg-primary-100 p-4 h-full flex flex-col">
              <div v-if="header.photoName" class="relative mb-2">
                <img :src="'https://kenneths.com/static/blog/' + header.photoName" :alt="header.title"
                  class="w-full h-full mb-6" loading="lazy" decoding="async" />

                <a :href="'/blog/' + getCategorySlug(header.postGroup)"
                  class="absolute top-3 right-3 bg-primary-500 text-primary-900 text-sm font-semibold px-3 py-1 shadow-md">
                  {{ String(header.postGroup || category).toUpperCase() }}
                </a>
              </div>

              <p class="text-sm mb-2 mt-2">
                {{ filterDateTimeToDate(header.publishDate) }}
              </p>

              <h2 class="mb-2">
                <a :href="'/blog/post/' + header.routeName" class="text-2xl font-bold">
                  {{ header.title }}
                </a>
              </h2>

              <h3 class="my-2 cursor-pointer sans-serif font-normal text-xl lg:text-base content-height">
                <div class="mr-2">
                  <a :href="'/blog/post/' + header.routeName" class="blog-link">
                    {{ header.subTitle }}. . .
                  </a>
                </div>
              </h3>

              <div class="mt-auto">
                <a class="inline-block w-35 py-2 px-3 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap text-center"
                  :href="'/blog/post/' + header.routeName">
                  <span aria-hidden="true">READ MORE</span>
                  <span class="sr-only">{{ header.title }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div v-else class="text-center py-20 text-primary-900 text-xl">
          <svg class="animate-spin h-10 w-10 text-primary-500 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>

          <p class="text-lg text-primary-500 font-medium">
            Loading blog posts...
          </p>
        </div>

        <!-- Empty State -->
        <div v-if="!state.loading && !state.error && filteredItems.length === 0"
          class="text-center py-16 text-primary-900 text-lg">
          No blog posts found.
        </div>

        <!-- Pagination: real links to /blog/<category>/page/N so every post is reachable from the listing -->
        <blog-pagination v-if="!state.loading && !state.error" :current-page="currentPage" :total-pages="totalPages"
          :base-path="basePath" @navigate="goToPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'
import { useFilters } from '~/composables/useFilters'
import { useHead, useAsyncData } from '#imports'

// /blog/<category> is page 1; /blog/<category>/page/N are the following pages
definePageMeta({
  alias: ['/blog/:postGroup/page/:page(\\d+)']
})

dataGlobal.sideBarVisible = false

const route = useRoute()
const router = useRouter()
const { throwError } = useResponse()
const { filterDateTimeToDate } = useFilters()

const validCategories = ['featured', 'hair', 'skin', 'nails', 'news', 'products']

const requestedCategory = typeof route.params.postGroup === 'string' ? route.params.postGroup.toLowerCase() : ''

// Only the known categories are real pages: /blog/page, /blog/anything-else and the like are 404s
if (!validCategories.includes(requestedCategory)) {
  throwError(404, `Blog category "${requestedCategory}" not found`)
}

const category = computed(() => {
  const param = route.params.postGroup
  const value = typeof param === 'string' ? param.toLowerCase() : ''

  return validCategories.includes(value) ? value : 'featured'
})

// '/blog' for the featured list, '/blog/<category>' otherwise; page N adds '/page/N'
const basePath = computed(() => (category.value === 'featured' ? '/blog' : `/blog/${category.value}`))

// Page number from the URL (1 when there is none)
const routePage = computed(() => {
  const value = route.params.page
  return value === undefined ? 1 : Number.parseInt(String(value), 10)
})

const categoryLabel = computed(() => {
  if (category.value === 'featured') return 'Featured'
  if (category.value === 'news') return 'News'

  return category.value.toUpperCase()
})

const categoryMeta = {
  featured: {
    title: "Featured Blog Columbus OH | Kenneth's",
    description:
      "Explore featured stories from Kenneth's Hair Salons and Day Spas, including salon news, beauty tips, service highlights, product recommendations, and community updates from Central Ohio."
  },
  hair: {
    title: "Hair Care Blog Columbus OH | Kenneth's",
    description:
      "Explore Kenneth's hair care blog for guests in Columbus, OH and Central Ohio, featuring expert tips on cuts, color, extensions, scalp health, seasonal trends, and salon treatments to keep your hair healthy and styled."
  },
  skin: {
    title: "Skin Care Blog Columbus OH | Kenneth's",
    description:
      "Browse Kenneth's skin care blog for guests in Columbus, OH and Central Ohio, with esthetician-led advice on facials, peels, acne care, oncology-safe skincare, seasonal routines, and products for radiant, healthy skin."
  },
  nails: {
    title: "Nail Care Blog Columbus OH | Kenneth's",
    description:
      "Discover Kenneth's nail care blog for guests in Columbus, OH and Central Ohio, featuring manicure and pedicure ideas, nail health tips, seasonal nail art, and product spotlights from our salon and spa nail experts."
  },
  products: {
    title: "Beauty Products Blog Columbus OH | Kenneth's",
    description:
      "Read Kenneth's beauty products blog for guests in Columbus, OH and Central Ohio, highlighting stylist- and esthetician-approved hair, skin, and nail products, how-to guides, and recommendations to upgrade your routine."
  },
  news: {
    title: "Salon & Spa News Columbus OH | Kenneth's",
    description:
      "Stay up to date with Kenneth's salon and spa news in Columbus, OH and Central Ohio, including new services, spa concepts, special offers, community initiatives, and award announcements from our 10 locations."
  }
}

const currentMeta = computed(() => categoryMeta[category.value])

// Later pages get their own title ("... - Page 2 | Kenneth's") so they are not duplicates of page 1
const pageTitle = computed(() =>
  routePage.value > 1
    ? currentMeta.value.title.replace(/ \| Kenneth's$/, ` - Page ${routePage.value} | Kenneth's`)
    : currentMeta.value.title
)

const pageUrl = computed(() =>
  routePage.value > 1
    ? `https://kenneths.com${basePath.value}/page/${routePage.value}`
    : `https://kenneths.com${basePath.value}`
)

const pageImage = 'https://kenneths.com/images/icons/logo-dark-medium.webp'

const pageImageAlt = computed(() =>
  `${categoryLabel.value} articles from Kenneth's Hair Salons And Day Spas`
)

const jsonLDString = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name:
      "Kenneth's " +
      categoryLabel.value.charAt(0).toUpperCase() +
      categoryLabel.value.slice(1).toLowerCase() +
      (category.value === 'news' ? ' News' : ' Blog'),
    url: pageUrl.value,
    description: currentMeta.value.description,
    publisher: {
      '@type': 'Organization',
      name: "Kenneth's Hair Salons and Day Spas",
      '@id': 'https://kenneths.com/#organization',
      url: 'https://kenneths.com',
      areaServed: 'Columbus, Ohio and Central Ohio'
    },
    inLanguage: 'en-US'
  })
)

useHead({
  title: () => pageTitle.value,
  link: [
    {
      rel: 'canonical',
      href: () => pageUrl.value
    }
  ],
  meta: [
    {
      name: 'description',
      content: () => currentMeta.value.description
    },

    // Open Graph
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: () => pageTitle.value
    },
    {
      property: 'og:description',
      content: () => currentMeta.value.description
    },
    {
      property: 'og:url',
      content: () => pageUrl.value
    },
    {
      property: 'og:image',
      content: pageImage
    },
    {
      property: 'og:image:secure_url',
      content: pageImage
    },
    {
      property: 'og:image:type',
      content: 'image/webp'
    },
    {
      property: 'og:image:alt',
      content: () => pageImageAlt.value
    },
    {
      property: 'og:site_name',
      content: "Kenneth's Hair Salons And Day Spas"
    },
    {
      property: 'og:locale',
      content: 'en_US'
    },

    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: () => pageTitle.value
    },
    {
      name: 'twitter:description',
      content: () => currentMeta.value.description
    },
    {
      name: 'twitter:image',
      content: pageImage
    },
    {
      name: 'twitter:image:alt',
      content: () => pageImageAlt.value
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: () => jsonLDString.value
    }
  ]
})

const itemsPerPage = 9
const currentPage = ref(1)
const searchQuery = ref('')

const { data: postHeaders, pending, error } = await useAsyncData(
  () => `blogHeaders-${category.value}`,
  async () => {
    if (!category.value) return []

    const url = `${appGlobal.apiBaseUrl}/khsds/Blog/ListHeaders/${category.value}`
    return await $fetch(url)
  },
  {
    watch: [category],
    default: () => []
  }
)

const state = reactive({
  loading: computed(() => pending.value),
  error: computed(() =>
    error.value ? error.value.message || 'Failed to load blog posts.' : null
  )
})

const allItems = computed(() =>
  Array.isArray(postHeaders.value) ? postHeaders.value : []
)

const filteredItems = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()

  if (!q) return allItems.value

  const terms = q.split(/\s+/).filter(Boolean)

  return allItems.value.filter(header => {
    const title = String(header?.title || '').toLowerCase()
    return terms.every(term => title.includes(term))
  })
})

const totalResults = computed(() => filteredItems.value.length)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage))
)

/* Page shown for the URL: 1 while searching, otherwise the page number in the address */
function pageFromRoute() {
  if (searchQuery.value.trim()) return 1

  return Math.min(Math.max(routePage.value || 1, 1), totalPages.value)
}

/* A page number in the URL has to exist: page 1 is the base URL, and pages past the end are 404s */
if (route.params.page !== undefined) {
  if (category.value === 'featured') {
    await navigateTo(routePage.value <= 1 ? '/blog' : `/blog/page/${routePage.value}`, { redirectCode: 301 })
  } else if (routePage.value === 1) {
    await navigateTo(basePath.value, { redirectCode: 301 })
  } else if (routePage.value < 1 || routePage.value > totalPages.value) {
    throwError(404, `Blog page ${routePage.value} not found`)
  }
}

currentPage.value = pageFromRoute()

/* rel=prev / rel=next for the page sequence */
useHead(() => ({
  link: [
    ...(routePage.value > 1
      ? [{ rel: 'prev', href: routePage.value === 2 ? `https://kenneths.com${basePath.value}` : `https://kenneths.com${basePath.value}/page/${routePage.value - 1}` }]
      : []),
    ...(routePage.value < totalPages.value
      ? [{ rel: 'next', href: `https://kenneths.com${basePath.value}/page/${routePage.value + 1}` }]
      : [])
  ]
}))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

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

watch(searchQuery, () => {
  currentPage.value = pageFromRoute()
})

watch(category, () => {
  searchQuery.value = ''
  currentPage.value = pageFromRoute()
})

/* Back/forward and shared links change the page through the URL */
watch(() => route.params.page, () => {
  currentPage.value = pageFromRoute()
})

function applySearch() {
  currentPage.value = pageFromRoute()
}

function goToPage(page) {
  if (typeof page !== 'number') return

  const target = Math.min(Math.max(page, 1), totalPages.value)
  currentPage.value = target

  // With no search text the page number lives in the URL, so links, back and forward all work
  if (!searchQuery.value.trim()) {
    router.push(target <= 1 ? basePath.value : `${basePath.value}/page/${target}`)
  }
}

function getCategorySlug(value) {
  const normalized = String(value || '').toLowerCase()

  if (normalized === 'featured') return ''
  if (normalized === 'hair') return 'hair'
  if (normalized === 'skin') return 'skin'
  if (normalized === 'spa') return 'skin'
  if (normalized === 'nails') return 'nails'
  if (normalized === 'news') return 'news'
  if (normalized === 'products') return 'products'

  return category.value
}
</script>