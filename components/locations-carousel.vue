<template>
    <section id="locations-carousel" aria-label="Our locations horizontal image carousel"
        class="w-full py-10 text-primary-900 bg-primary-100">
        <!-- Heading -->
        <div class="mb-6 sm:mb-8 flex items-end justify-between">
            <div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight uppercase">
                    {{ headingText }}</h2>
            </div>

        </div>

        <!-- Carousel viewport -->
        <div class="relative">
            <!-- Mobile controls overlay -->
            <div class="pointer-events-none absolute inset-y-0 left-0 right-0 flex justify-between sm:hidden">
                <button type="button"
                    class="pointer-events-auto my-auto ml-1 inline-flex size-9 items-center justify-center rounded-full bg-white/90 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40"
                    :aria-disabled="atStart" :disabled="atStart" aria-label="Scroll locations left"
                    @click="scrollByAmount(-1)">
                    <span aria-hidden="true" class="i-lucide:chevron-left"></span>
                </button>
                <button type="button"
                    class="pointer-events-auto my-auto mr-1 inline-flex size-9 items-center justify-center rounded-full bg-white/90 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40"
                    :aria-disabled="atEnd" :disabled="atEnd" aria-label="Scroll locations right"
                    @click="scrollByAmount(1)">
                    <span aria-hidden="true" class="i-lucide:chevron-right"></span>
                </button>
            </div>

            <ul ref="track" role="list"
                class="flex gap-7 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pr-4 pl-4 sm:pl-0 sm:pr-0 no-scrollbar"
                @scroll.passive="onScroll">
                <li v-for="(loc, idx) in items" :key="loc.name" role="listitem"
                    class="snap-start shrink-0 w-[82%] xs:w-[70%] sm:w-[55%] md:w-[40%] lg:w-[32%] xl:w-[24%]">
                    <article class="h-full overflow-hidden focus-within:ring-2 focus-within:ring-p-primary-500">
                        <div class="relative">
                            <img :src="loc.image" :alt="`${loc.name} exterior`"
                                class="block h-90 md:h-110 w-full object-cover" loading="lazy" />
                            <span
                                class="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-medium shadow">
                                {{ idx + 1 }} / {{ items.length }}
                            </span>
                        </div>

                        <div class="p-4">
                            <h3 class="text-xl pb-2 uppercase">{{ loc.name }}</h3>
                            <p class="mt-1 text-sm leading-snug">
                                {{ loc.street }}<br />
                                {{ loc.cityStateZip }}
                            </p>
                            <div class="my-2">
                                <a href="tel:6145385800">(614) 538-5800</a>
                            </div>
                            <pop-up-menu>
                                <template #trigger>
                                    <div
                                        class="hover:text-primary-500 text-lg md:text-xl underline font-bold underline-offset-4 transition rounded py-3 inline-block">
                                        BOOK NOW</div>
                                </template>
                                <template #links>
                                    <div class="sans-serif p-3">
                                        <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                                    </div>
                                    <div class="sans-serif p-3">
                                        <a class="text-xl link" :href="'/book/new/promo?fl=' + loc.locationCode">New Customer</a>
                                    </div>
                                </template>
                            </pop-up-menu>

                        </div>
                    </article>
                </li>
            </ul>
        </div>
        <div>
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
            </div>
            <div class="hidden sm:flex items-center justify-center gap-2 pt-3">
                <button type="button"
                    class="pointer-events-auto my-auto ml-1 inline-flex size-9 items-center justify-center rounded-full bg-primary-500 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40 text-primary-900 pt-1 cursor-pointer"
                    :aria-disabled="atStart" :disabled="atStart" aria-label="Scroll locations left"
                    @click="scrollByAmount(-1)">
                    &lt;
                </button>
                <button type="button"
                    class="pointer-events-auto my-auto mr-1 inline-flex size-9 items-center justify-center rounded-full bg-primary-500 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40 text-primary-900 pt-1 cursor-pointer"
                    :aria-disabled="atEnd" :disabled="atEnd" aria-label="Scroll locations right"
                    @click="scrollByAmount(1)">
                    &gt;
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

let headingText = 'Visit your local salon';

const { heading } = defineProps(["heading"]);


if (heading !== undefined) {
    headingText = heading;
}

const items = [
    {
        locationCode: 'AV',
        name: 'Dublin',
        street: '7056 Hospital Drive',
        cityStateZip: 'Dublin, OH 43016',
        image: '/images/locations/dublin.webp'
    },
        {
        locationCode: 'GR',
        name: 'Grove City',
        street: '1582 Stringtown Rd',
        cityStateZip: 'Grove City, OH 43123',
        image: '/images/locations/grove-city.webp'
    },
    {
        locationCode: 'MR',
        name: 'Hilliard',
        street: '4525 Wathen Dr',
        cityStateZip: 'Hilliard, OH 43026',
        image: '/images/locations/hilliard.webp'
    },
    {
        locationCode: 'NG',
        name: 'New Albany',
        street: '4942 Morse Rd',
        cityStateZip: 'Columbus, OH 43230',
        image: '/images/locations/new-albany.webp'
    },
    {
        locationCode: 'TS',
        name: 'Pickerington',
        street: '2865 Taylor Road SW',
        cityStateZip: 'Reynoldsburg, OH 43068',
        image: '/images/locations/reynoldsburg.webp'
    },
    {
        locationCode: 'PL',
        name: 'Polaris',
        street: '1305 Cameron Ave',
        cityStateZip: 'Lewis Center, OH 43035',
        image: '/images/locations/polaris.webp'
    },
    {
        locationCode: 'PW',
        name: 'Powell',
        street: '9868 Brewster Ln',
        cityStateZip: 'Powell, OH 43065',
        image: '/images/locations/powell.webp'
    },
    {
        locationCode: 'KD',
        name: 'Upper Arlington',
        street: '3134 Kingsdale Center',
        cityStateZip: 'Upper Arlington, OH 43221',
        image: '/images/locations/upper-arlington.webp'
    },
    {
        locationCode: 'WS',
        name: 'Westerville',
        street: '726 N State St',
        cityStateZip: 'Westerville, OH 43082',
        image: '/images/locations/westerville.webp'
    },
    {
        locationCode: 'AT',
        name: 'Academy',
        street: '5151 Reed Road, Suite 110 B',
        cityStateZip: 'Columbus, OH 43220',
        image: '/images/locations/academy.webp'
    }
]

const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)
let resizeObserver

const updateEdgeState = () => {
    if (!track.value) return
    const el = track.value
    const { scrollLeft, scrollWidth, clientWidth } = el
    atStart.value = scrollLeft <= 1
    atEnd.value = scrollLeft + clientWidth >= scrollWidth - 1
}

const scrollByAmount = (dir = 1) => {
    if (!track.value) return
    const el = track.value
    const amount = Math.round(el.clientWidth * 0.8) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
}

const onScroll = () => updateEdgeState()

onMounted(() => {
    updateEdgeState()
    // Keep edge state accurate on resize/content changes
    resizeObserver = new ResizeObserver(updateEdgeState)
    resizeObserver.observe(track.value)
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
})
</script>

<style scoped>
.no-scrollbar {
    scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Iconify (lucide) utility classes are assumed to be available in the project. If not, replace with SVGs. */
</style>
