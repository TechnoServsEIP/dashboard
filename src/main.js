/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Technoservs } from "technoservs.js";
import "./registerServiceWorker";
import ArgonDashboard from "./plugins/argon-dashboard";
import axios from "./plugins/axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Zendesk from "@dansmaculotte/vue-zendesk";

Vue.use(ElementUI);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.use(ArgonDashboard);
Vue.prototype.$axios = axios;

Vue.use(Zendesk, {
  key: "573edfc1-1877-4773-a7fa-35d87583fa46",
  disabled: false,
  settings: {
    webWidget: {
      color: {
        theme: "#18194d"
      }
    }
  }
});

if (store.state.user != null) {
  store.commit("setClient", new Technoservs(store.state.user.token));
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
