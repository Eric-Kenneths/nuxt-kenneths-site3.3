<template>

  <div class="w-full">
    <!-- Response Grid -->
    <div class="flex justify-center">
      <div class="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            max-w-6xl
            w-full
          ">
        <quiz-question-grid />
      </div>
    </div>

    <!-- Next Button -->
    <div class="flex justify-center text-center mt-3">
      <Button class="customerNavButton" @click="next" tabindex="98">
        Next Question &#9658;
      </Button>
    </div>

  </div>

</template>


<script setup>
import { mhhGlobal } from '~/composables/mhhGlobal';

import Button from '@/volt/Button';

mhhGlobal.question = 'What services are you interested in receiving?';
mhhGlobal.selectText = '(SELECT ALL THAT APPLY)';
mhhGlobal.questionProgress = 0;

const state = reactive({
  responsesAllowed: 0,
  sqid: 15,
  questionNumber: 1,
  showProgress: true,
  responses: [
    {
      id: 84,
      href: "/images/quiz/services/womens-haircut.webp",
      selected: false,
      description: 'Haircut'
    },
    {
      id: 85,
      href: "/images/quiz/services/hair-coloring.webp",
      selected: false,
      description: 'Coloring'
    },
    {
      id: 86,
      href: "/images/quiz/services/hair-extensions.webp",
      selected: false,
      description: 'Extensions'
    },
    {
      id: 87,
      href: "/images/quiz/services/hair-styling.webp",
      selected: false,
      description: 'Styling'
    },
    {
      id: 88,
      href: "/images/quiz/services/updo.webp",
      selected: false,
      description: 'Updo'
    },
    {
      id: 89,
      href: "/images/quiz/services/smoothing-treatments.webp",
      selected: false,
      description: 'Smoothing'
    },
    {
      id: 90,
      href: "/images/quiz/services/perms.webp",
      selected: false,
      description: 'Perms'
    }
  ]
});

onMounted(() => {

  mhhGlobal.track(state.sqid);
  mhhGlobal.returnCustomerResponseState(state.responses);
  mhhGlobal.questionProgress = mhhGlobal.getQuestionProgress(state.questionNumber);
  mhhGlobal.showProgress = state.showProgress;
  mhhGlobal.responses = state.responses;
  mhhGlobal.responsesAllowed = state.responsesAllowed;


  window.scrollTo(0, 0);
});


function saveState() {
  mhhGlobal.clearCustomerResponses(state.sqid);
  mhhGlobal.saveCustomerResponseState(mhhGlobal.responses, state.sqid);
}

function next() {

  mhhGlobal.status = "";

  if (mhhGlobal.validateCustomerResponse(mhhGlobal.responses) == false) {
    mhhGlobal.validationMessage = "Please select at least one response";
    mhhGlobal.showValidationDialog = true;
    return;
  }
  saveState();

  mhhGlobal.step = mhhGlobal.GetNextRoutingPage(state.sqid.toString())

}



</script>

<style scoped></style>