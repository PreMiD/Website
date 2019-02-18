import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "",
            redirect: "/Home"
        },
        {
            path: "/Home",
            name: "Home",
            component: require("@/pages/Home").default,
        },
        {
            path: "/Store",
            name: "Store",
            component: require("@/pages/Store").default
        },
        {
            path: "/Downloads",
            name: "Downloads",
            component: require("@/pages/Downloads").default
        },
        {
            path: "/Contributors",
            name: "Contributors",
            component: require("@/pages/Contributors").default
        },
        {
            path: "/Submit",
            name: "Submit",
            component: require("@/pages/Submit").default
        }
    ]
});