<template>
  <Dialog
    v-model:visible="accountGlobal.showLogin"
    :modal="true"
    :showHeader="false"
    class="font-sans"
    :pt="{
      mask: 'bg-black/60 backdrop-blur-sm',
      root: 'w-[92vw] max-w-xl rounded-2xl border border-white/10 bg-white text-primary-900 shadow-2xl',
      content: 'p-6 sm:p-8',
    }"
  >
    <!-- Close -->
    <Button
      v-if="showCloseButton === 'true'" 
      aria-label="Close login dialog"
      @click="accountGlobal.showLogin = false">X</Button>



    <!-- Title -->
    <div class="text-center">
      <h2 class="text-xl sm:text-2xl">
        Login
      </h2>
    </div>

    <!-- Form -->
    <div class="mt-6 space-y-4">
      <div class="text-left">
        <label for="email" class="sr-only">Email</label>
        <InputText
          inputId="email"
          v-model="state.email"
          placeholder="Email"
          class="w-full"
          autocomplete="email"
        />
      </div>

      <div class="text-left">
        <label for="password" class="sr-only">Password</label>
        <Password
          inputId="password"
          v-model="state.password"
          placeholder="Password"
          :feedback="false"
          toggleMask
          class="w-60"
          autocomplete="current-password"
        />
      </div>

      <div
        v-if="state.loginErrorMessage"
        class="text-center text-base sm:text-lg font-bold text-red-500"
        role="alert"
        aria-live="polite"
      >
        {{ state.loginErrorMessage }}
      </div>

      <div class="pt-1 text-center">
        <Button
          label="Login"
          id="loginButton"
          class="w-full uppercase"
          @click="login"
        />
      </div>
    </div>

    <!-- Verify error / retry -->
    <div class="mt-6 text-center">
      <button
        v-if="accountGlobal.verifyErrorMessage"
        type="button"
        class="text-base sm:text-lg font-bold text-red-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-primary-100)] rounded"
        @click="retry()"
      >
        {{ accountGlobal.verifyErrorMessage }}
      </button>
    </div>

    <div class="mt-4 text-center text-sm uppercase tracking-widest text-white/70">
      Or
    </div>

    <!-- Cancel / New customer -->
    <div class="mt-4 text-center">
      <Button
        :label="cancelButtonText"
        id="cancelButton"
        class="w-full uppercase"
        @click="newCustomer()"
      />
    </div>
  </Dialog>
</template>

<script setup>
import Button from '@/volt/Button'
import Dialog from '@/volt/Dialog'
import InputText from '@/volt/InputText'
import Password from '@/volt/Password'

import { accountGlobal } from '~/composables/accountGlobal'
import { useCustomer } from '~/composables/useCustomer'

const { cancelButtonText, showCloseButton } = defineProps([
  'cancelButtonText',
  'showCloseButton',
])

const emit = defineEmits(['didLogin'])

const { putCustomerLogin, getCustomer } = useCustomer()

const state = reactive({
  email: '',
  password: '',
  loginErrorMessage: '',
})

accountGlobal.verifyErrorMessage = ''

async function newCustomer() {
  accountGlobal.showLogin = false
  emit('didLogin', false)
}

// NOTE: your template calls retry(), but it wasn't included in the original script.
// Keeping the call as-is; add your real retry logic here if needed.
function retry() {
  // placeholder: optionally clear verify error or re-run verification
  accountGlobal.verifyErrorMessage = ''
}

async function login() {
  state.loginErrorMessage = ''

  if (state.email === '') {
    state.loginErrorMessage = 'Email cannot be blank'
    return
  } else if (state.password === '') {
    state.loginErrorMessage = 'Password cannot be blank'
    return
  }

  let customer = await putCustomerLogin(state.email, state.password)

  if (customer.customerId === 0) {
    if (customer.customerCode !== '') {
      state.loginErrorMessage = 'Online account disabled, please call 614-538-5800'
    } else {
      state.loginErrorMessage = 'Login Failed'
    }
    return
  }

  accountGlobal.customerCode = customer.customerCode
  accountGlobal.customer = await getCustomer(customer.customerCode)
  accountGlobal.loginSuccessful = true
  accountGlobal.verifySuccess = true
  accountGlobal.hasCustomerViewModel = true

  accountGlobal.showLogin = false
  emit('didLogin', true)
}
</script>
