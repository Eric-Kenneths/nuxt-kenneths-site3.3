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
                Return Policy
            </h1>
        </div>
    </div>

    <GoldLine />
    <div class="bg-primary-100 text-primary-900">

        <!-- SECTION 2: Return Policy (full width) -->
        <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-[1200px] mx-auto">
                <div class="flex justify-center">
                    <h2 class="k-section-title mb-8 text-center uppercase">Return Policy for Online Purchases</h2>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">At Kenneth's, we are committed to ensuring your shopping experience is as
                        seamless and satisfying as possible. We understand that sometimes things don't go as planned,
                        especially when it comes to shipping. That's why we offer a 14-Day Money Back Return Policy for
                        items that are damaged in transit.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Eligibility for Returns</h3>
                </div>
                <div class="flex justify-center k-para-text">
                    <ul class="list-disc pl-6 list-outside text-primary-900">
                        <li>Damaged Items: If your item arrives damaged, you are eligible for a return and
                            full refund. Please ensure that you report the damage within 14 days of receiving your
                            order.
                        </li>
                        <li>Proof of Damage: To process your return, we require photographic evidence of the damage.
                            Please
                            include images of both the damaged item and its packaging.</li>
                    </ul>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Return Process</h3>
                </div>
                <div class="flex justify-center k-para-text">
                    <ol class="list-decimal pl-6 list-outside text-primary-900">
                        <li>Contact Us: Reach out to our customer service team by calling us at 614.538.5800 within 14
                            days of receiving your order to initiate a return.
                        </li>
                        <li>Provide Details: Share your order number and photos of the damaged item and packaging with
                            our team.
                        </li>
                        <li>Return Authorization: Once your request is reviewed, our team will provide you with a return
                            authorization and instructions on how to send the item back to us.
                        </li>
                        <li>Shipping: Use the provided instructions to return the item. We recommend using a trackable
                            shipping service or purchasing shipping insurance, as we cannot guarantee receipt of your
                            returned item.
                        </li>
                        <li>Refund Processing: Upon receiving and inspecting your return, we will notify you of the
                            approval or rejection of your refund. Approved refunds will be processed promptly, and a
                            credit will
                            automatically be applied to your original method of payment.
                        </li>
                    </ol>
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
    "name": "Return Policy | Kenneth's Salons and Day Spas",
    "url": "https://kenneths.com/return-policy",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization",
        "url": "https://kenneths.com"
    },
    "description": "Kenneth's return policy explains our 14-day money-back guarantee for damaged items purchased online, including eligibility, proof-of-damage requirements, and how Central Ohio guests can contact our team to initiate and complete a return.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Return Policy",
        "description": "This page outlines Kenneth's return guidelines for online retail orders, including the 14-day window for reporting damaged items in transit, the need for photos of the damage and packaging, return authorization steps, shipping instructions, and refund processing details."
    },
    "inLanguage": "en-US"
});

useHead({
    title: "Return Policy Columbus OH | Kenneth's Salons & Spas",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/return-policy'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Review Kenneth's 14-day money-back return policy for online purchases in Columbus, OH and Central Ohio, including eligibility for damaged items, proof-of-damage requirements, and how to contact our team to start a return."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Return Policy Columbus OH | Kenneth's Salons & Spas"
        },
        {
            property: 'og:description',
            content:
                "Review Kenneth's 14-day money-back return policy for online purchases in Columbus, OH and Central Ohio, including eligibility for damaged items, proof-of-damage requirements, and how to contact our team to start a return."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/return-policy'
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
            content: "Return Policy Columbus OH | Kenneth's Salons & Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Review Kenneth's 14-day money-back return policy for online purchases in Columbus, OH and Central Ohio, including eligibility for damaged items, proof-of-damage requirements, and how to contact our team to start a return."
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
