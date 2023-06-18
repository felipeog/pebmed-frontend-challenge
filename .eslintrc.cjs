module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@tanstack/query", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
};
