<template>
  <div class="font-sans">
    <div v-if="accountGlobal.verifySuccess === true"
      class="mx-auto w-full max-w-[95%] lg:max-w-3xl lg:px-0 text-right text-sm">
      {{ accountGlobal.customer.fullname }}
    </div>
    <!-- Header -->
    <div class="mx-auto w-full max-w-[95%] lg:max-w-3xl lg:px-0 text-center">
      <h1 class="pt-1 pb-2 text-2xl font-bold uppercase">
        Model Appointment Booking
        <span v-if="state.employeeName !== ''" class="block mt-1 text-base font-semibold normal-case">
          - {{ state.employeeName }}
          <br />
          Customer: {{ accountGlobal.customer.fullname }}
        </span>
      </h1>

      <div class="pt-1 pb-2 text-xl font-bold">
        {{ state.stepDescription }}
      </div>
    </div>

    <!-- STEP: appointment-types -->
    <template v-if="state.step === 'appointment-types'">
      <div class="mx-auto w-full max-w-[95%] lg:max-w-4xl px-2 lg:px-0">
        <div class="space-y-3">
          <button v-for="(modelAppointmentType, id) in state.modelAppointmentTypes" :key="id" type="button"
            class="w-full text-left cursor-pointer rounded-xl border border-primary-200 bg-primary-900 shadow-lg hover:bg-primary-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-primary-100)]"
            @click="getLevelsAndAppointments(modelAppointmentType)">
            <div class="grid grid-cols-12 gap-3 p-3 sm:p-4 items-center">
              <!-- Image -->
              <div class="col-span-4 sm:col-span-3">
                <img :src="'https://api.kenneths.com/model/model-types/' + modelAppointmentType.trModelId + '.jpg'"
                  :alt="modelAppointmentType.modelDescription" class="w-full max-w-[250px] rounded-lg object-cover"
                  loading="lazy" />
              </div>

              <!-- Copy -->
              <div class="col-span-8 sm:col-span-9 text-white">
                <div class="text-center font-bold text-base sm:text-xl">
                  {{ modelAppointmentType.modelDescription }}
                </div>
                <div class="mt-2 text-sm sm:text-lg italic text-center">
                  Starting at $ {{ modelAppointmentType.price1 }}
                </div>
                <div class="mt-2 text-center text-sm sm:text-lg">
                  {{ modelAppointmentType.webDescription }}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </template>

    <!-- STEP: model-levels -->
    <template v-else-if="state.step === 'model-levels'">
      <div class="mx-auto w-full md:max-w-[95%] lg:max-w-4xl lg:px-0">
        <!-- Back + title -->
        <div class="mb-2 mx-auto w-full max-w-[800px]">
          <div class="flex items-center justify-between">
            <Button icon="pi pi-chevron-left" aria-label="Back" class="p-0 ml-1"
              @click="navigateTo('appointment-types')">
              < </Button>

                <div class="flex-1 text-center text-lg font-bold">
                  for {{ state.serviceTypeSelected }}
                </div>
                <div class="w-10" aria-hidden="true"></div>
          </div>
        </div>

        <!-- Level 1 -->
        <div v-if="state.modelLevel.modelAppointmentsLevel1.length !== 0" class="mx-auto w-full max-w-[800px]">
          <Accordion value="0" class="text-left">
            <AccordionPanel>
              <AccordionHeader>{{ state.price1Header }}</AccordionHeader>
              <AccordionContent>
                <div>
                  <div v-for="(modelAppointment, id) in state.modelLevel.modelAppointmentsLevel1" :key="id"
                    class="bg-primary-200 border-b border-white p-2 sm:p-3 text-sm sm:text-base">
                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-2 sm:col-span-2">
                        <Button class="uppercase !px-1" label="Select" @click="selectAppointment(modelAppointment)" />
                      </div>

                      <div class="col-span-1 sm:col-span-1 text-center sm:text-left">
                        {{ filterDowAbv(convertFullStringToDate(modelAppointment.appointmentDate)) }}
                      </div>

                      <div class="col-span-3 sm:col-span-3 pl-2">
                        {{ filterDateTimeToDate(modelAppointment.appointmentDate) }}
                      </div>

                      <div class="col-span-2 sm:col-span-3 text-center">
                        {{ modelAppointment.apptTime }}
                      </div>

                      <div class="col-span-4 sm:col-span-3 text-center sm:text-left">
                        {{ modelAppointment.technicianName }}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>

        <!-- Level 2 -->
        <div v-if="state.modelLevel.modelAppointmentsLevel2.length !== 0" class="mx-auto mt-3 w-full max-w-[800px]">
          <Accordion value="0" class="text-left">
            <AccordionPanel>
              <AccordionHeader>{{ state.price2Header }}</AccordionHeader>
              <AccordionContent>
                <div>
                  <div v-for="(modelAppointment, id) in state.modelLevel.modelAppointmentsLevel2" :key="id"
                    class="bg-primary-200 border-b border-white p-2 sm:p-3 text-sm sm:text-base">
                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-2 sm:col-span-2">
                        <Button class="uppercase !px-1" label="Select" @click="selectAppointment(modelAppointment)" />
                      </div>

                      <div class="col-span-1 sm:col-span-1 text-center sm:text-left">
                        {{ filterDowAbv(convertFullStringToDate(modelAppointment.appointmentDate)) }}
                      </div>

                      <div class="col-span-3 sm:col-span-3 pl-2">
                        {{ filterDateTimeToDate(modelAppointment.appointmentDate) }}
                      </div>

                      <div class="col-span-2 sm:col-span-3 text-center">
                        {{ modelAppointment.apptTime }}
                      </div>

                      <div class="col-span-4 sm:col-span-3 text-center sm:text-left">
                        {{ modelAppointment.technicianName }}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>

        <!-- Level 3 -->
        <div v-if="state.modelLevel.modelAppointmentsLevel3.length !== 0" class="mx-auto mt-3 w-full max-w-[800px]">
          <Accordion value="0" class="text-left">
            <AccordionPanel>
              <AccordionHeader>{{ state.price3Header }}</AccordionHeader>
              <AccordionContent>
                <div>
                  <div v-for="(modelAppointment, id) in state.modelLevel.modelAppointmentsLevel3" :key="id"
                    class="bg-primary-200 border-b border-white p-2 sm:p-3 text-sm sm:text-base">
                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-2 sm:col-span-2">
                        <Button class="uppercase !px-1" label="Select" @click="selectAppointment(modelAppointment)" />
                      </div>

                      <div class="col-span-1 sm:col-span-1 text-center sm:text-left">
                        {{ filterDowAbv(convertFullStringToDate(modelAppointment.appointmentDate)) }}
                      </div>

                      <div class="col-span-3 sm:col-span-3 pl-2">
                        {{ filterDateTimeToDate(modelAppointment.appointmentDate) }}
                      </div>

                      <div class="col-span-2 sm:col-span-3 text-center">
                        {{ modelAppointment.apptTime }}
                      </div>

                      <div class="col-span-4 sm:col-span-3 text-center sm:text-left">
                        {{ modelAppointment.technicianName }}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </template>

    <!-- STEP: take-appointment -->
    <template v-else-if="state.step === 'take-appointment'">
      <div class="mx-auto w-full max-w-[95%] lg:max-w-4xl px-2 lg:px-0 pt-2">
        <div class="mx-auto w-full max-w-[800px]">
          <!-- Back -->
          <div class="mb-3">
            <Button icon="pi pi-chevron-left" aria-label="Back" class="p-0" :pt="{
              root:
                'inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-primary-100)]',
              icon: 'text-white',
            }" @click="navigateTo('model-levels')" />
          </div>

          <div class="text-lg sm:text-xl lg:text-2xl">
            <div class="space-y-3">
              <template v-if="accountGlobal.loginSuccessful === false">
                <div class="grid grid-cols-12 gap-3 items-center">
                  <div class="col-span-5 text-right">Full Name:</div>
                  <div class="col-span-7">
                    <InputText id="full-name" v-model="state.customerName" placeholder="first and last"
                      class="w-full max-w-[400px] rounded-md border border-white/15 bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--p-primary-100)]" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center font-semibold">
                  {{ accountGlobal.customer.fullname }}
                </div>
              </template>

              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-5 text-right">Date:</div>
                <div class="col-span-7 text-left">
                  {{ filterDateTimeToDate(state.selectedAppointment.appointmentDate) }}
                </div>
              </div>

              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-5 text-right">Start Time:</div>
                <div class="col-span-7 text-left">
                  {{ state.selectedAppointment.apptTime }}
                </div>
              </div>

              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-5 text-right">Location:</div>
                <div class="col-span-7 text-left">
                  {{ state.location.extendedDescription }}
                </div>
              </div>

              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-5 text-right">Service(s):</div>
                <div class="col-span-7 text-left">
                  {{ state.serviceTypeSelected }}
                </div>
              </div>

              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-5 text-right">Technician:</div>
                <div class="col-span-7 text-left">
                  {{ state.selectedAppointment.technicianName }}
                </div>
              </div>

              <div v-if="state.takeErrorMessage" class="text-center font-bold text-red-500" role="alert"
                aria-live="polite">
                {{ state.takeErrorMessage }}
              </div>

              <div class="text-center pt-1">
                <Button label="Reserve Apppointment" id="submitButton" class="w-full sm:w-auto uppercase"
                  @click="takeAppointment()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <verify-form @didVerify="didVerify" showLogin="true" />

    <div class="my-8 py-8"></div>
  </div>
</template>

<script setup>
import Button from '@/volt/button'
import Accordion from '@/volt/accordion'
import AccordionPanel from '@/volt/accordionpanel'
import AccordionHeader from '@/volt/accordionheader'
import AccordionContent from '@/volt/accordioncontent'
import InputText from '@/volt/inputtext'

definePageMeta({
  layout: 'basic',
})

import { bookGlobal } from '~/composables/bookGlobal'
import { useAppointmentBook } from '~/composables/useAppointmentBook'
import { useCustomer } from '~/composables/useCustomer'
import { useKhsds } from '~/composables/useKhsds'
import { useEmployee } from '~/composables/useEmployee'
import { accountGlobal } from '~/composables/accountGlobal'

useHead({
  title: "Model Booking | Kenneth's",
  meta: [
    {
      name: 'description',
      content:
        "Thank you for booking your model appointment with Kenneth's Hair Salons + Day Spas",
    },
    {
      name: 'og:description',
      content:
        "Thank you for booking your model appointment with Kenneth's Hair Salons + Day Spas",
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
      key: 'robots',
    },
  ],
})

const router = useRouter()
const route = useRoute()

const { filterDateTimeToDate, filterDowAbv } = useFilters()
const { convertFullStringToDate, convertDateToApiString } = useDateFunctions()

const { getModelAppointmentTypes, getModelAppointmentByServiceType } = useAppointmentBook()

const { getTechnicianLiteByTechnicianCode, getLocationByLocationCode } = useKhsds()

const { getEmployeeName } = useEmployee()
const { getCustomer } = useCustomer()

const state = reactive({
  step: 'appointment-types',
  stepDescription: 'Select A Model Service Type',
  modelAppointmentTypes: [],
  modelLevel: {},
  serviceTypeSelected: '',
  loggedIn: false,
  customerName: '',
  reservationText: '',
  location: {},
  sex: '',
  takeErrorMessage: '',
  selectedAppointment: {},
  verified: false,
  cellPhone: '',
  employeeCode: 'MODELB',
  employeeName: '',
  price1Header: '',
  price2Header: '',
  price3Header: '',
})

onMounted(async () => {
  // if coming in from phone room appointment book
  let employeeCode = route.query.e
  let customerCode = route.query.c
  let marketingCode = route.query.m

  if (employeeCode !== undefined) {
    state.employeeName = await getEmployeeName(employeeCode)
    if (state.employeeName !== '') {
      if (customerCode !== undefined) {
        customerCode = customerCode.toUpperCase()
        accountGlobal.customer = await getCustomer(customerCode)

        if (accountGlobal.customer !== null) {
          state.employeeCode = employeeCode
          accountGlobal.customerCode = customerCode
          accountGlobal.verifySuccess = true
          accountGlobal.loginSuccessful = true
          state.verified = true
        }
      }
    }
  } else if (customerCode !== undefined) {
    customerCode = customerCode.toUpperCase()
    accountGlobal.customer = await getCustomer(customerCode)

    if (accountGlobal.customer !== null) {
      accountGlobal.customerCode = customerCode
      accountGlobal.verifySuccess = true
      accountGlobal.loginSuccessful = true
      state.verified = true
    }

  }



  if (marketingCode !== undefined) {
    marketingCode = marketingCode.toUpperCase()
    if (marketingCode === 'FBONE') {
      // free blow out on new years eve
      accountGlobal.customerCode = 'BN0000001'
    }
  }

  if (accountGlobal.customerCode === '') {
    window.location.href = '/model'
    return
  }

  await getTypes()

  if (marketingCode === 'FBONE') {
    const ksbIndex = state.modelAppointmentTypes.findIndex((obj) => obj.serviceCode === 'KSB')

    if (ksbIndex !== -1) {
      const ksbObject = state.modelAppointmentTypes.splice(ksbIndex, 1)[0]
      ksbObject.price1 = "4 (FREE ON NEW YEAR'S EVE!)"
      state.modelAppointmentTypes.unshift(ksbObject)
    }
  }

  if (accountGlobal.loginSuccessful === true) {
    state.verified = true
  }
})

async function getTypes() {
  state.modelAppointmentTypes = await getModelAppointmentTypes()
}

async function getLevelsAndAppointments(modelAppointmentType) {
  state.stepDescription = 'Select Price Level And Appointment'
  state.modelLevel = await getModelAppointmentByServiceType(modelAppointmentType.serviceCode)
  state.serviceTypeSelected = modelAppointmentType.modelDescription
  state.step = 'model-levels'
  state.price1Header =
    'Price Level 1 - $' +
    state.modelLevel.price1.toString() +
    (state.modelLevel.isStartingAt1 === true ? '+' : '')
  state.price2Header =
    'Price Level 2 - $' +
    state.modelLevel.price2.toString() +
    (state.modelLevel.isStartingAt2 === true ? '+' : '')
  state.price3Header =
    'Price Level 3 - $' +
    state.modelLevel.price3.toString() +
    (state.modelLevel.isStartingAt2 === true ? '+' : '')
}

async function navigateTo(whereTo) {
  if (whereTo === 'appointment-types') {
    state.stepDescription = 'Select A Model Service Type'
    await getTypes()
  } else if (whereTo === 'model-levels') {
    state.stepDescription = 'Select Price Level And Appointment'
  }

  state.step = whereTo
}

async function selectAppointment(modelAppointment) {
  state.selectedAppointment = modelAppointment

  let location = await getLocationByLocationCode(state.selectedAppointment.locationCode)
  state.location = location

  if (state.verified === true) {
    state.step = 'take-appointment'
    state.stepDescription = 'Take Appointment'
  } else {
    accountGlobal.verifyStep = 'text'
    accountGlobal.showVerify = true
  }
}

async function didVerify(verified) {
  if (verified === true) {
    state.step = 'take-appointment'
    state.stepDescription = 'Take Appointment'
    state.verified = true
  }
}

async function takeAppointment() {
  if (accountGlobal.loginSuccessful === false) {
    if (state.customerName.trim() === '' || !state.customerName.includes(' ')) {
      state.takeErrorMessage = '*Please enter first and last name'
      return
    }
    state.cellPhone = accountGlobal.mobilePhone
  } else {
    state.customerName = accountGlobal.customer.fullname
  }

  let technician = await getTechnicianLiteByTechnicianCode(state.selectedAppointment.technicianCode)

  const takeAppointmentParameter = {
    customerCode: accountGlobal.customerCode,
    customerName: state.customerName,
    appointmentDate: convertDateToApiString(new Date(state.selectedAppointment.appointmentDate)),
    locationCode: state.selectedAppointment.locationCode,
    technicianCode: state.selectedAppointment.technicianCode,
    technicianName: state.selectedAppointment.technicianName,
    technicianType: technician.technicinType,
    technicianLevel: technician.technicianLevel,
    serviceCode: state.selectedAppointment.serviceCode,
    serviceDescription: '',
    miltTime: state.selectedAppointment.miltTime,
    blocks: 1,
    request: false,
    room: '',
    auempl: state.employeeCode,
    didTake: false,
    cellPhone: state.cellPhone,
    webMarketingDtId: 0,
    marketingSourceId: 0,
    application: '',
    sex: '',
  }

  bookGlobal.modelConfirm.hasConfirmError = false
  bookGlobal.modelConfirm.confirmErrorMessage = ''
  bookGlobal.modelConfirm.serviceAndTechnician =
    state.serviceTypeSelected + ' w/ ' + state.selectedAppointment.technicianName
  bookGlobal.modelConfirm.appointmentDate = state.selectedAppointment.appointmentDate
  bookGlobal.modelConfirm.appointmentTime = state.selectedAppointment.apptTime
  bookGlobal.modelConfirm.locationDescription = state.location.extendedDescription
  bookGlobal.modelConfirm.address = state.location.address
  bookGlobal.modelConfirm.cityStateZip =
    state.location.city + ',' + state.location.state + ' ' + state.location.zipCode

  var selectedOpening = {
    takeAppointmentParameters: [],
  }
  selectedOpening.takeAppointmentParameters.push(takeAppointmentParameter)
  bookGlobal.selectedOpening = selectedOpening

  let takeAppointmentViewModel = await bookGlobal.takeAppointment()

  if (takeAppointmentViewModel.returnStatus === undefined) {
    state.takeErrorMessage = 'Oops, something went wrong taking the appointment'
  } else if (takeAppointmentViewModel.returnStatus.trim() === '1') {
    router.push('/book/models-confirm')
  } else if (takeAppointmentViewModel.returnStatus.trim() === '0') {
    router.push('/book/models-confirm')
  } else {
    bookGlobal.modelConfirm.hasConfirmError = true
    bookGlobal.modelConfirm.confirmErrorMessage = bookGlobal.takeErrorMessage
    state.takeErrorMessage = bookGlobal.takeErrorMessage
  }
}
</script>
