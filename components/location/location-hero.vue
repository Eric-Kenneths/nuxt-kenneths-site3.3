<template>
    <section>
        <div class="relative hidden md:flex items-center justify-center h-[90vmin] w-full overflow-hidden bg-cover bg-no-repeat"
            :style="{ backgroundImage: `url(${heroData.largeBackgroundUrl})` }">
            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white ">

                <div class="k-header-text-shadow uppercase text-center">
                    <a href="/locations"
                        class="hover:text-primary-900 font-thin k-sub-section-title underline underline-offset-4 transition">←
                        Locations</a><br />
                    <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl max-w-5xl">{{ heroData.header1 }}<br />{{
                        heroData.header2 }}</h1>
                </div>
            </div>
        </div>

        <div class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-no-repeat bg-cover"
            :style="{ backgroundImage: `url(${heroData.smallBackgroundUrl})` }">

            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white">
                <div class="k-header-text-shadow uppercase text-center">
                    <a href="/locations"
                        class="hover:text-primary-900 font-thin text-xl md:text-xl underline underline-offset-4 transition">←
                        Locations</a><br />
                    <div class="font-thin text-5xl max-w-5xl" aria-hidden="true">
                        {{ heroData.header1 }}<br />{{ heroData.header2 }}
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
const props = defineProps({
    heroData: Object
})
</script>

<style scoped></style>