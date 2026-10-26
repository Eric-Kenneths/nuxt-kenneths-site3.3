<template>
    <Dialog v-model:visible="dataGlobal.subTypePricingGridVisible" modal dismissableMask
        :header="dataGlobal.subTypePricingGridHeader" class="w-[95vw] !max-w-4xl bg-primary-100">
        <div class="overflow-x-auto">

            <div>
                Technician Pricing Reflects Years of Experience and Advanced Training
            </div>
            <table class="min-w-full border-collapse" role="table" aria-label="Service pricing table">
                <thead>
                    <tr>
                        <th></th>
                        <th colspan="6" class="px-1 text-center text-xs md:text-sm font-semibold text-p-primary-900">
                            Technician Levels
                        </th>
                    </tr>
                    <tr>
                        <th scope="col"
                            class="px-1 py-3 text-left text-xs md:text-sm font-semibold text-p-primary-900 sticky left-0 z-10">
                            Services
                        </th>

                        <th v-for="level in priceLevels" :key="level.key" scope="col"
                            class="px-1 py-3 text-center text-xs md:text-sm font-semibold text-p-primary-900 whitespace-nowrap">
                            {{ level.label }}
                        </th>
                    </tr>
                </thead>

                <tbody class="border-t border-l border-r border-primary-200">
                    <tr v-for="(service, index) in dataGlobal.subTypeServices" :key="index"
                        class="border-b border-primary-200">
                        <!-- Service column -->
                        <th scope="row"
                            class="px-1 py-3 text-xs md:text-sm font-medium text-primary-900 sticky left-0 border-r border-primary-200 text-left">
                            {{ service.serviceDescription }}
                        </th>

                        <!-- Price columns -->
                        <td v-for="level in priceLevels" :key="level.key"
                            class="px-1 py-3 text-center text-xs md:text-sm text-primary-900 border-r border-primary-200 last:border-r-0">
                            <span v-if="service[level.key]">
                                {{ formatPrice(service[level.key], service.isStartingAt) }}
                            </span>
                            <span v-else class="text-primary-400">—</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <pop-up-menu>
                    <template #trigger>
                        <div
                            class="hover:text-primary-500 text-2xl font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                            Book Now →</div>
                    </template>
                    <template #links>
                        <div class="sans-serif p-3">
                            <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                        </div>
                        <div class="sans-serif p-3">
                            <a class="text-xl link" href="/book/new/service-type">New Customer</a>
                        </div>
                    </template>
                </pop-up-menu>

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
