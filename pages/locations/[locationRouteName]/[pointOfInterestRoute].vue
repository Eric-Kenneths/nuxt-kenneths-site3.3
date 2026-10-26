<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <div class="relative flex items-center justify-center h-[10vmin] lg:h-[10vmin] w-full overflow-hidden mb-5"
        vocab="https://schema.org/" typeof="WebPage">
    </div>

    <GoldLine />

    <div class="bg-primary-100 text-primary-900 sa-articles-page">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div class="flex flex-wrap md:flex-nowrap mx-2 md:ml-7 lg:mx-20">
                <!-- First Column -->
                <div class="w-full md:w-auto flex-shrink-0 pl-10 pr-8 max-w-[1000px]">
                    <div class="mt-2">
                        <header class="mb-10">
                            <h1>
                                {{ state.geoStackPage.title }}
                            </h1>
                        </header>

                        <!-- Main Content -->
                        <article id="main-container" ref="articleRef" v-html="state.updatedHtml"
                            class="[&_a]:underline [&_a]:text-primary-500 [&_a:hover]:text-primary-900 [&_a]:transition-colors [&_a]:duration-200">
                        </article>
                    </div>

                    <!-- GEO Stack Articles (Mobile Positioning) -->
                    <section
                        class="block md:hidden mt-20 p-4 mb-5 bg-primary-100 border p-primary-900-black rounded-none">
                        <div class="font-bold p-1">
                            <a class="location-link" :href="state.locationRoute">
                                {{ state.location.extendedDescription }}
                            </a>
                        </div>
                        <div class="p-1">{{ state.location.address }}</div>
                        <div class="p-1">{{ state.location.cityState }}</div>
                        <div class="p-1"><a href="tel:6145385800">614.538.5800</a></div>
                        <div class="p-1"><a href="/book">Book An Appointment</a></div>
                        <div class="mt-4">
                            <LocationServices :locationServices="state.locationService"
                                :locationCode="state.location?.locationCode" />
                        </div>

                        <div class="p-1 mt-3">
                            <a :href="state.gmbUrl">See us on Google</a>
                        </div>
                    </section>
                </div>

                <!-- Second Column (Desktop Positioning) -->
                <div class="hidden md:block w-full mt-20 md:w-auto flex-shrink-0 px-2" style="max-width: 300px;">
                    <section class="hidden md:block mt-2 p-4 bg-primary-100 border border-primary-900 rounded-none">
                        <div class="font-bold p-1">
                            <a class="location-link" :href="state.locationRoute">
                                {{ state.location.extendedDescription }}
                            </a>
                        </div>
                        <div class="p-1">{{ state.location.address }}</div>
                        <div class="p-1">{{ state.location.cityState }}</div>
                        <div class="p-1"><a href="tel:6145385800">614.538.5800</a></div>
                        <div class="p-1"><a href="/book">Book An Appointment</a></div>
                        <div class="mt-4">
                            <LocationServices :locationServices="state.locationService"
                                :locationCode="state.location?.locationCode" />
                        </div>

                        <div class="p-1 mt-3">
                            <a :href="state.gmbUrl">See us on Google</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal';
import { dataGlobal } from '~/composables/dataGlobal';

dataGlobal.sideBarVisible = false;

const articleRef = ref(null);

const route = useRoute();

const locationRouteName = route.params.locationRouteName;
const pointOfInterestRoute = route.params.pointOfInterestRoute;
const { loca } = useRoute().params;

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

const state = reactive({
    geoStackPage: {},
    location: {},
    locationService: {},
    gmbUrl: '',
    locationRoute: '',
    updatedHtml: ''
});

const url = appGlobal.apiBaseUrl + '/khsds/GeoStackPage/' + pointOfInterestRoute;
const { data: geoStack, error } = await useFetch(url, {
    default: () => null
});

const { throwError } = useResponse();

if (error.value || !geoStack.value?.geoStackPageViewModel?.title) {
    throwError(404, `Page not found: ${locationRouteName}/${pointOfInterestRoute}`);
}

if (geoStack.value) {
    state.geoStackPage = geoStack.value.geoStackPageViewModel ?? {};
    state.location = geoStack.value.locationViewModel ?? {};
    state.locationService = geoStack.value.locationServiceViewModel ?? {};
    state.gmbUrl = geoStack.value.gmbUrl ?? '';
    state.locationRoute = geoStack.value.locationRoute ?? '';
}

// The API looks a page up by its place route alone, so without this check the same article would
// answer at /locations/<any location>/<place>. Each place belongs to one location: send every
// other address to the right one with a 301, and publish that address as the canonical.
const config = useRuntimeConfig();
const geoStackLocation = state.geoStackPage.locationRoute || locationRouteName;
const geoStackPath = `/locations/${geoStackLocation}/${pointOfInterestRoute}`;
const geoStackCanonical = `${config.public.siteUrl}${geoStackPath}`;

if (locationRouteName !== geoStackLocation) {
    await navigateTo(geoStackPath, { redirectCode: 301 });
}

/**
 * Builds an ADA-friendly title/label for an iframe.
 * Priority:
 * 1. Existing iframe title
 * 2. Existing aria-label
 * 3. Google Maps-specific label based on page title
 * 4. Generic embedded content label
 */
function buildIframeAccessibleLabel(iframe) {
    const existingTitle = iframe.getAttribute('title')?.trim();

    if (existingTitle) {
        return existingTitle;
    }

    const existingAriaLabel = iframe.getAttribute('aria-label')?.trim();
    if (existingAriaLabel) {
        return existingAriaLabel;
    }

    const src = iframe.getAttribute('src') || '';
    const pageTitle = state.geoStackPage?.title?.trim();

    if (src.includes('google.com/maps/embed')) {
        return pageTitle
            ? `Google map for ${pageTitle}`
            : 'Google map showing location details';
    }

    return pageTitle
        ? `Embedded content for ${pageTitle}`
        : 'Embedded content';
}

/**
 * Formats database HTML before rendering with v-html.
 * - Replaces legacy layout classes on map/embed wrappers
 */
function formatArticleHtml(rawHtml) {
    if (!rawHtml) {
        return '';
    }

    return rawHtml.replace(
        /flex-order-1\s+col-12\s+lg:col-6\s+xl:col-offset-1/g,
        'pl-2 lg:pl-8 relative max-w-[600px] border-0 rounded-2xl overflow-hidden'
    );
}

/**
 * Enhances rendered article DOM after hydration without changing SSR/client HTML.
 * - Adds consistent spacing between top-level blocks
 * - Makes iframes responsive
 * - Adds ADA-compliant iframe title and aria-label attributes
 * - Adds typographic spacing classes to paragraphs and lists
 */
function enhanceArticleDom() {
    const container = articleRef.value;

    if (!container) {
        return;
    }

    const children = Array.from(container.children);

    children.forEach((el, index) => {
        if (index !== 0) {
            el.classList.add('mt-8');
        }

        if (el.tagName === 'P') {
            el.classList.add('text-xl', 'leading-8');
        }

        if (el.tagName === 'UL' || el.tagName === 'OL') {
            el.classList.add('my-6', 'pl-6');
        }

        if (el.tagName === 'LI') {
            el.classList.add('text-xl', 'leading-8', 'mb-2');
        }

        if (el.tagName === 'H2') {
            el.classList.add('text-3xl', 'mt-10', 'mb-4');
        }

        if (el.tagName === 'H3') {
            el.classList.add('text-2xl', 'mt-8', 'mb-3');
        }

        const paragraphs = el.querySelectorAll('p');
        paragraphs.forEach((p) => {
            p.classList.add('text-xl', 'leading-8');
        });

        const listItems = el.querySelectorAll('li');
        listItems.forEach((li) => {
            li.classList.add('text-xl', 'leading-8', 'mb-2');
        });

        const lists = el.querySelectorAll('ul, ol');
        lists.forEach((list) => {
            list.classList.add('my-6', 'pl-6');
        });

        const iframes = el.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
            const accessibleLabel = buildIframeAccessibleLabel(iframe);

            iframe.classList.add('block', 'w-full', 'max-w-full', 'aspect-video', 'rounded-2xl');
            iframe.removeAttribute('width');
            iframe.removeAttribute('height');

            iframe.setAttribute('title', accessibleLabel);
            iframe.setAttribute('aria-label', accessibleLabel);

            if (!iframe.getAttribute('loading')) {
                iframe.setAttribute('loading', 'lazy');
            }

            if (!iframe.getAttribute('referrerpolicy')) {
                iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            }
        });
    });
}

state.updatedHtml = formatArticleHtml(state.geoStackPage.htmlContent);

let jsonLD = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": state.geoStackPage.placeName,
    "description": state.geoStackPage.metaDescription,
    "url": geoStackCanonical,
    "containsPlace": state.geoStackPage.containsPlaceSchema
        ? JSON.parse(state.geoStackPage.containsPlaceSchema)
        : undefined
};

const jsonLDString = JSON.stringify(jsonLD);

// Page title: "<place> | Kenneth's <Location> Hair Salon". The article headline stays as the H1;
// the <title> keeps just the place (the headline's tail is usually "...and its connection to
// Kenneth's"), then names the salon so every page carries the brand and the area.
function geoStackTopic(headline) {
    let topic = String(headline || '')
        .replace(/\s*\bNear Kenneth['’]s Hair Salon\b/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();

    // Cut the headline at the first of these, but never down to a stub (e.g. "OCLC")
    const cutPoints = [
        /:\s/,
        /,?\s+and\s+(its|the)\s+connection\s+to\s+Kenneth['’]s/i,
        /,?\s+and\s+Kenneth['’]s/i,
        /\s+(near|and)\s+Kenneth['’]s/i
    ];

    for (const cutPoint of cutPoints) {
        const match = topic.match(cutPoint);
        if (match && match.index >= 8) {
            topic = topic.slice(0, match.index);
        }
    }

    return topic.replace(/[\s:,–—-]+$/, '').trim();
}

function geoStackArea(locationSlug) {
    return String(locationSlug || '')
        .split('-')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function geoStackSalon(locationSlug) {
    return locationSlug === 'academy' ? "Kenneth's Academy Salon" : `Kenneth's ${geoStackArea(locationSlug)} Hair Salon`;
}

function buildGeoStackTitle(headline, locationSlug) {
    const topic = geoStackTopic(headline);
    const area = geoStackArea(locationSlug);
    const salon = geoStackSalon(locationSlug);

    // Longest form that fits in a search result title; never truncate the place itself
    const candidates = [`${topic} | ${salon}`, `${topic} | Kenneth's ${area}`.trim()];
    return candidates.find(candidate => candidate.length <= 65) || `${topic} | Kenneth's`;
}

// Meta description: the stored place blurb, shortened to leave room for "Near Kenneth's <Location>
// Hair Salon." so the snippet fits in 155 characters and ties the place to the salon. The stored
// blurb itself is untouched (it also feeds the Place schema description and the article text).
function buildGeoStackDescription(blurb, locationSlug) {
    const maxLength = 155;
    const minSentenceLength = 50;

    const text = String(blurb || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const tail = `Near ${geoStackSalon(locationSlug)}.`;

    if (!text) return tail;

    const room = maxLength - tail.length - 1;
    let body = text;

    if (body.length > room) {
        // End on a full sentence when one fits, otherwise cut at a word boundary with an ellipsis
        let sentenceEnd = -1;
        for (const match of body.slice(0, room).matchAll(/[.!?](?=\s|$)/g)) {
            sentenceEnd = match.index + 1;
        }

        if (sentenceEnd >= minSentenceLength) {
            body = body.slice(0, sentenceEnd);
        } else {
            const words = body.slice(0, room - 1);
            const lastSpace = words.lastIndexOf(' ');
            body = (lastSpace > 30 ? words.slice(0, lastSpace) : words).replace(/[\s,;:–—-]+$/, '') + '…';
        }
    } else if (!/[.!?…]$/.test(body)) {
        body += '.';
    }

    return `${body} ${tail}`;
}

const geoStackTitle = buildGeoStackTitle(state.geoStackPage.title, state.geoStackPage.locationRoute || locationRouteName);
const geoStackDescription = buildGeoStackDescription(state.geoStackPage.metaDescription, geoStackLocation);

useHead({
    title: geoStackTitle,
    link: [
        {
            rel: 'canonical',
            href: geoStackCanonical
        }
    ],
    meta: [
        {
            name: 'description',
            content: geoStackDescription
        },
        {
            property: 'og:title',
            content: geoStackTitle
        },
        {
            property: 'og:description',
            content: geoStackDescription
        },
        {
            name: 'twitter:title',
            content: geoStackTitle
        },
        {
            name: 'twitter:description',
            content: geoStackDescription
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: jsonLDString
        }
    ]
});

onMounted(() => {
    window.scrollTo(0, 0);
    enhanceArticleDom();
});
</script>