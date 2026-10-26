<template>
    <Popover ref="op">
        <div class="m-5">
            <div>
                Are you sure you want to remove this gift card?
            </div>
            <div class="mt-2">
                <Button label="Yes" class="w-25" @click="confirm('deleteGC', 'Y')" />
                <Button class="ml-3 w-25 text-right" label="No" @click="confirm('deleteGC', 'N')" />
            </div>
        </div>
    </Popover>
    <Popover ref="opGCD">
        <div class="m-3 text-sm">
            <div v-html="giftCardDetails">
            
            </div>
        </div>
    </Popover>
    <section class="bg-primary-500 text-primary-900 h-30 relative -mb-1">
    </section>
    <section class="bg-primary-500 text-primary-900 py-5 relative">
        <div class="grid mx-auto">
        <!-- Row 1 -->
        <div class="text-center">
            <h2 class="text-3xl md:text-4xl uppercase">
                Gift Card Cart
            </h2>
        </div>
        </div>
    </section>
    <section class="bg-primary-100 text-primary-900 py-5 relative">
        <div class="max-w-2xl mx-auto">
            <div class="grid [grid-template-columns:65%_25%_10%] my-1 px-2 items-center">
                <div class="font-bold uppercase">
                    Gift Card(s)
                </div>
                <div class="font-bold uppercase">
                    Amount
                </div>
                <div>
            
                </div>
            </div>
            <div  v-for="(gc, id) in giftCardGlobal.webOrderGCs" :key="id" class="grid [grid-template-columns:65%_25%_10%] my-1 px-2 items-center border border-gray-400 rounded-lg py-1 mx-2">
                <div class="flex items-center">
                    {{ gc.typeDescription }} <Button class="ml-1 text-xs font-bold !h-5 !w-5 !p-0 !round-xl" label="?" @click="toggleGiftCardDetails(gc.giftCardDetails, $event)"></Button>
                </div> 
                <div>{{ filterCurrency(gc.orderTotal) }}</div>
                <div>
                    <Button class="!px-2" @click="toggleDeleteQuestion(gc.webOrderGCId, $event)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M9.669 2.342a1.5 1.5 0 011.415-1.092h1.832a1.5 1.5 0 011.415 1.092l.379 1.517h3.79a.75.75 0 010 1.5h-.528l-1.072 12.393A2.25 2.25 0 0114.666 20H9.334a2.25 2.25 0 01-2.234-2.248L6.028 5.36H5.5a.75.75 0 010-1.5h3.79l.379-1.518zM9.75 8.25a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V8.25zm6 0a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V8.25z" clip-rule="evenodd" />
                        </svg>
                    </Button>
                </div>
            </div>

            <div class="text-center w-full max-w-2xl mx-auto pt-8 grid grid-cols-2">
                <div>
                    <Button class="w-45 bg-primary-500" @click="continueShopping()">Continue Shopping</Button>
                </div>
                <div>
                    <Button class="w-45 bg-primary-500" @click="checkOut()">Check Out</Button>
                </div>   
            </div>
        </div>
   
    </section>
</template>

<script setup>
    import { giftCardGlobal } from '~/composables/giftCardGlobal';
    import Popover from '@/volt/Popover.vue';
    import Button from '@/volt/Button.vue';

    const { filterCurrency } = useFilters();
    const router = useRouter();

    const op = ref();

    let selectedWebOrderGCId = 0;

    const toggleDeleteQuestion = (webOrderGCId, event) => {
        selectedWebOrderGCId = webOrderGCId;
        op.value.toggle(event);
    };

    useHead({
        meta: [
            {
            name: 'robots',
            content: 'noindex, nofollow'
            }
        ]
    })

    const giftCardDetails = ref('');

    const opGCD = ref();

    const toggleGiftCardDetails = (gcd, event) => {
        giftCardDetails.value = gcd;
        opGCD.value.toggle(event);
    };


    giftCardGlobal.getCart();
    
    async function continueShopping() {
        router.push('/shop/gift-cards');
    }


    async function confirm(type, answer) {

        if (type === 'deleteGC') {
            if (answer === 'Y') {
                await giftCardGlobal.deleteWebOrderGC(selectedWebOrderGCId);
                await giftCardGlobal.getCart()

                if (giftCardGlobal.webOrderGCs.length === 0) {
                    router.push('/shop/gift-cards');
                }

            } else { //N for No
                //do nothing
            }

            toggleDeleteQuestion()
        }
    }

    function checkOut() {
        router.push('/shop/gift-cards/checkout');
    }
</script>

<style lang="scss" scoped>

</style>