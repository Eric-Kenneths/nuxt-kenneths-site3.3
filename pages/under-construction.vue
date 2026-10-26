<template>
    <section class="lg:hidden bg-primary-900 w-full h-[95px]  lg:h-[120px] flex items-end">
        <GoldLine />
    </section>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <div
        class="relative flex items-center justify-center min-h-[280px] lg:min-h-[360px] w-full overflow-hidden pt-24 lg:pt-40">
        <img src="/images/icons/k-icon-light.webp" alt="" aria-hidden="true"
            class="absolute -top-20 -left-10 h-[160%] w-auto opacity-30 pointer-events-none z-0" />

        <div class="relative z-10 flex items-center justify-center px-4">
            <h1
                class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 uppercase text-center leading-tight k-header-text-shadow">
                Under Construction
            </h1>
        </div>
    </div>

    <GoldLine />
    <div class="bg-primary-100 text-primary-900">

        <!-- SECTION 2: Return Policy (full width) -->
        <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-[1200px] mx-auto">
                <div class="flex justify-center">
                    <h2 class="k-section-title mb-8 text-center uppercase">Website enhancement in progress. Online sales are currently
        unavailable.</h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>



useHead({
    title: "Under Construction | Kenneth's Salons & Spas"
})


</script>
