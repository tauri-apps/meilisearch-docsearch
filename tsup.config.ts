import { defineConfig, Options } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";
// @ts-ignore
import { readFileSync } from "node:fs";

const VERSION = JSON.parse(readFileSync("package.json", "utf-8")).version;

export default defineConfig(
  (config) =>
    [
      {
        entry: ["src/index.tsx"],
        format: ["esm", "cjs"],
        dts: true,
        clean: !config.watch,
        minify: !config.watch,
        esbuildPlugins: [solidPlugin()],
        env: {
          VERSION,
        },
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
        env: {
          VERSION,
        },
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
    ] as Options[]
);
