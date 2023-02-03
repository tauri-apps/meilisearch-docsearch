import { render } from "solid-js/web";
import { DocSearch, type DocSearchProps } from "./DocSearch";

export interface DocSearchOptions extends DocSearchProps {
  container: HTMLElement | string;
}

export function docsearch(props: DocSearchOptions) {
  render(
    () => <DocSearch {...props} />,
    typeof props.container === "string"
      ? (props.environment ?? window).document.querySelector<HTMLElement>(
          props.container
        )!
      : props.container
  );
}

export default docsearch;
