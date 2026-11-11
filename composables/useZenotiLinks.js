// Zenoti booking and gift card links, read from runtimeConfig.
// No module-level state: safe for server rendering. Phase 2 moves these into appStore.
export function useZenotiLinks() {
  const { zenoti } = useRuntimeConfig().public;

  // Optional query string (e.g. '?s=HC&fl=PL') is appended unchanged. Zenoti does not
  // read these codes yet; they are kept so they work if Zenoti adds support.
  const withQuery = (baseUrl, query = '') => {
    if (!query) return baseUrl;
    const q = query.startsWith('?') ? query.slice(1) : query;
    return baseUrl + (baseUrl.includes('?') ? '&' : '?') + q;
  };

  const bookUrl = (query = '') => withQuery(zenoti.servicesUrl, query);
  const giftCardsUrl = () => zenoti.giftCardsUrl;

  return { bookUrl, giftCardsUrl };
}
