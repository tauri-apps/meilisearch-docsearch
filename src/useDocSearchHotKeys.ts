import { Accessor, onCleanup, onMount } from "solid-js";

export type DocSearchHotKeys = Partial<{
  ctrlWithKey: string | false;
  singleKeys: string[] | false;
}>;

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

  function onKeyDown(e: KeyboardEvent) {
    if (
      (e.key === "Escape" && isOpen()) ||
      // The Ctrl(⌘) combined with the `ctrlWithKey` shortcut both opens and closes the modal.
      (hotKeys.ctrlWithKey &&
        e.key.toLowerCase() === hotKeys.ctrlWithKey.toLowerCase() &&
        (e.metaKey || e.ctrlKey)) ||
      // The one of `singleKeys` shortcut opens but doesn't close the modal because it's
      // a character.
      (!isEditingContent(e) &&
        hotKeys.singleKeys &&
        hotKeys.singleKeys.some(
          (k) => k.toLowerCase() === e.key.toLowerCase(),
        ) &&
        !isOpen())
    ) {
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
