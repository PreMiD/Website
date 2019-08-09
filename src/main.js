// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router.js";

import "./stylesheets/root.less";

Vue.config.productionTip = false;

// Tooltips
import VueTippy, { TippyComponent } from "vue-tippy";
Vue.use(VueTippy, {
  directive: "tippy",
  theme: "discord",
  arrow: true,
  animation: "scale",
  duration: [100, 100],
});

// <tippy> Component
Vue.component("tippy", TippyComponent);

// Notifications
import VueNoty from "vuejs-noty";
Vue.use(VueNoty, {
  timeout: 1000,
  progressBar: false,
  layout: "topRight",
  theme: "premid",
});

// I18N
import i18n from "./i18n";

Vue.mixin({
  data() {
    return {
      //* Define available languages here.
      langs: this.$i18n.availableLocales,
      navigatorLanguage: null,
      i18nLanguage: null,
      switcherVisible: false,
      extension_installed: false,
      presences_installed: "",
      isProcessing: false,
    };
  },
  created() {
    if (localStorage.language !== undefined) {
      this.$i18n.locale = localStorage.language;
    }

    this.$data.navigatorLanguage = this.getNavigatorLanguage();
    this.$data.i18nLanguage = this.getI18nLanguage();
  },
  // All methods that are defined here going to be global, use it carefully!
  methods: {
    extensionInstalled: () => {
      // Checking if user has the extension installed.
      if (
        document.getElementById("app").getAttribute("extension-ready") == "true"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // <Debug Messages>
    debugMessage: message => {
      var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

      console.log(
        "%cPreMiD%cINFO%c " + message,
        genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
        genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
        "color: unset;"
      );
    },
    errorMessage: message => {
      var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

      console.log(
        "%cPreMiD%cERROR%c " + message,
        genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
        genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
        "color: unset;"
      );
    },
    // </Debug Messages>
    getNavigatorLanguage() {
      //* Filters navigator language to provide capability with browsers.
      var navigatorLanguage = navigator.language.slice(0, 4).replace("-", "_");
      if (navigator.language.length == 2) {
        navigatorLanguage = `${navigatorLanguage}_${navigatorLanguage.toUpperCase()}`;
      }
      return navigatorLanguage;
    },
    getI18nLanguage() {
      return this.$i18n.locale;
    },
    setLanguage(lang) {
      localStorage.setItem("language", lang);
      this.$i18n.locale = lang;
      return true;
    },
  },
});

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount("#app");
