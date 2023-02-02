import { MeiliSearch } from "meilisearch";
import { Accessor, createMemo } from "solid-js";
import version from "./version";

export function useSearchClient({
  host,
  apiKey,
  clientAgents = [],
}: {
  host: string;
  apiKey: string;
  clientAgents?: string[];
}): Accessor<MeiliSearch> {
  return createMemo(
    () =>
      new MeiliSearch({
        host,
        apiKey,
        clientAgents: clientAgents.concat(
          `Meilisearch docs-searchbar.js (v${version}`
        ),
      })
  );
}
