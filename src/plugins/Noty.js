import Vue from "vue";
import VueNoty from "vuejs-noty";

Vue.use(VueNoty, {
	timeout: 1000,
	progressBar: false,
	layout: "topRight",
	theme: "premid"
});
