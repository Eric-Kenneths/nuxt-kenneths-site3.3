<template>
    <ClientOnly>
        <Teleport to="body">
            <!-- Backdrop -->
            <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="visible" class="fixed inset-0 z-[9999] bg-black/60" @click="onBackdrop" aria-hidden="true" />
            </Transition>

            <!-- Dialog -->
            <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div v-if="visible" class="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
                    @keydown.esc.prevent="cancel">
                    <div ref="panelRef"
                        class="relative w-full sm:w-[90vw] md:w-[75vw] lg:w-[50vw] max-w-3xl rounded-2xl bg-primary-900 text-primary-100 shadow-2xl ring-1 ring-white/10"
                        role="dialog" aria-modal="true" aria-labelledby="link-tech-title" @click.stop tabindex="-1">
                        <div class="sr-only" id="link-tech-title">Link a technician</div>

                        <div class="p-5 sm:p-7">
                            <p class="mt-1 text-xl sm:text-2xl leading-snug">
                                Support your technician by linking them to your online retail order. Simply find your
                                technician below
                                and shop!
                            </p>

                            <div class="mt-5 flex items-center gap-2 text-sm text-primary-100/80">
                                <span class="inline-flex items-center rounded-full bg-primary-100/10 px-3 py-1">
                                    Step {{ state.step + 1 }} of 3
                                </span>
                                <span class="hidden sm:inline">•</span>
                                <span class="hidden sm:inline">{{ stepLabel }}</span>
                            </div>

                            <!-- STEP 0 -->
                            <div v-show="state.step === 0" class="mt-6">
                                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-start">
                                    <label for="technician-location" class="sm:col-span-5 text-lg font-semibold">
                                        Technician Location
                                    </label>

                                    <div class="sm:col-span-7">
                                        <select id="technician-location"
                                            class="w-full rounded-xl bg-primary-100 text-primary-900 px-4 py-3 outline-none ring-2 ring-transparent focus:ring-primary-500"
                                            :value="state.selectedLocationCode"
                                            @change="locationChanged(($event.target && $event.target.value) || '')"
                                            autocomplete="off">
                                            <option value="" disabled>Select a Location</option>
                                            <option v-for="loc in state.locationList" :key="loc.locationCode"
                                                :value="loc.locationCode">
                                                {{ loc.description }}
                                            </option>
                                        </select>

                                        <p class="mt-2 text-sm text-primary-100/70">
                                            Choose the salon/spa location where your technician works.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- STEP 1 -->
                            <div v-show="state.step === 1" class="mt-6">
                                <h3 class="text-lg sm:text-xl font-semibold text-center">Technician Type</h3>

                                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label
                                        class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 cursor-pointer">
                                        <input type="radio" name="technicianType" value="H"
                                            class="h-5 w-5 accent-primary-500" v-model="state.technicianType"
                                            @change="getTechnicians" />
                                        <span class="select-none text-base sm:text-lg">Hair Stylist</span>
                                    </label>

                                    <label
                                        class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 cursor-pointer">
                                        <input type="radio" name="technicianType" value="S"
                                            class="h-5 w-5 accent-primary-500" v-model="state.technicianType"
                                            @change="getTechnicians" />
                                        <span class="select-none text-base sm:text-lg">Spa Technician</span>
                                    </label>
                                </div>

                                <div class="mt-6 flex justify-end">
                                    <button type="button"
                                        class="rounded-full bg-primary-100 text-primary-900 px-6 py-3 font-semibold uppercase hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        @click="state.step = 0">
                                        Back
                                    </button>
                                </div>
                            </div>

                            <!-- STEP 2 -->
                            <div v-show="state.step === 2" class="mt-6">
                                <div class="flex flex-col items-center">
                                    <label for="technician" class="sr-only">Select a technician</label>

                                    <select id="technician"
                                        class="w-full sm:w-2/3 rounded-xl bg-primary-100 text-primary-900 px-4 py-3 outline-none ring-2 ring-transparent focus:ring-primary-500"
                                        v-model.number="state.selectedTechnicianId">
                                        <option :value="0" disabled>Select a technician</option>
                                        <option v-for="tech in state.technicianList" :key="tech.techId"
                                            :value="tech.techId">
                                            {{ tech.technicianName }}
                                        </option>
                                    </select>

                                    <div class="mt-6 w-full flex items-center justify-between gap-3">
                                        <button type="button"
                                            class="rounded-full bg-white/10 px-6 py-3 font-semibold uppercase hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            @click="backToTechnicianType">
                                            Back
                                        </button>

                                        <button type="button"
                                            class="rounded-full bg-primary-500 text-primary-900 px-6 py-3 font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-100"
                                            :disabled="state.selectedTechnicianId === 0" @click="complete">
                                            Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-end gap-3 border-t border-white/10 p-4 sm:p-5">
                            <button type="button"
                                class="rounded-full bg-white/10 px-6 py-3 font-semibold uppercase hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                @click="cancel">
                                Cancel
                            </button>
                        </div>

                        <!-- Close -->
                        <button type="button"
                            class="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            @click="cancel" aria-label="Close dialog">
                            <span aria-hidden="true" class="text-2xl leading-none">&times;</span>
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from "vue";

const props = defineProps({
    modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const { getLocationListLite, getTechniciansForWebRetailLink } = useKhsds();

const panelRef = ref(null);

const state = reactive({
    step: 0,
    selectedLocationCode: "",
    technicianType: "",
    technicianList: [],
    selectedTechnicianId: 0,
    locationList: [],
});

const visible = computed({
    get: () => props.modelValue === true,
    set: (v) => emit("update:modelValue", v === true),
});

const stepLabel = computed(() => {
    if (state.step === 0) return "Choose location";
    if (state.step === 1) return "Choose technician type";
    return "Choose technician";
});

watch(
    () => visible.value,
    async (isOpen) => {
        if (!isOpen) return;

        state.step = 0;
        state.selectedLocationCode = "";
        state.technicianType = "";
        state.technicianList = [];
        state.selectedTechnicianId = 0;

        // Load locations on open (safe)
        try {
            const locs = await getLocationListLite(false, false);
            state.locationList = Array.isArray(locs) ? locs : [];
        } catch {
            state.locationList = [];
        }

        nextTick(() => panelRef.value?.focus?.());
    }
);

function locationChanged(locationCode) {
    state.selectedLocationCode = String(locationCode || "");
    state.step = 1;
}

function backToTechnicianType() {
    state.technicianType = "";
    state.step = 1;
}

async function getTechnicians() {
    if (!state.technicianType || !state.selectedLocationCode) return;

    try {
        const techs = await getTechniciansForWebRetailLink(state.selectedLocationCode, state.technicianType);
        state.technicianList = Array.isArray(techs) ? techs : [];
    } catch {
        state.technicianList = [];
    }

    state.selectedTechnicianId = 0;
    state.step = 2;
}

function complete() {
    const t = state.technicianList.find((x) => x.techId === state.selectedTechnicianId);

    if (!t) return;

    // Normalize what we emit so [groupDescription].vue always gets the expected shape
    const payload = {
        techId: t.techId ?? 0,
        technicianCode: t.technicianCode ?? "",
        technicianName: t.technicianName ?? "",
        technicianType: t.technicianType ?? "",
    };

    emit("confirm", payload);

    // Close via v-model
    visible.value = false;
}

function cancel() {
    visible.value = false;
    emit("cancel");
}

function onBackdrop() {
    cancel();
}
</script>
