import { Accessor, Component, createSignal, onMount, Setter } from "solid-js";
import { CloseIcon } from "./icons/Close";
import { MagnifierIcon } from "./icons/Magnifier";

export type SearchBoxTranslations = Partial<{
  searchDocsPlaceHolder: string;
  resetButtonTitle: string;
  resetButtonAriaLabel: string;
  cancelButtonText: string;
  cancelButtonAriaLabel: string;
}>;

export const DocSearchModalSearchBox: Component<{
  query: Accessor<string>;
  onInput?: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
  onKeyDown?: (
    e: KeyboardEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
  onReset?: () => void;
  onClose?: () => void;
  translations?: SearchBoxTranslations;
}> = ({ query, onInput, onKeyDown, onReset, onClose, translations = {} }) => {
  const {
    searchDocsPlaceHolder = "Search docs",
    resetButtonTitle = "Clear the query",
    resetButtonAriaLabel = "Clear the query",
    cancelButtonText = "Cancel",
    cancelButtonAriaLabel = "Cancel",
  } = translations;

  let searchInputRef: HTMLInputElement | undefined;
  onMount(() => searchInputRef?.focus());

  return (
    <>
      <form
        class="docsearch-modal-search-input-form"
        onSubmit={(e) => e.preventDefault()}
        onReset={onReset}
      >
        <MagnifierIcon class="docsearch-modal-search-input-icon" />
        <input
          type="search"
          class="docsearch-modal-search-input"
          placeholder={searchDocsPlaceHolder}
          value={query()}
          ref={searchInputRef}
          onInput={onInput}
          onKeyDown={onKeyDown}
        />
        <button
          type="reset"
          title={resetButtonTitle}
          class="docsearch-modal-search-input-reset"
          aria-label={resetButtonAriaLabel}
          hidden={!query()}
        >
          <CloseIcon class="docsearch-modal-search-input-reset-icon" />
        </button>
      </form>

      <button
        type="reset"
        aria-label={cancelButtonAriaLabel}
        class="docsearch-modal-search-cancel-btn"
        onClick={onClose}
      >
        {cancelButtonText}
      </button>
    </>
  );
};
