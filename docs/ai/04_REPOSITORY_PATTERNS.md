# 04_REPOSITORY_PATTERNS

Adapted from `kenfo4/src/repositories/`. Repositories wrap API endpoints and nothing else.

## Pattern

```js
import { apiRequest } from '@/api/apiClient'

export function locationRepo() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.salonApiBaseUrl}/Website`

  async function getLocations() {
    return await apiRequest(`${baseUrl}/Locations`, { method: 'GET' }, 'locationRepo.getLocations')
  }

  async function getLocation(route) {
    return await apiRequest(
      `${baseUrl}/Locations/${encodeURIComponent(route)}`,
      { method: 'GET' },
      'locationRepo.getLocation',
    )
  }

  return { getLocations, getLocation }
}
```

## Rules

- One repo per API resource, factory function named like the file.
- Build URLs from `runtimeConfig`, never literals.
- No auth headers; the public site has no login. Website endpoints are anonymous and read-only.
- Encode path segments and build query strings with `URLSearchParams`.
- Pass `'<repo>.<method>'` as the error source.
- No state, no UI code, no caching in repositories (caching is server-side `routeRules` and API cache).
- Legacy repos (retail, quiz, pricing) point at the legacy base URL.
- Route values from the database can carry stray spaces; trim in the API or the repo, not the page.

## Search Methods

Name `search<Entity>s(searchTerm, ...filters)` and match the backend route.
