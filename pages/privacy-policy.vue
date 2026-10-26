<template>
    <section class="lg:hidden bg-primary-900 w-full h-[95px]  lg:h-[120px] flex items-end">
        <GoldLine />
    </section>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <div
        class="relative flex items-center justify-center min-h-[280px] lg:min-h-[360px] w-full overflow-hidden pt-24 lg:pt-40">
        <img src="/images/icons/k-icon-light.webp" alt="" aria-hidden="true"
            class="absolute -top-20 -left-10 h-[160%] w-auto opacity-30 pointer-events-none z-0" />

        <div class="relative z-10 flex items-center justify-center px-4">
            <h1
                class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 uppercase text-center leading-tight k-header-text-shadow">
                Kenneth's Salon &amp; Spa <br />
                Privacy Policies
            </h1>
        </div>
    </div>

    <GoldLine />
    <div class="bg-primary-100 text-primary-900">

        <!-- SECTION 2: Privacy Policy (full width) -->
        <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-[1200px] mx-auto">
                <div class="flex justify-center">
                    <h2 class="k-section-title mb-8 text-center uppercase">Privacy Policy</h2>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">Your privacy is very important to us. We collect information to provide
                        better
                        services to
                        our
                        customers. We collect the following information: your name, email address, mailing address
                        and
                        phone
                        number.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Information on Children</h3>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">The Children's Online Privacy Protection Act ("COPPA") requires that we
                        notify
                        parents and guardians about how we collect, use and disclose personal information from children
                        less than 13 years of age. Although a parent or guardian may use the website to make an
                        appointment or purchase a product or a gift certificate/card for a child under the age of 13,
                        our website is not designed, nor intended, to attract children under the age of 13 and we do
                        not collect personally identifiable information from any person that we know, or have a
                        good faith belief, is under the age of 13.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">When we disclose the information we collect
                        to third
                        parties</h3>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">We do not sell, trade, or otherwise transfer to third parties your
                        information
                        unless we provide you with advance notice and you consent to such sharing of your information,
                        except that we may share or release your information when we have a good faith belief that
                        such sharing or release is appropriate to comply with the law, enforce our site policies,
                        or protect the rights, property or safety of ourselves or third parties.
                    </p>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">We appreciate your understanding and cooperation in adhering to these
                        guidelines.
                        Our goal is to ensure that every interaction with Kenneth's is positive and leaves you feeling
                        confident in our products and services. If you have any questions or need further assistance,
                        please don't hesitate to contact us.
                    </p>
                </div>
                <div class="flex justify-center">
                    <p>
                        <a href="/contact-us"
                            class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-4">
                            Questions? Contact Us →</a>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Kenneth's Salons and Day Spas",
    "url": "https://kenneths.com/privacy-policy",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization",
        "url": "https://kenneths.com"
    },
    "description": "Kenneth's privacy policy explains how our Central Ohio salons and day spas collect, use, store, and protect personal information from guests who book appointments, purchase products, or use our website.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Privacy Policy",
        "description": "This page describes Kenneth's data practices for hair, nail, and spa guests, including what information we collect online, how it may be shared, and how we safeguard your privacy across our 10 Central Ohio locations."
    },
    "inLanguage": "en-US"
});


useHead({
    title: "Privacy Policy Columbus OH | Kenneth's Salons & Spas",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/privacy-policy'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Read Kenneth's privacy policy for guests in Columbus, OH and Central Ohio, including how we collect, use, and protect your personal information when you book appointments, shop online, or interact with our website."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Privacy Policy Columbus OH | Kenneth's Salons & Spas"
        },
        {
            property: 'og:description',
            content:
                "Read Kenneth's privacy policy for guests in Columbus, OH and Central Ohio, including how we collect, use, and protect your personal information when you book appointments, shop online, or interact with our website."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/privacy-policy'
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
            content: "Privacy Policy Columbus OH | Kenneth's Salons & Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Read Kenneth's privacy policy for guests in Columbus, OH and Central Ohio, including how we collect, use, and protect your personal information when you book appointments, shop online, or interact with our website."
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
