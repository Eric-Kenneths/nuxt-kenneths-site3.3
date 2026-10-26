<template>
    <section class="bg-primary-100 text-primary-900 py-12 px-4 lg:px-10">
        <div class="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Column 1 (33%) -->
            <div class="lg:col-span-4">
                <h2 class="k-section-title mb-4  uppercase">Hours</h2>
                <div v-for="(hour, idx) in hours" :key="hours">
                    <div class="flex justify-between px-4 py-2">
                        <div class="font-bold">
                            {{ hour.dow }}
                        </div>
                        <div>
                            {{ hour.hours }}
                        </div>
                    </div>

                    <gold-line-thin />
                </div>
            </div>

            <!-- Column 2 (10%) -->
            <div class="hidden lg:flex lg:col-span-1 relative justify-center">
                <!-- absolutely positioned full-height line -->
                <div class="absolute top-0 bottom-0 w-0.5 h-90 bg-repeat-y bg-center bg-[url('/images/icons/gold-line.webp')]"
                    aria-hidden="true"></div>
            </div>

            <!-- Column 3 (57%) -->
            <div class="lg:col-span-7">
                <h2 class="text-4xl lg:text-5xl mb-4 uppercase">Services Available</h2>

                <div v-if="locationCode === 'AT'">
                    <div class="grid grid-cols-1 font-bold pr-3">
                        <div class="pl-2 pb-2 pt-2  text-lg">
                            Hair
                        </div>
                        <gold-line-thin />
                    </div>
                    <div class="grid grid-cols-2 gap-8">

                        <div class="pr-3">
                            <div class="pl-2 pb-2 pt-2">
                                Cuts\Styles
                            </div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">
                                Highlights
                            </div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">
                                Smoothing/Perm
                            </div>
                            <gold-line-thin />
                        </div>

                        <div class="pr-3">
                            <div class="pl-2 pb-2 pt-2">
                                Color
                            </div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">
                                Treatments
                            </div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">
                                Extensions
                            </div>
                            <gold-line-thin />
                        </div>

                    </div>
                </div>
                <div v-else class="grid grid-cols-2 gap-8">
                    <div class="pr-3">
                        <div class="pl-2 pb-2 pt-2 font-bold">
                            <template v-if="locationServices.hair"><a class="hover:text-primary-700"
                                    href="/services/hair">Hair &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Hair</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-2 font-bold">
                            <template v-if="locationServices.headSpa"><a class="hover:text-primary-700"
                                    href="/services/hair/japanese-head-spa">Head Spa &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Head Spa</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.facials"><a class="hover:text-primary-700"
                                    href="/services/spa/facials">Facials &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Facials</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.waxings"><a class="hover:text-primary-700"
                                    href="/services/spa/waxings">Waxings &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Waxings</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.makeup"><a class="hover:text-primary-700"
                                    href="/services/spa/makeup">Makeup &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Makeup</span></template>
                        </div>
                        <gold-line-thin />
                    </div>


                    <div class="pr-3">
                        <div class="pl-2 pb-2 pt-2 font-bold">
                            <template v-if="locationServices.nails"><a class="hover:text-primary-700"
                                    href="/services/nail">Nails &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Nails</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.spaBar"><a class="hover:text-primary-700"
                                    href="/services/spa/spa-bar">Spa Bar &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Spa Bar</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.browLash"><a class="hover:text-primary-700"
                                    href="/services/spa/brow-and-lash">Brow + Lash
                                    &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Brow + Lash</span></template>
                        </div>
                        <gold-line-thin />
                        <div class="pl-2 pb-2 pt-3 font-bold">
                            <template v-if="locationServices.massage"><a class="hover:text-primary-700"
                                    href="/services/spa/massage">Massage &rarr;</a></template>
                            <template v-else><span class="pb-2 pt-3 line-through">Massage</span></template>
                        </div>
                        <gold-line-thin />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

defineProps({
    hours: Array,
    locationServices: Object,
    locationCode: String
})
</script>

<style scoped></style>