import { apiRequest } from '@/api/apiClient'

// Neighborhood (geo stack) pages in Salon-API-10 (MarketingController). Anonymous and read-only.
export function geoStackPageRepo() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.salonApiBaseUrl}/Marketing`

  // Every published page, with full HTML.
  async function getGeoStackPages() {
    return await apiRequest(`${baseUrl}/GeoStackPages`, { method: 'GET' }, 'geoStackPageRepo.getGeoStackPages')
  }

  // Returns { geoStackPage, location, gmbUrl, locationRoute }. Unknown routes answer 404.
  async function getGeoStackPage(pointOfInterestRoute) {
    return await apiRequest(
      `${baseUrl}/GeoStackPage/PointOfInterestRoute/${encodeURIComponent(String(pointOfInterestRoute).trim())}`,
      { method: 'GET' },
      'geoStackPageRepo.getGeoStackPage',
    )
  }

  return { getGeoStackPages, getGeoStackPage }
}
