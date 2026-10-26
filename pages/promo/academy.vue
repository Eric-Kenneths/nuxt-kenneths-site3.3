<template>
    <section class="bg-primary-900 pt-24 md:pt-35">
        <div class="mx-auto max-w-[1600px] px-4 pt-10 pb-16">
            <div class="flex justify-center">
                <!-- Promo Card -->
                <div class="w-full max-w-3xl rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/5 overflow-hidden">
                    <div class="p-5 sm:p-8">
                        <template v-if="offer">
                            <img :src="offer.imageSrc" :alt="offer.imageAlt" class="w-full rounded-2xl object-cover" />

                            <div class="mt-6 text-center">
                                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-900">
                                    {{ offer.title }}
                                </h1>

                                <p v-if="offer.subtitle" class="mt-3 k-para-text text-black/70">
                                    {{ offer.subtitle }}
                                </p>

                                <p v-if="offer.note" class="mt-4 k-para-text text-black/70">
                                    {{ offer.note }}
                                </p>

                                <p class="mt-5 k-para-text leading-relaxed text-black/70">
                                    You enjoyed your services at our Academy Salon — now make your next visit even
                                    better. With this exclusive offer, you'll get
                                    <span class="font-semibold text-primary-900">{{ offer.descriptionEmphasis }}</span>
                                    at our Academy location, all for only
                                    <span class="font-extrabold text-primary-500">{{ offer.priceText }}</span>.
                                </p>

                                <div class="mt-7 flex flex-col items-center gap-4">
                                    <a :href="state.bookingUrl"
                                        class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-900 px-6 py-3 k-section-link uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                        :aria-label="offer.ctaAriaLabel">
                                        {{ offer.ctaText }}
                                    </a>

                                    <p class="k-para-text text-black/70">
                                        or call
                                        <a href="tel:6145385800"
                                            class="k-para-text font-semibold text-primary-900 underline underline-offset-4 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded">
                                            614.538.5800
                                        </a>
                                        and mention code
                                        <span class="k-para-text font-bold text-primary-900">{{ offer.code }}</span>
                                    </p>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="py-10 text-center">
                                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-900">
                                    Academy Offer
                                </h1>
                                <p class="mt-3 text-black/70">
                                    This promo link is missing a valid <span class="font-semibold">mid</span> value.
                                </p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const route = useRoute()

const state = reactive({
    mid: '',
    bookingUrl: '',
})

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }

    ]
})

const offerMap = {
    '534': {
        imageSrc: '/images/promo/academy/academy-promo-haircut.webp',
        imageAlt: 'Haircut Promo',
        title: 'Get Your Next Haircut for Just $27',
        subtitle: '(Normally $38 — exclusively with a Stylist at our Academy Hair Salon)',
        note: '',
        descriptionEmphasis: 'a personalized haircut and style',
        priceText: '$27',
        ctaText: 'Book My $27 Haircut',
        ctaAriaLabel: 'Book the $27 haircut offer',
        code: 'KPNHC',
        serviceParam: '&s=hwc',
    },
    '535': {
        imageSrc: '/images/promo/academy/academy-promo-hair-services.webp',
        imageAlt: 'Haircut Balayage Highlighting Gloss with Blonding',
        title: 'Haircut, Balayage Highlighting + Gloss with Blonding for $99+',
        subtitle: '(Normally $175+ — exclusively with a Stylist at our Academy Hair Salon)',
        note: '*Price may vary based on length of hair and product used.',
        descriptionEmphasis: 'a haircut and style, balayage highlighting and gloss with blonding',
        priceText: '$99+',
        ctaText: 'Book Now',
        ctaAriaLabel: 'Book the haircut, balayage highlighting, and gloss offer',
        code: 'KPNW4',
        serviceParam: '&s=hwcwbgcgl',
    },
    '536': {
        imageSrc: '/images/promo/academy/academy-promo-front-desk.webp',
        imageAlt: 'Academy Front Desk - Promo for Hair Services',
        title: '$100 in Hair Services for $75',
        subtitle: '(Exclusively with a Stylist at our Academy Hair Salon)',
        note: '',
        descriptionEmphasis: 'personalized hair services',
        priceText: '$75 (for $100+ in services)',
        ctaText: 'Book Now',
        ctaAriaLabel: 'Book the $100 in services for $75 offer',
        code: 'KP100',
        serviceParam: '&p=h',
    },
}

const offer = computed(() => offerMap[state.mid] ?? null)

watchEffect(() => {
    const mid = String(route.query.mid ?? '')
    state.mid = mid

    const rawCust = route.query.c
    const cust =
        rawCust !== undefined && rawCust !== null && String(rawCust).length
            ? String(rawCust).replace(/ /g, '+')
            : ''

    const custParam = cust ? `&c=${cust}` : ''
    const serviceParam = offerMap[mid]?.serviceParam ?? ''

    state.bookingUrl = `/book/new/promo?mid=${mid}&l=at${serviceParam}${custParam}`
})
</script>
