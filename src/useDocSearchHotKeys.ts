import { Accessor, onCleanup, onMount } from "solid-js";
import { isAlt, isAppleDevice, isCtrl, isMeta } from "./utils";

export type DocSearchHotKeys = string[] | false;

export function useDocSearchHotKeys({
  isOpen,
  onOpen,
  onClose,
  onInput,
  hotKeys,
}: {
  isOpen: Accessor<boolean>;
  onOpen: () => void;
  onClose: () => void;
  onInput: (query: string) => void;
  hotKeys: DocSearchHotKeys;
}) {
  function isEditingContent(event: KeyboardEvent): boolean {
    const element = event.target as HTMLElement;
    const tagName = element.tagName;

    return (
      element.isContentEditable ||
      tagName === "INPUT" ||
      tagName === "SELECT" ||
      tagName === "TEXTAREA"
    );
  }

  function isHotKey(event: KeyboardEvent): boolean {
    const modsAndkeys =
      hotKeys && hotKeys.map((k) => k.toLowerCase().split("+"));

    if (modsAndkeys) {
      return modsAndkeys.some((modsAndkeys) => {
        // if hotkey is a single character, we only react if modal is not open
        if (
          modsAndkeys.length === 1 &&
          event.key.toLowerCase() === modsAndkeys[0] &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.shiftKey &&
          !isEditingContent(event) &&
          !isOpen()
        ) {
          return true;
        }

        // modifiers and key
        if (modsAndkeys.length > 1) {
          const key = modsAndkeys[modsAndkeys.length - 1];

          if (event.key.toLowerCase() !== key) return false;

          const ctrl =
            (isAppleDevice() ? event.metaKey : event.ctrlKey) ==
            modsAndkeys.some(isCtrl);
          const shift = event.shiftKey == modsAndkeys.includes("shift");
          const alt = event.altKey == modsAndkeys.some(isAlt);
          const meta =
            !isAppleDevice() && event.metaKey == modsAndkeys.some(isMeta);

          return ctrl && shift && alt && meta;
        }

        return false;
      });
    }

    return false;
  }

  function onKeyDown(e: KeyboardEvent) {
    if ((e.key === "Escape" && isOpen()) || isHotKey(e)) {
      e.preventDefault();
      if (isOpen()) {
        onClose();
      } else if (!document.body.classList.contains("docsearch--active")) {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        const selectedText = window.getSelection();
        if (selectedText) onInput(selectedText.toString());
        onOpen();
      }
    }
  }

  onMount(() => window.addEventListener("keydown", onKeyDown));
  onCleanup(() => window.removeEventListener("keydown", onKeyDown));
}
