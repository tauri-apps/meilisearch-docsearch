import { Component } from "solid-js";

export const UpIcon: Component<{ class?: string; "aria-label"?: string }> = (
  props
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
      <path
        fill="currentColor"
        d="M12 4a1 1 0 0 1 .707.293l6 6a1 1 0 0 1-1.414 1.414L13 7.414V19a1 1 0 1 1-2 0V7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l6-6A1 1 0 0 1 12 4z"
      />
    </svg>
  );
};
