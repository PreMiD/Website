import Vue from "vue";
import Paginate from "vuejs-paginate";

export default ({ app }) => {
	Vue.use(Paginate);
	Vue.component("paginate", Paginate);
};
