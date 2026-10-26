<template>
  <Button label="<" class="absolute top-1 px-4 left-3 lg:left-1/8 xl:left-1/4" rounded severity="secondary"
    aria-label="Back" @click="backToServices()" />
  <div class="grid grid-cols-1 text-center justify-center mt-2 pb-10">
    <div class="col-span-12 items-center md:mx-auto md:w-[600px] mb-2" v-for="loca in bookGlobal.book.locations"
      :key="loca.locationCode">
      <Card class="mx-1 text-white" :class="getBgClass(loca.canDoServices)" @click="selectLocation(loca)">
        <template #title><span class="text-white">{{ loca.locationDescription }}</span></template>
        <template v-if="loca.canDoServices" #subtitle><span class="text-gray-500">{{
          loca.extendedDescription }} </span></template>
        <template v-else #subtitle><span class="font-bold text-white">Selected
            Services Not Available</span></template>
        <template #content>
          <div class="mt-0 pt-0 pb-0 mb-0 text-white">
            {{ loca.address }} <br />
            {{ loca.city }} , {{ loca.state }} {{ loca.zipCode }}
          </div>
          <div class="flex mt-2 justify-center">
            <img src="/images/icons/google-icon.webp" class="h-5 mr-2" />
            <span class="pr-2">{{ loca.socialRating }}</span>
            <star-rating :rating="loca.socialRating" />
            <span>{{ loca.socialReviews }}</span>
          </div>
        </template>
      </Card>
    </div>
  </div>

</template>

<script setup>
import { bookGlobal } from '~/composables/bookGlobal';

import Card from '@/volt/Card';
import Button from '@/volt/Button';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits(['selected-location'])

function selectLocation(loca) {
  emit('selected-location', loca);
}

function getBgClass(canDoServices) {
  return canDoServices ? '!bg-primary-900 cursor-pointer' : '!bg-gray-300'
}

function backToServices() {
  bookGlobal.book.header = 'Select Services'
  router.go(-1)
}
</script>

<style scoped></style>
