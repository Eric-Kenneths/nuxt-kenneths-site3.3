import { defineStore } from 'pinia'

// App-wide configuration: API base URLs and Zenoti links, all from runtimeConfig.
// Holds no per-visitor data, so it is safe for server rendering.
export const useAppStore = defineStore('app', () => {
  const config = useRuntimeConfig().public

  const salonApiBaseUrl = computed(() => config.salonApiBaseUrl)
  const legacyApiBaseUrl = computed(() => config.legacyApiBaseUrl)
  const zenotiServicesUrl = computed(() => config.zenoti.servicesUrl)
  const zenotiGiftCardsUrl = computed(() => config.zenoti.giftCardsUrl)

  // Optional query string (e.g. '?s=HC&fl=PL') is appended unchanged. Zenoti does not
  // read these codes yet; they are kept so they work if Zenoti adds support.
  function bookUrl(query = '') {
    const base = zenotiServicesUrl.value
    if (!query) return base
    const q = query.startsWith('?') ? query.slice(1) : query
    return base + (base.includes('?') ? '&' : '?') + q
  }

  function giftCardsUrl() {
    return zenotiGiftCardsUrl.value
  }

  return {
    salonApiBaseUrl,
    legacyApiBaseUrl,
    zenotiServicesUrl,
    zenotiGiftCardsUrl,
    bookUrl,
    giftCardsUrl
  }
})
