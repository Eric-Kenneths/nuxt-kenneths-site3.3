<template>
    <!-- Match salon-policies: mobile spacer + GoldLine -->
    <section class="lg:hidden bg-primary-900 w-full h-[95px] lg:h-[120px] flex items-end">
        <GoldLine />
    </section>

    <!-- HERO -->
    <div
        class="relative flex items-center justify-center min-h-[280px] lg:min-h-[360px] w-full overflow-hidden pt-24 lg:pt-40">
        <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Kenneth's icon background"
            aria-hidden="true" class="absolute -top-20 -left-10 h-[160%] w-auto opacity-30 pointer-events-none z-0" />

        <div class="relative z-10 flex items-center justify-center px-4">
            <h1
                class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 uppercase text-center leading-tight k-header-text-shadow">
                Service Menu
            </h1>
        </div>
    </div>

    <GoldLine />

    <!-- Body -->
    <div class="bg-primary-100 text-primary-900">
        <section
            class="w-full px-0.5 sm:px-6 py-12 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="max-w-[1200px] mx-auto">
                <!-- Location selector -->
                <div class="grid grid-cols-1 gap-6">
                    <div class="flex justify-center">
                        <p class="text-base sm:text-lg max-w-[900px]">
                            Prices shown reflect level-based pricing. Select a location to filter the menu.
                        </p>
                    </div>

                    <div class="flex justify-center">
                        <label class="w-full max-w-[420px]">
                            <span class="sr-only">Select location</span>
                            <select v-model="state.locationCode" @change="locationChange"
                                class="w-full rounded-none border border-primary-500 bg-primary-100 px-4 py-3
                                text-primary-900 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option v-for="loc in locations || []" :key="loc.locationCode"
                                    :value="loc.locationCode">
                                    {{ loc.extendedDescription }}
                                </option>
                            </select>
                        </label>
                    </div>
                </div>

                <!-- Service tables -->
                <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                    <section class="space-y-10">
                        <service-table v-if="serviceMenu" title="HAIR" :groups="[
                            { label: 'Cuts and Styles', rows: serviceMenu.cuts },
                            { label: 'Color', rows: serviceMenu.colors },
                            { label: 'Highlighting', rows: serviceMenu.weaves },
                            { label: 'Treatments', rows: serviceMenu.treatments },
                            { label: 'Smoothing/Perms', rows: serviceMenu.perms },
                            ...(serviceMenu.headSpas?.length ? [{ label: 'Head Spa', rows: serviceMenu.headSpas }] : [])
                        ]">
                            <template #after>
                                <div
                                    class="border-0 sm:border sm:border-primary-500 bg-primary-100 px-0.5 sm:px-6 py-5">
                                    <h3 class="text-xl sm:text-2xl uppercase">Hair Extensions</h3>
                                    <p class="mt-3 text-base sm:text-lg leading-relaxed">
                                        We offer a variety of hair extension methods ranging from Hand Tied Weft,
                                        Undetectable Tape In, Bonded and Clip-in. Complimentary consultations available.
                                    </p>
                                </div>
                            </template>
                        </service-table>

                        <service-table
                            v-if="serviceMenu && (serviceMenu.faceWaxings.length + serviceMenu.bodyWaxings.length)"
                            title="WAX" :groups="[
                                { label: 'Face Waxings', rows: serviceMenu.faceWaxings },
                                { label: 'Body Waxings', rows: serviceMenu.bodyWaxings }
                            ]" />

                        <service-table v-if="serviceMenu && (serviceMenu.lashBrows.length + serviceMenu.tints.length)"
                            title="BROW & LASH" :groups="[
                                { label: 'Brow & Lash', rows: serviceMenu.lashBrows },
                                { label: 'Tints', rows: serviceMenu.tints }
                            ]" />

                        <service-table v-if="serviceMenu && serviceMenu.makeUps.length" title="MAKEUP"
                            :groups="[{ label: 'Makeup', rows: serviceMenu.makeUps }]" />
                    </section>

                    <section class="space-y-10">
                        <service-table v-if="serviceMenu && (
                            serviceMenu.manis.length +
                            serviceMenu.nailEnhances.length +
                            serviceMenu.maniAdds.length +
                            serviceMenu.pedis.length +
                            serviceMenu.pediAdds.length
                        )" title="NAIL" :groups="[
                            { label: 'Manicures', rows: serviceMenu.manis },
                            { label: 'Manicure Enhancements', rows: serviceMenu.nailEnhances },
                            { label: 'Manicure Add-Ons', rows: serviceMenu.maniAdds },
                            { label: 'Pedicures', rows: serviceMenu.pedis },
                            { label: 'Pedicure Add-ons', rows: serviceMenu.pediAdds }
                        ]" />

                        <service-table v-if="serviceMenu && (
                            serviceMenu.facials.length +
                            serviceMenu.facialBars.length +
                            serviceMenu.hydraFacials.length +
                            serviceMenu.microderms.length
                        )" title="ESTHETIC" :groups="[
                            { label: 'Facials', rows: serviceMenu.facials },
                            ...(serviceMenu.facialBars.length ? [{ label: 'Bar Facials', rows: serviceMenu.facialBars }] : []),
                            ...(serviceMenu.hydraFacials.length ? [{ label: 'HydraFacials', rows: serviceMenu.hydraFacials }] : []),
                            ...(serviceMenu.microderms.length ? [{ label: 'Peels + Treatments', rows: serviceMenu.microderms }] : [])
                        ]" />

                        <service-table v-if="serviceMenu && serviceMenu.massages.length" title="MASSAGE"
                            :groups="[{ label: 'Massages', rows: serviceMenu.massages }]" />
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal'
import { dataGlobal } from '~/composables/dataGlobal'
import { useKhsds } from '~/composables/useKhsds'

dataGlobal.sideBarVisible = false

const route = useRoute()
const { getWebBookServices } = useKhsds()

useHead({
    title: "Salon & Spa Service Prices Columbus OH | Kenneth's",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/service-menu'
        }
    ],
    meta: [
        {
            name: 'description',
            content: "Hair, nail, brow, wax, facial and massage prices at every Kenneth's location. Pick your salon to see its current service menu."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Salon & Spa Service Prices Columbus OH | Kenneth's"
        },
        {
            property: 'og:description',
            content: "Hair, nail, brow, wax, facial and massage prices at every Kenneth's location. Pick your salon to see its current service menu."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/service-menu'
        },
        {
            property: 'og:image',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            property: 'og:image:secure_url',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            property: 'og:image:type',
            content: 'image/webp'
        },
        {
            property: 'og:image:alt',
            content: "Kenneth's Hair Salons And Day Spas logo"
        },
        {
            property: 'og:site_name',
            content: "Kenneth's Hair Salons And Day Spas"
        },
        {
            property: 'og:locale',
            content: 'en_US'
        },

        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: "Salon & Spa Service Prices Columbus OH | Kenneth's"
        },
        {
            name: 'twitter:description',
            content: "Hair, nail, brow, wax, facial and massage prices at every Kenneth's location. Pick your salon to see its current service menu."
        },
        {
            name: 'twitter:image',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            name: 'twitter:image:alt',
            content: "Kenneth's Hair Salons And Day Spas logo"
        }
    ]
})

const state = reactive({ locationCode: 'AL' })

state.locationCode =
    typeof route.query.l === 'string' ? route.query.l.toUpperCase() : 'AL'

const menuUrl = `${appGlobal.apiBaseUrl}/khsds/WebBookServices/MENU/E/A/A/A/${state.locationCode}`
const { data: serviceMenu } = await useFetch(menuUrl)

const locationsUrl = `${appGlobal.apiBaseUrl}/khsds/Locations?ab=false&ao=false`
const { data: locations } = await useFetch(locationsUrl)

if (locations.value && !locations.value.some(l => l.locationCode === 'AL')) {
    locations.value.unshift({ locationCode: 'AL', extendedDescription: 'All Locations' })
}

async function locationChange() {
    serviceMenu.value = await getWebBookServices('AB', 'E', 'A', 'A', 'A', state.locationCode)
}
</script>
