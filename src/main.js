// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router.js';

import "./stylesheets/root.less";

Vue.config.productionTip = false;

// Tooltips
import VueTippy, { TippyComponent } from 'vue-tippy'
Vue.use(VueTippy, {
    directive : 'tippy',
    theme: 'discord',
    arrow: true,
    animation: 'scale',
    duration: [100, 100],
});

// <tippy> Component
Vue.component('tippy',TippyComponent);

// Notifications
import VueNoty from 'vuejs-noty'
Vue.use(VueNoty, {
    timeout: 1000,
    progressBar: false,
    layout: 'topCenter',
    theme: 'premid',
});

// I18N
import i18n from './i18n'


Vue.mixin({
    data() {
        return {
            //* Define available languages here.
            langs: this.$i18n.availableLocales,
            navigatorLanguage: null,
            i18nLanguage: null,
            switcherVisible: false,
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
            if (document.getElementById("app").getAttribute("extension-ready") == "true") {
                return true;
            } else {
                return false;
            }
        },
        // <Debug Messages>
        debugMessage: message => {
            console.log(
                "%cPreMiD%c " + message,
                "color: #fff; font-weight: 900; padding: 3px 7px; margin: 3px; background: #596cae; border-radius: 50px;",
                "color: #596cae;"
            );
        },
        errorMessage: message => {
            console.log(
                "%cPreMiD%c " + message,
                "color: #fff; font-weight: 900; padding: 3px 7px; margin: 3px; background: crimson; border-radius: 50px;",
                "color: crimson;"
            );
        },
        // </Debug Messages>
        getNavigatorLanguage() {
            //* Turns "en-US" into "en" to make detection simpler.
            return navigator.language.slice(0, 2);
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
    render: h => h(App)
}).$mount("#app");
