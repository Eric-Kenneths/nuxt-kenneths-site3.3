<template>
    <div>
        <div class="grid grid-cols-12 text-center justify-center pt-6">
            <div class="col-span-12 flex justify-center items-center font-sans text-xl lg:text-2xl">
                <div v-if="state.showMessage" class="col-span-12">
                    It appears that you have already completed your pre-appointment form(s).
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useSurveyFactory } from '~/composables/useSurveyFactory';

definePageMeta({
    layout: 'basic'
})

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }
    ]
})

const route = useRoute();

const { getKenSurveyLinks } = useSurveyFactory();

const state = reactive({
    showMessage: false
});


onMounted(async () => {
    let respondentCode = route.query.r;
    let surveyType = route.query.s;

    if (respondentCode !== undefined) {
        respondentCode = respondentCode.toUpperCase();
    }

    if (surveyType === undefined) {
        let kenSurveyLinks = await getKenSurveyLinks(respondentCode, false);

        if (kenSurveyLinks.length > 0) {
            surveyType = kenSurveyLinks[0].surveyCodes;
        } else {
            state.showMessage = true;
            return;
        }
    } else {
        surveyType = surveyType.toUpperCase();
    }

    let url = 'https://kennethsinfo.z13.web.core.windows.net?r=' + respondentCode + '&s=' + surveyType;

    window.location.replace(url);

})

</script>

<style scoped></style>