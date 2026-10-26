<template>
    <div v-if="state.isVisible">
        <Dialog
            v-model:visible="dataGlobal.showFirstTimerCouponPopUp"
            :modal="true"
            header="&nbsp;"
            class="p-0 m-5 !rounded-none"
            :style="{ width: '50rem' }"
        >
            <div class="grid grid-cols-12 p-0 m-0 bg-primary-900 text-primary-100">

                <!-- IMAGE LEFT -->
                <div class="pop-up-image col-span-12 md:col-span-6 p-0 m-0">
                    <img
                        src="/images/home/first-time-visit-savings.webp"
                        alt="Best Hair Salon Columbus"
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- CONTENT RIGHT -->
                <div class="flex col-span-12 md:col-span-6 text-center p-0 m-0">
                    <div class="grid justify-center py-6 px-6 gap-4">
                        
                        <div class="col-span-12 text-3xl bold uppercase">
                            Unlock 20% Off Your First Visit!
                        </div>

                        <div class="col-span-12 text-base">
                            Experience the Kenneth's difference with an exclusive 20% discount on your first appointment. We're confident you'll love the care, quality, and results of your service. Schedule today to claim your special offer!
                        </div>

                        <div class="col-span-12">
                            <Button
                                class="uppercase text-xl"
                                aria-label="Book Now To Receive 20% Off"
                                label="Book Now"
                                @click="bookNow();"
                            />
                        </div>

                        <div class="col-span-12 text-xs">
                            *Restrictions: This offer is not valid on any hair extension services and cannot be combined
                            with other offers. One discount code per customer and will only be accepted on
                            <b>first time appointments</b> at Kenneth's
                        </div>

                    </div>
                </div>

            </div>
        </Dialog>

        <div
            id="badge-coupon"
            v-show="dataGlobal.showFirstTimerCouponPopUp === false"
            class="bounce circle-coupon"
        >
            <img
                src="/images/home/first-time-visit-coupon.webp"
                aria-label="Click to open popup for 20% off your first visit"
                alt="20 percent off your first visit"
                style="width: 100%"
                @click="showPopUp"
            />
        </div>
    </div>
</template>

<script setup>
import Button from '@/volt/Button';
import Dialog from '@/volt/Dialog';

import { dataGlobal } from '~/composables/dataGlobal';
import { useLocalStorage } from '~/composables/useLocalStorage';
const route = useRoute()
const router = useRouter();

const state = reactive({
    isVisible: false,
    isOrganic: false
});

onMounted(async () => {

    const { getNewBookingCompleted, getMarketingDiscountCode } = useLocalStorage();
    let newBookingCompleted = await getNewBookingCompleted();  //this is marked true if user has used booknew on browser b4

    let marketingDiscountCode = await getMarketingDiscountCode();

    if (route.path.includes('/shop/')) {    //this hides pop up marketing on these paths
        state.isVisible = false;
    } else if (route.path.includes('/book')) {  //this hides pop up marketing on these paths
        state.isVisible = false;
    } else if (route.path.includes('/careers/')) {  //this hides pop up marketing on these paths
        state.isVisible = false;
    } else if (route.path.includes('/model')) {  //this hides pop up marketing on these paths
        state.isVisible = false;
    } else if (route.path.includes('/promo/')) {  //this hides pop up marketing on these paths
        state.isVisible = false;
    } else if (route.path.includes('/locations/') && (route.path.split("/").length - 1) >= 3) { //hides on geo stack pages
        state.isVisible = false;
    } else if (route.path.includes('/locations/academy')) {
        state.isVisible = false;
    } else if (route.path.includes('/service-guide/spa/bar')) {
        state.isVisible = false;
    } else if (route.path.includes('service-menu')) {
        state.isVisible = false;
    } else if (route.path.includes('/our-team/profile')) {
        state.isVisible = false;
    } else if (route.path.includes('hair-quiz')) {
        state.isVisible = false;
    } else if (route.path.includes('customer-find')) {
        state.isVisible = false;
    } else if (newBookingCompleted === '1') {
        state.isVisible = false;
    } else if (marketingDiscountCode !== '') {   //discount code passed in from marketing link...see default.vue where it is gathered 
        state.isVisible = true;
    }
    else {
        state.isVisible = true; //was told to remove the 20% off coupon (was true) //put back in place 8/4/2024
        state.isOrganic = true;
    }

    // Bounce every 10 seconds

    if (state.isVisible === true) {
        setInterval(bounceElement, 8000);
    }

});



function bounceElement() {
    const element = document.getElementById('badge-coupon');
    if (element !== null) {
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 2000); // Remove the class after 1 second
    }
}


function bookNow() {
    if (state.isOrganic) {
        router.push('/book/new/service-type?d=DFV');
    } else {
        router.push('/book/new/service-type');
    }

}

function showPopUp() {
    dataGlobal.showFirstTimerCouponPopUp = true;
}
</script>

<style scoped>
@media only screen and (max-width: 569px) {
    .pop-up-image {
        display: none;
    }

}

.circle-coupon {
    width: 100%;
    position: fixed;
    bottom: 39px;
    left: 15px;
    background-color: white;
    color: white;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid white;
    cursor: pointer;
    z-index: 600;
}


@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0);
    }
}

.bounce {
    animation: bounce 2s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
}
</style>