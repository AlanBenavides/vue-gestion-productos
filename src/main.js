import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import instance from "@/services/axios";
import Vuelidate from "vuelidate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    idSelected: -1,
  },
  mutations: {
    changeSelection(state, newId) {
      state.idSelected = newId;
    },
  },
});

Vue.config.productionTip = false;
Vue.prototype.$http = instance;
Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
