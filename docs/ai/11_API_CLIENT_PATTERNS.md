# 11_API_CLIENT_PATTERNS

One shared client, modeled on `kenfo4/src/api/apiClient.js` but **not a copy**.

## Differences From kenfo4

| kenfo4 | This site |
| --- | --- |
| Reads bearer token from `authStore` | No login, no token, no `Authorization` header |
| 401 clears auth and routes to login | No 401 handling |
| Imports the router at module level | No router import (breaks SSR) |
| Toggles global `appStore.loading` | No global loading; stores keep their own |
| Download helper for reports | Not needed |

## Contract

```js
getHeaders()                         // { 'Content-Type': 'application/json' }
handleResponse(response, source)     // parse JSON, throw Error with status/body/source on !ok
apiRequest(url, options, source)     // fetch + handleResponse
```

- Use the global `fetch`/`$fetch` that works on both server and client.
- URLs come from repositories, built from `runtimeConfig`.
- Do not create a second client. Legacy areas use this client with the legacy base URL until they are migrated.
- The client has no environment awareness; stage/production is a deployment setting.

## Server Routes

`server/` routes cannot use Pinia. They call the API with `$fetch` and the same runtime-config URLs.
