module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-base",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "airbnb",
    "prettier/react",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "react-refresh",
    "@typescript-eslint",
  ],
  rules: {
    semi: "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
