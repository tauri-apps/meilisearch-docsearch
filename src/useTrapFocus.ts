import { Accessor, onCleanup, onMount } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      trapFocus: { environment?: typeof window };
    }
  }
}

export default function trapFocus(
  el: HTMLElement,
  value: Accessor<{ environment?: typeof window }>
) {
  const { environment = window } = value();

  onMount(() => {
    const focusableElements = el.querySelectorAll<HTMLElement>(
      "a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function trap(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

      if (event.shiftKey) {
        if (environment.document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (environment.document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    el.addEventListener("keydown", trap);

    onCleanup(() => el.removeEventListener("keydown", trap));
  });
}
