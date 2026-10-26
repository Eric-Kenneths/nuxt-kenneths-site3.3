<template>

    <!-- SECTION 1: Training and Education-->
    <section class="mt-30">
        <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]"></div>

        <!-- Pair 1: Training and Education -->
        <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Image (left on desktop, below text on mobile) -->
            <div class="flex items-center justify-center order-2 md:order-1">
                <img src="/images/training/book-academy-appointment.webp" loading="eager" fetchpriority="high"
                    alt="Book an Academy Appointment" class="w-full aspect-square object-cover" />
            </div>

            <!-- Text (right on desktop, above image on mobile) -->
            <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6 md:p-12 order-1 md:order-2">
                <h1 class="k-section-title uppercase mb-10 md:mb-40">
                    Training And Education
                </h1>
                <p class="k-para-text lg:pb-20">
                    Kenneth always believed that exceptional service requires continuous learning. That's why we
                    developed our world-class training program for everyone who joins our team. When you choose
                    Kenneth's, you're choosing a team of experts who are not only passionate about their craft, but
                    relentlessly committed to staying ahead of trends, techniques, and innovations.
                    Kenneth always believed that exceptional service requires continuous learning. That's why we
                    developed our world-class training program for everyone who joins our team. When you choose
                    Kenneth's, you're choosing a team of experts who are not only passionate about their craft, but
                    relentlessly committed to staying ahead of trends, techniques, and innovations.
                </p>
            </div>
        </div>

        <!-- Pair 2: Master's Program -->
        <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Text (always left) -->
            <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
                <div>
                    <h2 class="k-section-title uppercase pt-2">
                        Kenneth's Academy: The Master's Program of Hair &amp; Beauty
                    </h2>
                </div>
                <p class="k-para-text mt-5 md:mt-0 lg:pb-20">
                    Our technicians join Kenneth's as certified beauty professionals, but that's only the beginning of
                    their
                    education journeys. Kenneth's Academy is a training program designed to elevate stylists to new
                    levels
                    of mastery and teach them everything that beauty school didn't.
                </p>
            </div>

            <!-- Image (always right) -->
            <div class="flex items-center justify-center">
                <img src="/images/training/masters-program-of-hair-and-beauty.webp" loading="eager" fetchpriority="high"
                    alt="The Master's Program of Hair and Beauty" class="w-full aspect-square object-cover" />
            </div>
        </div>
    </section>


    <!-- SECTION 2: Trainee types -->
    <section class="w-full px-6 py-16 bg-primary-100 text-primary-900 border-t border-b border-primary-500">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-[1300px] mx-auto">

            <!-- Row 1: Levels of Training intro text (spans all 4 columns) -->
            <div class="lg:col-span-4 text-center mb-10">
                <h2 class="k-section-title uppercase pb-5">Levels of Training</h2>
                <p class="pt-1 k-para-text max-w-3xl mx-auto">
                    Through four levels of advanced training, our apprentices gain expertise and real-world experience
                    so that every technician is fully equipped to deliver impeccable services &amp; results.
                </p>
            </div>

            <!-- Row 2: Phase boxes side by side in desktop, stacked in mobile -->
            <!-- Phase 1 -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5 flex">
                <div class="w-full bg-primary-100 p-5 flex flex-col h-full">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-section-title">Phase I</h3>
                        <p class="k-para-text pt-1">Classroom Intensive</p>
                        <p class="md:text-1xl pt-1">
                            Trainees begin with an in-depth immersion into Kenneth's Core Values, systems, and culture
                            while building foundational skills in their craft. With a strong emphasis on quality,
                            technique, and product knowledge, this phase combines demonstrations, hands-on work with
                            models, and instructor-led development to ensure technical and professional readiness.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase 2 -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5 flex">
                <div class="w-full bg-primary-100 p-5 flex flex-col h-full">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-section-title">Phase II</h3>
                        <p class="k-para-text pt-1">Monitoring &amp; Elevation</p>
                        <p class="md:text-1xl pt-1">
                            Trainees work side-by-side with experienced professionals to refine consultation skills and
                            client engagement. Through direct observation and guided participation, they learn to
                            deliver personalized, results-driven services while gaining real-world insight into the
                            rhythm and expectations of salon life.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase 3 -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5 flex">
                <div class="w-full bg-primary-100 p-5 flex flex-col h-full">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-section-title">Phase III</h3>
                        <p class="k-para-text pt-1">Professional Polish</p>
                        <p class="md:text-1xl pt-1">
                            This phase focuses on refining advanced techniques and mastering timing, flow, and
                            precision. Trainees elevate their service delivery through hands-on model work, while
                            receiving individualized coaching to ensure they're salon-ready—technically skilled,
                            confident, and client-focused.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Phase 4 -->
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5 flex">
                <div class="w-full bg-primary-100 p-5 flex flex-col h-full">
                    <div class="text-primary-900 text-left">
                        <h3 class="k-section-title">Phase IV</h3>
                        <p class="k-para-text pt-1">Apprenticeship</p>
                        <p class="md:text-1xl pt-1">
                            In their final stage, trainees bring all elements together—technical skill,
                            professionalism, and consultation expertise—as they prepare to join a Kenneth's location.
                            With the support of mentors and peers, they demonstrate readiness through consistent
                            performance, multiple model sessions, and a clear expression of their professional identity.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </section>


    <!-- SECTION 3: Our Stylists are leading the way -->
    <section id="hair-services"
        class="grid grid-cols-1 md:grid-cols-3 mt-10 mb-20 bg-primary-900 text-primary-100 items-start">
        <!-- Left Column (1/3 on md and up) -->
        <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <h2 class="k-section-title uppercase mb-5 md:mb-10">Our stylists are leading the way</h2>
            <div class="md:flex">
                <p class="k-para-text lg:pb-20">
                    Continuous learning opportunities are always available to our team members, keeping us ahead of the
                    competition and prepared to keep our clients happy.
                </p>
            </div>
        </div>

        <!-- Right Column (2/3 on md and up) -->
        <div class="col-span-2 text-left pr-4 md:pr-15">
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Specialist Training</h3>

                <p class="k-para-text pb-3">
                    Our specialist training empowers stylists to expand their craft and serve more guests with
                    confidence. Through advanced education in precision cutting, expert color services, textured hair
                    techniques, extensions, barbering, wigs and toppers, and hair loss solutions, our team continues to
                    grow their skills and elevate every guest experience.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Product Knowledge Sessions</h3>

                <p class="k-para-text pb-3">
                    Our product knowledge sessions connect stylists with the people who create the tools and formulas
                    they use. Through partnerships with leading manufacturers and direct collaboration with our private
                    label chemist, our team gains a deeper understanding of every product they recommend.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Trend Forecasting Workshops</h3>

                <p class="k-para-text pb-3">
                    Fashion and beauty are always evolving, and so are we. By welcoming leading industry artists to
                    share trend insights and sending our educators to advanced workshops and symposiums across the
                    country, we keep our team inspired and ready to bring the newest looks to our guests.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
            <div class="mt-4 pl-5 lg:pl-20">
                <h3 class="uppercase k-sub-section-title2 pb-3">Monthly Coaching Sessions</h3>

                <p class="k-para-text pb-3">
                    Our monthly coaching sessions provide focused guidance for every stylist. By supporting technical
                    progress, guest experience, and the business side of being an employee-owner, we help our team build
                    careers that grow stronger year after year.
                </p>

                <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px] mb-5"></div>
            </div>
        </div>
    </section>

    <!-- SECTION 5 - Explore Careers -->
    <ExploreCareers />

    <!-- SECTION 6 - Links for Academy/Model -->
    <section class="bg-primary-900 text-primary-100 grid grid-cols-1 md:grid-cols-2">
        <!-- Left column -->
        <div class="flex items-center flex-col justify-center">
            <img src="/images/training/training-education.webp" alt="Training and Education at Kenneth's"
                class="w-full aspect-square object-cover" />
        </div>

        <!-- Right column -->
        <div class="bg-primary-900 text-primary-100 flex flex-col p-6 md:p-12">
            <h2 class="k-section-title uppercase">
                Book an Academy Appointment
            </h2>

            <p class="k-para-text mt-10">
                At Kenneth's Academy, our talented stylists-in-training are ready to bring you beautiful results at a
                discounted rate—all with oversight from our expert instructors, ensuring the high standards you've come
                to expect from Kenneth's.
            </p>

            <!-- Bottom links -->
            <div class="mt-auto flex flex-col items-start pt-8">
                <a href="https://kenneths.com/app/" aria-label="Book an Academy Appointment at Kenneth's Academy"
                    title="Book an Academy Appointment at Kenneth's Academy"
                    class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block">
                    <span aria-hidden="true">BOOK NOW →</span>
                    <span class="sr-only">Book an Academy Appointment at Kenneth's Academy</span>
                </a>

                <a href="/locations/academy" aria-label="Learn More About Kenneth's Academy Location"
                    title="Learn More About Kenneth's Academy Location"
                    class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block">
                    <span aria-hidden="true">LEARN MORE</span>
                    <span class="sr-only">Learn More About Kenneth's Academy Location</span>
                </a>
            </div>
        </div>
    </section>
    <!-- SECTION 7: Book Your Beauty Experience -->
    <BookSection />

</template>
<script setup>
import BookSection from '~/components/book-section.vue';

const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kenneth's Academy Training & Education",
    "url": "https://kenneths.com/training",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization",
        "url": "https://kenneths.com"
    },
    "description": "Learn about Kenneth's Academy, the advanced training and education program in Columbus, Ohio where licensed stylists progress through phased training, work with models, and offer discounted Academy appointments under expert instructor guidance to deliver the high standards Kenneth's is known for.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "EducationalOrganization",
        "name": "Kenneth's Academy",
        "description": "Kenneth's Academy is an in-house, post-licensure training program for stylists and technicians that blends classroom education, hands-on model work, and Academy salon appointments through multiple phases of advanced training in Central Ohio."
    },
    "inLanguage": "en-US"
});


useHead({
    title: "Stylist Training Columbus OH | Kenneth's Academy",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/training'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Discover Kenneth's Academy in Columbus, OH—our in-house advanced training program where licensed stylists refine their skills through phased education, model services, and Academy appointments designed to deliver beautiful results at discounted rates."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Stylist Training Columbus OH | Kenneth's Academy"
        },
        {
            property: 'og:description',
            content:
                "Discover Kenneth's Academy in Columbus, OH—our in-house advanced training program where licensed stylists refine their skills through phased education, model services, and Academy appointments designed to deliver beautiful results at discounted rates."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/training'
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
            content: "Stylist Training Columbus OH | Kenneth's Academy"
        },
        {
            name: 'twitter:description',
            content:
                "Discover Kenneth's Academy in Columbus, OH—our in-house advanced training program where licensed stylists refine their skills through phased education, model services, and Academy appointments designed to deliver beautiful results at discounted rates."
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