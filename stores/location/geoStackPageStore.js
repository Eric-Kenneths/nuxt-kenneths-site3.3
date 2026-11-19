import { defineStore } from 'pinia'
import { geoStackPageRepo } from '@/repositories/geoStackPageRepo'
import { legacyLocationRepo } from '@/repositories/legacyLocationRepo'

export const useGeoStackPageStore = defineStore('geoStackPage', {
  state: () => ({
    pages: [],
    // { geoStackPage, location, gmbUrl, locationRoute } from Salon-API-10
    page: null,
    // Legacy location record: extendedDescription and the service flags, which Salon's center lacks.
    legacyLocation: null,
    loading: false,
    errorMessage: '',
  }),

  actions: {
    async loadGeoStackPages() {
      this.loading = true
      this.errorMessage = ''
      try {
        // The API returns full HTML for every page; keep only the fields the link lists need so the
        // server-rendered payload stays small.
        const pages = await geoStackPageRepo().getGeoStackPages()
        this.pages = pages.map(({ geoStackPageId, locationRoute, pointOfInterestRoute, locationCode, placeName, title, createdUtc, updatedUtc }) => ({
          geoStackPageId, locationRoute, pointOfInterestRoute, locationCode, placeName, title, createdUtc, updatedUtc,
        }))
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // A missing page throws an error with status 404; the page decides how to show it.
    // Also loads the legacy location record for the page's center. That lookup never fails the
    // page: without it the page falls back to Salon's center fields.
    async loadGeoStackPage(pointOfInterestRoute) {
      // Repositories read runtimeConfig, which is only available before the first await.
      const pageRepo = geoStackPageRepo()
      const locationRepo = legacyLocationRepo()

      this.loading = true
      this.errorMessage = ''
      this.page = null
      this.legacyLocation = null
      try {
        this.page = await pageRepo.getGeoStackPage(pointOfInterestRoute)
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }

      const locationCode = this.page?.geoStackPage?.locationCode
      if (locationCode) {
        try {
          const response = await locationRepo.getLocation(locationCode)
          this.legacyLocation = response?.location ?? null
        } catch (error) {
          this.errorMessage = error.message
        }
      }
    },
  },
})
