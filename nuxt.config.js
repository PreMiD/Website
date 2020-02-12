module.exports = {
  rootDir: "./",
  srcDir: "src",
  buildModules: [
    "@nuxtjs/router",
    ["@nuxtjs/google-analytics", { id: "UA-129058596-1" }]
  ],
  plugins: [
    "~/router.js",
    "~/components/plugins/I18n.js",
    "~/components//plugins/Languages.js",
    { src: "~/components//plugins/Tippy.js", ssr: false },
    { src: "~/components//plugins/Noty.js", ssr: false },
    { src: "~/components//plugins/Pagination.js", ssr: false }
  ],
  router: {
    middleware: ["auth"]
  },
  modules: ["nuxt-lazy-load", "@nuxtjs/axios", "@nuxtjs/auth"],
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
  env: {
    apiBase: "https://api.premid.app/v2"
  },
  loading: "~/components/Loader.vue",
  head() {
    return {
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
          href: "/assets/fonts/FontAwesome/all.min.css"
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/npm/inter-ui@3.11.0/inter.min.css"
        }
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "theme-color",
          name: "theme-color",
          content: "#7289DA"
        },
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
  } /*,
	build: {
		publicPath: "https://cdn.premid.app"
	}*/
};
