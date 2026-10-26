<template>
    <busy-spinner />
    <div class="mx-auto max-w-[1600px] caret-transparent bg-primary-100 min-h-screen">
        <div class="py-4">
            <a href="/" class="no-underline">
                <img src="/images/icons/logo-dark-medium.webp" alt="Kenneth's Hair Salons And Spas Columbus"
                    class="select-none cursor-pointer w-30 mx-auto block" />
            </a>
        </div>

        <slot />
    </div>
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

<style scoped></style>