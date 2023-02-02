import { Component } from "solid-js";

export const CloseIcon: Component<{ class?: string }> = (props) => {
  return (
    <svg
      class={props.class}
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
