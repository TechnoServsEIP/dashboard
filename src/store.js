import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    client: null,
    serverCreateInfo: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setClient(state, client) {
      state.client = client
    },
    setServerCreateInfo(state, obj) {
      state.serverCreateInfo = obj
    },
    updateTokens(state, tokens) {
      state.user.token = tokens.token
      state.user.refresh_token = tokens.refresh_token
      client._token = tokens.token
    },
  },
  getters: {
    getToken(state) {
      return state.user.token
    },
  },
  plugins: [createPersistedState()],
})

export default store
