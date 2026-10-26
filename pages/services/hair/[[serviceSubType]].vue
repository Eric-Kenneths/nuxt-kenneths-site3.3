<template>
    <section class="bg-primary-900 w-full h-[95px] lg:h-[120px] flex items-end">
        <GoldLine />
    </section>

    <template v-if="hasServiceSubType">
        <section
            class="relative flex flex-col items-center justify-center w-full overflow-hidden text-primary-100 py-12">
            <!-- Background Icon -->
            <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="" role="presentation"
                class="absolute -top-35 -left-10 w-auto h-[250%] z-0 pointer-events-none opacity-30" />

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center text-center">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl uppercase pb-3">
                    {{ serviceData.mainHeader }}
                </h1>

                <div>
                    <a :href="serviceData.allServicesLink"
                        class="mt-4 hover:text-p-primary-500 k-section-link underline underline-offset-4 transition uppercase">
                        {{ serviceData.allServicesText }}
                    </a>
                </div>
            </div>
        </section>

        <GoldLine />

        <section class="bg-primary-100 text-primary-900 py-10">
            <!-- Breadcrumbs -->
            <div class="px-5 md:px-14 pb-4">
                <nav aria-label="Breadcrumb">
                    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base">
                        <li>
                            <NuxtLink to="/"
                                class="rounded-sm underline underline-offset-4 transition hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900">
                                Home
                            </NuxtLink>
                        </li>

                        <li aria-hidden="true" class="select-none">
                            /
                        </li>

                        <li>
                            <NuxtLink to="/services"
                                class="rounded-sm underline underline-offset-4 transition hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900">
                                Services
                            </NuxtLink>
                        </li>

                        <li aria-hidden="true" class="select-none">
                            /
                        </li>

                        <li>
                            <NuxtLink to="/services/hair"
                                class="rounded-sm underline underline-offset-4 transition hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900">
                                Hair Services
                            </NuxtLink>
                        </li>

                        <li aria-hidden="true" class="select-none">
                            /
                        </li>

                        <li aria-current="page" class="font-bold">
                            {{ serviceData.subTypeHeader }}
                        </li>
                    </ol>
                </nav>
            </div>

            <div class="flex flex-col md:flex-row px-5 md:px-14 pb-7 items-start md:items-center">
                <h2
                    class="pr-0 md:pr-4 font-thin text-3xl lg:text-6xl whitespace-normal md:whitespace-nowrap uppercase">
                    {{ serviceData.subTypeHeader }}
                </h2>

                <div
                    class="hidden md:block mt-2 bg-primary-900 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
                </div>

                <button type="button" @click="
                    showDetailedPricing(
                        serviceData.subTypeHeader,
                        serviceData.servicesForMenuBySubGroupViewModels
                    )
                    "
                    class="cursor-pointer mt-2 md:mt-0 md:pl-4 hover:text-primary-500 text-lg k-para-text font-bold underline uppercase underline-offset-4 transition rounded inline-block whitespace-nowrap text-left">
                    View Detailed Pricing
                </button>
            </div>

            <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
                <div v-for="service in serviceData.servicesForMenuBySubGroupViewModels" :key="service.serviceCode"
                    class="flex flex-col p-4">
                    <h3 class="k-sub-section-title pb-2 uppercase">
                        {{ service.serviceDescription }}
                    </h3>

                    <p class="font-bold">
                        {{ service.priceRange }}
                    </p>

                    <p class="mt-1 leading-snug flex-1">
                        {{ service.serviceText }}
                    </p>

                    <!-- BOOK NOW pinned at the bottom, content width only -->
                    <pop-up-menu>
                        <template #trigger>
                            <div
                                class="w-40 mt-2 self-start text-center py-2 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap cursor-pointer">
                                BOOK NOW
                            </div>
                        </template>

                        <template #links>
                            <div class="sans-serif p-3">
                                <a class="text-xl link" href="https://kenneths.com/app/">
                                    <span aria-hidden="true">
                                        Existing Customer
                                    </span>

                                    <span class="sr-only">
                                        booking for
                                        {{ service.serviceDescription }}
                                    </span>
                                </a>
                            </div>

                            <div class="sans-serif p-3">
                                <a class="text-xl link" :href="'/book/new/promo?s=' +
                                    service.serviceCode
                                    ">
                                    <span aria-hidden="true">
                                        New Customer
                                    </span>

                                    <span class="sr-only">
                                        booking for
                                        {{ service.serviceDescription }}
                                    </span>
                                </a>
                            </div>
                        </template>
                    </pop-up-menu>
                </div>
            </div>
        </section>

        <section v-if="serviceData.supportingStackPageViewModels.length > 0"
            class="bg-primary-100 text-primary-900 px-5 md:px-10 py-5">
            <Accordion value="0">
                <AccordionPanel value="0">
                    <AccordionHeader class="text-xl">
                        Read More About Our Services
                    </AccordionHeader>

                    <AccordionContent>
                        <ul class="list-disc">
                            <li v-for="stack in serviceData.supportingStackPageViewModels"
                                :key="stack.supportingStackPageId">
                                <a :href="stack?.serviceTypeRoute +
                                    '/' +
                                    stack?.stackPageRoute
                                    "
                                    class="text-primary-900 hover:text-primary-emphasis cursor-pointer text-sm md:text-base">
                                    {{ stack.title }}
                                </a>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </section>
    </template>

    <template v-else>
        <!-- Hero section -->
        <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
            <!-- Left column -->
            <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
                <div>
                    <h1 class="k-section-title uppercase pt-2">
                        <span class="text-lg">Hair Services</span>
                        <br />
                        Exceptional Hair
                        <br />
                        Care for
                        <br />
                        Everyone
                    </h1>
                </div>

                <div class="mt-6 md:mt-0 lg:pb-20">
                    <p class="k-para-text">
                        We don't just dabble in hairdressing. We have a passion
                        and a love for our craft. Our stylists are trained to
                        style, protect, and replenish your hair. No matter your
                        hair type, there's a stylist at Kenneth's who knows
                        exactly what you need.
                    </p>

                    <pop-up-menu>
                        <template #trigger>
                            <div
                                class="hover:text-primary-500 k-sub-section-title font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                                Book your hair appointment →
                            </div>
                        </template>

                        <template #links>
                            <div class="sans-serif p-3">
                                <a class="text-xl link" href="https://kenneths.com/app/">
                                    <span aria-hidden="true">
                                        Existing Customer
                                    </span>

                                    <span class="sr-only">
                                        booking for hair services
                                    </span>
                                </a>
                            </div>

                            <div class="sans-serif p-3">
                                <a class="text-xl link" href="/book/new/service-type">
                                    <span aria-hidden="true">
                                        New Customer
                                    </span>

                                    <span class="sr-only">
                                        booking for hair services
                                    </span>
                                </a>
                            </div>
                        </template>
                    </pop-up-menu>
                </div>
            </div>

            <!-- Right column -->
            <div class="flex items-center justify-center">
                <img src="/images/services/hair/hair-services.webp" loading="eager" fetchpriority="high"
                    alt="Hair services" class="w-full aspect-square object-cover" />
            </div>
        </section>

        <!-- Hair service types -->
        <section class="bg-primary-100 text-primary-900 py-10">
            <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
                <div v-for="srvc in serviceTypes" :key="srvc.serviceType"
                    class="flex flex-col items-center md:items-start">
                    <a :href="srvc.link" class="w-full">
                        <img :src="srvc.image" :alt="srvc.alt" class="w-full object-cover mx-auto" loading="lazy"
                            decoding="async" fetchpriority="low" />
                    </a>

                    <a :href="srvc.link"
                        class="hover:text-primary-700 text-xl underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase self-start">
                        {{ srvc.serviceType }}
                    </a>
                </div>
            </div>
        </section>
    </template>

    <QuizSection />

    <!-- Training -->
    <section class="flex flex-col flex-col-reverse md:grid lg:grid-cols-2">
        <!-- Left Column -->
        <div class="grid px-4 md:px-12 bg-primary-900 text-white min-h-90 md:min-h-130 h-full">
            <div class="flex items-start">
                <h2 class="k-section-title pt-5 md:pt-20 uppercase">
                    Our Commitment To Excellence
                </h2>
            </div>

            <div class="flex items-start">
                <p class="k-para-text">
                    At Kenneth's, our commitment goes beyond training
                    stylists—we cultivate top-tier talent. The Academy combines
                    decades of industry expertise with cutting-edge techniques
                    and modern trends, setting up every Kenneth's stylist and
                    client for success.
                </p>
            </div>

            <div class="items-start justify-end pt-5">
                <a href="/locations/academy"
                    class="k-section-link px-5 py-2 ml-auto lg:ml-0 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">
                    <span aria-hidden="true">
                        Learn About the Academy
                    </span>

                    <span class="sr-only">
                        salon training program at Kenneth's Academy
                    </span>
                </a>
            </div>
        </div>

        <!-- Right Column -->
        <div class="w-full h-full flex">
            <img src="/images/services/hair/salon-training-and-education.webp"
                alt="Training program at our academy salon" class="object-cover w-full" loading="lazy" decoding="async"
                fetchpriority="low" />
        </div>
    </section>

    <!-- Academy Training -->
    <section class="flex flex-col md:grid lg:grid-cols-2">
        <!-- Left Column -->
        <div class="w-full h-full flex">
            <img src="/images/services/hair/academy-training-salon.webp" alt="Training program at our academy salon"
                class="object-cover w-full" loading="lazy" decoding="async" fetchpriority="low" />
        </div>

        <!-- Right Column -->
        <div class="grid px-4 md:px-12 bg-primary-900 text-white min-h-90 md:min-h-130 h-full">
            <div class="flex items-start">
                <h2 class="k-section-title pt-5 md:pt-20 uppercase">
                    Book at The Academy Salon
                </h2>
            </div>

            <div class="flex items-start">
                <p class="k-para-text">
                    Academy appointments are with top-level Kenneth's
                    apprentices completing their training journey and about to
                    graduate to their “forever salon.” Services at The Academy
                    Salon are discounted.
                </p>
            </div>

            <div class="flex items-end justify-start">
                <a href="https://kenneths.com/app/"
                    class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                    <span aria-hidden="true">
                        Book Now &rarr;
                    </span>

                    <span class="sr-only">
                        at Kenneth's Academy Salon
                    </span>
                </a>
            </div>

            <div class="flex items-end justify-start">
                <a href="/locations/academy"
                    class="pb-6 hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                    <span aria-hidden="true">
                        Learn More
                    </span>

                    <span class="sr-only">
                        about Kenneth's Academy Salon
                    </span>
                </a>
            </div>
        </div>
    </section>

    <!-- Model program -->
    <section class="flex flex-col flex-col-reverse md:grid lg:grid-cols-2">
        <!-- Left Column -->
        <div class="grid px-4 md:px-12 bg-primary-900 text-white min-h-100 md:min-h-130 h-full">
            <div class="flex items-start">
                <h2 class="k-section-title pt-5 md:pt-20 uppercase">
                    Get the Model Treatment
                </h2>
            </div>

            <div class="flex items-start">
                <p class="k-para-text">
                    You can book a Model appointment to receive discounted hair
                    services with a Kenneth's stylist-in-training to help them
                    practice and learn. Model appointments are longer than
                    regular or Academy appointments, taking place in a
                    classroom setting with instructor guidance.
                </p>
            </div>

            <div class="flex items-end justify-start">
                <a href="/model"
                    class="pb-6 hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                    <span aria-hidden="true">
                        Learn More
                    </span>

                    <span class="sr-only">
                        about Kenneth's hair model program
                    </span>
                </a>
            </div>
        </div>

        <!-- Right Column -->
        <div class="w-full h-full flex">
            <img src="/images/services/hair/hair-model-program.webp" alt="Training program at our academy salon"
                class="object-cover w-full" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
    </section>

    <!-- Service Type Navigation -->
    <section class="bg-primary-100 text-primary-900 py-10">
        <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-10">
            <!-- Column 1 -->
            <div class="flex flex-col items-center md:items-start">
                <a href="/services/spa" class="flex flex-col items-start">
                    <img src="/images/menu/spa-service-navigate.webp" alt="Go to Spa Services"
                        class="w-full object-cover shadow-md" loading="lazy" decoding="async" fetchpriority="low" />

                    <h3 class="k-sub-section-title font-bold">
                        SPA SERVICES
                        <span class="ml-2 relative md:-top-[2px]">
                            &rarr;
                        </span>
                    </h3>
                </a>
            </div>

            <!-- Column 2 -->
            <div class="flex flex-col items-center md:items-start">
                <a href="/services/nail" class="flex flex-col items-start">
                    <img src="/images/menu/nail-service-navigate.webp" alt="Go to Nail services"
                        class="w-full object-cover shadow-md" loading="lazy" decoding="async" fetchpriority="low" />

                    <h3 class="k-sub-section-title font-bold">
                        NAIL SERVICES
                        <span class="ml-2 relative md:-top-[2px]">
                            &rarr;
                        </span>
                    </h3>
                </a>
            </div>
        </div>
    </section>

    <BookSection />

    <sub-type-pricing-grid />
</template>

<script setup>
import { computed } from 'vue'
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

import Accordion from '@/volt/Accordion.vue'
import AccordionPanel from '@/volt/AccordionPanel.vue'
import AccordionHeader from '@/volt/AccordionHeader.vue'
import AccordionContent from '@/volt/AccordionContent.vue'

const route = useRoute()

const serviceSubType = computed(() => {
    const param = route.params.serviceSubType
    return typeof param === 'string' ? param : ''
})

const hasServiceSubType = computed(() => serviceSubType.value !== '')

const subTypeParam = computed(() => {
    return hasServiceSubType.value ? serviceSubType.value : 'null'
})

const defaultMetaTitle =
    "Hair Services Columbus OH | Kenneth's Salons + Spas"

const defaultMetaDescription =
    "Explore Kenneth's hair services in Columbus, OH, including haircuts, color, balayage, foiling, keratin treatments, extensions, and more at our 10 Central Ohio salon locations."

const url = computed(() => {
    return (
        appGlobal.apiBaseUrl +
        '/khsds/ServicesForMenu/W/' +
        subTypeParam.value
    )
})

const defaultServiceData = {
    mainHeader: '',
    allServicesLink: '/services/hair',
    allServicesText: 'All Hair Services',
    subTypeHeader: '',
    servicesForMenuBySubGroupViewModels: [],
    supportingStackPageViewModels: [],
    metaTitle: defaultMetaTitle,
    metaDescription: defaultMetaDescription,
    name: 'Hair Services'
}

const { data: fetchedServiceData, error } = await useFetch(url, {
    default: () => defaultServiceData
})

const serviceData = computed(() => {
    return fetchedServiceData.value ?? defaultServiceData
})

const { throwError } = useResponse()

if (hasServiceSubType.value && (error.value || !serviceData.value.mainHeader)) {
    throwError(404, `Service "${serviceSubType.value}" not found`)
}

const metaTitle = computed(() => {
    return subTypeParam.value === 'null'
        ? defaultMetaTitle
        : serviceData.value.metaTitle || defaultMetaTitle
})

const metaDescription = computed(() => {
    return subTypeParam.value === 'null'
        ? defaultMetaDescription
        : serviceData.value.metaDescription || defaultMetaDescription
})

const serviceTypes = [
    {
        image: '/images/services/hair/haircut-and-styles.webp',
        alt: 'Haircut and Styles',
        link: '/services/hair/cuts-and-styles',
        serviceType: 'Cuts & Styles →'
    },
    {
        image: '/images/services/hair/hair-color.webp',
        alt: 'Hair color service',
        link: '/services/hair/color',
        serviceType: 'Color →'
    },
    {
        image: '/images/services/hair/highlights.webp',
        alt: 'Hair color highlights',
        link: '/services/hair/highlights',
        serviceType: 'Highlights →'
    },
    {
        image: '/images/services/hair/treatments.webp',
        alt: 'Hair treatments',
        link: '/services/hair/treatments',
        serviceType: 'Treatments →'
    },
    {
        image: '/images/services/hair/smoothing-perms.webp',
        alt: 'Hair smoothing and perms',
        link: '/services/hair/smoothing-and-perms',
        serviceType: 'Smoothing & Perms →'
    },
    {
        image: '/images/services/hair/extensions.webp',
        alt: 'Hair extensions',
        link: '/services/hair/extensions',
        serviceType: 'Extensions →'
    },
    {
        image: '/images/services/hair/japanese-head-spa.webp',
        alt: 'Japanese Head Spa',
        link: '/services/hair/japanese-head-spa',
        serviceType: 'Japanese Head Spa →'
    }
]

const pageUrl = computed(() => {
    return hasServiceSubType.value
        ? `https://kenneths.com/services/hair/${serviceSubType.value}`
        : 'https://kenneths.com/services/hair'
})

const pageImage = computed(() => {
    if (hasServiceSubType.value) {
        const matchingServiceType = serviceTypes.find((item) => {
            return (
                item.link ===
                `/services/hair/${serviceSubType.value}`
            )
        })

        if (matchingServiceType?.image) {
            return `https://kenneths.com${matchingServiceType.image}`
        }
    }

    return 'https://kenneths.com/images/services/hair/haircut-and-styles.webp'
})

const pageImageAlt = computed(() => {
    if (hasServiceSubType.value) {
        const matchingServiceType = serviceTypes.find((item) => {
            return (
                item.link ===
                `/services/hair/${serviceSubType.value}`
            )
        })

        if (matchingServiceType?.alt) {
            return matchingServiceType.alt
        }
    }

    return "Kenneth's Hair Services"
})

const jsonLDString = computed(() => {
    const pageName = metaTitle.value
    const pageDescription = metaDescription.value

    const serviceName =
        subTypeParam.value === 'null'
            ? 'Hair Services'
            : serviceData.value?.name || 'Hair Services'

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageName,
        url: pageUrl.value,
        mainEntity: {
            '@type': 'Service',
            name: serviceName,
            serviceType: serviceName,
            provider: {
                '@type': 'Organization',
                '@id': 'https://kenneths.com/#organization',
                name: "Kenneth's Hair Salons and Day Spas",
                url: 'https://kenneths.com'
            },
            areaServed: 'Columbus, Ohio and Central Ohio',
            description: pageDescription
        },
        description: pageDescription,
        publisher: {
            '@type': 'Organization',
            name: "Kenneth's Hair Salons and Day Spas",
            url: 'https://kenneths.com'
        },
        about: {
            '@type': 'Thing',
            name: 'Hair Services',
            description:
                "A collection of professional hair services at Kenneth's, including haircuts, color, balayage, smoothing treatments, extensions, and specialty services delivered by Academy-trained stylists across 10 Central Ohio locations."
        },
        isPartOf: {
            '@type': 'WebSite',
            name: "Kenneth's Hair Salons and Day Spas",
            url: 'https://kenneths.com'
        },
        inLanguage: 'en-US'
    })
})

const breadcrumbJsonLDString = computed(() => {
    if (!hasServiceSubType.value) {
        return ''
    }

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://kenneths.com'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: 'https://kenneths.com/services'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Hair Services',
                item: 'https://kenneths.com/services/hair'
            },
            {
                '@type': 'ListItem',
                position: 4,
                name:
                    serviceData.value.subTypeHeader ||
                    serviceData.value.name ||
                    'Hair Service',
                item: pageUrl.value
            }
        ]
    })
})

useHead({
    title: () => metaTitle.value,

    link: [
        {
            rel: 'canonical',
            href: () => pageUrl.value
        }
    ],

    meta: [
        {
            name: 'description',
            content: () => metaDescription.value
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: () => metaTitle.value
        },
        {
            property: 'og:description',
            content: () => metaDescription.value
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
            content: () => metaTitle.value
        },
        {
            name: 'twitter:description',
            content: () => metaDescription.value
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
            key: 'hair-service-page',
            type: 'application/ld+json',
            innerHTML: () => jsonLDString.value
        },
        {
            key: 'hair-service-breadcrumbs',
            type: 'application/ld+json',
            innerHTML: () => breadcrumbJsonLDString.value
        }
    ]
})

function showDetailedPricing(header, services) {
    dataGlobal.subTypePricingGridHeader =
        'PRICING BREAKDOWN FOR ' + header.toUpperCase()

    dataGlobal.subTypeServices = services
    dataGlobal.subTypePricingGridVisible = true
}
</script>

<style scoped></style>
