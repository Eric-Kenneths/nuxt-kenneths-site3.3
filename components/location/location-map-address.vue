<template>
    <section class="flex flex-col md:grid lg:grid-cols-2">
        <!-- Left Column: Square Image -->
        <div class="w-full h-full flex p-5">
            <iframe aria-label="Map to a Kenneth's Location"
                class="mx-auto grayscale hover:grayscale-0 transition w-full h-80 md:h-130" loading="lazy"
                :src="locationData.mapUrl"></iframe>
        </div>

        <!-- Right Column: Three Vertical Divs -->
        <div class="grid flex px-4 md:px-12 bg-primary-900 text-white min-h-80 md:min-h-120 h-full">
            <!-- Top Div: Large Text, Top Aligned -->
            <div class="flex items-start">
                <div class="grid space-y-6">
                    <h2 class="k-section-title pt-10 md:pt-20 uppercase">
                        {{ locationData.center }}
                    </h2>
                    <div class="uppercase text-2xl">
                        <div v-if="isMillRun" class="mb-2">
                            {{ millRunMoveMessage }}
                        </div>

                        <a :href="locationData.directionsUrl" target="_blank" class="cursor-pointer underline">
                            <span :class="{ 'whitespace-pre-line': isMillRun }">
                                {{ displayAddress }}
                            </span><br />

                            {{ locationData.city }}, {{ locationData.state }} {{ locationData.zipCode }}
                        </a>
                    </div>
                    <div class="text-2xl">
                        <a href="tel:+16145385800">(614) 538-5800</a>
                    </div>
                    <!-- <div v-if="locationData.locationCode === 'MR'" class="pt-2 text-yellow-200">
                        <div class="text-lg text-black bg-yellow-300 px-1">
                            *This entire location is moving 6 miles away! <strong>Appointments on and after April 13 will take place at</strong>,
                        </div>
                        <div class="uppercase text-2xl">
                            <a href="https://maps.app.goo.gl/jSVx5QjCTabBhYit6" target="_blank" class="cursor-pointer underline">
                                4525 Wathen Dr<br /> Hilliard, Ohio 43026
                            </a>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- Bottom Div: Bottom Aligned Text -->
            <div class="flex items-end pb-5 md:pb-10">
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
                            <a class="text-xl link" :href="locationData.bookingUrl">New Customer</a>
                        </div>
                    </template>
                </pop-up-menu>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    locationData: {
        type: Object,
        required: true
    }
});

const isMillRun = computed(() =>
    props.locationData?.locationCode?.trim().toUpperCase() === 'MR'
);

const addressLines = computed(() =>
    props.locationData?.address
        ? props.locationData.address.split(/\r?\n/)
        : []
);

const millRunMoveMessage = computed(() =>
    isMillRun.value ? addressLines.value[0] : ''
);

const displayAddress = computed(() => {
    if (!isMillRun.value) {
        return props.locationData?.address ?? '';
    }

    return addressLines.value.slice(1).join('\n');
});
</script>

<style scoped></style>