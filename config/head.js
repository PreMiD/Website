export default {
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
		},
		{
			rel: "stylesheet",
			type: "text/css",
			href: "/assets/fonts/FontAwesome/all.css"
		},
		{
			rel: "stylesheet",
			type: "text/css",
			href: "https://cdn.jsdelivr.net/npm/inter-ui@3.11.0/inter.min.css"
		},
		{
			rel: "stylesheet",
			type: "text/css",
			href: "/assets/fonts/Discord/font.css"
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
			property: "description",
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
			hid: "stripe",
			src: "https://t8yhzkqt8q6g.statuspage.io/embed/script.js",
			defer: true
		}
	]
};
