import { readdirSync } from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
  css: [
    "@/scss/index.scss",
    "@unocss/reset/normalize.css",
    "@unocss/reset/sanitize/sanitize.css",
    "@unocss/reset/sanitize/assets.css",
    "@unocss/reset/eric-meyer.css",
  ],
  devtools: { enabled: true },
  features: {
    inlineStyles: false,
  },

  googleFonts: {
    families: {
      Inter: [400, 600, 700, 800, 900],
      Nunito: [400, 600, 700, 800, 900],
    },
  },
  i18n: {
    defaultLocale: "en",
    langDir: "locales/",
    lazy: true,
    locales: readdirSync("locales").map((locale) => ({
      code: locale.replace(".ts", ""),
      file: locale,
    })),
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "nuxt-graphql-client",
    "@nuxtjs/eslint-module",
    "@unocss/nuxt",
    "@vueuse/nuxt",
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: "https://api.premid.app/v3",
    },
  },
});
