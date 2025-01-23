// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier", "import", "simple-import-sort"],
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "prettier/prettier": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        ignoreCase: true,
        multiline: "first",
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
  },
};
