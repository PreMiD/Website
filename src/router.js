import Vue from "vue";
import Router from "vue-router";

import Index from "~/views/Homepage";
import Store from "~/views/Store";
import Cookies from "~/views/legal/Cookies";
import Privacy from "~/views/legal/Privacy";
import ToS from "~/views/legal/ToS";
import Presence from "~/views/store/PresencePage";
import Userpage from "~/views/users/Userpage";
import Contributors from "~/views/Contributors";
import Downloads from "~/views/Downloads";
import Beta from "~/views/Beta";
import NotFound from "~/views/errors/NotFound";
import loginPage from "~/views/auth/Login";
import logoutPage from '~/views/auth/Logout';
import callbackPage from '~/views/auth/AuthCallback';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    auth: false,
    routes: [
      {
        path: "*",
        component: NotFound
      },
      {
        path: "/",
        component: Index
      },
      {
        path: "/tos",
        component: ToS
      },
      {
        path: "/privacy",
        component: Privacy
      },
      {
        path: "/cookies",
        component: Cookies
      },
      {
        path: "/store",
        component: Store
      },
      {
        path: "/contributors",
        component: Contributors
      },
      {
        path: "/downloads",
        component: Downloads
      },
      {
        path: "/beta",
        component: Beta
      },
      {
        path: "/store/presences/:presenceName",
        component: Presence
      },
      {
        path: "/users/:userid",
        component: Userpage
      },
      {
        path: "/login",
        component: loginPage
      },
      {
        path: "/callback",
        component: callbackPage
      },
      {
        path: "/logout",
        component: logoutPage
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
          // , offset: { x: 0, y: 10 }
        };
      }
    }
  });
}
