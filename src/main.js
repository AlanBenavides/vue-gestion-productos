import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import instance from "@/services/axios";
import Vuelidate from "vuelidate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    idSelected: [-1, 0],
    groupIDselected: {},
    auth: false,
  },
  mutations: {
    addID(state, newID) {
      if (Object.keys(state.groupIDselected).length < 5) {
        Vue.set(state.groupIDselected, newID[0], [1, newID[1]]);
      }
    },
    changeSelection(state, newId) {
      state.idSelected = newId;
    },
    deleteID(state, ID) {
      Vue.delete(state.groupIDselected, ID);
    },
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
    updateGroup(state, newGroup) {
      Object.keys(state.groupIDselected).forEach(function (key) {
        delete state.groupIDselected[key];
      });

      for (let id in newGroup) {
        Vue.set(state.groupIDselected, id, newGroup[id]);
      }
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

export default store;
