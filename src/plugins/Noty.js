import Vue from "vue";
import VueNoty from "vuejs-noty";

export default () => {
	Vue.use(VueNoty, {
		timeout: 1000,
		progressBar: false,
		layout: "topRight",
		theme: "premid"
	});
};
