import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    client: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setClient(state, client) {
      state.client = client;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
