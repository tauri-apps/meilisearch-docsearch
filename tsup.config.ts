import { defineConfig } from "tsup-preset-solid";

export default defineConfig(
  {
    entry: "src/index.tsx",
  },
  {
    tsupOptions: (config) => ({
      ...config,
      clean: true,
      format: "esm",
      dts: true,
    }),
  }
);
