import { defineConfig, Options } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";
// @ts-expect-error node built-in module
import { readFileSync } from "node:fs";

const VERSION = JSON.parse(readFileSync("package.json", "utf-8")).version;

export default defineConfig(
  (config) =>
    [
      // ESM and CJS builds published to NPM
      {
        entry: ["src/index.tsx"],
        format: ["esm", "cjs"],
        dts: true,
        clean: !config.watch,
        minify: false,
        esbuildPlugins: [solidPlugin()],
        env: {
          VERSION,
        },
      },

      // Solid-JS builds published to NPM
      {
        entry: ["src/index.solid.tsx"],
        format: "esm",
        dts: true,
        clean: !config.watch,
        minify: false,
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

      // Global window object bundled
      {
        entry: ["src/index.tsx"],
        format: ["iife"],
        noExternal: [/(.*)/],
        clean: !config.watch,
        minify: true,
        esbuildPlugins: [solidPlugin()],
        env: {
          VERSION,
        },
        globalName: "__docsearch_meilisearch__",
        platform: "browser",
        footer: {
          js: "if (!'__docsearch_meilisearch__' in window) window.__docsearch_meilisearch__ = __docsearch_meilisearch__",
        },
      },

      // ESM bundled
      {
        entry: ["src/index.tsx"],
        format: ["esm"],
        clean: !config.watch,
        minify: true,
        esbuildPlugins: [solidPlugin()],
        noExternal: [/(.*)/],
        outExtension: () => ({
          js: ".bundled.esm.js",
        }),
        env: {
          VERSION,
        },
        platform: "browser",
      },

      // CSS
      {
        entry: [
          "src/styles/index.css",
          "src/styles/variables.css",
          "src/styles/button.css",
          "src/styles/modal.css",
        ],
        clean: !config.watch,
        minify: false,
      },
    ] as Options[],
);
