import { Hit, Hits } from "meilisearch";
import {
  Component,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { DocSearchProps } from "./DocSearch";
import {
  DocSearchModalFooter,
  FooterTranslations,
} from "./DocSearchModalFooter";
import {
  DocSearchModalSearchBox,
  SearchBoxTranslations,
} from "./DocSearchModalSearchBox";
import { EnterIcon } from "./icons/Enter";
import { useSearchClient } from "./useSearchClient";
import trapFocus from "./useTrapFocus";
import * as utils from "./utils";

// DO NOT REMOVE!!
// A trick to keep the bundler from removing the import
// see https://www.solidjs.com/guides/typescript#use___
const _d_ = false;
if (_d_) trapFocus;

export type ModalTranslations = Partial<{ linkToTheResultAriaLabel: string }> &
  FooterTranslations &
  SearchBoxTranslations;

export type DocSearchModalProps = DocSearchProps & {
  translations?: ModalTranslations;
  onClose?: () => void;
  initialQuery?: string;
};

type FormattedHit = {
  index: number;
  category: string | null;
  subcategory: string | null;
  title: string | null;
  text: string | null;
  url: string | null;
};

enum ScreenState {
  Results = 0,
  NoResults,
  Error,
  EmptyQuery,
}

export const DocSearchModal: Component<DocSearchModalProps> = ({
  host,
  apiKey,
  indexUid,
  clientAgents,
  searchParams,
  environment = window,
  translations = {},
  onClose,
  initialQuery,
}) => {
  const { linkToTheResultAriaLabel = "Link to the result" } = translations;

  onMount(() => document.body.classList.add("docsearch--active"));
  onCleanup(() => document.body.classList.remove("docsearch--active"));

  let containerRef: HTMLInputElement | undefined;

  // We rely on a CSS property to set the modal height to the full viewport height
  // because all mobile browsers don't compute their height the same way.
  // See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  let modalRef: HTMLInputElement | undefined;
  function setFullViewportHeight() {
    if (modalRef) {
      const vh = window.innerHeight * 0.01;
      modalRef.style.setProperty("--docsearch-vh", `${vh}px`);
    }
  }
  onMount(() => {
    setFullViewportHeight();
    window.addEventListener("resize", setFullViewportHeight);
  });
  onCleanup(() => window.removeEventListener("resize", setFullViewportHeight));

  const searchClient = useSearchClient({ host, apiKey, clientAgents });
  const [loading, setLoading] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [activeItemIndex, setActiveItemIndex] = createSignal(0);
  const [hitCategories, setHitsCategories] = createSignal<string[]>([]);
  const [hits, setHits] = createSignal<FormattedHit[]>([]);
  const [screenState, setScreenState] = createSignal<ScreenState>(
    ScreenState.EmptyQuery
  );
  const numberOfHits = () => hits().length;

  function onKeyDown(
    e: KeyboardEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const down = e.key === "ArrowDown";
      setActiveItemIndex((index) => {
        if (down && index === numberOfHits() - 1) {
          return 0;
        }
        if (!down && index === 0) {
          return numberOfHits() - 1;
        }

        return index + (down ? 1 : -1);
      });

      document
        .getElementById(`docsearch-hit-item-${activeItemIndex()}`)
        ?.scrollIntoView({
          block: activeItemIndex() === 0 ? "center" : "nearest",
          behavior: "smooth",
        });
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        const windowRef = environment.open(
          hits()[activeItemIndex()].url ?? "",
          "_blank",
          "noopener"
        );
        windowRef?.focus();
      } else if (e.shiftKey) {
        environment.open(
          hits()[activeItemIndex()].url ?? "",
          "_blank",
          "noopener"
        );
      } else {
        environment.location.assign(hits()[activeItemIndex()].url ?? "");
      }

      if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
        onClose && onClose();
      }
    }
  }

  function onReset() {
    setLoading(false);
    setScreenState(ScreenState.EmptyQuery);
    setHits([]);
    setHitsCategories([]);
    setActiveItemIndex(0);
  }

  function search(query: string) {
    setLoading(true);
    searchClient()
      .index(indexUid)
      .search(query, {
        attributesToHighlight: ["*"],
        attributesToCrop: [`content`],
        cropLength: 30,
        ...searchParams,
      })
      .catch((e) => {
        onReset();
        setScreenState(ScreenState.Error);
        console.error(e);
      })
      .then((res) => {
        if (!res) {
          onReset();
          setScreenState(ScreenState.Error);
          return;
        }

        if (res.hits.length === 0) {
          onReset();
          setScreenState(ScreenState.NoResults);
          return;
        }

        const [hits, catgeories] = formatHits(res.hits);
        setLoading(false);
        setScreenState(
          hits.length === 0 ? ScreenState.NoResults : ScreenState.Results
        );
        setActiveItemIndex(0);
        setHits(hits);
        setHitsCategories(catgeories);
      });
  }
  const debouncedSearch = utils.debounce(search, 100);

  if (initialQuery) {
    onMount(() => {
      setQuery(initialQuery);
      search(initialQuery);
    });
  }

  function onInput(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) {
    const query = e.currentTarget?.value;
    setQuery(query);

    if (!query) {
      onReset();
      return;
    }

    debouncedSearch(query);
  }

  return (
    <div
      class="docsearch-modal-container"
      role="button"
      tabIndex={0}
      ref={modalRef}
      onMouseDown={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div class="docsearch-modal" use:trapFocus={{ environment }}>
        <header class="docsearch-modal-search-container">
          <DocSearchModalSearchBox
            loading={loading}
            query={query}
            onInput={onInput}
            onKeyDown={onKeyDown}
            onReset={onReset}
            onClose={onClose}
            translations={translations}
          />
        </header>

        <main class="docsearch-modal-search-hits-container" ref={containerRef}>
          <Switch>
            <Match when={screenState() === ScreenState.EmptyQuery}>
              <div class="docsearch-modal-empty-query" />
            </Match>

            <Match when={screenState() === ScreenState.Error}>
              <div class="docsearch-modal-error">
                <p class="docsearch-modal-title">
                  An error has occured. Please try again...
                </p>
              </div>
            </Match>

            <Match when={screenState() === ScreenState.NoResults}>
              <div class="docsearch-modal-no-search-hits">
                <p class="docsearch-modal-title">No results for "{query()}"</p>
                <Show when={hitCategories().length > 0}>
                  <div class="docsearch-modal-no-search-hits-suggestions-list">
                    <p class="docsearch-modal-no-search-hits-help-text">
                      Try searching for:
                    </p>
                    <ul>
                      <For each={hitCategories()}>
                        {(category) => (
                          <li>
                            <button
                              class="docsearch-modal-no-search-hits-suggestion"
                              type="button"
                              onClick={() => setQuery(category)}
                            >
                              {category}
                            </button>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>
                </Show>
              </div>
            </Match>

            <Match when={screenState() === ScreenState.Results}>
              <For each={hitCategories()}>
                {(category) => (
                  <section>
                    <div class="docsearch-modal-search-hits-category">
                      {category}
                    </div>
                    <ul role="listbox">
                      <For each={hits().filter((h) => h.category === category)}>
                        {(hit) => (
                          <li
                            role="option"
                            aria-selected={hit.index === activeItemIndex()}
                            id={`docsearch-hit-item-${hit.index}`}
                            onMouseEnter={() => setActiveItemIndex(hit.index)}
                            class="docsearch-modal-search-hits-item"
                            classList={{
                              "docsearch-modal-search-hits-item--active":
                                hit.index === activeItemIndex(),
                            }}
                          >
                            <a
                              href={hit.url || "#"}
                              aria-label={linkToTheResultAriaLabel}
                            >
                              <span class="docsearch-modal-search-hits-item-text-container">
                                <p
                                  class="docsearch-modal-search-hits-item-title"
                                  innerHTML={
                                    (hit.subcategory || "") +
                                    (hit.subcategory && hit.title && " | ") +
                                    (hit.title || "")
                                  }
                                ></p>
                                <p
                                  class="docsearch-modal-search-hits-item-text"
                                  innerHTML={hit.text || ""}
                                ></p>
                              </span>
                              <span
                                class="docsearch-modal-search-hits-item-trailing-icon-container"
                                aria-hidden
                              >
                                <EnterIcon class="docsearch-modal-search-hits-item-trailing-icon" />
                              </span>
                            </a>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                )}
              </For>
            </Match>
          </Switch>
        </main>

        <footer class="docsearch-modal-footer">
          <DocSearchModalFooter translations={translations} />
        </footer>
      </div>
    </div>
  );
};

function formatHits(
  receivedHits: Hits<Record<string, any>>
): [FormattedHit[], string[]] {
  const clonedHits = utils.deepClone(receivedHits);
  const hits = clonedHits.map((hit) => {
    if (hit._formatted) {
      const cleanFormatted = utils.replaceNullString(hit._formatted);
      hit._formatted = utils.renameKeysWithLevels(cleanFormatted, "hierarchy_");
    }
    const cleanHit = utils.replaceNullString(hit);
    return utils.renameKeysWithLevels(cleanHit, "hierarchy_");
  });

  const groupedHits = utils.groupBy(hits, "lvl0");

  const formattedHits: FormattedHit[] = Object.entries(groupedHits)
    .map(([k, v]) =>
      v.map((hit) => ({
        category: k,
        subcategory: utils.getHighlightedValue(hit, "lvl1") || k,
        title: utils
          .compact([
            utils.getHighlightedValue(hit, "lvl2"),
            utils.getHighlightedValue(hit, "lvl3"),
            utils.getHighlightedValue(hit, "lvl4"),
            utils.getHighlightedValue(hit, "lvl5"),
            utils.getHighlightedValue(hit, "lvl6"),
          ])
          .join('<span aria-hidden="true"> › </span>'),
        text: utils.getSnippetedValue(hit, "content"),
        url: formatURL(hit),
      }))
    )
    .flat()
    .map((h, index) => ({
      index,
      ...h,
    }));
  return [formattedHits, Object.keys(groupedHits)];
}

function formatURL(hit: Hit): string | null {
  const { url, anchor } = hit;
  if (url) {
    const containsAnchor = url.indexOf("#") !== -1;
    if (containsAnchor) return url;
    else if (anchor) return `${hit.url}#${hit.anchor}`;
    return url;
  } else if (anchor) return `#${hit.anchor}`;
  console.warn("no anchor nor url for : ", JSON.stringify(hit));
  return null;
}
