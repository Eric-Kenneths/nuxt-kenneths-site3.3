
<template>
    <Badge
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Badge>
</template>

<script setup lang="ts">
import Badge, { type BadgePassThroughOptions, type BadgeProps } from 'primevue/badge';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ BadgeProps {}
defineProps<Props>();

const theme = ref<BadgePassThroughOptions>({
    root: `inline-flex items-center justify-center rounded-md
        py-0 px-2 text-xs font-bold min-w-6 h-6
        bg-primary text-primary-contrast
        p-empty:min-w-2 p-empty:h-2 p-empty:rounded-full p-empty:p-0
        p-circle:p-0 p-circle:rounded-full
        p-secondary:bg-surface-100 p-secondary:text-surface-600
        p-success:bg-green-500 p-success:text-white
        p-info:bg-sky-500 p-info:text-white
        p-contrast:bg-surface-950 p-contrast:text-white
        p-small:text-[0.625rem] p-small:min-w-5 p-small:h-5
        p-large:text-sm p-large:min-w-7 p-large:h-7
        p-xlarge:text-base p-xlarge:min-w-8 p-xlarge:h-8`
});
</script>
