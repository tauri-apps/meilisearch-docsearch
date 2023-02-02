import { render } from "solid-js/web";
import { DocSearch, type DocSearchProps } from "./DocSearch";

interface DocSearchOptions extends DocSearchProps {
  container: HTMLElement | string;
}

export default function docsearch(props: DocSearchOptions) {
  render(
    () => <DocSearch {...props} />,
    typeof props.container === "string"
      ? (props.environment ?? window).document.querySelector<HTMLElement>(
          props.container
        )!
      : props.container
  );
}

export { docsearch, type DocSearchOptions };
