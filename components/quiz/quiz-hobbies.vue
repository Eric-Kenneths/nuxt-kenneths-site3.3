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

    mhhGlobal.question = 'My personal interest or hobbies are?';
    mhhGlobal.selectText = '(Select all that apply)';

    const state = reactive({
      responsesAllowed: 0,
      sqid: 21,
      questionNumber: 7,
      showProgress: true,
      responses: [
        {
            id: 111,
            href: '/images/quiz/hobbies/sports.webp',
            selected: false,
            description: 'Sports'
        },
        {
            id: 112,
            href: '/images/quiz/hobbies/gaming.webp',
            selected: false,
            description: 'Gaming'
        },
        {
            id: 113,
            href: '/images/quiz/hobbies/volunteering.webp',
            selected: false,
            description: 'Volunteering'
        },
        {
            id: 114,
            href: '/images/quiz/hobbies/theater.webp',
            selected: false,
            description: 'Performing Arts'
        },
        {
            id: 115,
            href: '/images/quiz/hobbies/reading-and-writing.webp',
            selected: false,
            description: 'Reading / Writing'
        },
        {
            id: 116,
            href: '/images/quiz/hobbies/tv-and-movies.webp',
            selected: false,
            description: 'TV / Movies'
        },
        {
            id: 117,
            href: '/images/quiz/hobbies/music-and-concerts.webp',
            selected: false,
            description: 'Music / Concerts'
        },
        {
            id: 118,
            href: '/images/quiz/hobbies/pets.webp',
            selected: false,
            description: 'Pet Lover'
        },
        {
            id: 119,
            href: '/images/quiz/hobbies/crafts.webp',
            selected: false,
            description: 'Crafts / DIY'
        },
        {
            id: 120,
            href: '/images/quiz/hobbies/gardening.webp',
            selected: false,
            description: 'Gardening'
        },
        {
            id: 121,
            href: '/images/quiz/hobbies/cooking.webp',
            selected: false,
            description: 'Cooking'
        },
        {
            id: 122,
            href: '/images/quiz/hobbies/art.webp',
            selected: false,
            description: 'Art / Photo'
        },
        {
            id: 123,
            href: '/images/quiz/hobbies/traveling.webp',
            selected: false,
            description: 'Traveling'
        },
        {
            id: 124,
            href: '/images/quiz/hobbies/wine-and-food.webp',
            selected: false,
            description: 'Beer / Wine / Foodie'
        },
        {
            id: 125,
            href: '/images/quiz/hobbies/camping.webp',
            selected: false,
            description: 'Outdoors / Camping'
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