import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

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

      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // First group: built-in modules, then external packages
            ["internal"], // Internal modules, e.g., your own source code
            ["sibling", "parent"], // Sibling imports (same directory or parent directory)
            ["index"], // Last group: index files (if applicable)
          ],
          alphabetize: {
            order: "asc", // Alphabetical order
            caseInsensitive: true,
          },
          "newlines-between": "always", // Require newlines between different groups of imports
        },
      ],

      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/components/atoms/**/*.tsx",
              from: [
                "./src/components/molecules/**/*.tsx",
                "./src/components/organisms/**/*.tsx",
                "./src/components/templates/**/*.tsx",
              ],
              message:
                "Atoms should not import from Molecules, Organisms, or Templates.",
            },

            {
              target: "./src/components/molecules/**/*.tsx",
              from: [
                "./src/components/organisms/**/*.tsx",
                "./src/components/templates/**/*.tsx",
              ],
              message:
                "Molecules should not import from Organisms, or Templates.",
            },

            {
              target: "./src/components/organisms/**/*.tsx",
              from: [
                "./src/components/templates/**/*.tsx",
              ],
              message:
                "Organisms should not import from Templates.",
            },

            {
              target: "./src/components/templates/**/*.tsx",
              from: [
                "./src/components/atoms/**/*.tsx",
                "./src/components/molecules/**/*.tsx",
                "./src/components/templates/**/*.tsx",
              ],
              message:
                "Templates should only import from Organisms, not Atoms, Molecules, or other Templates.",
            },
          ],
        },
      ],
    },
  },
];
