<template>
    <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
        <!-- Left column -->

        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <div>
                <h2 class="k-section-title uppercase pt-2">
                    Explore our neighborhood
                </h2>
            </div>

            <!-- Every published neighborhood page for this location -->
            <ul v-if="stackPages.length" class="k-para-text mt-6 flex flex-col items-start gap-2">
                <li v-for="page in stackPages" :key="page.pointOfInterestRoute">
                    <a :href="`/locations/${page.locationRoute}/${page.pointOfInterestRoute}`"
                        class="text-base md:text-lg underline hover:no-underline hover:text-primary-300 transition-colors">{{
                            page.title || page.placeName }}</a>
                </li>
            </ul>

            <!-- Fallback: the single stack link stored on the location -->
            <p v-else-if="stackUrl" class="k-para-text mt-6 md:mt-0">
                <a :href="stackUrl.toLowerCase()"
                    class="px-5 py-2 ml-auto k-section-link lg:ml-0 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">{{
                        stackText }}</a>
            </p>
        </div>

        <!-- Right column -->
        <div class="flex">
            <img :src="imageUrl" alt="Polaris Mall" class="w-full h-full object-cover" />
        </div>
    </section>
</template>

<script setup>

defineProps({
    stackText: String,
    stackUrl: String,
    imageUrl: String,
    stackPages: {
        type: Array,
        default: () => []
    }
})

</script>

<style lang="scss" scoped></style>
