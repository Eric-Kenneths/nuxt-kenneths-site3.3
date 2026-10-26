<template>
    <div class="bg-primary-700">


        <div class="m-0 p-0">
            <h1 class="font-bold underline">
                Hello world!

            </h1>
        </div>
        <div class="m-5 mt-20">
            <InputText size="normal" class="rounded-3xl!" />
        </div>
        <div class="m-5">
            <Button label="Submit now" @click="submit" />
        </div>
        <div class="m-5">
            <Checkbox binary />
        </div>

<div class="card flex justify-center">
        <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
    </div>


        <div class="m-5">
            <Popover ref="op">
                <div class="m-5">
                    <div>
                        Are you sure you want to cancel your appointment?
                    </div>
                    <div>
                        <Button label="Yes" @click="confirm('cancel appointment', 'Y')" />
                        <Button class="ml-3 text-right" label="No" @click="confirm('cancel appointment', 'N')" />
                    </div>
                </div>
            </Popover>
            <Button label="Pop" @click="toggle" />
        </div>
        <div class="m-5">
            <Accordion value="0">
                <AccordionPanel value="0">
                    <AccordionHeader>Header I</AccordionHeader>
                    <AccordionContent>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.
                        </p>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                    <AccordionHeader>Header II</AccordionHeader>
                    <AccordionContent>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo. Nemo enim
                            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                            magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed
                            quia non numquam eius modi.
                        </p>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                    <AccordionHeader>Header III</AccordionHeader>
                    <AccordionContent>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa
                            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                            facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                            cumque nihil impedit quo minus.
                        </p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
        <div>
            <br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test
        </div>
    </div>
</template>

<script setup>
import Button from '@/volt/Button.vue';
import Checkbox from '@/volt/Checkbox.vue';
import InputText from '@/volt/InputText.vue';
import Accordion from '@/volt/Accordion.vue';
import AccordionPanel from '@/volt/AccordionPanel.vue';
import AccordionHeader from '@/volt/AccordionHeader.vue';
import AccordionContent from '@/volt/AccordionContent.vue';
import Popover from '@/volt/Popover.vue';
import Select from '@/volt/Select.vue';

import { useToast } from 'primevue/usetoast';


useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const toast = useToast();

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
};


const selectedCity = ref(null);
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);


    // watch(() => props.subType, (newValue, oldValue) => {
    //     console.log('SubType changed from', oldValue, 'to', newValue)
        
    //     // Do your work here when the prop changes
    //     processedData.value = `Processed: ${newValue.toUpperCase()}`
        
    //     // You can call functions, make API calls, etc.
    //     performWork(newValue)
    // }, { immediate: true }) // immediate: true runs the watcher on component mount


function confirm(type, answer) {

    if (type === 'cancel appointment') {
        if (answer === 'Y') {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Yes', life: 3500 })
        } else { //N for No
            toast.add({ severity: 'success', summary: 'Success', detail: 'No', life: 3500 })
        }
    }

    toggle();
}


function submit() {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Submit test', life: 3500 })


    // try {
    //     x = 1;
    // } catch (err) {
    //     console.log(err)
    //     throw showError(err)
    // }



    // throw showError({
    //     statusCode: 404,
    //     statusMessage: 'Page Not Found2',
    //     })

}
</script>

<style scoped></style>