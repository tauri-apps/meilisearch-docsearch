import { docsearch } from "meilisearch-docsearch";
import "meilisearch-docsearch/css";

docsearch({
  host: "https://ms-4ebb96f179f0-1619.fra.meilisearch.io",
  apiKey: "3eb6db150af1abefe000f00386e149dfb5a006932cab55d1ccd810b8672a4e12",
  indexUid: "docs-v1",
  container: "#docsearch",
  hotKeys: {
    ctrlWithKey: 'k',
    singleKeys: false
  }
});
