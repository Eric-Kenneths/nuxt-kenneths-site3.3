<template>
    <Select unstyled :pt="theme" :ptOptions="{
        mergeProps: ptViewMerge
    }">
        <template #dropdownicon>
            <ChevronDownIcon />
        </template>
        <template #loadingicon>
            <SpinnerIcon class="animate-spin" />
        </template>
        <template #filtericon>
            <SearchIcon class="text-surface-400" />
        </template>
        <template #clearicon>
            <TimesIcon class="text-surface-400 absolute top-1/2 -mt-2 end-10" />
        </template>
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Select>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@primevue/icons/chevrondown';
import SearchIcon from '@primevue/icons/search';
import SpinnerIcon from '@primevue/icons/spinner';
import TimesIcon from '@primevue/icons/times';
import Select, { type SelectPassThroughOptions, type SelectProps } from 'primevue/select';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ SelectProps { }
defineProps<Props>();

const theme = ref<SelectPassThroughOptions>({
    root: `inline-flex cursor-pointer relative select-none rounded-3xl p-fluid:flex
        bg-primary-100
        border border-primary-500
        p-focus:bg-primary-100
        p-filled:bg-primary-100
        p-invalid:border-red-400
        p-disabled:bg-surface-200 p-disabled:text-surface-500 p-disabled:pointer-events-none
        shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        transition-colors duration-150`,
    label: `block whitespace-nowrap overflow-hidden flex-auto w-[1%]
        py-2 px-3 overflow-ellipsis 
        p-clearable:pe-7 p-empty:overflow-hidden p-empty:opacity-0 p-editable:cursor-default
        text-surface-700 bg-transparent border-none outline-none
        p-placeholder:text-primary-400
        p-disabled:text-surface-500
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]`,
    dropdown: `flex items-center justify-center shrink-0 px-2
        text-primary-900 w-10 rounded-2xl`,
    overlay: `absolute top-0 left-0 rounded-2xl mt-2 p-portal-self:min-w-full
        bg-primary-100
        text-surface-700
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    header: `pt-2 pb-1 px-4`,
    pcFilterContainer: {
        root: `relative`
    },
    pcFilter: {
        root: `w-full appearance-none rounded-2xl outline-hidden
            bg-primary-100
            text-primary-900
            placeholder:text-surface-500
            border bg-primary-500
            enabled:hover:bg-surface-400
            enabled:focus:border-primary
            disabled:bg-surface-200 disabled:text-surface-500
            ps-3 pe-10 py-2 p-fluid:w-full
            transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
    },
    pcFilterIconContainer: {
        root: `absolute top-1/2 -mt-2 leading-none end-3 z-1`
    },
    listContainer: `overflow-auto`,
    list: `m-0 p-1 list-none gap-[2px] flex flex-col`,
    optionGroup: `m-0 px-3 py-2 bg-primary-100 text-primary-900 font-semibold hover:bg-primary-100`,
    optionGroupLabel: ``,
    option: `cursor-pointer font-normal whitespace-nowrap relative overflow-hidden flex items-center
        px-3 py-2 border-none text-primary-900 bg-transparent rounded-2xl
        p-focus:bg-primary-100  p-focus:text-primary-emphasis
        p-selected:bg-highlight p-focus:p-selected:bg-highlight-emphasis
        transition-colors duration-200`,
    optionLabel: ``,
    optionCheckIcon: `relative -ms-[0.375rem] me-[0.375rem] text-surface-700`,
    optionBlankIcon: ``,
    emptyMessage: `px-3 py-2`,
    virtualScroller: ``,
    transition: {
        enterFromClass: 'transform opacity-0 scale-95',
        enterActiveClass: 'transition ease-out duration-100',
        leaveActiveClass: 'transition ease-in duration-75',
        leaveToClass: 'transform opacity-100 scale-100'
    }
});
</script>
