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

    mhhGlobal.question = 'Which decade were you born?';
    mhhGlobal.selectText = '';

    const state = reactive({
      responsesAllowed: 1,
      sqid: 27,
      questionNumber: 10,
      showProgress: true,
      responses: [
        {
            id: 153,
            href: '/images/quiz/decade/1930.webp',
            selected: false,
            description: '1930'
        },
        {
            id: 154,
            href: '/images/quiz/decade/1940.webp',
            selected: false,
            description: '1940'
        },
        {
            id: 155,
            href: '/images/quiz/decade/1950.webp',
            selected: false,
            description: '1950'
        },
        {
            id: 156,
            href: '/images/quiz/decade/1960.webp',
            selected: false,
            description: '1960'
        },
        {
            id: 157,
            href: '/images/quiz/decade/1970.webp',
            selected: false,
            description: '1970'
        },
        {
            id: 158,
            href: '/images/quiz/decade/1980.webp',
            selected: false,
            description: '1980'
        },
        {
            id: 159,
            href: '/images/quiz/decade/1990.webp',
            selected: false,
            description: '1990'
        },
        {
            id: 160,
            href: '/images/quiz/decade/2000.webp',
            selected: false,
            description: '2000'
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