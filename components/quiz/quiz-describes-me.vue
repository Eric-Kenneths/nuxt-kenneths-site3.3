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

    mhhGlobal.question = 'Which words best describe you?';
    mhhGlobal.selectText = '(Select all that apply)';

    const state = reactive({
      responsesAllowed: 0,
      sqid: 20,
      questionNumber: 6,
      showProgress: true,
      responses: [
        {
            id: 126,
            href: '/images/quiz/describes-me/classic.webp',
            selected: false,
            description: 'Classic'
        },
        {
            id: 127,
            href: '/images/quiz/describes-me/reliable.webp',
            selected: false,
            description: 'Reliable'
        },
        {
            id: 128,
            href: '/images/quiz/describes-me/out-going.webp',
            selected: false,
            description: 'Outgoing'
        },
        {
            id: 129,
            href: '/images/quiz/describes-me/charming.webp',
            selected: false,
            description: 'Charming'
        },
        {
            id: 130,
            href: '/images/quiz/describes-me/stylish.webp',
            selected: false,
            description: 'Stylish'
        },
        {
            id: 131,
            href: '/images/quiz/describes-me/easy-going.webp',
            selected: false,
            description: 'Easy Going'
        },
        {
            id: 132,
            href: '/images/quiz/describes-me/modern.webp',
            selected: false,
            description: 'Modern'
        },
        {
            id: 133,
            href: '/images/quiz/describes-me/creative.webp',
            selected: false,
            description: 'Creative'
        },
        {
            id: 134,
            href: '/images/quiz/describes-me/reserved.webp',
            selected: false,
            description: 'Reserved'
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

        mhhGlobal.step = mhhGlobal.GetNextRoutingPage(state.sqid.toString());
    }

</script>

<style scoped>

</style>