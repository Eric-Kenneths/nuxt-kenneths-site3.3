<template>
    <section class="bg-primary-100 text-primary-900 py-3 px-2 caret-black">
        <div class="w-full max-w-2xl mx-auto grid grid-cols-3">

                <div class="content-center">
                    <div class="cursor-pointer whitespace-nowrap z-40" @click="giftCardGlobal.step='customize'">&larr; Back</div>
                </div>

                <!-- Center-aligned div -->
                <div class="text-center">
                    <h2 id="personalize-gift-card" class="text-2xl md:text-3xl uppercase">
                        Personalize Gift Card
                    </h2>
                </div>
        </div>

        <!--Gratuity-->
        <section v-if="giftCardGlobal.selectionType !== 'dollar-amount'" class="bg-primary-300 p-6 w-full max-w-2xl mx-auto mb-2">
            <h3 class="text-xl font-semibold mb-4 text-primary-900">Add Gratuity <span class="text-base font-normal">(optional)</span></h3>

            <div class="flex flex-col space-y-3">
                <label for="gratuity" class="text-primary-900 font-medium">Enter Percent</label>
                <InputNumber id="gratuity" v-model="tipPercent" mode="decimal" :min="0" :max="100" suffix="%" fluid
                    aria-label="Enter gratuity percentage" />
            </div>
            <div v-show="giftCardGlobal.tipTotal !== 0" class="mt-2 pl-2">
                Gratuity amount {{ filterCurrency(giftCardGlobal.tipTotal) }} 
            </div>
        </section>

        <!--Delivery Method-->
        <section class="bg-primary-300 p-6 w-full max-w-2xl mx-auto mb-2">
            <h3 class="text-xl font-semibold mb-4 text-primary-900">Delivery Method <span class="text-base font-normal">(Please select one.)</span></h3>

            <!-- Radio Button Group -->
            <div class="flex flex-col space-y-3 mb-6">
                <div>
                    <RadioButton class="mr-2" v-model="giftCardGlobal.deliveryMethod" inputId="delivery-email" name="delivery-method"
                    value="E"/>
                    <label for="delivery-email">Email / Online</label>
                    
                    <!-- Email Option -->
                    <div v-if="giftCardGlobal.deliveryMethod === 'E'" class="space-y-4 my-5 pl-7">
                        <div>
                            <label for="gc-name" class="block text-primary-900 font-medium mb-1">*Enter full name of person receiving
                                GC (for verification purposes)</label>
                            <InputText id="gc-name" v-model="giftCardGlobal.printName" maxlength="30"
                                class="ml-1 w-full border border-primary-900 bg-white px-3 py-2 focus:outline-none" />
                        </div>

                        <div>
                            <label for="gc-email" class="block text-primary-900 font-medium mb-1">You will automatically receive
                                a copy of this Gift Certificate. If you would like for us to also send it directly to the
                                recipient, enter the email address of that person.</label>
                            <InputText id="gc-email" type="email" v-model="giftCardGlobal.recipientEmail" maxlength="100"
                                class="w-full border border-primary-900 bg-white px-3 py-2 focus:outline-none" />
                        </div>
                    </div>
                </div>
                <div>
                    <RadioButton class="mr-2" v-model="giftCardGlobal.deliveryMethod" inputId="delivery-location" name="delivery-method"
                                        value="P" />
                    <label for="delivery-email">Pickup at Location</label>

                    <!-- Pickup at Location Option -->
                    <div v-if="giftCardGlobal.deliveryMethod === 'P'" class="my-5 pl-7">
                        <div class="mb-2">
                            <label for="location" class="block text-primary-900 font-medium mb-1">*Select Location</label>
                            <Select id="location" v-model="giftCardGlobal.pickUpLocationCode" :options="giftCardGlobal.locations"
                                optionLabel="extendedDescription" optionValue="locationCode" placeholder="Select Location"
                                class="w-full border border-primary-900 bg-white focus:outline-none" @change="getAddress($event)" />
                        </div>
                        <div class="pl-5">
                            <div>{{ state.address }}</div>
                            <div>{{ state.cityStateZip }}</div>
                        </div>

                        <Checkbox class="mr-2 mb-1 mt-3" v-model="giftCardGlobal.isCurbSide" inputId="curbSide" name="curbSide" binary
                            label="Curbside (we will bring it out to you)" @change="checkIfCurbSideSameLocation()" :disabled="giftCardGlobal.pickUpLocationCode === null" />
                        <label for="curbSide">Curbside (we will bring it out to you)</label>
                    </div>
                </div>
                <div>
                    <RadioButton class="mr-2" v-model="giftCardGlobal.deliveryMethod" inputId="delivery-mail" name="delivery-method"
                                        value="M" />
                    <label for="delivery-email">US Mail</label>

                    <!-- US Mail Option -->
                    <div v-if="giftCardGlobal.deliveryMethod === 'M'" class="space-y-4 mt-5 pl-7">
                        <label for="mail-name" class="block text-primary-900 font-medium mb-1">*Please enter mailing address information</label>
                        <div>
                            <InputText id="mail-name" v-model="giftCardGlobal.mailingAddress.name" placeholder="Name" maxlength="30"
                                class="w-full" />
                        </div>

                        <div>
                            <InputText id="mail-address" v-model="giftCardGlobal.mailingAddress.address" placeholder="Street Address" maxlength="50"
                                class="w-full" />
                        </div>

                        <div>
                            <InputText id="mail-city" v-model="giftCardGlobal.mailingAddress.city" placeholder="City" maxlength="20"
                                class="w-full" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <Select id="mail-state" v-model="giftCardGlobal.mailingAddress.state" :options="giftCardGlobal.states" optionLabel="description" optionValue="code"
                                    placeholder="Select State"
                                    class="w-full" />
                            </div>

                            <div>
                                <InputText id="mail-zip" v-model="giftCardGlobal.mailingAddress.zipCode" placeholder="Zip Code" maxlength="5"
                                    class="w-full" />
                            </div>
                        </div>
                        <div class="flex items-center">
                            <Checkbox class="mr-2 mb-1" v-model="giftCardGlobal.mailingAddress.isRecipientAddress" inputId="recipient-address"
                                                name="recipient-address" binary label="This is the recipient's address" />                         
                            <label for="recipient-address">This is the recipient's address</label>
                        </div>
                        
                    </div>

                </div>
                
            </div>
        </section>

        <!--Personal Message-->
        <section class="bg-primary-300 p-6 w-full max-w-2xl mx-auto">
            <h3 class="text-xl font-semibold mb-4 text-primary-900">Personal Message</h3>
            <div class="space-y-4">
                <div class="flex items-center">
                    *<InputText id="to-name" v-model="giftCardGlobal.personalMessage.to" placeholder="To Name" maxlength="30"
                        class="ml-1 w-full" aria-label="Gift card to name" />
                </div>

                <div class="flex items-center">
                    *<InputText id="from-name" v-model="giftCardGlobal.personalMessage.from" placeholder="From Name" maxlength="30"
                        class="ml-1 w-full" aria-label="Gift card from name" />
                </div>

                <div>
                    <Textarea id="message" v-model="giftCardGlobal.personalMessage.message" placeholder="Message (optional)" :maxlength="maxChars" rows="4" autoResize
                        class="w-full px-3 py-2" aria-label="Gift card personal message" />
                        <div id="instructions-counter"
                            class="text-sm text-primary-900 text-right mt-1"
                            
                            :class="{
                                'text-red-600': remainingChars < 0
                            }" >
                            {{ giftCardGlobal.personalMessage.message.length }} / {{ maxChars }} characters
                        </div>
                </div>
            </div>
        </section>

        <!--Gift Card Price / Details-->
        <section class="mb-2 w-full max-w-2xl mx-auto">
            <template v-if="giftCardGlobal.selectionType==='spa-package'">
                <div class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-2">
                    <div class="text-left">
                        {{ giftCardGlobal.spaDescription }}
                    </div>
                    <div class="text-right">
                        {{ filterCurrency(giftCardGlobal.spaAmount) }}
                    </div>
                </div>
            </template>
            
            <template v-if="giftCardGlobal.selectionType==='selected-services'">
                <div v-for="(service, id) in giftCardGlobal.selectedServices" :key="id" class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-2">
                    <div class="text-left">
                        {{ service.qty }}&nbsp;&nbsp;{{ service.description }}
                    </div>
                    <div class="text-right">
                        {{ filterCurrency( roundTo(service.qty * service.price,2)) }}
                    </div>
                </div>
                <div v-if="giftCardGlobal.hairServiceAmount !== 0 && giftCardGlobal.hairServiceAmount !== null" class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-2">
                    <div class="text-left">
                        1&nbsp;&nbsp;Hair Dollar Amount
                    </div>
                    <div class="text-right">
                        {{ filterCurrency( roundTo(giftCardGlobal.hairServiceAmount,2)) }}
                    </div>
                </div>
                <!-- <div class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-2">
                    <div class="text-left uppercase">
                        Total Services
                    </div>
                    <div class="text-right">
                        {{ filterCurrency(giftCardGlobal.selectedServiceAmount) }}
                    </div>
                </div>       -->
            </template>
            
            <template v-if="giftCardGlobal.selectionType==='dollar-amount'">
                <div class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-2">
                    <div class="text-left">
                        Dollar Amount
                    </div>
                    <div class="text-right">
                        {{ filterCurrency(giftCardGlobal.dollarAmount) }}
                    </div>
                </div>
            </template>
            <!-- {{ giftCardGlobal.selectedServiceAmount }} -->

            <div v-if="giftCardGlobal.tipTotal !== 0" class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-1">
                <div class="text-left">
                    Gratuity
                </div>
                <div class="text-right">
                    {{ filterCurrency(giftCardGlobal.tipTotal) }}
                </div>
            </div>

            <div v-if="giftCardGlobal.salesTax !== 0" class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-1">
                <div class="text-left">
                    Sales Tax
                </div>
                <div class="text-right">
                    {{ filterCurrency(giftCardGlobal.salesTax) }}
                </div>
            </div>

            <div v-if="giftCardGlobal.tipTotal !== 0 || giftCardGlobal.salesTax !==0" class="w-full max-w-2xl mx-auto grid grid-cols-2 px-3 pt-1 font-bold">
                
                <div class="text-left uppercase">
                    Total
                </div>
                <div class="text-right">
                    {{ filterCurrency(giftCardGlobal.spaAmount + giftCardGlobal.dollarAmount + giftCardGlobal.selectedServiceAmount + giftCardGlobal.tipTotal + giftCardGlobal.salesTax) }}
                </div>
            </div>
        </section>

         <div class="text-red-500 text-lg font-bold w-full max-w-2xl mx-auto text-center">
            {{ state.errorMessage }}
        </div>
        
        <div class="text-center w-full max-w-2xl mx-auto pt-4">
            <Button class="w-1/2 md:w-1/3 bg-primary-500" @click="addToCart()">Add To Cart</Button>
        </div>
    </section>
</template>

<script setup>
    import InputNumber from '@/volt/InputNumber.vue';
    import { giftCardGlobal } from '~/composables/giftCardGlobal';
    import RadioButton from '@/volt/RadioButton.vue'
    import InputText from '@/volt/InputText.vue'
    import Select from '@/volt/Select.vue'
    import Checkbox from '@/volt/Checkbox.vue'
    import Textarea from '@/volt/Textarea.vue'
    import Button from '@/volt/Button.vue';
    import { useToast } from 'primevue/usetoast';

    const { roundTo, validateEmail } = useMiscFunctions();
    const { filterCurrency } = useFilters();
    const router = useRouter();
    const toast = useToast();

    const state = reactive({
        address: '', 
        cityStateZip: '',
        errorMessage: ''        
    })

    
    const tipPercent = ref(0)

    watch(tipPercent, (newVal, oldVal) => {
    
        if (newVal === 0) {
            giftCardGlobal.tipTotal = 0;
        } else {
            giftCardGlobal.tipTotal = roundTo((giftCardGlobal.dollarAmount + giftCardGlobal.spaAmount + giftCardGlobal.selectedServiceAmount) * (newVal / 100),2);
        }
    })

    const maxChars = 200 // or whatever your limit is

    const remainingChars = computed(() =>
        maxChars - giftCardGlobal.personalMessage.message.length
    )

    onMounted(() => {

        scrollToGCStart();
    })

    function scrollToGCStart() {
        // document.getElementById('personalize-gift-card').scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start' // can also be 'center', 'end', or 'nearest'
        // })

        const el = document.getElementById('personalize-gift-card')
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 165 // offset 100px for sticky header
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    function getAddress(loca) {
        let location = giftCardGlobal.locations.find(l => l.locationCode == loca.value);
        state.address = location.address;
        state.cityStateZip = location.cityState;
    }

    function validate() {
        state.errorMessage = '';

        if (giftCardGlobal.deliveryMethod === '') {
            state.errorMessage = 'Please select a delivery method.'
            return false;
        }    

        if (giftCardGlobal.deliveryMethod === 'E') {
            if (giftCardGlobal.printName.trim() === '') {
                state.errorMessage = 'For Email/Online delivery please enter the name of the person receiving the gift card.'
                return false;
            } 

            if (giftCardGlobal.printName.trim().includes(' ') === false) {
                state.errorMessage = 'For Email/Online delivery please enter the FULL name person receiving the gift card.'
                return false;
            }

            if (giftCardGlobal.recipientEmail.trim() !== '') {
                if (validateEmail(giftCardGlobal.recipientEmail.trim()) === false) {
                    state.errorMessage = 'Please enter valid email for the recipient.'
                    return false;
                }
            }            
        }

        if (giftCardGlobal.deliveryMethod === 'P') {
            if (giftCardGlobal.pickUpLocationCode === null) {
                state.errorMessage = 'Please select a Pickup Location.'
                return false;
            }
        }

        if (giftCardGlobal.deliveryMethod === 'M') {
            if (giftCardGlobal.mailingAddress.name.trim() === '' ||
                giftCardGlobal.mailingAddress.address.trim() === '' ||
                giftCardGlobal.mailingAddress.city.trim() === '' ||
                giftCardGlobal.mailingAddress.zipCode.trim() === '') {
                state.errorMessage = 'For US Mail delivery, please complete all address information.'
                return false;
            }
        }

        if (giftCardGlobal.personalMessage.to === '' ||
            giftCardGlobal.personalMessage.from === '') {
                state.errorMessage = 'For Personal Message, please enter To Name and From Name'
                return false;
        }




        return true;
    }

    function checkIfCurbSideSameLocation() {
        if (giftCardGlobal.isCurbSide === true) {
            for (const webOrderGC of giftCardGlobal.webOrderGCs) {
                if (webOrderGC.isCurbSide && webOrderGC.pickUpLocationCode !== '' && webOrderGC.pickUpLocationCode !== giftCardGlobal.pickUpLocationCode) {
                    
                    let location = giftCardGlobal.locations.find(l => l.locationCode == webOrderGC.pickUpLocationCode);
                    let message = 'You already have a curbside pickup on another gift card at ' + location.extendedDescription.trim() + ', cannot have curbside pickup at more than one location';
                    toast.add({severity: 'warn', summary: 'Oops', detail: message});
                    setTimeout(() => giftCardGlobal.isCurbSide = false, 150);
                    break;
                }
            }
        }
    }

    async function addToCart() {
        if (validate() === false) {
            return;
        }

        await giftCardGlobal.putWebOrderGCAddToCart();

        giftCardGlobal.clearGiftCard();

        router.push('/shop/gift-cards/cart');

    }
</script>

<style scoped></style>