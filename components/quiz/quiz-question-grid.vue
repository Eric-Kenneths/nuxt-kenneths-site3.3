<template>
    <div v-for="(response, index) in mhhGlobal.responses" :key="response.id"
        class="customerResponseContainer cursor-pointer" @click="selectResponse(response)">

        <img :src="response.href" class="customerImageResponse" :alt="response.description"
            :aria-label="response.description" :tabindex="index * 2 + 1" />

        <img v-show="response.selected" class="checkMarkOverLay" src="/images/quiz/shared/check-mark-dark.png"
            :alt="response.description + ' Selected - Click to Unselect'"
            :aria-label="response.description + ' Selected'" :tabindex="index * 2 + 2" />

        <div class="text-center">
            {{ response.description }}
        </div>

    </div>
</template>

<script setup>

    function selectResponse(response) {
      mhhGlobal.status = mhhGlobal.selectCustomerResponse(
        mhhGlobal.responses,
        response,
        mhhGlobal.responsesAllowed
      );
    }


</script>

<style scoped></style>