<template>

    <!-- HERO: Video background with layered text and bottom-right image -->
    <!-- HERO -->
    <section>
        <div
            class="relative flex items-center justify-center h-[45vmin] md:h-[90vmin] w-full bg-cover overflow-hidden bg-primary-900 md:bg-[url('/images/contact-us/contact-us.webp')]">
            <!-- Desktop left shading -->
            <div
                class="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-black/75 to-transparent pointer-events-none" />

            <!-- Desktop top shading -->
            <div
                class="hidden md:block absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/75 to-transparent pointer-events-none" />

            <!-- Decorative K icon, desktop only -->
            <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="" aria-hidden="true"
                class="hidden md:block absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />

            <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center uppercase">
                    Contact Us
                </h1>
            </div>
        </div>

        <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]" />
    </section>

    <GoldLine />
    <div class="bg-primary-900 text-primary-900">

        <!-- SECTION 2: Contact Info (full width) -->
        <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1200px] mx-auto">

                <!-- Row 1: Contact Us intro text -->
                <div class="lg:col-span-2 flex justify-center mb-10">
                    <p class="k-para-text max-w-[45%] text-center">
                        Whether you have questions about our services, need assistance booking your
                        appointment, or want to share feedback, we're always happy to hear from you!
                    </p>
                </div>

                <!-- Row 2: Call Us -->
                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                    <div class="w-full bg-primary-100 p-5 md:h-[200px] flex items-center justify-center">
                        <div class="text-primary-900 text-center leading-[2.2]">
                            <h3 class="text-3xl lg:text-5xl font-thin leading-[2.2]">Call Us</h3>
                            <p class="k-para-text font-semibold">
                                <a href="tel:614-538-5800" class="underline">(614) 538-5800</a>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Row 2: Email Us -->
                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                    <div class="w-full bg-primary-100 p-5 md:h-[200px] flex items-center justify-center">
                        <div class="text-primary-900 text-center leading-[2.2]">
                            <h3 class="text-3xl lg:text-5xl font-thin leading-[2.2]">Email Us</h3>
                            <p class="k-para-text font-semibold">
                                <a href="mailto:customerservice@kenneths.com" class="underline text-lg">
                                    CustomerService@kenneths.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Row 3: Book Online (spans both columns) -->
                <div class="lg:col-span-2 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                    <div class="w-full bg-primary-100 p-5 md:h-[200px] flex items-center justify-center">
                        <div class="text-primary-900 text-center leading-[2.2]">
                            <h3 class="text-3xl lg:text-5xl font-thin leading-[2.2]">Book Online</h3>

                            <div class="k-para-text font-semibold">
                                <ClientOnly>
                                    <pop-up-menu>
                                        <template #trigger>
                                            <span
                                                class="inline-block py-2 px-6 rounded-3xl bg-primary-500 text-primary-900 text-xl font-normal hover:bg-primary-emphasis whitespace-nowrap text-center">
                                                Book Your Appointment &rarr;
                                            </span>
                                        </template>
                                        <template #links>
                                            <div class="sans-serif p-3">
                                                <a class="k-para-text link" href="https://kenneths.com/app/">Existing
                                                    Customer</a>
                                            </div>
                                            <div class="sans-serif p-3">
                                                <a class="k-para-text link" href="/book/new/service-type">New
                                                    Customer</a>
                                            </div>
                                        </template>
                                    </pop-up-menu>

                                    <template #fallback>
                                        <a href="/book/new/service-type"
                                            class="inline-block py-2 px-6 rounded-3xl bg-primary-500 text-primary-900 text-xl font-normal hover:bg-primary-emphasis whitespace-nowrap text-center">
                                            Book Your Appointment &rarr;
                                        </a>
                                    </template>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- SECTION 3: Locations Carousel -->
        <section class="border-b border-primary-500">
            <locations-carousel class="pl-5" />
        </section>

    </div>
</template>

<script setup>
const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Kenneth's Hair Salons & Day Spas in Columbus, OH",
    "url": "https://kenneths.com/contact-us",
    "mainEntity": {
        "@type": "Organization",
        "@id": "https://kenneths.com/#organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com",
        "description": "Kenneth's Hair Salons & Day Spas is a Central Ohio salon and spa group offering hair, nail, and spa services across 10 locations in the Columbus area, including Powell, Westerville, Dublin, Upper Arlington, Hilliard, Reynoldsburg, Lewis Center, Grove City, and Columbus.",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "customerservice@kenneths.com",
                "telephone": "+1-614-538-5800",
                "areaServed": "US-OH",
                "availableLanguage": "en"
            }
        ]
    },
    "description": "Use this page to contact Kenneth's Hair Salons & Day Spas in Columbus, OH for questions about services, booking assistance, promotions, policies, or product and service feedback. Find key addresses and guidance for visiting any of our 10 Central Ohio salon and spa locations.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "inLanguage": "en-US",
    "isPartOf": {
        "@type": "WebSite",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "dateModified": "2025-12-11"
});

useHead({
    title: "Contact Kenneth's Hair Salon & Day Spa Columbus OH",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/contact-us'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Contact Kenneth's Hair Salons & Day Spas in Columbus, OH for questions about services, booking help, or feedback. View phone and address details for all 10 Central Ohio locations, including Powell, Westerville, Dublin, Upper Arlington, Hilliard, Reynoldsburg, Lewis Center, Grove City, and Columbus."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Contact Kenneth's Hair Salon & Day Spa Columbus OH"
        },
        {
            property: 'og:description',
            content:
                "Contact Kenneth's Hair Salons & Day Spas in Columbus, OH for questions about services, booking help, or feedback. View phone and address details for all 10 Central Ohio locations, including Powell, Westerville, Dublin, Upper Arlington, Hilliard, Reynoldsburg, Lewis Center, Grove City, and Columbus."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/contact-us'
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
            content: "Contact Kenneth's Hair Salon & Day Spa Columbus OH"
        },
        {
            name: 'twitter:description',
            content:
                "Contact Kenneth's Hair Salons & Day Spas in Columbus, OH for questions about services, booking help, or feedback. View phone and address details for all 10 Central Ohio locations, including Powell, Westerville, Dublin, Upper Arlington, Hilliard, Reynoldsburg, Lewis Center, Grove City, and Columbus."
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

<style scoped></style>