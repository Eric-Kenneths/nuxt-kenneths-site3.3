<template>
  <div>

    <!-- Error Message -->
    <div v-if="bookGlobal.book.hasConfirmError" class="flex justify-center pt-2 text-center">
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        {{ bookGlobal.book.confirmErrorMessage }}
      </div>
    </div>

    <!-- Success Content -->
    <div v-else class="flex flex-col items-center pt-2 text-center space-y-4">

      <!-- Success Title -->
      <div class="w-[90%] lg:w-[60%] text-3xl lg:text-4xl font-bold">
        Success!
      </div>

      <div class="w-[90%] lg:w-[60%] text-2xl lg:text-3xl">
        Your appointment is booked for,
      </div>

      <!-- Service & Technician -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        <div v-html="bookGlobal.takeStep.serviceAndTechnician"></div>

        <div class="mt-2" v-show="bookGlobal.discountService.serviceCode !== ''">
          {{ bookGlobal.discountService.description }}
        </div>
      </div>

      <!-- Appointment Date -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        {{ filterDateTimeToDate(bookGlobal.selectedOpening.takeAppointmentParameters[0].appointmentDate) }}
      </div>

      <!-- Appointment Time -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        {{ bookGlobal.selectedOpening.apptTime }}
      </div>

      <!-- Location Name -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        {{ bookGlobal.selectedLocation.extendedDescription }}
      </div>

      <!-- Location Address -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        {{ bookGlobal.selectedLocation.address }} <br />
        {{ bookGlobal.selectedLocation.city }}, {{ bookGlobal.selectedLocation.state }}
        {{ bookGlobal.selectedLocation.zipCode }}
      </div>

      <!-- Additional Info -->
      <div class="w-[90%] lg:w-[60%] text-xl lg:text-2xl">
        If you need to adjust your appointment please call 614-538-5800.
      </div>

    </div>
  </div>

</template>

<script setup>
definePageMeta({
  layout: 'basic'
})

import { bookGlobal } from '~/composables/bookGlobal'
import { useLocalStorage } from '~/composables/useLocalStorage'

const { filterDateTimeToDate } = useFilters()

useHead({
  title: 'Book a Service | Confirmation',
  meta: [
    {
      name: 'description',
      content:
        'Thank you for booking your appointment with Kenneth\'s Hair Salons + Day Spas'
    },
    {
      property: 'og:description',
      content:
        'Thank you for booking your appointment with Kenneth\'s Hair Salons + Day Spas'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
      key: 'robots'
    }
  ]
})

onMounted(async () => {
  const {
    setNewBookingCompleted,
    setMarketingDiscountCode
  } = useLocalStorage()

  /*
   * Do not record a completed booking when the confirmation
   * response indicates an error.
   */
  if (
    bookGlobal.book.hasConfirmError === true ||
    bookGlobal.book.completed !== true
  ) {
    return
  }

  await setNewBookingCompleted('1')
  await setMarketingDiscountCode('')

  /*
   * Values available from the successfully confirmed booking.
   */
  const appointmentDate =
    bookGlobal.selectedOpening
      ?.takeAppointmentParameters?.[0]
      ?.appointmentDate || ''

  const appointmentTime =
    bookGlobal.selectedOpening?.apptTime || ''

  const locationCode =
    bookGlobal.selectedLocation?.locationCode || ''

  const locationName =
    bookGlobal.selectedLocation?.extendedDescription || ''

  /*
   * serviceAndTechnician is displayed with v-html, so remove
   * markup before sending it to analytics.
   */
  const serviceDescription =
    String(
      bookGlobal.takeStep?.serviceAndTechnician || ''
    )
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

  const discountServiceCode =
    bookGlobal.discountService?.serviceCode || ''

  const discountServiceDescription =
    bookGlobal.discountService?.description || ''

  /*
   * Use an API-provided appointment ID or confirmation number
   * here later if one becomes available.
   */
  const bookingDedupeValue = [
    'first-time',
    appointmentDate,
    appointmentTime,
    locationCode || locationName
  ]
    .filter(Boolean)
    .join('|')

  /*
   * Do not track without enough booking information to create
   * a meaningful deduplication value.
   */
  if (!bookingDedupeValue || bookingDedupeValue === 'first-time') {
    console.warn(
      'First-time booking tracking skipped because booking details were unavailable.'
    )
    return
  }

  const bookingDedupeKey =
    `first-time-service-booking-${bookingDedupeValue}`

  try {
    if (
      sessionStorage.getItem(bookingDedupeKey) === 'sent'
    ) {
      return
    }

    window.dataLayer = window.dataLayer || []

    /*
     * Existing GA4/GTM first-time appointment event.
     */
    window.dataLayer.push({
      event: 'first_timer_appointment',
      event_source: 'nuxt_confirm_page',
      tracking_method: 'dataLayer_push',
      event_location: 'book_new_confirm',
      event_category: 'Online Appointment',
      event_label:
        'https://kenneths.com/book/new/confirm',

      booking_customer_type: 'first_time_customer',
      customer_status: 'new_customer',
      is_first_time_customer: true,

      value: 1
    })

    /*
     * WCMH - First-time customer service booking complete
     *
     * GTM Custom Event trigger:
     * first_time_service_booking_complete
     */
    window.dataLayer.push({
      event: 'first_time_service_booking_complete',

      booking_customer_type: 'first_time_customer',
      customer_status: 'new_customer',
      is_first_time_customer: true,

      booking_type: 'service_appointment',
      booking_status: 'complete',
      booking_source: 'nuxt_confirm_page',
      booking_location: 'book_new_confirm',

      appointment_date: appointmentDate,
      appointment_time: appointmentTime,

      location_code: locationCode,
      location_name: locationName,

      service_description: serviceDescription,
      discount_service_code: discountServiceCode,
      discount_service_description:
        discountServiceDescription,

      clientDedupeId: bookingDedupeValue,

      event_category: 'Online Appointment',
      event_label:
        'https://kenneths.com/book/new/confirm',

      value: 1
    })

    /*
     * Mark the booking as tracked only after both pushes
     * complete successfully.
     */
    sessionStorage.setItem(
      bookingDedupeKey,
      'sent'
    )
  } catch (error) {
    /*
     * Tracking failures must not affect the customer's
     * confirmation page.
     */
    console.error(
      'First-time service booking tracking failed:',
      error
    )
  }
})
</script>

<style scoped></style>
