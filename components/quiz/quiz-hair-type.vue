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

    mhhGlobal.question = 'Which best describes your hair type?';
    mhhGlobal.selectText = '(Choose up to two)';


    const state = reactive({
      responsesAllowed: 2,
      sqid: 18,
      questionNumber: 4,
      showProgress: true,
      responses: [
        {
            id: 100,
            href: '/images/quiz/hair-type/curly.webp',
            selected: false,
            description: 'Curly'
        },
        {
            id: 101,
            href: '/images/quiz/hair-type/coarse.webp',
            selected: false,
            description: 'Textured'
        },
        {
            id: 102,
            href: '/images/quiz/hair-type/fine.webp',
            selected: false,
            description: 'Fine'
        },
        {
            id: 103,
            href: '/images/quiz/hair-type/thin.webp',
            selected: false,
            description: 'Thin'
        },
        {
            id: 104,
            href: '/images/quiz/hair-type/straight.webp',
            selected: false,
            description: 'Straight'
        },
        {
            id: 105,
            href: '/images/quiz/hair-type/wavy.webp',
            selected: false,
            description: 'Wavy'
        },
        {
            id: 106,
            href: '/images/quiz/hair-type/thick.webp',
            selected: false,
            description: 'Thick'
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

      state.status = "";

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