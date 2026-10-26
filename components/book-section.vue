<template>
    <section class="relative z-10 flex items-center h-full py-5 md:py-12 bg-primary-500 text-primary-900 w-full">
        <div class="px-5 md:px-10 text-center mx-auto">
            <p class="k-section-title font-light uppercase">
                Book Your Beauty<br />Experience
            </p>

            <div>
                <pop-up-menu>
                    <template #trigger>
                        <span
                            class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2 font-bold">
                            BOOK ONLINE &rarr;
                        </span>
                    </template>
                    <template #links>
                        <div class="sans-serif p-3 k-section-link">
                            <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                        </div>
                        <div class="sans-serif p-3 k-section-link">
                            <a class="text-xl link" href="/book/new/service-type">New Customer</a>
                        </div>
                    </template>
                </pop-up-menu>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped></style>