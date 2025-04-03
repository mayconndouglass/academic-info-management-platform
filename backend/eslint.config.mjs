import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig({
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: { globals: globals.browser },
  plugins: {
    js,
    "simple-import-sort": simpleImportSort,
  },
  extends: ["js/recommended", ...tseslint.configs.recommended],
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": "warn",
    "eol-last": ["error", "always"],

    "simple-import-sort/imports": "error",
  }
})
