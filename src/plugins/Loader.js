//* Loader plugin provides Loader component and methods to manipulate it.

import Vue from "vue";
import LoaderComponent from "../components/Loader.vue";

export default {
  install(Vue, options) {
    Vue.component("Loader", LoaderComponent);
  },
};
