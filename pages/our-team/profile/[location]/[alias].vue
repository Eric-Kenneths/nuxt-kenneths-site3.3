<template>
    <section class="lg:hidden bg-primary-900 w-full h-[95px] lg:h-[120px] flex items-end" aria-hidden="true">
        <GoldLine />
    </section>

    <!-- Profile hero -->
    <section class="relative flex items-center justify-center h-[45vmin] lg:h-[30vmin] w-full overflow-hidden"
        aria-labelledby="profile-heading">
        <img src="/images/icons/k-icon-light.webp" alt="" aria-hidden="true"
            class="absolute -top-20 -left-10 w-auto h-[160%] z-20 pointer-events-none opacity-30" />

        <header class="flex flex-col items-center justify-center pt-40 pb-35 lg:pb-20">
            <h1 id="profile-heading" class="text-4xl lg:text-6xl text-primary-100 font-thin uppercase text-center">
                {{ technician.emalias }}
            </h1>

            <p class="text-primary-100 font-thin uppercase text-center text-lg lg:text-2xl mt-2">
                {{ technician.technicianTypeDescription }}
            </p>
        </header>
    </section>

    <GoldLine />

    <article class="px-4 pb-10 pt-2 bg-primary-100 text-primary-900" itemscope itemtype="https://schema.org/Person">
        <button type="button" class="pb-6 cursor-pointer text-primary-900 hover:text-primary-700" @click="goBack()">
            ← Back
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-3">
            <aside class="lg:col-span-1 flex flex-col items-center mb-5" aria-label="Profile photo and social links">
                <figure>
                    <img class="h-90 w-80 object-cover" :src="technicianImageUrl"
                        :alt="`${technician.emalias}, ${technician.technicianTypeDescription}`" itemprop="image" />
                    <figcaption class="sr-only">
                        {{ technician.emalias }}, {{ technician.technicianTypeDescription }}
                    </figcaption>
                </figure>

                <nav v-if="technician.instagramUserName" class="pt-2" aria-label="Employee social media">
                    <a :href="instagramUrl" target="_blank" rel="noopener noreferrer"
                        :aria-label="`Visit ${technician.instagramUserName} on Instagram`"
                        class="flex items-center gap-2 hover:text-primary-700" itemprop="sameAs">
                        <img src="/images/social/instagram.webp" class="w-8 h-8"
                            :alt="technician.instagramUserName + ' Instagram'" aria-hidden="true" />
                        <span>{{ technician.instagramUserName }}</span>
                    </a>
                </nav>
            </aside>

            <section class="lg:col-span-2 flex flex-col space-y-4" aria-labelledby="profile-details-heading">
                <h2 id="profile-details-heading" class="sr-only">
                    Profile details for {{ technician.emalias }}
                </h2>

                <GoldLine />

                <header>
                    <p class="text-xl md:text-3xl uppercase" itemprop="name">
                        {{ technician.emalias }}
                    </p>
                    <p class="text-lg md:text-xl" itemprop="jobTitle">
                        {{ technician.technicianTypeDescription }}
                    </p>
                </header>

                <GoldLine />

                <section aria-labelledby="salon-location-heading">
                    <h2 id="salon-location-heading" class="text-xl md:text-3xl uppercase">
                        Salon Location
                    </h2>
                    <p class="text-lg md:text-xl" itemprop="workLocation">
                        {{ technician.locationDescription }}
                    </p>
                </section>

                <GoldLine />

                <section aria-labelledby="about-heading">
                    <h2 id="about-heading" class="text-xl md:text-3xl uppercase">
                        About
                    </h2>
                    <p class="text-lg md:text-xl" itemprop="description">
                        {{ technician.bioDescription }}
                    </p>
                </section>

                <template v-if="technicianReviews.length">
                    <GoldLine />
                    <section aria-labelledby="reviews-heading">
                        <h2 id="reviews-heading" class="text-xl md:text-3xl uppercase pb-2">
                            Guest Reviews
                        </h2>

                        <Transition name="review-fade" mode="out-in">
                            <figure v-if="currentReview" :key="currentReview.socialReviewId"
                                class="italic text-lg md:text-xl border border-primary-500 p-4">
                                <blockquote>{{ currentReview.reviewComment }}</blockquote>
                                <figcaption class="not-italic text-base mt-2">
                                    — {{ currentReview.reviewer }}, {{ currentReview.rating }}★
                                </figcaption>
                            </figure>
                        </Transition>

                        <div v-if="technicianReviews.length > 1" class="grid grid-cols-3 items-center pt-3">
                            <div aria-hidden="true"></div>
                            <div class="flex items-center justify-center gap-2">
                                <button type="button"
                                    class="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full bg-primary-500 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40 text-primary-900 pt-1 cursor-pointer"
                                    :aria-disabled="reviewsAtStart" :disabled="reviewsAtStart" aria-label="Show previous review"
                                    @click="showPreviousReview">
                                    &#9650;
                                </button>
                                <button type="button"
                                    class="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full bg-primary-500 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-primary-500 disabled:opacity-40 text-primary-900 pt-1 cursor-pointer"
                                    :aria-disabled="reviewsAtEnd" :disabled="reviewsAtEnd" aria-label="Show next review"
                                    @click="showNextReview">
                                    &#9660;
                                </button>
                            </div>
                            <p class="text-right text-sm text-primary-700" aria-live="polite">
                                {{ currentReviewIndex + 1 }} / {{ technicianReviews.length }}
                            </p>
                        </div>
                    </section>
                </template>
                <template v-else-if="technician.htmlReview">
                    <GoldLine />
                    <figure class="italic text-lg md:text-xl pt-2">
                        <blockquote v-html="technician.htmlReview" />
                    </figure>
                </template>

                <template v-if="technician.ownershipInActionText">
                    <GoldLine id="ownershipinaction" class="scroll-mt-[100px]" />
                    <section aria-labelledby="ownership-heading">
                        <h2 id="ownership-heading" class="text-xl md:text-3xl uppercase">
                            Ownership in Action
                        </h2>
                        <div class="text-lg md:text-xl pt-2" v-html="technician.ownershipInActionText" />
                    </section>
                </template>
            </section>
        </div>
    </article>

    <section v-if="location !== 'academy'" class="px-0 md:px-4 py-10 bg-primary-100 text-primary-900 text-center"
        aria-labelledby="services-offered-heading">
        <header>
            <h2 id="services-offered-heading" class="text-2xl md:text-4xl uppercase mb-1">
                Services Offered
            </h2>
            <p class="md:text-lg mb-3 px-3">
                To book services with {{ technician.emalias }}, please select from the options below.
            </p>
        </header>

        <book-services :showPricingPopup="false" />

        <p v-if="state.bookingErrorMessage !== ''" class="text-red-500 font-bold mb-2 md:text-lg" role="alert">
            {{ state.bookingErrorMessage }}
        </p>

        <Button label="Continue to Booking"
            class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10"
            @click="continueToBooking()" />
    </section>

    <section v-else aria-label="Academy booking information">
        <!-- to do: what to do for academy booking -->
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { appGlobal } from '~/composables/appGlobal';
import { bookGlobal } from '~/composables/bookGlobal';
import { useLocalStorage } from '~/composables/useLocalStorage';

import Button from '@/volt/Button';
const route = useRoute();
const router = useRouter();

const location = computed(() => {
    const value = route.params.location;
    return typeof value === 'string' ? value : '';
});

const alias = computed(() => {
    const value = route.params.alias;
    return typeof value === 'string' ? value : '';
});

const { getLastPageB4Profile } = useLocalStorage();

const state = reactive({
    bookingLink: '',
    lastPage: '',
    bookingErrorMessage: '',
    location: {}
});

bookGlobal.showLocationFilter = false;

const locationParam = computed(() => {
    if (location.value === 'polaris') return 'PL';
    if (location.value === 'lewis-center') return 'PL';
    if (location.value === 'dublin') return 'AV';
    if (location.value === 'hilliard') return 'MR';
    if (location.value === 'grove-city') return 'GR';
    if (location.value === 'new-albany') return 'NG';
    if (location.value === 'pickerington') return 'TS';
    if (location.value === 'powell') return 'PW';
    if (location.value === 'upper-arlington') return 'KD';
    if (location.value === 'westerville') return 'WS';
    if (location.value === 'academy') return 'AT';
    return '';
});

function normalizeText(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function normalizeHtmlContent(html) {
    if (typeof html !== 'string') {
        return '';
    }

    return html
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/>\s+</g, '><')
        .replace(/([^\S\r\n])+<\/p>/g, '</p>')
        .replace(/([^\S\r\n])+<\/li>/g, '</li>')
        .replace(/([^\S\r\n])+<\/h1>/g, '</h1>')
        .replace(/([^\S\r\n])+<\/h2>/g, '</h2>')
        .replace(/([^\S\r\n])+<\/h3>/g, '</h3>')
        .replace(/([^\S\r\n])+<\/h4>/g, '</h4>')
        .replace(/([^\S\r\n])+<\/h5>/g, '</h5>')
        .replace(/([^\S\r\n])+<\/h6>/g, '</h6>')
        .trim();
}

function stripQueryString(value) {
    if (typeof value !== 'string') {
        return '';
    }

    return value.replace(/\?.*$/, '').trim();
}

const profileUrl = computed(() =>
    appGlobal.apiBaseUrl + '/khsds/TechnicianProfile/' + location.value + '/' + alias.value
);

const { data: profileData, error } = await useFetch(profileUrl, {
    default: () => ({
        technicianProfileViewModel: {
            emalias: '',
            technicianTypeDescription: '',
            photoName: '',
            instagramUserName: null,
            locationDescription: '',
            bioDescription: '',
            htmlReview: null,
            ownershipInActionText: null,
            htmlTitle: '',
            htmlMetaDescription: '',
            technicianCode: '',
            locationCode: ''
        }
    })
});

const profile = computed(() => profileData.value ?? {
    technicianProfileViewModel: {
        emalias: '',
        technicianTypeDescription: '',
        photoName: '',
        instagramUserName: null,
        locationDescription: '',
        bioDescription: '',
        htmlReview: null,
        ownershipInActionText: null,
        htmlTitle: '',
        htmlMetaDescription: '',
        technicianCode: '',
        locationCode: ''
    }
});

const technician = computed(() => {
    const raw = profile.value?.technicianProfileViewModel || {};

    return {
        ...raw,
        emalias: normalizeText(raw.emalias),
        technicianTypeDescription: normalizeText(raw.technicianTypeDescription),
        photoName: stripQueryString(raw.photoName),
        instagramUserName: raw.instagramUserName ? normalizeText(raw.instagramUserName) : null,
        locationDescription: normalizeText(raw.locationDescription),
        bioDescription: normalizeText(raw.bioDescription),
        htmlReview: raw.htmlReview ? normalizeHtmlContent(raw.htmlReview) : null,
        ownershipInActionText: raw.ownershipInActionText ? normalizeHtmlContent(raw.ownershipInActionText) : null,
        htmlTitle: normalizeText(raw.htmlTitle),
        htmlMetaDescription: normalizeText(raw.htmlMetaDescription),
        technicianCode: normalizeText(raw.technicianCode),
        locationCode: normalizeText(raw.locationCode)
    };
});

const { throwError } = useResponse();

if (error.value || !technician.value.emalias) {
    throwError(404, `Technician profile "${alias.value}" not found`);
}

const locationUrl = computed(() =>
    appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWeb/' + locationParam.value
);

const { data: employeeList, error: locationError } = await useFetch(locationUrl, {
    default: () => ({
        locationAddressViewModel: {}
    })
});

if (employeeList.value) {
    state.location = employeeList.value.locationAddressViewModel || {};
}

const reviewsUrl = computed(() =>
    appGlobal.apiBaseUrl + '/khsds/SocialReviews/' + technician.value.technicianCode + '/4.5/3'
);

const { data: socialReviewsData } = technician.value.technicianCode
    ? await useFetch(reviewsUrl, {
        default: () => ({ socialReviewViewModels: [] })
    })
    : { data: ref({ socialReviewViewModels: [] }) };

// Drop any row missing real content (e.g. a star-only Google review with no
// written text, or no reviewer name) before it ever reaches the slider or the
// JSON-LD — otherwise it would render/publish as an empty review. What's left
// after filtering is capped at 3 — belt-and-suspenders in case the route
// param is ever bypassed — so the count always matches what's actually shown.
const technicianReviews = computed(() =>
    (socialReviewsData.value?.socialReviewViewModels || [])
        .filter((r) => r.reviewComment?.trim() && r.reviewer?.trim())
        .slice(0, 3)
);

const technicianAggregateRating = computed(() => {
    const reviews = technicianReviews.value;
    if (!reviews.length) return null;
    const sum = reviews.reduce((total, r) => total + (typeof r.rating === 'number' ? r.rating : 0), 0);
    return {
        ratingValue: (sum / reviews.length).toFixed(1),
        reviewCount: reviews.length
    };
});

// Shows exactly one review at a time; the buttons step to the next/previous
// one rather than scrolling, so only ever one is in view.
const currentReviewIndex = ref(0);

const currentReview = computed(() => technicianReviews.value[currentReviewIndex.value] || null);

const reviewsAtStart = computed(() => currentReviewIndex.value <= 0);
const reviewsAtEnd = computed(() => currentReviewIndex.value >= technicianReviews.value.length - 1);

const showPreviousReview = () => {
    if (currentReviewIndex.value > 0) currentReviewIndex.value--;
};

const showNextReview = () => {
    if (currentReviewIndex.value < technicianReviews.value.length - 1) currentReviewIndex.value++;
};

bookGlobal.clearBookingData();

const canonicalUrl = `https://kenneths.com${route.path}`
const pageId = `${canonicalUrl}#webpage`;
const personId = `${canonicalUrl}#person`;
const orgId = 'https://kenneths.com/#organization';
const salonId = `${canonicalUrl}#localbusiness`;

const technicianImageUrl = computed(() => {
    return technician.value.photoName
        ? 'https://kenneths.com/static/team-photo/' + technician.value.photoName
        : 'https://kenneths.com/static/team-photo/no-image-available-1.jpg';
});

const instagramUrl = computed(() => {
    return technician.value.instagramUserName
        ? 'https://instagram.com/' + technician.value.instagramUserName
        : '';
});

const locationImageUrl = computed(() => {
    // Real static asset naming diverges from the location slug for these cases
    // (public/images/locations/ has reynoldsburg-full.webp and polaris-full.webp,
    // not pickerington-full.webp or lewis-center-full.webp).
    const slug = location.value === 'pickerington'
        ? 'reynoldsburg'
        : location.value === 'lewis-center'
            ? 'polaris'
            : location.value;

    return `https://kenneths.com/images/locations/${slug}-full.webp`;
});

const salonName = computed(() => {
    return state.location?.locationHero?.header1
        ? `Kenneth's Hair Salon and Day Spa - ${state.location.locationHero.header1}`
        : (technician.value.locationDescription || "Kenneth's Hair Salon and Day Spa");
});

const salonDescription = computed(() => {
    return state.location?.locationHero?.header1
        ? `Discover the ultimate relaxation and beauty destination at Kenneth's, the leading ${state.location.locationHero.header1} hair salon and day spa. Book your appointment today!`
        : technician.value.htmlMetaDescription;
});

const jsonLDString = computed(() => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ProfilePage",
                "@id": pageId,
                "url": canonicalUrl,
                "name": technician.value.htmlTitle,
                "description": technician.value.htmlMetaDescription,
                "mainEntity": {
                    "@id": personId
                },
                "about": {
                    "@id": personId
                },
                "primaryImageOfPage": technicianImageUrl.value || undefined
            },
            {
                "@type": "Organization",
                "@id": orgId,
                "name": "Kenneth's Salons and Day Spas",
                "url": "https://kenneths.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://kenneths.com/logo.webp",
                    "width": "450",
                    "height": "566"
                }
            },
            {
                "@type": "BeautySalon",
                "@id": salonId,
                "name": salonName.value,
                "image": {
                    "@type": "ImageObject",
                    "url": locationImageUrl.value,
                    "width": "645",
                    "height": "430",
                    "caption": state.location?.locationHero?.header1
                        ? `Kenneth's ${state.location.locationHero.header1} Hair Salon Stylist Stations`
                        : salonName.value
                },
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://kenneths.com/logo.webp",
                    "width": "450",
                    "height": "566"
                },
                "url": `https://kenneths.com/locations/${location.value}`,
                "description": salonDescription.value,
                "telephone": "1-614-538-5800",
                "address": state.location.address
                    ? {
                        "@type": "PostalAddress",
                        "streetAddress": state.location.address,
                        "addressLocality": state.location.city,
                        "addressRegion": state.location.state,
                        "postalCode": state.location.zipCode,
                        "addressCountry": "US"
                    }
                    : undefined,
                "geo": state.location.latitude && state.location.longitude
                    ? {
                        "@type": "GeoCoordinates",
                        "latitude": state.location.latitude,
                        "longitude": state.location.longitude
                    }
                    : undefined,
                "openingHours": ["Mo-Fr 08:30-19:30", "Sa 08:30-16:00"],
                "priceRange": "$$$",
                "currenciesAccepted": "USD",
                "paymentAccepted": "Cash, Credit Card",
                "sameAs": state.location?.gbpSameAs
                    ? [`https://${state.location.gbpSameAs}`]
                    : undefined,
                "parentOrganization": {
                    "@id": orgId
                },
                "review": technicianReviews.value.length
                    ? technicianReviews.value.map((r) => ({
                        "@type": "Review",
                        "author": {
                            "@type": "Person",
                            "name": r.reviewer
                        },
                        "datePublished": r.createDttm,
                        "reviewBody": r.reviewComment,
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": String(r.rating),
                            "bestRating": "5",
                            "worstRating": "1"
                        }
                    }))
                    : undefined,
                "aggregateRating": technicianAggregateRating.value
                    ? {
                        "@type": "AggregateRating",
                        "ratingValue": technicianAggregateRating.value.ratingValue,
                        "reviewCount": technicianAggregateRating.value.reviewCount,
                        "bestRating": "5",
                        "worstRating": "1"
                    }
                    : undefined
            },
            {
                "@type": "Person",
                "@id": personId,
                "name": technician.value.emalias,
                "description": technician.value.bioDescription,
                "jobTitle": technician.value.technicianTypeDescription,
                "image": technicianImageUrl.value || undefined,
                "url": canonicalUrl,
                "worksFor": {
                    "@id": orgId
                },
                "memberOf": {
                    "@id": salonId
                },
                "sameAs": technician.value.instagramUserName ? [instagramUrl.value] : undefined
            }
        ]
    };

    jsonLd["@graph"] = jsonLd["@graph"].map((item) => {
        const cleaned = {};
        Object.keys(item).forEach((key) => {
            if (item[key] !== undefined && item[key] !== null && item[key] !== '') {
                cleaned[key] = item[key];
            }
        });
        return cleaned;
    });

    return JSON.stringify(jsonLd);
});

const pageTitle = computed(() =>
    technician.value.htmlTitle ||
    `${technician.value.emalias || "Team Member"} | Kenneth's Hair Salons And Day Spas`
)

const pageDescription = computed(() =>
    technician.value.htmlMetaDescription ||
    technician.value.bioDescription ||
    `Meet ${technician.value.emalias || "one of our team members"} at Kenneth's Hair Salons And Day Spas.`
)

const profileImage = computed(() =>
    technicianImageUrl.value || locationImageUrl.value || 'https://kenneths.com/logo.webp'
)

const profileImageType = computed(() => {
    const image = String(profileImage.value || '').toLowerCase()

    if (image.endsWith('.webp')) return 'image/webp'
    if (image.endsWith('.png')) return 'image/png'

    return 'image/jpeg'
})

const profileImageAlt = computed(() =>
    technician.value.emalias
        ? `${technician.value.emalias} at Kenneth's Hair Salons And Day Spas`
        : "Kenneth's Hair Salons And Day Spas team member"
)

useHead({
    title: () => pageTitle.value,
    link: [
        {
            rel: 'canonical',
            href: canonicalUrl
        }
    ],
    meta: [
        {
            name: 'description',
            content: () => pageDescription.value
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'profile'
        },
        {
            property: 'og:title',
            content: () => pageTitle.value
        },
        {
            property: 'og:description',
            content: () => pageDescription.value
        },
        {
            property: 'og:url',
            content: canonicalUrl
        },
        {
            property: 'og:image',
            content: () => profileImage.value
        },
        {
            property: 'og:image:secure_url',
            content: () => profileImage.value
        },
        {
            property: 'og:image:type',
            content: () => profileImageType.value
        },
        {
            property: 'og:image:alt',
            content: () => profileImageAlt.value
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
            property: 'profile:first_name',
            content: () => technician.value.emalias?.split(' ')?.[0] || technician.value.emalias || ''
        },
        {
            property: 'profile:last_name',
            content: () => {
                const parts = String(technician.value.emalias || '').trim().split(/\s+/)
                return parts.length > 1 ? parts.slice(1).join(' ') : ''
            }
        },

        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: () => pageTitle.value
        },
        {
            name: 'twitter:description',
            content: () => pageDescription.value
        },
        {
            name: 'twitter:image',
            content: () => profileImage.value
        },
        {
            name: 'twitter:image:alt',
            content: () => profileImageAlt.value
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => jsonLDString.value
        }
    ]
})

const servicesUrl = computed(() =>
    appGlobal.apiBaseUrl +
    '/khsds/WebBookServices/PROFILE/E/A/A/' +
    technician.value.technicianCode +
    '/' +
    technician.value.locationCode
);

const { data: services, error: error2 } = await useFetch(servicesUrl, {
    default: () => []
});

state.bookingLink =
    '/book/new/promo?d=DFV&t=' +
    technician.value.technicianCode +
    '&l=' +
    technician.value.locationCode +
    '&bps=y';

bookGlobal.serviceGroups = services.value || [];

bookGlobal.generateBarAddonGroups();
bookGlobal.setServiceGroupVisible();
bookGlobal.setShowServiceGroupWhenListExists();

onMounted(async () => {
    state.lastPage = await getLastPageB4Profile();
});

function goBack() {
    if (state.lastPage && state.lastPage !== '') {
        router.push(state.lastPage);
        return;
    }
    window.history.go(-1);
}

function continueToBooking() {
    state.bookingErrorMessage = '';

    if (bookGlobal.getAllServices().length === 0) {
        state.bookingErrorMessage = 'Please select at least one service to continue to booking.';
        return;
    }

    const isMale = bookGlobal.findMaleServices(bookGlobal.getAllServices());
    const sexParam = isMale ? '&x=M' : '&x=F';

    bookGlobal.clearWebMarketing();
    bookGlobal.webMarketing.fromRoute = route.fullPath;

    router.push(state.bookingLink + sexParam);
}
</script>

<style scoped>
.review-fade-enter-active,
.review-fade-leave-active {
    transition: opacity 0.2s ease;
}

.review-fade-enter-from,
.review-fade-leave-to {
    opacity: 0;
}
</style>