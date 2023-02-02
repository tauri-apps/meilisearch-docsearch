import { render } from "solid-js/web";
import { DocSearch, type DocSearchProps } from "./DocSearch";

function getHTMLElement(
  value: HTMLElement | string,
  environment: typeof window = window
): HTMLElement {
  return typeof value === "string"
    ? environment.document.querySelector<HTMLElement>(value)!
    : value;
}

export function docsearch(
  props: DocSearchProps & {
    container: HTMLElement | string;
  }
) {
  render(
    () => <DocSearch {...props} />,
    getHTMLElement(props.container, props.environment)
  );
}

export { type DocSearchProps };
