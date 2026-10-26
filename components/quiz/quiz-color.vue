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

mhhGlobal.question = 'Colorwise what is your hair goal?';
mhhGlobal.selectText = '(Choose one)';

const state = reactive({
    responsesAllowed: 1,
    sqid: 16,
    questionNumber: 2,
    showProgress: true,
    responses: [
        {
            id: 91,
            href: "/images/quiz/color/blonde.webp",
            selected: false,
            description: 'Blonding'
        },
        {
            id: 92,
            href: "/images/quiz/color/balayage.webp",
            selected: false,
            description: 'Balayage / Highlights'
        },
        {
            id: 93,
            href: "/images/quiz/color/brunette.webp",
            selected: false,
            description: 'Brunette / Dark'
        },
        {
            id: 94,
            href: "/images/quiz/color/red-or-auburn.webp",
            selected: false,
            description: 'Red or Auburn'
        },
        {
            id: 95,
            href: "/images/quiz/color/fashion.webp",
            selected: false,
            description: 'Fashion / Fantasy'
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

    mhhGlobal.step = mhhGlobal.GetNextRoutingPage(state.sqid.toString())
}

</script>

<style scoped></style>