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

    <!-- Go Back Button -->
    <div class="flex justify-center text-center mt-2">
        <Button class="goBackNavButton" @click="previous" tabindex="99">
            Go Back
        </Button>
    </div>

  </div>

</template>

<script setup>
    import { mhhGlobal } from '~/composables/mhhGlobal';

    import Button from '@/volt/Button';

    mhhGlobal.question = 'Choose your desired level of expertise.';
    mhhGlobal.selectText = '';

    const state = reactive({
      responsesAllowed: 1,
      sqid: 28,
      questionNumber: 11,
      showProgress: true,
      responses: [
        {
            id: 161,
            href: '/images/quiz/budget/01.webp',
            selected: false
        },
        {
            id: 162,
            href: '/images/quiz/budget/02.webp',
            selected: false
        },
        {
            id: 163,
            href: '/images/quiz/budget/03.webp',
            selected: false
        },
        {
            id: 164,
            href: '/images/quiz/budget/04.webp',
            selected: false
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

    function previous() {
        saveState();
        mhhGlobal.step = mhhGlobal.GetPreviousRoutingPage(state.sqid.toString())
    }

    function next() {

      mhhGlobal.status = "";

      if (mhhGlobal.validateCustomerResponse(mhhGlobal.responses) == false) {
        mhhGlobal.validationMessage = "Please select at least one response";
        mhhGlobal.showValidationDialog = true;
        return;
      }
        saveState();

        mhhGlobal.step = '29'; //find-your-match page
    }

</script>

<style scoped>

</style>