import { Component, ComponentProps, createSignal, onMount } from "solid-js";
import { MagnifierIcon } from "./icons/Magnifier";
import { DocSearchHotKeys } from "./useDocSearchHotKeys";

export type ButtonTranslations = Partial<{
  buttonText: string;
  buttonAriaLabel: string;
}>;

export type DocSearchButtonProps = ComponentProps<"button"> & {
  hotKeys: DocSearchHotKeys;
  translations?: ButtonTranslations;
};

const ACTION_KEY_DEFAULT = "Ctrl" as const;
const ACTION_KEY_APPLE = "⌘" as const;

function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export const DocSearchButton: Component<DocSearchButtonProps> = ({
  onClick,
  hotKeys,
  translations = {},
}) => {
  const { buttonText = "Search", buttonAriaLabel = "Search" } = translations;

  const [ctrlKey, setCtrlKey] = createSignal<
    typeof ACTION_KEY_APPLE | typeof ACTION_KEY_DEFAULT | null
  >(null);

  onMount(() => {
    if (typeof navigator !== "undefined") {
      isAppleDevice()
        ? setCtrlKey(ACTION_KEY_APPLE)
        : setCtrlKey(ACTION_KEY_DEFAULT);
    }
  });

  return (
    <button
      type="button"
      class="docsearch-btn"
      onClick={onClick}
      aria-label={buttonAriaLabel}
    >
      <span class="docsearch-btn-icon-container">
        <MagnifierIcon class="docsearch-modal-btn-icon" />
      </span>
      <span class="docsearch-btn-placeholder"> {buttonText} </span>
      {hotKeys.ctrlWithKey ? (
        <span class="docsearch-btn-keys">
          <kbd class="docsearch-btn-key">{ctrlKey()}</kbd>
          <kbd class="docsearch-btn-key">
            {hotKeys.ctrlWithKey.toUpperCase()}
          </kbd>
        </span>
      ) : (
        hotKeys.singleKeys &&
        hotKeys.singleKeys.length > 0 && (
          <span class="docsearch-btn-keys">
            <kbd class="docsearch-btn-key">
              {hotKeys.singleKeys[0].toUpperCase()}
            </kbd>
          </span>
        )
      )}
    </button>
  );
};
