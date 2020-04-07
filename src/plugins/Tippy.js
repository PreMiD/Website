import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";

export default ({ app }) => {
	Vue.use(VueTippy, {
		directive: "tippy",
		theme: "discord",
		arrow: true,
		inertia: true,
		animation: "discord-anim",
		duration: [100, 100],
		hideOnClick: false
	});
	Vue.component("tippy", TippyComponent);
};
