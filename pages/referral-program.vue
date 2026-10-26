<template>
    <div class="min-h-screen">
        <section class="bg-primary-900 text-primary-100">
            <div class="max-w-[1600px] mx-auto">

                <!-- HERO SECTION -->
                <section class="mt-35">
                    <!-- Gold Line -->
                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]"></div>

                    <!-- Content -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                        <!-- Text First (mobile), Second (desktop) -->
                        <div
                            class="order-1 lg:order-2 px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full bg-primary-900">
                            <div class="pt-10">
                                <h1 class="k-section-title mb-8 text-primary-100">
                                    Refer a Friend
                                </h1>
                                <p class="k-para-text mb-6 text-primary-100">
                                    Share the Love with Kenneth's Referral Program.
                                </p>
                            </div>

                            <div>
                                <p class="k-para-text mb-20 text-primary-100">
                                    Invite a friend to book their first Kenneth's salon or spa experience and you'll
                                    both be
                                    eligible for rewards!
                                </p>
                            </div>
                        </div>

                        <!-- Image Second (mobile), First (desktop) -->
                        <div class="order-2 lg:order-1">
                            <img src="/images/refer-a-friend/refer-a-friend.webp" loading="eager" fetchpriority="high"
                                alt="Kenneth's Refer a Friend Program" class="shadow-lg w-full h-auto" />
                        </div>
                    </div>
                </section>



                <!-- REWARD SUMMARY SECTION -->
                <section class="bg-primary-100">
                    <!-- Row 1 -->
                    <div class="grid grid-rows-1">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 max-w-6xl mx-auto mb-6 mt-6">
                            <!-- Column 1 -->
                            <div>
                                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                                    <div class="w-full bg-primary-100 p-4 md:h-[200px] flex flex-col justify-center">
                                        <div class="p-8 text-primary-950 text-center">
                                            <h3 class="k-section-link mb-4">What You'll GET</h3>
                                            <p class="k-para-text">
                                                A <strong>$20 REFERRAL BONUS</strong><br> TO USE DURING YOUR NEXT
                                                VISIT
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Column 2 -->
                            <div>
                                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                                    <div class="w-full bg-primary-100 p-4 md:h-[200px] flex flex-col justify-center">
                                        <div class="p-8 text-primary-950 text-center">
                                            <h3 class="k-section-link mb-4">What You'll Give</h3>
                                            <p class="k-para-text">
                                                <strong>20% OFF SERVICES</strong><br> FOR YOUR FRIEND'S FIRST VISIT
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <!-- HOW IT WORKS SECTION -->
                <div>
                    <h2 class="k-section-title mt-10 mb-10 text-center">How It Works</h2>

                    <!-- Steps Grid -->
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-12 gap-x-6 px-6 lg:px-12 max-w-6xl mx-auto">

                        <!-- Step 1 -->
                        <section class="space-y-3">
                            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                                <div class="w-full bg-primary-900 p-10 md:h-[400px] flex flex-col justify-between">
                                    <div class="text-primary-100 text-left leading-[2.2]">
                                        <h3 class="k-section-link font-semibold leading-[2.2]">Step 1:<br>Log
                                            In or
                                            Create Your Account</h3>
                                        <p class="k-para-text">Once you're logged in, find and click on Referral
                                            Program.</p>
                                        <p class="k-para-text">Find your unique referral code near the top of the page.
                                        </p>
                                        <p class="k-para-text"><u>Click to copy your referral code.</u></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Step 2 -->
                        <section class="space-y-3">
                            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                                <div class="w-full bg-primary-900 p-10 md:h-[400px] flex flex-col justify-between">
                                    <div class="text-primary-100 text-left leading-[2.2]">
                                        <h3 class="k-section-link font-semibold leading-[2.2]">
                                            Step 2:<br>Share Your Referral Code
                                        </h3>
                                        <p class="k-para-text">Send your referral code to your friends and family.</p>
                                        <p class="k-para-text">Let them know they'll get 20% off their first service
                                            when they apply
                                            your
                                            referral code during booking!</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Step 3 -->
                        <section class="lg:col-span-2 lg:col-start-1 space-y-3">
                            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                                <div class="w-full bg-primary-900 p-10 md:h-[300px] flex flex-col justify-between">
                                    <div class="text-primary-100 text-left leading-[2.2]">
                                        <h3 class="k-section-link font-semibold leading-[2.2]">Step
                                            3:<br>Receive
                                            Your Bonus</h3>
                                        <p class="k-para-text">When someone visits Kenneth's and uses your referral
                                            coupon, you will
                                            automatically receive $20 in your referral bank.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Login Create an account Button Section -->
                    <login-newaccount-section />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Referral Program | Kenneth's Hair Salon & Day Spa Columbus OH",
    "url": "https://kenneths.com/referral-program",
    "mainEntity": {
        "@type": "Offer",
        "name": "Kenneth's Refer a Friend Program",
        "description": "Kenneth's Hair Salons & Day Spas referral program lets guests share their favorite Columbus, OH salon and spa experience with friends. New guests receive 20% off services on their first visit, and the referring guest earns a $20 referral bonus toward a future appointment at any Central Ohio location.",
        "category": "Loyalty Program",
        "seller": {
            "@type": "Organization",
            "name": "Kenneth's Hair Salons and Day Spas",
            "@id": "https://kenneths.com/#organization",
            "url": "https://kenneths.com"
        }
    },
    "description": "Share the love with Kenneth's Refer a Friend program. Invite a new guest to book their first salon or spa visit in Columbus, OH and they will receive 20% off services while you earn a $20 referral credit you can use at any of Kenneth's 10 Central Ohio salon and spa locations.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Salon and Spa Referral Program",
        "description": "A shareable referral program that rewards Kenneth's guests with a $20 bonus for every new guest they refer, while giving their friends 20% off services on a first visit to Kenneth's Hair Salons & Day Spas in Columbus, Ohio."
    },
    "isPartOf": {
        "@type": "WebSite",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "inLanguage": "en-US",
    "image": {
        "@type": "ImageObject",
        "@id": "https://kenneths.com/images/referral-program.webp",
        "url": "https://kenneths.com/images/referral-program.webp",
        "contentUrl": "https://kenneths.com/images/referral-program.webp",
        "caption": "Refer a Friend to Kenneth's Hair Salons & Day Spas",
        "inLanguage": "en-US"
    },
    "dateModified": "2025-12-11"
});


useHead({
    title: "Referral Program | Kenneth's Hair Salons & Spas Columbus OH",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/referral-program'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Share the love with Kenneth's Hair Salons & Spas in Columbus, OH. Invite friends to book their first salon or spa visit and they'll receive 20% off services, while you earn a $20 referral bonus at any of our 10 Central Ohio locations."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Referral Program | Kenneth's Hair Salons & Spas Columbus OH"
        },
        {
            property: 'og:description',
            content:
                "Share the love with Kenneth's Hair Salons & Spas in Columbus, OH. Invite friends to book their first salon or spa visit and they'll receive 20% off services, while you earn a $20 referral bonus at any of our 10 Central Ohio locations."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/referral-program'
        },
        {
            property: 'og:image',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            property: 'og:image:secure_url',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            property: 'og:image:type',
            content: 'image/webp'
        },
        {
            property: 'og:image:alt',
            content: "Kenneth's Hair Salons And Day Spas logo"
        },
        {
            property: 'og:site_name',
            content: "Kenneth's Hair Salons And Day Spas"
        },
        {
            property: 'og:locale',
            content: 'en_US'
        },

        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: "Referral Program | Kenneth's Hair Salons & Spas Columbus OH"
        },
        {
            name: 'twitter:description',
            content:
                "Share the love with Kenneth's Hair Salons & Spas in Columbus, OH. Invite friends to book their first salon or spa visit and they'll receive 20% off services, while you earn a $20 referral bonus at any of our 10 Central Ohio locations."
        },
        {
            name: 'twitter:image',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            name: 'twitter:image:alt',
            content: "Kenneth's Hair Salons And Day Spas logo"
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: jsonLDString
        }
    ]
})

</script>
