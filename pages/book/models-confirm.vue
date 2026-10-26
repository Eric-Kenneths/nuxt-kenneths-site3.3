<template>
  <div>
    <div class="w-full flex flex-col items-center text-center pt-2">
      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full font-bold">
          Model Booking Confirmed
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          <div v-html="state.modelConfirm.serviceAndTechnician"></div>
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          {{ filterDateTimeToDate(state.modelConfirm.appointmentDate) }}
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          {{ state.modelConfirm.appointmentTime }}
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          {{ state.modelConfirm.locationDescription }}
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          {{ state.modelConfirm.address }} <br />
          {{ state.modelConfirm.cityStateZip }}
        </div>
      </div>

      <div class="w-[90%] lg:w-[60%] mx-auto flex items-center justify-center font-sans text-xl lg:text-2xl">
        <div class="w-full">
          If you need to adjust your appointment please call 614-538-5800.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'basic'
})

import { bookGlobal } from '~/composables/bookGlobal'
import { accountGlobal } from '~/composables/accountGlobal'

const { filterDateTimeToDate } = useFilters()

useHead({
  title: 'Model Booking | Confirmation',
  meta: [
    {
      name: 'description',
      content: "Thank you for booking your model appointment with Kenneth's Hair Salons + Day Spas"
    },
    {
      name: 'og:description',
      content: "Thank you for booking your model appointment with Kenneth's Hair Salons + Day Spas"
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
      key: 'robots',
    }
  ]
})

const state = reactive({
  modelConfirm: {}
})

onMounted(async () => {
  state.modelConfirm = Object.assign({}, bookGlobal.modelConfirm)

  bookGlobal.clearModelConfirm()
  accountGlobal.clearAccount()
})
</script>
