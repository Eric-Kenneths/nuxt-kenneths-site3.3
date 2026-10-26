<template>
  <Button v-if="bookGlobal.webMarketing.byPassServicePage!=='Y' || bookGlobal.webMarketing.locationCode === ''" label="<" class="absolute top-1 px-4 left-3 lg:left-1/8 xl:left-1/4" rounded severity="secondary"
    aria-label="Back" @click="router.go(-1)" />

  <div class="grid grid-cols-1 text-center px-3 md:mx-auto md:w-[600px]">
    <div class="col-span-12 justify-center text-xl lg:text-2xl mb-6">
      {{ bookGlobal.selectedLocation.extendedDescription }}
    </div>

    <div v-if="bookGlobal.technicianStep.showStylist"
      class="col-span-12 items-center p-3 text-left mb-3 border border-solid rounded-sm shadow-md">
      <div class=" text-xl">
        {{ bookGlobal.technicianStep.stylistServiceDescription }}
      </div>
      <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.stylist" scrollHeight="10"
        :options="bookGlobal.technicianStep.stylists" placeholder="Select a Stylist" optionLabel="emalias"
        optionValue="technicianCode" :style="dropDownStyle(bookGlobal.technician.stylist)" 
        @update:modelValue="value => updateReview(bookGlobal.technicianStep.stylists, value)" />

      <template v-if="bookGlobal.technician.stylist === 'N' && bookGlobal.selectedLocation.locationCode !== 'AT'">
        <div class=" text-xl">
          Select a Stylist Level
        </div>
        <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.stylistLevel"
          :options="bookGlobal.technicianStep.stylistLevels" placeholder="Select a Level" optionLabel="description"
          optionValue="level" :style="dropDownStyle(bookGlobal.technician.stylistLevel)" />
      </template>
    </div>

    <div v-if="bookGlobal.technicianStep.showNailTech"
      class="col-span-12 items-center p-3 text-left mb-3 border border-solid rounded-sm shadow-md">
      <div class=" text-xl">
        {{ bookGlobal.technicianStep.nailTechServiceDescription }}
      </div>
      <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.nailTech" scrollHeight="10"
        :options="bookGlobal.technicianStep.nailTechs" placeholder="Select a Nail Tech" optionLabel="emalias"
        optionValue="technicianCode" :style="dropDownStyle(bookGlobal.technician.nailTech)"
        @update:modelValue="value => updateReview(bookGlobal.technicianStep.nailTechs, value)"  />
    </div>

    <div v-if="bookGlobal.technicianStep.showEsthetician"
      class="col-span-12 items-center p-3 text-left mb-3 border border-solid rounded-sm shadow-md">
      <div class=" text-xl">
        {{ bookGlobal.technicianStep.estheticianServiceDescription }}
      </div>
      <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.esthetician" scrollHeight="10"
        :options="bookGlobal.technicianStep.estheticians" placeholder="Select an Esthetician" optionLabel="emalias"
        optionValue="technicianCode" :style="dropDownStyle(bookGlobal.technician.esthetician)"
        @update:modelValue="value => updateReview(bookGlobal.technicianStep.estheticians, value)" />
    </div>

    <div v-if="bookGlobal.technicianStep.showWaxer"
      class="col-span-12 items-center p-3 text-left mb-3 border border-solid rounded-sm shadow-md">
      <div class=" text-xl">
        {{ bookGlobal.technicianStep.waxerServiceDescription }}
      </div>
      <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.waxer" scrollHeight="10"
        :options="bookGlobal.technicianStep.waxers" placeholder="Select an Waxologist" optionLabel="emalias"
        optionValue="technicianCode" :style="dropDownStyle(bookGlobal.technician.waxer)"
        @update:modelValue="value => updateReview(bookGlobal.technicianStep.waxers, value)" />
    </div>

    <div v-if="bookGlobal.technicianStep.showTherapist"
      class="col-span-12 items-center p-3 text-left mb-3 border border-solid rounded-sm shadow-md">
      <div class=" text-xl">
        {{ bookGlobal.technicianStep.therapistsServiceDescription }}
      </div>
      <Select id="stylist" class="mt-2  w-full" v-model="bookGlobal.technician.therapist" scrollHeight="10"
        :options="bookGlobal.technicianStep.therapists" placeholder="Select an Therapist" optionLabel="emalias"
        optionValue="technicianCode" :style="dropDownStyle(bookGlobal.technician.therapist)"
         @update:modelValue="value => updateReview(bookGlobal.technicianStep.therapists, value)" />
    </div>

    <div class="col-span-12 items-center  text-red-500 text-xl font-bold pb-2">
      {{ bookGlobal.technicianStep.error }}
    </div>

    <Transition name="fade-review" mode="out-in">
      <div
        v-if="reviewHtml"
        class="col-span-12 mt-2 p-6 text-left"
        aria-live="polite"
        :key="reviewHtml"
      >
        <div class="review-content italic" v-html="reviewHtml"></div>
      </div>
    </Transition>
  </div>


</template>

<script setup>
import { bookGlobal } from '~/composables/bookGlobal';

import Select from '@/volt/select';
import Button from '@/volt/button';

const reviewHtml = ref('');

import { useRouter } from 'vue-router';

const router = useRouter();

function dropDownStyle(selectedCode) {

  let thisStyle = {
    backgroundColor: 'var(--white)'
  }

  if (selectedCode !== '') {
    thisStyle.backgroundColor = 'var(--light-green)'
  }

  return thisStyle;
}

function updateReview(options, selectedCode) {
  const selectedTech = options?.find(
    option => option.technicianCode === selectedCode
  );

  reviewHtml.value = selectedTech?.htmlReview || '';
}

</script>

<style scoped>
.select-container {
  border-color: var(--grey);
  background-color: var(--light-grey);
}

.fade-review-enter-active,
.fade-review-leave-active {
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.fade-review-enter-from,
.fade-review-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.fade-review-enter-to,
.fade-review-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.review-content :deep(p) {
  margin-bottom: 0.75rem;
}

.review-content :deep(*:last-child) {
  margin-bottom: 0;
}
</style>
