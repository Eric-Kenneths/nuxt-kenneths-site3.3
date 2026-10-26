<template>
    <div v-if="giftCardGlobal.webOrderGCs.length > 0" class="absolute top-0 right-0 pt-1 pr-1 z-40">
      <Button type="button" class="bg-primary-900 !text-primary-100 rounded-md w-13 h-8 shadow-sm border border-primary-500 hover:shadow-md hover:scale-[1.03] transition-all duration-200 ease-in-out flex items-center justify-center font-semibold tracking-wide" label="Cart" size="small" @click="router.push('/shop/gift-cards/cart')">
         <img
          src="/images/icons/k-icon-light-small.webp"
          alt="Gift Card"
          class="w-5 h-5 object-contain" />
        </Button>

        <span
          v-if="giftCardGlobal.webOrderGCs.length"
          class="absolute top-1 right-1  bg-primary-100 text-primary-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
          {{ giftCardGlobal.webOrderGCs.length }}
        </span>
    </div>
</template>

<script setup>
import Button from '@/volt/Button.vue';
import { giftCardGlobal } from '~/composables/giftCardGlobal';

const router = useRouter();

</script>

<style lang="scss" scoped>

</style>