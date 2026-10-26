<template>
    <section class="lg:hidden bg-primary-900 w-full h-[95px] lg:h-[120px] flex items-end">
        <GoldLine />
    </section>

    <div
        class="relative flex items-center justify-center min-h-[280px] w-full overflow-hidden pt-24 lg:min-h-[360px] lg:pt-40">
        <img src="/images/icons/k-icon-light.webp" alt="" aria-hidden="true"
            class="pointer-events-none absolute -top-20 -left-10 z-0 h-[160%] w-auto opacity-30" />

        <div class="relative z-10 flex items-center justify-center px-4">
            <h1
                class="k-header-text-shadow text-center text-2xl font-thin uppercase leading-tight text-primary-100 md:text-3xl lg:text-8xl">
                Customer Find
            </h1>
        </div>
    </div>

    <GoldLine />

    <div class="bg-primary-100 text-primary-900">
        <template v-if="state.step === 'entry'">
            <div class="px-3 pt-7 text-center text-2xl font-bold">
                Please enter as much information as you can so we can find your customer record.
            </div>

            <div class="mt-2 text-center text-lg">
                (Current Customers Only)
            </div>

            <div class="mt-6 flex justify-center">
                <div class="w-full max-w-md px-4 text-left">
                    <div class="mt-3 flex flex-col">
                        <label for="firstName" class="mb-1 text-sm font-medium">*First Name</label>
                        <InputText id="firstName" v-model="state.firstName" class="w-full" maxlength="15" />
                    </div>

                    <div class="mt-3 flex flex-col">
                        <label for="lastName" class="mb-1 text-sm font-medium">*Last Name</label>
                        <InputText id="lastName" v-model="state.lastName" class="w-full" maxlength="15" />
                    </div>

                    <div class="mt-3 flex flex-col">
                        <label for="email" class="mb-1 text-sm font-medium">Email</label>
                        <InputText id="email" v-model="state.email" class="w-full" maxlength="100" />
                    </div>

                    <div class="mt-3 flex flex-col">
                        <label for="address" class="mb-1 text-sm font-medium">Street Address</label>
                        <InputText id="address" v-model="state.address" class="w-full" maxlength="30" />
                    </div>

                    <div class="mt-3 flex flex-col">
                        <label for="cellPhone" class="mb-1 text-sm font-medium">Cell Phone</label>
                        <InputText id="cellPhone" v-model="state.cellPhone" class="w-full" maxlength="20" />
                    </div>

                    <div class="mt-3 text-center text-lg font-bold text-red-600" v-html="state.errorMessage" />

                    <div class="mt-4 flex justify-center">
                        <Button label="Submit" id="submitButton"
                            class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10"
                            @click="submitInfo()" />
                    </div>
                </div>
            </div>
        </template>

        <template v-if="state.step === 'found'">
            <div class="flex w-full justify-center text-center sans-serif">
                <div class="mt-4 w-full max-w-5xl py-1 pl-2 text-left">
                    <Button class="link-button-black" @click="state.step = 'entry'" label="Back" />
                </div>
            </div>

            <div class="mt-5 text-center text-2xl font-bold">
                Is this you?
            </div>

            <div class="mt-1 flex justify-center text-center md:text-lg">
                <div v-html="state.foundHTML" class="mt-4 w-full max-w-[600px] px-4 py-1 text-left" />
            </div>

            <div class="mt-6 flex justify-center">
                <div class="w-full max-w-md px-4 text-left">
                    <div class="flex flex-col">
                        <label for="email2" class="mb-1 text-sm font-medium">User Name (email)</label>
                        <InputText id="email2" v-model="state.userName" class="w-full" maxlength="100" />
                    </div>
                </div>
            </div>

            <div class="mt-1 text-center text-lg font-bold text-red-600">
                {{ state.foundError }}
            </div>

            <div class="mt-4 flex justify-center text-center">
                <Button label="This Is Me" id="thisIsMeButton"
                    class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10"
                    @click="thisIsMe()" />
            </div>

            <div class="mt-2 mb-5 px-4 text-center">
                If this is not you, call 614-538-5800 to get a login.
            </div>
        </template>

        <template v-if="state.step === 'failed'">
            <div class="flex w-full justify-center text-center sans-serif">
                <div class="mt-4 w-full max-w-5xl py-1 pl-2 text-left">
                    <Button class="link-button-black" @click="state.step = 'entry'" label="Back" />
                </div>
            </div>

            <div class="flex w-full justify-center text-center sans-serif">
                <div class="mt-6 w-full max-w-5xl px-4 py-1 text-xl">
                    We could not find your customer record, please call 614-538-5800 to get a login.
                </div>
            </div>
        </template>

        <template v-if="state.step === 'success'">
            <div class="flex w-full flex-col items-center justify-center text-center sans-serif">
                <div class="mt-6 w-full max-w-5xl px-4 py-1 text-2xl font-bold">
                    Success!
                </div>

                <div class="mt-6 w-full max-w-5xl px-4 py-1 text-xl">
                    Your login information was sent to {{ state.userName }}.
                </div>

                <div class="mt-6 py-1 text-xl">
                    <a class="link-button-gold text-md uppercase" href="https://kenneths.com/app/">
                        Log In
                    </a>
                </div>
            </div>
        </template>

        <div v-if="state.step === 'entry' || state.step === 'failed'" class="mt-5 px-4 pb-6 text-center text-lg">
            <a href="/book/new/servic-type?d=DFV">
                New To Kenneth's? Book Now And Save 20%
            </a>
        </div>

        <verify-form @didVerify="didVerify" showLogin="false"
            message="To receive your login information, enter your mobile phone number and we will send you a text verfication code" />
    </div>
</template>

<script setup>
import InputText from '@/volt/InputText.vue';
import Button from '@/volt/Button.vue';

import { accountGlobal } from '~/composables/accountGlobal';

const { getCustomerFind,
    getCustomer } = useCustomer();

const { getLastApointmentDetail } = useAppointmentBook();

const { stripPhone,
    validateEmail } = useMiscFunctions();

const state = reactive({
    step: 'entry',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    cellPhone: '',
    homePhone: '',
    errorMessage: '',
    foundHTML: '',
    customerCode: '',
    userName: '',
    foundError: '',
    verifiedCell: ''
});

const headerTitle = 'Customer Find'
const description = 'Find an Existing Customer'

useHead({
    title: headerTitle,
    meta: [
        {
            name: 'description',
            content: description
        },
        {
            name: 'robots',
            content: 'noindex, follow'
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: headerTitle
        },
        {
            property: 'og:description',
            content: description
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/customer-find'
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
            content: headerTitle
        },
        {
            name: 'twitter:description',
            content: description
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
async function submitInfo() {

    state.errorMessage = '';

    //validate
    if (state.firstName.trim() === '' || state.lastName.trim() === '') {
        state.errorMessage = '*Must enter first and last name';
        return;
    }

    if (state.address.trim() + state.cellPhone.trim() + state.email.trim() === '') {
        state.errorMessage = '*Must enter at least one more piece of information for our search.';
        return;
    }


    let strippedCellPhone = '';

    if (state.cellPhone.trim() !== '') {

        let strippedCellPhone = stripPhone(state.cellPhone)
        if (strippedCellPhone.length !== 10) {
            state.errorMessage = '*Please enter a valid 10 digit home phone number';
            return;
        }
    }

    if (state.email.trim() !== '') {
        if (validateEmail(state.email) === false) {
            state.errorMessage = '*Email is not valid';
            return;
        }
    }

    let custFindParametersViewModel = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        address: state.address,
        homePhone: state.homePhone,
        cellPhone: strippedCellPhone
    }

    let customerFinds = await getCustomerFind(custFindParametersViewModel)

    if (customerFinds.length === 0) {
        state.step = 'failed';
        return;
    }

    state.userName = state.email;

    state.customerCode = customerFinds[0].customerCode;

    //get found info
    let customer = await getCustomer(customerFinds[0].customerCode);

    let lastApptDetails = await getLastApointmentDetail(customerFinds[0].customerCode);

    let html = '<table>'
    html += '<tr>'
    html += '<td class="font-bold text-right pr-2">Name: </td>'
    html += '<td class="text-left">' + customer.fullname + '<td>'
    html += '</tr>'

    if (customer.email.trim() !== '') {
        state.userName = customer.email;

        html += '<tr>'
        html += '<td class="font-bold text-right pt-2 pr-2">Email: </td>'
        html += '<td class="text-left pt-2">' + customer.email + '<td>'
        html += '</tr>'
    }

    if (customer.zipCode.trim() !== '') {
        html += '<tr>'
        html += '<td class="font-bold text-right pt-2 pr-2">Zip Code: </td>'
        html += '<td class="text-left pt-2">' + customer.zipCode + '<td>'
        html += '</tr>'
    }

    if (lastApptDetails.trim() !== '') {
        html += '<tr>'
        html += '<td class="font-bold text-right pt-2 pr-2" style="width: 160px" style="vertical-align: top; white-space: nowrap">Last Appointment: </td>'
        html += '<td class="text-left pt-2" style="vertical-align: top; max-width: 300px">' + lastApptDetails + '<td>'
        html += '</tr>'
    }

    html += '</table>'

    state.foundHTML = html

    state.step = 'found'

}

async function thisIsMe() {
    state.foundError = '';
    if (validateEmail(state.userName) === false) {
        state.foundError = '*Enter valid email address for User Name';
        return;
    }

    if (accountGlobal.verifySuccess === false) {
        accountGlobal.showVerify = true;
    } else {
        await didVerify(true)
    }


}

async function didVerify(verified) {

    if (verified === true) {

        let strippedPhone = stripPhone(accountGlobal.mobilePhone)

        //send email
        let sendNewLoginParametersViewModel = {
            customerCode: state.customerCode,
            email: state.userName,
            cellPhone: strippedPhone
        }
        let returnMessage = await accountGlobal.sendNewLoginInformation(sendNewLoginParametersViewModel);

        if (returnMessage !== '') {
            state.foundError = returnMessage;
            return;
        }

        state.step = 'success';
    }
}

</script>

<style scoped></style>