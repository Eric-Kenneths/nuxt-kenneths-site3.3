import { useGeoStackPageStore } from '~/stores/location/geoStackPageStore'

/*
 * Published neighborhood (geo stack) pages for one location, for the links in the
 * location page's stack section.
 *
 * Salon-API-10 returns every location's pages with full HTML, so only the fields the
 * list needs are kept. Sorted by article title, which is also the link text.
 */
export async function useLocationStackPages(locationRoute) {
    const geoStackPageStore = useGeoStackPageStore()

    await useAsyncData('geo-stack-pages', async () => {
        await geoStackPageStore.loadGeoStackPages()
        return true
    })

    return computed(() => (geoStackPageStore.pages ?? [])
        .filter(page => page.locationRoute === locationRoute && page.pointOfInterestRoute)
        .map(({ locationRoute, pointOfInterestRoute, placeName, title }) => ({
            locationRoute, pointOfInterestRoute, placeName, title
        }))
        .sort((a, b) => (a.title || a.placeName || '').localeCompare(b.title || b.placeName || '')))
}
