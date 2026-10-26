<template>
     <section>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-auto px-6 py-5">
            <div v-for="(image, index) in images" :key="index" class="aspect-square">
                <img :src="image.url" :alt="image.alt"
                    class="w-full h-full object-cover" />
            </div>
        </div>
    </section>
</template>

<script setup>
    defineProps({
        images: Array
    })
</script>

<style scoped>


</style>