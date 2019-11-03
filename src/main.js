import Vue from "vue";
import App from "./App";

// import "../public/static/assets/fonts/Inter/stylesheet.css";
import "./stylesheets/addons/vuejs-noty.less";
import "./stylesheets/root.scss";

//* Importing plugins for Vue.
import router from "./router.js";
import Debug from "./plugins/Debug";
import Loader from "./plugins/Loader";
import Languages from "./plugins/Languages";
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;

// <Plugins>
Vue.use(Debug);

Vue.use(Loader);
Vue.use(Languages);
// </Plugins>
new Vue({
  router,
  i18n,
  //* Global variables that you can access trough `$root` instance.
  data: {
    i18nLanguageList: null,
    i18nLanguage: null,
    navigatorLanguage: null,
    switcherVisible: false,
    isProcessing: false,
    extensionInstalled: false,
    presenceList: []
  },
  render: h => h(App)
}).$mount("#app");
