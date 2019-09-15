//* Loader plugin provides Loader component and methods to manipulate it.

import LoaderComponent from "../components/Loader.vue";

export default {
  install(Vue) {
    Vue.component("Loader", LoaderComponent);
  }
};
