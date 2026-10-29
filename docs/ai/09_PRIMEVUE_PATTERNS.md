# 09_PRIMEVUE_PATTERNS

## Target

PrimeVue in unstyled mode with one shared preset at `presets/primevue-tailwind-preset.js`, installed through the Nuxt PrimeVue module. Do not switch to styled mode.

## Today

`volt/` holds ~22 copied wrapper components with Tailwind classes in each (`Button`, `Dialog`, `Select`, ...). About 53 pages and components import them. Volt and the preset can coexist during conversion.

## Conversion Rules

- Convert only the components the site actually uses. Do not port kenfo4's full preset.
- `kenfo4`'s preset is an admin-app look. Use it as a structure reference only.
- **Brand colors and shapes must not change.** Carry over the Volt classes (for example the Button's `rounded-3xl`, `bg-primary-100`, `border-primary`) into the preset.
- Verify visually against the live site after each component.
- Do not start conversion until booking and gift cards are removed, so fewer components are converted.
- Volt components not in kenfo4's preset today: Accordion (+ parts), Menu, Popover, ProgressBar, InputMask, Password. Add only those still used after removal.

## Rules

PrimeVue internal styling belongs in the preset. Pages/components keep layout, spacing, labels and behavior.
