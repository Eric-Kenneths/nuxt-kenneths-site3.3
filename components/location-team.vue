<template>
  <section class="bg-primary-100 text-primary-900 py-10">
    <!-- Section Title -->
    <div class="px-5 md:px-10 text-center mx-auto">
      <p class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light uppercase">
        {{ title }}
      </p>
    </div>

    <!-- Technician Type Select -->
    <div class="px-5 pt-3 md:px-10 text-center mx-auto">
      Showing for
      <Select
        v-model="technicianType"
        :options="technicianTypes"
        optionValue="technicianType"
        optionLabel="description"
        class="md:text-xl w-full md:w-56"
      />
    </div>

<!-- Team Grid (Hair, Nail, Spa) -->
    <div v-if="filteredEmployees.length"
        class="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-5 md:px-10 transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: expanded ? '999999px' : '1300px' }">
        <div v-for="(employee, id) in filteredEmployees" :key="id"
            class="flex flex-col p-4 text-center justify-center items-center">
            <a :href="'/our-team/profile/' + employee.city + '/' + employee.emalias.toLowerCase()">
              <img class="h-45 w-40 md:h-90 md:w-80 object-cover" loading="lazy"
                  :src="'https://kenneths.com/static/team-photo/' + employee.photoName" :alt="employee.emalias" />
            </a>
            <h3 class="text-lg md:text-xl uppercase mt-3">{{ employee.emalias }}</h3>
            <p>{{ employee.technicianTypeDescription }}</p>
            <div class="text-sm md:text-base h-5">{{ employee.priceLevelDescription }}</div>

            <a :href="'/our-team/profile/' + employee.city + '/' + employee.emalias.toLowerCase()" class="mt-2 px-3 md:px-5 py-2 lg:ml-0 text-sm md:text-base cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis border border-primary-500 whitespace-nowrap">Learn More About {{ employee.emalias }}</a>
        </div>
    </div>

    <!-- Expand / Collapse Button -->
    <div class="text-center mt-10" v-if="filteredEmployees.length > 8">
      <Button
        @click="expanded = !expanded"
        class="uppercase bg-primary-900 !text-primary-100 !hover:bg-primary-500 px-10"
      >
        {{ expanded ? 'Show Less' : 'See All Team Members' }}
      </Button>
    </div>
  </section>
</template>

<script setup>
import Select from '@/volt/Select.vue';
import Button from '@/volt/Button.vue';

const props = defineProps({
  title: String,
  employees: Object,
  technicianTypes: Array
});

const technicianType = ref('hair');
const expanded = ref(false);

const filteredEmployees = computed(() => {
  if (technicianType.value === 'hair') return props.employees.hair || [];
  if (technicianType.value === 'nail') return props.employees.nail || [];
  if (technicianType.value === 'spa') return props.employees.spa || [];
  return [];
});
</script>

<style scoped>
/* Smooth collapse transition */
.grid {
  transition: max-height 0.6s ease;
}
</style>
