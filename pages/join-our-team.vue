<template>
    <!-- HERO WRAPPER (visible on all breakpoints) -->
    <section>
        <div class="relative flex items-center justify-center h-[60vh] md:h-[90vmin] w-full bg-cover bg-center overflow-hidden
                bg-[url('/images/join-our-team/join-our-team-header.webp')]">

            <!-- Left shading (desktop only) -->
            <div
                class="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-black/75 to-transparent pointer-events-none hidden md:block">
            </div>

            <!-- Top shading -->
            <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/75 to-transparent pointer-events-none">
            </div>

            <!-- K Icon (desktop only) -->
            <div class="hidden md:block">
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>

            <!-- Join Our Team Text -->
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center uppercase">
                    Join Our Team
                </h1>

                <p class="mt-5 md:mt-10 pointer-events-auto">
                    <a href="https://kenneths.com/careers.htm"
                        class="inline-flex px-5 py-2 k-section-link cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                        aria-label="View open positions at Kenneth's">
                        View Open Positions
                    </a>
                </p>
            </div>
        </div>

        <GoldLine />

    </section>


    <!-- Join our team section -->
    <section class="grid grid-cols-1 md:grid-cols-2">
        <!-- Row 1: Left column (text) -->
        <div class="bg-primary-900 text-primary-100 p-6 md:p-12 flex flex-col md:order-1">
            <h2 class="k-section-title uppercase mb-40">
                Start Strong. Grow Fast. Lead with Confidence.
            </h2>

            <p class="k-para-text lg:pb-20 mt-auto">
                At Kenneth's, we don't just train stylists—we build careers. Our award-winning training &amp; education
                program is a full-scale, immersive experience that transforms fresh talent and seasoned stylists alike
                into industry leaders.
            </p>
        </div>

        <!-- Row 1: Right column (image) -->
        <div class="flex items-center flex-col justify-center md:order-2">
            <img src="/images/join-our-team/start-strong-grow-fast.webp" loading="eager" fetchpriority="high"
                alt="Start Strong. Grow Fast. Lead with Confidence" class="w-full aspect-square object-cover" />
        </div>

        <!-- Row 2: Text (should come before image on mobile) -->
        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12 md:order-4">
            <!-- TOP-aligned paragraph (no mt-auto) -->
            <p class="k-para-text lg:pb-20">
                Through an elite, multi-phase curriculum blending technical mastery,
                personal development, and real-world application, our graduates emerge as
                some of the top 1% of earners in the industry.
            </p>

            <!-- BOTTOM-aligned paragraph -->
            <p class="k-para-text lg:pb-20 mt-auto">
                Interested in joining our management ranks or front desk staff? Every employee at Kenneth's has
                opportunities for continuing training and education and we'd love to have you join us. Click below
                to see our current open positions.
                <br />
                <a href="https://kenneths.com/careers.htm"
                    class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-4">
                    Apply Today
                </a>
            </p>
        </div>

        <!-- Row 2: Image (left on desktop, below text on mobile) -->
        <div class="flex items-center justify-center md:order-3">
            <img src="/images/join-our-team/elite-multi-phase.webp" alt="Our elite multi-phase curriculum"
                class="w-full aspect-square object-cover" />
        </div>
    </section>


    <!-- What to expect section -->
    <section id="hair-services" class="grid grid-cols-1 md:grid-cols-3 bg-primary-100 text-primary-900  items-start">
        <!-- Left Column (1/3 on md and up) -->
        <div class="col-span-1 text-left pl-15 pt-4">
            <h2 class="uppercase k-section-title pb-5">Benefits of Joining the Team</h2>
        </div>

        <!-- Right Column (2/3 on md and up) -->
        <div class="col-span-2 text-left pr-4 md:pr-15">
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">100% Employee-Owned</h3>

                <p class="k-para-text pb-3">
                    Since 2007, Kenneth's has been 100% employee-owned, which means every team member has a stake in the
                    company's success. Our shared ownership creates a unique culture of camaraderie, collaboration, and
                    pride—resulting in a salon where stylists are truly empowered to take the lead.
                </p>
                <!--  how we became employee owned, link? dmp -->
                <GoldLine />
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Elite Education &amp; Training</h3>

                <p class="k-para-text pb-3">
                    → Paid Technician Training
                    Our paid training program is equivalent to a master's degree, offering hands-on learning from
                    leading experts.
                </p>
                <p class="k-para-text pb-3">
                    → Free Continuing Education
                    Gain access to monthly coaching sessions and ongoing training to help you feel confident and grow in
                    your role.
                </p>
                <p class="k-para-text pb-3">
                    → Access to Industry Artists &amp; Guest Speakers
                    Get inspired and learn from industry experts about topics ranging from advanced color techniques and
                    design to wealth management and motivation.
                </p>

            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Flexible Schedules &amp; Location Options</h3>

                <p class="k-para-text pb-3">
                    → Flexible Work Schedules
                    Full- and part-time positions are available for all phases of life.
                </p>
                <p class="k-para-text pb-3">
                    → Multiple Work Locations
                    Choose from our 9 convenient Columbus-area locations.
                </p>
                <p class="k-para-text pb-3">
                    → Service-Based Bonuses
                    Earn additional rewards just by delivering excellent service.
                </p>
            </div>

            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Prioritize Health &amp; Wellness</h3>

                <p class="k-para-text pb-3">
                    → Health Care Coverage
                    Kenneth's covers a percentage of employee health insurance, including free mental health visits and
                    subsidized healthcare.
                </p>
                <p class="k-para-text pb-3">
                    → Employee Discounts
                    Enjoy up to 75% off hair, spa, and nail services + 50% off products.
                </p>
                <p class="k-para-text pb-3">
                    → Community Support
                    Join a team that feels like family and thrives on creating meaningful connections and building
                    community.
                </p>
                <GoldLine />
            </div>
        </div>
    </section>

    <!-- SECTION 3: Image Group -->
    <section class="w-full py-10 bg-primary-100 text-primary-900 border-primary-500">

        <div class="pb-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-auto px-6">
                <!-- Image 1 -->
                <div class="aspect-square">
                    <img src="/images/join-our-team/g1_customer-service.webp" alt="Kenneth's Customer Service"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Image 2 -->
                <div class="aspect-square">
                    <img src="/images/join-our-team/g2-kenneths-academy.webp" alt="Kenneth's Academy"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Image 3 -->
                <div class="aspect-square">
                    <img src="/images/join-our-team/g3_nails.webp" alt="Nails Image"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Image 4 -->
                <div class="aspect-square">
                    <img src="/images/join-our-team/g4-continuing-education.webp"
                        alt="Continuing Education at Kenneth's" class="w-full h-full object-cover" />
                </div>
            </div>
        </div>
        <div class="bg-primary-500 text-primary-900 p-6 md:p-12">
            <div class="max-w-6xl mx-auto">
                <div class="items-start">
                    <h3 class="k-sub-section-title2 mb-4 uppercase">
                        “Hair was just the start. We created a place where
                        talent grows, confidence is built, and dreams become careers.”
                    </h3>
                    <hr />
                    <p class="k-para-text">--- Kenneth Anders</p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 4: World Class Training -->
    <section class="w-full">
        <div class="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2">

            <!-- IMAGE COLUMN – should appear FIRST on mobile, SECOND on desktop -->
            <div class="flex items-center flex-col justify-center order-1 md:order-2">
                <img src="/images/join-our-team/world-class-training.webp"
                    alt="World-Class Training from Industry Experts" class="w-full aspect-square object-cover" />
            </div>

            <!-- TEXT COLUMN – should appear SECOND on mobile, FIRST on desktop -->
            <div class="bg-primary-900 text-primary-100 p-6 md:p-12 flex flex-col order-2 md:order-1">
                <h2 class="k-section-title uppercase mb-40">
                    World-Class Training from Industry Experts.
                </h2>

                <p class="k-para-text lg:pb-20 mt-auto">
                    Kenneth's comprehensive training program transforms aspiring technicians into skilled professionals
                    through our award-winning curriculum. Our step-by-step program is designed to elevate your skills
                    and career from beginner to expert with hands-on learning from leading industry experts.
                </p>
            </div>

        </div>
    </section>


    <!-- SECTION 3: Phase Levels -->
    <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1200px] mx-auto">

            <!-- Row 1: Intro text -->
            <div class="lg:col-span-2 flex flex-col items-center text-center mb-10 space-y-4">
                <h2 class="uppercase k-section-title">
                    A Master's in Hair &amp; Beauty
                </h2>

                <p class="k-para-text">
                    Every technician at Kenneth's receives paid training from
                    local industry leaders.
                </p>
            </div>

            <!-- Phase I -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-100 p-5 md:h-[350px] flex items-start justify-center">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-sub-section-title2">Phase I</h3>
                        <p class="k-para-text font-semibold pt-1">Classroom Intensive</p>
                        <p class="k-para-text pt-1">
                            Trainees begin with an in-depth immersion into Kenneth's Core Values, systems, and
                            culture while building foundational skills in their craft. With a strong emphasis on
                            quality, technique, and product knowledge, this phase combines demonstrations,
                            hands-on model work, and instructor-led development.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase II -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-100 p-5 md:h-[350px] flex items-start justify-center">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-sub-section-title2">Phase II</h3>
                        <p class="k-para-text font-semibold pt-1">Mentoring &amp; Elevation</p>
                        <p class="k-para-text pt-1">
                            Trainees work side-by-side with experienced professionals to refine consultation
                            skills and client engagement. Learn to deliver personalized, results-driven services
                            while gaining real-world insight into salon life.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase III -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-100 p-5 md:h-[350px] flex items-start justify-center">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-sub-section-title2">Phase III</h3>
                        <p class="k-para-text pt-1 font-semibold">Professional Polish</p>
                        <p class="k-para-text pt-1">
                            This phase focuses on refining advanced techniques and mastering timing, flow, and
                            precision. Receive individualized coaching while performing real-world model work
                            to become salon-ready, confident, and technically skilled.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase IV -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <div class="w-full bg-primary-100 p-5 md:h-[350px] flex items-start justify-center">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-sub-section-title2">Phase IV</h3>
                        <p class="k-para-text pt-1 font-semibold">Mastery &amp; Ownership</p>
                        <p class="k-para-text pt-1">
                            In this final stage, trainees bring all elements together—technical skill,
                            professionalism, and consultation expertise—while preparing to join a Kenneth's
                            location. Demonstrate consistent performance, participate in multiple model
                            sessions, and refine your professional identity.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA Button (spans both columns) -->
            <div class="k-section-link lg:col-span-2 flex justify-center pt-6">
                <a href="https://kenneths.com/careers.htm"
                    class="px-5 py-2 ml-auto lg:ml-0 cursor-pointer rounded-3xl bg-primary-500 text-primary-900 hover:bg-primary-900 hover:text-primary-100 whitespace-nowrap text-xl">Open
                    Positions</a>
            </div>

        </div>
    </section>

    <Awards />

    <!-- SECTION 6 - Links for Meet Our Team, Explore our Story and Get in Touch -->
    <section class="w-full px-6 pt-20 pb-20 py-16 bg-primary-100 text-primary-900">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-0 max-w-[1200px] mx-auto">

            <!-- Row 1: First call to action - Meet Our Team  -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/join-our-team/meet-our-team.webp" alt="Meet Our Team"
                        class="w-full aspect-square object-cover" />
                    <p class="k-para-text pt-5 text-left pb-5">
                        Want to know more about our team at Kenneth's?
                    </p>
                    <a href="/our-team" class="k-section-link font-bold underline uppercase hover:text-primary-900">
                        Meet Our team
                    </a>
                </div>
            </div>

            <!-- Row 1: Second call to action - Explore our Story -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/join-our-team/explore-our-story.webp" alt="Explore our Story"
                        class="w-full aspect-square object-cover" />
                    <p class="k-para-text pt-5 text-left pb-5">
                        Interested in Kenneth's story and mission?
                    </p>
                    <a href="/about" class="k-section-link font-bold underline uppercase hover:text-primary-900">
                        Explore Our Story
                    </a>
                </div>
            </div>

            <!-- Row 1: Third call to action - Get In touch -->
            <div class="w-full bg-primary-100 p-5 flex items-center justify-center">
                <div class="text-primary-900 text-left">
                    <img src="/images/join-our-team/get-in-touch.webp" alt="Get in Touch"
                        class="w-full aspect-square object-cover" />
                    <p class="k-para-text pt-5 text-left pb-5">
                        Have questions or need help? Contact us anytime!
                    </p>
                    <a href="/contact-us" class="k-section-link font-bold underline uppercase hover:text-primary-900">
                        Get in touch&rarr;
                    </a>
                </div>
            </div>
        </div>
    </section>

    <Book-Section />

</template>
<script setup>
import Accordion from '@/volt/Accordion.vue';
import AccordionPanel from '@/volt/AccordionPanel.vue';
import AccordionHeader from '@/volt/AccordionHeader.vue';
import AccordionContent from '@/volt/AccordionContent.vue';
import Button from '@/volt/Button.vue';
import { useHead } from '#imports';

const faqs = [
    {
        question: "Running Late? We Get It.",
        answer:
            "If you're running late, please call us. We'll do our best to accommodate you, but your appointment may need to be shortened or rescheduled."
    },
    {
        question: "Coupons & Discounts",
        answer:
            "We love offering promotions as a thank-you for choosing Kenneth's. One coupon or discount can be applied per service. If you're enjoying multiple services, discounts can be applied to each one individually — but not combined on the same service."
    },
    {
        question: "Children in the Salon",
        answer:
            "For everyone's comfort, children are welcome in the salon only when they are receiving a service."
    },
    {
        question: "Refunds & Exchanges",
        answer:
            "If you are unsatisfied with a product or service, please contact CustomerCare@Kenneths.com. Refunds and exchanges are available within 30 days of purchase."
    }
];

const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kenneths.com/join-our-team",
    "url": "https://kenneths.com/join-our-team",
    "name": "Salon Careers Columbus OH | Kenneth's Hair Salons & Spas",
    "description":
        "Explore salon, spa, and front desk careers at Kenneth's in Columbus, OH and Central Ohio. Join our 100% employee-owned team and grow with elite education, paid training, flexible schedules, and award-winning workplace culture.",
    "isPartOf": {
        "@type": "WebSite",
        "@id": "https://kenneths.com/#website",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "publisher": {
        "@type": "Organization",
        "@id": "https://kenneths.com/#organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com",
        "areaServed": "Columbus, Ohio and Central Ohio"
    },
    "inLanguage": "en-US",
    "about": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas Careers",
        "description":
            "Kenneth's offers beauty careers with paid advanced training, growth paths for stylists, estheticians, nail technicians, managers, and front desk, plus 100% employee ownership and top workplace recognition in Central Ohio.",
        "areaServed": "Columbus, Ohio and Central Ohio",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Columbus",
            "addressRegion": "OH",
            "addressCountry": "US"
        }
    },
    "mainEntity": {
        "@type": "FAQPage",
        "name": "Frequently Asked Questions",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }
};

const jsonLDString = JSON.stringify(jsonLD);

useHead({
    title: "Salon Careers Columbus OH | Kenneth's Hair Salons & Spas",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/join-our-team'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Build your beauty career at Kenneth's in Columbus, OH and Central Ohio. Discover stylist, esthetician, nail technician, management, and front desk opportunities with paid training, advanced education, employee ownership, and Top Workplace benefits."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Salon Careers Columbus OH | Kenneth's Hair Salons & Spas"
        },
        {
            property: 'og:description',
            content:
                "Build your beauty career at Kenneth's in Columbus, OH and Central Ohio. Discover stylist, esthetician, nail technician, management, and front desk opportunities with paid training, advanced education, employee ownership, and Top Workplace benefits."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/join-our-team'
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
            content: "Salon Careers Columbus OH | Kenneth's Hair Salons & Spas"
        },
        {
            name: 'twitter:description',
            content:
                "Build your beauty career at Kenneth's in Columbus, OH and Central Ohio. Discover stylist, esthetician, nail technician, management, and front desk opportunities with paid training, advanced education, employee ownership, and Top Workplace benefits."
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