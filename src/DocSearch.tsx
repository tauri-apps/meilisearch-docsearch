import { Component, createSignal } from "solid-js";
import { ButtonTranslations, DocSearchButton } from "./DocSearchButton";
import { useDocSearchHotKeys as useHotKeys } from "./useDocSearchHotKeys";
import { DocSearchModal, ModalTranslations } from "./DocSearchModal";
import { Portal } from "solid-js/web";
import { SearchParams } from "meilisearch";

export interface DocSearchProps {
  host: string;
  apiKey: string;
  indexUid: string;
  clientAgents: string[];
  translations?: DocSearchTranslations;
  searchParams?: SearchParams;
  environment?: typeof window;
}

export type DocSearchTranslations = Partial<{
  button: ButtonTranslations;
  modal: ModalTranslations;
}>;

export const DocSearch: Component<DocSearchProps> = (props) => {
  const { environment = window } = props;

  const [isOpen, setIsOpen] = createSignal(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useHotKeys({
    isOpen,
    onOpen,
    onClose,
  });

  return (
    <>
      <DocSearchButton
        translations={props?.translations?.button}
        onClick={() => setIsOpen(true)}
      />
      {isOpen() && (
        <Portal mount={environment.document.body}>
          <DocSearchModal
            {...props}
            onClose={onClose}
            translations={props?.translations?.modal}
          />
        </Portal>
      )}
    </>
  );
};
