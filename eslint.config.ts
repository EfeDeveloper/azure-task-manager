import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Ignore build outputs and static assets
  { ignores: ["dist/**", "public/**", "node_modules/**"] },
  // Base recommended configs first
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // Our project rules override base ones
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // React 17+ / automatic runtime
      "react/react-in-jsx-scope": "off",
      // Align ESLint quotes with Prettier (double quotes)
      quotes: ["error", "double", { avoidEscape: true }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
  // Keep this last to disable stylistic rules conflicting with Prettier
  eslintConfigPrettier,
]);
