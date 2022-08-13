module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb-typescript",
    "plugin:import/typescript",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["prettier", "react", "@typescript-eslint"],
  ignorePatterns: ["craco.config.js"],
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "import/no-unresolved": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-shadow": "off",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "implicit-arrow-linebreak": "off",
    "react/no-unescaped-entities": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-restricted-exports": ["off", { restrictedNamedExports: ["default"] }],
    "import/no-extraneous-dependencies": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
};
