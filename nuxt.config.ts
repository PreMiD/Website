import { readdirSync } from "node:fs";

export default defineNuxtConfig({
	app: {
		pageTransition: {
			name: "page",
			mode: "out-in",
		},
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			titleTemplate: "%s - PreMiD",
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
	fonts: {
		families: [
			{
				name: "Discord Font",
				fallbacks: ["sans-serif"],
				provider: "local",
				src: "/assets/fonts/discord.woff2",
			},
			{
				name: "Inter",
				fallbacks: ["sans-serif"],
				provider: "google",
				weights: [400, 500, 600, 700, 800, 900],
			},
		],
	},
	i18n: {
		vueI18n: "i18n.ts",
		baseUrl: "https://premid.app",
		defaultLocale: "en",
		langDir: "locales/",
		strategy: "prefix_except_default",
		lazy: true,
		locales: readdirSync("locales").map(locale => ({
			code: locale.replace(".ts", ""),
			file: locale,
		})),
	},
	site: {
		url: "https://premid.app",
		name: "PreMiD",
		description: "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord activity status.",
		defaultLocale: "en",
	},
	image: {
		domains: ["cdn.rcd.gg"],
		ipx: {
			maxAge: 60 * 60 * 24 * 30,
		},
	},
	modules: [
		"@nuxtjs/i18n",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxt/image",
		"nuxt-graphql-client",
		"@nuxt/fonts",
		"@nuxtjs/seo",
		"floating-vue/nuxt",
		"@nuxtjs/device",
		"@nuxt/scripts",
		"nuxt-typed-router",
	],
	runtimeConfig: {
		discord_bot_token: "",
		public: {
			GQL_HOST: "https://api.premid.app/v3",
		},
	},
	ogImage: {
		enabled: false,
	},
	compatibilityDate: "2024-07-09",
});
