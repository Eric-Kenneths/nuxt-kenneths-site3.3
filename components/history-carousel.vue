<template>
    <section id="locations-carousel" aria-label="Our locations horizontal image carousel"
        class="w-full py-10 text-primary-900 bg-primary-100">
        <div class="mb-6 sm:mb-8 flex items-end justify-between tems-center justify-center">
            <div>
                <h2 class="text-2xl sm:text-3xl md:text-5xl leading-tight uppercase">
                    Our History
                </h2>
            </div>
        </div>

        <div class="relative">
            <div class="pointer-events-none absolute left-0 right-0 flex justify-between sm:hidden">
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

            <ul ref="track" role="list" class="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 no-scrollbar"
                @scroll.passive="onScroll">
                <li v-for="(hist, idx) in items" :key="`${hist.year}-${idx}`" role="listitem"
                    class="snap-start shrink-0 w-[100%] md:w-[40%] lg:w-[32%] xl:w-[24%]">
                    <article class="h-full overflow-hidden focus-within:ring-2 focus-within:ring-p-primary-500">
                        <div class="flex justify-center">
                            <img :src="hist.image" :alt="hist.alt" class="block aspect-square object-cover"
                                loading="lazy" />
                        </div>

                        <div class="pt-6">
                            <img src="/images/our-story/our-story-timeline.webp" alt="Kenneth's History Timeline"
                                aria-hidden="true" class="w-full" loading="lazy" />
                        </div>

                        <div class="py-4 px-15 text-center">
                            <h3 class="text-2xl pb-2">{{ hist.year }}</h3>
                            <h4 class="text-lg">
                                {{ hist.header }}
                            </h4>
                            <p class="mt-2 text-sm leading-snug">
                                {{ hist.history }}
                            </p>
                        </div>
                    </article>
                </li>
            </ul>
        </div>

        <div>
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]"></div>

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

const items = [
    {
        year: '1965',
        header: 'The Beginning',
        history: 'Kenneth begins his career in central Ohio, launching a lifelong commitment to craft, service, and education.',
        image: '/images/our-story/history-01.webp',
        alt: 'Kenneth beginning his career in central Ohio in 1965'
    },
    {
        year: '1971',
        header: 'Kenneth opened his first salon',
        history: 'The first Kenneth\'s salon opens in Washington Court House, Ohio, built on personalized service and technical excellence.',
        image: '/images/our-story/history-02.webp',
        alt: 'Kenneth’s first salon in Washington Court House, Ohio, opened in 1971'
    },
    {
        year: 'Early 1970s',
        header: 'Industry Leader',
        history: 'Kenneth\'s becomes one of the first salons in the region to welcome both men and women, redefining the idea of "unisex" hair services.',
        image: '/images/our-story/history-03.webp',
        alt: 'Kenneth’s early salon representing one of the region’s first unisex hair service concepts'
    },
    {
        year: 'Mid 1970s',
        header: 'Growth and Innovation',
        history: 'Kenneth\'s expands across small Ohio communities, building long term relationships and local trust.',
        image: '/images/our-story/history-04.webp',
        alt: 'Kenneth’s salon expansion into small Ohio communities during the mid-1970s'
    },
    {
        year: 'Late 1970s',
        header: 'Big City Debut',
        history: 'The first Kenneth\'s salon opens in Columbus, marking the brand\'s entrance into the city it would help shape for decades.',
        image: '/images/our-story/history-05.webp',
        alt: 'Kenneth’s first Columbus salon opening in the late 1970s'
    },
    {
        year: 'Early 1980s',
        header: 'Technical Excellence',
        history: 'Inspired by global leaders in haircutting, Kenneth and his team develop a precision cutting approach that becomes the foundation of Kenneth\'s technical standards.',
        image: '/images/our-story/history-06.webp',
        alt: 'Kenneth and team developing precision haircutting standards in the early 1980s'
    },
    {
        year: '1980s',
        header: 'Education and Influence',
        history: 'Kenneth and his education team travel nationally, teaching professional technique, business principles, and elevated service standards.',
        image: '/images/our-story/history-07.webp',
        alt: 'Kenneth and the education team teaching salon professionals during the 1980s'
    },
    {
        year: 'Late 1980s',
        header: 'Commitment',
        history: 'Kenneth\'s expands its flagship presence on Reed Road, reinforcing its commitment to design, experience, and innovation.',
        image: '/images/our-story/history-08.webp',
        alt: 'Kenneth’s flagship Reed Road location expanded in the late 1980s'
    },
    {
        year: 'Early/Mid 1990s',
        header: 'Luxury and Wellness',
        history: 'One of central Ohio\'s first full service salon and spa destinations opens at Mill Run, redefining luxury and wellness in the region.',
        image: '/images/our-story/history-09.webp',
        alt: 'Kenneth’s Mill Run full-service salon and spa location in the early to mid-1990s'
    },
    {
        year: '1990s',
        header: 'Product Innovation',
        history: 'Kenneth\'s launches proprietary professional haircare products, ensuring consistency, quality, and long term care for guests.',
        image: '/images/our-story/history-10.webp',
        alt: 'Kenneth’s proprietary professional haircare product innovation in the 1990s'
    },
    {
        year: 'Late 1990s',
        header: 'Mentorship and Scholarship',
        history: 'Formal mentorship and scholarship programs are introduced in partnership with local beauty schools, supporting the next generation of professionals.',
        image: '/images/our-story/history-11.webp',
        alt: 'Kenneth’s mentorship and scholarship programs with local beauty schools in the late 1990s'
    },
    {
        year: 'Early 2000s',
        header: 'Collaboration and Standards',
        history: 'Kenneth\'s collaborates with state boards and schools to help shape modern internship and training standards in Ohio.',
        image: '/images/our-story/history-12.webp',
        alt: 'Kenneth’s collaboration with Ohio schools and boards to shape training standards in the early 2000s'
    },
    {
        year: '2007',
        header: 'Employee Ownership',
        history: 'Kenneth\'s becomes a 100 percent employee-owned company, reinforcing a culture built on belief, growth, care, and community.',
        image: '/images/our-story/history-13.webp',
        alt: 'Kenneth’s becoming a 100 percent employee-owned company in 2007'
    },
    {
        year: '2010s',
        header: 'Technology and Personalization',
        history: 'Technology driven consultation and guest matching tools are introduced to personalize every visit.',
        image: '/images/our-story/history-14.webp',
        alt: 'Technology-driven consultation and guest personalization tools introduced by Kenneth’s in the 2010s'
    },
    {
        year: '2020s',
        header: 'Innovation and Evolution',
        history: 'New service concepts and spa experiences are launched, continuing a tradition of thoughtful reinvention while honoring the company\'s roots.',
        image: '/images/our-story/history-15.webp',
        alt: 'New Kenneth’s service concepts and spa experiences launched in the 2020s'
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
    resizeObserver = new ResizeObserver(updateEdgeState)
    if (track.value) {
        resizeObserver.observe(track.value)
    }
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
</style>