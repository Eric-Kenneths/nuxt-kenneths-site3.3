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

    <!-- Blog Container -->
    <div class="min-h-screen bg-primary-100 text-primary-900 p-6 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 mb-6">
        <!-- Controls -->

        <!-- Left: Search -->
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4 w-full justify-start">
          <!-- Search Box -->
          <div class="w-full md:w-80 mt-3 md:mt-0">
            <label for="blog-search" class="sr-only">Search blog titles</label>

            <input id="blog-search" v-model.trim="searchQuery" @input="applySearch" @keyup.enter="applySearch"
              type="search" placeholder="Search..."
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
        <div class="text-left md:text-right text-sm md:text-base" aria-live="polite">
          Showing {{ totalResults }} results
        </div>
      </div>

      <!-- Blog Feed -->
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          <div v-for="header in paginatedItems" :key="header.routeName"
            class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
            <div class="bg-primary-100 p-4 h-full flex flex-col">
              <div v-if="header.photoName" class="relative mb-2">
                <img :src="'https://kenneths.com/static/blog/' + header.photoName" :alt="header.title"
                  class="w-full h-full mb-2" loading="lazy" decoding="async" />
                <a :href="getCategoryHref(header.postGroup)"
                  class="absolute top-3 right-3 bg-primary-500 text-primary-900 text-sm font-semibold px-3 py-1 shadow-md">
                  {{ header.postGroup.toUpperCase() }}
                </a>
              </div>

              <p class="text-sm mb-2 mt-4">
                {{ filterDateTimeToDate(header.publishDate) }}
              </p>

              <h2 class="mb-2">
                <a :href="'/blog/post/' + header.routeName" class="text-2xl font-bold">
                  {{ header.title }}
                </a>
              </h2>

              <!-- Sub title -->
              <h3 class="my-2 cursor-pointer sans-serif font-normal text-xl lg:text-base content-height">
                <div class="mr-2">
                  <a :href="'/blog/post/' + header.routeName" class="blog-link"
                    v-text="buildSubtitlePreview(header.subTitle)"></a>
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

        <!-- Pagination: real links to /blog/page/N so every post is reachable from the listing -->
        <blog-pagination :current-page="currentPage" :total-pages="totalPages" :base-path="basePath"
          @navigate="goToPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { appGlobal } from '~/composables/appGlobal';
import { dataGlobal } from '~/composables/dataGlobal';
import { useFilters } from '~/composables/useFilters';
import { useHead, useFetch } from '#imports';

// /blog is page 1; /blog/page/N are the following pages (same component, so browsing stays in-app)
definePageMeta({
  alias: ['/blog/page/:page(\\d+)']
});

/* --- Setup --- */
dataGlobal.sideBarVisible = false;
const { filterDateTimeToDate } = useFilters();
const router = useRouter();
const route = useRoute();
const { throwError } = useResponse();

const basePath = '/blog';

// Page number from the URL (1 when there is none)
const routePage = computed(() => {
  const value = route.params.page;
  return value === undefined ? 1 : Number.parseInt(String(value), 10);
});

const pageTitle = computed(() =>
  routePage.value > 1
    ? `Featured Blog - Page ${routePage.value} | Kenneth's`
    : "Featured Blog Columbus OH | Kenneth's"
);

const category = computed(() => 'featured')

const categoryLabel = computed(() => 'Featured')

const pageUrl = computed(() =>
  routePage.value > 1 ? `https://kenneths.com${basePath}/page/${routePage.value}` : `https://kenneths.com${basePath}`
)

const pageImage = 'https://kenneths.com/images/icons/logo-dark-medium.webp'

const pageImageAlt = "Featured articles from Kenneth's Hair Salons And Day Spas"

/* --- Helpers --- */
function normalizeInlineText(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .trimEnd();
}

function buildSubtitlePreview(value) {
  const clean = normalizeInlineText(value);
  return clean ? `${clean}. . .` : '';
}

/* --- Dropdown State --- */
const open = ref(false);
const dropdown = ref(null);
const selectedCategory = ref('');
const selectedLabel = ref('Categories');

const categories = [
  { label: 'Hair', value: 'hair' },
  { label: 'Skin', value: 'skin' },
  { label: 'Nails', value: 'nails' },
  { label: 'Products', value: 'products' },
  { label: 'News', value: 'news' }
];

/* --- Click Outside --- */
function handleClickOutside(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) {
    open.value = false;
  }
}
onMounted(() => window.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));

/* --- JSON-LD for Blog Listing --- */
const jsonLDString = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Kenneth's Salon & Spa Blog",
  "url": "https://kenneths.com/blog",
  "description": "Kenneth's salon and spa blog shares expert tips and stories about hair, skin, nails, seasonal trends, self-care, new services, and news for guests across Columbus and Central Ohio.",
  "publisher": {
    "@type": "Organization",
    "name": "Kenneth's Hair Salons and Day Spas",
    "@id": "https://kenneths.com/#organization",
    "url": "https://kenneths.com",
    "areaServed": "Columbus, Ohio and Central Ohio"
  },
  "inLanguage": "en-US"
});

/* --- Meta Info --- */
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
      content:
        "Explore featured stories from Kenneth's Hair Salons and Day Spas, including salon news, beauty tips, service highlights, product recommendations, and community updates from Central Ohio."
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
      content:
        "Explore featured stories from Kenneth's Hair Salons and Day Spas, including salon news, beauty tips, service highlights, product recommendations, and community updates from Central Ohio."
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
      content: pageImageAlt
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
      content:
        "Explore featured stories from Kenneth's Hair Salons and Day Spas, including salon news, beauty tips, service highlights, product recommendations, and community updates from Central Ohio."
    },
    {
      name: 'twitter:image',
      content: pageImage
    },
    {
      name: 'twitter:image:alt',
      content: pageImageAlt
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: jsonLDString
    }
  ]
})

/* --- Fetch Landing Blog Data (/blog) --- */
const state = reactive({
  postDisplayHeaders: [],
  postHeaders: []
});

const itemsPerPage = 9;
const currentPage = ref(1);
const pageParam = () => route.params.page;

/* --- Search State --- */
const searchQuery = ref('');

/* Fetch full list, then apply current search (empty by default) */
const { data: postHeaders } = await useFetch(`${appGlobal.apiBaseUrl}/khsds/Blog/ListHeaders`, {
  default: () => []
});

if (postHeaders.value?.length) {
  state.postHeaders = postHeaders.value.map((header) => ({
    ...header,
    subTitle: normalizeInlineText(header?.subTitle)
  }));
  state.postDisplayHeaders = [...state.postHeaders];
}

/* --- Filtering by title keywords (ALL typed terms must appear) --- */
function applySearch() {
  const q = searchQuery.value.toLowerCase().trim();

  if (!q) {
    state.postDisplayHeaders = [...state.postHeaders];
  } else {
    const terms = q.split(/\s+/).filter(Boolean);
    state.postDisplayHeaders = state.postHeaders.filter(h => {
      const title = String(h?.title || '').toLowerCase();
      return terms.every(t => title.includes(t));
    });
  }

  currentPage.value = pageFromRoute();
}

/* Page shown for the URL: 1 while searching, otherwise the page number in the address */
function pageFromRoute() {
  if (searchQuery.value.trim()) return 1;
  return Math.min(Math.max(routePage.value || 1, 1), totalPages.value);
}

/* Searching starts on page 1; clearing the search returns to the page in the URL */
watch(searchQuery, () => {
  currentPage.value = pageFromRoute();
});

/* Back/forward and shared links change the page through the URL */
watch(pageParam, () => {
  currentPage.value = pageFromRoute();
});

/* --- Pagination from filtered results --- */
const allItems = computed(() => state.postDisplayHeaders || []);
const totalPages = computed(() => Math.max(1, Math.ceil(allItems.value.length / itemsPerPage)));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allItems.value.slice(start, start + itemsPerPage);
});
const totalResults = computed(() => `${paginatedItems.value.length} of ${allItems.value.length}`);

/* A page number in the URL has to exist: /blog/page/1 is the same as /blog, and pages past the end are 404s */
if (route.params.page !== undefined) {
  if (routePage.value === 1) {
    await navigateTo(basePath, { redirectCode: 301 });
  } else if (routePage.value < 1 || routePage.value > totalPages.value) {
    throwError(404, `Blog page ${routePage.value} not found`);
  }
}

currentPage.value = pageFromRoute();

/* rel=prev / rel=next for the page sequence */
useHead(() => ({
  link: [
    ...(routePage.value > 1
      ? [{ rel: 'prev', href: routePage.value === 2 ? `https://kenneths.com${basePath}` : `https://kenneths.com${basePath}/page/${routePage.value - 1}` }]
      : []),
    ...(routePage.value < totalPages.value
      ? [{ rel: 'next', href: `https://kenneths.com${basePath}/page/${routePage.value + 1}` }]
      : [])
  ]
}));

/* --- Pagination --- */
function goToPage(page) {
  const target = Math.min(Math.max(page, 1), totalPages.value);
  currentPage.value = target;

  // With no search text the page number lives in the URL, so links, back and forward all work
  if (!searchQuery.value.trim()) {
    router.push(target <= 1 ? basePath : `${basePath}/page/${target}`);
  }
}

/* --- Legacy helper, now calls search init for parity --- */
function displayedRecords() {
  applySearch();
}

function getCategoryHref(value) {
  const normalized = String(value || '').toLowerCase()

  if (normalized === 'featured') return '/blog'
  if (normalized === 'spa') return '/blog/skin'
  if (normalized === 'hair') return '/blog/hair'
  if (normalized === 'skin') return '/blog/skin'
  if (normalized === 'nails') return '/blog/nails'
  if (normalized === 'products') return '/blog/products'
  if (normalized === 'news') return '/blog/news'

  return '/blog'
}
</script>

<style scoped></style>