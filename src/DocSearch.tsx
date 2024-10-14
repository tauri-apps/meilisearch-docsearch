import { Component, createSignal } from "solid-js";
import { ButtonTranslations, DocSearchButton } from "./DocSearchButton";
import {
  useDocSearchHotKeys as useHotKeys,
  DocSearchHotKeys,
} from "./useDocSearchHotKeys";
import { DocSearchModal, ModalTranslations } from "./DocSearchModal";
import { Portal } from "solid-js/web";
import { SearchParams } from "meilisearch";

export interface DocSearchProps {
  host: string;
  apiKey: string;
  indexUid: string;
  clientAgents?: string[];
  /**
   * An array of hotkeys to trigger the search modal.
   * Can be either a single character, for example `s` or `/`,
   * or a combination of modifiers and key, for example `ctrl+k`.
   *
   * Default keys are `['ctrl+k', 's', '/']`
   *
   * Set to `false` to disable default keys.
   */
  hotKeys?: DocSearchHotKeys;
  translations?: DocSearchTranslations;
  searchParams?: SearchParams;
  environment?: typeof window;
  /**
   * Duration to wait between keystores to determine whether a search should happen or not.
   * Defaults to `200`.
   *
   * Set to `false` to disable debouncing.
   *
   * This is an optimization that discards unnecessary search operations, for example,
   * if a user is typing `hello`, we skip search operations for `h`, `he`, `hel` and `hell`
   * as this usually not what the user wants to search for, and instead wait a few milliseconds until
   * the user stops typing for a brief moment, and then we do the search operation.
   * In the previous example, that would be `hello`.
   */
  debounceDuration?: number | false;
}

export type DocSearchTranslations = Partial<{
  button: ButtonTranslations;
  modal: ModalTranslations;
}>;

const DEFAULT_HOTKEYS = ["ctrl+k", "s", "/"];

export const DocSearch: Component<DocSearchProps> = (props) => {
  const { environment = window, hotKeys = DEFAULT_HOTKEYS } = props;

  const [isOpen, setIsOpen] = createSignal(false);
  const [initialQuery, setInitialQuery] = createSignal<string | undefined>();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onInput = (query: string) => setInitialQuery(query);
  const onClick = () => {
    const selectedText = window.getSelection();
    if (selectedText) setInitialQuery(selectedText.toString());
    setIsOpen(true);
  };

  useHotKeys({
    isOpen,
    onOpen,
    onClose,
    onInput,
    hotKeys,
  });

  return (
    <>
      <DocSearchButton
        translations={props?.translations?.button}
        hotKeys={hotKeys}
        onClick={onClick}
      />
      {isOpen() && (
        <Portal mount={environment.document.body}>
          <DocSearchModal
            {...props}
            initialQuery={initialQuery()}
            onClose={onClose}
            translations={props?.translations?.modal}
          />
        </Portal>
      )}
    </>
  );
};
