import { defineStore } from 'pinia'
import { supportingStackPageRepo } from '@/repositories/supportingStackPageRepo'

export const useSupportingStackPageStore = defineStore('supportingStackPage', {
  state: () => ({
    page: null,
    pages: [],
    loading: false,
    errorMessage: '',
  }),

  actions: {
    // A missing page throws an error with status 404; the page decides how to show it.
    async loadSupportingStackPage(serviceTypeRoute, stackPageRoute) {
      this.loading = true
      this.errorMessage = ''
      this.page = null
      try {
        this.page = await supportingStackPageRepo().getSupportingStackPage(serviceTypeRoute, stackPageRoute)
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async loadSupportingStackPages() {
      this.loading = true
      this.errorMessage = ''
      try {
        // The API returns full HTML for every page; keep only the fields link lists and the sitemap
        // need so the server-rendered payload stays small.
        const pages = await supportingStackPageRepo().getSupportingStackPages()
        this.pages = pages.map(({ supportingStackPageId, serviceCategory, serviceTypeRoute, stackPageRoute, title, linkDescription, createdUtc, updatedUtc }) => ({
          supportingStackPageId, serviceCategory, serviceTypeRoute, stackPageRoute, title, linkDescription, createdUtc, updatedUtc,
        }))
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
