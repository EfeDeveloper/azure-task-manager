import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier,
    },
    rules: {
      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // React recommended already added below, ensure react in scope when using JSX in .tsx
      'react/react-in-jsx-scope': 'off',
      // Prettier integration (shows formatting differences as warnings)
      'prettier/prettier': ['warn', {}],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
