<template>
    <location-hero :heroData="state.location.locationHero" />

    <location-map-address :locationData="locationData" />

    <location-image-grid :images="state.location.locationImageGrids" />

    <location-hours-services :hours="hours" :locationServices="state.location.locationService" />

    <!--spa bar-->
    <section v-if="state.location.locationService.spaBar === true">
        <div class="relative z-10 flex items-center h-full py-5 md:py-12 bg-primary-900 text-primary-100 w-full">
            <div class="px-5 md:px-10 text-center mx-auto">
                <p class=" k-section-title font-light uppercase">
                    Meet us at the Spa Bar
                </p>
                <p class="k-para-text md:w-[50%] mt-4 mx-auto">
                    Our new Spa Bar is open at the Polaris location! The Spa Bar combines luxury, community, and curated
                    wellness into a modern spa and social space. Visit us with your friends for a fun outing or stop by
                    solo for a self-care recharge.
                </p>
                <p>
                    <pop-up-menu>
                        <template #trigger>
                            <div
                                class="hover:text-primary-700 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2 font-bold">
                                {{ locationData.bookingText }}</div>
                        </template>
                        <template #links>
                            <div class="sans-serif p-3 k-section-link">
                                <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                            </div>
                            <div class="sans-serif p-3 k-section-link">
                                <a class="text-xl link" :href="'/book/new/promo?fl=' + state.location.locationCode">New
                                    Customer</a>
                            </div>
                        </template>
                    </pop-up-menu>
                </p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto bg-primary-900 text-primary-100 px-8 pb-6">
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <!-- Inner wrapper (flex column to push button down) -->
                <div class="bg-primary-900 p-8 h-full flex flex-col">
                    <div class="k-para-text font-bold mb-3">
                        Socialize While Being Pampered
                    </div>
                    <div class="k-para-text">
                        Gone are traditional locker rooms and isolated waiting areas. The open-concept design feels more
                        like an upscale lounge—complete with ultra-comfy massage loungers, modern decor, and a sleek
                        glass wall that views into the salon.
                    </div>
                </div>
            </div>
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <!-- Inner wrapper (flex column to push button down) -->
                <div class="bg-primary-900 p-8 h-full flex flex-col">
                    <div class="k-para-text font-bold mb-3">
                        Spa Treatments that Fit into Your Lunch Break
                    </div>
                    <div class="k-para-text">
                        You don't have to spend all day at the spa to feel pampered! The Spa Bar features 45-minute
                        appointments so you can get in, glow up, and go about your day.
                    </div>
                </div>
            </div>
            <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] p-0.5">
                <!-- Inner wrapper (flex column to push button down) -->
                <div class="bg-primary-900 p-8 h-full flex flex-col">
                    <div class="k-para-text font-bold mb-3">
                        Zero-Proof Beverage Bar
                    </div>
                    <div class="k-para-text">
                        Because true beauty starts from within, The Spa Bar is stocked with collagen-boosting elixirs,
                        adaptogen blends, and probiotic drinks. It's a wellness-forward alternative to the traditional
                        champagne toast.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <testimonial-section :reviews="locationReviews" :rating="state.socialRating?.rating"
        :review-count="state.socialRating?.reviews" :review-url="state.socialRating?.gmbUrl"
        :testimonial="state.location.locationTestimonial.testimonial"
        :author="state.location.locationTestimonial.author" />

    <location-team :employees="state.employees" :technicianTypes="technicianTypes" :title="state.location.teamTitle" />

    <locations-carousel class="pl-5" heading="OTHER LOCATIONS" />

    <quiz-section />

    <faq-section :faq-data="state.location.locationFaqs" />

    <questions-help />

    <location-stack-section :stackText="state.location.locationStack.stackText"
        :stackUrl="state.location.locationStack.stackUrl" :imageUrl="state.location.locationStack.stackImageUrl"
        :stackPages="locationStackPages" />

    <book-section />

</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal';
const { convertDateToApiString } = useDateFunctions();
const { filterAbbreviateName } = useFilters();
const { throwError } = useResponse();

const { loca } = useRoute().params //get param passed in the url

const { setLastPageB4Profile } = useLocalStorage();

import { useRouter } from 'vue-router';

const router = useRouter();

if (import.meta.client) {
    setLastPageB4Profile(router.currentRoute.value.fullPath);
}

let locationParam = '';

if (loca === 'polaris') {
    locationParam = 'PL';
} else if (loca === 'dublin') {
    locationParam = 'AV';
} else if (loca === 'hilliard') {
    locationParam = 'MR';
} else if (loca === 'grove-city') {
    locationParam = 'GR';
} else if (loca === 'new-albany') {
    locationParam = 'NG';
} else if (loca === 'pickerington') {
    locationParam = 'TS';
} else if (loca === 'powell') {
    locationParam = 'PW';
} else if (loca === 'upper-arlington') {
    locationParam = 'KD';
} else if (loca === 'westerville') {
    locationParam = 'WS';
}

if (!locationParam) {
    throwError(404, `Location "${loca}" not found`);
}

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



const url = appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWeb/' + locationParam;

const { data: employeeList, error } = await useFetch(url);

if (error.value || !employeeList.value?.locationAddressViewModel) {
    throwError(404, `Location "${loca}" not found`);
}

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

state.location = employeeList.value.locationAddressViewModel;

// Neighborhood (geo stack) pages linked from the stack section
const locationStackPages = await useLocationStackPages(loca);

//Team Member section
let technicianTypes = [];

if (state.employees.hair.length > 0) {
    technicianTypes.push({ technicianType: 'hair', description: 'Hair Stylists' })
}

if (state.employees.nail.length > 0) {
    technicianTypes.push({ technicianType: 'nail', description: 'Nail Technicians' })
}

if (state.employees.spa.length > 0) {
    technicianTypes.push({ technicianType: 'spa', description: 'Spa Technicians' })
}


//Map and Address section
const base = "https://www.google.com/maps/embed";
const params = state.location.googleParams
const mapUrl = `${base}?pb=${encodeURIComponent(params)}`;

let locationData = {
    locationCode: locationParam,
    mapUrl: mapUrl,
    center: state.location.center,
    address: state.location.address,
    city: state.location.city,
    state: state.location.state,
    zipCode: state.location.zipCode,
    bookingText: state.location.bookingText,
    latitude: state.location.latitude,
    longitude: state.location.longitude,
    directionsUrl: state.location.directionsUrl,
    bookingUrl: '/book/new/promo?fl=' + locationParam
}

// console.log(locationData)

//Hours and Location Services
let hours = [
    {
        dow: 'Monday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Tuesday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Wednesday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Thursday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Friday',
        hours: '8:00am - 7:30pm'
    },
    {
        dow: 'Saturday',
        hours: '8:00am - 4:00pm'
    },
    {
        dow: 'Sunday',
        hours: 'Closed'
    }
]

// FAQ Section
let faqData = state.location.locationFaqs

// Real static asset naming diverges from the loca slug for this one location
// (public/images/locations/ has reynoldsburg-full.webp, not pickerington-full.webp).
const locationImageSlug = loca === 'pickerington' ? 'reynoldsburg' : loca;

// JSON/LD Section
let jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BeautySalon",
            "@id": "https://kenneths.com/locations/" + loca + "#beautysalon",
            "name": "Kenneth's Hair Salon and Day Spa - " + state.location.locationHero.header1,
            "image": {
                "@type": "ImageObject",
                "url": "https://kenneths.com/images/locations/" + locationImageSlug + "-full.webp",
                "width": "645",
                "height": "430",
                "caption": "Kenneth's " + state.location.locationHero.header1 + " Hair Salon Stylist Stations"
            },
            "logo": {
                "@type": "ImageObject",
                "url": "https://kenneths.com/logo.webp",
                "width": "450",
                "height": "566"
            },
            "url": "https://kenneths.com/locations/" + loca,
            "description": "Discover the ultimate relaxation and beauty destination at Kenneth\'s, the leading " + state.location.locationHero.header1 + " hair salon and day spa. Book your appointment today!",
            "telephone": "+16145385800",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": state.location.address,
                "addressLocality": state.location.city,
                "addressRegion": state.location.state,
                "postalCode": state.location.zipCode,
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": state.location.latitude,
                "longitude": state.location.longitude
            },
            "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"],
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
                "https://" + state.location.gbpSameAs
            ],
            "parentOrganization": {
                "@type": "Organization",
                "@id": "https://kenneths.com/#organization"
            }
        },
        {
            "@type": "FAQPage",
            "@id": "https://kenneths.com/locations/" + loca + "#faq",
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


const locationTitle =
    state.location.locationHero.header1 + ' Hair Salon & Day Spa | Kenneth\'s'

const locationDescription =
    'Discover the ultimate relaxation and beauty destination at Kenneth\'s, the leading ' +
    state.location.locationHero.header1 +
    ' hair salon and day spa. Book your appointment today!'

const locationUrl =
    'https://kenneths.com/locations/' + loca

const locationImage =
    'https://kenneths.com/images/locations/' + locationImageSlug + '.webp'

const locationImageAlt =
    'Kenneth\'s ' + state.location.locationHero.header1 + ' Hair Salon and Day Spa'

useHead({
    title: locationTitle,
    link: [
        {
            rel: 'canonical',
            href: locationUrl
        },
        {
            rel: 'preload',
            href: '/images/locations/' + locationImageSlug + '.webp',
            as: 'image'
        }
    ],
    meta: [
        {
            name: 'description',
            content: locationDescription
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: locationTitle
        },
        {
            property: 'og:description',
            content: locationDescription
        },
        {
            property: 'og:url',
            content: locationUrl
        },
        {
            property: 'og:image',
            content: locationImage
        },
        {
            property: 'og:image:secure_url',
            content: locationImage
        },
        {
            property: 'og:image:type',
            content: 'image/webp'
        },
        {
            property: 'og:image:alt',
            content: locationImageAlt
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
            content: locationTitle
        },
        {
            name: 'twitter:description',
            content: locationDescription
        },
        {
            name: 'twitter:image',
            content: locationImage
        },
        {
            name: 'twitter:image:alt',
            content: locationImageAlt
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