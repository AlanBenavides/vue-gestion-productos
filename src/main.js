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
    groupIDselected: []
  },
  mutations: {
    changeSelection(state, newId) {
      state.idSelected = newId;
    },
    addID(state, newID){
      
      if(state.groupIDselected.length < 5){
        state.groupIDselected.push(newID);
      }
      
    },
    deleteID(state, ID){
      const index = state.groupIDselected.indexOf(ID);
      if(index > -1){
        state.groupIDselected.splice(index, 1);
      }
    },
    updateGroup(state, newGroup){
      state.groupIDselected.splice(0, state.groupIDselected.length);
      for(let id of newGroup){
        state.groupIDselected.push = id;
      }
     
    }
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
