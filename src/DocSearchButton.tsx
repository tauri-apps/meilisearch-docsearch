import {
  Component,
  ComponentProps,
  For,
  createSignal,
  onMount,
} from "solid-js";
import { MagnifierIcon } from "./icons/Magnifier";
import { DocSearchHotKeys } from "./useDocSearchHotKeys";
import { isAlt, isAppleDevice, isCtrl } from "./utils";

export type ButtonTranslations = Partial<{
  buttonText: string;
  buttonAriaLabel: string;
}>;

export type DocSearchButtonProps = ComponentProps<"button"> & {
  hotKeys: DocSearchHotKeys;
  translations?: ButtonTranslations;
};

const CTRL_KEY_DEFAULT = "Ctrl" as const;
const CTRL_KEY_APPLE = "⌘" as const;
const ALT_KEY_DEFAULT = "Alt" as const;
const ALT_KEY_APPLE = "Option" as const;

export const DocSearchButton: Component<DocSearchButtonProps> = ({
  onClick,
  hotKeys,
  translations = {},
}) => {
  const { buttonText = "Search", buttonAriaLabel = "Search" } = translations;

  const [ctrlKey, setCtrlKey] = createSignal<
    typeof CTRL_KEY_DEFAULT | typeof CTRL_KEY_APPLE | null
  >(null);
  const [altKey, setAltKey] = createSignal<
    typeof ALT_KEY_DEFAULT | typeof ALT_KEY_APPLE | null
  >(null);

  onMount(() => {
    if (typeof navigator !== "undefined") {
      if (isAppleDevice()) {
        setCtrlKey(CTRL_KEY_APPLE);
        setAltKey(ALT_KEY_APPLE);
      } else {
        setCtrlKey(CTRL_KEY_DEFAULT);
        setAltKey(ALT_KEY_DEFAULT);
      }
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
      {hotKeys && hotKeys.length > 0 && (
        <span class="docsearch-btn-keys">
          <For each={hotKeys[0].split("+")}>
            {(k) => (
              <kbd class="docsearch-btn-key">
                {isCtrl(k)
                  ? ctrlKey()
                  : isAlt(k)
                    ? altKey()
                    : k[0].toUpperCase() + k.slice(1)}
              </kbd>
            )}
          </For>
        </span>
      )}
    </button>
  );
};
