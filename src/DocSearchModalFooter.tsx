import { Component } from "solid-js";
import { DownIcon } from "./icons/Down";
import { EnterIcon } from "./icons/Enter";
import { EscIcon } from "./icons/Esc";
import { MeilisearchDarkIcon } from "./icons/MeilisearchDark";
import { MeilisearchLightIcon } from "./icons/MeilisearchLight";
import { UpIcon } from "./icons/Up";

export type FooterTranslations = Partial<{
  selectText: string;
  selectKeyAriaLabel: string;
  navigateText: string;
  navigateUpKeyAriaLabel: string;
  navigateDownKeyAriaLabel: string;
  closeText: string;
  closeKeyAriaLabel: string;
  poweredByText: string;
}>;

export const DocSearchModalFooter: Component<{
  translations?: FooterTranslations;
}> = ({ translations = {} }) => {
  const {
    selectText = "to select",
    selectKeyAriaLabel = "Enter key",
    navigateText = "to navigate",
    navigateUpKeyAriaLabel = "Arrow up",
    navigateDownKeyAriaLabel = "Arrow down",
    closeText = "to close",
    closeKeyAriaLabel = "Escape key",
    poweredByText = "Powered by",
  } = translations;

  return (
    <>
      <span class="docsearch-modal-footer-commands">
        <li>
          <kbd class="docsearch-modal-footer-commands-key">
            <EnterIcon aria-label={selectKeyAriaLabel} />
          </kbd>
          <span class="docsearch-modal-footer-commands-label">
            {selectText}
          </span>
        </li>
        <li>
          <kbd class="docsearch-modal-footer-commands-key">
            <DownIcon aria-label={navigateDownKeyAriaLabel} />
          </kbd>
          <kbd class="docsearch-modal-footer-commands-key">
            <UpIcon aria-label={navigateUpKeyAriaLabel} />
          </kbd>
          <span class="docsearch-modal-footer-commands-label">
            {navigateText}
          </span>
        </li>
        <li>
          <kbd class="docsearch-modal-footer-commands-key">
            <EscIcon aria-label={closeKeyAriaLabel} />
          </kbd>
          <span class="docsearch-modal-footer-commands-label">{closeText}</span>
        </li>
      </span>
      <span class="docsearch-modal-footer-logo">
        <span class="docsearch-modal-footer-logo-label">{poweredByText}</span>
        <a href="https://www.meilisearch.com/">
          <MeilisearchLightIcon class="docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-light" />
          <MeilisearchDarkIcon class="docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-dark" />
        </a>
      </span>
    </>
  );
};
