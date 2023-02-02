import { defineConfig } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";

export default defineConfig((config) => [
  {
    entry: ["src/index.tsx"],
    format: "esm",
    dts: true,
    clean: !config.watch,
    minify: !config.watch,
    esbuildPlugins: [solidPlugin()],
  },
  {
    entry: ["src/index.solid.tsx"],
    format: "esm",
    dts: true,
    clean: !config.watch,
    minify: !config.watch,
    esbuildOptions: () => ({
      jsx: "preserve",
    }),
    outExtension: () => ({
      js: ".jsx",
    }),
  },
  {
    entry: [
      "src/styles/index.css",
      "src/styles/variables.css",
      "src/styles/button.css",
      "src/styles/modal.css",
    ],
    clean: !config.watch,
    minify: !config.watch,
  },
]);
