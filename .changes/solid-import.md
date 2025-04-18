---
"meilisearch-docsearch": "patch"
---

Fix `/solid` import containing reference to `React.createElement`. Now `/solid` import will include untransformed JSX, so you can import it directly in your solid projects as it was intended.
