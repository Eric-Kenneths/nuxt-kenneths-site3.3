<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <section>
        <div
            class="relative hidden md:flex items-center justify-center h-[90vmin] w-full overflow-hidden bg-cover bg-no-repeat bg-[url('/images/services/salon-and-spa-services.webp')]">
            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt=""
                    aria-hidden="true"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <h1
                    class="font-thin text-2xl md:text-5xl lg:text-8xl max-w-5xl text-center k-header-text-shadow uppercase">
                    Services for Every<br />
                    Look, Every Mood,<br />
                    Every You
                </h1>
            </div>
        </div>

        <div
            class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/services/salon-and-spa-services-mobile.webp')] bg-no-repeat bg-cover">
            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt=""
                    aria-hidden="true"
                    class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <div class="font-thin text-4xl text-center k-header-text-shadow uppercase" aria-hidden="true">
                    Services<br />
                    for Every<br />
                    Look, Every Mood,<br />
                    Every You
                </div>
            </div>
        </div>
    </section>

    <!-- service type menu -->
    <section
        class="grid grid-cols-3 bg-primary-500 text-primary-900 uppercase items-center w-full py-4 font-bold text-lg lg:text-xl">
        <div class="text-center">
            <a href="#hair-services" class="hover:text-primary-700 transition">Hair</a>
        </div>
        <div class="text-center border-l border-r">
            <a href="#spa-services" class="hover:text-primary-700 transition">Spa</a>
        </div>
        <div class="text-center">
            <a href="#nail-services" class="hover:text-primary-700 transition">Nails</a>
        </div>
    </section>

    <!-- Your Salon & Spa -->
    <section class="grid grid-cols-1 md:grid-cols-2 w-full">
        <!-- Left column -->
        <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <h2 class="k-section-title uppercase">Your salon &amp; Spa</h2>

            <div class="mt-6 md:mt-0 lg:pb-20">
                <p class="k-para-text">
                    At Kenneth's, every service is about more than beauty—it's an act of care, a celebration of your
                    individuality, and a journey toward self-love. From haircuts and highlights to spa treatments and
                    nail art,
                    our mission is simple: to help you feel like the best version of yourself.
                </p>

                <pop-up-menu class="inline-block mt-2">
                    <template #trigger>
                        <div
                            class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block">
                            Book Online →
                        </div>
                    </template>

                    <template #links>
                        <div class="sans-serif p-3">
                            <a class="text-2xl link" href="https://kenneths.com/app/">Existing Customer</a>
                        </div>
                        <div class="sans-serif p-3">
                            <a class="text-2xl link" href="/book/new/service-type">New Customer</a>
                        </div>
                    </template>
                </pop-up-menu>
            </div>
        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center w-full">
            <img src="/images/services/your-salon-and-spa-services.webp" loading="eager" fetchpriority="high"
                alt="Your salon and spa services" class="w-full aspect-square object-cover" />
        </div>
    </section>

    <!-- why choose kenneths -->
    <section class="relative w-full h-[465px] md:h-[700px] overflow-hidden bg-primary-100">
        <div
            class="absolute inset-0 bg-no-repeat bg-center bg-cover m-4 md:m-7 bg-[url('/images/services/why-choose-kenneths-services-mobile.webp')] md:bg-[url('/images/services/why-choose-kenneths-services.webp')]">
        </div>

        <div class="absolute inset-0 bg-black/20 m-4 md:m-7"></div>

        <div class="relative z-10 flex items-center h-full">
            <div class="px-5 md:px-10 text-primary-100 text-center mx-auto">
                <h2 class="k-section-title px-10 font-light uppercase">Why Choose Kenneth's</h2>
                <p class="pt-10 max-w-3xl k-para-text">
                    With industry-leading training and education, our stylists are the best of the best, providing
                    unmatched
                    care
                    and personalized beauty services to everyone who walks through our doors.
                </p>
            </div>
        </div>
    </section>

    <!-- hair service type menu -->
    <section id="hair-services"
        class="grid grid-cols-1 md:grid-cols-3 bg-primary-100 text-primary-900 pb-4 items-start w-full">
        <div class="col-span-1 text-left pl-15 pt-4">
            <h2 class="k-section-title uppercase pb-5">Hair Services</h2>
            <div class="hidden md:flex">
                <a href="/services/hair"
                    class="px-5 py-2 cursor-pointer rounded-3xl text-lg bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>

        <div class="col-span-2 text-left pr-4 md:pr-15">
            <ul class="mt-4 pl-5 lg:pl-20">
                <li v-for="st in hairServiceTypes" :key="st.header" class="list-none">
                    <h3 class="uppercase text-3xl pb-3">{{ st.header }}</h3>

                    <p class="pb-3">
                        {{ st.description }}
                    </p>

                    <a :href="st.link"
                        class="pb-6 hover:text-primary-700 text-2xl underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                        Select Service
                    </a>

                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
                </li>
            </ul>

            <div class="md:hidden text-center py-3">
                <a href="/services/hair"
                    class="px-30 py-2 cursor-pointer rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>
    </section>

    <quiz-section />

    <!-- spa service type menu -->
    <section id="spa-services"
        class="grid grid-cols-1 md:grid-cols-3 bg-primary-100 text-primary-900 items-start py-4 w-full">
        <div class="col-span-1 text-left pl-15 pt-4">
            <h2 class="k-section-title uppercase pb-5">Spa Services</h2>
            <div class="hidden md:flex">
                <a href="/services/spa"
                    class="px-5 py-2 cursor-pointer rounded-3xl text-lg bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>

        <div class="col-span-2 text-left pr-4 md:pr-15">
            <ul class="mt-4 pl-5 lg:pl-20">
                <li v-for="st in spaServiceTypes" :key="st.header" class="list-none">
                    <h3 class="uppercase text-3xl pb-3">{{ st.header }}</h3>

                    <p class="pb-3">
                        {{ st.description }}
                    </p>

                    <a :href="st.link"
                        class="pb-6 hover:text-primary-700 text-2xl underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                        Select Service
                    </a>

                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
                </li>
            </ul>

            <div class="md:hidden text-center py-3">
                <a href="/services/spa"
                    class="px-30 py-2 cursor-pointer rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>
    </section>

    <!-- nail service type menu -->
    <section id="nail-services"
        class="grid grid-cols-1 md:grid-cols-3 bg-primary-100 text-primary-900 items-start pt-4 pb-4 border-t w-full">
        <div class="col-span-1 text-left pl-15 pt-4">
            <h2 class="k-section-title uppercase pb-5">Nail Services</h2>
            <div class="hidden md:flex">
                <a href="/services/nail"
                    class="px-5 py-2 cursor-pointer rounded-3xl text-lg bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>

        <div class="col-span-2 text-left pr-4 md:pr-15">
            <ul class="mt-4 pl-5 lg:pl-20">
                <li v-for="st in nailServiceTypes" :key="st.header" class="list-none">
                    <h3 class="uppercase text-3xl pb-3">{{ st.header }}</h3>

                    <p class="pb-3">
                        {{ st.description }}
                    </p>

                    <a :href="st.link"
                        class="pb-6 hover:text-primary-700 text-2xl underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase">
                        Select Service
                    </a>

                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
                </li>
            </ul>

            <div class="md:hidden text-center py-3">
                <a href="/services/nail"
                    class="px-30 py-2 cursor-pointer rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-700 whitespace-nowrap">
                    See All
                </a>
            </div>
        </div>
    </section>

    <!-- training and education -->
    <section class="flex flex-col md:grid lg:grid-cols-2 w-full">
        <div class="w-full h-full flex">
            <img src="/images/services/service-training-and-education.webp"
                alt="Hair, spa and nail training and education." class="object-cover w-full" loading="lazy"
                decoding="async" fetchpriority="low" />
        </div>

        <div
            class="grid grid-rows-[40%_40%_20%] flex px-4 md:px-12 bg-primary-900 text-white min-h-80 md:min-h-130 h-full">
            <div class="flex items-start">
                <h2 class="k-section-title pt-5 md:pt-20 uppercase">
                    Training &<br />
                    Education
                </h2>
            </div>

            <div class="flex items-end">
                <p class="k-para-text">
                    In addition to being licensed in their respective fields, every Kenneth's stylist and technician has
                    completed our thorough in-house training program at Kenneth's Academy before servicing guests in our
                    salons.
                </p>
            </div>

            <div class="items-start justify-start pt-5">
                <a href="/training"
                    class="k-section-link px-3 md:px-5 py-2 ml-auto lg:ml-0 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">
                    Learn More About Our Commitment to Excellence
                </a>
            </div>
        </div>
    </section>

    <!-- Misc Menu -->
    <section class="bg-primary-100 text-primary-900 py-10 w-full">
        <div class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
            <div class="flex flex-col items-center md:items-start">
                <img src="/images/services/gift-card-services.webp" alt="Gift card services"
                    class="w-full object-cover mx-auto" loading="lazy" decoding="async" fetchpriority="low" />
                <a href="/shop/gift-cards"
                    class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase self-start">
                    Gift Card
                </a>
                <p class="mt-2 md:text-lg leading-relaxed self-start">
                    The perfect gift — who doesn't love a little beauty refresh or spa day?
                </p>
            </div>

            <div class="flex flex-col items-center md:items-start">
                <img src="/images/services/product-services.webp" alt="Kenneth's products"
                    class="w-full object-cover mx-auto" loading="lazy" decoding="async" fetchpriority="low" />
                <a href="/shop/retail/top-sellers"
                    class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase self-start">
                    Our Products
                </a>
                <p class="mt-2 md:text-lg leading-relaxed self-start">
                    Our product line is the result of decades of creativity, evolution, and expertise.
                </p>
            </div>

            <div class="flex flex-col items-center md:items-start">
                <img src="/images/services/contact-us-about-services.webp" alt="Contact Kenneth's about services"
                    class="w-full object-cover mx-auto" loading="lazy" decoding="async" fetchpriority="low" />
                <a href="/contact-us"
                    class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded inline-block mt-2 font-bold uppercase self-start">
                    Contact Us
                </a>
                <p class="mt-2 md:text-lg leading-relaxed self-start">
                    Have questions or need help? Contact us anytime!
                </p>
            </div>
        </div>
    </section>

    <book-section />
</template>

<script setup>
const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Hair, Nail & Spa Services at Kenneth's in Columbus, OH",
    url: 'https://kenneths.com/services',
    mainEntity: {
        '@type': 'Service',
        name: 'Hair, Nail & Spa Services',
        serviceType: 'Salon and Day Spa Services',
        provider: {
            '@type': 'Organization',
            '@id': 'https://kenneths.com/#organization',
            name: "Kenneth's Hair Salons and Day Spas",
            url: 'https://kenneths.com'
        },
        areaServed: 'Columbus, Ohio and Central Ohio',
        description:
            "Kenneth's Hair Salons & Day Spas offers a full menu of hair, nail, and spa services in the Columbus, Ohio area, including haircuts and styles, hair color, highlighting, masks and treatments, smoothing and perms, extensions, Japanese Head Spa, facials and skincare, waxing, brows and lashes, makeup, massage therapy, manicures, and pedicures."
    },
    description:
        "Explore Kenneth's salon and spa services in Columbus, OH. Browse haircuts, color, extensions, Japanese Head Spa, facials, waxing, brows, lashes, massage, manicures, and pedicures—all delivered by Academy-trained professionals across 10 Central Ohio locations.",
    publisher: {
        '@type': 'Organization',
        name: "Kenneth's Hair Salons and Day Spas",
        url: 'https://kenneths.com'
    },
    about: {
        '@type': 'Thing',
        name: 'Hair, Nail & Spa Services',
        description:
            "A curated collection of salon and spa services at Kenneth's, including expert hair care, advanced skincare, body treatments, and nail services designed to help guests look and feel their best."
    },
    image: {
        '@type': 'ImageObject',
        '@id': 'https://kenneths.com/services/services-hero.webp',
        url: 'https://kenneths.com/services/services-hero.webp',
        contentUrl: 'https://kenneths.com/services/services-hero.webp',
        caption: "Services at Kenneth's Hair Salons & Day Spas",
        inLanguage: 'en-US'
    },
    isPartOf: {
        '@type': 'WebSite',
        name: "Kenneth's Hair Salons and Day Spas",
        url: 'https://kenneths.com'
    },
    inLanguage: 'en-US'
}

useHead({
    title: "Hair, Nail & Spa Services Columbus OH | Kenneth's",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/services'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Explore Kenneth's full menu of hair, nail, and spa services in Columbus, OH. From haircuts, color, extensions, and Japanese Head Spa to facials, waxing, brows, lashes, massage, manicures, and pedicures, our Academy-trained team at 10 Central Ohio locations helps you look and feel your best."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Hair, Nail & Spa Services Columbus OH | Kenneth's"
        },
        {
            property: 'og:description',
            content:
                "Explore Kenneth's full menu of hair, nail, and spa services in Columbus, OH. From haircuts, color, extensions, and Japanese Head Spa to facials, waxing, brows, lashes, massage, manicures, and pedicures, our Academy-trained team at 10 Central Ohio locations helps you look and feel your best."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/services'
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
            content: "Hair, Nail & Spa Services Columbus OH | Kenneth's"
        },
        {
            name: 'twitter:description',
            content:
                "Explore Kenneth's full menu of hair, nail, and spa services in Columbus, OH. From haircuts, color, extensions, and Japanese Head Spa to facials, waxing, brows, lashes, massage, manicures, and pedicures, our Academy-trained team at 10 Central Ohio locations helps you look and feel your best."
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
            innerHTML: JSON.stringify(jsonLD)
        }
    ]
})

const hairServiceTypes = [
    {
        header: 'Hair Cuts + Styles',
        description: 'Haircuts, blowouts, and special occasion up-styles',
        link: '/services/hair/cuts-and-styles'
    },
    {
        header: 'Hair Color',
        description: 'Natural color enhancements, full color change, root touch-ups, and glossing',
        link: '/services/hair/color'
    },
    {
        header: 'Highlighting',
        description: 'Highlights, lowlights, and balayage',
        link: '/services/hair/highlights'
    },
    {
        header: 'Hair Masks + Treatments',
        description: 'Targeted treatments to hydrate, bond, repair, and rebuild',
        link: '/services/hair/treatments'
    },
    {
        header: 'Hair Smoothing + Perms',
        description: 'Keratin smoothing, express keratin, full perms, and partial perms',
        link: '/services/hair/smoothing-and-perms'
    },
    {
        header: 'Hair Extensions',
        description: 'Tape-in, hand-tied, clip-ins, and fusion',
        link: '/services/hair/extensions'
    },
    {
        header: 'Japanese Head Spa',
        description:
            'Inspired by centuries-old Japanese wellness techniques, this treatment blends holistic care with modern scalp science to deliver total rejuvenation.',
        link: '/services/hair/japanese-head-spa'
    }
]

const spaServiceTypes = [
    {
        header: 'The Spa Bar',
        description: "Our new fast-casual spa concept at Kenneth's Polaris",
        link: '/services/spa/spa-bar'
    },
    {
        header: 'Facials + Skincare Treatments',
        description: 'Targeted treatments, hydrafacials, and microdermabrasion',
        link: '/services/spa/facials'
    },
    {
        header: 'Waxing',
        description: 'Facial and body waxings',
        link: '/services/spa/waxing'
    },
    {
        header: 'Brow + Lashes',
        description: 'Tints, lifts, and laminations',
        link: '/services/spa/brow-and-lash'
    },
    {
        header: 'Makeup',
        description: 'Special occasion and lessons',
        link: '/services/spa/makeup'
    },
    {
        header: 'Massage Therapy',
        description: 'Relaxation, therapeutic, and express massages',
        link: '/services/spa/massage'
    }
]

const nailServiceTypes = [
    {
        header: 'Manicures & Enhancements',
        description: 'Hand treatments, nail art, acrylics, soft gel tips, and powder dips',
        link: '/services/nail/manicures'
    },
    {
        header: 'Pedicures & Enhancements',
        description: 'Foot treatments, gel polish, and parafin upgrade',
        link: '/services/nail/pedicures'
    }
]
</script>

<style scoped>
#hair-services,
#spa-services,
#nail-services {
    scroll-margin-top: 150px;
}
</style>