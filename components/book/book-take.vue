<template>
    <Button label="<" id="buttonBack" class="absolute top-1 px-4 left-3 lg:left-1/8 xl:left-1/4" rounded
        severity="secondary" aria-label="Back" @click="router.go(-1)" />

    <template v-if="bookGlobal.book.takeError === false">
        <template v-if="state.appointmentsToCancel.length > 0">
            <div class="grid grid-cols-1 text-center px-3  mt-4 mx-auto lg:w-[600px] xl:w-[800px] text-xl lg:text-2xl">
                <div class="grid-span-12 justify-center mb-1 font-bold">
                    *Before you can take this appointment, you must cancel the following appointment(s) first:
                </div>

                <div v-for="appt in state.appointmentsToCancel" :key="appt.services"
                    class="rounded-sm border border-solid border-gray-300 bg-gray-100 py-2 pl-2 m-2">
                    {{ appt.serviceDescription }} w/ {{ appt.technicianName }} @ {{ appt.locationName }} on {{
                        filterDateTimeToDate(appt.appointmentDate) }} @ {{ appt.apptTime }}
                </div>

                <div class="mt-4">
                    <Button @click="cancelAppointments()">Cancel Appointments</Button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="grid grid-cols-1 text-center px-3">
                <div
                    class="grid grid-span-12 grid-cols-12 justify-center items-center mt-4 mx-auto lg:w-[600px] xl:w-[800px] text-xl lg:text-2xl">
                    <template v-if="accountGlobal.loginSuccessful === false">
                        <div class="col-span-4 text-right"> Full Name: </div>
                        <div class="col-span-8 text-left pl-2">
                            <InputText id="full-name" class="text-input" v-model="bookGlobal.takeStep.fullName" :disabled="bookGlobal.takeStep.fullNameDisabled"
                                placeholder="first and last" style="max-width: 400px;" />
                        </div>

                        <div class="col-span-12">
                            <Select id="marketingSource" class="service-dropdown mt-2"
                                v-model="state.selectedMarketingSourceId" :options="state.marketingSources"
                                placeholder="How did you hear about us?" optionLabel="sourceDescription"
                                optionValue="marketingSourceId" style="max-width: 550px;" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="col-span-12">
                            {{ accountGlobal.customerName }}
                        </div>
                    </template>

                    <div class="col-span-5 text-right p-2">
                        Date:
                    </div>
                    <div class="col-span-7 text-left p-2">
                        {{
                            filterDateTimeToDate(bookGlobal.selectedOpening.takeAppointmentParameters[0].appointmentDate)
                        }}
                    </div>

                    <div class="col-span-5 text-right p-2">
                        Start Time:
                    </div>
                    <div class="col-span-7 text-left p-2">
                        {{ bookGlobal.selectedOpening.apptTime }}
                    </div>

                    <div class="col-span-5 text-right p-2">
                        Location:
                    </div>
                    <div class="col-span-7 text-left p-2">
                        {{ bookGlobal.selectedLocation.extendedDescription }}
                    </div>

                    <div class="col-span-5 text-right p-2">
                        Services:
                    </div>
                    <div class="col-span-7 text-left p-2">
                        <div v-html="bookGlobal.takeStep.serviceAndTechnician"></div>
                        <div v-show="bookGlobal.discountService.serviceCode !== ''">{{
                            bookGlobal.discountService.description }}</div>
                    </div>

                    <template v-if="state.shampooBowlMessage !== ''">
                        <div class="col-span-5 text-right p-2">
                            *
                        </div>
                        <div class="col-span-7 text-left p-2 text-red-600">
                            {{ state.shampooBowlMessage }}
                        </div>
                    </template>

                    <div v-if="bookGlobal.isMarketing === true && bookGlobal.discountService.description === ''"
                        class="col-span-5 text-right p-2">
                        Special:
                    </div>
                    <div v-if="bookGlobal.isMarketing === true && bookGlobal.discountService.description === ''"
                        class="col-span-7 text-left p-2">
                        <div>{{ bookGlobal.webMarketing.webMarketingHd.marketingSubject }}</div>
                    </div>

                    <div class="col-span-12 text-center text-red-600 font-bold p-2">
                        {{ bookGlobal.takeErrorMessage }}
                    </div>

                    <div class="col-span-12 text-center p-2">
                        <Button label="Reserve Apppointment" id="submitButton"
                            class="uppercase style-button bg-primary-900 !text-primary-100 px-7"
                            :disabled="isTakingAppointment"
                            :loading="isTakingAppointment"
                            @click="takeAppointment()" />
                    </div>
                </div>
            </div>
        </template>

    </template>

    <template v-if="bookGlobal.book.takeError === true">
        <div class="grid text-center justify-center pt-2">
            <div class="grid grid-cols-12 justify-center items-center lg:w-[600px] xl:w-[800px]  text-xl lg:text-2xl">
                <div class="col-span-12 text-xl" style="max-width: 700px;"> Appointment Not Taken </div>
            </div>
            <div class="grid grid-cols-12 justify-center items-center lg:w-[600px] xl:w-[800px]  text-xl lg:text-2xl">
                <div class="col-span-12" style="max-width: 700px;" v-html="bookGlobal.book.confirmErrorMessage"> </div>
            </div>
            <div class="grid grid-cols-12 justify-center items-center lg:w-[600px] xl:w-[800px]  text-xl lg:text-2xl">
                <div class="col-span-12" style="max-width: 700px;">
                    <!-- <div class="text-2xl text-blue-600 cursor-pointer" @click="logInAfterTakenError">Login</div> -->
                     <a href="https://kenneths.com/app" class="text-2xl text-blue-600 cursor-pointer">Login</a>
                </div>
            </div>
        </div>
    </template>

    <verify-form @didVerify="didVerify" showLogin="false" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { bookGlobal } from '~/composables/bookGlobal';
import { accountGlobal } from '~/composables/accountGlobal';

import Button from '@/volt/Button';
import Select from '@/volt/Select';
import InputText from '@/volt/InputText';

import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const { putQuizTrack } = useSurveyFactory();

const router = useRouter();
const toast = useToast();

const { getMarketingSources } = useKhsds();

const { getAppointmentsToCancelBeforeBooking,
    putCancelAppointment } = useAppointmentBook();

const { putUpdateQuizBooking } = useSurveyFactory();

const { filterDateTimeToDate } = useFilters();

const state = reactive({
    marketingSources: [],
    selectedMarketingSourceId: 0,
    appointmentsToCancel: [],
    shampooBowlMessage: ''
})

const isTakingAppointment = ref(false);

onMounted(async () => {


    state.marketingSources = await getMarketingSources(1);

    if (accountGlobal.loginSuccessful === false && accountGlobal.verifySuccess === false) {
        console.log(accountGlobal)
        accountGlobal.showVerify = true;
    }

    //check for appointments that need canceled b4 booking
    if (accountGlobal.loginSuccessful === true && accountGlobal.customerCode !== '') {

        let services = bookGlobal.getAllServices();
        state.appointmentsToCancel = await getAppointmentsToCancelBeforeBooking(accountGlobal.customerCode,
            bookGlobal.selectedOpening.takeAppointmentParameters[0].appointmentDate,
            services)

    }


    let showShampooBowlMessage = false;
    let serviceDescription = '';
    state.shampooBowlMessage = '';

    bookGlobal.selectedOpening.takeAppointmentParameters.forEach((a) => {
        if (a.locationCode && a.room.trim() === 'X1') {
            showShampooBowlMessage = true;
            serviceDescription = a.serviceDescription;
        }
    })

    if (showShampooBowlMessage === true) {
        state.shampooBowlMessage = serviceDescription + ' for this time is scheduled in a Shampoo Bowl and not our Facial Room.';
    }

    if (bookGlobal.webMarketing.isQuiz === true) {
        bookGlobal.takeStep.fullName = bookGlobal.webMarketing.quizData.matchInfoViewModel.customerName;
    }

});

function didVerify(verified) {


    if (verified === false) {
        router.go(-1);
        return;
    }

    if (accountGlobal.loginSuccessful === true) {

    }

}

async function cancelAppointments() {

    let didCancel = false;

    for (const a of state.appointmentsToCancel) {
        didCancel = await cancelAppointment(a);
        if (didCancel === false) {
            toast.add({ severity: 'error', summary: 'Oops', detail: 'Something went wrong canceling appointment(s), Please call 614-538-5800 to resolve.' });
            return;
        }
    }

    state.appointmentsToCancel = [];

    toast.add({ severity: 'success', summary: '', detail: 'Appointments canceled, you can now reserve your new appointment', life: 3000 });

    document.getElementById("buttonBack").focus();

}


async function cancelAppointment(appointment) {

    const cancelAppointmentParameters = {
        apptId: appointment.apptId,
        apbksuId: appointment.apbksuId,
        auempl: '170002',
        slot: '@'
    }

    let didCancel = await putCancelAppointment(cancelAppointmentParameters)

    return didCancel;
}

async function takeAppointment() {

    if (isTakingAppointment.value === true) {
        return;
    }

    isTakingAppointment.value = true;

    try {
        bookGlobal.takeErrorMessage = '';
        //let isRequest = false;

        if (accountGlobal.loginSuccessful === false) {  //don't check fullname if logged in
            if (bookGlobal.takeStep.fullName.trim() === '') {
                bookGlobal.takeErrorMessage = '*Please enter first and last name';
                return
            } else if (!bookGlobal.takeStep.fullName.includes(" ")) {
                bookGlobal.takeErrorMessage = '*Please enter first and last name';
                return
            }

            if (state.selectedMarketingSourceId === 0) {
                bookGlobal.takeErrorMessage = '*Please select a "How did you hear about us?" answer.';
                return
            }

            // if (state.selectedMarketingSourceId === 1) {
            //     isRequest = true;
            // }
        }

        bookGlobal.book.hasConfirmError = false;
        bookGlobal.book.confirmErrorMessage = '';
        bookGlobal.book.completed = false;

        //todo, check for another appointment in same week


        if (accountGlobal.mobilePhone.trim() !== '') {
            let hasAppointment = await bookGlobal.hasAppointmentByPhone(accountGlobal.mobilePhone);
            if (hasAppointment === true) {
                bookGlobal.clearBookingData();
                accountGlobal.clearAccount();
                bookGlobal.book.hasConfirmError = true;
                bookGlobal.book.confirmErrorMessage = 'It appears you are a current guest with Kenneth\'s. Please <a href="https://kenneths.com/app">log in</a> to reserve this appointment or call 614-538-5800 to speak to a customer service representative.'
                bookGlobal.book.takeError = true;

                return;
            }

            if (bookGlobal.webMarketing.byPassCustomerChecking === false) {

                let hasHistory = await bookGlobal.hasHistoryByPhoneAndName(accountGlobal.mobilePhone, bookGlobal.takeStep.fullName);
                if (hasHistory === true) {
                    bookGlobal.clearBookingData();
                    accountGlobal.clearAccount();
                    bookGlobal.book.hasConfirmError = true;
                    bookGlobal.book.confirmErrorMessage = 'It appears you are a current guest with Kenneth\'s. Please <a href="https://kenneths.com/app">log in</a> to reserve this appointment or call 614-538-5800 to speak to a customer service representative.'
                    bookGlobal.book.takeError = true;

                    return;
                }

            }

        }

        let customerCode = 'BN0000001';

        if (accountGlobal.loginSuccessful === true) {
            customerCode = accountGlobal.customerCode;
            bookGlobal.takeStep.fullName = accountGlobal.customer.fullname;
        }

        //hair harmony, get next hair harmony customer code
        if (bookGlobal.webMarketing.isQuiz === true) {
            if (accountGlobal.loginSuccessful === true) {
                bookGlobal.webMarketing.quizData.matchInfoViewModel.customerCode = accountGlobal.customerCode;
            }
            bookGlobal.webMarketing.quizData.matchInfoViewModel.mobilePhoneNumber = accountGlobal.mobilePhone;
            bookGlobal.webMarketing.quizData.matchInfoViewModel.expirationDate = bookGlobal.webMarketing.quizData.matchInfoViewModel.expirationDate;
            let objQuizBooking = await putUpdateQuizBooking(bookGlobal.webMarketing.quizData.matchInfoViewModel)
            customerCode = objQuizBooking.customerCode;
            accountGlobal.loginSuccessful = true;
            bookGlobal.takeStep.fullName = bookGlobal.webMarketing.quizData.matchInfoViewModel.customerName;
            await putQuizTrack(bookGlobal.webMarketing.quizTrackingId, 'TK')
        }


        let serviceDiscountCode = '';
        let couponCode = '';
        let expireDate = null;

        if (bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode === 'DPH' ||
            bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode === 'DPS' ||
            bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode === 'DPN' ||
            bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode === 'DPA' ||
            bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode === 'DXA') {

            serviceDiscountCode = bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode;
            couponCode = bookGlobal.webMarketing.webMarketingHd.couponCode;

            let expireDaysOut = bookGlobal.webMarketing.webMarketingHd.expireDaysOut;
            let today = convertDateToDateNoTime(new Date());
            expireDate = convertDateToApiString(addDay(today, expireDaysOut));

        }

        bookGlobal.selectedOpening.takeAppointmentParameters.forEach((a) => {
            // if (accountGlobal.loginSuccessful === false) {
            //     if (a.request === true) {  //only change if request is true, meaning they chose a tech from drop down. (if chose tech, see if they chose 'friend referred', only mark request if so)
            //         a.request = isRequest;
            //     }
            // }

            if (serviceDiscountCode !== '') {
                a.serviceDiscountCode = serviceDiscountCode;
                a.couponCode = couponCode;
                a.expireDate = expireDate;
            }

            a.customerCode = customerCode;
            a.customerName = bookGlobal.takeStep.fullName;
            a.cellPhone = accountGlobal.mobilePhone;
            a.email = accountGlobal.email;
            a.marketingSourceId = state.selectedMarketingSourceId;
            a.application = 'New Customer Booking';
            a.sex = bookGlobal.book.sex;
            a.auempl = 'WEBNEW';

            if (bookGlobal.webMarketing.customerCouponId !== '') {
                a.custCpdsId = parseInt(bookGlobal.webMarketing.customerCouponId);
            }

            if (bookGlobal.discountService.serviceCode !== '') {
                if (a.serviceCode !== 'LBR') {
                    a.serviceCode += bookGlobal.discountService.serviceCode;
                }
            }
            if (bookGlobal.isMarketing === true) {
                a.webMarketingDtId = bookGlobal.webMarketing.webMarketingDtId;
            }
        })

        let takeAppointmentViewModel = await bookGlobal.takeAppointment();

        if (takeAppointmentViewModel?.returnStatus?.trim() === '1') {

            //marketing conversion
            try {
                if (bookGlobal.webMarketing.webMarketingDtId !== 0) {
                    await dataGlobal.putMarketingConversion(bookGlobal.webMarketing.webMarketingDtId, 0, '', takeAppointmentViewModel.customerCode);
                }
            }
            catch (error) {

            }

            await appGlobal.postAppTrackTran(1, takeAppointmentViewModel.customerCode, 9);
            appGlobal.appTrackingTranId = 0;

            bookGlobal.clearBookingData();
            accountGlobal.clearAccount();

            bookGlobal.book.serviceAndTechnician = state.serviceAndTechnician;
            bookGlobal.book.completed = true;
            router.push('/book/new/confirm');
        } else {
            // not booked (API returns an error or 204 only when nothing was reserved); unlock the button
            isTakingAppointment.value = false;
        }

    }
    catch (error) {
        bookGlobal.takeErrorMessage = '*Something went wrong reserving this appointment. Please try again or call 614-538-5800.';
        isTakingAppointment.value = false;
    }

}
</script>

<style scoped></style>
