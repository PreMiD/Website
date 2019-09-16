import Vue from "vue";
import App from "./App";

import "../public/static/assets/fonts/Inter/stylesheet.css";
import "./stylesheets/root.less";

// Animations on scroll.
import AOS from "aos";
import "../node_modules/aos/dist/aos.css";

AOS.init({
  offset: 100
});

//* Importing plugins for Vue.
import router from "./router.js";
import Debug from "./plugins/Debug";
import Loader from "./plugins/Loader";
import Languages from "./plugins/Languages";
import VueTippy, { TippyComponent } from "vue-tippy";
import VueNoty from "vuejs-noty";
import i18n from "./i18n";

Vue.config.productionTip = false;

// <Plugins>
Vue.use(Debug);

Vue.use(VueTippy, {
  directive: "tippy",
  theme: "discord",
  arrow: true,
  animation: "scale",
  duration: [100, 100]
});
Vue.component("tippy", TippyComponent);

Vue.use(VueNoty, {
  timeout: 1000,
  progressBar: false,
  layout: "topRight",
  theme: "premid"
});

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
    presenceList: ""
  },
  render: h => h(App)
}).$mount("#app");
