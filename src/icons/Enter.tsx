import { Component } from "solid-js";

export const EnterIcon: Component<{ class?: string; "aria-label"?: string }> = (
  props,
) => {
  return (
    <svg
      class={props.class}
      aria-label={props["aria-label"]}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
        <path d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z" />
        <path d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z" />
      </g>
    </svg>
  );
};
