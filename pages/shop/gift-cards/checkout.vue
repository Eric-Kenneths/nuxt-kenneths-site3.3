<template>
    <section class="bg-primary-500 text-primary-900 h-25 relative -mb-1">
    </section>

    <div v-if="state.step === 'check-out'">
        <section class="bg-primary-500 text-primary-900 pt-12 pb-5 relative">
            <gift-card-cart-icon class="mr-2" />
            <div class="grid mx-auto">
                <!-- Row 1 -->
                <div class="text-center">
                    <h2 class="text-3xl md:text-4xl uppercase">
                        Gift Card Checkout
                    </h2>
                </div>
            </div>
        </section>

        <section class="bg-primary-100 text-primary-900 py-5 relative px-2">
            <div class="w-full flex justify-center caret-black">

                <section class="space-y-3 w-fit text-left pl-2">
                    <div class="uppercase font-bold">
                        Payment Total {{ filterCurrency(giftCardGlobal.orderTotal) }}
                    </div>
                    <div class="mt-3">
                        Payment Information
                    </div>
                    <div>
                        <InputText v-model="giftCardGlobal.checkOut.cardHolderName" placeholder="Card Holder Name"
                            maxlength="30" class="w-90" aria-label="Card Holder Name" />
                    </div>
                    <div>
                        <Select v-model="giftCardGlobal.checkOut.creditCardType" :options="state.creditCardTypes"
                            optionLabel="description" optionValue="creditCardType" placeholder="Credit Card Type"
                            class="w-60 bg-white !rounded" />
                    </div>
                    <div>
                        <!-- <label for="expMonth" class="block text-sm font-medium text-primary-900 mb-1">
                                Card Number
                            </label> -->
                        <InputText v-model="giftCardGlobal.checkOut.cardNumber" placeholder="Card Number" maxlength="16"
                            class="w-xs" aria-label="Card Number" />
                    </div>
                    <div>
                        <label for="expiration" class="block text-sm font-medium text-primary-900 ">
                            Expiration (Month/Year)
                        </label>
                        <InputMask id="expiration" v-model="giftCardGlobal.checkOut.expiration" mask="99/99"
                            placeholder="MM/YY" class="w-20" />
                    </div>
                    <div>
                        <InputText v-model="giftCardGlobal.checkOut.ccv" placeholder="CCV" maxlength="4" class="w-20"
                            aria-label="CCV" />
                    </div>
                    <div>
                        <InputText v-model="giftCardGlobal.checkOut.zipCode" placeholder="Zip Code" maxlength="5"
                            class="w-40" aria-label="Zip Code" />
                    </div>
                    <div>
                        <label for="phone" class="block text-sm font-medium text-primary-900">
                            Mobile Phone for verification text
                        </label>
                        <InputMask id="phone" v-model="giftCardGlobal.checkOut.phone" mask="(999) 999-9999"
                            placeholder="(999) 999-9999" class="w-40" aria-label="Phone" />
                    </div>
                    <div>
                        <InputText v-model="giftCardGlobal.checkOut.email" placeholder="Email" maxlength="100"
                            class="w-xs" aria-label="Email" />
                    </div>
                    <div>
                        <InputText v-model="giftCardGlobal.checkOut.verifyEmail" placeholder="Verify Email"
                            maxlength="100" class="w-xs" aria-label="Verify Email" />
                    </div>
                    <div>
                        <Select v-model="giftCardGlobal.checkOut.marketingSourceId" :options="state.marketingSources"
                            optionLabel="sourceDescription" optionValue="marketingSourceId"
                            placeholder="How did you hear about us?" class="w-80 bg-white !rounded" />
                    </div>
                    <div v-if="giftCardGlobal.checkOut.isCurbSide" class="mt-3 bg-primary-200 p-3 rounded-lg">
                        <div class="font-bold">Curbside Pick Up Info</div>
                        <div class="max-w-sm text-sm">You have chose to curbside pickup from,</div>
                        <div class="max-w-sm text-sm font-bold mt-2">{{ giftCardGlobal.checkOut.curbSideLocation }}
                        </div>
                        <div class="max-w-sm text-sm">{{ giftCardGlobal.checkOut.curbSideAddress }}</div>
                        <div class="max-w-sm text-sm">{{ giftCardGlobal.checkOut.curbSideCityStateZip }}</div>
                        <div class="max-w-sm text-sm mt-2">For same day pick up, orders must be placed by 6pm Mon-Fri
                            and 3pm Sat. Orders may be picked up between 9am and 7pm Mon-Fri, 9am and 4pm Sat. Excludes
                            Sundays.</div>

                        <div class="mt-2">
                            <InputText v-model="giftCardGlobal.checkOut.cardHolderName" placeholder="Car Description"
                                maxlength="30" class="w-90" aria-label="Car Description" />
                        </div>

                        <div class="mt-2">
                            <InputMask id="phone" v-model="giftCardGlobal.checkOut.cellPhone" mask="(999) 999-9999"
                                placeholder="Cell Phone" class="w-40" aria-label="Cell Phone" />
                        </div>
                        <div class="max-w-sm text-sm mt-1">
                            (We will text when your gift card is ready)
                        </div>
                    </div>

                    <div class="mt-3">
                        <div class="max-w-sm text-xs">
                            Note: You may see a $1 authorization on your credit card billing statement. This is done
                            before charging your card to match billing information for security purposes. The $1
                            authorization will not be charged to your card and will drop off your statement within 5 to
                            10 days.
                        </div>
                    </div>

                    <div v-if="state.errorMessage !== ''" v-html="state.errorMessage"
                        class="text-base text-red-500 font-bold">

                    </div>

                    <div class="text-center w-full max-w-2xl mx-auto pt-5 grid grid-cols-2">
                        <div>
                            <Button class="w-45 bg-primary-500" @click="router.push('/shop/gift-cards/cart')">Back to
                                Cart</Button>
                        </div>
                        <div>
                            <Button class="w-45 bg-primary-500" :disabled="state.isSubmitting"
                                :aria-disabled="state.isSubmitting" @click="submitOrder">{{ state.isSubmitting ?
                                    'Processing...' : 'Submit Order' }}</Button>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <div v-else>
        <section class="bg-primary-100 text-primary-900 pt-12 pb-5 relative">
            <div class="grid mx-auto">
                <!-- Row 1 -->
                <div class="text-center">
                    <h2 class="text-2xl md:text-3xl uppercase">
                        Order was not completed<br />
                        Credit Card Processing Problem
                    </h2>
                </div>
            </div>
        </section>

        <section class="bg-primary-100 text-primary-900 py-5 relative px-2 pb-20">
            <div class="w-full flex justify-center">
                <div class="max-w-sm">
                    <p>{{ state.notAuthorizedReasonText }}</p>
                </div>
            </div>

            <div class="w-full flex justify-center mt-5">
                <div class="max-w-sm">
                    <p>Please check your information and try again</p>
                </div>
            </div>

            <div class="text-center w-full max-w-2xl mx-auto pt-5 grid grid-cols-2 mt-5">
                <div>
                    <Button class="w-45 bg-primary-500" @click="state.step = 'check-out'">Try Again</Button>
                </div>
                <div>
                    <Button class="w-45 bg-primary-500" @click="clearOrder">Cancel Order</Button>
                </div>
            </div>
        </section>
    </div>

    <verify-form :mobile-number="giftCardGlobal.checkOut.phone" @didVerify="didVerify" show-login="false"
        return-code-only="true"
        message="To complete your gift card purchase, please enter your mobile phone number and we will send you a text verification code." />
</template>

<script setup>
import { giftCardGlobal } from '~/composables/giftCardGlobal'
import { accountGlobal } from '~/composables/accountGlobal'

import InputText from '@/volt/InputText.vue'
import InputMask from '@/volt/InputMask.vue'
import Select from '@/volt/Select.vue'
import Button from '@/volt/Button.vue'

const { filterCurrency } = useFilters()
const router = useRouter()

const { getMarketingSources } = useKhsds()

const {
    getWebOrderGCCartId,
    setConfirmationWebOrderGCCartId
} = useLocalStorage()

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots'
        }
    ]
})

const state = reactive({
    step: 'check-out',
    stateList: [],
    marketingSources: [],
    isSubmitting: false,

    // Can also be sent to the API as an idempotency key if supported.
    submitToken: crypto.randomUUID(),

    error: {
        showError: false,
        zipCode: false,
        cellPhone: false,
        shippingName: false,
        shippingAddress: false,
        shippingAddressText: '',
        shippingCity: false,
        pickUpLocationCode: false,
        carDescription: false
    },

    errorMessage: '',

    creditCardTypes: [
        {
            creditCardType: 'V',
            description: 'Visa'
        },
        {
            creditCardType: 'M',
            description: 'Mastercard'
        },
        {
            creditCardType: 'D',
            description: 'Discover'
        },
        {
            creditCardType: 'A',
            description: 'American Express'
        }
    ],

    notAuthorizedReasonText: ''
})

await giftCardGlobal.getCart()

state.marketingSources = await getMarketingSources(2)

function validate() {
    state.errorMessage = ''

    if (giftCardGlobal.checkOut.cardHolderName === '') {
        state.errorMessage +=
            'Card Holder Name cannot be empty<br/>'
    }

    if (giftCardGlobal.checkOut.creditCardType === '') {
        state.errorMessage +=
            'Please select a Credit Card Type<br/>'
    }

    if (giftCardGlobal.checkOut.cardNumber === '') {
        state.errorMessage +=
            'Card Number cannot be empty<br/>'
    }

    if (giftCardGlobal.checkOut.expiration.length !== 5) {
        state.errorMessage +=
            'Please enter credit card expiration<br/>'
    }

    if (giftCardGlobal.checkOut.ccv === '') {
        state.errorMessage +=
            'CCV cannot be empty<br/>'
    }

    if (giftCardGlobal.checkOut.zipCode.length !== 5) {
        state.errorMessage +=
            'Please enter Zip Code<br/>'
    }

    if (giftCardGlobal.checkOut.phone.length !== 14) {
        state.errorMessage +=
            'Please enter Phone<br/>'
    }

    if (giftCardGlobal.checkOut.email === '') {
        state.errorMessage +=
            'Email cannot be empty<br/>'
    }

    if (
        giftCardGlobal.checkOut.email !==
        giftCardGlobal.checkOut.verifyEmail
    ) {
        state.errorMessage +=
            'Emails do not match<br/>'
    }

    if (giftCardGlobal.checkOut.marketingSourceId === 0) {
        state.errorMessage +=
            'Please select "How did you hear about us?"<br/>'
    }

    if (giftCardGlobal.checkOut.isCurbSide === true) {
        if (giftCardGlobal.checkOut.carDescription === '') {
            state.errorMessage +=
                'Curbside Car Description cannot be empty<br/>'
        }

        if (giftCardGlobal.checkOut.cellPhone.length !== 10) {
            state.errorMessage +=
                'Please enter Curbside Cell Phone<br/>'
        }
    }

    return state.errorMessage.length === 0
}

function didVerify(verified) {
    state.errorMessage = ''

    if (verified) {
        finishSubmitOrder()
        return
    }

    state.errorMessage =
        'Verification Failed. Please try again.'

    state.isSubmitting = false
}

async function submitOrder() {
    if (state.isSubmitting) return

    if (validate() === false) {
        return
    }

    /*
     * On the first attempt, submit without verification.
     * If a previous attempt exists, require verification.
     */
    const attemptStatus =
        await giftCardGlobal.getPaymentAttemptExists()

    if (attemptStatus === 'E') {
        state.errorMessage =
            'Unable to submit your order right now. Please try again.'

        return
    }

    if (attemptStatus === 'N') {
        await finishSubmitOrder()
        return
    }

    accountGlobal.showVerify = true
}

async function finishSubmitOrder() {
    if (state.isSubmitting) return

    state.isSubmitting = true
    state.errorMessage = ''

    try {
        if (accountGlobal.mobilePhone !== '') {
            // Ensure the verified phone number is used.
            giftCardGlobal.checkOut.phone =
                accountGlobal.mobilePhone
        }

        const webOrderGCReturnParams =
            await giftCardGlobal.putWebOrderGCPurchase()

        if (webOrderGCReturnParams.hasError === true) {
            giftCardGlobal.hadFailedCheckout = true
            state.step = 'not-authorized'

            state.notAuthorizedReasonText =
                webOrderGCReturnParams.errorMessage

            window.scrollTo(0, 0)

            // Allow another authorization attempt.
            state.isSubmitting = false
            return
        }

        /*
         * Capture the successful gift-card cart/order ID before
         * clearing the order.
         */
        const giftCardOrderId =
            String(await getWebOrderGCCartId())

        const giftCardValue =
            Number(giftCardGlobal.orderTotal) || 0

        await setConfirmationWebOrderGCCartId(
            giftCardOrderId
        )

        /*
         * ACMH - Amazon confirmed gift-card purchase
         * Sent to Google Tag Manager through dataLayer.
         *
         * GTM custom event trigger:
         * gift_card_purchase_complete
         *
         * Amazon Advertising event:
         * Off-Amazon Purchases
         */
        try {
            const hasValidOrderId =
                giftCardOrderId !== '' &&
                giftCardOrderId !== '0' &&
                giftCardOrderId !== 'undefined' &&
                giftCardOrderId !== 'null'

            if (hasValidOrderId) {
                const amazonDedupeKey =
                    `amazon-gift-card-purchase-${giftCardOrderId}`

                if (
                    sessionStorage.getItem(
                        amazonDedupeKey
                    ) !== 'sent'
                ) {
                    window.dataLayer =
                        window.dataLayer || []

                    window.dataLayer.push({
                        event:
                            'gift_card_purchase_complete',

                        transaction_id:
                            giftCardOrderId,

                        clientDedupeId:
                            giftCardOrderId,

                        value:
                            giftCardValue,

                        currencyCode:
                            'USD',

                        productCategory:
                            'Gift Card'
                    })

                    sessionStorage.setItem(
                        amazonDedupeKey,
                        'sent'
                    )
                }
            }
        } catch (error) {
            /*
             * Marketing tracking must never prevent the
             * customer from reaching the confirmation page.
             */
            console.error(
                'Amazon gift card purchase tracking failed:',
                error
            )
        }

        /*
         * Clear the order only after all required confirmation
         * values have been preserved.
         */
        giftCardGlobal.clearOrder()

        await router.push(
            '/shop/gift-cards/confirmation'
        )
    } catch (error) {
        console.error(
            'Gift card order submission failed:',
            error
        )

        state.errorMessage =
            'Unable to submit your order right now. Please try again.'

        state.isSubmitting = false
    }
}

async function clearOrder() {
    if (state.isSubmitting) return

    giftCardGlobal.clearOrder()
    window.location.replace('/')
}
</script>

<style scoped></style>