<template>
    <div class="relative flex h-[10vmin] w-full items-center justify-center overflow-hidden mb-5"></div>
    <GoldLine />

    <div class="min-h-screen bg-primary-100 text-primary-900 caret-black">
        <div class="mx-auto w-full max-w-6xl px-4 py-10 lg:py-16">
            <!-- PAGE TITLE -->
            <div class="flex items-center justify-center space-x-6 pt-3 pb-3 lg:pt-5 lg:pb-5">
                <h1 class="text-4xl lg:text-6xl text-primary-900 font-thin uppercase">
                    Delivery Method
                </h1>
            </div>

            <div class="grid gap-8 lg:grid-cols-12">
                <!-- FORM -->
                <div class="lg:col-span-8">
                    <!-- DELIVERY METHOD -->
                    <section class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-4">
                            Select Your Delivery Method
                        </h2>

                        <div class="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input id="deliver" v-model="state.deliveryMethod" type="radio" name="deliveryMethod"
                                    value="deliver" class="accent-primary-900" @change="deliveryMethodChanged" />
                                <span class="font-semibold uppercase">Delivery</span>
                            </label>

                            <label class="flex items-center gap-3 cursor-pointer">
                                <input id="pickup" v-model="state.deliveryMethod" type="radio" name="deliveryMethod"
                                    value="pickup" class="accent-primary-900" @change="deliveryMethodChanged" />
                                <span class="font-semibold uppercase">Free Pick Up</span>
                            </label>
                        </div>
                    </section>

                    <!-- DELIVERY FORM -->
                    <section v-if="state.deliveryMethod === 'deliver'"
                        class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-6">
                            Shipping Information
                        </h2>

                        <div class="space-y-4">
                            <div>
                                <label for="shippingName" class="block text-sm font-semibold mb-1 uppercase">
                                    Name
                                </label>
                                <input id="shippingName" v-model="retailGlobal.webOrderRetailCart.shippingName"
                                    type="text" maxlength="50" placeholder="Name" autocomplete="name"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.shippingName" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div>
                                <label for="shippingAddress" class="block text-sm font-semibold mb-1 uppercase">
                                    Street Address
                                </label>
                                <input id="shippingAddress" v-model="retailGlobal.webOrderRetailCart.shippingAddress"
                                    type="text" maxlength="50" placeholder="Street Address"
                                    autocomplete="street-address"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.shippingAddress" class="text-sm text-red-600 mt-2 uppercase">
                                    {{ state.error.shippingAddressText }}
                                </p>
                            </div>

                            <div>
                                <label for="shippingCity" class="block text-sm font-semibold mb-1 uppercase">
                                    City
                                </label>
                                <input id="shippingCity" v-model="retailGlobal.webOrderRetailCart.shippingCity"
                                    type="text" maxlength="30" placeholder="City" autocomplete="address-level2"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.shippingCity" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label for="shippingState" class="block text-sm font-semibold mb-1 uppercase">
                                        State
                                    </label>
                                    <select id="shippingState" v-model="retailGlobal.webOrderRetailCart.shippingState"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                        @change="stateChange">
                                        <option value="">Select a State</option>
                                        <option v-for="item in state.stateList" :key="item.code" :value="item.code">
                                            {{ item.description }}
                                        </option>
                                    </select>
                                    <p v-if="state.error.shippingState" class="text-sm text-red-600 mt-2 uppercase">
                                        Must choose a state
                                    </p>
                                </div>

                                <div>
                                    <label for="shippingZipCode" class="block text-sm font-semibold mb-1 uppercase">
                                        Zip Code
                                    </label>
                                    <input id="shippingZipCode"
                                        v-model="retailGlobal.webOrderRetailCart.shippingZipCode" type="text"
                                        maxlength="5" inputmode="numeric" autocomplete="postal-code"
                                        placeholder="Zip Code"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                        @keydown="dataGlobal.numericInput" />
                                    <p v-if="state.error.zipCode" class="text-sm text-red-600 mt-2 uppercase">
                                        Must be 5 digits
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- PICKUP FORM -->
                    <section v-if="state.deliveryMethod === 'pickup'"
                        class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-4">
                            Select Pickup Location
                        </h2>

                        <div class="space-y-4">
                            <label v-for="location in pickUpLocations" :key="location.code"
                                class="flex items-start gap-3 cursor-pointer">
                                <input v-model="retailGlobal.webOrderRetailCart.pickUpLocationCode" type="radio"
                                    name="location" :value="location.code" class="accent-primary-900 mt-1"
                                    @change="pickUpLocationChanged" />
                                <span class="text-sm lg:text-base">
                                    <span class="font-semibold">{{ location.name }}</span><br />
                                    {{ location.address }}
                                </span>
                            </label>
                        </div>

                        <p v-if="state.error.pickUpLocationCode" class="text-sm text-red-600 mt-2 uppercase">
                            Must choose a location
                        </p>

                        <p class="text-center text-red-600 text-sm mt-4">
                            We will hold your order for 7 days from fulfillment.
                        </p>

                        <div class="mt-6 space-y-4">
                            <div>
                                <label for="cellPhone" class="block text-sm font-semibold mb-1 uppercase">
                                    Cell Phone
                                </label>
                                <input id="cellPhone" v-model="retailGlobal.webOrderRetailCart.cellPhone" type="text"
                                    maxlength="10" inputmode="numeric" autocomplete="tel" placeholder="Cell Phone"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                    @keydown="dataGlobal.numericInput" />
                                <p v-if="state.error.cellPhone" class="text-sm text-red-600 mt-2 uppercase">
                                    Must be 10 digits
                                </p>
                            </div>

                            <div>
                                <label for="carDescription" class="block text-sm font-semibold mb-1 uppercase">
                                    Car Description
                                </label>
                                <input id="carDescription" v-model="retailGlobal.webOrderRetailCart.carDescription"
                                    type="text" maxlength="100" placeholder="Car Description"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.carDescription" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- FORM ERROR -->
                    <div v-if="state.error.showError" id="shipping-form-error"
                        class="mb-8 text-center text-red-600 text-xl lg:text-2xl font-semibold uppercase" role="alert">
                        Please complete the form
                    </div>

                    <!-- ACTIONS -->
                    <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <div class="flex flex-col sm:flex-row justify-between gap-3">
                            <button type="button"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-100 border border-primary-900 text-primary-900 text-sm font-semibold uppercase hover:bg-primary-emphasis transition"
                                @click="backToCart">
                                Back to Cart
                            </button>

                            <button type="button"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold uppercase hover:bg-primary-500 transition"
                                @click="continueToPayment">
                                Continue to Payment
                            </button>
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
        </div>
    </div>
</template>

<script setup>
import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

const { validateStreetNumberAndName } = useMiscFunctions()
const router = useRouter()

dataGlobal.sideBarVisible = false

useHead({
    title: "Choose Your Shipping | Cart | Kenneth's Salons and Day Spas",
    meta: [
        {
            name: 'description',
            content:
                "Choose your shipping options to receive your Kenneth's hair care, tools, and other beauty products to help you look and feel your best."
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
            content: "Choose Your Shipping | Cart | Kenneth's Salons and Day Spas"
        },
        {
            property: 'og:description',
            content:
                "Choose your shipping options to receive your Kenneth's hair care, tools, and other beauty products to help you look and feel your best."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/shop/retail/checkout/shipping'
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
            content: "Choose Your Shipping | Cart | Kenneth's Salons and Day Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Choose your shipping options to receive your Kenneth's hair care, tools, and other beauty products to help you look and feel your best."
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

const pickUpLocations = [
    {
        code: 'MR',
        name: 'Hilliard Salon - Hilliard',
        address: '4525 Wathen Dr, Hilliard, OH 43026'
    },
    {
        code: 'PL',
        name: 'Polaris Salon - Lewis Center',
        address: '1305 Cameron Ave, Lewis Center, OH 43035'
    },
    {
        code: 'NG',
        name: 'New Albany Salon - New Albany',
        address: '4942 Morse Rd, Columbus, OH 43230'
    },
    {
        code: 'AT',
        name: 'Academy Training Salon - Columbus',
        address: '5151 Reed Rd, Columbus, OH 43220'
    }
]

const state = reactive({
    deliveryMethod: 'deliver',
    stateList: [],
    error: {
        showError: false,
        zipCode: false,
        cellPhone: false,
        shippingName: false,
        shippingAddress: false,
        shippingAddressText: '',
        shippingCity: false,
        shippingState: false,
        pickUpLocationCode: false,
        carDescription: false
    }
})

/* ------------------------------
   INITIAL LOAD
-------------------------------- */

onMounted(async () => {
    window.scrollTo(0, 0)

    const { getWebOrderRetailCartId } = useLocalStorage()
    const id = await getWebOrderRetailCartId()

    if (id === 0) {
        router.push('/shop/retail/top-sellers')
        return
    }

    retailGlobal.menuVisible = false

    await retailGlobal.refreshRetailSession()

    if (retailGlobal.cart.items.length === 0) {
        router.push('/shop/retail/top-sellers')
        return
    }

    state.deliveryMethod = retailGlobal.holdDeliveryMethod || 'deliver'

    await populateStates()
})

onUnmounted(() => {
    retailGlobal.menuVisible = true
})

/* ------------------------------
   DATA LOADERS
-------------------------------- */

async function populateStates() {
    const { getTablesByCategoryType } = useKhsds()
    const states = await getTablesByCategoryType('stat')

    state.stateList = states.filter(
        (item) => item.code !== 'AK' && item.code !== 'HI'
    )
}

/* ------------------------------
   DELIVERY METHOD SWITCH
-------------------------------- */

async function deliveryMethodChanged() {
    clearError()

    if (state.deliveryMethod === 'deliver') {
        retailGlobal.webOrderRetailCart.pickUpLocationCode = ''
        retailGlobal.webOrderRetailCart.cellPhone = ''
        retailGlobal.webOrderRetailCart.carDescription = ''

        await stateChange()
    } else {
        retailGlobal.webOrderRetailCart.shippingAmount = 0.0

        await retailGlobal.putWebOrderRetailCart(
            retailGlobal.webOrderRetailCart
        )

        await retailGlobal.refreshRetailSession()
    }
}

/* ------------------------------
   SHIPPING STATE CHANGE
-------------------------------- */

async function stateChange() {
    await retailGlobal.updateShippingAmount()

    await retailGlobal.putWebOrderRetailCart(
        retailGlobal.webOrderRetailCart
    )

    await retailGlobal.refreshRetailSession()
}

/* ------------------------------
   NAVIGATION
-------------------------------- */

async function backToCart() {
    retailGlobal.webOrderRetailCart.shippingState = ''

    await retailGlobal.updateShippingAmount()

    await retailGlobal.putWebOrderRetailCart(
        retailGlobal.webOrderRetailCart
    )

    await retailGlobal.refreshRetailSession()

    router.replace('/shop/retail/checkout/cart')
}

async function continueToPayment() {
    const valid = await validate()

    retailGlobal.holdDeliveryMethod = state.deliveryMethod

    if (!valid) return

    if (state.deliveryMethod === 'deliver') {
        await retailGlobal.updateShippingForDelivery()
    } else {
        await retailGlobal.updateShippingForPickUp()
    }

    await retailGlobal.putWebOrderRetailCart(
        retailGlobal.webOrderRetailCart
    )

    await retailGlobal.refreshRetailSession()

    router.push('/shop/retail/checkout/payment')
}

/* ------------------------------
   VALIDATION
-------------------------------- */

function clearError() {
    state.error.showError = false
    state.error.cellPhone = false
    state.error.zipCode = false
    state.error.shippingName = false
    state.error.shippingAddress = false
    state.error.shippingAddressText = ''
    state.error.shippingCity = false
    state.error.shippingState = false
    state.error.pickUpLocationCode = false
    state.error.carDescription = false
}

async function validate() {
    clearError()

    let valid = true

    if (state.deliveryMethod === 'deliver') {
        if (retailGlobal.webOrderRetailCart.shippingName.trim() === '') {
            state.error.shippingName = true
            valid = false
        }

        if (retailGlobal.webOrderRetailCart.shippingAddress.trim() === '') {
            state.error.shippingAddress = true
            state.error.shippingAddressText = 'cannot be blank'
            valid = false
        } else if (
            validateStreetNumberAndName(
                retailGlobal.webOrderRetailCart.shippingAddress.trim()
            ) === false
        ) {
            state.error.shippingAddress = true
            state.error.shippingAddressText = 'please enter a valid address'
            valid = false
        }

        if (retailGlobal.webOrderRetailCart.shippingCity.trim() === '') {
            state.error.shippingCity = true
            valid = false
        }

        if (retailGlobal.webOrderRetailCart.shippingState.trim() === '') {
            state.error.shippingState = true
            valid = false
        }

        if (
            retailGlobal.webOrderRetailCart.shippingZipCode.trim().length !== 5
        ) {
            state.error.zipCode = true
            valid = false
        }

        if (!valid) state.error.showError = true

        return valid
    }

    if (
        retailGlobal.webOrderRetailCart.pickUpLocationCode.trim() === ''
    ) {
        state.error.pickUpLocationCode = true
        valid = false
    }

    if (
        retailGlobal.webOrderRetailCart.carDescription.trim() === ''
    ) {
        state.error.carDescription = true
        valid = false
    }

    if (
        retailGlobal.webOrderRetailCart.cellPhone.trim().length !== 10
    ) {
        state.error.cellPhone = true
        valid = false
    }

    if (!valid) state.error.showError = true

    return valid
}

/* ------------------------------
   PICKUP LOCATION SAVE
-------------------------------- */

async function pickUpLocationChanged() {
    await retailGlobal.putWebOrderRetailCart(
        retailGlobal.webOrderRetailCart
    )

    await retailGlobal.refreshRetailSession()
}
</script>