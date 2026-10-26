<template>
    <div class="relative flex h-[10vmin] w-full items-center justify-center overflow-hidden mb-5"></div>
    <GoldLine />

    <div class="min-h-screen bg-primary-100 text-primary-900 caret-black">
        <div class="mx-auto w-full max-w-6xl px-4 py-10 lg:py-16">
            <!-- PAGE TITLE -->
            <div class="flex items-center justify-center space-x-6 pt-3 pb-3 lg:pt-5 lg:pb-5">
                <h1 class="text-4xl lg:text-6xl text-primary-900 font-thin uppercase">
                    Payment
                </h1>
            </div>

            <div class="grid gap-8 lg:grid-cols-12">
                <!-- PAYMENT FORM -->
                <div class="lg:col-span-8">
                    <!-- CARD DETAILS -->
                    <section class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-6">
                            Payment Information
                        </h2>

                        <div class="space-y-4">
                            <div>
                                <label for="cardType" class="block text-sm font-semibold mb-1 uppercase">
                                    Card Type
                                </label>
                                <select id="cardType" v-model="retailGlobal.tiderc.x3"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm">
                                    <option value="">Select Card Type</option>
                                    <option v-for="type in state.typeList" :key="type.code" :value="type.code">
                                        {{ type.description }}
                                    </option>
                                </select>
                                <p v-if="state.error.cardType" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div>
                                <label for="cardNumber" class="block text-sm font-semibold mb-1 uppercase">
                                    Card Number
                                </label>
                                <input id="cardNumber" v-model="retailGlobal.tiderc.x1" type="text" maxlength="16"
                                    inputmode="numeric" placeholder="Card Number"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                    @keydown="dataGlobal.numericInput" />
                                <p v-if="state.error.cardNumber" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold mb-1 uppercase">
                                    Card Expiration
                                </label>

                                <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center max-w-xs">
                                    <select v-model="state.expirationMonth"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm">
                                        <option value="">MM</option>
                                        <option v-for="month in state.monthList" :key="month" :value="month">
                                            {{ month }}
                                        </option>
                                    </select>

                                    <span class="text-2xl lg:text-3xl">/</span>

                                    <select v-model="state.expirationYear"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm">
                                        <option value="">YY</option>
                                        <option v-for="year in state.yearList" :key="year" :value="year">
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>

                                <p v-if="state.error.expiration" class="text-sm text-red-600 mt-2 uppercase">
                                    Expiration date not valid
                                </p>
                            </div>

                            <div>
                                <label for="cardCVV" class="block text-sm font-semibold mb-1 uppercase">
                                    CVV
                                </label>
                                <input id="cardCVV" v-model="state.cvv" type="text" maxlength="4" inputmode="numeric"
                                    placeholder="CVV"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                    @keydown="dataGlobal.numericInput" />
                                <p v-if="state.error.cvv" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- BILLING INFORMATION -->
                    <section class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-6">
                            Billing Information
                        </h2>

                        <div class="mb-6" v-if="!((retailGlobal.webOrderRetailCart.pickUpLocationCode || '').trim())">
                            <label class="inline-flex items-center gap-3 cursor-pointer">
                                <input v-model="state.isBillingAndShipInfoSame" type="checkbox"
                                    class="h-4 w-4 accent-primary-900"
                                    aria-label="Check to make billing info same as shipping"
                                    @change="updateBillingInfo" />
                                <span class="text-sm font-medium">
                                    Billing Info Same As Shipping
                                </span>
                            </label>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label for="cardName" class="block text-sm font-semibold mb-1 uppercase">
                                    Cardholder Name
                                </label>
                                <input id="cardName" v-model="retailGlobal.tiderc.cardholderName" type="text"
                                    placeholder="Cardholder Name"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.cardholderName" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div>
                                <label for="cardAddress" class="block text-sm font-semibold mb-1 uppercase">
                                    Billing Address
                                </label>
                                <input id="cardAddress" v-model="retailGlobal.tiderc.address" type="text"
                                    placeholder="Billing Address"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.address" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div>
                                <label for="cardCity" class="block text-sm font-semibold mb-1 uppercase">
                                    Billing City
                                </label>
                                <input id="cardCity" v-model="retailGlobal.tiderc.city" type="text"
                                    placeholder="Billing City"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.city" class="text-sm text-red-600 mt-2 uppercase">
                                    Cannot be blank
                                </p>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label for="billingState" class="block text-sm font-semibold mb-1 uppercase">
                                        Billing State
                                    </label>
                                    <select id="billingState" v-model="retailGlobal.tiderc.state"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm">
                                        <option value="">Select a State</option>
                                        <option v-for="item in state.stateList" :key="item.code" :value="item.code">
                                            {{ item.description }}
                                        </option>
                                    </select>
                                    <p v-if="state.error.state" class="text-sm text-red-600 mt-2 uppercase">
                                        Cannot be blank
                                    </p>
                                </div>

                                <div>
                                    <label for="cardZipCode" class="block text-sm font-semibold mb-1 uppercase">
                                        Billing Zip Code
                                    </label>
                                    <input id="cardZipCode" v-model="retailGlobal.tiderc.zipCode" type="text"
                                        maxlength="5" inputmode="numeric" placeholder="Billing Zip Code"
                                        class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                        @keydown="dataGlobal.numericInput" />
                                    <p v-if="state.error.zipCode" class="text-sm text-red-600 mt-2 uppercase">
                                        Must be 5 digits
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label for="phone" class="block text-sm font-semibold mb-1 uppercase">
                                    Mobile Phone for verification text
                                </label>
                                <input id="phone" v-model="state.billingPhone" type="text" maxlength="10"
                                    inputmode="numeric" placeholder="Phone"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                    @keydown="dataGlobal.numericInput" />
                                <p v-if="state.error.phone" class="text-sm text-red-600 mt-2 uppercase">
                                    Must be 10 digits
                                </p>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-semibold mb-1 uppercase">
                                    Email
                                </label>
                                <input id="email" v-model="state.email" type="email" placeholder="Email"
                                    class="w-full border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm" />
                                <p v-if="state.error.email" class="text-sm text-red-600 mt-2 uppercase">
                                    Must be a valid email
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- FORM ERROR -->
                    <div v-if="state.error.showError"
                        class="mb-8 text-center text-red-600 text-xl lg:text-2xl font-semibold uppercase" role="alert">
                        Please complete the form
                    </div>

                    <!-- ACTIONS -->
                    <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <div class="flex flex-col sm:flex-row justify-between gap-3">
                            <button type="button"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-100 border border-primary-900 text-primary-900 text-sm font-semibold uppercase hover:bg-primary-emphasis transition"
                                @click="backToShipping">
                                Back to Shipping
                            </button>
                            <div v-if="state.errorMessage !== ''" v-html="state.errorMessage"
                                class="text-base text-red-500 font-bold"></div>
                            <button id="submitButton" type="button" :disabled="state.isSubmitting"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold uppercase hover:bg-primary-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                @click="completeCheckout">
                                Complete Checkout
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

    <verify-form
    :mobile-number="state.billingPhone"
    @didVerify="didVerify"
    show-login="false"
    return-code-only="true"
    message="To complete your retail purchase, please enter your mobile phone number and we will send you a text verification code."
    />
</template>

<script setup>
import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'
import { accountGlobal } from '~/composables/accountGlobal'

dataGlobal.sideBarVisible = false

const router = useRouter()
const { getEndOfMonth } = useDateFunctions()

useHead({
    title: "Select Payment | Cart | Kenneth's Salons and Day Spas",
    meta: [
        {
            name: 'description',
            content:
                "Select your payment method and finalize the checkout products. Your favorite Kenneth's products are only a click away!"
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
            content: "Select Payment | Cart | Kenneth's Salons and Day Spas"
        },
        {
            property: 'og:description',
            content:
                "Select your payment method and finalize the checkout products. Your favorite Kenneth's products are only a click away!"
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/shop/retail/payment'
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
            content: "Select Payment | Cart | Kenneth's Salons and Day Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Select your payment method and finalize the checkout products. Your favorite Kenneth's products are only a click away!"
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
    expirationMonth: '',
    expirationYear: '',
    email: '',
    billingPhone: '',
    cvv: '',
    isSubmitting: false,
    error: {
        showError: false,
        cardNumber: false,
        cardType: false,
        expiration: false,
        cvv: false,
        cardholderName: false,
        address: false,
        city: false,
        state: false,
        zipCode: false,
        phone: false,
        email: false
    },
    typeList: [],
    stateList: [],
    monthList: [],
    yearList: [],
    isBillingAndShipInfoSame: false
})

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

    state.email = retailGlobal.tryAgain.email || ''
    state.billingPhone = retailGlobal.tryAgain.phone || ''

    console.log('webOrderRetailCart', retailGlobal.webOrderRetailCart)

    retailGlobal.tiderc.x3 = (retailGlobal.tiderc?.x3 || '').trim()
    retailGlobal.tiderc.state = (retailGlobal.tiderc?.state || '').trim()
    retailGlobal.tiderc.x1 = retailGlobal.tiderc?.x1 || ''
    retailGlobal.tiderc.cardholderName = retailGlobal.tiderc?.cardholderName || ''
    retailGlobal.tiderc.address = retailGlobal.tiderc?.address || ''
    retailGlobal.tiderc.city = retailGlobal.tiderc?.city || ''
    retailGlobal.tiderc.zipCode = retailGlobal.tiderc?.zipCode || ''

    if ((retailGlobal.webOrderRetailCart.pickUpLocationCode || '').trim() !== '') {
        state.billingPhone = retailGlobal.webOrderRetailCart.cellPhone || ''
    }

    populateTypes()
    await populateStates()
    populateMonthList()
    populateYearList()
})

onUnmounted(() => {
    retailGlobal.menuVisible = true
})

async function populateStates() {
    const { getTablesByCategoryType } = useKhsds()
    state.stateList = await getTablesByCategoryType('stat')
}

function populateTypes() {
    state.typeList = [
        { description: 'Visa', code: 'V' },
        { description: 'Mastercard', code: 'M' },
        { description: 'Discover', code: 'D' },
        { description: 'American Express', code: 'A' }
    ]
}

function populateMonthList() {
    state.monthList = []

    for (let i = 1; i <= 12; i++) {
        state.monthList.push(i <= 9 ? `0${i}` : `${i}`)
    }
}

function populateYearList() {
    state.yearList = []
    const thisYear = new Date().getFullYear()

    for (let i = 0; i < 10; i++) {
        state.yearList.push((thisYear + i).toString().slice(2))
    }
}

function clearError() {
    state.error.showError = false
    state.error.cardNumber = false
    state.error.cardType = false
    state.error.expiration = false
    state.error.cvv = false
    state.error.cardholderName = false
    state.error.address = false
    state.error.city = false
    state.error.state = false
    state.error.zipCode = false
    state.error.phone = false
    state.error.email = false
}

function updateBillingInfo() {
    if (state.isBillingAndShipInfoSame === true) {
        retailGlobal.tiderc.cardholderName = retailGlobal.webOrderRetailCart.shippingName || ''
        retailGlobal.tiderc.address = retailGlobal.webOrderRetailCart.shippingAddress || ''
        retailGlobal.tiderc.city = retailGlobal.webOrderRetailCart.shippingCity || ''
        retailGlobal.tiderc.state = retailGlobal.webOrderRetailCart.shippingState || ''
        retailGlobal.tiderc.zipCode = retailGlobal.webOrderRetailCart.shippingZipCode || ''
    } else {
        retailGlobal.tiderc.cardholderName = ''
        retailGlobal.tiderc.address = ''
        retailGlobal.tiderc.city = ''
        retailGlobal.tiderc.state = ''
        retailGlobal.tiderc.zipCode = ''
    }
}

async function validateForm() {
    clearError()

    let valid = true

    if ((retailGlobal.tiderc.x1 || '').trim() === '') {
        state.error.cardNumber = true
        valid = false
    }

    if ((retailGlobal.tiderc.x3 || '').trim() === '') {
        state.error.cardType = true
        valid = false
    }

    if (state.expirationMonth.trim() === '' || state.expirationYear.trim() === '') {
        state.error.expiration = true
        valid = false
    } else {
        const expirationDate = new Date(
            Number(`20${state.expirationYear}`),
            Number(state.expirationMonth),
            0
        )

        if (getEndOfMonth(expirationDate) < new Date()) {
            state.error.expiration = true
            valid = false
        }
    }

    if (state.cvv.trim() === '') {
        state.error.cvv = true
        valid = false
    }

    if ((retailGlobal.tiderc.cardholderName || '').trim() === '') {
        state.error.cardholderName = true
        valid = false
    }

    if ((retailGlobal.tiderc.address || '').trim() === '') {
        state.error.address = true
        valid = false
    }

    if ((retailGlobal.tiderc.city || '').trim() === '') {
        state.error.city = true
        valid = false
    }

    if ((retailGlobal.tiderc.state || '').trim() === '') {
        state.error.state = true
        valid = false
    }

    if ((retailGlobal.tiderc.zipCode || '').trim().length !== 5) {
        state.error.zipCode = true
        valid = false
    }

    if ((state.billingPhone || '').trim().length !== 10) {
        state.error.phone = true
        valid = false
    }

    if (!dataGlobal.isEmailFormat((state.email || '').trim()) || (state.email || '').trim() === '') {
        state.error.email = true
        valid = false
    }

    if (valid === false) {
        state.error.showError = true
    }

    return valid
}

function backToShipping() {
    router.push('/shop/retail/checkout/shipping')
}

function didVerify(verified) {
    state.errorMessage='';
    if (verified) {
        finishCompleteCheckout();
    } else {
        state.errorMessage = 'Verification Failed. Please try again.';
        state.isSubmitting = false;
    }
}

async function completeCheckout() {
    if (state.isSubmitting) return;

    const success = await validateForm()
    if (success === false) {
        return;
    } 

    retailGlobal.tryAgain.email = state.email.trim();
    retailGlobal.tryAgain.phone = state.billingPhone.trim();

    // if 1st time through, do not ask for verification, just submit the order. If it fails, then we will ask for verification.
    let attemptStatus = await retailGlobal.getPaymentAttemptExists();

    if (attemptStatus === 'E') {
        state.errorMessage = 'Unable to submit your order right now. Please try again.';
        return;
    }

    if (attemptStatus === 'N') {
        finishCompleteCheckout();
        return;
    }

    accountGlobal.showVerify=true
}

async function finishCompleteCheckout() {
    state.isSubmitting = true

    try {
        await retailGlobal.refreshRetailSession()

        if (retailGlobal.cart.items.length === 0) {
            router.push('/shop/retail/top-sellers')
            return
        }

        state.error.showError = false

        retailGlobal.tiderc.x2 = `${state.expirationMonth}${state.expirationYear}`
        retailGlobal.webOrderRetailCart.email = state.email.trim()
        retailGlobal.webOrderRetailCart.billingPhone = accountGlobal.mobilePhone; //state.billingPhone.trim() //make sure we use the verified phone number

        retailGlobal.tiderc.tidercCode = accountGlobal.textCode;

        const redirectTo = await retailGlobal.putProccessPayment(
            retailGlobal.tiderc,
            retailGlobal.webOrderRetailCart,
            retailGlobal.webRetailSession.webRetailSessionId,
            state.cvv
        )

        if (redirectTo !== 'error') {
            const { setWebOrderRetailCartId, setCartCount } = useLocalStorage()

            await setWebOrderRetailCartId(0)
            await setCartCount(0)
        } else {
            retailGlobal.hadFailedCheckout = true;
            await retailGlobal.refreshRetailSession()
        }

        router.replace(`/shop/retail/checkout/confirmation/${redirectTo}`)
        return
    } finally {
        state.isSubmitting = false
    }
}
</script>