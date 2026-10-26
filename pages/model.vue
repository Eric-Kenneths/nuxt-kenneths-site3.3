<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <section>
        <div class="relative hidden md:flex items-center justify-center h-[90vmin] w-full bg-cover overflow-hidden
        bg-[url('/images/model/model-header.webp')]">
            <!-- Left shading -->
            <div
                class="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-black/75 to-transparent pointer-events-none">
            </div>

            <!-- Top shading -->
            <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/75 to-transparent pointer-events-none">
            </div>

            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>

            <!-- Model Program Text -->
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center">
                    KENNETH'S MODEL<br>PROGRAM
                </h1>
            </div>
        </div>

        <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
        </div>
    </section>


    <!--Your Salon & Spa-->
    <section class="grid grid-cols-1 md:grid-cols-2">
        <!-- Left column -->
        <div class="flex items-center flex-col justify-center">
            <img src="/images/model/learning-at-its-best.webp" loading="eager" fetchpriority="high"
                alt="Learning at it's Best" class="w-full aspect-square object-cover" />
        </div>

        <!-- Right column -->
        <div class="bg-primary-900 text-primary-100 p-6 md:p-12">
            <h2 class="k-section-title uppercase mb-40">
                Learning at Its Best - Hair Salon Services at a Discount
            </h2>
            <p class="k-para-text lg:pb-20">
                We believe in training and education that blends hands-on practice with professional guidance.
                Our Model Program is designed to benefit both our trainees and our clients.
                Model appointments are perfect for anyone interested in receiving discounted hair services with a
                Kenneth's trainee.
                <br />
                <button @click="login()"
                    class="hover:text-primary-500 text-2xl font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-4 cursor-pointer">
                    Book a Model Appointment →</button>
            </p>
        </div>
        <!-- Left column -->

        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <div>
                <h2 class="k-section-title uppercase pt-2">
                    About Model<br /> Appointments
                </h2>
            </div>

            <ul class="mt-6 md:mt-0 k-para-text lg:pb-20 list-disc list-outside">
                <li>
                    Clients are serviced by trainees in Phases 1-3 of our world-class training program.
                </li>
                <li>Services are performed in a classroom setting under the supervision of expert instructors.</li>
                <li>All trainees are licensed beauty school graduates. This is not beginner training—it's continuing
                    education!</li>
            </ul>
        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center">
            <img src="/images/model/about-model-appointments.webp" alt="About Model Appointments"
                class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
        </div>

    </section>

    <!-- What to expect section -->
    <section id="hair-services" class="grid grid-cols-1 md:grid-cols-3 bg-primary-100 text-primary-900  items-start">
        <!-- Left Column (1/3 on md and up) -->
        <div class="col-span-1 text-left pl-15 pt-4">
            <h2 class="uppercase k-section-title pb-5">What to Expect as a Kenneth's Model</h2>
            <div class="hidden md:flex">
                <button @click="login()"
                    class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-4 cursor-pointer">
                    Book a Model Appointment →</button>
            </div>

        </div>

        <!-- Right Column (2/3 on md and up) -->
        <div class="col-span-2 text-left pr-4 md:pr-15">
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase text-3xl pb-3">Before Your Appointment</h3>

                <p class="pb-3">
                    Prepare to block a little extra time in your schedule. Model appointments are longer than regular
                    salon appointments so that trainees can learn and perfect every technique during your visit.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase text-3xl pb-3">During Your Appointment</h3>

                <p class="pb-3">
                    You will receive care and attention in a supportive classroom-like environment. Instructors provide
                    step-by-step guidance to our talented stylists-in-training, ensuring you get a quality result.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase text-3xl pb-3">After Your Appointment</h3>

                <p class="pb-3">
                    You will receive care and attention in a supportive classroom-like environment. Instructors provide
                    step-by-step guidance to our talented stylists-in-training, ensuring you get a quality result.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
        </div>
    </section>

    <!-- SECTION 3: Trainee types -->
    <section class="w-full px-6 py-16 bg-primary-900 text-primary-100 border-t border-b border-primary-500">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto">

            <!-- Row 1: Trainee Levels intro text (spans all 3 columns) -->
            <div class="lg:col-span-3 flex justify-center mb-10">
                <h2 class="uppercase text-4xl pb-5">Trainee Levels for Model Services</h2>
            </div>

            <!-- Row 2: Phase 1 Bronze -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-900 p-5 md:h-[300px] flex items-center justify-center">
                    <div class="text-primary-100 text-left">
                        <h3 class="text-xl lg:text-3xl">Phase 1: Bronze</h3>
                        <p class="pt-1">Classroom Intensive</p>
                        <p class="pt-1">
                            Trainees focus on mastering the basics with Kenneth's proprietary techniques, working
                            closely with instructors to ensure precision and quality. Models experience collaborative
                            sessions with educational moments and attention to detail.
                        </p>
                        <p class="text-2xl font-semibold pt-1">Pricing from $XX</p>
                    </div>
                </div>
            </div>

            <!-- Row 2: Phase 2 Silver -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-900 p-5 md:h-[300px] flex items-center justify-center">
                    <div class="text-primary-100 text-left">
                        <h3 class="text-xl lg:text-3xl">Phase 2: Silver</h3>
                        <p class="pt-1">Elevation &amp; Coaching</p>
                        <p class="pt-1">
                            Trainees begin personalizing services with creative cuts, color, and problem-solving, guided
                            by instructors. Models experience trainees taking ownership of their craft while delivering
                            the signature Kenneth's experience.
                        </p>
                        <p class="text-2xl font-semibold pt-1">Pricing from $XX</p>
                    </div>
                </div>
            </div>

            <!-- Row 2: Phase 3 Gold -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-900 p-5 md:h-[300px] flex items-center justify-center">
                    <div class="text-primary-100 text-left">
                        <h3 class="text-xl lg:text-3xl">Phase 3: Gold</h3>
                        <p class="pt-1">Professional Polish</p>
                        <p class="pt-1">
                            Confident and skilled, trainees provide trend-forward, personalized services with efficiency
                            and enthusiasm. Models experience polished results as instructors oversee final quality
                            checks.
                        </p>
                        <p class="text-2xl font-semibold pt-1">Pricing from $XX</p>
                    </div>
                </div>
            </div>

            <!-- Row 3: Book Online and View Detailed Pricing (spans all 3 columns) -->
            <div class="lg:col-span-3 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-900 p-10 md:h-[200px] flex items-center justify-center">

                    <!-- Flex container for the two buttons -->
                    <div class="flex flex-col lg:flex-row gap-20 text-primary-100 text-center leading-[2.2]">
                        <button @click="login()"
                            class="w-75 py-2 px-3 rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap text-center">
                            Book Online
                        </button>
                        <a @click="dataGlobal.modelPricingVisible = true"
                            class="w-75 py-2 px-3 rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap text-center">
                            View Detailed Pricing
                        </a>
                    </div>

                </div>
            </div>


        </div>
    </section>

    <!-- SECTION 4: FAQ Accordion -->
    <section class="w-full px-6 py-16 bg-primary-100 text-primary-900">
        <h2 class="text-5xl mb-8 text-center">Frequently Asked Questions</h2>
        <div class="max-w-2xl mx-auto pt-5">

            <!-- Volt Accordion -->
            <Accordion type="single" collapsible class="w-full bg-primary-900">
                <AccordionPanel v-for="(faq, index) in faqs" :key="index" :value="`faq-${index}`"
                    class="border-t-2 border-primary-900">
                    <AccordionHeader> {{ faq.question }}</AccordionHeader>
                    <AccordionContent>
                        <p class="pt-2">{{ faq.answer }}</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </section>

    <!-- SECTION 5 - Quick Disclaimer -->
    <QuickDisclaimer />

    <!-- SECTION 6 - Links for Academy/Model -->
    <section class="w-full px-6 pt-20 pb-20 py-16 bg-primary-100 text-primary-900">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-0 max-w-[1200px] mx-auto">

            <!-- Row 1: First call to action - Apply Today  -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/model/apply-today.webp" alt="Apply Today for our Academy"
                        class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                    <p class="pt-5 text-left pb-5">
                        Interested in learning about Kenneth's Training program?
                    </p>
                    <a href="join-our-team" class="text-xl font-bold underline uppercase hover:text-primary-900">
                        Apply Today
                    </a>
                </div>
            </div>

            <!-- Row 1: Second call to action - book an academy appointment -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/model/book-academy-appointment.webp" alt="Book an Academy appointment"
                        class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                    <p class="pt-5 text-left pb-5">
                        Interested in booking an appointment with a higher-level trainee?
                    </p>
                    <a href="https://kenneths.com/app/"
                        class="text-xl font-bold underline uppercase hover:text-primary-900">
                        Book an Academy Appointment
                    </a>
                </div>
            </div>

            <!-- Row 1: Third call to action - book a model appointment -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/model/book-model-appointment.webp" alt="Book a Model Appointment"
                        class="w-full aspect-square object-cover" loading="lazy" decoding="async" fetchpriority="low" />
                    <p class="pt-5 text-left pb-10">
                        Want to be a model for one of our trainess?
                    </p>
                    <button @click="login()"
                        class="hover:text-primary-500 text-xl font-bold underline uppercase transition rounded inline-block cursor-pointer">
                        Book a Model Appointment</button>
                </div>
            </div>
        </div>
    </section>

    <login-form @didLogin="triedToLogin" cancelButtonText="Book as Guest" showCloseButton="true" />
    <model-pricing-grid />

</template>
<script setup>
import Accordion from '@/volt/Accordion.vue';
import AccordionPanel from '@/volt/AccordionPanel.vue';
import AccordionHeader from '@/volt/AccordionHeader.vue';
import AccordionContent from '@/volt/AccordionContent.vue';

import { dataGlobal } from '~/composables/dataGlobal';
import { accountGlobal } from '~/composables/accountGlobal';

const router = useRouter()

const url2 = appGlobal.apiBaseUrl + '/khsds/WebBookServices/MENU/E/A/M/A/AM';

const { data: serviceMenu, error2 } = await useFetch(url2);

dataGlobal.modelPricingServices = serviceMenu.value;

const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hair Model Program at Kenneth's Academy in Columbus, OH",
    "url": "https://kenneths.com/model",
    "mainEntity": {
        "@type": "Service",
        "name": "Hair Model Program",
        "serviceType": "Discounted Hair Services with Stylists-in-Training",
        "provider": {
            "@type": "Organization",
            "@id": "https://kenneths.com/#organization",
            "name": "Kenneth's Hair Salons and Day Spas",
            "url": "https://kenneths.com"
        },
        "areaServed": "Columbus, Ohio and Central Ohio",
        "description": "Kenneth's Hair Model Program offers discounted hair services in a classroom setting at Kenneth's Academy in Columbus, Ohio. Licensed stylists-in-training in Phases 1–3 perform haircuts and color services under the supervision of expert instructors, giving models quality results while supporting advanced education."
    },
    "description": "Learn about Kenneth's Hair Model Program in Columbus, OH. As a model, you receive discounted hair services from licensed trainees in Phases 1–3 of our world-class Academy training program, with every appointment completed in a supervised classroom environment focused on education and exceptional results.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Kenneth's Academy Training and Model Services",
        "description": "An advanced training program where licensed stylists refine their skills through supervised model appointments, offering guests discounted haircuts and color while supporting Kenneth's commitment to education and excellence."
    },
    "image": {
        "@type": "ImageObject",
        "@id": "https://kenneths.com/model/model-program-hero.webp",
        "url": "https://kenneths.com/model/model-program-hero.webp",
        "contentUrl": "https://kenneths.com/model/model-program-hero.webp",
        "caption": "Kenneth's Academy Hair Model Program",
        "inLanguage": "en-US"
    },
    "isPartOf": {
        "@type": "WebSite",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "inLanguage": "en-US",
    "dateModified": "2025-12-11"
});

useHead({
    title: "Hair Model Program Columbus OH | Kenneth's Academy",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/model'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Save on hair services in Columbus, OH by joining Kenneth's Hair Model Program. Receive discounted cuts and color from licensed stylists-in-training in Phases 1-3 of our Academy, with every service performed in a supervised classroom setting for quality results."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Hair Model Program Columbus OH | Kenneth's Academy"
        },
        {
            property: 'og:description',
            content:
                "Save on hair services in Columbus, OH by joining Kenneth's Hair Model Program. Receive discounted cuts and color from licensed stylists-in-training in Phases 1-3 of our Academy, with every service performed in a supervised classroom setting for quality results."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/model'
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
            content: "Hair Model Program Columbus OH | Kenneth's Academy"
        },
        {
            name: 'twitter:description',
            content:
                "Save on hair services in Columbus, OH by joining Kenneth's Hair Model Program. Receive discounted cuts and color from licensed stylists-in-training in Phases 1-3 of our Academy, with every service performed in a supervised classroom setting for quality results."
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

const faqs = [
    {
        question: "Running Late? We Get It.",
        answer: "If you're running late, please call us. We'll do our best to accommodate you, but your appointment may need to be shortened or rescheduled."
    },
    {
        question: "Coupons & Discounts",
        answer: "We love offering promotions as a thank-you for choosing Kenneth's. One coupon or discount can be applied per service. If you're enjoying multiple services, discounts can be applied to each one individually — but not combined on the same service."
    },
    {
        question: "Children in the Salon",
        answer: "For everyone's comfort, children are welcome in the salon only when they are receiving a service."
    },
    {
        question: "Refunds & Exchanges",
        answer: "If you are unsatisfied with a product or service, please contact CustomerCare@Kenneths.com. Refunds and exchanges are available within 30 days of purchase."
    }
]


async function login() {
    accountGlobal.showLogin = true;
}

async function triedToLogin(loggedIn) {
    if (loggedIn === false) {
        accountGlobal.customerCode = 'BN0000001'; //booking as guest
    }

    router.push('/book/models');
}

</script>

<style scoped></style>