import { defineStore } from 'pinia'
import { blogRepo } from '@/repositories/blogRepo'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    headers: [],
    // Header lists by post group (hair, skin, nails, products, news, featured).
    headersByPostGroup: {},
    post: null,
    loading: false,
    errorMessage: '',
  }),

  actions: {
    async loadHeaders() {
      this.loading = true
      this.errorMessage = ''
      try {
        this.headers = await blogRepo().getBlogHeaders()
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async loadHeadersByPostGroup(postGroup) {
      this.loading = true
      this.errorMessage = ''
      try {
        this.headersByPostGroup[postGroup] = await blogRepo().getBlogHeadersByPostGroup(postGroup)
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // A missing post throws an error with status 404; the page decides how to show it.
    async loadPost(routeName) {
      this.loading = true
      this.errorMessage = ''
      this.post = null
      try {
        this.post = await blogRepo().getBlogPost(routeName)
      } catch (error) {
        this.errorMessage = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
