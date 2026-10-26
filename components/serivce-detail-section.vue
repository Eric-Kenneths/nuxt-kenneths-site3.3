<template>
    <!-- HERO: Video background with layered text and bottom-right image -->
    <div class="relative flex flex-col items-center justify-center w-full overflow-hidden text-primary-100 py-12">
        <!-- Background Icon -->
        <img src="/images/icons/k-icon-light.webp" alt="" role="presentation"
            class="absolute -top-35 -left-10 w-auto h-[250%] z-0 pointer-events-none opacity-30" />

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center text-center">
            <h1 class="text-4xl lg:text-6xl uppercase">Cuts + Styles</h1>
            <div>
                <a :href="serviceData.allServicesLink"
                    class="mt-4 hover:text-p-primary-500 text-xl underline underline-offset-4 transition uppercase">
                    {{ serviceData.allServicesText }}
                </a>
            </div>
        </div>
    </div>

</template>

<script setup>

    const props = defineProps({
        subType: {
            type: String,
            required: true
        }
    })


    const serviceData = ref({
        allServicesText: '',
        allServicesLink: ''
    }); 

    watch(() => props.subType, (newValue, oldValue) => {
        console.log('SubType changed from', oldValue, 'to', newValue)
        
        
        // You can call functions, make API calls, etc.
        getServiceData(newValue)
    }, { immediate: true }) // immediate: true runs the watcher on component mount


    function getServiceData(params) {

        serviceData.value.allServicesText = 'See All Hair Services'
        serviceData.value.allServicesLink = '/services/hair'
    }
</script>

<style scoped>
</style>