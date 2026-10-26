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
                Kenneth's Salon &amp; Spa <br>Accessibility Statement
            </h1>
        </div>
    </div>
    <GoldLine />
    <div class="bg-primary-100 text-primary-900">

        <!-- SECTION 2: Terms of Service and Privacy Policy (full width) -->
        <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
            <div class="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-[1200px] mx-auto">
                <div class="flex justify-center">
                    <h2 class="k-section-title mb-8 text-center uppercase">Website Accessibility Statement</h2>
                </div>
                <div class="flex justify-center">
                    <p class="k-para-text">At Kenneth's Hair Salons And Day Spas, we are dedicated to ensuring that our
                        website is accessible to all users, regardless of their abilities or disabilities. We recognize
                        the importance of providing an inclusive online experience for everyone.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Our Commitment</h3>
                </div>
                <div class="flex justify-center k-para-text">
                    <ul class="list-disc pl-6 list-outside text-primary-900">
                        <li>We strive to follow the WCAG 2.1 guidelines to enhance the accessibility of our website.
                        </li>
                        <li>Our development team is trained to consider accessibility principles during the design,
                            development, and maintenance phases.
                        </li>
                        <li>
                            We regularly review and update our website to align with the latest accessibility standards.
                        </li>
                    </ul>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Key Accessibility Features</h3>
                </div>
                <div class="flex justify-center k-para-text">
                    <ul class="list-disc pl-6 list-outside text-primary-900">
                        <li>Perceivable: We provide alternative text for images, captions for videos, and clear headings
                            for easy navigation.
                        </li>
                        <li>Operable: Our website can be navigated using keyboard shortcuts, and we avoid content that
                            could cause seizures or physical discomfort.
                        </li>
                        <li>
                            Understandable: We use plain language and provide clear instructions to enhance
                            comprehension.
                        </li>
                        <li>
                            Robust: Our website is built using modern web technologies that support assistive
                            technologies.
                        </li>
                    </ul>
                </div>

                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Feedback and Assistance</h3>
                </div>
                <div class=" flex justify-center text-xl">
                    <p class="k-para-text">We welcome feedback from our users. If you encounter any accessibility
                        barriers
                        while using our website, please contact our support team at <a
                            href="mailto:team@kenneths.com">team@kenneths.com</a>. We are committed
                        to addressing any issues promptly.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Third-Party Content</h3>
                </div>
                <div class=" flex justify-center text-xl">
                    <p class="k-para-text">While we strive to maintain accessibility, some third-party content (such as
                        embedded videos or social media widgets) may not fully comply with WCAG guidelines. We encourage
                        users to report any accessibility concerns related to such content.
                    </p>
                </div>
                <div class="flex justify-left">
                    <h3 class="text-3xl md:text-4xl text-center uppercase">Third-Party Content</h3>
                </div>
                <div class=" flex justify-center text-xl">
                    <p class="k-para-text">Kenneth's Hair Salons And Day Spas is committed to ongoing accessibility
                        improvements. We appreciate your patience and understanding as we work toward creating a more
                        inclusive digital environment.
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
    "name": "Website Accessibility Statement | Kenneth's Salons and Day Spas",
    "url": "https://kenneths.com/accessibility-statement",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization",
        "url": "https://kenneths.com"
    },
    "description": "Kenneth's website accessibility statement explains our commitment to providing an inclusive online experience for all guests, including efforts to follow WCAG 2.1 guidelines, implement key accessibility features, and promptly address any reported barriers.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Website Accessibility",
        "description": "This page outlines Kenneth's approach to digital accessibility, including perceivable, operable, understandable, and robust design principles; support for assistive technologies; and contact information for guests to share feedback or request assistance."
    },
    "inLanguage": "en-US"
});

useHead({
    title: "Accessibility Statement Columbus OH | Kenneth's Salons & Spas",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/accessibility-statement'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Read Kenneth's website accessibility statement for guests in Columbus, OH and Central Ohio, including our commitment to WCAG 2.1 guidelines, key accessibility features, and how to contact us if you encounter any barriers while using our site."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Accessibility Statement Columbus OH | Kenneth's Salons & Spas"
        },
        {
            property: 'og:description',
            content:
                "Read Kenneth's website accessibility statement for guests in Columbus, OH and Central Ohio, including our commitment to WCAG 2.1 guidelines, key accessibility features, and how to contact us if you encounter any barriers while using our site."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/accessibility-statement'
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
            content: "Accessibility Statement Columbus OH | Kenneth's Salons & Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Read Kenneth's website accessibility statement for guests in Columbus, OH and Central Ohio, including our commitment to WCAG 2.1 guidelines, key accessibility features, and how to contact us if you encounter any barriers while using our site."
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
