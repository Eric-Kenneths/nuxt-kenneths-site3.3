<template>
    <GoldLine />

    <div class="text-right pt-2">
        <a href="https://kenneths.com/app/"
            class="underline hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 mr-4 text-blue-600">
            Current Client?
        </a>
    </div>
    <div class="text-center text-lg text-primary-900 pt-4 font-bold">
        Book Appointment
    </div>
    <h1 class="bg-primary-100 pb-4 text-center text-3xl text-primary-900">
        {{ pageHeading }}
    </h1>

    <template v-if="bookGlobal.isMarketing && step === 'services'">
        <!-- Marketing Image -->
        <div v-if="bookGlobal.webMarketing.webMarketingHd.imagelink !== ''"
            class="flex flex-col items-center text-center">
            <div class="w-full lg:w-2/3 lg:px-8 flex justify-center items-center standard-size-container">
                <img :src="bookGlobal.webMarketing.webMarketingHd.imagelink"
                    :alt="bookGlobal.webMarketing.webMarketingHd.marketingSubject" class="w-full" />
            </div>
        </div>

        <!-- Marketing Subject -->
        <div class="flex items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-2xl lg:text-3xl">
                    <span v-html="bookGlobal.webMarketing.webMarketingHd.marketingSubject"></span>
                </div>
            </div>
        </div>

        <!-- Customer Name -->
        <div v-show="accountGlobal.hasCustomerViewModel" class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-2xl lg:text-3xl">
                    For {{ accountGlobal.customer.fullname }}
                </div>
            </div>
        </div>

        <!-- Marketing Text -->
        <div v-if="bookGlobal.webMarketing.webMarketingHd.marketingText1 !== ''"
            class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block sans-serif text-lg">
                    {{ bookGlobal.webMarketing.webMarketingHd.marketingText1 }}
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div v-show="accountGlobal.hasCustomerViewModel" class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-2xl lg:text-3xl">
                    For {{ accountGlobal.customer.fullname }}
                </div>
            </div>
        </div>
    </template>

    <template v-if="bookGlobal.webMarketing.technicianName !== ''">
        <div class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-lg lg:text-xl">
                    Booking with {{ bookGlobal.webMarketing.technicianName }}
                    <span v-if="bookGlobal.webMarketing.locationCode !== ''"> at our {{
                        bookGlobal.webMarketing.location.extendedDescription }} location.</span>
                </div>
            </div>
        </div>
    </template>
    <template v-else-if="bookGlobal.webMarketing.locationCode !== ''">
        <div class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-lg lg:text-xl">
                    Booking at our {{ bookGlobal.webMarketing.location.extendedDescription }} location.
                </div>
            </div>
        </div>
    </template>

    <template
        v-if="bookGlobal.webMarketing.byPassServicePage === 'Y' && step === 'times' && bookGlobal.webMarketing.serviceDescription !== ''">
        <div class="flex flex-col items-center text-center">
            <div class="w-full flex justify-center">
                <div class="inline-block serif text-lg lg:text-xl">
                    {{ bookGlobal.webMarketing.serviceDescription }}
                </div>
            </div>
        </div>

    </template>
    <!--    
    <div v-if="bookGlobal.webMarketing.webMarketingHd.marketingSubject !== ''" class="text-center text-lg text-primary-900">
        {{ bookGlobal.webMarketing.webMarketingHd.marketingSubject }}
    </div> -->

    <div v-if="bookGlobal.discountService.description !== ''" class="text-center text-lg text-primary-900">
        {{ bookGlobal.discountService.description }}
    </div>

    <div class="bg-primary-100">
        <template v-if="step === 'service-type'">
            <book-service-type />
        </template>

        <template v-if="step === 'services'">
            <book-services :showPricingPopup="true" />
            <div class="pb-10"></div>
            <Button v-if="bookGlobal.getAllServices() !== ''" label="next"
                class="uppercase right-1 lg:left-2/3 z-50 bg-primary-900 !text-primary-100 !hover:bg-primary-500"
                style="width: 10rem; position: fixed !important; bottom: 58px" @click="servicesNavigateToNext();" />
        </template>

        <template v-if="step === 'location'">
            <book-locations @selected-location="selectLocation" />
        </template>

        <template v-if="step === 'technician'">
            <book-technicians />

            <div class="text-center">
                <Button label="next" class="uppercase  bg-primary-900 !text-primary-100 !hover:bg-primary-500 mb-10"
                    style="width: 10rem;" @click="techniciansNavigateToNext();" />
            </div>
        </template>

        <template v-if="step === 'times'">
            <book-date-time />
        </template>

        <template v-if="step === 'take'">
            <book-take />
        </template>
    </div>

    <login-form @didLogin="tryToLoginMarketing" cancelButtonText="NEW TO KENNETHS?" showCloseButton="false" />

    <Dialog v-model:visible="bookGlobal.book.showSexQuestion" :closable="false" :modal="true"
        header="Kenneth's Salons + Day Spas" class="p-0 m-5 w-full md:w-1/2">
        <div class="flex justify-center p-0 m-0">
            <div class="text-center p-0 m-0">
                <div class="flex flex-col items-center py-5 space-y-4">

                    <!-- Female Row -->
                    <div class="grid grid-cols-2 w-full items-center py-0">
                        <div class="text-right">Female</div>
                        <div class="text-left">
                            <RadioButton id="Female" class="ml-2" v-model="bookGlobal.book.sex" name="sex"
                                aria-label="Select if you are a female" value="F" @change="sexChanged()" />
                        </div>
                    </div>

                    <!-- Male Row -->
                    <div class="grid grid-cols-2 w-full items-center py-0">
                        <div class="text-right">Male</div>
                        <div class="text-left">
                            <RadioButton id="Male" class="ml-2" v-model="bookGlobal.book.sex" name="sex"
                                aria-label="Select if you are a male" value="M" @change="sexChanged()" />
                        </div>
                    </div>

                    <!-- Info Text -->
                    <div class="w-full text-center text-sm leading-relaxed">
                        *This data is used to help provide you with the proper list of services for booking.<br />
                        <b>Our Evolving Spa Experience</b>
                        <br />
                        At Kenneth's, we're redefining the spa experience to meet the needs of every guest. Our <b>New
                            Albany Spa</b> remains an exclusive women-only sanctuary devoted to relaxation and renewal.
                        Our
                        <b>Polaris</b> and <b>Hilliard Spas</b>, along with our <b>Taylor Square</b>, <b>Kingdale</b>,
                        <b>Avery</b>, <b>Grove City</b>, and
                        <b>Westerville Spa</b> Studios, now welcome both women and gentlemen..
                    </div>

                </div>
            </div>
        </div>
    </Dialog>

</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal';
import { bookGlobal } from '~/composables/bookGlobal';
import { dataGlobal } from '~/composables/dataGlobal';

import RadioButton from '@/volt/RadioButton';
import Button from '@/volt/Button';
import Dialog from '@/volt/Dialog';

definePageMeta({
    layout: 'basic'
})

const route = useRoute();
const router = useRouter();

const rawStep = Array.isArray(route.params.step)
    ? route.params.step[0]
    : route.params.step;

const allowedSteps = new Set([
    'service-type',
    'services',
    'location',
    'technician',
    'times',
    'take',
    'promo',
    'service'
]);

const step = typeof rawStep === 'string'
    ? rawStep.trim().toLowerCase()
    : '';

// Defensive client-side validation for direct and client-side navigation.
// The server middleware should also reject unknown steps so the initial
// HTTP response is a real 404 instead of a Nuxt application shell with 200.
if (!allowedSteps.has(step)) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found'
    });
}

const stepTitles = {
    "service-type": "Select Service Type",
    "services": "Select Services",
    "location": "Select Location",
    "technician": "Select Technician(s)",
    "times": "Select Date & Time",
    "take": "Confirm Appointment",
    "promo": "Book Appointment",
    "service": "Select Service"
};

const pageTitle = stepTitles[step] || "Book Appointment";
const fullPageTitle = `${pageTitle} | Kenneth's Salons + Day Spas`;
const canonicalUrl = `https://kenneths.com/book/new/${step || 'service-type'}`;

const pageHeading =
    step === "service-type"
        ? "Select the service type you are looking for"
        : pageTitle;

const pageDescription =
    "Book your appointment online with Kenneth's Salons + Day Spas. Choose your service, location, stylist, and appointment time.";

const jsonLDString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    "url": canonicalUrl,
    "name": fullPageTitle,
    "description": pageDescription,
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
        "@type": "Service",
        "name": "Online salon and spa appointment booking",
        "areaServed": "Columbus, Ohio and Central Ohio",
        "provider": {
            "@type": "Organization",
            "@id": "https://kenneths.com/#organization",
            "name": "Kenneth's Hair Salons and Day Spas"
        }
    }
});

useHead({
    htmlAttrs: {
        lang: "en-US"
    },

    title: fullPageTitle,

    meta: [
        {
            name: "robots",
            content: "noindex, follow"
        },
        {
            name: "description",
            content: pageDescription
        },
        {
            property: "og:title",
            content: fullPageTitle
        },
        {
            property: "og:description",
            content: pageDescription
        },
        {
            property: "og:type",
            content: "website"
        },
        {
            property: "og:url",
            content: canonicalUrl
        },
        {
            property: "og:locale",
            content: "en_US"
        },
        {
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            name: "twitter:title",
            content: fullPageTitle
        },
        {
            name: "twitter:description",
            content: pageDescription
        }
    ],

    link: [
        {
            rel: "canonical",
            href: canonicalUrl
        },
        {
            rel: "alternate",
            hreflang: "en-US",
            href: canonicalUrl
        },
        {
            rel: "alternate",
            hreflang: "x-default",
            href: canonicalUrl
        }
    ],

    script: [
        {
            type: "application/ld+json",
            children: jsonLDString
        }
    ]
});

const {
    convertDateToApiString,
    convertDateToDateNoTime,
    convertFullStringToDate,
    addDay
} = useDateFunctions();

const { getWebBookServices,
    getLocationsThatCanDoService,
    getLocationsThatCanDoServiceByLevel,
    getServiceDescriptionNoPrice,
    getStylistLevels,
    getCodeDescriptions,
    getCustomerCoupon,
    getLocationByLocationCode,
    getTechnicianName,
} = useKhsds();

const { getCustomer } = useCustomer();

const { getNewBookingCompleted,
    setMarketingDiscountCode,
    getMarketingDiscountCode,
    setNewBookingCompleted,
    getMarketingTracking } = useLocalStorage();

const { getQuizBookingInfo,
    putQuizTrack } = useSurveyFactory();

const allowedQueryParameters = new Set([
    // Functional booking parameters
    'mid',
    'd',
    'c',
    'a',
    'p',
    'l',
    'fl',
    'dsl',
    't',
    's',
    'bps',
    'mc',
    'qti',
    'cc',
    'v',
    'x',

    // Known marketing and analytics parameters
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid'
]);

const allowedDepartments = new Set(['A', 'H', 'S', 'N', 'M', 'B']);
const allowedYesNoValues = new Set(['Y', 'N']);
const allowedSexValues = new Set(['F', 'M']);

function throwInvalidBookingParameters() {
    throw createError({
        statusCode: 400,
        statusMessage: 'Invalid booking parameters'
    });
}

function validateQueryParameterNames() {
    for (const parameterName of Object.keys(route.query)) {
        if (!allowedQueryParameters.has(parameterName.toLowerCase())) {
            throwInvalidBookingParameters();
        }
    }
}

function getSingleQueryString(name) {
    const value = route.query[name];

    if (value === undefined || value === null) {
        return undefined;
    }

    // Duplicate query-string keys are represented as arrays by Vue Router.
    // Functional booking parameters must contain exactly one value.
    if (Array.isArray(value)) {
        throwInvalidBookingParameters();
    }

    return String(value);
}

function validateCode(value, maximumLength = 20) {
    if (value === undefined) {
        return undefined;
    }

    const normalizedValue = value.trim().toUpperCase();

    if (
        normalizedValue.length === 0 ||
        normalizedValue.length > maximumLength ||
        !/^[A-Z0-9_-]+$/.test(normalizedValue)
    ) {
        throwInvalidBookingParameters();
    }

    return normalizedValue;
}

function validateCustomerCode(value, maximumLength = 30) {
    if (value === undefined) {
        return undefined;
    }

    const normalizedValue = value.trim().toUpperCase();

    if (
        normalizedValue.length === 0 ||
        normalizedValue.length > maximumLength ||
        !/^[A-Z0-9 _-]+$/.test(normalizedValue)
    ) {
        throwInvalidBookingParameters();
    }

    return normalizedValue;
}

function validateAllowedValue(value, allowedValues) {
    if (value === undefined) {
        return undefined;
    }

    const normalizedValue = value.trim().toUpperCase();

    if (!allowedValues.has(normalizedValue)) {
        throwInvalidBookingParameters();
    }

    return normalizedValue;
}

function validateGeneralString(value, maximumLength) {
    if (value === undefined) {
        return undefined;
    }

    const normalizedValue = value.trim();

    if (
        normalizedValue.length === 0 ||
        normalizedValue.length > maximumLength ||
        /[\u0000-\u001F\u007F]/.test(normalizedValue)
    ) {
        throwInvalidBookingParameters();
    }

    return normalizedValue;
}

onMounted(async () => {

    bookGlobal.bookingParameters.appointmentDate = convertDateToApiString(new Date());

    await bookGlobal.getLocationSalons();

    if (step === 'service-type') {
        bookGlobal.book.header = 'Select the service type you are looking for'
    } else if (step === 'services') {
        bookGlobal.book.header = 'Select Services'
    } else if (step === 'location') {
        bookGlobal.book.header = 'Select a Location'
    } else if (step === 'technician') {
        bookGlobal.book.header = 'Select Technician(s)'
    } else if (step === 'times') {
        bookGlobal.book.header = 'Select a Date & Time'
    } else if (step === 'take') {
        bookGlobal.book.header = 'Confirm Selection'
    }


    // Query-parameter validation. The server middleware should perform the
    // same route/name/cardinality checks before Nuxt returns the app shell.
    validateQueryParameterNames();

    let mid = validateGeneralString(getSingleQueryString('mid'), 10);
    let discountServiceCode = validateCode(getSingleQueryString('d'), 20); // discount service code
    let customerCode = validateCustomerCode(getSingleQueryString('c'), 30);
    let fromApp = validateGeneralString(getSingleQueryString('a'), 50);
    let department = validateAllowedValue(getSingleQueryString('p'), allowedDepartments);
    let locationCode = validateCode(getSingleQueryString('l'), 4);
    let filteredLocationCode = validateCode(getSingleQueryString('fl'), 4);
    let dontShowLocationDropDown = validateAllowedValue(getSingleQueryString('dsl'), allowedYesNoValues);
    let technicianCode = validateCode(getSingleQueryString('t'), 20);
    let scheduleServiceCode = validateCode(getSingleQueryString('s'), 20);
    let byPassServicePage = validateAllowedValue(getSingleQueryString('bps'), allowedYesNoValues);
    let matchCode = validateGeneralString(getSingleQueryString('mc'), 100);
    if (matchCode !== undefined) {
        matchCode = matchCode.toUpperCase();
    }
    let quizTrackingId = validateGeneralString(getSingleQueryString('qti'), 50);
    let customerCouponId = validateCode(getSingleQueryString('cc'), 20);
    let viewServiceType = validateCode(getSingleQueryString('v'), 20);
    let sex = validateAllowedValue(getSingleQueryString('x'), allowedSexValues) || '';

    // Known campaign workaround. This now expects one unambiguous value
    // instead of relying on duplicate utm_campaign parameters.
    const utmCampaign = validateGeneralString(
        getSingleQueryString('utm_campaign'),
        200
    );

    if (utmCampaign === 'ke-25%-truepointe') {
        filteredLocationCode = 'AL';
        dontShowLocationDropDown = 'Y';
        discountServiceCode = 'DBF';
        department = 'B';
    }

    if (dontShowLocationDropDown === 'Y') {
        bookGlobal.showLocationFilter = false;
    }

    let newBookingCompleted = await getNewBookingCompleted();

    if (customerCode === 'NEWCUSTOMER') {
        customerCode = undefined;
    }

    if (newBookingCompleted === '1') {

        if (step === 'promo' || mid !== undefined || customerCode !== undefined) {
            await setNewBookingCompleted('0'); //allow through if booking by promo or marketing id
        } else {
            router.push('/book/new/already-booked');
            return;
        }
    }

    if (department !== undefined) {
        bookGlobal.webMarketing.department = department;
    } else {
        bookGlobal.webMarketing.department = 'A';
    }

    if (locationCode !== undefined) {
        bookGlobal.webMarketing.locationCode = locationCode;
        bookGlobal.webMarketing.location = await getLocationByLocationCode(locationCode);
        bookGlobal.showLocationFilter = false;
    }
    if (filteredLocationCode !== undefined && filteredLocationCode !== 'AL') {
        bookGlobal.filteredLocationCode = filteredLocationCode;
        bookGlobal.book.serviceGroupShow.hair = undefined
    }

    if (technicianCode !== undefined) {
        bookGlobal.webMarketing.technicianCode = technicianCode;
        bookGlobal.webMarketing.technicianName = await getTechnicianName(technicianCode);
    }
    if (byPassServicePage !== undefined) {
        bookGlobal.webMarketing.byPassServicePage = byPassServicePage;
    }
    if (matchCode !== undefined) {
        bookGlobal.webMarketing.matchCode = matchCode;
    }
    if (quizTrackingId !== undefined) {
        bookGlobal.webMarketing.quizTrackingId = quizTrackingId;
    }
    if (customerCouponId !== undefined) {
        bookGlobal.webMarketing.customerCouponId = customerCouponId;
    }
    if (sex !== undefined) {
        bookGlobal.webMarketing.sex = sex;
    }
    if (viewServiceType !== undefined) {
        bookGlobal.webMarketing.viewServiceType = viewServiceType;
    }

    if (mid === undefined && bookGlobal.isMarketing === false) { //mid takes priority, handled below
        if (discountServiceCode !== undefined) {
            bookGlobal.discountService.serviceCode = discountServiceCode;
            bookGlobal.discountService.description = await getServiceDescriptionNoPrice(discountServiceCode);
            await setMarketingDiscountCode(discountServiceCode);
        } else {
            bookGlobal.discountService.serviceCode = '' // 'DFT';
            bookGlobal.discountService.description = '' //'20% Off For New Customer';
        }

        if (bookGlobal.discountService.serviceCode === '') {
            let marketingDiscountCode = await getMarketingDiscountCode();

            if (marketingDiscountCode !== '') {
                bookGlobal.discountService.serviceCode = marketingDiscountCode;
                bookGlobal.discountService.description = await getServiceDescriptionNoPrice(marketingDiscountCode);
            }
        }
    }

    if (customerCode !== undefined) {
        accountGlobal.customer = await getCustomer(customerCode);

        if (accountGlobal.customer.customerCode !== undefined) {
            accountGlobal.customerCode = customerCode;
            accountGlobal.loginSuccessful = true;
            accountGlobal.verifySuccess = true;
            accountGlobal.hasCustomerViewModel = true;
        }
    }

    let servicePassedIn = false;
    if (scheduleServiceCode !== undefined) {
        bookGlobal.clearBookingData();  //if passed in, clear
        bookGlobal.scheduleServiceCode = scheduleServiceCode;
        servicePassedIn = true;
    }

    if (step === 'promo') {

        bookGlobal.clearDiscountService;

        if (mid !== undefined) {

            if (fromApp === undefined) {
                fromApp = 'none';

                let marketingTracking = await getMarketingTracking();

                if (marketingTracking !== null) {
                    if (marketingTracking.app !== '') {
                        fromApp = marketingTracking.app; //this is gathered in default.vue
                        dataGlobal.marketingTracking = marketingTracking;
                    }
                }
            }

            if (sex === '') {
                sex = 'E';
            }

            bookGlobal.webMarketing.mid = mid;
            bookGlobal.webMarketing.app = fromApp;
            bookGlobal.webMarketing.sex = sex;

            if (accountGlobal.hasCustomerViewModel === true) {
                sex = accountGlobal.customer.sex;
                await setUpMarketing(mid, fromApp, sex);
                router.push('/book/new/services');
                return;
            } else if (mid === '354') {
                //try to login
                accountGlobal.showLogin = true;
                return;
            } else {
                await setUpMarketing(mid, fromApp, sex);
                router.push('/book/new/services');
                return;
            }

        } else {
            if (sex === '') {
                await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 2);
                bookGlobal.book.showSexQuestion = true;
            } else {
                bookGlobal.book.sex = sex;
                await sexChanged();
            }

            return;
        }
    } else if (step === 'service') { //notice, NOT plural 'service' (reroutes to services when sex changed below)
        //if gets here, came from service-menu, should have a bookGlobal.scheduleServiceCode 

        if (bookGlobal.webMarketing.mid !== 0) {
            bookGlobal.clearDiscountService;
        }

        if (viewServiceType !== undefined) {

            bookGlobal.setServiceAccordianOpen(viewServiceType)

            await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 2);
            bookGlobal.book.showSexQuestion = true;
            return;
        }
        else if (servicePassedIn) {
            await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 2);
            bookGlobal.book.showSexQuestion = true;
            return;
        }
    }

    if (step !== 'service-type' && step !== 'services') {
        if (bookGlobal.book.started === false) {  //this means that there was probably a refresh
            window.location.replace('/book/new/service-type');
            return;
        }
    }

    if (step === 'service-type') {

        if (bookGlobal.webMarketing.mid !== 0) {
            bookGlobal.clearDiscountService;
        }

        await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 1);

        bookGlobal.book.sex = '';

    } else if (step === 'services') {

        if (bookGlobal.webMarketing.mid !== 0) {
            bookGlobal.clearDiscountService;
        }

        bookGlobal.setServiceAccordianOpen(bookGlobal.webMarketing.viewServiceType);

        bookGlobal.book.started = true;
        bookGlobal.bookingParameters.appointmentDate = convertDateToApiString(new Date());
        await setMinAndMaxDate();

        bookGlobal.serviceStep.error = '';
        if (bookGlobal.hasServiceGroups === true) {
            bookGlobal.book.header = 'Select Services';
        } else {
            bookGlobal.book.header = ''
        }

        if (bookGlobal.scheduleServiceCode !== '') {
            bookGlobal.setPassedInService();
            if (bookGlobal.webMarketing.byPassServicePage === 'Y') {
                //bookGlobal.webMarketing.byPassServicePage = '';
                bookGlobal.webMarketing.serviceDescription = await getServiceDescriptionNoPrice(bookGlobal.scheduleServiceCode);
                router.push('/book/new/location')
            }
        } else if (bookGlobal.webMarketing.byPassServicePage === 'Y' && bookGlobal.getAllServices() !== '') {
            bookGlobal.webMarketing.serviceDescription = await getServiceDescriptionNoPrice(bookGlobal.getAllServices());
            router.push('/book/new/location')

        } else {
            await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 3);
            bookGlobal.setShowServiceGroup();
        }

    } else if (step === 'location') {

        //check to see if passed in location, set location and move to technician 
        if (bookGlobal.webMarketing.locationCode !== '') {
            if (bookGlobal.webMarketing.locationCode === 'AT') {
                bookGlobal.selectedLocation = {
                    locationCode: 'AT',
                    locationDescription: 'Academy Salon',
                    extendedDescription: 'Academy Salon',
                    address: '5151 Reed Rd Suite 110B',
                    city: 'Columbus',
                    state: 'OH',
                    zipCode: '43220',
                    canDoServices: true
                }
            } else {
                bookGlobal.selectedLocation = bookGlobal.webMarketing.location;
                //bookGlobal.book.locations.find(l => l.locationCode === bookGlobal.webMarketing.locationCode)

                bookGlobal.clearTechnicians();
            }


            router.push('/book/new/technician')
            return;
        }


        let locations = [];

        let services = bookGlobal.getAllServices();

        if (bookGlobal.webMarketing.level !== '') {
            locations = await getLocationsThatCanDoServiceByLevel(services, bookGlobal.webMarketing.level, bookGlobal.webMarketing.fromChairDate, false, true);
        } else {
            locations = await getLocationsThatCanDoService(services, 'W', false, true);
        }

        if (bookGlobal.isMarketing === true) {

            let mLocations = bookGlobal.webMarketing.marketingLocations;

            if (mLocations.length > 0) {
                for (let i = locations.length - 1; i >= 0; i--) {
                    let foundLoca = mLocations.find(loca => loca.locationCode === locations[i].locationCode);

                    if (foundLoca === undefined) {
                        locations.splice(i, 1);
                    }
                }
            }
        }

        if (bookGlobal.getBarServices() !== '') {
            let barLocations = [{ locationCode: 'PL' }, { locationCode: 'MR' }]
            //if not bar locations, set canDoServices to false
            for (let i = locations.length - 1; i >= 0; i--) {
                let foundLoca = barLocations.find(loca => loca.locationCode === locations[i].locationCode);

                if (foundLoca === undefined) {
                    locations[i].canDoServices = false;
                }
            }

            //put canDoServices on top
            let canDos = locations.filter(loca => loca.canDoServices);
            let canNotDos = locations.filter(loca => !loca.canDoServices);
            locations = canDos.concat(canNotDos);
        }

        bookGlobal.book.locations = locations;

        await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 4);

    } else if (step === 'technician') {

        bookGlobal.apptWeeklyOpens = [];
        bookGlobal.technicianStep.error = ''

        if (bookGlobal.getServicesByGroup('hair') !== '') {
            bookGlobal.technicianStep.stylistLevels = await getStylistLevels(bookGlobal.selectedLocation.locationCode);
        }

        //check to see if passed in location, set location and move to technician
        if (bookGlobal.webMarketing.technicianCode !== '') {

            let technicianTypes = bookGlobal.getTechnicianTypesFromSelectedServices();

            if (technicianTypes.stylist === true) {
                bookGlobal.technician.stylist = bookGlobal.webMarketing.technicianCode;
            }

            if (technicianTypes.nailTech === true) {
                bookGlobal.technician.nailTech = bookGlobal.webMarketing.technicianCode;
            }

            if (technicianTypes.waxer === true) {
                bookGlobal.technician.waxer = bookGlobal.webMarketing.technicianCode;
            }

            if (technicianTypes.esthetician === true) {
                bookGlobal.technician.esthetician = bookGlobal.webMarketing.technicianCode;
            }

            if (technicianTypes.therapist === true) {
                bookGlobal.technician.therapist = bookGlobal.webMarketing.technicianCode;
            }


            await bookGlobal.getWeeklyOpenings()

            router.push('/book/new/times')
            return;
        }

        await bookGlobal.getTechniciansForStep();

        await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 5);

    } else if (step === 'time') {

        if (bookGlobal.webMarketing.isQuiz === true) {
            state.fullName = bookGlobal.webMarketing.quizData.matchInfoViewModel.customerName;
            state.fullNameDisabled = true;
            bookGlobal.maxDate = convertDateToDateNoTime(convertFullStringToDate(bookGlobal.webMarketing.quizData.matchInfoViewModel.expirationDate));
        } else if (bookGlobal.webMarketing.expireDate !== null) {
            bookGlobal.maxDate = convertDateToDateNoTime(convertFullStringToDate(bookGlobal.webMarketing.expireDate));
        }

        await appGlobal.postAppTrackTran(1, accountGlobal.customerCode, 6);
    }

});


async function setUpMarketing(mid, app, sex) {
    let isMarketing = await bookGlobal.getWebMarketing(mid, app)

    if (isMarketing === true) {
        bookGlobal.isMarketing = true;

        bookGlobal.showLocationFilter = false;

        let filteredServices = '';


        if (mid === '354') {

            let customerCode = 'HOLD CUST';
            if (accountGlobal.customer.customerCode !== undefined) {
                customerCode = accountGlobal.customer.customerCode;
            }
            bookGlobal.webMarketing.marketingServices = await bookGlobal.GetWaxingThatCustomerHasNotHad(customerCode);
        } else if (mid === '533') {  //student discount 
            bookGlobal.webMarketing.level = '1';
            bookGlobal.webMarketing.byPassCustomerChecking = true;
            bookGlobal.webMarketing.fromChairDate = '2023-02-01'
            bookGlobal.webMarketing.showNoPreference = false;
        } else if (mid === '534' || mid === '535' || mid === '536') {
            bookGlobal.webMarketing.level = '0';
            bookGlobal.webMarketing.byPassCustomerChecking = true;
        }


        bookGlobal.webMarketing.marketingServices.forEach(function (service) {
            filteredServices += service.serviceCode + ',';
        });

        if (filteredServices === '') {
            filteredServices = 'A';
        }

        //check passed in parameters
        let loca = bookGlobal.webMarketing.locationCode;
        let tech = bookGlobal.webMarketing.technicianCode;

        if (loca === '') {
            loca = undefined;
        }

        if (tech === '') {
            tech = undefined;
        }

        let promoString = ''

        if (loca !== undefined || tech !== undefined) {
            loca = loca === undefined ? null : loca;
            tech = tech === undefined ? null : tech;

            let codeDescription = await getCodeDescriptions(tech, loca, null)

            if (codeDescription.technicianName !== '') {
                promoString += ' w/ ' + codeDescription.technicianName;
            }

            if (codeDescription.locationName !== '') {
                promoString += ' at our ' + codeDescription.locationName + ' location';
            }

            if (bookGlobal.webMarketing.webMarketingHd.marketingSubject === '') {
                bookGlobal.webMarketing.webMarketingHd.marketingSubject += 'Book ' + promoString;
            } else {
                bookGlobal.webMarketing.webMarketingHd.marketingSubject += promoString;
            }
        }


        //hair harmony
        if (bookGlobal.webMarketing.matchCode !== '') {

            bookGlobal.webMarketing.quizData = await getQuizBookingInfo(bookGlobal.webMarketing.matchCode)

            //if get an error back, don't allow to book
            if (bookGlobal.webMarketing.quizData.errorMessage !== 'undefined' && bookGlobal.webMarketing.quizData.errorMessage !== undefined) {
                bookGlobal.webMarketing.webMarketingHd.marketingText1 = '';
                bookGlobal.book.header = '';
                bookGlobal.webMarketing.webMarketingHd.marketingSubject = bookGlobal.webMarketing.quizData.errorMessage;
                bookGlobal.hasServiceGroups = false;
                return;
            }
            await putQuizTrack(bookGlobal.webMarketing.quizTrackingId, 'AB')
            bookGlobal.webMarketing.isQuiz = true;
            bookGlobal.webMarketing.locationCode = bookGlobal.webMarketing.quizData.locationCode;
            bookGlobal.webMarketing.technicianCode = bookGlobal.webMarketing.quizData.technicianCode;
            bookGlobal.webMarketing.quizData.matchInfoViewModel.technicianCode = bookGlobal.webMarketing.technicianCode;
            loca = bookGlobal.webMarketing.quizData.locationCode;
            tech = bookGlobal.webMarketing.quizData.technicianCode;

            promoString = '<b>' + bookGlobal.webMarketing.quizData.matchInfoViewModel.customerName + '</b><br />';
            promoString += 'Book with ' + bookGlobal.webMarketing.quizData.technicianName + ' at our ' + bookGlobal.webMarketing.quizData.locationDescription;

            bookGlobal.webMarketing.location.extendedDescription = bookGlobal.webMarketing.quizData.locationDescription;
            bookGlobal.webMarketing.webMarketingHd.marketingSubject = promoString;

            bookGlobal.discountService.description = "20% Off Your First Visit";

            bookGlobal.webMarketing.fromRoute = '/book/new/services';
        }

        if (bookGlobal.webMarketing.customerCouponId !== '') {
            let customerCoupon = await getCustomerCoupon(bookGlobal.webMarketing.customerCouponId);
            bookGlobal.webMarketing.expireDate = customerCoupon.expireDate;
        }

        if (loca === undefined || loca === '' || loca === null) {
            loca = 'AL'
        }

        bookGlobal.serviceGroups = await getWebBookServices('AB', sex, filteredServices, bookGlobal.webMarketing.department, tech, loca);

        if (bookGlobal.webMarketing.mid === '539') { //plug for promo, only show bar facials DBE (Free Eyebrow Wax with any Bar Facial)
            bookGlobal.serviceGroups.headSpas = [];
            bookGlobal.webMarketing.level = '1';
            bookGlobal.webMarketing.showNoPreference = false;
        }


        bookGlobal.generateBarAddonGroups()
        await bookGlobal.setServiceGroupVisible();

        if (mid === '538') { //15% off select facial booked within 35 days
            bookGlobal.book.serviceGroupVisible.bar = false;
        }

        bookGlobal.setSetShowServiceGroupForMarketing();

        if (mid === '1' || mid === '2' || mid === '533' || mid === '534' || mid === '535' || mid === '536') {
            bookGlobal.webMarketing.mustSelect = false;
        }
        else if (bookGlobal.webMarketing.department !== 'A') { //booking by department
            bookGlobal.webMarketing.mustSelect = false;
        } else {
            bookGlobal.webMarketing.mustSelect = true;
            await bookGlobal.selectFirstServiceInServiceType();
        }

        if (mid = '533') { //no childs custs
            bookGlobal.serviceGroups.cuts = bookGlobal.serviceGroups.cuts.filter(cut => cut.serviceCode !== 'HCC');

        }

        bookGlobal.discountService.serviceCode = bookGlobal.webMarketing.webMarketingHd.serviceDiscountCode;

        bookGlobal.book.header = bookGlobal.webMarketing.webMarketingHd.marketingSubject;
    }
}

async function sexChanged() {
    bookGlobal.book.showSexQuestion = false;

    let sex = bookGlobal.book.sex;

    if (sex === 'N') {
        sex = 'M';
    }

    let locationCode = 'AL';

    if (bookGlobal.webMarketing.locationCode !== '') {
        locationCode = bookGlobal.webMarketing.locationCode;
    } else if (bookGlobal.filteredLocationCode !== 'AL') {
        locationCode = bookGlobal.filteredLocationCode;
    }

    bookGlobal.serviceGroups = await getWebBookServices('AB', sex, 'A', bookGlobal.webMarketing.department, 'A', locationCode);


    bookGlobal.generateBarAddonGroups()
    if (bookGlobal.webMarketing.department !== 'A') {

        bookGlobal.setSetShowServiceGroupForMarketing();
    }


    await bookGlobal.setServiceGroupVisible();

    if (bookGlobal.scheduleServiceCode !== '') {
        router.push('/book/new/services?s=' + bookGlobal.scheduleServiceCode);
    } else {
        router.push('/book/new/services');
    }

}

async function setMinAndMaxDate() {
    bookGlobal.minDate = convertDateToDateNoTime(new Date());
    let maxDate = null;

    if (bookGlobal.isMarketing === true) {
        let startDate = convertFullStringToDate(bookGlobal.webMarketing.webMarketingHd.startdt);
        if (startDate > bookGlobal.minDate) {
            bookGlobal.minDate = startDate;
        }

        let expireDaysOut = bookGlobal.webMarketing.webMarketingHd.expireDaysOut;
        if (expireDaysOut == null) {
            expireDaysOut = 0;
        }

        if (expireDaysOut !== 0) {
            bookGlobal.maxDate = addDay(bookGlobal.minDate, expireDaysOut);
        } else {
            if (bookGlobal.webMarketing.webMarketingHd.enddt !== null) {
                let endDate = convertFullStringToDate(bookGlobal.webMarketing.webMarketingHd.enddt);
                bookGlobal.maxDate = endDate;
            } else {
                maxDate = await bookGlobal.getLastAppointmentDate();
                bookGlobal.maxDate = convertFullStringToDate(maxDate);
            }
        }
    } else {
        maxDate = await bookGlobal.getLastAppointmentDate();
        bookGlobal.maxDate = convertFullStringToDate(maxDate);
    }
}

async function tryToLoginMarketing(loggedIn) {

    let sex = 'E';
    if (loggedIn === true) {
        sex = accountGlobal.customer.sex;
    }
    let mid = bookGlobal.webMarketing.mid;
    let fromApp = bookGlobal.webMarketing.app;

    await setUpMarketing(mid, fromApp, sex);
    router.push('/book/new/services');
    return;
}

//navigate functions    
async function servicesNavigateToNext() {
    let services = bookGlobal.getAllServices();

    bookGlobal.serviceStep.error = '';

    if (services === '') {
        bookGlobal.serviceStep.error = '*Please select a service before proceeding';
        return;
    }

    //if selected color, must have cut
    if (bookGlobal.book.sex !== 'M') {
        if (bookGlobal.service.color + bookGlobal.service.weave !== '') {
            if (bookGlobal.service.cut === '') {
                bookGlobal.service.cut = 'HSB';
            }
        }
    }

    //bookGlobal.book.header = 'Select a Location'

    //check to see if passed in location, set location and move to technician
    if (bookGlobal.webMarketing.locationCode !== '') {
        bookGlobal.selectedLocation = await getLocationByLocationCode(bookGlobal.webMarketing.locationCode);
        bookGlobal.clearTechnicians();

        router.push('/book/new/technician');
        return;
    }

    if (bookGlobal.filteredLocationCode !== 'AL') {
        bookGlobal.selectedLocation = await getLocationByLocationCode(bookGlobal.filteredLocationCode);
        bookGlobal.clearTechnicians();

        router.push('/book/new/technician');
        return;
    }

    router.push('/book/new/location');

}

async function selectLocation(loca) {

    if (loca.canDoServices === false) {
        return;
    }

    if (bookGlobal.selectedLocation.locationCode !== undefined) {
        if (bookGlobal.selectedLocation.locationCode !== loca.locationCode) {
            bookGlobal.clearTechnicians();
        }
    }

    bookGlobal.selectedLocation = loca;



    router.push('/book/new/technician')
    window.scrollTo(0, 0);
}

async function techniciansNavigateToNext() {

    bookGlobal.technicianStep.error = '';

    //validation
    if (bookGlobal.technicianStep.showStylist === true) {
        if (bookGlobal.technician.stylist === '') {
            bookGlobal.technicianStep.error = '*Please select a Stylist'
            return;
        }

        if (bookGlobal.technician.stylist === 'N') {
            if (bookGlobal.selectedLocation.locationCode === 'AT') {
                bookGlobal.technician.stylistLevel = '0';
            }
            if (bookGlobal.technician.stylistLevel === '') {
                bookGlobal.technicianStep.error = '*Please select a Stylist Level'
                return;
            }
        }
    }

    if (bookGlobal.technicianStep.showNailTech === true) {
        if (bookGlobal.technician.nailTech === '') {
            bookGlobal.technicianStep.error = '*Please select a Nail Tech'
            return;
        }
    }

    if (bookGlobal.technicianStep.showEsthetician === true) {
        if (bookGlobal.technician.esthetician === '') {
            bookGlobal.technicianStep.error = '*Please select an Esthetician'
            return;
        }
    }

    if (bookGlobal.technicianStep.showWaxer === true) {
        if (bookGlobal.technician.waxer === '') {
            bookGlobal.technicianStep.error = '*Please select a Waxologist'
            return;
        }
    }

    if (bookGlobal.technicianStep.showTherapist === true) {
        if (bookGlobal.technician.therapist === '') {
            bookGlobal.technicianStep.error = '*Please select a Therapist'
            return;
        }
    }

    await bookGlobal.getWeeklyOpenings()

    router.push('/book/new/times')
    window.scrollTo(0, 0);
}

//end navigate functions
</script>

<style scoped></style>