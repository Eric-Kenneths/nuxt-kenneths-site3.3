<template>
    <div>
        <!-- Overlay -->
        <transition name="fade">
            <div v-if="retailGlobal.cart.visible" class="fixed inset-0 bg-black/50 z-40"
                @click.self="retailGlobal.cart.visible = false">
            </div>
        </transition>

        <!-- Drawer -->
        <transition name="slide-in">
            <aside v-if="retailGlobal.cart.visible"
                class="fixed right-0 top-0 h-full w-80 bg-primary-100 text-primary-900 shadow-xl z-50 flex flex-col">

                <!-- HEADER -->
                <header class="relative px-6 pt-8 pb-4 border-b border-primary-900/30">
                    <h1 class="text-center text-2xl tracking-wide uppercase font-semibold">
                        Your Cart
                    </h1>

                    <!-- Close button -->
                    <button @click="retailGlobal.cart.visible = false"
                        class="absolute right-6 top-8 text-3xl font-light hover:text-primary-500"
                        aria-label="Close Cart">
                        ×
                    </button>
                </header>

                <!-- ITEMS -->
                <section class="flex-1 overflow-y-auto px-6 py-6 space-y-10">

                    <div v-for="(item, id) in retailGlobal.cart.items" :key="id"
                        class="pb-6 border-b border-primary-900/20">
                        <div class="flex gap-4">

                            <!-- PRODUCT IMAGE -->
                            <div class="w-24 h-24 flex-shrink-0">
                                <img :src="retailGlobal.getItemImage(item.urlRouteName)" :alt="item.webName"
                                    class="w-full h-full object-contain rounded-lg" />
                            </div>

                            <!-- DETAILS -->
                            <div class="flex-1">

                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="font-semibold text-sm">{{ item.brand }}</div>
                                        <div class="font-bold text-base leading-tight">
                                            {{ item.webName }}
                                        </div>
                                    </div>

                                    <!-- DELETE BUTTON (same visual logic as checkout page) -->
                                    <button @click="deleteItem(item)"
                                        class="text-primary-900 hover:text-red-600 transition" aria-label="Remove item">

                                        <!-- SVG delete icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4
                                                   0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                        </svg>

                                    </button>
                                </div>

                                <!-- SIZE -->
                                <div class="text-sm mt-1 opacity-90">
                                    {{ item.size }} {{ item.measure }}
                                </div>

                                <!-- QUANTITY + PRICE -->
                                <div class="flex justify-between items-center mt-4">

                                    <!-- Quantity Control -->
                                    <div
                                        class="flex items-center justify-between w-28 px-4 py-2 border border-primary-900 rounded-full select-none">
                                        <button class="text-xl leading-none" @click="adjustQuantity(item, -1)">
                                            −
                                        </button>

                                        <span class="text-sm">{{ Number(item.quantity) }}</span>

                                        <button class="text-xl leading-none" @click="adjustQuantity(item, +1)">
                                            +
                                        </button>
                                    </div>

                                    <!-- Price -->
                                    <div class="text-lg font-semibold">
                                        <span v-if="item.couponAmount === 0">
                                            {{ filterCurrency(item.price * Number(item.quantity)) }}
                                        </span>

                                        <span v-else class="flex flex-col items-end">
                                            <span class="line-through opacity-50 text-sm">
                                                {{ filterCurrency(item.price * Number(item.quantity)) }}
                                            </span>
                                            <span>
                                                {{ filterCurrency((item.price * Number(item.quantity)) -
                                                    item.couponAmount) }}
                                            </span>
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div v-if="retailGlobal.cart.items.length === 0" class="text-center text-primary-900/60 pt-10">
                        Your cart is empty.
                    </div>

                </section>

                <!-- FOOTER -->
                <footer class="px-6 pb-10 border-t border-primary-900/20">

                    <div v-if="retailGlobal.cart.items.length > 0">
                        <p class="text-sm mt-6 mb-6 leading-relaxed">
                            Your total today is
                            <strong>{{ filterCurrency(retailGlobal.webOrderRetailCart.subTotal) }}</strong>.
                            Taxes and shipping are calculated at checkout.
                        </p>

                        <Button label="Check Out" block
                            class="w-full bg-primary-900 text-white text-lg rounded-full py-3 hover:bg-primary-500 transition"
                            @click="checkout" />
                    </div>

                    <div v-else class="pt-6 text-center">
                        <NuxtLink to="/shop/retail/top-sellers"
                            class="uppercase text-lg font-semibold hover:text-primary-500 transition">
                            Shop Retail
                        </NuxtLink>
                    </div>

                </footer>

            </aside>
        </transition>
    </div>
</template>


<script setup>
import Button from '@/volt/Button.vue'
import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

const { filterCurrency } = useFilters()
const router = useRouter()

dataGlobal.sideBarVisible = false

/**
 * QUANTITY UPDATED USING SELECT
 */
async function quantityChanged(item) {
    const newQty = Number(item.quantity)

    if (newQty > 10) item.quantity = 10

    const id = await retailGlobal.putWebOrderRetail(item.webOrderRetailId, item.quantity)

    if (id === 0) {
        router.push('/shop/retail/top-sellers')
        return
    }

    await retailGlobal.refreshRetailSession()
}

/**
 * +/- BUTTONS
 */
async function adjustQuantity(item, delta) {
    const current = Number(item.quantity)
    const newQty = current + delta

    if (newQty < 1 || newQty > 10) return

    item.quantity = newQty

    const id = await retailGlobal.putWebOrderRetail(item.webOrderRetailId, newQty)

    if (id === 0) {
        router.push('/shop/retail/top-sellers')
        return
    }

    await retailGlobal.refreshRetailSession()
}

/**
 * DELETE ITEM (same logic as checkout page)
 */
async function deleteItem(item) {
    // OPTIONAL: instant UI removal
    const index = retailGlobal.cart.items.findIndex(x => x.webOrderRetailId === item.webOrderRetailId)
    if (index !== -1) {
        retailGlobal.cart.items.splice(index, 1)
    }

    const success = await retailGlobal.deleteWebOrderRetail(item.webOrderRetailId)
    if (success) {
        await retailGlobal.refreshRetailSession()
    }
}

/**
 * CHECKOUT
 */
function checkout() {
    retailGlobal.cart.visible = false
    router.push('/shop/retail/checkout/cart')
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-in-enter-active {
    transition: transform 0.3s ease-out;
}

.slide-in-enter-from {
    transform: translateX(100%);
}

.slide-in-leave-active {
    transition: transform 0.3s ease-in;
}

.slide-in-leave-to {
    transform: translateX(100%);
}
</style>
