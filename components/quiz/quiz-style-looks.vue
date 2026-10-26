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

mhhGlobal.question = 'Length wise what is your hair goal?';
mhhGlobal.selectText = '(Choose one)';

const state = reactive({
    responsesAllowed: 1,
    sqid: 17,
    questionNumber: 3,
    showProgress: true,
    responses: [
        {
            id: 96,
            href: '/images/quiz/style-looks/long-layers.webp',
            selected: false,
            description: 'Long Layers'
        },
        {
            id: 97,
            href: '/images/quiz/style-looks/mid-length.webp',
            selected: false,
            description: 'Mid Length'
        },
        {
            id: 98,
            href: '/images/quiz/style-looks/pixie.webp',
            selected: false,
            description: 'Pixie/Crop'
        },
        {
            id: 99,
            href: '/images/quiz/style-looks/bob.webp',
            selected: false,
            description: 'Bob'
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
        mhhGlobal.validationMessage = "Please select one response";
        mhhGlobal.showValidationDialog = true;
        return;
    }
    saveState();

    mhhGlobal.step = mhhGlobal.GetNextRoutingPage(state.sqid.toString())

}

</script>

<style scoped></style>