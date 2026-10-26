<template>
    <div class="relative flex h-[10vmin] w-full items-center justify-center overflow-hidden mb-5"></div>
    <GoldLine />

    <div class="min-h-screen bg-primary-100 text-primary-900 caret-black">
        <div class="mx-auto w-full max-w-6xl px-4 py-10 lg:py-16">
            <!-- PAGE TITLE -->
            <div class="flex items-center justify-center space-x-6 pt-3 pb-3 lg:pt-5 lg:pb-5">
                <h1 class="text-4xl lg:text-6xl text-primary-900 font-thin uppercase">
                    Cart
                </h1>
            </div>

            <div class="grid gap-8 lg:grid-cols-12">
                <!-- CART CONTENT -->
                <div class="lg:col-span-8">
                    <!-- EMPTY CART -->
                    <section v-if="retailGlobal.cart.items.length === 0"
                        class="mb-8 border border-primary-900 bg-primary-100 px-5 py-10 lg:px-10 lg:py-12 shadow-sm text-center">
                        <h2 class="text-xl lg:text-2xl font-semibold uppercase mb-4">
                            Your Cart Is Empty
                        </h2>

                        <button type="button"
                            class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-100 border border-primary-900 text-primary-900 text-sm font-semibold uppercase hover:bg-primary-emphasis transition"
                            @click="returnToShopping">
                            Return to Shopping
                        </button>
                    </section>

                    <!-- CART ITEMS -->
                    <section v-else
                        class="mb-8 border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <h2 class="text-center text-xl lg:text-2xl font-semibold uppercase mb-6">
                            Your Cart
                        </h2>

                        <div v-for="(item, id) in retailGlobal.cart.items" :key="id"
                            class="py-4 border-b border-primary-900/30 last:border-b-0">
                            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                                <!-- IMAGE -->
                                <div class="w-full sm:w-32 lg:w-36 flex-shrink-0 flex items-center justify-center">
                                    <img :src="retailGlobal.getItemImage(item.urlRouteName)" :alt="item.webName"
                                        class="h-48 w-full object-contain sm:h-40 lg:h-48" />
                                </div>

                                <!-- INFO -->
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

                                        <!-- DELETE -->
                                        <button type="button" class="text-primary-900 hover:text-red-600 transition"
                                            aria-label="Remove item" @click="deleteItem(item)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <!-- QUANTITY -->
                                        <div class="w-full sm:w-auto">
                                            <label :for="`quantity-${item.webOrderRetailId}`" class="sr-only">
                                                Select quantity for {{ item.webName }}
                                            </label>

                                            <select :id="`quantity-${item.webOrderRetailId}`" v-model="item.quantity"
                                                class="w-full sm:w-24 border border-primary-900/40 bg-primary-100 px-3 py-2 text-sm"
                                                @change="quantityChanged(item)"
                                                @blur="lostFocus({ value: item.quantity }, item)">
                                                <option v-for="quantity in state.quantities" :key="quantity.code"
                                                    :value="quantity.code">
                                                    {{ quantity.description }}
                                                </option>
                                            </select>
                                        </div>

                                        <!-- PRICE -->
                                        <div class="text-left sm:text-right text-lg font-semibold">
                                            <span v-if="item.couponAmount === 0">
                                                {{ filterCurrency(item.price) }}
                                            </span>

                                            <span v-else class="flex flex-col sm:items-end">
                                                <span class="line-through opacity-60 text-sm">
                                                    {{ filterCurrency(item.price) }}
                                                </span>
                                                <span>
                                                    {{
                                                        filterCurrency(
                                                            item.price - item.couponAmount / item.quantity
                                                        )
                                                    }}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- ACTIONS -->
                    <section class="border border-primary-900 bg-primary-100 px-5 py-6 lg:px-10 lg:py-8 shadow-sm">
                        <div class="flex flex-col sm:flex-row justify-between gap-3">
                            <button type="button"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-100 border border-primary-900 text-primary-900 text-sm font-semibold uppercase hover:bg-primary-emphasis transition"
                                @click="returnToShopping">
                                Return to Shopping
                            </button>

                            <button v-show="retailGlobal.cart.items.length !== 0" type="button"
                                class="w-full sm:w-auto px-6 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold uppercase hover:bg-primary-500 transition"
                                @click="next">
                                Proceed With Purchase
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

dataGlobal.sideBarVisible = false

const { filterCurrency } = useFilters()
const router = useRouter()

const state = reactive({
    quantities: [
        { code: 1, description: '1' },
        { code: 2, description: '2' },
        { code: 3, description: '3' },
        { code: 4, description: '4' },
        { code: 5, description: '5' },
        { code: 6, description: '6' },
        { code: 7, description: '7' },
        { code: 8, description: '8' },
        { code: 9, description: '9' },
        { code: 10, description: '10' }
    ]
})

useHead({
    title: "Checkout | Cart | Kenneth's Salons and Day Spas",
    meta: [
        {
            name: 'description',
            content:
                "Ready to purchase? Checkout now and begin the countdown until your favorite Kenneth's products arrive at your door."
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
            content: "Checkout | Cart | Kenneth's Salons and Day Spas"
        },
        {
            property: 'og:description',
            content:
                "Ready to purchase? Checkout now and begin the countdown until your favorite Kenneth's products arrive at your door."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/shop/retail/checkout/cart'
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
            content: "Checkout | Cart | Kenneth's Salons and Day Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Ready to purchase? Checkout now and begin the countdown until your favorite Kenneth's products arrive at your door."
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
    }
})

onUnmounted(() => {
    retailGlobal.menuVisible = true
})

async function quantityChanged(item) {
    const webOrderRetailId = await retailGlobal.putWebOrderRetail(
        item.webOrderRetailId,
        item.quantity
    )

    if (webOrderRetailId === 0) {
        router.push('/shop/retail/top-sellers')
        return
    }

    await retailGlobal.refreshRetailSession()
}

async function deleteItem(item) {
    const success = await retailGlobal.deleteWebOrderRetail(item.webOrderRetailId)

    if (success === true) {
        await retailGlobal.refreshRetailSession()
    }
}

async function lostFocus(event, item) {
    if (event.value === '') {
        await deleteItem(item)
    }
}

function returnToShopping() {
    router.push('/shop/retail/top-sellers')
}

function next() {
    router.push('/shop/retail/checkout/shipping')
}
</script>