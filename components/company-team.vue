<template>
    <section class="bg-primary-100 text-primary-900 py-10">
        <!-- Section Title -->
        <div class="px-5 md:px-10 text-center mx-auto">
            <h2 class="k-section-title font-light uppercase">
                Our Technicians
            </h2>
        </div>

        <div class="mt-3 md:mt-5 px-5 md:px-10 text-center mx-auto">
            <div class="relative w-full max-w-md mx-auto">
                <!-- Magnifying Glass -->
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-900 opacity-70 pointer-events-none"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>

                <InputText v-model="searchTerm" placeholder="Search technicians by first name..."
                    class="w-full pl-10 caret-black" />

                <!-- Clear Button -->
                <button v-if="searchTerm" @click="searchTerm = ''" aria-label="Clear search"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-primary-900 hover:text-primary-500">
                    ✕
                </button>
            </div>
        </div>

        <!-- Technician Grid (Hair, Nail, Spa) -->
        <div class="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-5 md:px-10 transition-all duration-500 overflow-hidden"
            :style="{ maxHeight: expanded ? '999999px' : '1300px' }">
            <div v-for="(employee, id) in filteredTechnicians" :key="employee.employeeCode || id"
                class="flex flex-col p-4 text-center justify-center items-center">
                <a :href="getProfileUrl(employee)">
                    <img class="h-45 w-40 md:h-90 md:w-80 object-cover" :loading="getImageLoading(id)"
                        :fetchpriority="getImageFetchPriority(id)" decoding="async" :src="getEmployeeImageSrc(employee)"
                        :alt="employee.emalias || ''" />
                </a>
                <h3 class="text-lg md:text-xl uppercase mt-3">{{ employee.emalias }}</h3>
                <p>{{ employee.technicianTypeDescription }}</p>
                <div class="text-sm md:text-base h-10">{{ employee.locationDescription }}</div>

                <a :href="getProfileUrl(employee)"
                    class="mt-2 px-3 md:px-5 py-2 lg:ml-0 text-sm md:text-base cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis border border-primary-500 whitespace-nowrap">
                    Learn More About {{ employee.emalias }}
                </a>
            </div>
        </div>

        <!-- Expand / Collapse Button -->
        <div class="text-center mt-10" v-if="filteredTechnicians.length > initialVisibleCount">
            <Button @click="expanded = !expanded"
                class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10">
                {{ expanded ? 'Show Less' : 'See All Technicians' }}
            </Button>
        </div>

        <gold-line class="my-10" />

        <div class="px-5 md:px-10 text-center mx-auto">
            <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light uppercase">
                Our Leadership
            </h2>
        </div>

        <!-- Leadership Grid -->
        <div class="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-5 md:px-10 transition-all duration-500 overflow-hidden"
            :style="{ maxHeight: lexpanded ? '9999px' : '1230px' }">
            <div v-for="(employee, id) in leadership" :key="employee.employeeCode || id"
                class="flex flex-col p-4 text-center justify-center items-center">
                <!-- <a :href="getProfileUrl(employee)"> -->
                <img class="h-45 w-40 md:h-90 md:w-80 object-cover" :loading="getImageLoading(id)"
                    :fetchpriority="getImageFetchPriority(id)" decoding="async" :src="getEmployeeImageSrc(employee)"
                    :alt="employee.emalias || ''" />
                <!-- </a> -->
                <h3 class="text-lg md:text-xl uppercase mt-3">{{ employee.emalias }}</h3>

                <p v-if="employee.employeeCode === '205048'">Director of Spa Education</p>
                <p v-else-if="employee.employeeCode === '206064'">Director of Nail Education</p>
                <p v-else-if="employee.employeeCode === '218040'">Academy Education Director</p>
                <p v-else>{{ employee.positionDescription }}</p>
            </div>
        </div>

        <!-- Expand / Collapse Button -->
        <div class="text-center mt-10" v-if="leadership.length > initialVisibleCount">
            <Button @click="lexpanded = !lexpanded"
                class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10">
                {{ lexpanded ? 'Show Less' : 'See All Leadership' }}
            </Button>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from '@/volt/Button.vue';
import InputText from '@/volt/InputText.vue';

const props = defineProps({
    employees: {
        type: Object,
        default: () => ({})
    }
});

const initialVisibleCount = 8;

const expanded = ref(false);
const lexpanded = ref(false);
const searchTerm = ref('');

function stripQueryString(value) {
    if (typeof value !== 'string') {
        return '';
    }

    return value.replace(/\?.*$/, '').trim();
}

function getEmployeeImageSrc(employee) {
    const photoName = stripQueryString(employee?.photoName || '');

    if (!photoName) {
        return 'https://kenneths.com/static/team-photo/no-image-available-1.jpg';
    }

    if (photoName.startsWith('http://') || photoName.startsWith('https://')) {
        return stripQueryString(photoName);
    }

    return `https://kenneths.com/static/team-photo/${photoName}`;
}

function safeSlugPart(value) {
    if (typeof value !== 'string') {
        return '';
    }

    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
}

function getProfileUrl(employee) {
    return `/our-team/profile/${safeSlugPart(employee?.city)}/${safeSlugPart(employee?.emalias)}`;
}

const technicians = computed(() => {
    return Array.isArray(props.employees?.technicians)
        ? props.employees.technicians
        : [];
});

const leadership = computed(() => {
    return Array.isArray(props.employees?.leaderShip)
        ? props.employees.leaderShip
        : [];
});

const filteredTechnicians = computed(() => {
    const term = searchTerm.value.trim().toLowerCase();

    if (!term) return technicians.value;

    return technicians.value.filter(t =>
        typeof t?.emalias === 'string' &&
        t.emalias.toLowerCase().startsWith(term)
    );
});

const getImageLoading = (index) => {
    return index < initialVisibleCount ? 'eager' : 'lazy';
};

const getImageFetchPriority = (index) => {
    return index < initialVisibleCount ? 'high' : 'low';
};
</script>

<style scoped>
.grid {
    transition: max-height 0.6s ease;
}
</style>