<template>
    <section class="bg-primary-900 pt-24 md:pt-25">

        <div vocab="https://schema.org/" typeof="BeautySalon" class="bg-primary-900">
            <div class="mx-auto max-w-[1600px] px-4 pt-8 pb-14 sm:pt-10 md:px-8">
                <!-- Title Banner -->
                <section class="rounded-3xl bg-primary-900 text-primary-100 shadow-xl ring-1 ring-black/10">
                    <div class="px-5 py-6 sm:px-8 sm:py-8 text-center">
                        <h1 class="m-0">
                            <span class="font-thin text-2xl md:text-3xl lg:text-8xl font-extrabold tracking-tight">
                                Flawless Skin Starts Here
                            </span>
                        </h1>
                    </div>
                </section>

                <!-- Hero + Offer -->
                <section class="mt-6 rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/5 overflow-hidden"
                    aria-labelledby="wax-hero-title">
                    <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:items-center">
                        <!-- Image -->
                        <div class="lg:col-span-4 flex justify-center lg:justify-start">
                            <img src="/images/promo/waxing-promo-main-image.webp" loading="eager" fetchpriority="high"
                                alt="Waxing main image"
                                class="w-full max-w-[340px] rounded-2xl shadow-md ring-1 ring-black/10 object-cover" />
                        </div>

                        <!-- Copy -->
                        <div class="lg:col-span-8">
                            <h2 id="wax-hero-title" class="k-section-title tracking-tight text-primary-900">
                                Smooth, Confident, and Beautiful -
                                <br class="hidden sm:block" />
                                Your First Wax is on Us!
                            </h2>

                            <div class="mt-4 flex justify-start">
                                <div class="h-0.5 w-24 bg-primary-900" aria-hidden="true"></div>
                            </div>

                            <p class="mt-4 text-base k-para-text leading-relaxed text-black/70">
                                At Kenneth's, we believe that everyone deserves to feel beautiful and confident in their
                                skin.
                                Whether you're new to waxing or just looking for expert care, we have the perfect offer
                                for
                                you:
                            </p>

                            <!-- Offer Box -->
                            <section class="mt-5 rounded-2xl border border-black/20 bg-white p-4 sm:p-5" role="region"
                                aria-label="Waxing Service Offers">
                                <p
                                    class="text-center font-extrabold text-sm sm:text-base md:text-xl tracking-[0.25em] text-primary-900">
                                    TRY A NEW WAXING SERVICE
                                </p>

                                <div class="mt-4 grid grid-cols-12 items-center gap-3">
                                    <div class="col-span-5 flex justify-center">
                                        <a :href="state.faceWaxUrl"
                                            class="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
                                            aria-label="Book a complimentary facial waxing service">
                                            <img src="/images/promo/first-facial-wax-free-button.webp"
                                                alt="First facial wax free" class="w-full max-w-[200px] cursor-pointer"
                                                loading="lazy" />
                                        </a>
                                    </div>

                                    <div class="col-span-2 text-center font-bold text-primary-900" aria-hidden="true">
                                        OR
                                    </div>

                                    <div class="col-span-5 flex justify-center">
                                        <a :href="state.bikiniWaxUrl"
                                            class="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
                                            aria-label="Book 50 percent off your first bikini or Brazilian wax">
                                            <img src="/images/promo/half-off-bikini-or-brazillian-button.webp"
                                                alt="Half off bikini or Brazilian"
                                                class="w-full max-w-[200px] cursor-pointer" loading="lazy" />
                                        </a>
                                    </div>
                                </div>

                                <p class="mt-3 text-center text-xs text-black/60">
                                    *This offer is exclusively for first-time waxing guests and is limited to one
                                    redemption
                                    per person.
                                </p>
                            </section>

                            <p class="mt-5 k-para-text text-black/70">
                                Choose <strong class="text-primary-900">1/2 off a Bikini or Brazilian</strong> or a
                                complimentary facial waxing service on one area of your choice—
                                <strong class="text-primary-900">eyebrow, lip, or chin.</strong>
                            </p>
                        </div>
                    </div>
                </section>

                <!-- 3 Images Row (desktop only) -->
                <section class="mt-6 hidden md:block">
                    <div class="rounded-3xl bg-white/90 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                        <div class="grid grid-cols-3 gap-4">
                            <img src="/images/promo/waxing-promo-group-image-1-of-3.webp"
                                alt="Waxing treatment guest with smooth skin"
                                class="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/10" loading="lazy" />
                            <img src="/images/promo/waxing-promo-group-image-2-of-3.webp"
                                alt="Waxing treatment guest in bathing suit"
                                class="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/10" loading="lazy" />
                            <img src="/images/promo/waxing-promo-group-image-3-of-3.webp"
                                alt="Waxing treatment guest with facial waxing"
                                class="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/10" loading="lazy" />
                        </div>
                    </div>
                </section>

                <!-- Why Choose -->
                <section class="mt-6 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 overflow-hidden">
                    <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:items-center">
                        <div class="lg:col-span-4 flex justify-center lg:justify-start">
                            <img src="/images/promo/waxing-promo-spa-image.webp" alt="Spa entrance and front desk"
                                class="w-full max-w-[340px] rounded-2xl shadow-md ring-1 ring-black/10 object-cover"
                                loading="lazy" />
                        </div>

                        <div class="lg:col-span-8">
                            <h2 class="k-section-title tracking-tight text-primary-900">
                                Why Choose Kenneth's for your Waxing Services?
                            </h2>

                            <ul class="mt-4 list-disc pl-5 text-base k-para-text leading-relaxed text-black/70">
                                <li>
                                    <strong class="text-primary-900">Expert Estheticians</strong> — Skilled
                                    professionals
                                    ensure a
                                    comfortable, precise, and effective waxing experience.
                                </li>
                                <li>
                                    <strong class="text-primary-900">High-Quality Products</strong> — We use gentle yet
                                    effective
                                    formulas for the best results with minimal irritation.
                                </li>
                                <li>
                                    <strong class="text-primary-900">A Relaxing Experience</strong> — Our spa-like
                                    atmosphere makes
                                    every visit comfortable and stress-free.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Indulge Section -->
                <section class="mt-6 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 overflow-hidden">
                    <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:items-start">
                        <div class="lg:col-span-8">
                            <h2 class="k-section-title tracking-tight text-primary-900">
                                The Perfect Time to Indulge?
                            </h2>

                            <p class="mt-4 k-para-text leading-relaxed text-black/70">
                                This is your chance to experience our premium waxing services at an exclusive first-time
                                client
                                offer. Whether you're preparing for an event, embracing self-care, or simply refreshing
                                your
                                look,
                                Kenneth's is here to make every moment feel beautiful.
                            </p>

                            <p class="mt-4 k-para-text leading-relaxed text-black/70">
                                Waxing isn't just about hair removal-it's about confidence. With regular waxing, you'll
                                enjoy
                                smoother skin, slower regrowth, and an effortless glow that lasts. Our experienced
                                estheticians make
                                the process quick, easy, and as painless as possible, ensuring you leave feeling
                                refreshed
                                and radiant.
                            </p>
                        </div>

                        <div class="lg:col-span-4 flex justify-center lg:justify-end">
                            <img src="/images/promo/waxing-promo-swim-image.webp" alt="Woman in bathing suit"
                                class="w-full max-w-[340px] rounded-2xl shadow-md ring-1 ring-black/10 object-cover"
                                loading="lazy" />
                        </div>
                    </div>
                </section>

                <!-- Book Now + Offer Repeat -->
                <section class="mt-6 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 overflow-hidden">
                    <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:items-start">
                        <div class="lg:col-span-4 flex justify-center lg:justify-start">
                            <img src="/images/promo/waxing-promo-eyebrow-image.webp" alt="Woman doing eyebrows"
                                class="w-full max-w-[340px] rounded-2xl shadow-md ring-1 ring-black/10 object-cover"
                                loading="lazy" />
                        </div>

                        <div class="lg:col-span-8">
                            <section class="rounded-2xl border border-black/20 bg-white p-4 sm:p-5" role="region"
                                aria-label="Waxing Service Offers">
                                <p
                                    class="text-center font-extrabold text-sm sm:text-base md:text-xl tracking-[0.25em] text-primary-900">
                                    TRY A NEW WAXING SERVICE
                                </p>

                                <div class="mt-4 grid grid-cols-12 items-center gap-3">
                                    <div class="col-span-5 flex justify-center">
                                        <a :href="state.faceWaxUrl"
                                            class="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
                                            aria-label="Book a complimentary facial waxing service">
                                            <img src="/images/promo/first-facial-wax-free-button.webp"
                                                alt="First facial wax free" class="w-full max-w-[200px] cursor-pointer"
                                                loading="lazy" />
                                        </a>
                                    </div>

                                    <div class="col-span-2 text-center font-bold text-primary-900" aria-hidden="true">
                                        OR
                                    </div>

                                    <div class="col-span-5 flex justify-center">
                                        <a :href="state.bikiniWaxUrl"
                                            class="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
                                            aria-label="Book 50 percent off your first bikini or Brazilian wax">
                                            <img src="/images/promo/half-off-bikini-or-brazillian-button.webp"
                                                alt="Half off bikini or Brazilian"
                                                class="w-full max-w-[200px] cursor-pointer" loading="lazy" />
                                        </a>
                                    </div>
                                </div>

                                <p class="mt-3 text-center text-xs text-black/60">
                                    *This offer is exclusively for first-time waxing guests and is limited to one
                                    redemption
                                    per person.
                                </p>
                            </section>

                            <div class="mt-5 text-base sm:text-lg leading-relaxed text-black/70">
                                <p class="k-para-text font-extrabold text-primary-900">Book Now &amp; Claim Your Offer!
                                </p>
                                <p class="mt-2 k-para-text">
                                    Appointments fill up fast—don't miss out on your complimentary facial wax or 50% off
                                    your first
                                    bikini or Brazilian wax.
                                </p>
                                <p class="mt-2 k-para-text">Let's make every day smooth, confident, and
                                    beautiful—together.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Reviews -->
                <section class="mt-8 rounded-3xl bg-primary-900 text-primary-100 shadow-xl ring-1 ring-black/10">
                    <div class="p-5 sm:p-8">
                        <h2 class="text-center k-section-title">
                            What Our Clients Say
                        </h2>

                        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <article
                                class="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                                <div class="text-center k-para-text font-bold">
                                    Maria Guzman
                                </div>

                                <div class="mt-3 text-center flex justify-center" aria-label="5 out of 5 stars">
                                    <StarRating :rating="5" />
                                </div>

                                <div
                                    class="mt-3 text-center k-para-text leading-relaxed text-primary-100/90">
                                    "Overall, Kenneth Kingsdale is so clean and feels like entering an oasis away from
                                    home
                                    in a tiny strip
                                    mall. I love going to Melissa for all my waxing needs. She really relaxes me and
                                    makes
                                    the process as
                                    painless as possible. I will continue to use her services."
                                </div>
                            </article>

                            <article
                                class="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                                <div class="text-center k-para-text font-bold">
                                    Angela Mayes
                                </div>

                                <div class="mt-3 text-center flex justify-center" aria-label="5 out of 5 stars">
                                    <StarRating :rating="5" />
                                </div>

                                <div
                                    class="mt-3 text-center k-para-text leading-relaxed text-primary-100/90">
                                    "As a loyal client of this establishment for over a year, I'm happy. Today, I had
                                    the
                                    pleasure of
                                    meeting McKayla, who expertly guided me through a dermaplane facial and brow
                                    lamination/wax/tint
                                    experience. I left feeling revitalized and impressed with my newly groomed brows.
                                    What
                                    truly sets
                                    Kenneth's apart is to make every client feel valued, at ease, and empowered to take
                                    on
                                    the day."
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script setup>
const route = useRoute()

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }
    ]
})

const state = reactive({
    faceWaxUrl: '/book/new/promo?mid=465&p=w',
    bikiniWaxUrl: '/book/new/promo?mid=464&p=w',
})

onMounted(() => {
    let customerCode = route.query.c
    if (customerCode !== undefined && customerCode !== null && String(customerCode).length) {
        customerCode = String(customerCode).toUpperCase()
        const custQuery = '&c=' + customerCode.trim().replace(/ /g, '+')
        state.faceWaxUrl += custQuery
        state.bikiniWaxUrl += custQuery
    }
})

useHead({
    title: "Kenneth's Waxing Services: Salon Services for Every Occasion",
    meta: [
        {
            name: 'description',
            content:
                "Experience the confidence of smooth, flawless skin with Kenneth's professional waxing services. From perfectly shaped brows to a full-face glow, our expert team ensures a gentle, precise, and comfortable experience. Treat yourself to beautifully maintained skin that leaves you feeling refreshed and radiant!",
        },
        {
            name: 'og:description',
            content:
                "Pamper loved ones with Kenneth's gift cards—perfect for salon, spa, and hair services. A thoughtful gift for any occasion, from holidays to self-care!",
        },
        {
            property: 'og:image',
            content:
                "Experience the confidence of smooth, flawless skin with Kenneth's professional waxing services. From perfectly shaped brows to a full-face glow, our expert team ensures a gentle, precise, and comfortable experience. Treat yourself to beautifully maintained skin that leaves you feeling refreshed and radiant!",
        },
    ],
})
</script>
