import { apiRequest } from '@/api/apiClient'

// Supporting stack pages (service articles) in Salon-API-10 (MarketingController).
// Anonymous and read-only.
export function supportingStackPageRepo() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.salonApiBaseUrl}/Marketing`

  // Returns the page with supportingFAQs and supportingStackLinks. A stackPageRoute ending in
  // '-test' returns the unpublished draft. Unknown routes answer 404.
  async function getSupportingStackPage(serviceTypeRoute, stackPageRoute) {
    return await apiRequest(
      `${baseUrl}/SupportingStackPage/${encodeURIComponent(String(serviceTypeRoute).trim())}/${encodeURIComponent(String(stackPageRoute).trim())}`,
      { method: 'GET' },
      'supportingStackPageRepo.getSupportingStackPage',
    )
  }

  // Every published page.
  async function getSupportingStackPages() {
    return await apiRequest(
      `${baseUrl}/SupportingStackPages`,
      { method: 'GET' },
      'supportingStackPageRepo.getSupportingStackPages',
    )
  }

  return { getSupportingStackPage, getSupportingStackPages }
}
