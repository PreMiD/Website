export default [
	"@nuxt/components",
	[
		"nuxt-lazy-load",
		{
			observerConfig: {
				rootMargin: "50px 0px 50px 0px",
				threshold: 0
			}
		}
	],
	[
		"@nuxtjs/google-adsense",
		{
			id: "ca-pub-1575460061917202",
			tag: "adsense"
		}
	],
	"@nuxtjs/device",
	"@nuxtjs/axios",
	"@nuxtjs/auth"
];
