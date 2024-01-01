import { readdirSync } from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: [
		"@/scss/index.scss",
		"@unocss/reset/normalize.css",
		"@unocss/reset/eric-meyer.css"
	],
	devtools: { enabled: true },
	features: {
		inlineStyles: false
	},
	googleFonts: {
		families: {
			Nunito: [400, 600, 700, 800, 900]
		}
	},
	i18n: {
		defaultLocale: "en",
		langDir: "locales/",
		lazy: true,
		locales: readdirSync("locales").map(locale => ({
			code: locale.replace(".ts", ""),
			file: locale
		}))
	},
	modules: [
		"@nuxtjs/i18n",
		"@unocss/nuxt",
		"@nuxtjs/google-fonts",
		"nuxt-graphql-client",
		"@nuxtjs/eslint-module"
	],
	runtimeConfig: {
		public: {
			GQL_HOST: "https://api.premid.app/v3"
		}
	}
});
