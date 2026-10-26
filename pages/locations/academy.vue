<template>
    <section class="bg-primary-900 w-full h-[95px]  lg:h-[120px] flex items-end">
        <div class="bg-primary-900 w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]"></div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
        <!-- Left column -->

        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <div>
                <h1 class="k-section-title uppercase pt-2">
                    Kenneth's<br />Academy Salon
                </h1>
            </div>

            <div class="mt-6 md:mt-0 k-para-text lg:pb-10">
                <div>
                    When you book an appointment at The Academy Salon, you'll be paired with an apprentice who is on
                    the brink of graduating to become a full-service stylist in one of Kenneth's 9 central Ohio
                    locations.
                </div>

                <div class="mt-5">
                    Reserve an Academy appointment today to receive the same hair services available in
                    our other salons, but at a discounted rate. It's an incredible value with no compromise on quality.
                </div>

                <a href="https://kenneths.com/app/"
                    class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                    <span aria-hidden="true">Book Now @ The Academy Salon →</span>
                    <span class="sr-only">Book now at Kenneth's Academy Salon</span>
                </a>
            </div>

        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center">
            <img src="/images/locations/academy/academy-training-hair-salon.webp" loading="eager" fetchpriority="high"
                alt="Training Hair Salon School" class="w-full aspect-square object-cover" />
        </div>
    </section>

    <location-map-address :locationData="locationData" />

    <location-hours-services :hours="hours" :locationCode="locationCode" />

    <testimonial-section :reviews="locationReviews" :rating="state.socialRating?.rating"
        :review-count="state.socialRating?.reviews" :review-url="state.socialRating?.gmbUrl" />

    <section class="grid grid-cols-1 md:grid-cols-2 bg-primary-900">
        <!-- Left column -->

        <div class="text-primary-100 flex flex-col justify-between p-6 md:p-12">
            <div>
                <h2 class="k-section-title uppercase pt-2">
                    What to expect at your academy appointment
                </h2>
            </div>

            <div class="mt-6 md:mt-0 k-para-text lg:pb-10">
                <div>
                    Hair appointments at The Academy Salon are much like your regular salon visits. Each apprentice is
                    at the final stage of our training process, working confidently and skillfully while instructors are
                    on standby to provide support or guidance. While professional hair services and results are
                    guaranteed, please keep in mind that apprentices are still in training.
                </div>

                <div>
                    <a href="https://kenneths.com/app/"
                        class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                        <span aria-hidden="true">Book Now →</span>
                        <span class="sr-only">Book now at Kenneth's Academy Salon</span>
                    </a>

                </div>
                <div class="hidden">
                    <a href="#"
                        class="hover:text-primary-500 k-section-link font-bold underline uppercase underline-offset-4 transition rounded py-3 inline-block mt-2">
                        <span aria-hidden="true">View Detailed Pricing</span>
                        <span class="sr-only">View detailed pricing for Kenneth's Academy Salon</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Right column -->
        <div class="flex items-center justify-center">
            <img src="/images/locations/academy/academy-training-salon-expectations.webp"
                alt="What to expect at our academy hair salon" class="w-full aspect-square object-cover" loading="lazy"
                decoding="async" fetchpriority="low" />
        </div>
    </section>

    <section class="relative z-10 flex items-center h-full py-5 md:py-12 bg-primary-100 text-primary-900 w-full">
        <div class="px-5 md:px-10 text-center mx-auto">
            <h2 class="k-section-title font-light uppercase">
                Model for a Trainee
            </h2>
            <p class="k-para-text md:w-[50%] mt-4 mx-auto">
                Our Model Program helps our earlier-stage trainees refine their skills under the supervision of expert
                instructors. Model appointments are offered at an even greater discount than our Academy Appointments,
                and take place in a classroom setting under the supervision of our expert instructors.
            </p>
            <p class="pt-5">
                <a href="/model"
                    class="mt-2 self-start px-5 py-2 rounded-3xl k-section-link bg-primary-500 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap cursor-pointer">
                    <span aria-hidden="true">Learn More</span>
                    <span class="sr-only"> about Kenneth's model program for trainees</span>
                </a>
            </p>
        </div>
    </section>

    <location-image-grid :images="images" />

    <faq-section :faq-data="faqData" />

    <section class="hair-quiz-section py-8 px-4 bg-primary-500 text-primary-900 full">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-top">
            <!-- Left Column: Heading and Offer -->
            <div class="items-start">
                <h2 class="k-section-title mb-4 uppercase">A Quick Disclaimer for Our Clients</h2>
            </div>
            <!-- Right Column: Description and Action -->
            <div>
                <p class="k-para-text mb-4">
                    Booking at Kenneth's Academy means you'll receive service from an apprentice stylist in the final
                    stages of our master's training program. While our apprentice stylists are highly skilled and
                    professionally trained, please understand their unique status as trainees. Our Kenneth's Academy
                    team is dedicated to delivering top-tier results under trusted supervision.
                </p>
            </div>
        </div>
    </section>

    <location-stack-section stackText="What We Love About Our Area"
        stackUrl="/locations/academy/whetstone-park-of-roses"
        imageUrl="/images/locations/academy/academy-hair-salon-area.webp" :stackPages="locationStackPages" />

</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal';
import { dataGlobal } from '~/composables/dataGlobal';
let locationCode = 'AT';

//Map and Address section
const base = "https://www.google.com/maps/embed";
const params = "!1m18!1m12!1m3!1d3053.5699065806048!2d-83.06969088465748!3d40.0626980850186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388d77a396e8d5%3A0x186a1c8e07e705b6!2sKenneth&#39;s+Hair+Salons+%26+Day+Spas!5e0!3m2!1sen!2sus!4v1533581631961"
const mapUrl = `${base}?pb=${encodeURIComponent(params)}`;

let locationData = {
    mapUrl: mapUrl,
    center: '5151 Reed Road',
    address: 'Suite 110B',
    city: 'Columbus',
    state: 'OH',
    zipCode: '43220',
    bookingText: 'Book Now →',
    bookingUrl: 'https://kenneths.com/app/',
    directionsUrl: 'https://maps.google.com/?q=5151+Reed+Rd+Suite+110B,+Columbus,+OH+43220'
}

dataGlobal.sideBarVisible = false;

const { convertDateToApiString } = useDateFunctions();
const { filterAbbreviateName } = useFilters();

const state = reactive({
    employees: {
        manager: [],
        desk: [],
        hair: [],
        nail: [],
        spa: []
    },
    socialRating: {},
    location: {}
});

const url = appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWeb/AT'

const { data: employeeList, error } = await useFetch(url);

// Neighborhood (geo stack) pages linked from the stack section
const locationStackPages = await useLocationStackPages('academy');

state.employees.manager = employeeList.value.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 4 || employee.positionId === 5 ||
    employee.positionId === 6 || employee.positionId === 113000003);

state.employees.desk = employeeList.value.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 8 || employee.positionId === 113000004);

state.employees.hair = employeeList.value.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 26);

state.employees.nail = employeeList.value.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 34);

state.employees.spa = employeeList.value.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 33 || employee.positionId === 35 ||
    employee.positionId === 43);

state.socialRating = employeeList.value.socialRatingViewModel;

// Reviews shown on the page AND published as Review structured data. One list feeds both,
// so the markup always matches what visitors can see. Rows without text or a name are dropped.
const locationReviews = (state.socialRating?.socialReviews || [])
    .filter(review => review.reviewComment?.trim() && review.reviewer?.trim());

//Hours and Location Services
let hours = [
    {
        dow: 'Monday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Tuesday',
        hours: '9:30am - 7:30pm'
    },
    {
        dow: 'Wednesday',
        hours: '9:30am - 7:30pm'
    },
    {
        dow: 'Thursday',
        hours: '9:30am - 7:30pm'
    },
    {
        dow: 'Friday',
        hours: '9:30am - 7:30pm'
    },
    {
        dow: 'Saturday',
        hours: '8:30am - 4:00pm'
    },
    {
        dow: 'Sunday',
        hours: 'Closed'
    }
]

//Image Grid section
let images = [
    {
        url: '/images/locations/academy/hands-on-hair-coloring.webp',
        alt: 'Haircut and Coloring training at our Academy Salon'
    },
    {
        url: '/images/locations/academy/seminar-training.webp',
        alt: 'Seminars and Training for our Academy Salon'
    },
    {
        url: '/images/locations/academy/academy-team-members.webp',
        alt: 'Team Members Learning Together'
    },
    {
        url: '/images/locations/academy/executive-team-focused.webp',
        alt: 'Hands-on Executive Leadership with training at our Academy Salon'
    },
]

// FAQ Section
let faqData = [
    {
        faqQuestion: "How does Kenneth's ensure client safety and maintain exceptional cleanliness standards throughout the salon?",
        faqAnswer: "At Kenneth's, we exceed Ohio Cosmetology and Barber Board standards, implementing rigorous protocols that surpass legal requirements. Our commitment to excellence ensures every service and touchpoint in our salons delivers superior safety and cleanliness, consistently exceeding client expectations."
    },
    {
        faqQuestion: "What is Kenneth's typical availability for scheduling appointments?",
        faqAnswer: "Our efficient online booking system at our site allows 24/7 appointment scheduling via the BOOK NOW button. For personalized assistance, our booking specialists are available at 614-538-5800, Monday-Friday 8:00 am – 8:00 pm, and Saturdays 8:00 am – 4:30 pm, ensuring flexible options to suit your scheduling needs."
    },
    {
        faqQuestion: "How does Kenneth's ensure a diverse, inclusive atmosphere that makes every client feel valued and at ease throughout their visit?",
        faqAnswer: "At Kenneth's, we meticulously curate every aspect of the client experience to ensure universal comfort and inclusivity. Our salon and spa designs, coupled with comprehensive staff training, focus on creating a welcoming atmosphere that caters to diverse needs. We continuously refine our approach to maintain exceptional cleanliness, professionalism, and warmth, ensuring each visit is both memorable and inclusive for all our guests."
    },
    {
        faqQuestion: "How does Kenneth's integrate cutting-edge innovations and advanced methodologies into its hair and spa services to deliver superior results?",
        faqAnswer: "At Kenneth's, we integrate cutting-edge innovations in techniques, technology, and product formulations to deliver superior services. Our strong partnerships with industry leaders, manufacturers, and in-house experts ensure we stay at the forefront of beauty and wellness advancements. This collaborative approach allows us to consistently offer our clients the most advanced and effective treatments available in the market."
    }
];

// JSON/LD Section

let jsonLd =
{
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BeautySalon",
            "@id": "https://kenneths.com/locations/academy#beautysalon",
            "name": "Kenneth's Academy Salon",
            "image": {
                "@type": "ImageObject",
                "url": "https://kenneths.com/images/locations/academy-full.webp",
                "width": "645",
                "height": "430",
                "caption": "Kenneth's Academy Hair Salon"
            },
            "logo": {
                "@type": "ImageObject",
                "url": "https://kenneths.com/logo.webp",
                "width": "450",
                "height": "566"
            },
            "url": "https://kenneths.com/locations/academy",
            "description": "Premier Hair Salon Training Facility in Columbus, Ohio offering award-winning hair services, extensions, and hair treatments.",
            "telephone": "+16145385800",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5151 Reed Rd Suite 110B",
                "addressLocality": "Columbus",
                "addressRegion": "OH",
                "postalCode": "43220",
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.062877,
                "longitude": -83.067722
            },
            "openingHours": ["Mo 08:00-19:30", "Tu-Fr 09:30-19:30", "Sa 08:30-16:00"],
            "priceRange": "$$$",
            "currenciesAccepted": "USD",
            "paymentAccepted": "Cash, Credit Card",
            "review": locationReviews.map(review => ({
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": filterAbbreviateName(review.reviewer)
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating.toString()
                },
                "reviewBody": review.reviewComment,
                "datePublished": convertDateToApiString(new Date(review.createDttm))
            })),
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": state.socialRating.rating,
                "ratingCount": state.socialRating.reviews
            },
            "sameAs": [
                "https://g.co/kgs/tQZuqVW"
            ],
            "parentOrganization": {
                "@type": "Organization",
                "@id": "https://kenneths.com/#organization"
            }
        },
        {
            "@type": "FAQPage",
            "@id": "https://kenneths.com/locations/academy#faq",
            "name": "Frequently Asked Questions",
            "mainEntity": faqData.map(faq => ({
                "@type": "Question",
                "name": faq.faqQuestion,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.faqAnswer
                }
            }))
        }

    ]
}

// Only publish review markup when the reviews (and the overall rating line) are actually on the page
const salonNode = jsonLd["@graph"][0]

if (!locationReviews.length) {
    delete salonNode.review
}

if (!locationReviews.length || !state.socialRating?.rating || !state.socialRating?.reviews) {
    delete salonNode.aggregateRating
}

const jsonLDString = JSON.stringify(jsonLd)

useHead({
    title: 'Best Academy Hair Salon | Kenneth\'s Salons And Day Spas',
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/locations/academy'
        },
        {
            rel: 'preload',
            href: '/images/locations/academy/academy-training-hair-salon.webp',
            as: 'image'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                'Come visit the best hair salon Academy, Kenneth\'s Salon and Day Spa! We\'ve got the skills to help you look great with color, glossing, extensions, and more.'
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: 'Best Academy Hair Salon | Kenneth\'s Salons And Day Spas'
        },
        {
            property: 'og:description',
            content:
                'Come visit the best hair salon Academy, Kenneth\'s Salon and Day Spa! We\'ve got the skills to help you look great with color, glossing, extensions, and more.'
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/locations/academy'
        },
        {
            property: 'og:image',
            content: 'https://kenneths.com/images/locations/academy/academy-training-hair-salon.webp'
        },
        {
            property: 'og:image:secure_url',
            content: 'https://kenneths.com/images/locations/academy/academy-training-hair-salon.webp'
        },
        {
            property: 'og:image:type',
            content: 'image/webp'
        },
        {
            property: 'og:image:alt',
            content: "Kenneth's Academy training hair salon"
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
            content: 'Best Academy Hair Salon | Kenneth\'s Salons And Day Spas'
        },
        {
            name: 'twitter:description',
            content:
                'Come visit the best hair salon Academy, Kenneth\'s Salon and Day Spa! We\'ve got the skills to help you look great with color, glossing, extensions, and more.'
        },
        {
            name: 'twitter:image',
            content: 'https://kenneths.com/images/locations/academy/academy-training-hair-salon.webp'
        },
        {
            name: 'twitter:image:alt',
            content: "Kenneth's Academy training hair salon"
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