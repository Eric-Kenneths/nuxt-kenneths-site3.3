<template>
  <transition name="fade">
    <div
      v-if="appGlobal.isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
    >
      <!-- Spinner -->
      <div class="h-16 w-16 border-4 border-primary-100 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </transition>
</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
