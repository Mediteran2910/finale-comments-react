import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Ignore dist folder
  { ignores: ["dist/**"] },

  // Define files to lint (js, ts, jsx, tsx)
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },

  // Global settings for browser environment
  { languageOptions: { globals: globals.browser } },

  // Recommended JS, TS, and React configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // Add the `import` plugin here
  {
    plugins: { import: pluginImport }, // Register the import plugin
  },

  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // Make sure ESLint uses the paths from tsconfig.json
        },
      },
      react: { version: "detect" },
    }, // Detect React version automatically

    // Custom rules
    rules: {
      "react/react-in-jsx-scope": "off", // No need for React in scope (React 17+)

      // Restrict relative imports and alias imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "../**", // Prevent relative parent imports
          ],
        },
      ],

      // Enforce restrictions on imports within specific folders
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              // `atoms` should not import `atoms`, `molecules`, or `organizms`
              target: "./src/components/atoms/**/*.tsx", // Deny imports from `atoms`
              from: "./src/components/atoms/**/*.tsx", // Restrict imports within the `atoms` folder
              message: "Do not import from atoms within the atoms folder.",
            },
            {
              target: "./src/components/atoms/**/*.tsx", // Deny imports from `molecules` in `atoms`
              from: "./src/components/molecules/**/*.tsx",
              message: "Do not import from molecules in the atoms folder.",
            },
            {
              target: "./src/components/atoms/**/*.tsx", // Deny imports from `organizms` in `atoms`
              from: "./src/components/organizms/**/*.tsx",
              message: "Do not import from organisms in the atoms folder.",
            },

            {
              // `molecules` should not import `molecules` or `organizms`
              target: "./src/components/molecules/**/*.tsx", // Deny imports from `molecules`
              from: "./src/components/molecules/**/*.tsx",
              message:
                "Do not import from molecules within the molecules folder.",
            },
            {
              target: "./src/components/molecules/**/*.tsx", // Deny imports from `organizms` in `molecules`
              from: "./src/components/organizms/**/*.tsx",
              message: "Do not import from organisms in the molecules folder.",
            },

            {
              // `organizms` should not import `organizms`
              target: "./src/components/organizms/**/*.tsx", // Deny imports from `organizms`
              from: "./src/components/organizms/**/*.tsx",
              message:
                "Do not import from organisms within the organisms folder.",
            },
          ],
        },
      ],
    },
  },
];
