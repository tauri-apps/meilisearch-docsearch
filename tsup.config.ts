import { defineConfig } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";

export default defineConfig((config) => [
  {
    entry: ["src/index.tsx"],
    clean: true,
    format: "esm",
    dts: true,
    minify: !config.watch,
    esbuildPlugins: [solidPlugin()],
  },
  {
    entry: ["src/index.solid.tsx"],
    clean: true,
    format: "esm",
    dts: true,
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
    clean: true,
    minify: !config.watch,
  },
]);
