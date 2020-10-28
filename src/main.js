import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import instance from "@/services/axios";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.$http = instance;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
