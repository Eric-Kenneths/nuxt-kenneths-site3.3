<template>
    <section class="bg-primary-500 text-primary-900 h-25 relative -mb-1">
    </section>

    <section class="bg-primary-500 text-primary-900 pt-12 pb-5 relative">
        <div class="grid mx-auto">
            <!-- Row 1 -->
            <div class="text-center">
                <h2 class="text-3xl md:text-4xl uppercase">
                    Thank your for your order
                </h2>
            </div>
        </div>
    </section>

    <section class="bg-primary-100 text-primary-900 py-5 relative px-1 pb-20">
        <div class="w-full flex justify-center">
            <h3>
                A confirmation has been sent to your email address.
            </h3>
        </div>
        <div class="mt-5 max-w-2xl mx-auto">
            Gift Card(s)
        </div>
        <div class="max-w-2xl mx-auto">
            <div v-for="(gc, id) in state.webOrderGcs" :key="id"
                class="grid text-sm md:text-base [grid-template-columns:40%_30%_20%_10%] pl-1 pr-4 py-2 my-1 items-center border border-gray-400 rounded-lg py-1 ">
                <div class="flex items-center">
                    {{ gc.typeDescription }}
                </div>
                <div>
                    To: {{ gc.gcTo }}
                </div>
                <div>
                    <span v-if="gc.deliveryMethod == 'E'">
                        <a target="_blank" :href="gc.giftCardImageUrl" class="text-blue-500 underline">Print</a>
                    </span>
                    <span v-if="gc.deliveryMethod == 'P'">
                        Pick Up
                    </span>
                    <span v-if="gc.deliveryMethod == 'M'">
                        US Mail
                    </span>
                </div>
                <div>{{ filterCurrency(gc.orderTotal) }}</div>

            </div>
        </div>
        <div class="mt-5 max-w-2xl mx-auto text-right pr-6">
            Order Total: {{ filterCurrency(state.orderTotal) }}
        </div>
    </section>
</template>

<script setup>
import { giftCardGlobal } from '~/composables/giftCardGlobal';
const { getConfirmationWebOrderGCCartId } = useLocalStorage();

const { filterCurrency } = useFilters();

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }
    ]
})

const state = reactive({
    webOrderGcs: [],
    orderTotal: 0
})

let webOrderGCId = await getConfirmationWebOrderGCCartId();

if (webOrderGCId === 0) {
    window.location.replace('/');
}

let orderSummary = await giftCardGlobal.returnCart(webOrderGCId);

state.webOrderGcs = orderSummary.webOrderGcs;
state.orderTotal = orderSummary.orderTotal;

</script>

<style lang="scss" scoped></style>