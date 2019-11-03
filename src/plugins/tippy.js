import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";

export default ({ app }) => {
  Vue.use(VueTippy, {
    directive: "tippy",
    theme: "discord",
    arrow: true,
    animation: "scale",
    duration: [100, 100]
  });
  Vue.component("tippy", TippyComponent);
};
