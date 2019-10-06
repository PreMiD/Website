import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      // If URL not matching any registered one then we drop user to 404 page.
      path: "*",
      name: "notfound",
      component: require("@/pages/errors/NotFound").default,
    },
    {
      path: "",
      alias: "/home",
      name: "home",
      component: require("@/pages/Home").default,
    },
    {
      path: "/store",
      name: "presenceCategories",
      component: require("@/pages/Store").default,
      props: route => ({ page: route.query.page, category: route.query.category })
    },
    {
      path: "/users/:userid",
      name: "userPage",
      component: require("@/pages/store/Userpage").default,
    },
    {
      path: "/store/presences/:presenceName",
      name: "presencePage",
      component: require("@/pages/store/PresenceFullpage").default,
    },
    {
      path: "/downloads",
      name: "downloads",
      alias: "/download",
      component: require("@/pages/Downloads").default,
    },
    {
      path: "/contributors",
      name: "contributors",
      alias: "/credits",
      component: require("@/pages/Contributors").default,
    },
    {
      path: "/privacy",
      name: "privacy",
      component: require("@/pages/legal/Privacy").default,
    },
    {
      path: "/cookies",
      name: "cookies",
      component: require("@/pages/legal/Cookies").default,
    },
    {
      path: "/tos",
      name: "tos",
      alias: "/terms",
      component: require("@/pages/legal/ToS").default,
    },
    {
      path: "/maintenance",
      name: "maintenance",
      alias: "/maintenance",
      component: require("@/pages/errors/Maintenance").default,
    },
  ],
});
