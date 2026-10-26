<template>
    <div class="bg-primary-100 text-primary-900">

        <div class="py-3 px-2">
            <ProgressBar v-if="mhhGlobal.showProgress" :value="mhhGlobal.questionProgress" :showValue="false"
                aria-label="Progress Bar" />
        </div>

        <div class="text-center text-xl md:text-3xl py-3 font-bold">
            {{ mhhGlobal.question }}
        </div>

        <div class="text-center text-lg k-para-text py-3">
            {{ mhhGlobal.selectText }}
        </div>

        <quiz-services v-if="mhhGlobal.step === '15'" />

        <quiz-color v-if="mhhGlobal.step === '16'" />

        <quiz-style-looks v-if="mhhGlobal.step === '17'" />

        <quiz-hair-type v-if="mhhGlobal.step === '18'" />

        <quiz-personal-style v-if="mhhGlobal.step === '19'" />

        <quiz-describes-me v-if="mhhGlobal.step === '20'" />

        <quiz-hobbies v-if="mhhGlobal.step === '21'" />

        <quiz-personality v-if="mhhGlobal.step === '22'" />

        <quiz-location v-if="mhhGlobal.step === '26'" />

        <quiz-decade v-if="mhhGlobal.step === '27'" />

        <quiz-budget v-if="mhhGlobal.step === '28'" />

        <quiz-find-your-match v-if="mhhGlobal.step === '29'" />

        <quiz-found-your-match v-if="mhhGlobal.step === '30'" />

        <div class="py-4">

        </div>

        <Dialog v-model:visible="mhhGlobal.showValidationDialog" :modal="true" header="Kenneth's Salons + Day Spas"
            class="p-0 m-2 w-full md:w-1/2">
            <div class="flex justify-center p-0 m-0">
                <div class="text-center p-0 m-0">
                    <div class="flex flex-col items-center py-5 space-y-4">
                        <!-- Info Text -->
                        <div class="w-full text-center text-xl leading-relaxed">
                            {{ mhhGlobal.validationMessage }}
                        </div>

                        <div class="mt-10">
                            <Button label="Close" @click="mhhGlobal.showValidationDialog = false" class="px-7" />
                        </div>

                    </div>
                </div>
            </div>
        </Dialog>

    </div>
</template>

<script setup>
import { mhhGlobal } from '~/composables/mhhGlobal';

import ProgressBar from '@/volt/ProgressBar';
import Dialog from '@/volt/Dialog';
import Button from '@/volt/Button.vue';

const props = defineProps({
    scrollerEl: { type: Object, default: null }, // ref passed from parent
})


function scrollToTop() {
    const el = props.scrollerEl;

    if (!el) return
    el.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

watch(
    () => mhhGlobal.step,
    async () => {
        // wait for the new step component to render

        await nextTick()
        scrollToTop()
    }
)

mhhGlobal.showValidationDialog = false;
console.log('QUIZ START')

//question page key
// 15	services
// 16	color
// 17	style-looks
// 18	hair-type
// 19	personal-style
// 20	describes-me
// 21	hobbies
// 22	personality
// 26	location
// 27	decade
// 28	budget


mhhGlobal.step = '15';





</script>

<style scoped></style>