# meilisearch-docsearch

A quick search component for meilisearch, inspired by algolia/docsearch.

# Screenshots

| light                                                                                              | dark                                                                                             |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![light](https://github.com/tauri-apps/meilisearch-docsearch/raw/dev/.github/screenshot-light.png) | ![dark](https://github.com/tauri-apps/meilisearch-docsearch/raw/dev/.github/screenshot-dark.png) |

# Usage through NPM (Recommended)

### Installation

```sh
yarn add meilisearch-docsearch
# or
npm install meilisearch-docsearch
# or
pnpm add meilisearch-docsearch
```

### Javascript

To get started, you need a container for your `DocSearch` component to go in. If you don’t have one already, you can insert one into your markup:

```html
<div id="docsearch"></div>
```

Then, insert `DocSearch` into it by calling the `docsearch` function and providing the container. It can be a [CSS selector](https://developer.mozilla.org/en-US/docs/web/css/css_selectors) or an [Element](https://developer.mozilla.org/en-us/docs/web/api/htmlelement).

Make sure to provide a `container` (for example, a `div`), not an `input`. `DocSearch` generates a fully accessible search box for you.

```js
import { docsearch } from "meilisearch-docsearch";
import "meilisearch-docsearch/css";

docsearch({
  container: "#docsearch",
  host: "YOUR_HOST_URL",
  apiKey: "YOUR_SEARCH_API_KEY",
  indexUid: "YOUR_INDEX_UID",
});
```

### Styling

All styles are included in the package as:

- One big file:
  - ```js
    import "meilisearch-docsearch/css";
    ```
- Individual small files:
  - ```js
    import "meilisearch-docsearch/css/variables";
    ```
  - ```js
    import "meilisearch-docsearch/css/button";
    ```
  - ```js
    import "meilisearch-docsearch/css/modal";
    ```

## SolidJS

If you are using `solid-js`, you can import `DocSearch` component directely which generates a fully accessible search box for you.

```js
import { DocSearch } from "meilisearch-docsearch/solid";
import "meilisearch-docsearch/css";

function App() {
  return (
    <DocSearch
      host="YOUR_HOST_URL"
      apiKey="YOUR_SEARCH_API_KEY"
      indexUid="YOUR_INDEX_UID"
    />
  );
}

export default App;
```

# Usage through CDN

The package also contains a browser bundle and the necessary styles that could be pulled through a CDN like unpkg.com:

1. add a container

   ```html
   <div id="docsearch"></div>
   ```

2. import the js borwser bundle and initialize the component

   ```html
   <script src="https://unpkg.com/meilisearch-docsearch@latest/dist/index.global.js"></script>
   <script>
     const { docsearch } = window.__docsearch_meilisearch__;
     docsearch({
       container: "#docsearch",
       host: "YOUR_HOST_URL",
       apiKey: "YOUR_SEARCH_API_KEY",
       indexUid: "YOUR_INDEX_UID",
     });
   </script>
   ```

   alternatively you can import the ESM module when using `<script type="module">`

   ```html
   <script type="module" async>
     import { docsearch } from "https://unpkg.com/meilisearch-docsearch@latest/dist/index.bundled.esm.js";
     docsearch({
       container: "#docsearch",
       host: "YOUR_HOST_URL",
       apiKey: "YOUR_SEARCH_API_KEY",
       indexUid: "YOUR_INDEX_UID",
     });
   </script>
   ```

3. import styles

   ```html
   <link
     rel="stylesheet"
     href="https://unpkg.com/meilisearch-docsearch@latest/dist/index.css"
   />
   ```

# Acknowledgement

This project is inspired by [`algolia/docsearch`](https://github.com/algolia/docsearch/) and [`meilisearch/docs-searchbar.js`](https://github.com/meilisearch/docs-searchbar.js/)

# LICENSE

MIT or MIT/Apache 2.0 where applicable.
