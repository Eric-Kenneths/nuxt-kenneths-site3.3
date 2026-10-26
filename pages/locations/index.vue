<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <section>
        <div
            class="relative hidden md:flex items-center justify-center h-[90vmin] w-full bg-cover bg-no-repeat overflow-hidden bg-[url('/images/locations/kenneths-salon-spa-locations.webp')]">
            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center uppercase">
                    Find a Salon + Spa<br />Near You
                </h1>
            </div>
        </div>

        <div
            class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/locations/kenneths-salon-spa-locations-mobile.webp')] bg-no-repeat bg-cover">

            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
                    class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <p class="font-thin text-5xl text-center k-header-text-shadow">
                    Services<br />for Every<br />Look, Every Mood,<br />Every You
                </p>
            </div>
        </div>
    </section>

    <!--location map and list section-->
    <section class="bg-primary-100 text-primary-900 py-12 px-4 lg:px-12 mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <!-- Right Column: Responsive Map with Hotspots -->
            <div class="order-1 lg:order-2">
                <div class="relative w-full">

                    <!-- Map Image -->
                    <img src="/images/locations/kenneths-locations-map.webp" loading="eager" fetchpriority="high"
                        alt="Map showing Kenneth's salon locations" class="w-full h-auto shadow-lg" />

                    <!-- Hotspot Pins -->
                    <a v-for="location in locations" :key="location.slug" :href="'/locations/' + location.slug"
                        class="absolute transform -translate-x-1/2 -translate-y-1/2"
                        :style="{ top: location.pinY + '%', left: location.pinX + '%' }">

                        <!-- Location Name -->
                        <span
                            class="block text-xs md:text-base font-semibold text-primary-800 k-light-text-shadow -ml-2">
                            <span aria-hidden="true">{{ location.name }}</span>
                            <span class="sr-only">Kenneth's {{ location.longName }} location page</span>
                        </span>

                        <span
                            class="block w-4 h-4 md:w-5 md:h-5 bg-primary-100 border-4 md:border-5 border-primary-900 rounded-full shadow-md hover:scale-125 transition">
                        </span>

                        <!-- Tooltip -->
                        <div
                            class="hidden md:inline absolute left-1/2 -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-primary-900 text-primary-100 text-xs rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10 duraction-300">
                            <strong>{{ location.longName }}</strong><br>
                            {{ location.street }}<br>
                            {{ location.cityStateZip }}
                        </div>

                    </a>

                </div>
            </div>

            <!-- Left Column: Locations List -->
            <div class="order-2 lg:order-1 space-y-8">
                <div v-for="location in locations" :key="location.slug" class="overflow-hidden pb-4">
                    <!-- Location Image -->
                    <img :src="location.image" :alt="`${location.name} location`"
                        class="w-full h-70 md:h-100 object-cover" />

                    <h2 class="text-4xl uppercase mt-3">{{ location.header }}</h2>

                    <!-- Location Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <p class="k-para-text mt-2">{{ location.center }}</p>

                            <p class="k-para-text">
                                <a class="address underline" :aria-label="`Address for Kenneth's ${location.longName}`"
                                    :href="location.directionsLink" target="_blank" rel="noopener noreferrer">
                                    {{ location.street }}
                                </a>
                            </p>

                            <p class="k-para-text">{{ location.cityStateZip }}</p>

                            <p class="k-para-text mt-2">
                                <a href="tel:+16145385800">(614) 538-5800</a>
                            </p>

                            <div v-if="location.rating !== ''" class="flex mt-2">
                                <span class="pr-2">{{ location.rating }}</span>

                                <ClientOnly>
                                    <star-rating :rating="location.rating" />
                                    <template #fallback>
                                        <span aria-hidden="true">★</span>
                                    </template>
                                </ClientOnly>

                                <span>{{ location.reviews }}</span>

                                <a class="pl-1" :href="location.socialUrl" target="_blank" rel="noopener noreferrer">
                                    <span aria-hidden="true">Google Reviews</span>
                                    <span class="sr-only"> for Kenneth's {{ location.longName }}</span>
                                </a>
                            </div>
                        </div>

                        <div class="mt-5 md:mt-3">
                            <div>
                                <ClientOnly>
                                    <pop-up-menu>
                                        <template #trigger>
                                            <span
                                                class="inline-block k-section-link font-bold underline uppercase hover:text-primary-900">
                                                Book Now<span class="ml-2 relative md:-top-[2px]">&rarr;</span>
                                            </span>
                                        </template>

                                        <template #links>
                                            <div class="sans-serif p-3">
                                                <a class="k-section-link link" href="https://kenneths.com/app/">
                                                    Existing Customer
                                                </a>
                                            </div>

                                            <div class="sans-serif p-3">
                                                <a class="k-section-link link"
                                                    :href="'/book/new/promo?fl=' + location.locationCode">
                                                    New Customer
                                                </a>
                                            </div>
                                        </template>
                                    </pop-up-menu>

                                    <template #fallback>
                                        <a :href="'/book/new/promo?fl=' + location.locationCode"
                                            class="k-section-link font-bold underline uppercase hover:text-primary-900">
                                            Book Now
                                        </a>
                                    </template>
                                </ClientOnly>
                            </div>

                            <p class="pt-4 pb-4">
                                <a :href="location.directionsLink"
                                    class="k-section-link font-bold underline uppercase hover:text-primary-900"
                                    target="_blank" rel="noopener noreferrer">
                                    <span aria-hidden="true">Get Directions</span>
                                    <span class="sr-only"> to Kenneth's {{ location.longName }}</span>
                                </a>
                            </p>

                            <p>
                                <a :href="`/locations/${location.slug}`"
                                    class="k-section-link font-bold underline uppercase hover:text-primary-900">
                                    <span aria-hidden="true">Learn More</span>
                                    <span class="sr-only"> about Kenneth's {{ location.longName }}</span>
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>

    <BookSection />
</template>

<script setup>

import { appGlobal } from '~/composables/appGlobal';

const url = appGlobal.apiBaseUrl + '/Khsds/SocialRatings/GOOG';

const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Salon & Day Spa Locations | Kenneth's Salons and Day Spas",
    "url": "https://kenneths.com/locations",
    "mainEntity": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "@id": "https://kenneths.com/#organization",
        "url": "https://kenneths.com",
        "areaServed": "Columbus, Ohio and Central Ohio",
        "department": [
            {
                "@type": "HairSalon",
                "name": "Hilliard Salon + Spa",
                "alternateName": "Kenneth's Hilliard",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "4525 Wathen Dr Ste 103",
                    "addressLocality": "Hilliard",
                    "addressRegion": "OH",
                    "postalCode": "43026",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.027351,
                    "longitude": -83.115752
                },
                "url": "https://kenneths.com/locations/hilliard",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "New Albany Salon + Spa",
                "alternateName": "Kenneth's New Albany",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "4942 Morse Rd",
                    "addressLocality": "Columbus",
                    "addressRegion": "OH",
                    "postalCode": "43230",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.056018,
                    "longitude": -82.860678
                },
                "url": "https://kenneths.com/locations/new-albany",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Pickerington Salon + Spa Studio",
                "alternateName": "Kenneth's Pickerington/Reynoldsburg",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "2865 Taylor Road SW",
                    "addressLocality": "Reynoldsburg",
                    "addressRegion": "OH",
                    "postalCode": "43068",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 39.939055,
                    "longitude": -82.787192
                },
                "url": "https://kenneths.com/locations/pickerington",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Polaris Salon + Spa Studio",
                "alternateName": "Kenneth's Polaris (The Spa Bar)",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1305 Cameron Ave",
                    "addressLocality": "Lewis Center",
                    "addressRegion": "OH",
                    "postalCode": "43035",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.152654,
                    "longitude": -82.999189
                },
                "url": "https://kenneths.com/locations/polaris",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Powell Salon",
                "alternateName": "Kenneth's Powell",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "9868 Brewster Ln",
                    "addressLocality": "Powell",
                    "addressRegion": "OH",
                    "postalCode": "43065",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.155516,
                    "longitude": -83.094695
                },
                "url": "https://kenneths.com/locations/powell",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Westerville Salon + Spa Studio",
                "alternateName": "Kenneth's Westerville",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "726 N State St",
                    "addressLocality": "Westerville",
                    "addressRegion": "OH",
                    "postalCode": "43082",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.144703,
                    "longitude": -82.922706
                },
                "url": "https://kenneths.com/locations/westerville",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Dublin Salon + Spa Studio",
                "alternateName": "Kenneth's Dublin",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "7056 Hospital Drive",
                    "addressLocality": "Dublin",
                    "addressRegion": "OH",
                    "postalCode": "43016",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.103664,
                    "longitude": -83.164133
                },
                "url": "https://kenneths.com/locations/dublin",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Grove City Salon + Spa Studio",
                "alternateName": "Kenneth's Grove City",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1582 Stringtown Rd",
                    "addressLocality": "Grove City",
                    "addressRegion": "OH",
                    "postalCode": "43123",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 39.880204,
                    "longitude": -83.037372
                },
                "url": "https://kenneths.com/locations/grove-city",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Upper Arlington Salon + Spa Studio",
                "alternateName": "Kenneth's Upper Arlington",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "3134 Kingsdale Center",
                    "addressLocality": "Upper Arlington",
                    "addressRegion": "OH",
                    "postalCode": "43221",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.020984,
                    "longitude": -83.058862
                },
                "url": "https://kenneths.com/locations/upper-arlington",
                "telephone": "+16145385800",
                "openingHours": ["Mo-Fr 08:00-19:30", "Sa 08:00-16:00"]
            },
            {
                "@type": "HairSalon",
                "name": "Academy Salon",
                "alternateName": "Kenneth's Academy",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "5151 Reed Road, Suite 110 B",
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
                "url": "https://kenneths.com/locations/academy",
                "telephone": "+16145385800",
                "openingHours": ["Mo 08:00-19:30", "Tu-Fr 09:30-19:30", "Sa 08:30-16:00"]
            }
        ]
    },
    "description": "View all Kenneth's Hair Salons and Day Spas locations in the Columbus, Ohio area, including Hilliard, New Albany, Pickerington/Reynoldsburg, Polaris, Powell, Westerville, Dublin, Grove City, Upper Arlington, and The Academy training salon, and book your beauty experience at the location closest to you.",
    "publisher": {
        "@type": "Organization",
        "name": "Kenneth's Hair Salons and Day Spas",
        "url": "https://kenneths.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Salon and Day Spa Locations",
        "description": "Kenneth's offers 10 salon and day spa locations throughout Central Ohio, providing hair, nail, and spa services in communities including Hilliard, New Albany, Pickerington/Reynoldsburg, Polaris, Powell, Westerville, Dublin, Grove City, Upper Arlington, and Columbus."
    },
    "inLanguage": "en-US"
});

useHead({
    title: "Salon & Day Spa Locations Columbus OH | Kenneth's",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/locations'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Explore Kenneth's 10 salon and day spa locations in the Columbus, Ohio area, including Hilliard, New Albany, Pickerington/Reynoldsburg, Polaris, Powell, Westerville, Dublin, Grove City, Upper Arlington, and The Academy training salon, and book your next beauty experience."
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Salon & Day Spa Locations Columbus OH | Kenneth's"
        },
        {
            property: 'og:description',
            content:
                "Explore Kenneth's 10 salon and day spa locations in the Columbus, Ohio area, including Hilliard, New Albany, Pickerington/Reynoldsburg, Polaris, Powell, Westerville, Dublin, Grove City, Upper Arlington, and The Academy training salon, and book your next beauty experience."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/locations'
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
            content: "Salon & Day Spa Locations Columbus OH | Kenneth's"
        },
        {
            name: 'twitter:description',
            content:
                "Explore Kenneth's 10 salon and day spa locations in the Columbus, Ohio area, including Hilliard, New Albany, Pickerington/Reynoldsburg, Polaris, Powell, Westerville, Dublin, Grove City, Upper Arlington, and The Academy training salon, and book your next beauty experience."
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

const { data: socialRatings, error } = await useFetch(url, {
    default: () => []
});

const locations = [
    {
        locationCode: 'AV',
        name: 'Dublin',
        header: 'Dublin',
        longName: 'Dublin Salon + Spa Studio',
        center: 'Avery Square Center',
        street: '7056 Hospital Drive',
        cityStateZip: 'Dublin, OH 43016',
        directionsLink: 'https://maps.google.com/?q=7056+Hospital+Dr,+Dublin,+OH+43016',
        image: '/images/locations/dublin-full.webp',
        slug: 'dublin',
        pinX: 13,
        pinY: 27,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'GR',
        name: 'Grove City',
        header: 'Grove City',
        longName: 'Grove City + Spa Studio',
        center: 'Parkway Center North',
        street: '1582 Stringtown Rd',
        cityStateZip: 'Grove City, OH 43123',
        directionsLink: 'https://maps.google.com/?q=1582+Stringtown+Rd,+Grove+City,+OH+43123',
        image: '/images/locations/grove-city-full.webp',
        slug: 'grove-city',
        pinX: 40.5,
        pinY: 79,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'MR',
        name: 'Hilliard',
        header: 'Hilliard',
        longName: 'Hilliard Salon + Spa',
        center: 'TruePointe Center',
        street: '4525 Wathen Dr',
        cityStateZip: 'Hilliard, OH 43026',
        directionsLink: 'https://maps.google.com/?q=4525+Wathen+Dr,+Hilliard,+OH+43026',
        image: '/images/locations/hilliard-full.webp',
        slug: 'hilliard',
        pinX: 24,
        pinY: 44.5,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'NG',
        name: 'New Albany',
        header: 'New Albany',
        longName: 'New Albany Salon + Spa',
        center: 'New Albany Square',
        street: '4942 Morse Rd',
        cityStateZip: 'Columbus, OH 43230',
        directionsLink: 'https://maps.google.com/?q=4942+Morse+Rd,+Gahanna,+OH+43230',
        image: '/images/locations/new-albany-full.webp',
        slug: 'new-albany',
        pinX: 77,
        pinY: 37.5,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'TS',
        name: 'Pickerington',
        header: 'Pickerington/Reynoldsburg',
        longName: 'Pickerington Salon + Spa Studio',
        center: 'Taylor Square Center',
        street: '2865 Taylor Road SW',
        cityStateZip: 'Reynoldsburg, OH 43068',
        directionsLink: 'https://maps.google.com/?q=2865+Taylor+Rd+SW,+Reynoldsburg,+OH+43068',
        image: '/images/locations/reynoldsburg-full.webp',
        slug: 'pickerington',
        pinX: 92.5,
        pinY: 65,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'PL',
        name: 'Polaris',
        header: 'Polaris (The Spa Bar)',
        longName: 'Polaris Salon + Spa Studio',
        center: 'Oak Creek Center',
        street: '1305 Cameron Ave',
        cityStateZip: 'Lewis Center, OH 43035',
        directionsLink: 'https://maps.google.com/?q=1305+Cameron+Ave,+Lewis+Center,+OH+43035',
        image: '/images/locations/polaris-full.webp',
        slug: 'polaris',
        pinX: 47,
        pinY: 15,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'PW',
        name: 'Powell',
        header: 'Powell',
        longName: 'Powell Salon',
        center: 'Powell Crossing Center',
        street: '9868 Brewster Ln',
        cityStateZip: 'Powell, OH 43065',
        directionsLink: 'https://maps.google.com/?q=9868+Brewster+Ln,+Powell,+OH+43065',
        image: '/images/locations/powell-full.webp',
        slug: 'powell',
        pinX: 27,
        pinY: 15,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'KD',
        name: 'Upper Arlington',
        header: 'Upper Arlington',
        longName: 'Upper Arlington + Spa Studio',
        center: 'Kingsdale Shopping Center',
        street: '3134 Kingsdale Center',
        cityStateZip: 'Upper Arlington, OH 43221',
        directionsLink: 'https://maps.google.com/?q=3134+Kingsdale,+Upper+Arlington,+OH+43221',
        image: '/images/locations/upper-arlington-full.webp',
        slug: 'upper-arlington',
        pinX: 39,
        pinY: 46,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'WS',
        name: 'Westerville',
        header: 'Westerville',
        longName: 'Westerville Salon + Spa Studio',
        center: 'Northridge Center',
        street: '726 N State St',
        cityStateZip: 'Westerville, OH 43082',
        directionsLink: 'https://maps.google.com/?q=726+North+State+St,+Westerville,+OH+43082',
        image: '/images/locations/westerville-full.webp',
        slug: 'westerville',
        pinX: 64,
        pinY: 17,
        rating: '',
        reviews: '',
        socialUrl: ''
    },
    {
        locationCode: 'AT',
        name: 'Academy',
        header: 'The Academy',
        longName: 'Academy Salon',
        center: 'Academy Salon',
        street: '5151 Reed Road, Suite 110 B',
        cityStateZip: 'Columbus, OH 43220',
        directionsLink: 'https://maps.google.com/?q=5151+Reed+Rd+Suite+110B,+Columbus,+OH+43220',
        image: '/images/locations/academy-full.webp',
        slug: 'academy',
        pinX: 33,
        pinY: 37,
        rating: '',
        reviews: '',
        socialUrl: ''
    }
];

socialRatings.value.forEach(sr => {
    if (sr.locationCode !== 'AT') {
        for (const loca of locations) {
            if (loca.locationCode === sr.locationCode) {
                loca.rating = sr.rating;
                loca.reviews = sr.reviews;
                loca.socialUrl = sr.socialUrl;
            }
        }
    }
});

</script>


<style scoped></style>