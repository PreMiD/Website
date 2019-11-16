module.exports = {
  rootDir: "./",
  srcDir: "src",
  plugins: [
    "~/plugins/i18n.js",
    "~/plugins/Languages.js",
    { src: "~/plugins/tippy.js", ssr: false },
    { src: "~/plugins/noty.js", ssr: false }
  ],
  env: {
    apiBase: "https://api.premid.app/v2/"
  },
  loading: {
    color: "#7289DA",
    height: "5px"
  },
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
          href: "/assets/fonts/Inter/stylesheet.css"
        }
      ],
      meta: [
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
          content: "Your rich presence for web services. "
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://beta.premid.app/assets/images/logo.gif"
        }
      ]
    };
  }
};
