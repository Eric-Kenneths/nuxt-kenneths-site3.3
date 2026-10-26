<template>
    <section v-if="state.error" class="max-w-[650px] border text-lg ml-0 md:ml-5 p-8 text-center">
        <p>We couldn't find that gift certificate.</p>
        <p class="text-sm mt-3">Please double-check the link, or call 614.538.5800 for help.</p>
    </section>

    <section v-else class="max-w-[650px] border text-lg ml-0 md:ml-5">
        <div class="grid [grid-template-columns:70%_30%] border-b">
            <div class="text-center h-full flex flex-col text-5xl md:text-6xl">
                <div class="flex-1 flex items-end justify-center italic">
                    <div>Gift</div>
                </div>
                <div class="flex-1 flex items-start justify-center italic">
                    <div>Certificate</div>
                </div>
            </div>

            <div class="px-7 py-3">
                <img class="w-full" src="/images/icons/logo-dark-medium.webp" />
            </div>
        </div>

        <div class="text-center mt-5">
            To: {{ state.webOrderGc.gcTo }}
        </div>

        <div class="text-center">
            From: {{ state.webOrderGc.gcFrom }}
        </div>

        <div v-if="state.webOrderGc.message1 !== ''" class="text-center mt-5 font-bold">
            <div class="max-w-[500px]  m-auto">
                {{ state.webOrderGc.message1 }}
            </div>
        </div>
        <div v-if="state.webOrderGc.message2 !== ''" class="text-center font-bold">
            <div class="max-w-[500px]  m-auto">
                {{ state.webOrderGc.message2 }}
            </div>
        </div>
        <div v-if="state.webOrderGc.message3 !== ''" class="text-center font-bold">
            <div class="max-w-[500px]  m-auto">
                {{ state.webOrderGc.message3 }}
            </div>
        </div>

        <div class="mt-5">
            <div v-for="(gc, id) in state.giftCardDescriptions" :key="id">
                <div class="text-center" v-html="gc.description">
                </div>
            </div>
        </div>


        <div v-if="state.webOrderGc.tipTotal > 0" class="text-center mt-5 italic text-sm">
            Gratuity is included
        </div>
        <div v-else class="text-center mt-5 italic  text-sm">
            Gratuity is not included
        </div>

        <div class="text-center mt-5">
            To schedule an appointment visit Kenneths.com or call 614.538.5800
        </div>

        <div class="grid grid-cols-2 grid-rows-2 border-t text-sm md:text-base mt-5">
            <div class="p-3">Issue Date: <span class="font-bold">{{ filterDateTimeToDate(state.webOrderGc.issueDate)
                    }}</span></div>
            <div class="p-3">Security Code: <span class="font-bold">{{ state.webOrderGc.securityCode }}</span></div>
            <div class="p-3">Certificate: <span class="font-bold">{{ state.webOrderGc.gice }}</span></div>
            <div class="p-3">Indentity: <span class="font-bold">{{ state.webOrderGc.printName }}</span></div>
        </div>

    </section>

    <section v-if="!state.error" class="max-w-[650px] mt-5 text-xs ml-5">
        <div class="text-center mt-5">
            Terms and Conditions
        </div>
        <div class="text-left mt-2">
            This Kenneth's Printable Gift Certificate may be used at all Kenneth's locations as payment for services and
            products. It is not transferable or refundable. If this Gift Certificate is copied or modified in any way it
            will immediately be VOID. To protect against duplication and unauthorized use, <b>recipients of Printable
                Gift Certifiates are required to present identification that matches the name on the Certificate.</b> If
            proper identity cannot be established, the Certificate will be placed on hold until the actual owner of the
            Certificate provides Kenneth's with proof of ownership.
        </div>
        <div class="text-left mt-2">
            The Printable Certificate expires 5 years from the date of purchase. No inactivity fee will be charged
            during the first twenty-four months. An inactivity fee of $5 per month will be deducted following any period
            of twelve months of inactivity. This fee will be deducted from the remaining balance until the Certificate
            is used or the Certificate no longer has value. Card balances of $5 or less may be redeemed for cash. For
            inactivity fee information call 614.538.5800.
        </div>
    </section>
</template>

<script setup>
import { giftCardGlobal } from '~/composables/giftCardGlobal';

const route = useRoute();

const { filterDateTimeToDate } = useFilters();

definePageMeta({
    layout: 'blank'
})

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }

    ]
})


///Gift-Certificate/gcprint.aspx?SC=N7R95734Q

const state = reactive({
    webOrderGc: {},
    giftCardDescriptions: [],
    error: false
})

// Legacy GCPrint.aspx links used an uppercase SC param; accept either case.
let secCode = route.query.sc ?? route.query.SC;

if (secCode) {
    secCode = secCode.toUpperCase();

    try {
        const giftCardSummary = await giftCardGlobal.getWebOrderGCBySecurityCode(secCode);

        if (giftCardSummary?.webOrderGc?.gice) {
            state.webOrderGc = giftCardSummary.webOrderGc;
            state.giftCardDescriptions = giftCardSummary.giftCardDescriptions;
        } else {
            state.error = true;
        }
    } catch (e) {
        state.error = true;
    }
} else {
    state.error = true;
}

</script>

<style lang="scss" scoped></style>