import { readdirSync } from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  apollo: {
    clients: {
      default: {
        browserHttpEndpoint: "https://api.premid.app/v3",
        httpEndpoint: "https://api.premid.app/v3",
      },
    },
  },
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
      Inter: [400, 500, 600, 700, 800, 900],
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
  image: {
    domains: ["cdn.rcd.gg"],
  },
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxtjs/eslint-module",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
});
