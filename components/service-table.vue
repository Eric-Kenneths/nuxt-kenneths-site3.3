<template>
    <section class="bg-primary-100 text-primary-900 border-0 sm:border sm:border-primary-500">
        <!-- Title -->
        <div class="px-0.5 sm:px-6 pt-6">
            <h3 class="text-2xl sm:text-3xl uppercase">
                {{ title }}
            </h3>
        </div>

        <!-- Table -->
        <div class="px-0.5 sm:px-6 pb-6 pt-4">
            <table class="w-full table-fixed border-collapse text-sm sm:text-base">
                <caption class="sr-only">{{ title }} services with level pricing</caption>

                <colgroup>
                    <col class="w-auto" />
                    <col v-for="lvl in displayedLevels" :key="`col-${lvl}`" class="w-[2.6rem] sm:w-12 lg:w-[3.4rem]" />
                </colgroup>

                <thead>
                    <tr>
                        <th></th>
                        <th :colspan="displayedLevels.length" class="font-bold uppercase text-left">
                            Level Pricing
                        </th>
                    </tr>

                    <!-- keep only this line on mobile -->
                    <tr class="border-t border-primary-500">
                        <th></th>
                        <th v-for="lvl in displayedLevels" :key="lvl" class="font-bold text-left">
                            {{ lvl }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(g, idx) in groups" :key="idx">
                        <tr class="border-t-0 sm:border-t sm:border-primary-500">
                            <th class="py-4 text-left font-bold uppercase">{{ g.label }}</th>
                            <td :colspan="displayedLevels.length">
                                <hr class="hidden sm:block border-primary-500" />
                            </td>
                        </tr>

                        <template v-for="svc in g.rows" :key="svc.serviceCode || svc.abDescription">
                            <tr class="border-t-0 sm:border-t sm:border-primary-900/15">
                                <th class="py-2 text-left font-normal">
                                    <button
                                        class="underline decoration-dotted underline-offset-4 focus:ring-2 focus:ring-primary-500"
                                        @click="toggleInline(svc)">
                                        {{ svc.abDescription }}
                                    </button>
                                </th>

                                <td v-for="lvl in displayedLevels" :key="lvl" class="py-2 tabular-nums">
                                    {{ svc[`price${lvl}`] }}<span v-if="svc.isStartPrice">+</span>
                                </td>
                            </tr>

                            <tr v-show="isOpen(svc)" class="border-t-0 sm:border-t sm:border-primary-900/15">
                                <td :colspan="displayedLevels.length + 1" class="py-3">
                                    <div class="border-0 sm:border sm:border-primary-500 px-4 py-3">
                                        {{ svc.webDescription || 'Description coming soon.' }}
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>

            <slot name="after" class="mt-6" />
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    title: String,
    groups: Array
})

const openServiceKey = ref('')

const keyOf = svc => svc?.serviceCode || svc?.abDescription || ''

const isOpen = svc => openServiceKey.value === keyOf(svc)

const toggleInline = svc => {
    const k = keyOf(svc)
    openServiceKey.value = openServiceKey.value === k ? '' : k
}

const displayedLevels = computed(() => {
    let max = 6
    for (const g of props.groups || []) {
        for (const svc of g.rows || []) {
            for (let i = 1; i <= 6; i++) {
                if (svc[`price${i}`]) max = Math.max(max, i)
            }
        }
    }
    return Array.from({ length: max }, (_, i) => i + 1)
})
</script>
