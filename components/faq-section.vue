<template>
    <div class="bg-primary-100 text-primary-900 py-5">
        <h2 class="k-section-title pt-5 pb-5 text-center">Frequently Asked Questions</h2>
        <div class="max-w-2xl mx-auto">

            <!-- Volt Accordion -->
            <Accordion type="single" collapsible class="w-full">
                <AccordionPanel v-for="(faq, index) in faqData" :key="index" :value="`faq-${index}`"
                    class="border-t-2 border-primary-900">
                    <AccordionHeader class="text-left"> {{ faq.faqQuestion }}</AccordionHeader>
                    <AccordionContent>
                        <p class="pt-2">{{ faq.faqAnswer }}</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
        <div class="pt-7 pb-5 k-section-link text-center">Still have questions? <a href="/contact-us"
                class="underline underline-offset-4">Get in touch</a> </div>

    </div>
</template>

<script setup>
import Accordion from '@/volt/Accordion.vue';
import AccordionPanel from '@/volt/AccordionPanel.vue';
import AccordionHeader from '@/volt/AccordionHeader.vue';
import AccordionContent from '@/volt/AccordionContent.vue';

const { faqData } = defineProps(["faq-data"]);
</script>

<style scoped></style>