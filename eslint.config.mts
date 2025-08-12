import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: true,
  allConfig: true,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**"],
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("prettier"),
  ...compat.extends("import"),
  ...compat.extends("@unocss"),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mts", "**/*.mjs"],
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          parser: "typescript",
          trailingComma: "all",
          printWidth: 120,
          tabWidth: 2,
          semi: true,
          bracketSpacing: true,
          endOfLine: "auto",
        },
      ],
    },
  },
];

export default eslintConfig;