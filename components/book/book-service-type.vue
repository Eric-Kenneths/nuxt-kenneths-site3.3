<template v-if="bookGlobal.bookNew.step === 'service-type'">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-3 pb-6 text-center">

    <!-- HAIR -->
    <div class="flex justify-center lg:justify-end">
      <img
        src="/images/book/new-customer/hair.webp"
        alt="Hair and Color Services"
        @click="selectServiceGroup('hair')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

    <!-- NAIL -->
    <div class="flex justify-center lg:justify-start">
      <img
        src="/images/book/new-customer/nail.webp"
        alt="Manicure and Pedicure Services"
        @click="selectServiceGroup('nail')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

    <!-- ESTHETIC -->
    <div class="flex justify-center lg:justify-end">
      <img
        src="/images/book/new-customer/esthetic.webp"
        alt="Facial Services"
        @click="selectServiceGroup('esthetic')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

    <!-- WAXING -->
    <div class="flex justify-center lg:justify-start">
      <img
        src="/images/book/new-customer/waxing.webp"
        alt="Waxing Services"
        @click="selectServiceGroup('wax')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

    <!-- MASSAGE -->
    <div class="flex justify-center lg:justify-end">
      <img
        src="/images/book/new-customer/massage.webp"
        alt="Massage Services"
        @click="selectServiceGroup('massage')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

    <!-- MAKEUP -->
    <div class="flex justify-center lg:justify-start">
      <img
        src="/images/book/new-customer/makeup.webp"
        alt="Makeup Services"
        @click="selectServiceGroup('makeUp')"
        class="select-none cursor-pointer service-type-img"
      />
    </div>

  </div>
</template>

<script setup>
  import { bookGlobal } from '~/composables/bookGlobal';


  async function selectServiceGroup(serviceType) {
      if (serviceType === 'hair') {
          bookGlobal.book.serviceGroupShow.hair = true;
      } else if (serviceType === 'nail') {
          bookGlobal.book.serviceGroupShow.nail = true;
      } else if (serviceType === 'esthetic') {
          bookGlobal.book.serviceGroupShow.esthetic = true;
      } else if (serviceType === 'wax') {
          bookGlobal.book.serviceGroupShow.wax = true;
      } else if (serviceType === 'massage') {
          bookGlobal.book.serviceGroupShow.massage = true;
      } else if (serviceType === 'makeUp') {
          bookGlobal.book.serviceGroupShow.makeUp = true;
      }

      if (bookGlobal.book.sex === '') {
          await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 2);
          bookGlobal.book.showSexQuestion = true;
      }
  }

</script>


<style scoped>
</style>