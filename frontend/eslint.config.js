import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "../**", // Prevent relative parent imports
            "src/components/atoms/*", // Enforce alias @atoms
            "src/components/molecules/*", // Enforce alias @molecules
            "src/components/organisms/*", // Enforce alias @organisms
          ],
        },
      ],
    },
  },
];

