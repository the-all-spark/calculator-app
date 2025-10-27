import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/', 'dist/', 'build/', '*.min.js'],
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]);
