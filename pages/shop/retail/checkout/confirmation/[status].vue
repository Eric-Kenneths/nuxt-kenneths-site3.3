<template>
    <div class="relative flex h-[10vmin] w-full items-center justify-center overflow-hidden mb-5"></div>
    <GoldLine />

    <div class="min-h-screen bg-primary-100 text-primary-900 caret-black">
        <div class="mx-auto w-full max-w-6xl px-4 py-10 lg:py-16">
            <div class="flex items-center justify-center space-x-6 pt-3 pb-3 lg:pt-5 lg:pb-5">
                <h1 class="text-4xl lg:text-6xl font-thin uppercase text-primary-900">
                    Confirmation
                </h1>
            </div>

            <!-- SUCCESS -->
            <div v-if="status === 'delivery' || status === 'pickup'" class="space-y-8">
                <section
                    class="border border-primary-900 bg-primary-100 px-5 py-8 lg:px-10 lg:py-10 shadow-sm text-center">
                    <h2 class="text-2xl lg:text-4xl font-thin uppercase mb-4">
                        Thank You For Your Order
                    </h2>

                    <p class="text-base lg:text-xl font-semibold uppercase">
                        Confirmation Number: {{ state.confirmationNumber }}
                    </p>
                </section>

                <div class="grid gap-8 lg:grid-cols-12">
                    <!-- ORDER ITEMS -->
                    <div class="lg:col-span-8">
                        <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                            <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-6">
                                Your Items
                            </h2>

                            <div v-for="(item, id) in state.items" :key="id"
                                class="py-4 border-b border-primary-900/30 last:border-b-0">
                                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                                    <div class="w-full sm:w-32 lg:w-36 flex-shrink-0 flex items-center justify-center">
                                        <img :src="retailGlobal.getItemImage(item.urlRouteName)" :alt="item.webName"
                                            class="h-48 w-full object-contain sm:h-40 lg:h-48" />
                                    </div>

                                    <div class="flex-1 w-full">
                                        <div class="flex justify-between items-start gap-4">
                                            <div>
                                                <div class="text-sm font-semibold">
                                                    {{ item.brand }}
                                                </div>

                                                <div class="text-base lg:text-lg font-bold leading-snug">
                                                    {{ item.webName }}
                                                </div>

                                                <div v-if="item.measure !== ''" class="text-sm mt-1 opacity-80">
                                                    {{ item.size }}{{ item.measure }}
                                                </div>
                                            </div>

                                            <div class="text-sm lg:text-base font-semibold text-right">
                                                Quantity: {{ item.quantity }}
                                            </div>
                                        </div>

                                        <div class="mt-4 text-lg font-semibold">
                                            {{ filterCurrency(item.price) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- ORDER SUMMARY -->
                    <div class="lg:col-span-4">
                        <section
                            class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-8 lg:py-8 shadow-sm lg:sticky lg:top-32">
                            <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-4">
                                Order Summary
                            </h2>

                            <RetailTotal />
                        </section>
                    </div>
                </div>

                <!-- DELIVERY MESSAGE -->
                <section v-if="status === 'delivery'"
                    class="border border-primary-900 bg-primary-100 px-5 py-8 lg:px-10 lg:py-10 shadow-sm text-center">
                    <h3 class="text-xl lg:text-2xl font-semibold uppercase mb-4">
                        Your Order Will Be Delivered To
                    </h3>

                    <div class="space-y-2 text-base lg:text-xl">
                        <p>{{ retailGlobal.webOrderRetailCart.shippingName }}</p>
                        <p>{{ retailGlobal.webOrderRetailCart.shippingAddress }}</p>
                        <p>
                            {{ retailGlobal.webOrderRetailCart.shippingCity }},
                            {{ retailGlobal.webOrderRetailCart.shippingState }}
                            {{ retailGlobal.webOrderRetailCart.shippingZipCode }}
                        </p>
                    </div>
                </section>

                <!-- PICKUP MESSAGE -->
                <section v-if="status === 'pickup'"
                    class="border border-primary-900 bg-primary-100 px-5 py-8 lg:px-10 lg:py-10 shadow-sm text-center">
                    <h3 class="text-xl lg:text-2xl font-semibold uppercase mb-4">
                        Pickup Information
                    </h3>

                    <div class="space-y-3 text-base lg:text-xl">
                        <p>We will notify you via text and email when your order is ready for pickup.</p>
                        <p class="text-red-600 font-semibold">
                            We will hold your order for 7 days from fulfillment.
                        </p>
                    </div>

                    <div class="mt-6 space-y-2 text-base lg:text-xl">
                        <p class="font-semibold uppercase">Pickup Location</p>
                        <p>{{ state.location.extendedDescription }}</p>
                        <p>{{ state.location.address }}</p>
                        <p>{{ state.location.cityState }}</p>
                    </div>

                    <div class="mt-6 space-y-2 text-sm lg:text-lg">
                        <p>
                            Order Time:
                            {{ filterDisplayFormattedDateTime(state.pickupInfo.orderDatetime) }}
                        </p>
                        <p>
                            For same day pick up, orders must be placed by 6:00pm Monday - Friday and
                            3:00pm on Saturday.
                        </p>
                    </div>
                </section>

                <!-- DONE BUTTON -->
                <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                    <div class="flex justify-center">
                        <button type="button"
                            class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold uppercase hover:bg-primary-500 transition"
                            @click="finish">
                            Continue Shopping
                        </button>
                    </div>
                </section>
            </div>

            <!-- ERROR -->
            <div v-else-if="status === 'error'" class="space-y-8">
                <section
                    class="border border-primary-900 bg-primary-100 px-5 py-8 lg:px-10 lg:py-10 shadow-sm text-center">
                    <h2 class="text-2xl lg:text-4xl font-thin uppercase mb-4">
                        Order Could Not Be Completed
                    </h2>

                    <p class="text-base lg:text-xl font-semibold mb-3">
                        <!-- {{ retailGlobal.webRetailSession.responseMessage }} -->
                        Credit Card Processing Error. Please check your information and try again.
                    </p>

                    <p class="text-base lg:text-lg mb-2">
                        Please check your information and try again.
                    </p>

                    <p class="text-sm lg:text-base uppercase">
                        Reference Number: {{ retailGlobal.webOrderRetailCart.confirmationNumber }}
                    </p>
                </section>

                <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                    <div class="flex flex-col sm:flex-row justify-between gap-3">
                        <Button label="Try Another Card"
                            class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-100 border border-primary-900 text-primary-900 text-sm font-semibold uppercase hover:bg-primary-emphasis transition"
                            @click="tryAnother" />

                        <Button label="Done"
                            class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold uppercase hover:bg-primary-500 transition"
                            @click="finish" />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '@/volt/Button'

import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

dataGlobal.sideBarVisible = false

const router = useRouter()
const { filterCurrency, filterDisplayFormattedDateTime } = useFilters()
const { gtag } = useGtag()
const { status } = useRoute().params

useHead({
    title: "Confirmation | Cart | Kenneth's Salons and Day Spas",
    meta: [
        {
            name: 'description',
            content: 'Enjoy your products!'
        },
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots'
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Confirmation | Cart | Kenneth's Salons and Day Spas"
        },
        {
            property: 'og:description',
            content: 'Enjoy your products!'
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/shop/retail/confirmation'
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
            content: "Confirmation | Cart | Kenneth's Salons and Day Spas"
        },
        {
            name: 'twitter:description',
            content: 'Enjoy your products!'
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

const state = reactive({
    items: [],
    pickupInfo: {},
    location: {},
    confirmationNumber: ''
})

onMounted(async () => {
    window.scrollTo(0, 0)

    const orderId = Number(
        retailGlobal.webOrderRetailCart.webOrderRetailCartId
    )

    // A successful confirmation requires a valid order ID.
    if (!Number.isFinite(orderId) || orderId <= 0) {
        router.push('/')
        return
    }

    retailGlobal.menuVisible = false

    if (status !== 'error') {
        const orderValue = Number(
            retailGlobal.webOrderRetailCart.total
        ) || 0

        const unitsSold = retailGlobal.cart.items.reduce(
            (total, item) => total + (Number(item.quantity) || 0),
            0
        )

        /*
         * Google Analytics retail purchase event
         */
        try {
            gtag('event', 'retail_purchase', {
                app_name: 'WebRetail',
                screen_name: 'Confirmation',
                transaction_id: orderId.toString(),
                currency: 'USD',
                value: orderValue
            })
        } catch (error) {
            console.error(
                'Google retail purchase tracking failed:',
                error
            )
        }

        /*
         * WCMH - Amazon confirmed retail purchase
         * Sent to Google Tag Manager through dataLayer.
         *
         * GTM custom event trigger:
         * retail_purchase_complete
         *
         * Amazon Advertising event:
         * Off-Amazon Purchases
         */
        try {
            const amazonDedupeKey =
                `amazon-retail-purchase-${orderId}`

            if (
                sessionStorage.getItem(amazonDedupeKey) !== 'sent'
            ) {
                window.dataLayer = window.dataLayer || []

                window.dataLayer.push({
                    event: 'retail_purchase_complete',
                    transaction_id: orderId.toString(),
                    clientDedupeId: orderId.toString(),
                    value: orderValue,
                    currencyCode: 'USD',
                    unitsSold
                })

                sessionStorage.setItem(
                    amazonDedupeKey,
                    'sent'
                )
            }
        } catch (error) {
            console.error(
                'Amazon retail purchase tracking failed:',
                error
            )
        }

        /*
         * Existing Kenneth's marketing conversion
         */
        try {
            if (
                dataGlobal.marketingTracking.webMarketingDtId !== 0
            ) {
                await putMarketingConversion(
                    dataGlobal.marketingTracking.webMarketingDtId,
                    orderId,
                    'WEBRETAIL'
                )
            }
        } catch (error) {
            console.error(
                'Marketing conversion tracking failed:',
                error
            )
        }

        /*
         * Preserve confirmation details before clearing
         * the global retail cart.
         */
        state.confirmationNumber =
            retailGlobal.confirmationNumber

        state.items = [...retailGlobal.cart.items]

        const { getLocationByLocationCode } = useKhsds()

        if (
            (
                retailGlobal.webOrderRetailCart
                    .pickUpLocationCode || ''
            ).trim() !== ''
        ) {
            state.pickupInfo =
                await retailGlobal.getPickupOrderInformation(
                    orderId
                )

            state.location =
                await getLocationByLocationCode(
                    retailGlobal.webOrderRetailCart
                        .pickUpLocationCode
                )
        }

        await retailGlobal.clearTiderc()
        await retailGlobal.clearRetailCart()

        retailGlobal.webOrderRetailCart.webOrderRetailCartId = 0
        retailGlobal.webOrderRetailCartId = 0
        retailGlobal.holdDeliveryMethod = ''
        retailGlobal.confirmationNumber = ''
        retailGlobal.webRetailSession = {}
    }
})

onUnmounted(() => {
    window.scrollTo(0, 0)
    retailGlobal.menuVisible = true
})

async function tryAnother() {
    retailGlobal.webOrderRetailCart.tidercId = 0
    retailGlobal.webOrderRetailCart.billingName = ''
    retailGlobal.webOrderRetailCart.billingAddress = ''
    retailGlobal.webOrderRetailCart.billingCity = ''
    retailGlobal.webOrderRetailCart.billingState = ''
    retailGlobal.webOrderRetailCart.billingZipCode = ''

    retailGlobal.softClearTiderc()

    await retailGlobal.putWebOrderRetailCart(
        retailGlobal.webOrderRetailCart
    )

    router.push('/shop/retail/checkout/payment')
}

function finish() {
    router.push('/shop/retail/top-sellers')
}
</script>