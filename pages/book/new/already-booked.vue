<template>
    <div class="bg-primary-100 pt-30 pb-20 text-primary-900">
        <!-- Message -->
        <div class="flex justify-center pt-5 text-center">
            <div class="w-full flex justify-center items-center font-sans text-xl lg:text-2xl">
                <div class="w-full max-w-[700px]">
                    It appears that you may have already booked through our first timer booking app. Call
                    614-538-5800 if you need to adjust an appointment or you think this may be a mistake.
                </div>
            </div>
        </div>

        <!-- Link -->
        <div class="flex justify-center pt-4 text-center">
            <div class="w-full flex justify-center items-center font-sans text-xl lg:text-2xl">
                <div class="w-full max-w-[700px]">
                    <a href="https://kenneths.com/app/"
                        class="underline hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                        Full Appointment Book
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Book a Service | Already Booked',
    meta: [
        {
            name: 'description',
            content: 'It appears you may have already booked through Kenneth’s first timer booking app.'
        },
        {
            property: 'og:description',
            content: 'It appears you may have already booked through Kenneth’s first timer booking app.'
        },
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots'
        }
    ]
})
</script>

<style scoped></style>