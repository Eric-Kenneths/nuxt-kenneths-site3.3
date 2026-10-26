<template>
  <div class="flex items-center" aria-hidden="true">
    <template v-for="i in 5" :key="i">
      <!-- full star -->
      <svg v-if="numericRating >= i" class="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.383-2.46a1 1 0 00-1.176 0l-3.383 2.46c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.047 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>

      <!-- half star -->
      <svg v-else-if="numericRating > i - 1 && numericRating < i" class="w-5 h-5 text-yellow-500 mr-1"
        fill="currentColor" viewBox="0 0 20 20">
        <defs>
          <linearGradient :id="`half-${uid}-${i}`">
            <stop offset="50%" stop-color="currentColor" />
            <stop offset="50%" stop-color="transparent" stop-opacity="1" />
          </linearGradient>
        </defs>
        <path :fill="`url(#half-${uid}-${i})`"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.383-2.46a1 1 0 00-1.176 0l-3.383 2.46c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.047 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>

      <!-- empty star -->
      <svg v-else class="w-5 h-5 text-gray-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.383-2.46a1 1 0 00-1.176 0l-3.383 2.46c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.047 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: {
    type: [Number, String],
    default: 0
  }
})

const uid = useId()
const numericRating = computed(() => Number(props.rating) || 0)
</script>