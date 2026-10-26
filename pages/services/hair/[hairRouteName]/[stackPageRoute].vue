<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <div class="relative flex items-center justify-center h-[10vmin] lg:h-[10vmin] w-full overflow-hidden mb-5">
    </div>
    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
    </div>
    <div class="bg-primary-100 text-primary-900 sa-articles-page">

        <div style="margin: 0 auto; max-width: 1200px;">
            <div class="flex flex-wrap md:flex-nowrap mx-2 md:ml-7 lg:mx-20">

                <!-- First Column -->
                <div class="w-full md:w-auto shrink-0 pl-10 pr-8" style="max-width: 1000px;">
                    <!-- Main Article -->
                    <div class="mt-2">
                        <header class="mb-10">
                            <h1>
                                {{ currentStackPage.title }}
                            </h1>
                        </header>

                        <!-- Main Content -->
                        <article id="main-container" v-html="currentStackPage.htmlContent"></article>
                    </div>

                    <!-- FAQ Section -->
                    <section class="mt-4 sa-articles-page">
                        <h2>Frequently Asked Questions (FAQ)</h2>
                        <div class="pt-5">
                            <div v-for="(faqInfo, index) in currentStackPage.supportingFAQs" :key="index">
                                <h3>
                                    {{ faqInfo.supportingFAQTextQuestion }}
                                </h3>
                                <div>
                                    <p>{{ faqInfo.supportingFAQTextAnswer }}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Supporting Articles (Mobile Positioning) -->
                    <section
                        class="block md:hidden mt-20 p-4 mb-5 bg-primary-100 border p-primary-900-black rounded-none">
                        <!-- Add supporting articles content here -->
                        <div v-for="(linkInfo, index) in currentStackPage.supportingStackLinks" :key="index">
                            <div>
                                <ul>
                                    <li><a :href="`${linkInfo.stackPageRoute}`" class="hover:underline">
                                            {{ linkInfo.linkDescription }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Disclaimer and services link -->
                    <section class="block mt-10 mb-5 bg-primary-100 justify-left">
                        <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                            <div class="w-full bg-primary-100 p-5 md:h-[140px] justify-center">
                                <div>
                                    <p><a :href="getServiceTypeUrl()" class="underline">{{ getServiceTypeText() }}</a>
                                    </p>
                                </div>
                                <div class="mt-4 text-primary-900" style="margin: 0 auto;">
                                    <em>Note: Kenneth's products and services, as well as the prices and locations where
                                        they
                                        are
                                        offered, are subject to change. Call our appointment scheduling at
                                        <a href="tel:6145385800" class="underline">614.538.5800</a> or use our
                                        <a href="/book" class="underline">online booking</a> system to confirm.
                                    </em>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Second Column (Desktop Positioning) -->
                <div class="hidden md:block w-full mt-20 md:w-auto shrink-0 px-2" style="max-width: 300px;">
                    <section class="hidden md:block mt-2 p-4 bg-primary-100 border border-primary-900 rounded-none">
                        <!-- Add supporting articles content here -->
                        <div v-for="(linkInfo, index) in currentStackPage.supportingStackLinks" :key="index">
                            <div>
                                <ul class="pl-1"> <!-- space for bullets -->
                                    <li>
                                        <a :href="`${linkInfo.stackPageRoute}`" class="hover:underline">
                                            {{ linkInfo.linkDescription }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

dataGlobal.sideBarVisible = false

const router = useRouter()
const route = useRoute()

const hairRouteName = computed(() => {
    const param = route.params.hairRouteName
    return typeof param === 'string' ? param : ''
})

const stackPageRoute = computed(() => {
    const param = route.params.stackPageRoute
    return typeof param === 'string' ? param : ''
})

const state = reactive({
    stackPage: {
        title: '',
        htmlContent: '',
        supportingFAQs: [],
        supportingStackLinks: [],
        stackPageSchema: '[]',
        addttm: '',
        audttm: '',
        author: '',
        authorURL: '',
        Description: '',
        linkDescription: '',
        metaDescription: '',
        serviceTypeRoute: ''
    }
})

const url = computed(() =>
    appGlobal.apiBaseUrl +
    '/khsds/SupportingStackPage/' +
    hairRouteName.value +
    '/' +
    stackPageRoute.value
)

const { data: stackPage, error } = await useFetch(url, {
    default: () => ({
        supportingStackPageViewModel: {
            title: '',
            htmlContent: '',
            supportingFAQs: [],
            supportingStackLinks: [],
            stackPageSchema: '[]',
            addttm: '',
        audttm: '',
            author: '',
            authorURL: '',
            Description: '',
            linkDescription: '',
            metaDescription: '',
            serviceTypeRoute: ''
        }
    })
})

const currentStackPage = computed(() => {
    return stackPage.value?.supportingStackPageViewModel || state.stackPage
})

state.stackPage = currentStackPage.value

const { throwError } = useResponse()

// The API answers an unknown route with HTTP 200 and the title "NOT FOUND"
if (error.value || !currentStackPage.value.title || currentStackPage.value.title === 'NOT FOUND') {
    throwError(404, `Article not found: ${hairRouteName.value}/${stackPageRoute.value}`)
}

const pageUrl = computed(() =>
    'https://kenneths.com/services/hair/' +
    hairRouteName.value +
    '/' +
    stackPageRoute.value
)

const pageTitle = computed(() =>
    (currentStackPage.value.linkDescription || currentStackPage.value.title || 'Hair Services') +
    " | Kenneth's"
)

const pageDescription = computed(() =>
    currentStackPage.value.metaDescription ||
    currentStackPage.value.Description ||
    "Explore Kenneth's hair services in Columbus, OH, at our Central Ohio salon locations."
)

function safeJsonParse(value, fallback) {
    try {
        return value ? JSON.parse(value) : fallback
    } catch {
        return fallback
    }
}

function toArticleDateTime(raw) {
    if (!raw) return undefined
    const withoutOffset = String(raw).replace(/(?:Z|[+-]\d{1,2}:?\d{0,2})$/, '')
    const withTime = withoutOffset.includes('T') ? withoutOffset : withoutOffset + 'T00:00:00'
    return withTime + '-05:00'
}

const stackPageImages = computed(() =>
    safeJsonParse(currentStackPage.value.stackPageSchema, [])
)

const pageImage = computed(() => {
    const images = stackPageImages.value

    if (Array.isArray(images) && images.length > 0) {
        const firstImage = images[0]

        if (typeof firstImage === 'string') {
            return firstImage.startsWith('http')
                ? firstImage
                : `https://kenneths.com${firstImage.startsWith('/') ? '' : '/'}${firstImage}`
        }

        if (firstImage?.url) {
            return firstImage.url.startsWith('http')
                ? firstImage.url
                : `https://kenneths.com${firstImage.url.startsWith('/') ? '' : '/'}${firstImage.url}`
        }
    }

    return 'https://kenneths.com/images/services/hair/haircut-and-styles.webp'
})

const pageImageType = computed(() => {
    const image = String(pageImage.value || '').toLowerCase()

    if (image.endsWith('.webp')) return 'image/webp'
    if (image.endsWith('.png')) return 'image/png'

    return 'image/jpeg'
})

const pageImageAlt = computed(() =>
    currentStackPage.value.title ||
    currentStackPage.value.linkDescription ||
    "Kenneth's Hair Services"
)

const jsonLDString = computed(() => {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: currentStackPage.value.title,
                image: stackPageImages.value,
                datePublished: toArticleDateTime(currentStackPage.value.addttm),
                dateModified: toArticleDateTime(currentStackPage.value.audttm || currentStackPage.value.addttm),
                author: {
                    '@type': 'Person',
                    name: currentStackPage.value.author,
                    url: currentStackPage.value.authorURL
                },
                publisher: {
                    '@type': 'Organization',
                    name: "Kenneth's Hair Salons and Day Spas",
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://kenneths.com/logo.webp'
                    }
                },
                description: pageDescription.value,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': pageUrl.value
                },
                sameAs: [
                    'https://www.instagram.com/kennethssalonandspa/',
                    'https://www.facebook.com/KennethsSalonandspa',
                    'https://www.tiktok.com/@kennethssalonandspa',
                    'https://www.pinterest.com/kennethssalonandspa/',
                    'https://www.youtube.com/user/KennethsSalon',
                    'https://www.bbb.org/us/oh/columbus/profile/beauty-salon/kenneths-hair-salons-day-spas-inc-0302-20001492',
                    'https://twitter.com/kennethssalon'
                ]
            },
            {
                '@type': 'FAQPage',
                '@id': pageUrl.value + '#faq',
                name: 'Frequently Asked Questions',
                mainEntity: currentStackPage.value.supportingFAQs.map(faq => ({
                    '@type': 'Question',
                    name: faq.supportingFAQTextQuestion,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.supportingFAQTextAnswer
                    },
                    sameAs: safeJsonParse(faq.supportingFAQSchema, [])
                }))
            }
        ]
    })
})

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
            content: () => pageDescription.value
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'article'
        },
        {
            property: 'og:title',
            content: () => pageTitle.value
        },
        {
            property: 'og:description',
            content: () => pageDescription.value
        },
        {
            property: 'og:url',
            content: () => pageUrl.value
        },
        {
            property: 'og:image',
            content: () => pageImage.value
        },
        {
            property: 'og:image:secure_url',
            content: () => pageImage.value
        },
        {
            property: 'og:image:type',
            content: () => pageImageType.value
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

        // Article metadata
        {
            property: 'article:published_time',
            content: () => toArticleDateTime(currentStackPage.value.addttm) || ''
        },
        {
            property: 'article:modified_time',
            content: () => toArticleDateTime(currentStackPage.value.audttm || currentStackPage.value.addttm) || ''
        },
        {
            property: 'article:author',
            content: () => currentStackPage.value.author || "Kenneth's Hair Salons And Day Spas"
        },
        {
            property: 'article:section',
            content: 'Hair Services'
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
            content: () => pageDescription.value
        },
        {
            name: 'twitter:image',
            content: () => pageImage.value
        },
        {
            name: 'twitter:image:alt',
            content: () => pageImageAlt.value
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => jsonLDString.value
        }
    ]
})

function getServiceTypeUrl() {
    const route = currentStackPage.value.serviceTypeRoute

    if (route === 'hairtreatment') {
        return '/services/hair/treatments'
    } else if (route === 'hairsmoothingandperms') {
        return '/services/hair/smoothing-and-perms'
    } else if (route === 'hairhighlighting') {
        return '/services/hair/highlights'
    } else if (route === 'hairextensions') {
        return '/services/hair/extensions'
    } else if (route === 'haircutsandstyles') {
        return '/services/hair/cuts-and-styles'
    } else if (route === 'haircoloring') {
        return '/services/hair/color'
    }

    return '/services/hair'
}

function getServiceTypeText() {
    const route = currentStackPage.value.serviceTypeRoute

    if (route === 'hairtreatment') {
        return 'Check out our hair treatment services!'
    } else if (route === 'hairsmoothingandperms') {
        return 'Check out our smoothing and perm services!'
    } else if (route === 'hairhighlighting') {
        return 'Check out our hair highlighting services!'
    } else if (route === 'hairextensions') {
        return 'Check out our hair extension services!'
    } else if (route === 'haircutsandstyles') {
        return 'Check out our haircuts and styling services!'
    } else if (route === 'haircoloring') {
        return 'Check out our hair coloring services!'
    }

    return 'Check out our hair services!'
}
</script>