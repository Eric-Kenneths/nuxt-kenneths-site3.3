<template>
    <section class="bg-primary-100 text-primary-900">
        <div class="max-w-[1600px] mx-auto grid grid-cols-1">
            <!-- Column 1 (33%) -->
            <div class="lg:col-span-4"> <!-- px-2 to match sidebar left inset -->
                <!-- Title matches sidebar style -->
                <div class="font-bold p-1">
                    Services Available
                </div>

                <div v-if="locationCode === 'AT'">
                    <div class="grid grid-cols-1 pr-3">
                        <div class="pl-2 pb-2 pt-2 text-lg">Hair</div>
                        <gold-line-thin />
                    </div>

                    <div class="grid grid-cols-2 gap-8">
                        <div class="pr-3">
                            <div class="pl-2 pb-2 pt-2">Cuts\Styles</div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">Highlights</div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">Smoothing/Perm</div>
                            <gold-line-thin />
                        </div>

                        <div class="pr-3">
                            <div class="pl-2 pb-2 pt-2">Color</div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">Treatments</div>
                            <gold-line-thin />
                            <div class="pl-2 pb-2 pt-2">Extensions</div>
                            <gold-line-thin />
                        </div>
                    </div>
                </div>

                <div v-else class="grid grid-cols-1">
                    <div class="pr-0">
                        <div class="pl-2 pb-2 pt-2">
                            <template v-if="locationServices.hair">
                                <a class="hover:text-primary-700 pl-2" href="/services/hair">Hair &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Hair</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.facials">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/facials">Facials &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Facials</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.waxings">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/waxings">Waxings &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Waxings</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.makeup">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/makeup">Makeup &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Makeup</span>
                            </template>
                        </div>
                        <gold-line-thin />
                    </div>

                    <div class="pr-3">
                        <div class="pl-2 pb-2 pt-2">
                            <template v-if="locationServices.nails">
                                <a class="hover:text-primary-700 pl-2" href="/services/nail">Nails &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Nails</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.spaBar">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/spa-bar">Spa Bar &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Spa Bar</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.browLash">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/brow-and-lash">Brow + Lash
                                    &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Brow + Lash</span>
                            </template>
                        </div>
                        <gold-line-thin />

                        <div class="pl-2 pb-2 pt-3">
                            <template v-if="locationServices.massage">
                                <a class="hover:text-primary-700 pl-2" href="/services/spa/massage">Massage &rarr;</a>
                            </template>
                            <template v-else>
                                <span class="pl-2 pb-2 pt-3 line-through">Massage</span>
                            </template>
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
    locationServices: Object,
    locationCode: String
})
</script>

<style scoped></style>