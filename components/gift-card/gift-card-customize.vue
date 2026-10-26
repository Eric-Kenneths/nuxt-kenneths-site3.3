<template>
  <section class="bg-primary-500 text-primary-900 pt-12 pb-8 relative">

    <Popover ref="op">
      <div>
        <div class="font-bold">
          {{ state.spaDetail.packageDescription }} ${{ state.spaDetail.packagePrice }}
        </div>
        <div class="italic">includes</div>
        <div v-for="service in state.spaDetail.services.filter(s => s.serviceCode != 'LBR')" :key="service.serviceCode">
          -{{ service.serviceDescription }}
        </div>
        <div class="mt-3">
          <Button class="px-10 md:px-5 lg:px-10 bg-primary-500" @click="selectSpaCode(state.spaDetail)">Select</Button>
        </div>
      </div>
    </Popover>

    <GiftCardCartIcon class="hidden lg:block" />

    <div class="grid mx-auto">
      <!-- Row 1 -->
      <div class="text-center">
        <h2 class="k-section-title uppercase mb-10 mt-1">
          Customize Your Gift Card
        </h2>
      </div>

      <!-- Row 2 -->
      <nav class="grid grid-cols-3 text-center font-semibold text-lg overflow-hidden" role="tablist">
        <!-- Tab 1: Spa Experiences -->
        <button @click="customizeChanged('P')" :class="[
          'py-2 px-2 border-r border-primary-900 transition-colors duration-200 cursor-pointer',
          giftCardGlobal.customizeType === 'P'
            ? 'bg-primary-100 text-primary-900'
            : 'hover:bg-primary-100'
        ]" role="tab" :aria-selected="giftCardGlobal.customizeType === 'P'">
          Spa Experiences
        </button>

        <!-- Tab 2: Selected Services -->
        <button @click="customizeChanged('S')" :class="[
          'py-2 px-2 transition-colors duration-200 cursor-pointer',
          giftCardGlobal.customizeType === 'S'
            ? 'bg-primary-100 text-primary-900'
            : 'hover:bg-primary-100'
        ]" role="tab" :aria-selected="giftCardGlobal.customizeType === 'S'">
          Build Your Kenneth's Experience
        </button>

        <!-- Tab 3: Dollar Amount -->
        <button @click="customizeChanged('D')" :class="[
          'py-2 px-2 border-l border-primary-900 transition-colors duration-200 cursor-pointer',
          giftCardGlobal.customizeType === 'D'
            ? 'bg-primary-100 text-primary-900'
            : 'hover:bg-primary-100'
        ]" role="tab" :aria-selected="giftCardGlobal.customizeType === 'D'">
          Dollar Amount
        </button>
      </nav>

    </div>
    <div v-if="giftCardGlobal.customizeType === 'P'" class="bg-primary-100 -mt-px p-2 pt-6">

      <div
        class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-5 md:px-10 transition-all duration-500 overflow-hidden">
        <div v-for="(spa, id) in giftCardGlobal.webOrderGCProducts.packages" :key="id"
          class="flex flex-col p-2 mx-auto">
          <div class="justify-center">
            <img loading="lazy" decoding="async" fetchpriority="low" class="object-cover max-h-80 w-auto"
              :src="'/images/gift-cards/spa-package/' + spa.imageUrl" :alt="spa.packageDescription" />
            <div class="mt-3 text-left">
              <h3 class="text-lg md:text-xl uppercase">{{ spa.packageDescription }}</h3>
              <p>${{ spa.packagePrice }}</p>
            </div>
            <div class="flex gap-4 mt-3 mb-6">
              <Button class="px-10 md:px-5 lg:px-10 bg-primary-500" @click="selectSpaCode(spa)">Select</Button>

              <Button :id="spa.spaPackageCode" class="px-10 md:px-5 lg:px-10"
                @click="toggle(spa, $event)">Details</Button>

            </div>
            <gold-line />
          </div>
        </div>
      </div>

    </div>

    <div v-if="giftCardGlobal.customizeType === 'S'" class="bg-primary-100 -mt-px pt-3 px-2 pb-4 caret-black">

      <div class="mx-auto grid grid-cols-1 lg:grid-cols-2">
        <!-- Repeat for 4 categories -->
        <div v-for="(header, headIndex) in giftCardGlobal.webOrderGCProducts.selectedServiceHeaders" :key="headIndex"
          class="py-3 bg-primary-200 mb-2 lg:mx-1">
          <!-- Category Header -->
          <h2 class="text-xl pl-2 font-bold mb-3 text-center">{{ header.categoryHeader }}</h2>

          <!-- Controls: Stack vertically, each row has Select + InputNumber -->
          <div class="flex flex-col space-y-3 px-1 pb-3">
            <div v-for="(detail, detailIndex) in header.selectedServiceDetails" :key="detailIndex"
              class="flex flex-col flex-row items-center justify-center">
              <Select :options="detail.services"
                v-model="giftCardGlobal.selectServiceHeaders[headIndex].selectedServiceDetails[detailIndex].selectedServiceCode"
                optionValue="serviceCode" optionLabel="descriptionWithPrice"
                class="w-full max-w-[320px] mr-2 text-xs md:text-sm lg:text-base"
                :placeholder="giftCardGlobal.selectServiceHeaders[headIndex].selectedServiceDetails[detailIndex].placeHolder" />
              <div>
                <InputNumber :min="0" :max="25" showButtons
                  v-model="giftCardGlobal.selectServiceHeaders[headIndex].selectedServiceDetails[detailIndex].quantity"
                  buttonLayout="horizontal" fluid style="width: 7.7rem;" />
              </div>

            </div>
          </div>
        </div>
        <div class="py-3 bg-primary-200 mb-2 lg:mx-1">
          <h2 class="text-xl pl-2 font-bold mb-3 text-center">Hair Services Dollar Amount</h2>
          <div class="flex flex-col space-y-3 px-1 pb-3">
            <div class="flex flex-col flex-row items-center justify-center">
              $
              <InputNumber class="ml-1" :minFractionDigits="0" :maxFractionDigits="0" placeholder="Hair Service Amount"
                v-model="giftCardGlobal.hairServiceAmount" />
            </div>
          </div>
        </div>

      </div>

      <div class="text-red-500 text-xl font-bold justify-center items-center text-center">
        {{ giftCardGlobal.selectedServiceError }}
      </div>

      <div class="text-center">
        <Button class="w-1/2 md:w-1/3 bg-primary-500" @click="selectSelectedServices()">Continue</Button>
      </div>
    </div>

    <div v-if="giftCardGlobal.customizeType === 'D'" class="bg-primary-100 -mt-px p-2">
      <div
        class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-5 md:px-10 transition-all duration-500 overflow-hidden pt-10">
        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(500)">$500</Button>
        </div>

        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(300)">$300</Button>
        </div>

        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(200)">$200</Button>
        </div>

        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(100)">$100</Button>
        </div>

        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(75)">$75</Button>
        </div>

        <div class="flex flex-col p-5">
          <Button @click="selectDollarAmount(50)">$50</Button>
        </div>

      </div>

      <div class="text-red-500 text-xl font-bold justify-center items-center text-center mt-5">
        {{ giftCardGlobal.dollarAmountError }}
      </div>
      <div class="flex justify-center items-center mb-5">
        $
        <InputNumber class="ml-1" :minFractionDigits="0" :maxFractionDigits="0" placeholder="Custom Amount"
          v-model="giftCardGlobal.customDollarAmount" />

        <div>
          <Button class="ml-2 w-[100px]"
            @click="selectDollarAmount(giftCardGlobal.customDollarAmount)">Continue</Button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '@/volt/Button.vue';
import Popover from '@/volt/Popover.vue';
import InputNumber from '@/volt/InputNumber.vue';
import Select from '@/volt/Select.vue';
import { giftCardGlobal } from '~/composables/giftCardGlobal';

const router = useRouter();

const state = reactive({
  spaDetail: {}
})

const op = ref();

let currentTarget = null;

const toggle = (spa, event) => {

  state.spaDetail = spa;

  setTimeout(() => op.value.toggle(event, event.target), 150);

};


function customizeChanged(customizeType) {
  giftCardGlobal.customizeType = customizeType;
}

async function selectSpaCode(spa) {
  giftCardGlobal.dollarAmountError = '';

  giftCardGlobal.clearSelectedServices();
  giftCardGlobal.selectedServiceAmount = 0;
  giftCardGlobal.dollarAmount = 0;

  giftCardGlobal.tipTotal = 0;

  await giftCardGlobal.setSalesTax();

  giftCardGlobal.selectedSpaCode = spa.spaPackageCode;
  giftCardGlobal.spaDescription = spa.packageDescription;
  giftCardGlobal.spaAmount = spa.packagePrice;
  giftCardGlobal.selectionType = 'spa-package'
  giftCardGlobal.step = 'personalize';
}

async function selectSelectedServices() {
  giftCardGlobal.dollarAmountError = '';
  giftCardGlobal.selectedServiceError = '';

  //todo: check to see if a service was selected
  let foundIt = giftCardGlobal.selectServiceHeaders.some(hd => hd.selectedServiceDetails.some(dt => dt.selectedServiceCode !== ''));


  if (foundIt === false && giftCardGlobal.hairServiceAmount === 0) {
    giftCardGlobal.selectedServiceError = 'Please select at least one service.';
    return;
  }

  giftCardGlobal.dollarAmount = 0;
  giftCardGlobal.selectedSpaCode = '';
  giftCardGlobal.spaAmount = 0;

  giftCardGlobal.tipTotal = 0;


  await giftCardGlobal.loadSelectedServices();

  giftCardGlobal.selectedServiceAmount = await giftCardGlobal.getSelectedServiceAmount();

  await giftCardGlobal.setSalesTax();

  giftCardGlobal.selectionType = 'selected-services'
  giftCardGlobal.step = 'personalize';
}

async function selectDollarAmount(amount) {
  giftCardGlobal.dollarAmountError = '';
  giftCardGlobal.selectedServiceError = '';

  if (amount < 5) {
    giftCardGlobal.dollarAmountError = 'Dollar amount cannot be less than $5';
    return;
  }

  giftCardGlobal.clearSelectedServices();
  giftCardGlobal.selectedServiceAmount = 0;
  giftCardGlobal.selectedSpaCode = '';
  giftCardGlobal.spaAmount = 0;

  giftCardGlobal.tipTotal = 0;

  await giftCardGlobal.setSalesTax();

  giftCardGlobal.dollarAmount = amount;
  giftCardGlobal.selectionType = 'dollar-amount'
  giftCardGlobal.step = 'personalize';
}


</script>

<style scoped></style>