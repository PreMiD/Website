// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router.js';

// Tooltips
import VueTippy from 'vue-tippy';

// Notifications
import VueNoty from 'vuejs-noty'

Vue.use(VueNoty, {
    timeout: 0,
    progressBar: false,
    layout: 'topCenter',
    theme: 'premid',
    // animation: {
    //     open: 'animated fade',
    //     close: 'animated fade'
    // }
});
Vue.use(VueTippy);
Vue.config.productionTip = false;

Vue.mixin({
    // All methods that are defined here going to be global, use it carefully!
    methods: {
        // /DEBUG MESSAGES
        debugMessage: function (message) {
            console.log(
                '%cPreMiD%c ' + message,
                'color: #fff; font-weight: 900; padding: 3px 7px; margin: 3px; background: #596cae; border-radius: 50px;',
                'color: #596cae;'
            );
        },
        errorMessage: function (message) {
            console.log(
                '%cPreMiD%c ' + message,
                'color: #fff; font-weight: 900; padding: 3px 7px; margin: 3px; background: crimson; border-radius: 50px;',
                'color: crimson;'
            );
        },
        // DEBUG MESSAGES/
        floatingNotification: function (message) {

        }

    }
});

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
