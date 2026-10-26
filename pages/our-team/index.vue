<template>

    <section>
        <div
            class="relative hidden md:flex items-center justify-center h-[90vmin] w-full  bg-cover overflow-hidden bg-[url('/images/our-team/meet-our-team.webp')]">
            <div class="">
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt=""
                    role="presentation"
                    class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
            </div>
            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 text-center uppercase">
                    MEET OUR TEAM</h1>
            </div>
        </div>

        <div
            class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/our-team/meet-our-team-mobile.webp')] bg-no-repeat bg-cover">

            <div>
                <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt=""
                    role="presentation"
                    class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
            </div>

            <div
                class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
                <div class="font-thin text-5xl text-center k-header-text-shadow" aria-hidden="true">
                    MEET<br />OUR<br />TEAM
                </div>
            </div>
        </div>
    </section>

    <gold-line />

    <section class="grid grid-cols-1 lg:grid-cols-2">

        <!-- Right column -->
        <div class="bg-primary-900 text-primary-100 flex flex-col justify-between p-6">
            <h2 class="k-section-title uppercase lg:w-[65%] pb-5">
                The Brains Behind the Beauty
            </h2>
            <p class="mt-6 md:mt-0 k-para-text">
                At Kenneth's, we don't just style hair—we define the industry. Our team is composed of passionate
                artists, skilled technicians, and dedicated professionals who bring the perfect blend of creativity,
                knowledge, and care to every client experience.
                <br /><br />
                What makes us different? Kenneth's is 100% employee-owned, so every member of our team has a stake in
                our success. When you visit Kenneth's, you're not just getting a service—you're receiving care from
                owners who are invested in delivering the best.
            </p>
        </div>

        <!-- Left column -->
        <div class="flex items-center justify-center">
            <img src="/images/our-team/stylist-styling-hair.webp" loading="eager" fetchpriority="high"
                alt="Elevated Salon and Spa Experience" class="w-full aspect-square object-cover max-h-[600px]" />
        </div>
    </section>

    <quiz-section />

    <company-team :employees="state.employees" />

    <book-section />
</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { setLastPageB4Profile } = useLocalStorage();

const state = reactive({
    employees: {
        technicians: [],
        leaderShip: []
    },
    socialRating: {},
    location: {}
});

const router = useRouter();

if (import.meta.client) {
    setLastPageB4Profile(router.currentRoute.value.fullPath);
}

const url = appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWeb/AL';

const { data: employeeList, error } = await useFetch(url, {
    default: () => ({
        listSocialMediaByLocationForWebViewModels: []
    })
});

function stripVolatileTeamPhotoQuery(urlValue) {
    if (typeof urlValue !== 'string') {
        return urlValue;
    }

    if (!urlValue.includes('/static/team-photo/')) {
        return urlValue;
    }

    return urlValue.replace(/\?.*$/, '');
}

function normalizeStrings(value) {
    if (typeof value === 'string') {
        return stripVolatileTeamPhotoQuery(value);
    }

    if (Array.isArray(value)) {
        return value.map(normalizeStrings);
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [key, normalizeStrings(nestedValue)])
        );
    }

    return value;
}

const normalizedEmployees = computed(() => {
    const list = employeeList.value?.listSocialMediaByLocationForWebViewModels ?? [];
    return list.map((employee) => normalizeStrings(employee));
});

state.employees.technicians = normalizedEmployees.value.filter(employee =>
    employee.positionId === 26 ||
    employee.positionId === 33 ||
    employee.positionId === 34 ||
    employee.positionId === 35 ||
    employee.positionId === 43
);

state.employees.leaderShip = normalizedEmployees.value.filter(employee =>
    employee.employeeCode === '218040' ||
    employee.employeeCode === '206064' ||
    employee.employeeCode === '205048' ||
    employee.positionId === 1 ||
    employee.positionId === 3 ||
    employee.positionId === 4 ||
    employee.positionId === 5 ||
    employee.positionId === 10 ||
    employee.positionId === 12 ||
    employee.positionId === 14 ||
    employee.positionId === 16 ||
    employee.positionId === 18 ||
    employee.positionId === 19 ||
    employee.positionId === 20 ||
    employee.positionId === 24 ||
    employee.positionId === 37 ||
    employee.positionId === 44 ||
    employee.positionId === 48 ||
    employee.positionId === 113000002 ||
    employee.positionId === 113000003 ||
    employee.positionId === 113000006 ||
    employee.positionId === 113000007 ||
    employee.positionId === 113000012 ||
    employee.positionId === 113000014
);

useHead({
    title: 'Hair Salon & Spa Columbus OH | Our Team at Kenneth\'s',
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/our-team'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                'Discover the team behind Kenneth\'s Hair Salons & Spas in Columbus, OH, an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: 'Hair Salon & Spa Columbus OH | Our Team at Kenneth\'s'
        },
        {
            property: 'og:description',
            content:
                'Discover the team behind Kenneth\'s Hair Salons & Spas in Columbus, OH, an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/our-team'
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
            content: 'Hair Salon & Spa Columbus OH | Our Team at Kenneth\'s'
        },
        {
            name: 'twitter:description',
            content:
                'Discover the team behind Kenneth\'s Hair Salons & Spas in Columbus, OH, an award-winning, employee-owned salon group with 10 Central Ohio locations dedicated to exceptional hair, nail, and spa experiences.'
        },
        {
            name: 'twitter:image',
            content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
        },
        {
            name: 'twitter:image:alt',
            content: "Kenneth's Hair Salons And Day Spas logo"
        }
    ]
})

</script>

<style scoped></style>