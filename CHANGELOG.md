# Changelog

## \[0.6.1]

- [`a20acbc`](https://github.com/tauri-apps/meilisearch-docsearch/commit/a20acbc1987c34a981652e572dd994fd905a1df2) Publish `index.bundled.esm.js` file which is an ESM bundled verion of the package.

## \[0.6.0]

- [`5d69f23`](https://github.com/tauri-apps/meilisearch-docsearch/commit/5d69f23ce32b40710460b1b23b4917ade00131e8)([#44](https://github.com/tauri-apps/meilisearch-docsearch/pull/44)) Add the options to define custom hotkeys or disable the default ones.

## \[0.5.0]

- [`9d93b32`](https://github.com/tauri-apps/meilisearch-docsearch/commit/9d93b32b47f247069acd4bfbb6297e5a9de68e80) Update `meilisearch` dependency to `0.35.0`

## \[0.4.7]

- Re-order `types` field to be the first in package.json `exports`.
  - [7f60b91](https://github.com/tauri-apps/meilisearch-docsearch/commit/7f60b91de672b7d9c8d4444647e12fa4fe2f443c) fix: move `types` field to be first on 2023-02-14

## \[0.4.6]

- Add global/browser target so the package could be used from a CDN like unpkg.com
  - [0748856](https://github.com/tauri-apps/meilisearch-docsearch/commit/0748856d256120020434735eb70d78b4f3c55a57) feat: add browser bundle, closes [#19](https://github.com/tauri-apps/meilisearch-docsearch/pull/19) ([#20](https://github.com/tauri-apps/meilisearch-docsearch/pull/20)) on 2023-02-14

## \[0.4.5]

- Use correct `docsearch--active` to determine if the modal is open, instead of `DocSearch--active`
  - [5770596](https://github.com/tauri-apps/meilisearch-docsearch/commit/5770596cbe6d4dc9e90b7f33e15fb0d4b93658c4) fix: use correct class `docsearch--active` on 2023-02-07

## \[0.4.4]

- Add missing responsive css in `button.css` import
  - [abf7eb1](https://github.com/tauri-apps/meilisearch-docsearch/commit/abf7eb1adcdcdc479beabba3f9262f8abbb5652c) fix: add missing responsive button styles for button only import on 2023-02-07

## \[0.4.3]

- Actually fix `Uncaught ReferenceError: trapFocus is not defined` unlike version `0.4.2` which didn't fix it completely.
  - [bc26094](https://github.com/tauri-apps/meilisearch-docsearch/commit/bc26094eb9330edf7a4d03748d1e53aaa1e66b30) fix: don't minify jsx(solid) target on 2023-02-07

## \[0.4.2]

- Fix `Uncaught ReferenceError: trapFocus is not defined`
  - [78dff02](https://github.com/tauri-apps/meilisearch-docsearch/commit/78dff02b5cb4f97f971063e42d69d9d138d0cdd4) fix: import hack to include trapFocus directive in jsx on 2023-02-07

## \[0.4.1]

- Change loading icon size to match the magnifier icon size inside the search input.
  - [7b3e737](https://github.com/tauri-apps/meilisearch-docsearch/commit/7b3e737f567b7f433ba3c9079be50d968a7169f5) fix: match loading icon size to maginifer icon on 2023-02-07

## \[0.4.0]

- `docsearch` function will now return a method that could be called to destroy and remove the hotkey listeners.
  - [b465a71](https://github.com/tauri-apps/meilisearch-docsearch/commit/b465a7121febf0cd9df3bf9f14b84d1bbc6c6f7c) feat: return a destory function on 2023-02-07
- Prefill the search with highlighted text when opening the modal by clicking the search button.
  - [3a8742a](https://github.com/tauri-apps/meilisearch-docsearch/commit/3a8742a6cb685630457cc322c7047c58ffb77b42) feat: prefill the search if the button is clicked on 2023-02-07

## \[0.3.0]

- Show a loading icon upon making a search request.
  - [bbb0689](https://github.com/tauri-apps/meilisearch-docsearch/commit/bbb068909703981af9ab493205c293eb03af5897) feat: add loading icon on 2023-02-07
  - [b67034d](https://github.com/tauri-apps/meilisearch-docsearch/commit/b67034dea04e7988a0762575a55c191c34c25ec3) chore: fix change file bump on 2023-02-07
- Changed `Search by` to `Powered by` in the modal footer. Also changed `searchByText` to `poweredByText` in the translations options.
  - [1ea31c0](https://github.com/tauri-apps/meilisearch-docsearch/commit/1ea31c058fb9121c9112b61bffcac83a15f0ad34) refactor: "search by" -> "powererd by" on 2023-02-07
- Prefill search box with highlighted text
  - [910e551](https://github.com/tauri-apps/meilisearch-docsearch/commit/910e5515231252e39478338d6e13ac6f0d8d94b7) feat: prefill search with highlighted text on 2023-02-07
- Add support for opening the modal by pressing `s` key, however it doesn't close the modal, same as pressing `/`.
  - [d055bd9](https://github.com/tauri-apps/meilisearch-docsearch/commit/d055bd9e6bc9371978900bdf8a10908547a3e419) feat: support `s` hotkey on 2023-02-07

## \[0.2.1]

- Add `require` in `exports` table in `package.json` to acutally allow using the `cjs` target added in version `0.2`
  - [add1d3b](https://github.com/tauri-apps/meilisearch-docsearch/commit/add1d3b8fba49a5801f8fade9b1b9e8de3ec1e59) feat: add `cjs` target on 2023-02-03
  - [bca6dd9](https://github.com/tauri-apps/meilisearch-docsearch/commit/bca6dd918eff27ba9e960347aef0beda7e137a37) Apply Version Updates From Current Changes ([#9](https://github.com/tauri-apps/meilisearch-docsearch/pull/9)) on 2023-02-03
  - [575705c](https://github.com/tauri-apps/meilisearch-docsearch/commit/575705cacd45734f2b7d18ace965d26fe79188bb) fix: add `require` export on 2023-02-07

## \[0.2.0]

- Add support for `commonjs` target
  - [add1d3b](https://github.com/tauri-apps/meilisearch-docsearch/commit/add1d3b8fba49a5801f8fade9b1b9e8de3ec1e59) feat: add `cjs` target on 2023-02-03
- Move `default` in `package.json > exports` to be the last one in the table to fix import/require issues with some bundlers.
  - [86a7525](https://github.com/tauri-apps/meilisearch-docsearch/commit/86a7525286d470457170f3957ec59b8a28087aac) fix: move `default` exports to be last in table on 2023-02-03
- Fix `process is unedfined` error in ESM import.
  - [3f64f6b](https://github.com/tauri-apps/meilisearch-docsearch/commit/3f64f6b36fecb1544fa8ad9d9d43f507cd9d2c97) fix: replace compile-time version in esm target on 2023-02-03

## \[0.1.0]

- Initial Release.
  - [a29618f](https://github.com/tauri-apps/meilisearch-docsearch/commit/a29618fa5c9efa26dfcc99e68951609ecf35204e) covector and ci/cd on 2023-02-03
