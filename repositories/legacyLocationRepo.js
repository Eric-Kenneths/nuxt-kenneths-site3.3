import { apiRequest } from '@/api/apiClient'

// Kenneths-API-9 location lookup. Legacy: remove when locations move to Salon-API-10.
export function legacyLocationRepo() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.legacyApiBaseUrl}/khsds`

  // Returns { location } with extendedDescription and the hasStylist/hasNailTech/... service flags.
  async function getLocation(locationCode) {
    return await apiRequest(
      `${baseUrl}/Location/${encodeURIComponent(String(locationCode).trim())}`,
      { method: 'GET' },
      'legacyLocationRepo.getLocation',
    )
  }

  return { getLocation }
}
