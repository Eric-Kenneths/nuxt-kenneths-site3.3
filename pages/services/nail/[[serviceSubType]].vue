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
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl uppercase pb-3" v-text="serviceData.mainHeader" />

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
                            <NuxtLink to="/services/nail"
                                class="rounded-sm underline underline-offset-4 transition hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900">
                                Nail Services
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
                <!-- Allow wrapping on mobile to prevent horizontal overflow -->
                <h2 class="pr-0 md:pr-4 font-thin text-3xl lg:text-6xl whitespace-normal md:whitespace-nowrap uppercase"
                    v-text="serviceData.subTypeHeader" />

                <div
                    class="hidden md:block mt-2 bg-primary-900 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
                </div>

                <button type="button"
                    @click="showDetailedPricing(serviceData.subTypeHeader, serviceData.servicesForMenuBySubGroupViewModels)"
                    class="cursor-pointer mt-2 md:mt-0 md:pl-4 hover:text-primary-500 text-lg k-para-text font-bold underline uppercase underline-offset-4 transition rounded inline-block whitespace-nowrap text-left">
                    View Detailed Pricing
                </button>
            </div>

            <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
                <div v-for="service in serviceData.servicesForMenuBySubGroupViewModels" :key="service.serviceCode"
                    class="flex flex-col p-4">
                    <h3 class="k-sub-section-title pb-2 uppercase" v-text="service.serviceDescription" />

                    <p class="font-bold" v-text="service.priceRange" />

                    <p class="mt-1 leading-snug flex-1" v-text="service.serviceText" />

                    <!-- BOOK NOW pinned at the bottom, content width only -->
                    <template v-if="mounted">
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
                                    <a class="text-xl link" :href="'/book/new/promo?s=' + service.serviceCode">
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
                    </template>

                    <template v-else>
                        <a :href="'/book/new/promo?s=' + service.serviceCode"
                            class="w-40 mt-2 self-start text-center py-2 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap cursor-pointer inline-block">
                            BOOK NOW
                        </a>
                    </template>
                </div>
            </div>
        </section>

        <section v-if="serviceData.servicesForMenuBySubGroupViewModels2.length > 0"
            class="bg-primary-100 text-primary-900 py-10 border-t">
            <div class="flex flex-col md:flex-row px-5 md:px-14 pb-7 items-start md:items-center">
                <!-- Allow wrapping on mobile to prevent horizontal overflow -->
                <h2 class="pr-0 md:pr-4 font-thin text-3xl lg:text-6xl whitespace-normal md:whitespace-nowrap uppercase"
                    v-text="serviceData.subTypeHeader2" />

                <div
                    class="hidden md:block mt-2 bg-primary-900 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
                </div>

                <button type="button"
                    @click="showDetailedPricing(serviceData.subTypeHeader2, serviceData.servicesForMenuBySubGroupViewModels2)"
                    class="cursor-pointer mt-2 md:mt-0 md:pl-4 hover:text-primary-500 text-lg k-para-text font-bold underline uppercase underline-offset-4 transition rounded inline-block whitespace-nowrap text-left">
                    View Detailed Pricing
                </button>
            </div>

            <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
                <div v-for="service in serviceData.servicesForMenuBySubGroupViewModels2" :key="service.serviceCode"
                    class="flex flex-col p-4">
                    <h3 class="k-sub-section-title pb-2 uppercase" v-text="service.serviceDescription" />

                    <p class="font-bold" v-text="service.priceRange" />

                    <p class="mt-1 leading-snug flex-1" v-text="service.serviceText" />

                    <!-- BOOK NOW pinned at the bottom, content width only -->
                    <template v-if="mounted">
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
                                    <a class="text-xl link" :href="'/book/new/promo?s=' + service.serviceCode">
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
                    </template>

                    <template v-else>
                        <a :href="'/book/new/promo?s=' + service.serviceCode"
                            class="w-40 mt-2 self-start text-center py-2 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap cursor-pointer inline-block">
                            BOOK NOW
                        </a>
                    </template>
                </div>
            </div>
        </section>

        <section v-if="serviceData.servicesForMenuBySubGroupViewModels3.length > 0"
            class="bg-primary-100 text-primary-900 py-10 border-t">
            <div class="flex flex-col md:flex-row px-5 md:px-14 pb-7 items-start md:items-center">
                <!-- Allow wrapping on mobile to prevent horizontal overflow -->
                <h2 class="pr-0 md:pr-4 font-thin text-3xl lg:text-6xl whitespace-normal md:whitespace-nowrap uppercase"
                    v-text="serviceData.subTypeHeader3" />

                <div
                    class="hidden md:block mt-2 bg-primary-900 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
                </div>

                <button type="button"
                    @click="showDetailedPricing(serviceData.subTypeHeader3, serviceData.servicesForMenuBySubGroupViewModels3)"
                    class="cursor-pointer mt-2 md:mt-0 md:pl-4 hover:text-primary-500 text-lg k-para-text font-bold underline uppercase underline-offset-4 transition rounded inline-block whitespace-nowrap text-left">
                    View Detailed Pricing
                </button>
            </div>

            <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
                <div v-for="service in serviceData.servicesForMenuBySubGroupViewModels3" :key="service.serviceCode"
                    class="flex flex-col p-4">
                    <h3 class="k-sub-section-title pb-2 uppercase" v-text="service.serviceDescription" />

                    <p class="font-bold" v-text="service.priceRange" />

                    <p class="mt-1 leading-snug flex-1" v-text="service.serviceText" />

                    <!-- BOOK NOW pinned at the bottom, content width only -->
                    <template v-if="mounted">
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
                                    <a class="text-xl link" :href="'/book/new/promo?s=' + service.serviceCode">
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
                    </template>

                    <template v-else>
                        <a :href="'/book/new/promo?s=' + service.serviceCode"
                            class="w-40 mt-2 self-start text-center py-2 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap cursor-pointer inline-block">
                            BOOK NOW
                        </a>
                    </template>
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
                                <a :href="stack?.serviceTypeRoute + '/' + stack?.stackPageRoute"
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
                        <span class="text-lg">Nail Services</span>
                        <br />
                        Elegance Right
                        <br />
                        at Your
                        <br />
                        Fingertips
                    </h1>
                </div>

                <div class="mt-6 md:mt-0 lg:pb-20">
                    <p class="k-para-text">
                        Stay polished and confident at Kenneth's nail salon,
                        where creativity, care, and quality are guaranteed.
                    </p>

                    <template v-if="mounted">
                        <pop-up-menu>
                            <template #trigger>
                                <div
                                    class="hover:text-primary-500 k-sub-section-title font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                                    Book Your Nail Appointment →
                                </div>
                            </template>

                            <template #links>
                                <div class="sans-serif p-3">
                                    <a class="text-xl link" href="https://kenneths.com/app/">
                                        <span aria-hidden="true">
                                            Existing Customer
                                        </span>

                                        <span class="sr-only">
                                            booking for nail services
                                        </span>
                                    </a>
                                </div>

                                <div class="sans-serif p-3">
                                    <a class="text-xl link" href="/book/new/service-type">
                                        <span aria-hidden="true">
                                            New Customer
                                        </span>

                                        <span class="sr-only">
                                            booking for nail services
                                        </span>
                                    </a>
                                </div>
                            </template>
                        </pop-up-menu>
                    </template>

                    <template v-else>
                        <a href="/book/new/service-type"
                            class="hover:text-primary-500 k-sub-section-title font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                            Book Your Nail Appointment →
                        </a>
                    </template>
                </div>
            </div>

            <!-- Right column -->
            <div class="flex items-center justify-center">
                <img src="/images/services/nail/nail-services.webp" loading="eager" fetchpriority="high"
                    alt="Nail services" class="w-full aspect-square object-cover" />
            </div>
        </section>

        <!-- Nail service types -->
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

    <!-- Spa Bar -->
    <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
        <!-- Left column -->
        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <div>
                <h2 class="k-section-title uppercase pt-2">
                    Meet Us at The Spa Bar
                </h2>

                <p class="mt-5 k-para-text">
                    A new kind of happy hour where facials, nails, and spa
                    treatments are fast & flawless.
                </p>
            </div>

            <div class="mt-6 md:mt-0 lg:pb-20">
                <template v-if="mounted">
                    <pop-up-menu>
                        <template #trigger>
                            <div
                                class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2">
                                Book Now @ Polaris
                            </div>
                        </template>

                        <template #links>
                            <div class="sans-serif p-3">
                                <a class="text-xl link" href="https://kenneths.com/app/">
                                    <span aria-hidden="true">
                                        Existing Customer
                                    </span>

                                    <span class="sr-only">
                                        booking at Kenneth's Spa Bar in Polaris
                                    </span>
                                </a>
                            </div>

                            <div class="sans-serif p-3">
                                <a class="text-xl link" href="/book/new/promo?fl=PL">
                                    <span aria-hidden="true">
                                        New Customer
                                    </span>

                                    <span class="sr-only">
                                        booking at Kenneth's Spa Bar in Polaris
                                    </span>
                                </a>
                            </div>
                        </template>
                    </pop-up-menu>
                </template>

                <template v-else>
                    <a href="/book/new/promo?fl=PL"
                        class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2">
                        Book Now @ Polaris
                    </a>
                </template>
            </div>
        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center">
            <img src="/images/services/nail/meet-us-at-the-spa-bar.webp" alt="Meet us at the spa bar"
                class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
    </section>

    <!-- Testimonial -->
    <section class="relative w-full h-[500px] md:h-[700px] overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-center"
            style="background-image: url('/images/services/nail/nail-pedicure-testimonial.webp');">
        </div>

        <!-- Overlay for readability -->
        <div class="absolute inset-0 bg-black/20"></div>

        <!-- Content -->
        <div class="relative z-10 flex items-start h-full px-6 text-left pt-15 md:pt-30">
            <div class="px-5 md:px-10 text-primary-100">
                <p
                    class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed pr-0 pb-10 md:pb-30 lg:pr-30">
                    “My experience with Bree was excellent!!! I had a pedicure
                    and a manicure and her services were outstanding! Bree is
                    so much fun to talk to and she is very professional. I
                    highly recommend her!”
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
                </div>

                <p class="text-xl font-semibold mt-4">
                    Janet G. M.
                </p>
            </div>
        </div>
    </section>

    <!-- Service Type Navigation -->
    <section class="bg-primary-100 text-primary-900 py-10">
        <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-10">
            <!-- Column 1 -->
            <div class="flex flex-col items-center md:items-start">
                <a href="/services/spa">
                    <img src="/images/menu/spa-service-navigate.webp" alt="Go to Spa Services"
                        class="w-full object-cover mx-auto" loading="lazy" decoding="async" fetchpriority="low" />
                </a>

                <a href="/services/spa"
                    class="hover:text-primary-700 text-xl transition rounded inline-block mt-2 font-bold uppercase self-start">
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
                <a href="/services/hair">
                    <img src="/images/menu/hair-service-navigate.webp" alt="Go to Hair services"
                        class="w-full object-cover mx-auto" loading="lazy" decoding="async" fetchpriority="low" />
                </a>

                <a href="/services/hair"
                    class="hover:text-primary-700 text-xl transition rounded inline-block mt-2 font-bold uppercase self-start">
                    <h3 class="k-sub-section-title font-bold">
                        HAIR SERVICES
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
import { computed, onMounted, ref } from 'vue'
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

import Accordion from '@/volt/Accordion.vue'
import AccordionPanel from '@/volt/AccordionPanel.vue'
import AccordionHeader from '@/volt/AccordionHeader.vue'
import AccordionContent from '@/volt/AccordionContent.vue'

const route = useRoute()
const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})

function normalizeInlineText(value) {
    return String(value ?? '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function normalizeService(service = {}) {
    return {
        ...service,
        serviceDescription: normalizeInlineText(service.serviceDescription),
        priceRange: normalizeInlineText(service.priceRange),
        serviceText: normalizeInlineText(service.serviceText)
    }
}

function normalizeStack(stack = {}) {
    return {
        ...stack,
        title: normalizeInlineText(stack.title)
    }
}

function normalizeServiceData(data = {}) {
    return {
        ...data,
        mainHeader: normalizeInlineText(data.mainHeader),
        allServicesText: normalizeInlineText(data.allServicesText),
        subTypeHeader: normalizeInlineText(data.subTypeHeader),
        subTypeHeader2: normalizeInlineText(data.subTypeHeader2),
        subTypeHeader3: normalizeInlineText(data.subTypeHeader3),
        metaTitle: normalizeInlineText(data.metaTitle),
        metaDescription: normalizeInlineText(data.metaDescription),
        name: normalizeInlineText(data.name),

        servicesForMenuBySubGroupViewModels:
            Array.isArray(data.servicesForMenuBySubGroupViewModels)
                ? data.servicesForMenuBySubGroupViewModels.map(normalizeService)
                : [],

        servicesForMenuBySubGroupViewModels2:
            Array.isArray(data.servicesForMenuBySubGroupViewModels2)
                ? data.servicesForMenuBySubGroupViewModels2.map(normalizeService)
                : [],

        servicesForMenuBySubGroupViewModels3:
            Array.isArray(data.servicesForMenuBySubGroupViewModels3)
                ? data.servicesForMenuBySubGroupViewModels3.map(normalizeService)
                : [],

        supportingStackPageViewModels:
            Array.isArray(data.supportingStackPageViewModels)
                ? data.supportingStackPageViewModels.map(normalizeStack)
                : []
    }
}

const serviceSubType = computed(() => {
    const param = route.params.serviceSubType
    return typeof param === 'string' ? param : ''
})

const hasServiceSubType = computed(() => {
    return serviceSubType.value !== ''
})

const subTypeParam = computed(() => {
    if (!serviceSubType.value || serviceSubType.value === '') {
        return 'null'
    }

    return serviceSubType.value
})

const url = computed(() => {
    return (
        appGlobal.apiBaseUrl +
        '/khsds/ServicesForMenu/W/' +
        subTypeParam.value
    )
})

const defaultMetaTitle =
    "Nail Services Columbus OH | Kenneth's Salons + Spas"

const defaultMetaDescription =
    "Discover Kenneth's nail services in Columbus, OH, from classic and gel manicures to spa pedicures, nail art, and enhancements at our Central Ohio salon and spa locations."

const defaultServiceData = normalizeServiceData({
    mainHeader: '',
    allServicesLink: '/services/nail',
    allServicesText: 'All Nail Services',
    subTypeHeader: '',
    subTypeHeader2: '',
    subTypeHeader3: '',
    servicesForMenuBySubGroupViewModels: [],
    servicesForMenuBySubGroupViewModels2: [],
    servicesForMenuBySubGroupViewModels3: [],
    supportingStackPageViewModels: [],
    metaTitle: defaultMetaTitle,
    metaDescription: defaultMetaDescription,
    name: 'Nail Services'
})

const { data: fetchedServiceData, error } = await useFetch(url, {
    default: () => defaultServiceData,
    transform: (input) => {
        return normalizeServiceData(input ?? defaultServiceData)
    }
})

const serviceData = computed(() => {
    return normalizeServiceData(
        fetchedServiceData.value ?? defaultServiceData
    )
})

const { throwError } = useResponse()

if (hasServiceSubType.value && (error.value || !serviceData.value.mainHeader)) {
    throwError(404, `Service "${serviceSubType.value}" not found`)
}

const metaTitle = computed(() => {
    if (subTypeParam.value === 'null') {
        return defaultMetaTitle
    }

    const sd = serviceData.value || {}
    return sd.metaTitle || defaultMetaTitle
})

const metaDescription = computed(() => {
    if (subTypeParam.value === 'null') {
        return defaultMetaDescription
    }

    const sd = serviceData.value || {}
    return sd.metaDescription || defaultMetaDescription
})

const serviceTypes = [
    {
        image: '/images/services/nail/manicures.webp',
        alt: 'Manicure Services',
        link: '/services/nail/manicures',
        serviceType: 'MANICURES →'
    },
    {
        image: '/images/services/nail/pedicures.webp',
        alt: 'Pedicure Services',
        link: '/services/nail/pedicures',
        serviceType: 'PEDICURES →'
    },
    {
        image: '/images/services/spa/spa-bar.webp',
        alt: 'The Spa Bar',
        link: '/services/spa/spa-bar',
        serviceType: 'THE SPA BAR →'
    }
]

const pageUrl = computed(() => {
    return hasServiceSubType.value
        ? `https://kenneths.com/services/nail/${serviceSubType.value}`
        : 'https://kenneths.com/services/nail'
})

const pageImage = computed(() => {
    if (hasServiceSubType.value) {
        const matchingServiceType = serviceTypes.find((item) => {
            return (
                item.link ===
                `/services/nail/${serviceSubType.value}`
            )
        })

        if (matchingServiceType?.image) {
            return `https://kenneths.com${matchingServiceType.image}`
        }
    }

    return 'https://kenneths.com/images/services/nail/manicures.webp'
})

const pageImageAlt = computed(() => {
    if (hasServiceSubType.value) {
        const matchingServiceType = serviceTypes.find((item) => {
            return (
                item.link ===
                `/services/nail/${serviceSubType.value}`
            )
        })

        if (matchingServiceType?.alt) {
            return matchingServiceType.alt
        }
    }

    return "Kenneth's Nail Services"
})

const jsonLDString = computed(() => {
    const hasSubtype = subTypeParam.value !== 'null'
    const sd = serviceData.value || {}

    const pageName = hasSubtype
        ? sd.metaTitle || defaultMetaTitle
        : defaultMetaTitle

    const pageDescription = hasSubtype
        ? sd.metaDescription || defaultMetaDescription
        : defaultMetaDescription

    const serviceName = hasSubtype
        ? sd.name || 'Nail Services'
        : 'Nail Services'

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
            name: 'Nail Services',
            description:
                "A collection of professional nail services at Kenneth's, including manicures, pedicures, gel and acrylic enhancements, and specialty spa nail treatments delivered by skilled technicians across Central Ohio."
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
                name: 'Nail Services',
                item: 'https://kenneths.com/services/nail'
            },
            {
                '@type': 'ListItem',
                position: 4,
                name:
                    serviceData.value.subTypeHeader ||
                    serviceData.value.name ||
                    'Nail Service',
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
            key: 'nail-service-page',
            type: 'application/ld+json',
            innerHTML: () => jsonLDString.value
        },
        {
            key: 'nail-service-breadcrumbs',
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
