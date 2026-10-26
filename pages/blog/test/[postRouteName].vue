<template>
  <div class="blog-page bg-primary-100 text-primary-900 mt-30 overflow-x-hidden" vocab="https://schema.org/"
    typeof="WebPage">
    <!-- Blog Post Content -->
    <div v-if="state.displayError === false" class="mx-auto mt-2 w-full max-w-[800px] px-6 sm:px-8 md:px-0">
      <div class="pb-4 md:pb-6 cursor-pointer text-primary-900 hover:text-primary-700 text-left gap-1 pt-1 px-1"
        role="button" tabindex="0" aria-label="Go back to previous page" @click="goBack" @keydown.enter.prevent="goBack"
        @keydown.space.prevent="goBack">
        ← Back
      </div>

      <!-- Blog header -->
      <header>
        <h1 class="pt-5 pb-3 md:pt-10 md:pb-5">
          {{ state.postDetails.title }}
        </h1>
      </header>

      <!-- Meta info -->
      <p class="text-sm p-primary-400 text-center">
        By {{ state.postDetails.author }}
        <br>
        {{ filterDateTimeToDate(state.postDetails.publishDate) }}
      </p>

      <!-- Blog content -->
      <article id="main-container" v-html="state.postDetails.htmlContent"
        class="prose prose-invert max-w-none overflow-x-hidden break-words" />

      <!-- Call to Action -->
      <div class="w-full max-w-[600px] mx-auto bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
        <div class="bg-primary-100 p-6 md:p-10 md:min-h-[250px] flex items-center justify-center">
          <div class="text-primary-900 text-center leading-[2.2]">
            <h3>{{ postGroupText.heading }}</h3>
            <p v-if="blogCta">
              <a :href="blogCta.href" class="underline font-semibold" @click="onBlogCtaClick">
                {{ blogCta.label }} &rarr;
              </a>
            </p>
            <p>
              Call us at
              <a href="tel:614-538-5800" class="underline">614-538-5800</a>
              or
              <a href="https://kenneths.com/app/" class="underline">book online</a>
              {{ postGroupText.cta }}
            </p>

            <div class="mt-4 flex justify-center">
              <pop-up-menu>
                <template #trigger>
                  <div
                    class="inline-block w-38 py-2 px-3 rounded-3xl bg-primary-900 text-primary-100 hover:bg-primary-emphasis whitespace-nowrap text-center cursor-pointer transition">
                    Book Now
                  </div>
                </template>

                <template #links>
                  <div class="sans-serif p-3 text-left">
                    <a class="text-xl link block" href="https://kenneths.com/app/">
                      Existing Customer
                    </a>
                  </div>

                  <div class="sans-serif p-3 text-left">
                    <a class="text-xl link block" href="/book/new/service-type">
                      New Customer
                    </a>
                  </div>
                </template>
              </pop-up-menu>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div class="mt-6 mb-8 p-primary-900">
        <p class="text-xl mb-1">Related Articles</p>
        <div v-for="(article, id) in state.postDetails.relatedBlogArticles" :key="id" class="mt-1">
          <ul>
            <li>
              <a :href="'/blog/post/' + article.routeName" class="text-lg underline">
                {{ article.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Return Button -->
      <div class="mt-10 text-center underline p-primary-900 pb-6">
        <a href="/blog" class="text-base hover:underline items-center gap-1">
          &lt; Return to Blog
        </a>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="grid gap-4 text-center mt-10 mb-10 justify-center items-center px-6 sm:px-8">
      <div class="text-lg text-red-500 font-semibold uppercase mt-10">
        Oops! The Blog Post You Were Looking For is Not Found!
      </div>

      <div class="mt-10 mb-10">
        <Button label="Back" @click="router.go(-1)"
          class="w-[200px] py-2 px-3 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap text-center" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/volt/Button.vue'
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'
import { onMounted, nextTick, watch } from 'vue'

dataGlobal.sideBarVisible = false

const router = useRouter()
const { postRouteName } = useRoute().params
const { filterDateTimeToDate } = useFilters()
const { bindBlogDownloadTracking } = useBlogDownloads()
const { resolveBlogCta, trackBlogCtaClick } = useBlogCta()
const { cleanBlogTitle, buildBlogTitle, buildBlogDescription } = useBlogSeo()

const state = reactive({
  postDetails: {},
  socialRating: {},
  displayError: false
})

const url = appGlobal.apiBaseUrl + '/khsds/BlogDetail/RouteName/' + postRouteName

const { data: postDetails } = await useFetch(url)

state.postDetails = postDetails.value.blogDetail

if (state.postDetails.title === 'Error') {
  state.displayError = true
}

// The post detail API doesn't return the post group (hair, skin, nails, products, news), but the
// heading and the contextual CTA depend on it. Look it up in the header list.
// `transform` keeps only the group in the page payload, not the whole 141-post list.
if (!state.displayError) {
  const { data: postGroup } = await useFetch(appGlobal.apiBaseUrl + '/khsds/Blog/ListHeaders', {
    key: 'blog-post-group-' + postRouteName,
    default: () => '',
    transform: (headers) => {
      const list = Array.isArray(headers) ? headers : (headers?.blogHeaders ?? [])
      const wanted = String(postRouteName || '').trim().toLowerCase()
      const header = list.find(item => String(item.routeName || '').trim().toLowerCase() === wanted)

      return header?.postGroup || ''
    }
  })

  if (postGroup.value) {
    state.postDetails.postGroup = postGroup.value
  }
}

const postURL = 'https://kenneths.com/blog/post/' + postRouteName

const urlSocial = appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWebRandom/'
const { data: employeeList } = await useFetch(urlSocial)

state.socialRating = employeeList.value.socialRatingViewModel

const postGroupText = computed(() => getPostGroup())

// Contextual link to the service/retail page this article is about (null when none fits)
const blogCta = computed(() => state.displayError ? null : resolveBlogCta(state.postDetails))

function onBlogCtaClick() {
  trackBlogCtaClick(blogCta.value, state.postDetails.postGroup, postRouteName)
}

const jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': postURL,
  name: cleanBlogTitle(state.postDetails.title),
  headline: cleanBlogTitle(state.postDetails.title),
  datePublished: state.postDetails.publishDate,
  articleBody: state.postDetails.textContent,
  author: {
    '@type': 'Person',
    name: state.postDetails.author
  },
  isPartOf: {
    '@type': 'Blog',
    '@id': 'https://kenneths.com/blog/',
    name: "Kenneth's Blog",
    publisher: {
      '@type': 'Organization',
      '@id': 'https://kenneths.com/#organization',
      name: "Kenneth's Hair Salons And Day Spas"
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postURL
  }
}

const jsonLDString = JSON.stringify(jsonLD)

const photoPath = state.postDetails.photoName === 'logo.webp'
  ? 'https://kenneths.com/logo.webp'
  : 'https://kenneths.com/static/blog/' + state.postDetails.photoName

// The stored title is the H1 and the source of the URL, so it is never changed here. The <title>
// tag and meta description are shaped for search results (see composables/useBlogSeo.js).
const postTitle = buildBlogTitle(state.postDetails.title, "Blog | Kenneth's Hair Salons And Day Spas")

// Social cards show the site name separately (og:site_name), so they use the bare title
const postSocialTitle = cleanBlogTitle(state.postDetails.title) || postTitle

const postDescription = buildBlogDescription(
  state.postDetails.subTitle,
  "Read the latest from Kenneth's Hair Salons And Day Spas."
)

useHead({
  title: postTitle,
  link: [
    { rel: 'canonical', href: postURL }
  ],
  meta: [
    { name: 'description', content: postDescription },
    { name: 'robots', content: 'noindex, nofollow' },
    { property: 'og:title', content: postSocialTitle },
    { name: 'og:description', content: postDescription },
    { name: 'twitter:title', content: postSocialTitle },
    { property: 'og:image', content: photoPath }
  ],
  script: [
    { type: 'application/ld+json', children: jsonLDString }
  ]
})

function getPostGroup() {
  const postGroup = state.postDetails.postGroup

  if (postGroup === 'hair') {
    return {
      heading: 'Ready to Upgrade Your Hair Care Game?',
      cta: 'to find the perfect services and products for your hair goals.'
    }
  }

  if (postGroup === 'spa' || postGroup === 'skin') {
    return {
      heading: 'Ready to Upgrade Your Skin Care Game?',
      cta: 'to find the perfect services and products for your skin goals.'
    }
  }

  if (postGroup === 'nails') {
    return {
      heading: 'Ready to Upgrade Your Nail Care Game?',
      cta: 'to find the perfect services and products for your nail goals.'
    }
  }

  if (postGroup === 'news') {
    return {
      heading: 'Ready to Learn More?',
      cta: "to find out more about Kenneth's products and services."
    }
  }

  if (postGroup === 'products') {
    return {
      heading: 'Visit our Products Page!',
      cta: "to find out more about Kenneth's products and services."
    }
  }

  return {
    heading: 'Schedule an Appointment Today!',
    cta: 'to find out which services and products are right for you.'
  }
}

function addUnderlineToLinks() {
  if (!import.meta.client) return

  const container = document.getElementById('main-container')
  if (!container) return

  const links = container.querySelectorAll('a:not(.blog-button)')

  links.forEach((link) => {
    link.classList.add('underline', 'font-semibold')
  })
}

onMounted(async () => {
  window.scrollTo(0, 0)

  const scriptIG = document.createElement('script')
  scriptIG.async = true
  scriptIG.setAttribute('src', '//www.instagram.com/embed.js')
  document.head.appendChild(scriptIG)

  addUnderlineToLinks()
  // do not enable GTM tracking for test articles.
  // bindBlogDownloadTracking()
})

watch(
  () => state.postDetails.htmlContent,
  async () => {
    if (!process.client) return

    await nextTick()
    addUnderlineToLinks()
  },
  { immediate: true }
)

function goBack() {
  window.history.go(-1)
}
</script>

<style scoped>
.blog-page {
  width: 100%;
  overflow-x: hidden;
}

#main-container :deep(img),
#main-container :deep(video),
#main-container :deep(iframe),
#main-container :deep(table) {
  max-width: 100%;
}

#main-container :deep(img),
#main-container :deep(video) {
  height: auto;
}

#main-container :deep(iframe) {
  max-width: 100%;
  border: 0;
}

#main-container :deep(table) {
  display: block;
  overflow-x: auto;
}

/* NBC / Anvato video embed from CMS HTML */
#main-container :deep(.nxs-video) {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 4rem;
}

@media (min-width: 1024px) {
  #main-container :deep(.nxs-video) {
    margin-bottom: 6rem;
  }
}

#main-container :deep(.nxs-video-frame) {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0f2f2c;
}

#main-container :deep(.nxs-video-frame iframe) {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>