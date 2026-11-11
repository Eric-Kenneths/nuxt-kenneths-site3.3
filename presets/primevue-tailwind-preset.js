// The one PrimeVue preset for the site. Classes are copied from the former volt/ wrappers
// so brand colors and shapes do not change. Components are added here as they move off volt/.
// Tailwind variants like p-small: / p-icon-only: come from the tailwindcss-primeui plugin.

const PrimeVueTailwindPreset = {
  button: {
    root: `inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
        px-3 py-2 gap-2 rounded-3xl disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
        bg-primary-100 enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-900
        border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
        p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
        p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
        p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
        p-raised:shadow-sm p-rounded:rounded-[2rem]
        p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
        p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
        p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
        p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
        p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
        p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
    `,
    loadingIcon: ``,
    icon: `p-right:order-1 p-bottom:order-2`,
    label: `font-medium p-icon-only:invisible p-icon-only:w-0
        p-small:text-sm p-large:text-[1.125rem]`,
    pcBadge: {
      root: `min-w-4 h-4 leading-4 bg-primary-contrast rounded-full text-primary text-xs font-bold`
    }
  },
  accordion: {
    root: ``
  },
  accordionpanel: {
    root: `flex flex-col border-b border-surface-400`
  },
  accordionheader: {
    root: `cursor-pointer disabled:pointer-events-none disabled:opacity-60 flex items-center justify-between p-[1.125rem] font-semibold
        bg-primary-100
        text-surface-500
        hover:text-surface-700
        p-active:text-surface-700
        transition-colors duration-200
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-primary`
  },
  accordioncontent: {
    root: `flex flex-col`,
    content: `bg-primary-100 text-surface-700 pt-0 px-[1.125rem] pb-[1.125rem]`,
    transition: {
      enterFromClass: 'max-h-0',
      enterActiveClass: 'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
      enterToClass: 'max-h-[1000px]',
      leaveFromClass: 'max-h-[1000px]',
      leaveActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
      leaveToClass: 'max-h-0'
    }
  },
  dialog: {
    root: `max-h-[90%] max-w-screen rounded-xl
        border border-surface-200
        bg-surface-0
        text-surface-700 shadow-lg
        p-maximized:w-screen p-maximized:h-screen p-maximized:top-0 p-maximized:start-0 p-maximized:max-h-full p-maximized:rounded-none`,
    header: `flex items-center justify-between shrink-0 p-5`,
    title: `font-semibold text-xl`,
    headerActions: `flex items-center gap-2`,
    content: `overflow-y-auto pt-0 px-5 pb-5 p-maximized:grow`,
    footer: `shrink-0 pt-0 px-5 pb-5 flex justify-end gap-2`,
    mask: `p-modal:bg-black/50 p-modal:fixed p-modal:top-0 p-modal:start-0 p-modal:w-full p-modal:h-full`,
    transition: {
      enterFromClass: 'opacity-0 scale-75',
      enterActiveClass: 'transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]',
      leaveActiveClass: 'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
      leaveToClass: 'opacity-0 scale-75'
    }
  }
}

export default PrimeVueTailwindPreset
