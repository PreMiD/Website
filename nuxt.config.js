import axios from "axios";
import { getNativeName } from "language-flag-colors";

export default async function () {
	return {
		rootDir: "./",
		srcDir: "./src",
		head: {
			titleTemplate: "%s - PreMiD",
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/assets/meta/favicon.ico"
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/assets/meta/favicon-32x32.png"
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/assets/meta/favicon-32x32.png"
				}
			],
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "PreMiD_Presence", content: "PreMiD" },
				{
					hid: "theme-color",
					name: "theme-color",
					content: "#7289DA"
				},
				{
					hid: "description",
					name: "description",
					content:
						"PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status."
				},
				/* Twitter */
				{
					hid: "twitter:card",
					property: "twitter:card",
					content: "summary"
				},
				{
					hid: "twitter:url",
					property: "twitter:url",
					content: "https://premid.app"
				},
				{
					hid: "twitter:description",
					property: "twitter:description",
					content:
						"PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status."
				},
				{
					hid: "twitter:image",
					property: "twitter:image",
					content: "https://premid.app/assets/images/logo.png"
				},
				/* Open-Graph */
				{
					hid: "og:site_name",
					property: "og:site_name",
					content: "PreMiD"
				},
				{
					hid: "og:title",
					property: "og:title",
					content: "PreMiD"
				},
				{
					hid: "og:description",
					property: "og:description",
					content:
						"PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status."
				},
				{
					hid: "og:image",
					property: "og:image",
					content: "https://premid.app/assets/images/logo.png"
				}
			],
			script: [
				{
					hid: "statuspage",
					src: "https://t8yhzkqt8q6g.statuspage.io/embed/script.js",
					async: true
				}
			]
		},
		fontLoader: {
			url: {
				local: "/assets/fonts/FontAwesome/all.css",
				google:
					"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
			},
			prefetch: {
				hid: "font-prefetch"
			},
			preconnect: {
				hid: "font-preconnect",
				crossorigin: "anonymous"
			},
			preload: {
				hid: "font-preload"
			}
		},
		auth: {
			redirect: {
				login: "/login",
				logout: "/",
				callback: "/callback",
				home: "/"
			},
			strategies: {
				local: false,
				discord: {
					_scheme: "oauth2",
					authorization_endpoint: "https://discordapp.com/api/oauth2/authorize",
					userinfo_endpoint: "https://discordapp.com/api/users/@me",
					scope: ["identify"],
					client_id: "503557087041683458"
				}
			}
		},
		publicRuntimeConfig: {
			axios: {
				browserBaseURL: process.env.BROWSER_BASE_URL
			},
			privateRuntimeConfig: {
				axios: {
					baseURL: process.env.BASE_URL
				}
			}
		},
		axios: {
			baseURL: "https://api.premid.app",
			retry: { retries: 3 },
			credentials: false
		},
		loading: "~/components/Loader.vue",
		buildModules: [
			"nuxt-font-loader",
			"@nuxt/typescript-build",
			["@nuxtjs/google-analytics", { id: "UA-129058596-1" }]
		],
		components: true,
		css: ["~stylesheets/root.scss"],
		image: {
			provider: "ipx",
			ipx: {
				modifiers: {
					loading: "lazy",
					format: "webp"
				}
			}
		},
		modules: [
			"@nuxt/image",
			[
				"@nuxtjs/google-adsense",
				{
					id: "ca-pub-1575460061917202",
					tag: "adsense"
				}
			],
			"@nuxtjs/auth",
			[
				"@nuxtjs/i18n",
				{
					strategy: "no_prefix",
					defaultLocale: "en",
					locales: await getAvailableLocales(),
					detectBrowserLanguage: {
						fallbackLocale: "en"
					},
					lazy: true,
					langDir: "./",
					vueI18n: {
						fallbackLocale: "en",
						silentTranslationWarn: true
					}
				}
			],
			"@nuxtjs/axios"
		],
		plugins: [
			"~/plugins/graphqlBase.js",
			{ src: "~/plugins/Anime.js", mode: "client" },
			{ src: "~/plugins/Axios.js", mode: "client" },
			{ src: "~/plugins/Tippy.js", mode: "client" },
			{ src: "~/plugins/Pagination.js", mode: "client" },
			{ src: "~/plugins/Carousel.js", mode: "client" },
			{ src: "~/plugins/Scrollmagic.js", mode: "client" },
			{ src: "~/plugins/Modal.js", mode: "client" }
		],
		build: {
			ssr: true
		},
		serverMiddleware: [
			{
				path: "/_ipx",
				handler: "~/serverMiddleware/ipx.ts"
		}
		]
	};
}

async function getAvailableLocales() {
	const languageCodes = (
		await axios({
			url: process.env.BASE_URL
				? process.env.BASE_URL + "/v3"
				: "https://api.premid.app/v3",
			method: "POST",
			data: {
				query: `
					{
						langFiles(project:"website") {
							lang
						}
					}
				`
			}
		})
	).data.data.langFiles.flatMap(({ lang }) => [lang]);

	return languageCodes
		.map(lang => {
			return {
				code: lang,
				name: getNativeName(lang.replace("_", "-")),
				file: "fetchLocale.js"
			};
		})
		.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
}
