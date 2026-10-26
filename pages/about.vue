<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <section>
        <div
            class="relative hidden md:flex items-center justify-center h-[90vmin] w-full  bg-cover overflow-hidden bg-[url('/images/our-story/our-story-kenneth.webp')]">
            <div class="">
                <img src="/images/icons/k-icon-light.webp" alt="Stylist" loading="eager" fetchpriority="high"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center uppercase">
                    OUR STORY</h1>
            </div>
        </div>

        <div
            class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/our-story/our-story-kenneth-mobile.webp')] bg-no-repeat bg-cover">

            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <p class="font-thin text-5xl text-center k-header-text-shadow">
                    OUR<br />STORY</p>
            </div>
        </div>
    </section>

    <!--Elevated salon + spa experience-->
    <section class="grid grid-cols-1 md:grid-cols-2">
        <!-- Left column -->
        <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <h2 class="k-section-title">
                ELEVATED SALON + SPA EXPERIENCE
            </h2>
            <p class="mt-6 md:mt-0 k-para-text lg:pb-20">
                Our legacy began with our founder, Kenneth Anders, an iconic hairstylist and Ohio native who dedicated
                his career to redefining and elevating the salon + spa experience and mentoring the next generation of
                stylists.
            </p>
        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center">
            <img src="/images/our-story/elevated-salon-and-spa-experiences.webp" loading="eager" fetchpriority="high"
                alt="Elevated Salon and Spa Experience" class="w-full aspect-square object-cover" />
        </div>
    </section>

    <!--What matters most-->
    <section class="bg-primary-100">
        <!-- Row 1 -->
        <div class="grid grid-rows-1">
            <div class="flex items-center justify-center py-10 text-primary-900">
                <h2 class="k-section-title text-center">
                    WHAT MATTERS MOST
                </h2>
            </div>
        </div>

        <!-- Row 2 -->
        <div class="grid grid-rows-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 px-6 md:px-12">
                <!-- Column 1 -->
                <div class="md:pr-3">
                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                        <!-- Make this container flex -->
                        <div class="w-full bg-white p-10 md:h-[450px] flex flex-col justify-between">
                            <div>
                                <h3 class="k-sub-section-title2 mb-4 uppercase">Commitment to Excellence</h3>
                                <p class="k-para-text mb-6">
                                    When Kenneth opened his first salon, he prioritized expert training for every
                                    stylist, ensuring they had the skills and techniques to serve clients with care and
                                    intention. What began as casual workshops during lunch breaks has developed into a
                                    world-class training curriculum for each of our stylists and technicians.
                                </p>
                            </div>
                            <a href="/training" class="k-section-link underline uppercase hover:text-primary-500">
                                Learn about our education + training
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Column 2 -->
                <div class="md:pl-3">
                    <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                        <!-- Same flex treatment -->
                        <div class="w-full bg-white p-10 md:h-[450px] flex flex-col justify-between">
                            <div>
                                <h3 class="k-sub-section-title2 mb-4 uppercase">100% EMPLOYEE-OWNED</h3>
                                <p class="k-para-text mb-6">
                                    Kenneth's is one of the only known 100% employee-owned salon companies in the
                                    country—a
                                    distinction that reflects our founder's belief that those who help build the
                                    business
                                    should share in its success. In 2007, Kenneth Anders transitioned ownership to his
                                    team,
                                    creating a culture where every guest supports a local professional with a personal
                                    stake
                                    in delivering exceptional service—and a brighter future for their family and
                                    community.
                                </p>
                            </div>
                            <a href="/join-our-team" class="k-section-link  underline uppercase hover:text-primary-500">
                                Join Our Team
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <gold-line-thin />

    <!--testimonial-->
    <section class="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <!-- Left column -->
        <div class="flex items-center justify-center">
            <img src="/images/our-story/our-story-testimonial.webp" alt="Testimonials from Employees"
                class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
        </div>

        <!-- Right column -->
        <div class="bg-primary-500 text-primary-900 flex items-center p-6 md:p-12 lg:p-20">
            <div class="w-full">
                <h2 class="text-3xl md:text-5xl leading-tight">
                    “Our retirement fund, it has surpassed my 401k and nothing from my check goes into it!
                    It was Kenneth's way of taking care of us and it's an amazing gift!”
                </h2>
            </div>
        </div>
    </section>

    <gold-line-thin />

    <!--Evolutionary products-->
    <section class="bg-primary-900 text-primary-100">
        <div class="py-8 px-4">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-top">
                <!-- Left Column: Heading and Offer -->
                <div class="items-start">
                    <h2 class="k-section-title mb-4 uppercase">EVOLUTIONARY<br />PRODUCTS</h2>
                </div>
                <!-- Right Column: Description and Action -->
                <div>
                    <p class="k-para-text mb-4">
                        Kenneth's believes that true beauty begins with quality—both in care and in craft. That's why we
                        developed our own line of professional-grade products, formulated with globally sourced
                        ingredients
                        and the latest in haircare innovation and "clean beauty" in mind. Designed to support our expert
                        stylists and elevate every guest's experience, our exclusive collection reflects our unwavering
                        commitment to exceptional results, inside the salon and beyond.
                    </p>
                    <a href="/shop/retail/top-sellers"
                        class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">Shop
                        Kenneth's Products</a>
                </div>
            </div>
        </div>

        <div class="pb-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-auto px-6">
                <!-- Image 1 -->
                <div class="aspect-square">
                    <img src="/images/our-story/retail-product-01.webp" alt="Kenneth's Hair Products Image"
                        class="w-full h-full object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                </div>

                <!-- Image 2 -->
                <div class="aspect-square">
                    <img src="/images/our-story/retail-product-02.webp" alt="Kenneth's Elixir 11 Product Image"
                        class="w-full h-full object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                </div>

                <!-- Image 3 -->
                <div class="aspect-square">
                    <img src="/images/our-story/retail-product-03.webp" alt="Kenneth's Highlights Product Image"
                        class="w-full h-full object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                </div>

                <!-- Image 4 -->
                <div class="aspect-square">
                    <img src="/images/our-story/retail-product-04.webp"
                        alt="Kenneth's Shampoos and Conditioners Product Image" class="w-full h-full object-cover"
                        loading="lazy" decoding="async" fetchpriority="low" />
                </div>
            </div>
        </div>
    </section>


    <history-carousel />

    <!--locally owned-->
    <section class="grid grid-cols-1 md:grid-cols-2">
        <!-- Left column -->
        <div class="flex items-center justify-center">
            <img src="/images/our-story/locally-owned-salons-and-spas.webp" alt="Locally owned salons and spas"
                class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
        </div>


        <!-- Right column -->
        <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6 md:p-12 lg:py-20">
            <div class="flex flex-col items-start space-y-6">
                <h2 id="header-local" class="k-section-title uppercase">
                    Locally Owned + Woman-Led
                </h2>
                <div id="text-local" class="k-para-text">
                    When you visit Kenneth's, it feels like visiting your neighborhood friends—because you are.
                    Every stylist and technician is a dedicated business owner, local community member, and an
                    expert in their trade. When you support Kenneth's, you're supporting a local, woman-led business.
                </div>
            </div>


            <div class="flex items-end">
                <pop-up-menu>
                    <template #trigger>
                        <div
                            class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                            Book Now →</div>
                    </template>
                    <template #links>
                        <div class="sans-serif p-3">
                            <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                        </div>
                        <div class="sans-serif p-3">
                            <a class="text-xl link" href="/book/new/service-type">New Customer</a>
                        </div>
                    </template>
                </pop-up-menu>
            </div>

        </div>
    </section>

    <section class="bg-primary-100">
        <div class="grid grid-rows-1">
            <div class="flex items-center justify-center py-8 text-primary-900">
                <h2 class="text-3xl md:text-5xl text-center uppercase">
                    Five Decades of Style & Service
                </h2>
            </div>
        </div>

        <div class="lg:pb-15 lg:px-15">
            <div class="grid grid-rows-1 h-[50vmin]">
                <div class="relative w-full h-[50vmin]">
                    <iframe class="absolute top-0 left-0 w-full h-full object-cover"
                        src="https://www.youtube.com/embed/EV8L_Sz7kn0" title="Kenneth's Story Video" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </section>

    <blog-carousel />

    <book-section />
</template>

<script setup>

const jsonLDString = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Kenneth's Salons and Day Spas",
    "url": "https://kenneths.com/about",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization"
    },
    "description": "Since 1977, Kenneth's Salons and Day Spas has been the premier destination for hair, nail, and spa services in Central Ohio. We are dedicated to providing exceptional experiences through our skilled staff and award-winning services.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Family and Mission",
        "description": "Kenneth's is 100% employee-owned, creating opportunities for our staff while delivering the best experience for our guests. Our mission is to remain reliable and relevant in providing hair, nail, and spa services."
    },
    "image": {
        "@type": "ImageObject",
        "@id": "https://kenneths.com/images/our-story/our-story-kenneth.webp",
        "url": "https://kenneths.com/images/our-story/our-story-kenneth.webp",
        "contentUrl": "https://kenneths.com/images/our-story/our-story-kenneth.webp",
        "width": "900",
        "height": "700",
        "caption": "About Kenneth's Hair Salons And Spas",
        "inLanguage": "en-US"
    },
    "dateCreated": "1977-01-01",
}


useHead({
    title: 'Hair Salon & Spa Columbus OH | About Kenneth\'s',
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/about'
        }
    ],
    meta: [
        {
            name: 'description',
            content: 'Discover the story behind Kenneth\'s Hair Salons & Spas in Columbus, OH—an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: 'Hair Salon & Spa Columbus OH | About Kenneth\'s'
        },
        {
            property: 'og:description',
            content: 'Discover the story behind Kenneth\'s Hair Salons & Spas in Columbus, OH—an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/about'
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
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: 'Hair Salon & Spa Columbus OH | About Kenneth\'s'
        },
        {
            name: 'twitter:description',
            content: 'Discover the story behind Kenneth\'s Hair Salons & Spas in Columbus, OH—an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
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