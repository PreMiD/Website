//* Languages plugin gives you ability to change languages and use methods to get information from i18n.

import Vue from "vue";

import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import LanguageNotification from "../components/LanguageNotification.vue";

export default () => {
  Vue.component("LanguageSwitcher", LanguageSwitcher);
  Vue.component("LanguageNotification", LanguageNotification);

  Vue.mixin({
    methods: {
      getBrowserLanguage() {
        if (process.server) return "en";
        var navigatorLanguage;

        if (navigator.language.length == 2) {
          navigatorLanguage = navigator.language;
        } else {
          if (
            navigator.language.slice(0, 2) ===
            navigator.language.slice(3, 5).toLocaleLowerCase()
          )
            navigatorLanguage = navigator.language.slice(0, 2);
          else
            navigatorLanguage =
              navigator.language.slice(0, 2) +
              "_" +
              navigator.language.slice(3);
        }

        return navigatorLanguage;
      },
      getCurrentLanguage() {
        return this.$i18n.locale;
      },
      setLanguage(lang) {
        localStorage.setItem("language", lang);
        this.$i18n.locale = lang;
        return true;
      }
    }
  });
};
