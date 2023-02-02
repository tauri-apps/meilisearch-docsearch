# meilisearch-docsearch

A quick search component for meilisearch, inspired by algolia/docsearch.

# Screenshots

| light                                                                                              | dark                                                                                             |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![light](https://github.com/tauri-apps/meilisearch-docsearch/raw/dev/.github/screenshot-light.png) | ![dark](https://github.com/tauri-apps/meilisearch-docsearch/raw/dev/.github/screenshot-dark.png) |


# Usage
## Installation
```
yarn add meilisearch-docsearch
# or
npm install meilisearch-docsearch
# or
pnpm add meilisearch-docsearch
```

## Javascript
### Get started

To get started, you need a container for your `DocSearch` component to go in. If you don’t have one already, you can insert one into your markup:
```html
<div id="docsearch"></div>
```

Then, insert `DocSearch` into it by calling the `docsearch` function and providing the container. It can be a [CSS selector](https://developer.mozilla.org/en-US/docs/web/css/css_selectors) or an [Element](https://developer.mozilla.org/en-us/docs/web/api/htmlelement).

Make sure to provide a `container` (for example, a `div`), not an `input`. `DocSearch` generates a fully accessible search box for you.
```js
import { docsearch } from 'meilisearch-docsearch/js';
import 'meilisearch-docsearch/css';

docsearch({
  container: '#docsearch',
  host: 'YOUR_HOST_URL',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexUid: 'YOUR_INDEX_UID',
});
```

## SolidJS

`DocSearch` generates a fully accessible search box for you.

```js
import { DocSearch } from 'meilisearch-docsearch/solid';
import 'meilisearch-docsearch/css';

function App() {
  return (
    <DocSearch
      host='YOUR_HOST_URL'
      apiKey='YOUR_SEARCH_API_KEY'
      indexUid='YOUR_INDEX_UID'
    />
  );
}

export default App;
```

# Styling

All styles are included in the package as:
- One big file:
  - ```js
    import 'meilisearch-docsearch/css'
    ```
- Invidual small files:
  - ```js
    import 'meilisearch-docsearch/css/variables'
    ```
  - ```js
    import 'meilisearch-docsearch/css/button'
    ```
  - ```js
    import 'meilisearch-docsearch/css/modal'
    ```

# Acknowledgement

This project is inspired by [`aloglica/docsearch`](https://github.com/algolia/docsearch/) and [`meilisearch/docs-searchbar.js`](https://github.com/meilisearch/docs-searchbar.js/)

# LICENSE

MIT or MIT/Apache 2.0 where applicable.
