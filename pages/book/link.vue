<template>
  <div class="font-sans">
    <div class="mx-auto flex justify-center px-4 text-center md:ml-7 lg:mx-7">
      <div class="w-[95%] pt-1 pb-2 text-2xl font-bold lg:w-[60%]">
        Book Your Appointment
      </div>
    </div>

    <template v-if="state.step === 'error'">
      <div class="mx-auto flex justify-center px-4 text-center md:ml-7 lg:mx-7">
        <div class="w-[95%] pt-7 pb-5 text-xl font-bold lg:w-[60%]">
          {{ state.modelApptLink.linkStatus }}
        </div>
      </div>
    </template>

    <template v-if="state.step === 'login'">
      <div class="mx-auto mt-5 flex justify-center px-4 text-center md:ml-7 lg:mx-7">
        <div class="w-[95%] py-1 lg:w-[60%]">
          <Button label="Login" id="loginButton" class="style-button uppercase" style="width: 15rem"
            @click="accountGlobal.showLogin = true" />
        </div>
      </div>

      <div class="mx-auto mt-3 flex justify-center px-4 text-center md:ml-7 lg:mx-7">
        <div class="w-[95%] py-1 lg:w-[60%]">
          OR
        </div>
      </div>

      <div class="mx-auto mt-3 flex justify-center px-4 text-center md:ml-7 lg:mx-7">
        <div class="w-[95%] py-1 lg:w-[60%]">
          <Button label="New Customer" id="newCustomerButton" class="style-button uppercase" style="width: 15rem"
            @click="newCustomer" />
        </div>
      </div>
    </template>

    <template v-if="state.step === 'start'">
      <div class="mx-auto mt-4 flex justify-center px-4 text-center text-lg md:ml-7 lg:mx-7">
        <div class="w-[95%] lg:w-[60%]">
          <div v-if="state.modelApptLink.customerCode === 'BN0000001'" class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right">Full Name</div>
            <div class="col-span-7 text-left">
              <InputText id="full-name" v-model="state.customerName" class="text-input w-full max-w-[400px]"
                placeholder="first and last" />
            </div>
          </div>

          <div v-else class="grid grid-cols-12 items-center py-1">
            <div class="col-span-12 text-center font-bold">
              {{ state.customerName }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Date</div>
            <div class="col-span-7 text-left font-bold">
              {{ filterDateTimeToDate(state.modelApptLink.appointmentDate) }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Location</div>
            <div class="col-span-7 text-left font-bold">
              {{ state.modelApptLink.locationDescription }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Technician</div>
            <div class="col-span-7 text-left font-bold">
              {{ state.modelApptLink.technicianName }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Time</div>
            <div class="col-span-7 text-left font-bold">
              {{ state.modelApptLink.apptTime }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Service</div>
            <div class="col-span-7 text-left font-bold">
              {{ state.modelApptLink.serviceDescription }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Level</div>
            <div class="col-span-7 text-left font-bold">
              {{ state.modelApptLink.modelLevel }}
            </div>
          </div>

          <div class="grid grid-cols-12 items-center py-1">
            <div class="col-span-5 text-right pr-2">Price</div>
            <div class="col-span-7 text-left font-bold">
              Starting at {{ filterCurrency(state.modelApptLink.price) }}
            </div>
          </div>

          <div class="mt-1 py-1 font-bold text-red-600">
            {{ state.takeErrorMessage }}
          </div>

          <div class="mt-1 py-1">
            <Button label="Take Appointment" id="takeButton"
              class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10" @click="takeAppointment" />
          </div>
        </div>
      </div>
    </template>

    <template v-if="state.step === 'confirmation'">
      <div class="mx-auto mt-4 flex justify-center px-4 text-center text-lg md:ml-7 lg:mx-7">
        <div class="mt-5 w-[95%] py-1 lg:w-[60%]">
          <div class="text-center text-xl font-bold">
            {{ state.reservationText }}
          </div>
        </div>
      </div>
    </template>

    <login-form @didLogin="triedToLogin" cancelButtonText="CANCEL" showCloseButton="false" />
  </div>
</template>

<script setup>
import Button from '@/volt/Button';
import InputText from '@/volt/InputText';
import { useToast } from 'primevue/usetoast'

definePageMeta({
  layout: 'basic'
})

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
      key: 'robots',
    }
  ]
})

import { bookGlobal } from '~/composables/bookGlobal'
import { accountGlobal } from '~/composables/accountGlobal'

const toast = useToast()
const route = useRoute()

const {
  filterDateTimeToDate,
  filterCurrency
} = useFilters()

const { getCustomer } = useCustomer()
const { getTechnicianLiteByTechnicianCode } = useKhsds()

const state = reactive({
  step: 'error',
  modelApptLink: {},
  loggedIn: false,
  customerName: '',
  reservationText: '',
  sex: '',
  takeErrorMessage: ''
})

onMounted(async () => {
  const mid = route.query.i

  if (mid === undefined) {
    state.modelApptLink.linkStatus =
      'Hello, this page must be accessed with a link from your stylist/technician.'
    state.step = 'error'
    return
  }

  state.modelApptLink = await bookGlobal.GetModelApptLink(mid)

  if (state.modelApptLink.linkStatus !== '') {
    state.step = 'error'
  } else {
    if (state.modelApptLink.customerCode.trim() !== '') {
      const customer = await getCustomer(state.modelApptLink.customerCode)
      state.customerName = customer.fullname
      state.sex = customer.sex
      state.step = 'start'
    } else {
      state.step = 'login'
    }
  }
})

async function triedToLogin(loggedIn) {
  if (loggedIn === true) {
    state.modelApptLink.customerCode = accountGlobal.customerCode
    state.customerName = accountGlobal.customer.fullname
    state.sex = accountGlobal.customer.sex
    accountGlobal.clearAccount()

    state.step = 'start'
  }
}

async function newCustomer() {
  state.modelApptLink.customerCode = 'BN0000001'
  state.step = 'start'
}

async function takeAppointment() {
  if (state.modelApptLink.customerCode === 'BN0000001') {
    if (state.customerName === '') {
      state.takeErrorMessage = '*Please enter first and last name'
      toast.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter first and last name',
        life: 5000
      })
      return
    } else if (!state.customerName.includes(' ')) {
      state.takeErrorMessage = '*Please enter first and last name'
      toast.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter first and last name',
        life: 5000
      })
      return
    }
  }

  state.takeErrorMessage = ''

  const technician = await getTechnicianLiteByTechnicianCode(
    state.modelApptLink.technicianCode
  )

  const takeAppointmentParameters = []

  const takeAppointmentParameter = {
    customerCode: state.modelApptLink.customerCode,
    customerName: state.customerName,
    appointmentDate: state.modelApptLink.appointmentDate,
    locationCode: state.modelApptLink.locationCode,
    technicianCode: state.modelApptLink.technicianCode,
    technicianName: state.modelApptLink.technicianName,
    technicianType: technician.technicinType,
    technicianLevel: technician.technicianLevel,
    serviceCode: state.modelApptLink.serviceCode,
    serviceDescription: state.modelApptLink.serviceDescription,
    miltTime: state.modelApptLink.miltTime,
    blocks: state.modelApptLink.blocks,
    request: true,
    room: state.modelApptLink.room,
    auempl: 'ABLINK',
    didTake: false,
    cellPhone: state.modelApptLink.cellPhone,
    webMarketingDtId: 0,
    marketingSourceId: 0,
    application: '',
    sex: state.sex
  }

  takeAppointmentParameters.push(takeAppointmentParameter)
  bookGlobal.selectedOpening.takeAppointmentParameters = takeAppointmentParameters

  const takeAppointmentViewModel = await bookGlobal.takeAppointment()

  if (takeAppointmentViewModel?.returnStatus?.trim() === '1') {
    state.reservationText =
      'Your appointment has been reserved for ' +
      state.modelApptLink.serviceDescription +
      ' with ' +
      state.modelApptLink.technicianName

    state.reservationText +=
      ' on ' +
      filterDateTimeToDate(state.modelApptLink.appointmentDate) +
      ' at ' +
      state.modelApptLink.apptTime

    state.reservationText +=
      ' at our ' + state.modelApptLink.locationDescription + ' location.'

    state.step = 'confirmation'
  } else {
    toast.add({
      severity: 'error',
      summary: 'Oops',
      detail: 'something went wrong. Appointment not taken.',
      life: 5000
    })
    state.takeErrorMessage =
      'Oops, something went wrong. Appointment not taken. Please reach out to your model stylist/technician'
  }
}
</script>