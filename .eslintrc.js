module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  globals: {
    $nuxt: true,
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    semi: [2, "never"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["warn", { semi: false }],
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          void: "always",
          normal: "never",
        },
      },
    ],
    "vue/component-tags-order": [
      "warn",
      {
        order: ["template", "script", "style"],
      },
    ],
    "vue/no-irregular-whitespace": [
      "warn",
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false,
      },
    ],
    "vue/no-unsupported-features": [
      "warn",
      {
        version: "^2.6.0",
        ignores: [],
      },
    ],
    "vue/key-spacing": ["warn", { beforeColon: false, afterColon: true, mode: "strict" }],
    "keyword-spacing": ["warn", { before: true, after: true }],
    "vue/keyword-spacing": ["warn", { before: true, after: true }],
    "vue/camelcase": ["warn", { properties: "always" }],
    "vue/no-restricted-syntax": ["warn"],
    "vue/static-class-names-order": ["warn"],
    camelcase: ["warn", { properties: "always" }],
    "vue/html-indent": [
      "warn",
      2,
      {
        alignAttributesVertically: true,
      },
    ],
  },
}; 
 