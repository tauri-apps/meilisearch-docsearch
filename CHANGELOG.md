# Changelog

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
