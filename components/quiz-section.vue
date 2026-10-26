<template>
  <section class="hair-quiz-section py-8 px-4 bg-primary-500 text-primary-900 full">
    <div class="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap- items-top">
      <!-- Left Column: Heading and Offer -->
      <div class="items-start md:items-center md:text-center">
        <h2 class="text-5xl md:text-6xl mb-4 uppercase">Find Your Hair Match</h2>
      </div>
      <!-- Right Column: Description and Action -->
      <div>
        <p class="text-2xl mb-4">
          Take our quick hair quiz to get paired with the perfect stylist based on your hair goals and
          your lifestyle. First-time clients save 20%!
        </p>
        <!-- <button @click="startQuiz()"
          class="hover:text-primary-700 k-section-link font-bold underline underline-offset-4 transition rounded py-3 inline-block mt-2 uppercase cursor-pointer">
          Take The Quiz &rarr;</button> -->
          <a href="/hair-quiz"
          class="hover:text-primary-700 k-section-link font-bold underline underline-offset-4 transition rounded py-3 inline-block mt-2 uppercase cursor-pointer">
          Take The Quiz &rarr;</a>
      </div>
    </div>
  </section>
  <Dialog v-model:visible="mhhGlobal.quizVisible" modal class="w-screen mt-3 md:w-[98vw] !max-w-6xl text-primary-900">
    <template #container="{ closeCallback }">
      <!-- Full-height shell -->
      <div class="relative w-full h-[100dvh] md:h-auto md:max-h-[100dvh] flex flex-col bg-primary-100">

        <!-- Close button -->
        <button type="button" aria-label="Close dialog" @click="closeCallback" class="absolute top-3 right-3 z-20 p-2 rounded cursor-pointer transition
               text-primary-900 hover:text-primary-700
               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          <span class="text-2xl leading-none">&times;</span>
        </button>

        <!-- Header (non-scrolling) -->
        <div class="shrink-0 text-center mt-4 py-6 px-4 md:px-6 bg-primary-100">
          <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wide">
            Find Your Perfect Stylist
          </h2>
        </div>

        <!-- Scrollable content area -->
        <div ref="quizScroller" class="grow overflow-y-auto px-0 md:px-6 pb-6">
          <quiz-home v-if="mhhGlobal.quizVisible" :scroller-el="quizScroller" />
        </div>
      </div>
    </template>
  </Dialog>



</template>

<script setup>
import { mhhGlobal } from '~/composables/mhhGlobal';

import Dialog from '@/volt/Dialog';


const quizScroller = ref(null)

async function startQuiz() {
  await mhhGlobal.trackStart(ref, 0);
  mhhGlobal.quizVisible = true;
}

</script>

<style scoped>
/* mobile: remove horizontal padding on the Dialog content wrapper */
:deep(.quizDialog [data-pc-section="content"]) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* md+: restore normal padding (matches px-5 = 1.25rem) */
@media (min-width: 768px) {
  :deep(.quizDialog [data-pc-section="content"]) {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
}
</style>