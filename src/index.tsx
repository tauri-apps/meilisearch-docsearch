import { createSignal, Show } from "solid-js";
import { render } from "solid-js/web";
import { DocSearch, type DocSearchProps } from "./DocSearch";

export interface DocSearchOptions extends DocSearchProps {
  /* Container in which the search button will be added to. */
  container: HTMLElement | string;
}

/**
 * Adds a search button to the specified container and setups necessary hotkeys to open the search modal.
 *
 * @returns a function to destroy and remove the search button and the hotkeys listeners.
 */
export function docsearch(props: DocSearchOptions): () => void {
  const [render_, setRender] = createSignal(true);
  render(
    () => (
      <Show when={render_()}>
        <DocSearch {...props} />
      </Show>
    ),
    typeof props.container === "string"
      ? (props.environment ?? window).document.querySelector<HTMLElement>(
          props.container,
        )!
      : props.container,
  );
  return () => setRender(false);
}

export default docsearch;
