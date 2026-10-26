<template>
    <section class="bg-primary-900 pt-24 md:pt-35">
        <div class="mx-auto max-w-[1600px] px-4 pb-14 md:px-8">
            <!-- Hero -->
            <section class="rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/5 overflow-hidden"
                aria-labelledby="spa-hero-title">
                <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-12 md:items-center">
                    <div class="md:col-span-6 text-center md:text-left">
                        <h1 id="spa-hero-title" class="k-section-title tracking-tight text-primary-900">
                            Experience Luxury at Kenneth's
                        </h1>

                        <h2 class="mt-3 text-2xl sm:text-3xl font-bold text-primary-900">
                            20% Off Your First Spa Appointment
                        </h2>

                        <p class="mt-4 k-para-text leading-relaxed text-black/70">
                            Discover indulgence redefined — facials, massages, nails, and more, crafted for your
                            ultimate self-care.
                        </p>

                        <div class="mt-6">
                            <a href="/book/new/promo?d=dfv"
                                class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-900 px-6 py-3 k-section-link uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                aria-label="Book your spa appointment online with the 20 percent off offer">
                                Book Your Appointment Online
                            </a>
                        </div>
                    </div>

                    <div class="md:col-span-6">
                        <img src="/images/promo/spa/kenneths-foyer.webp" loading="eager" fetchpriority="high"
                            alt="Kenneth's Spa"
                            class="w-full rounded-2xl shadow-md ring-1 ring-black/10 object-cover" />
                    </div>
                </div>
            </section>

            <!-- Trust -->
            <section class="mt-8 rounded-3xl bg-white/90 shadow-lg ring-1 ring-black/5 p-5 sm:p-8 text-center"
                aria-labelledby="spa-trust-title">
                <h3 id="spa-trust-title" class="k-section-link font-extrabold text-primary-900">
                    Trusted for Generations
                </h3>
                <p class="mt-2 k-para-text text-black/70">
                    Kenneth's has been Central Ohio's luxury salon &amp; spa destination for 5+ generations. Rated
                    <strong class="text-primary-900">4.7★</strong> on Google across 10 locations.
                </p>
            </section>

            <!-- Services -->
            <section class="mt-8">
                <div class="rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                    <h2 class="k-section-title tracking-tight text-primary-900 text-center">
                        Our Spa Services
                    </h2>

                    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <article v-for="service in services" :key="service.title"
                            class="group h-full rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex flex-col">
                            <img :src="service.image" :alt="`${service.title} at Kenneth's`"
                                class="h-48 w-full object-cover" loading="lazy" />

                            <!-- flex-1 + mt-auto ensures button is pinned to bottom -->
                            <div class="flex flex-col flex-1 p-5">
                                <h3 class="k-para-text font-extrabold text-primary-900">
                                    {{ service.title }}
                                </h3>

                                <p class="mt-2 k-para-text leading-relaxed text-black/70">
                                    {{ service.description }}
                                </p>

                                <div class="mt-auto pt-5">
                                    <a :href="service.buttonLink"
                                        class="inline-flex w-full items-center justify-center rounded-full bg-primary-900 px-5 py-3 text-lg k-para-text uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                        :aria-label="service.buttonText">
                                        {{ service.buttonText }}
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Why Choose -->
            <section class="mt-8 rounded-3xl bg-white/90 shadow-lg ring-1 ring-black/5 p-5 sm:p-8 text-center"
                aria-labelledby="spa-why-title">
                <h2 id="spa-why-title" class="k-section-title text-primary-900">
                    Why Choose Kenneth's?
                </h2>
                <p class="mt-3 mx-auto max-w-3xl k-para-text leading-relaxed text-black/70">
                    From personalized care to creative artistry, our professional team delivers a consistent,
                    luxury experience. 10 convenient Central Ohio locations, serving all with inclusivity and
                    excellence.
                </p>
            </section>

            <!-- Testimonials (dark styling + stars like wax.vue) -->
            <section class="mt-8 rounded-3xl bg-primary-900 text-primary-100 shadow-xl ring-1 ring-black/10">
                <div class="p-5 sm:p-8">
                    <h2 class="text-center k-section-title">
                        What Our Clients Say
                    </h2>

                    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <article v-for="(review, index) in reviews" :key="index"
                            class="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 flex flex-col h-full">
                            <div class="flex justify-center" aria-label="5 out of 5 stars">
                                <StarRating :rating="5" />
                            </div>

                            <blockquote class="mt-3 k-para-text leading-relaxed text-primary-100/90">
                                “{{ review.text }}”
                            </blockquote>

                            <div class="mt-4 k-para-text font-bold text-primary-100">
                                - {{ review.author }}
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section class="mt-8 rounded-3xl bg-primary-900 shadow-xl ring-1 ring-black/10 p-6 sm:p-10 text-center"
                aria-labelledby="spa-cta-title">
                <h2 id="spa-cta-title" class="k-section-title tracking-tight text-primary-100">
                    Book Your First Spa Appointment Today &amp; Enjoy 20% Off
                </h2>

                <div class="mt-6">
                    <a href="/book/new/promo?d=dfv"
                        class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-100 px-6 py-3 k-section-link uppercase tracking-wide text-primary-900 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                        aria-label="Book online now for your first spa appointment and receive 20 percent off">
                        Book Online Now
                    </a>
                </div>
            </section>

            <!-- Booking Section -->
            <section id="booking"
                class="mt-8 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 p-5 sm:p-8 text-center"
                aria-labelledby="spa-booking-title">
                <h2 id="spa-booking-title" class="k-section-title text-primary-900">
                    Start Your Booking
                </h2>
                <p class="mt-3 mx-auto max-w-3xl k-para-text leading-relaxed text-black/70">
                    10 convenient Central Ohio locations — same luxury at every one. Find your closest
                    Kenneth's and begin your spa journey today.
                </p>

                <div class="mt-6">
                    <a href="/book/new/promo?d=dfv"
                        class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-900 px-6 py-3 k-section-link uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="Start your spa booking">
                        Start Your Booking
                    </a>
                </div>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }

    ]
})

const services = ref([
    {
        title: 'Facials',
        description: 'Rejuvenate and refresh with advanced treatments for radiant skin.',
        image: '/images/promo/spa/facial-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=esthetic',
        buttonText: 'Book a Facial',
    },
    {
        title: 'Head Spa',
        description: 'Experience the luxury of scalp rejuvenation with our Japanese Head Spa.',
        image: '/images/promo/spa/headspa-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=bar',
        buttonText: 'Book a Head Spa',
    },
    {
        title: 'Manicures',
        description: 'Flawless nails and indulgent care with our precision manicures.',
        image: '/images/promo/spa/manicure-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=nail',
        buttonText: 'Book a Manicure',
    },
    {
        title: 'Pedicures',
        description: 'Pamper your feet and restore balance with our spa pedicures.',
        image: '/images/promo/spa/pedicure-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=nail',
        buttonText: 'Book a Pedicure',
    },
    {
        title: 'Waxing',
        description: 'Smooth, confident results with expert waxing services.',
        image: '/images/promo/spa/waxing-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=wax',
        buttonText: 'Book a Waxing',
    },
    {
        title: 'Massage',
        description: 'Relax and release stress with our therapeutic and luxury massage sessions.',
        image: '/images/promo/spa/massage-promo.webp',
        buttonLink: '/book/new/promo?d=dfv&v=massage',
        buttonText: 'Book a Massage',
    },
])

const reviews = ref([
    {
        text: "I just gifted myself a headspa treatment at Kenneth's Polaris, and what a treat! I have never felt so relaxed. It was one hour of pure bliss! Emily did an amazing job making sure that no detail was overlooked, and I will definitely return!",
        author: 'Melissa Hall',
    },
    {
        text: 'I have gone to Elizabeth at the Polaris location twice now and continue to be really pleased with her and the services performed. I have had dermaplaning and full facials both times and Elizabeth is knowledgeable, takes her time and provides a professional and relaxing experience. The salon itself is lovely. I will continue to go to her and would definitely recommend!',
        author: 'Jennifer',
    },
    {
        text: 'Olive is great, so kind and friendly! She does a great job on my nails and they last for about 4 weeks (gel). I was so thankful to find her because I am super picky about how my nails look and they were perfect! Thanks Olive, really appreciate you and your craft!',
        author: 'Stephanie',
    },
])
</script>