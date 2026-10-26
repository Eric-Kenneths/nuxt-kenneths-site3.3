<template>
    <section id="locations-carousel" aria-label="Our locations horizontal image carousel"
        class="w-full py-10 lg:pl-5 text-primary-900 bg-primary-100">
        <!-- Heading -->
        <div class="mb-6 sm:mb-8 pl-5 lg:pl-0 flex items-center">
            <div class="pr-5">
                <h2 class="text-3xl md:text-5xl leading-tight uppercase">
                    Inside The Salon</h2>
            </div>

            <div class="hidden lg:flex w-[55%] bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]"></div>

            <div class="hidden lg:flex">
                <a href="/blog"
                    class="hover:text-primary-500 text-2xl font-bold underline uppercase underline-offset-4 transition rounded pl-5 py-3 inline-block">Read
                    Now</a>
            </div>

        </div>

        <!-- Carousel viewport -->
        <div class="relative pb-3">

            <ul ref="track" role="list"
                class="flex gap-7 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pr-4 pl-4 sm:pl-0 sm:pr-0 no-scrollbar"
                @scroll.passive="onScroll">

                <li v-for="(post, idx) in postHeaders" :key="post.publishDate" role="listitem"
                    class="snap-start shrink-0 w-[82%] xs:w-[70%] sm:w-[55%] md:w-[40%] lg:w-[32%] xl:w-[24%]">

                    <!-- ARTICLE MUST BE FLEX FOR BOTTOM ALIGNMENT -->
                    <article
                        class="h-full flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-p-primary-500 border border-primary-500 p-5">

                        <!-- Image -->
                        <div class="relative">
                            <img :src="'https://kenneths.com/static/blog/' + post.photoName"
                                :alt="`${post.name} exterior`" class="block w-full" loading="lazy" />

                            <span
                                class="absolute top-3 right-3 inline-flex items-center bg-primary-500 px-3 py-1 font-medium shadow uppercase">
                                {{ post.postGroup }}
                            </span>
                        </div>

                        <!-- Content -->
                        <div class="p-4 flex flex-col h-full">

                            <!-- Date -->
                            <div class="pb-2 text-sm">
                                {{ filterDateTimeToDate(post.publishDate) }}
                            </div>

                            <!-- Title -->
                            <p class="mt-1 font-bold text-lg leading-snug uppercase">
                                {{ post.title }}
                            </p>

                            <!-- Subtitle -->
                            <p class="my-2 cursor-pointer sans-serif font-normal text-xl lg:text-base">
                                <a :href="'/blog/post/' + post.routeName" class="blog-link">
                                    {{ post.subTitle }}…
                                </a>
                            </p>

                            <!-- Spacer pushes button down -->
                            <div class="mt-auto"></div>

                            <!-- Read Now Button -->
                            <div class="pt-4">
                                <a :href="'/blog/post/' + post.routeName"
                                    class="px-5 py-2 rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap w-1/3 mx-auto text-center">
                                    Read Now
                                </a>
                            </div>

                        </div>

                    </article>
                </li>

            </ul>

        </div>

        <div>
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
            </div>
            <div class="flex items-center justify-center gap-2 pt-3">
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
const { filterDateTimeToDate } = useFilters();

import { appGlobal } from '~/composables/appGlobal';

const url = appGlobal.apiBaseUrl + '/khsds/Blog/ListHeaders/featured'

const { data: postHeaders, error } = await useFetch(url);

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
