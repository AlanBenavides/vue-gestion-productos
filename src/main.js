import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import instance from "@/services/axios";

Vue.config.productionTip = false;
Vue.prototype.$http = instance;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id_selected: -1
  },
  mutations: {
    change_selection (state, new_id) {
      state.id_selected = new_id;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");