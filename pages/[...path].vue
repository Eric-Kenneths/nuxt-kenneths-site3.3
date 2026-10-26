<template>
   
    <div class="flex bg-primary-900 items-center justify-center py-16">
        <div class="py-16 w-full text-primary-100 mt-16 text-center">
            <h1 class="text-4xl">404</h1>
            <p class="text-xl">Oops! The page you're looking for doesn't exist.</p>
            <a class="text-lg underline" href="/">Go Back to Home</a>
        </div>
    </div>
  
</template>

<script setup>
const route = useRoute()

console.log('404 Page!')

if (process.server) {
  const event = useRequestEvent()
  if (event) {
    setResponseStatus(event, 404)
  }
}

useSeoMeta({
  title: '404 - Page Not Found',
  robots: 'noindex, nofollow',
  description: `The page ${route.fullPath} could not be found.`
})
</script>

<style scoped></style>