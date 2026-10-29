# 02_NAMING_CONVENTIONS

Mirrors `kenfo4` where it applies; Nuxt routing rules win where they conflict.

## Files

- Nuxt pages follow Nuxt routing names (`[param].vue`, `index.vue`). Keep existing route file names; renaming a page file changes its URL.
- Components: existing files are kebab-case (`book-section.vue`). Keep the existing style in a folder; new components in a migrated area use PascalCase like kenfo4 (`LocationHero.vue`). Do not rename existing components just for style.
- JavaScript modules (`apiClient.js`, `locationRepo.js`, `locationStore.js`): camelCase.
- Folders: lowercase.

## Stores

- File ends in `Store.js`; composable is `useXStore`; store id short and lowercase.

```js
defineStore('location', {})   // useLocationStore, locationStore.js
```

## Repositories

- File ends in `Repo.js`; factory function matches the file name (`locationRepo()`).
- Method names describe the API operation: `getLocation(route)`, `getLocations()`, `getBlogPosts(...)`.
- Store actions describe workflows: `loadLocations()`, `loadLocation(route)`.

## Error Source Strings

Pass `'<repoName>.<method>'` to `apiRequest`, e.g. `'locationRepo.getLocation'`.

## Routes

Public URLs are lowercase, hyphenated and stable. A middleware already 301-redirects uppercase paths. Never change a published URL without adding a 301 in `routeRules`.

## API Field Names

Match backend ViewModel JSON names (camelCase). Do not rename fields in the frontend.

## Database Naming (for requests to the API team)

Salon schemas: `website` for site content, `marketing` for sliders and social reviews, `product` for products, `master` for synced reference data. Use names like `Product`, `ProductWeb` — not `Item`.

## Docs

`docs/ai` files stay numbered and uppercase. Do not add unnumbered duplicates.
