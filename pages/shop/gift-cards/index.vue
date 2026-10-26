<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
        <section>
            <div
                class="relative hidden md:flex items-center justify-center h-[90vmin] w-full overflow-hidden bg-cover bg-no-repeat bg-[url('/images/gift-cards/kenneths-gift-cards.webp')]">
                <div>
                    <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                        class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
                </div>
                <div
                    class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                    <h1
                        class="font-thin text-2xl md:text-3xl lg:text-8xl max-w-5xl text-center k-header-text-shadow uppercase">
                        Kenneth's Gift Cards</h1>
                </div>
            </div>

            <div
                class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/gift-cards/kenneths-gift-cards-mobile.webp')] bg-no-repeat bg-cover">

                <div>
                    <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                        class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
                </div>

                <div
                    class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                    <h1 class="font-thin text-5xl text-center k-header-text-shadow">
                        Kenneth's Gift Cards</h1>
                </div>
            </div>

        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
            <!-- Left column -->

            <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
                <div>
                    <h2 class="k-section-title uppercase pt-5">
                        Give the Gift of Self-Care
                    </h2>
                </div>

                <p class="mt-6 md:mt-0 k-para-text lg:pb-15">
                    Whether you're celebrating a special occasion, showing appreciation, or simply indulging in a little
                    self-care, a Kenneth's gift card is the perfect way to say "You deserve to feel beautiful."
                    <br />
                    <a href="#scroll-to-section"
                        class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">shop
                        gift cards now</a>
                </p>

            </div>

            <!-- Right column -->
            <div class="flex items-center justify-center">
                <img src="/images/gift-cards/spa-gift-card.webp" loading="eager" fetchpriority="high"
                    alt="Give a Kenneth's Gift Card" class="w-full aspect-square object-cover" />
            </div>
        </section>

        <div id="scroll-to-section" class="scroll-mt-[50px]">

        </div>

        <gift-card-customize v-if="giftCardGlobal.step === 'customize'" />

        <gift-card-personalize v-if="giftCardGlobal.step === 'personalize'" />

</template>

<script setup>
import { giftCardGlobal } from '~/composables/giftCardGlobal'
import { appGlobal } from '~/composables/appGlobal'
import { useHead, useFetch } from '#imports'

const pageTitle = "Gift Cards Columbus OH | Kenneth's Hair Salons & Spas"

const pageDescription =
    "Shop Kenneth's gift cards in Columbus, OH and Central Ohio and give the gift of salon and spa services, including hair, nails, facials, massage, and retail products, redeemable at all Kenneth's locations or online."

const canonicalUrl = 'https://kenneths.com/shop/gift-cards'

const pageImage =
    'https://kenneths.com/images/icons/logo-dark-medium.webp'

const pageImageAlt =
    "Kenneth's Hair Salons And Day Spas gift cards"

const jsonLDString = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://kenneths.com/#website',
        name: "Kenneth's Hair Salons and Day Spas",
        url: 'https://kenneths.com'
    },
    publisher: {
        '@type': 'Organization',
        '@id': 'https://kenneths.com/#organization',
        name: "Kenneth's Hair Salons and Day Spas",
        url: 'https://kenneths.com',
        areaServed: 'Columbus, Ohio and Central Ohio'
    },
    inLanguage: 'en-US',
    about: {
        '@type': 'Service',
        name: 'Salon and spa gift cards',
        areaServed: 'Columbus, Ohio and Central Ohio',
        provider: {
            '@type': 'Organization',
            '@id': 'https://kenneths.com/#organization',
            name: "Kenneth's Hair Salons and Day Spas"
        }
    },
    primaryImageOfPage: {
        '@type': 'ImageObject',
        url: pageImage,
        caption: pageImageAlt
    }
})

useHead({
    htmlAttrs: {
        lang: 'en-US'
    },
    title: pageTitle,
    link: [
        {
            rel: 'canonical',
            href: canonicalUrl
        },
        {
            rel: 'alternate',
            hreflang: 'en-US',
            href: canonicalUrl
        },
        {
            rel: 'alternate',
            hreflang: 'x-default',
            href: canonicalUrl
        }
    ],
    meta: [
        {
            name: 'description',
            content: pageDescription
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: pageTitle
        },
        {
            property: 'og:description',
            content: pageDescription
        },
        {
            property: 'og:url',
            content: canonicalUrl
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
            content: pageTitle
        },
        {
            name: 'twitter:description',
            content: pageDescription
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

let url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCProducts'

const { data: webOrderGCProducts, error: error1 } = await useFetch(url)

giftCardGlobal.webOrderGCProducts = webOrderGCProducts.value

giftCardGlobal.selectServiceHeaders = [
    ...giftCardGlobal.webOrderGCProducts.selectedServiceHeaders
]

url = appGlobal.apiBaseUrl + '/khsds/Tables/stat'

const { data: stateList, error: error2 } = await useFetch(url)

giftCardGlobal.states = stateList.value.tables.filter(
    item => item.code !== 'AK' && item.code !== 'HI'
)

url = appGlobal.apiBaseUrl + '/khsds/Locations/Salons'

const { data: locationList, error: error3 } = await useFetch(url)

giftCardGlobal.locations = locationList.value

onMounted(async () => {
    await giftCardGlobal.getCart()

    if (giftCardGlobal.webOrderGCs.length > 0) {
        scrollToGCStart()
    }
})

function scrollToGCStart() {
    const el = document.getElementById('scroll-to-section')

    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 165
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}
</script>

<style scoped></style>