<template>
    <section v-if="current" class="relative w-full overflow-hidden bg-primary-500 text-primary-900"
        aria-label="Guest reviews">
        <!-- Content -->
        <div class="relative z-10 flex items-start h-full px-6 text-left py-10 md:py-10">
            <div class="px-5 md:px-10 w-full">
                <Transition name="review-fade" mode="out-in">
                    <figure :key="current.id">
                        <blockquote
                            class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed pr-0 pb-10 md:pb-15 lg:pr-30">
                            "{{ current.text }}"
                        </blockquote>
                        <hr class="border-0 h-[2px] bg-primary-900 w-full" />
                        <figcaption class="text-xl font-semibold mt-4">-{{ filterAbbreviateName(current.author) }}</figcaption>
                    </figure>
                </Transition>

                <div v-if="items.length > 1 || ratingText" class="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div v-if="items.length > 1" class="flex items-center gap-2">
                        <button type="button"
                            class="inline-flex size-9 items-center justify-center rounded-full bg-primary-900 text-primary-100 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 disabled:opacity-40 cursor-pointer"
                            :disabled="atStart" aria-label="Show previous review" @click="showPrevious">
                            &#8249;
                        </button>
                        <button type="button"
                            class="inline-flex size-9 items-center justify-center rounded-full bg-primary-900 text-primary-100 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 disabled:opacity-40 cursor-pointer"
                            :disabled="atEnd" aria-label="Show next review" @click="showNext">
                            &#8250;
                        </button>
                        <span class="text-sm" aria-live="polite">{{ index + 1 }} / {{ items.length }}</span>
                    </div>

                    <p v-if="ratingText" class="text-base">
                        <a v-if="reviewUrl" :href="reviewUrl" target="_blank" rel="noopener noreferrer"
                            class="underline">{{ ratingText }}</a>
                        <span v-else>{{ ratingText }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    /*
     * Shows one guest review at a time. `reviews` is the same list the page
     * publishes as Review structured data, so what is marked up is what is
     * visible. When there are no reviews it falls back to the single
     * `testimonial` / `author` pair. `rating` and `reviewCount` are the
     * location's overall Google rating, shown so the page's aggregateRating
     * markup is also visible.
     */
    const props = defineProps({
        reviews: {
            type: Array,
            default: () => []
        },
        rating: [Number, String],
        reviewCount: [Number, String],
        reviewUrl: String,
        testimonial: String,
        author: String
    })

    const { filterAbbreviateName } = useFilters()

    const items = computed(() => {
        if (props.reviews.length) {
            return props.reviews.map(review => ({
                id: review.socialReviewId,
                text: review.reviewComment,
                author: review.reviewer
            }))
        }

        return props.testimonial ? [{ id: 'testimonial', text: props.testimonial, author: props.author }] : []
    })

    const index = ref(0)

    const current = computed(() => items.value[index.value] || null)
    const atStart = computed(() => index.value <= 0)
    const atEnd = computed(() => index.value >= items.value.length - 1)

    const showPrevious = () => {
        if (index.value > 0) index.value--
    }

    const showNext = () => {
        if (index.value < items.value.length - 1) index.value++
    }

    const ratingText = computed(() => {
        const rating = Number(props.rating)
        const count = Number(props.reviewCount)

        if (!rating || !count || !props.reviews.length) return ''

        return `${rating.toFixed(1)} ★ · ${count.toLocaleString('en-US')} Google reviews`
    })
</script>

<style scoped>
.review-fade-enter-active,
.review-fade-leave-active {
    transition: opacity 0.2s ease;
}

.review-fade-enter-from,
.review-fade-leave-to {
    opacity: 0;
}
</style>
