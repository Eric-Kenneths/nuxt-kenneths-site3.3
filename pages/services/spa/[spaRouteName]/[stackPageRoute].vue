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
                <div class="w-full md:w-auto flex-shrink-0 pl-10 pr-8" style="max-width: 1000px;">
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
                <div class="hidden md:block w-full mt-20 md:w-auto flex-shrink-0 px-2" style="max-width: 300px;">
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

const spaRouteName = computed(() => {
    const param = route.params.spaRouteName
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
    spaRouteName.value +
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

function normalizeText(value) {
    return typeof value === 'string' ? value.trim() : ''
}

function normalizeHtmlContent(html) {
    if (typeof html !== 'string') {
        return ''
    }

    return html
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/>\s+</g, '><')
        .replace(/([^\S\r\n])+<\/p>/g, '</p>')
        .replace(/([^\S\r\n])+<\/li>/g, '</li>')
        .replace(/([^\S\r\n])+<\/h1>/g, '</h1>')
        .replace(/([^\S\r\n])+<\/h2>/g, '</h2>')
        .replace(/([^\S\r\n])+<\/h3>/g, '</h3>')
        .replace(/([^\S\r\n])+<\/h4>/g, '</h4>')
        .replace(/([^\S\r\n])+<\/h5>/g, '</h5>')
        .replace(/([^\S\r\n])+<\/h6>/g, '</h6>')
        .trim()
}

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

const currentStackPage = computed(() => {
    const raw = stackPage.value?.supportingStackPageViewModel || state.stackPage

    return {
        ...raw,
        title: normalizeText(raw.title),
        htmlContent: normalizeHtmlContent(raw.htmlContent),
        Description: normalizeText(raw.Description),
        linkDescription: normalizeText(raw.linkDescription),
        metaDescription: normalizeText(raw.metaDescription),
        serviceTypeRoute: normalizeText(raw.serviceTypeRoute),
        author: normalizeText(raw.author),
        authorURL: normalizeText(raw.authorURL),
        addttm: normalizeText(raw.addttm),
        supportingFAQs: Array.isArray(raw.supportingFAQs)
            ? raw.supportingFAQs.map(faq => ({
                ...faq,
                supportingFAQTextQuestion: normalizeText(faq.supportingFAQTextQuestion),
                supportingFAQTextAnswer: normalizeText(faq.supportingFAQTextAnswer),
                supportingFAQSchema: faq.supportingFAQSchema || '[]'
            }))
            : [],
        supportingStackLinks: Array.isArray(raw.supportingStackLinks)
            ? raw.supportingStackLinks.map(link => ({
                ...link,
                linkDescription: normalizeText(link.linkDescription),
                stackPageRoute: normalizeText(link.stackPageRoute)
            }))
            : []
    }
})

if (currentStackPage.value.title === 'NOT FOUND') {
    throw createError({
        statusCode: 404,
        message: 'Page not found'
    })
}

state.stackPage = currentStackPage.value

const { throwError } = useResponse()

if (error.value || !currentStackPage.value.title) {
    throwError(404, `Article not found: ${spaRouteName.value}/${stackPageRoute.value}`)
}

const pageUrl = computed(() =>
    'https://kenneths.com/services/spa/' +
    spaRouteName.value +
    '/' +
    stackPageRoute.value
)

const pageTitle = computed(() =>
    (currentStackPage.value.linkDescription || currentStackPage.value.title || 'Spa Services') +
    " | Kenneth's"
)

const pageDescription = computed(() =>
    currentStackPage.value.metaDescription ||
    currentStackPage.value.Description ||
    "Explore Kenneth's spa services in Columbus, OH, at our Central Ohio salon and spa locations."
)

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

    return 'https://kenneths.com/images/services/spa/spa-bar.webp'
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
    "Kenneth's Spa Services"
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
            content: 'Spa Services'
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

    if (route === 'facials') {
        return '/services/spa/facials'
    } else if (route === 'waxing') {
        return '/services/spa/waxing'
    } else if (route === 'browandlash') {
        return '/services/spa/brow-and-lash'
    }

    return '/services/spa'
}

function getServiceTypeText() {
    const route = currentStackPage.value.serviceTypeRoute

    if (route === 'facials') {
        return 'Check out our facial services!'
    } else if (route === 'waxing') {
        return 'Check out our waxing services!'
    } else if (route === 'browandlash') {
        return 'Check out our brow and lash services!'
    }

    return 'Check out our Spa services!'
}
</script>