# 05_PINIA_PATTERNS

Adapted from `kenfo4/src/stores/`. The Nuxt difference: stores run on the server per request, so state must be created inside `state()`.

## Pattern

```js
import { defineStore } from 'pinia'
import { locationRepo } from '@/repositories/locationRepo'

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [],
    selectedLocation: null,
    loading: false,
    errorMessage: '',
  }),

  getters: {
    hasLocations: (state) => state.locations.length > 0,
  },

  actions: {
    async loadLocations() {
      this.loading = true
      this.errorMessage = ''
      try {
        this.locations = await locationRepo().getLocations()
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
```

## Using A Store In An Indexed Page

```js
const store = useLocationStore()
await useAsyncData('locations', () => store.loadLocations())
```

The page renders from `store.locations`. Pinia state is serialized into the payload, so the client does not refetch.

## App Store

`stores/global/appStore.js` is the site's own (not kenfo4's). It holds the API base URLs, Zenoti links and the center list only. No `loading` flag.

## Rules

- State is a function. No module-level state.
- One store per feature, id short and lowercase.
- Stores call repositories; they do not call `fetch`.
- Per-store `loading` and `errorMessage`; actions re-throw.
- Do not duplicate loaded data across stores.
- The legacy `*Global.js` composables are replaced area by area, not rewritten in place.
