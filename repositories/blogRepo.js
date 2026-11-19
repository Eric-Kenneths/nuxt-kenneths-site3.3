import { apiRequest } from '@/api/apiClient'

// Blog endpoints in Salon-API-10 (MarketingController). Anonymous and read-only.
export function blogRepo() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.salonApiBaseUrl}/Marketing`

  // Published posts, newest first.
  async function getBlogHeaders() {
    return await apiRequest(`${baseUrl}/BlogHeaders`, { method: 'GET' }, 'blogRepo.getBlogHeaders')
  }

  // postGroup 'featured' returns the 5 newest posts across all groups.
  async function getBlogHeadersByPostGroup(postGroup) {
    return await apiRequest(
      `${baseUrl}/BlogHeaders/PostGroup/${encodeURIComponent(String(postGroup).trim())}`,
      { method: 'GET' },
      'blogRepo.getBlogHeadersByPostGroup',
    )
  }

  // A route ending in '-test' returns the unpublished draft. Unknown routes answer 404.
  async function getBlogPost(routeName) {
    return await apiRequest(
      `${baseUrl}/BlogPost/RouteName/${encodeURIComponent(String(routeName).trim())}`,
      { method: 'GET' },
      'blogRepo.getBlogPost',
    )
  }

  return { getBlogHeaders, getBlogHeadersByPostGroup, getBlogPost }
}
