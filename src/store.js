import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    client: null,
    serverCreateInfo: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setClient(state, client) {
      state.client = client;
    },
    setServerCreateInfo(state, obj) {
      state.serverCreateInfo = obj
    }
  },
  plugins: [createPersistedState()],
});

export default store;
