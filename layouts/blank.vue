<template>
    <main class="mx-auto max-w-[1600px] caret-transparent">
      <slot />
    </main>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const canonicalUrl = computed(() => {
  return `${config.public.siteUrl}${route.path}`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ],
  meta: [
    {
      property: 'og:url',
      content: canonicalUrl
    },
    {
      property: 'og:image',
      content: 'https:/kenneths.com/images/icons/logo-dark-medium.webp'
    }
  ]
})
</script>

<style scoped>

</style>