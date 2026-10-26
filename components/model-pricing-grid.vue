<template>
    <Dialog v-model:visible="dataGlobal.modelPricingVisible" modal header="MODEL PRICING" dismissableMask
        class="w-[98vw] md:w-[50vw] max-w-4xl bg-primary-100">
        <div class="overflow-x-auto">
            <div class="p-0 lg:p-5">
                <div class="bg-white p-0 lg:p-2">
                    <table class="w-full border-collapse bg-white text-sm sm:text-base"
                        aria-label="Hair Cuts, Styles, Highlighting, Treatments, Smoothing/Perms, and Extensions">
                        <tbody>
                            <tr>
                                <td class="w-1/2 px-3 py-2 font-bold"></td>
                                <th colspan="3" class="px-3 py-2 text-center text-xl font-bold">
                                    Phase Pricing
                                </th>
                            </tr>

                            <tr>
                                <td class="w-1/2 px-3 py-2 font-bold uppercase"></td>
                                <th aria-label="Hair Services Level 1 Pricing"
                                    class="w-1/6 px-3 py-2 text-center font-bold">
                                    1
                                </th>
                                <th aria-label="Hair Services Level 2 Pricing"
                                    class="w-1/6 px-3 py-2 text-center font-bold">
                                    2
                                </th>
                                <th aria-label="Hair Services Level 3 Pricing"
                                    class="w-1/6 px-3 py-2 text-center font-bold">
                                    3
                                </th>
                            </tr>

                            <tr>
                                <th scope="row" class="px-3 py-3 text-left font-bold uppercase">
                                    Cuts And Styles
                                </th>
                                <th scope="row" colspan="5" class="px-3 py-3 text-center font-bold"
                                    aria-label="Cuts and Styles Price Levels">
                                    <hr class="border-gray-300" />
                                </th>
                            </tr>

                            <tr v-for="(service, id) in dataGlobal.modelPricingServices.cuts" :key="id"
                                class="text-xs sm:text-sm">
                                <th scope="row" class="px-3 py-2 text-left font-normal">
                                    <span class="cursor-pointer underline-offset-2 hover:underline"
                                        @click="toggle(service)">
                                        {{ service.abDescription }}
                                    </span>
                                </th>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price1 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price2 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price3 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4" class="py-4 text-center">&nbsp;</td>
                            </tr>

                            <tr>
                                <th scope="row" class="px-3 py-3 text-left font-bold uppercase">
                                    Color
                                </th>
                                <th scope="row" colspan="3" class="px-3 py-3" aria-label="Color Price Levels"></th>
                            </tr>

                            <tr v-for="(service, id) in dataGlobal.modelPricingServices.colors" :key="id"
                                class="text-xs sm:text-sm">
                                <th scope="row" class="px-3 py-2 text-left font-normal">
                                    <span class="cursor-pointer underline-offset-2 hover:underline"
                                        @click="toggle(service)">
                                        {{ service.abDescription }}
                                    </span>
                                </th>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price1 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price2 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price3 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4" class="py-4 text-center">&nbsp;</td>
                            </tr>

                            <tr>
                                <th scope="row" class="px-3 py-3 text-left font-bold uppercase">
                                    Highlighting
                                </th>
                                <th scope="row" colspan="3" class="px-3 py-3" aria-label="Highlighting Price Levels">
                                </th>
                            </tr>

                            <tr v-for="(service, id) in dataGlobal.modelPricingServices.weaves" :key="id"
                                class="text-xs sm:text-sm">
                                <th scope="row" class="px-3 py-2 text-left font-normal">
                                    <span class="cursor-pointer underline-offset-2 hover:underline"
                                        @click="toggle(service)">
                                        {{ service.abDescription }}
                                    </span>
                                </th>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price1 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price2 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price3 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4" class="py-4 text-center">&nbsp;</td>
                            </tr>

                            <tr>
                                <th scope="row" class="px-3 py-3 text-left font-bold uppercase">
                                    Smoothing/Perm
                                </th>
                                <th scope="row" colspan="3" class="px-3 py-3" aria-label="Smoothing/Perm"></th>
                            </tr>

                            <tr v-for="(service, id) in dataGlobal.modelPricingServices.perms" :key="id"
                                class="text-xs sm:text-sm">
                                <th scope="row" class="px-3 py-2 text-left font-normal">
                                    <span class="cursor-pointer underline-offset-2 hover:underline"
                                        @click="toggle(service)">
                                        {{ service.abDescription }}
                                    </span>
                                </th>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price1 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price2 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                                <td class="px-3 py-2 text-center">
                                    {{ service.price3 }}<span v-show="service.isStartPrice">+</span>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4" class="py-4 text-center">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from '@/volt/Dialog';
import { dataGlobal } from '~/composables/dataGlobal'

const priceLevels = [
    { key: 'price1', label: '1' },
    { key: 'price2', label: '2' },
    { key: 'price3', label: '3' },
    { key: 'price4', label: '4' },
    { key: 'price5', label: '5' },
    { key: 'price6', label: '6' },
]

/**
 * Formats price and appends "+" when isStartingAt is true
 */
const formatPrice = (price, isStartingAt) => {
    return `$${price}${isStartingAt ? '+' : ''}`
}

/**
 * Expose open/close methods to parent
 */
defineExpose({
    open: () => (dataGlobal.subTypePricingGridVisible = true),
    close: () => (dataGlobal.subTypePricingGridVisible = false),
})
</script>
