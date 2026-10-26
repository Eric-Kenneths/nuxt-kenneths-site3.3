<template>
    <div>
        <quiz-found-your-match v-if="mhhGlobal.step === '30'" />
    </div>
</template>

<script setup>
import { mhhGlobal } from '~/composables/mhhGlobal';
const route = useRoute()



var csid = route.query.csid;
var esid = route.query.esid;

mhhGlobal.step = '30';
mhhGlobal.isProfile = true;
mhhGlobal.csid = csid;
mhhGlobal.esid = esid;

const quizScroller = ref(null)


</script>

<style scoped></style>