<template>
  <Dialog v-model:visible="accountGlobal.showVerify" class="w-full mx-3 md:w-[650px]" :modal="true" :showHeader="false">
    <div class="grid md:ml-7 lg:mx-7 pt-4 text-center">
      <div class="col-span-12 justify-center">
        <h1 class="inline font-sans text-2xl lg:text-3xl"> Please Verify </h1>
      </div>
    </div>
    <template v-if="accountGlobal.verifyStep === 'text'">
      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <h2 class="inline font-sans text-xl lg:text-2xl"> {{ state.verifyMessage }} </h2>
        </div>
      </div>
      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <div class="grid grid-cols-12">
            <div class="col-span-2 text-right"><i class="pi pi-mobile" style="font-size: 2.5rem" aria-label="Text Verification"></i></div>
            <div class="col-span-7 text-left">
              <InputText id="mobile-number" class="text-input w-full" v-model="state.mobileNumber"
                aria-label="Enter Mobile Phone Number" />
            </div>
            <div class="col-span-3 text-left pl-2"> <Button label="Send" id="submitButton" class="uppercase style-button"
                aria-label="Send text to mobile number" @click="sendVerificationText" /> </div>
          </div>
        </div>
      </div>

      <div v-if="props.showLogin==='true'" class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <div class="text-2xl text-blue-600 cursor-pointer" @click="accountGlobal.verifyStep = 'login'">Current Customer?
            Login</div>
        </div>
      </div>

    </template>

    <template v-if="accountGlobal.verifyStep === 'code'">
      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <h2 class="inline font-sans text-xl lg:text-2xl">
            Enter the code you received in your text message and click Verify.
          </h2>
        </div>
      </div>

      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <div class="grid grid-cols-12">
            <div class="col-span-7 text-right">
              <InputText id="mobile-number" class="text-input" v-model="state.verificationCode" />
            </div>
            <div class="col-span-5 text-left pl-3">
              <Button label="Verify" id="submitButton" class="uppercase style-button" @click="verify()" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:ml-7 lg:mx-7 pt-2 text-center justify-center">
        <div class="col-span-12 items-center md:w-[600px]">
          <div class="inline font-sans text-xl lg:text-2xl text-blue-600 cursor-pointer" @click="retry()">
            Retry
          </div>
        </div>
      </div>
    </template>

    <template v-if="accountGlobal.verifyStep === 'login'">
      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="grid grid-cols-12 col-span-12 items-center md:w-[600px]">
          <div class="col-span-2 text-left pt-1">
            <!-- <div class="pi pi-chevron-left cursor-pointer text-2xl" @click="accountGlobal.verifyStep = 'text'"><</div> -->
             <Button label="<" class="absolute top-0 px-4 left-3 lg:left-1/8 xl:left-1/4" rounded severity="secondary"
    aria-label="Back" @click="accountGlobal.verifyStep = 'text'" />
          </div>
          <div class="col-span-8 text-center font-sans">
            <div class="inline font-serif text-xl lg:text-2xl">
              Login
            </div>
          </div>

        </div>
      </div>
      <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
        <div class="col-span-12 items-center md:w-[400px]">
          <div class="grid">
            <div class="col-span-12 text-left">
              <InputText id="email" class="text-input w-full" v-model="state.email" placeholder="Email" />
            </div>
            <div class="flex col-span-12 text-left mt-3">
              <Password id="password" class="text-input" v-model="state.password" :feedback="false" placeholder="Password" toggleMask />
            </div>
            <div class="col-span-12">
              <div class="inline text-xl lg:text-2xl text-red-600 font-bold">{{ state.loginErrorMessage }}
              </div>
            </div>
            <div class="col-span-12 mt-4">
              <Button label="Login" id="loginButton" class="uppercase style-button" @click="login" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="grid md:ml-7 lg:mx-7 pt-2 text-center justify-center">
      <div class="col-span-12 items-center md:w-[600px]">
        <div class="inline font-sans text-xl lg:text-2xl text-red-600 font-bold cursor-pointer" @click="retry()">
          {{ accountGlobal.verifyErrorMessage }}
        </div>
      </div>
    </div>

    <div class="grid md:ml-7 lg:mx-7 pt-4 text-center justify-center">
      <div class="col-span-12 items-center md:w-[600px]">
        <Button label="Cancel" id="cancelButton" class="uppercase style-button" @click="cancel()" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { accountGlobal } from '~/composables/accountGlobal';
import { bookGlobal } from '~/composables/bookGlobal';

import Button from '@/volt/Button';
import Dialog from '@/volt/Dialog';
import InputText from '@/volt/InputText';
import Password from '@/volt/Password';


const props = defineProps({
  showLogin: {
    type: String,
    default: 'true'
  },
  message: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
    default: ''
  },
  returnCodeOnly : {
    type: String,
    default: 'false'
  }
});

const emit = defineEmits(['didVerify'])

const { putCustomerLogin } = useCustomer();

const state = reactive({
  verifyMessage: 'To reserve your appointment enter your mobile phone number and we will send you a text verfication code.',
  mobileNumber: '',
  verificationCode: '',
  email: '',
  password: '',
  loginErrorMessage: ''
});

watch(
  () => accountGlobal.showVerify,
  (isVisible) => {
    if (isVisible) {
      state.mobileNumber = props.mobileNumber ?? '';
    }
  }
);

onMounted(() => {
  if (props.message) {
    state.verifyMessage = props.message;
  }
});

accountGlobal.verifyErrorMessage = '';

async function sendVerificationText() {


  let hasAppointment = await bookGlobal.hasAppointmentByPhone(state.mobileNumber);

  if (hasAppointment === true) {
    accountGlobal.verifyErrorMessage = 'There is another appointment booked under this phone number, please call 614-538-5800 to adjust your appointment.';
    return;
  }

  let didSend = await accountGlobal.sendVerificationText(state.mobileNumber);
  if (didSend) {
    accountGlobal.verifyStep = 'code'
  }
}

async function verify() {
  accountGlobal.verifyErrorMessage = '';

  if (props.returnCodeOnly==='true') {
    accountGlobal.textCode = state.verificationCode;
    accountGlobal.showVerify = false;
    accountGlobal.mobilePhone = state.mobileNumber;
    accountGlobal.verifySuccess = true;
    accountGlobal.verifyStep = 'text'
    state.verificationCode = '';
    emit('didVerify', true);
    return;
  }

  let didVerify = await accountGlobal.verify(state.verificationCode);

  if (didVerify === true) {
    accountGlobal.showVerify = false;
    accountGlobal.mobilePhone = state.mobileNumber;
    accountGlobal.verifySuccess = true;
    accountGlobal.verifyStep = 'text'
    state.verificationCode = '';

    emit('didVerify', true);
  } else {
    state.verificationCode = '';
    accountGlobal.verifyErrorMessage = 'Verification Failed';
  }
}

async function cancel() {
  accountGlobal.verifyStep = 'text'
  accountGlobal.showVerify = false;
  emit('didVerify', false);
}

function retry() {
  accountGlobal.verifyErrorMessage = '';
  accountGlobal.verifyStep = 'text';
}

async function login() {
  state.loginErrorMessage = ''

  if (state.email === '') {
    state.loginErrorMessage = 'Email cannot be blank';
    return;
  } else if (state.password === '') {
    state.loginErrorMessage = 'Password cannot be blank';
    return;
  }

  let customer = await putCustomerLogin(state.email, state.password);

  if (customer.customerId === 0) {
    state.loginErrorMessage = 'Login Failed';
    return;
  }

  accountGlobal.customerCode = customer.customerCode;

  accountGlobal.verifySuccess = true;
  accountGlobal.loginSuccessful = true;

  accountGlobal.showVerify = false;

  emit('didVerify', true);
}

</script>

<style scoped>
.standard-size-container {
  max-width: 700px;
}
</style>
