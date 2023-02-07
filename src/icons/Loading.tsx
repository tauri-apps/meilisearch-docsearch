import { Component } from "solid-js";

export const LoadingIcon: Component<{ class?: string }> = (props) => {
  return (
    <svg
      class={props.class}
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
    </svg>
  );
};
