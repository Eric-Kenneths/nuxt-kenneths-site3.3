<!-- /error.vue -->
<template>
    <div class="flex flex-col items-center justify-center h-screen text-center bg-primary-900">
        <img src="/images/header/kenneths-your-salon-spa.webp" alt="Logo" class="h-20 cursor-pointer" @click="handleError" />
        <h1 class="text-4xl font-bold mt-5 text-primary-500">Oops! Something went wrong.</h1>
        <p class="mt-4 mb-4 text-lg text-primary-100">{{ error?.message || 'An unexpected error occurred.' }}</p>
        <Button class="px-5" @click="handleError">Go Home</Button>
    </div>
</template>

<script setup>
    import Button from '@/volt/Button.vue';

    const error = useError()

    console.log(error);

    //TODO write error to erraudit

    useSeoMeta({
        robots: 'noindex, nofollow'
    })

    const handleError = () => clearError({ redirect: '/' })
</script>
