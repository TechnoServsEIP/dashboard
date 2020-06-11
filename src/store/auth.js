import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  token: null
}

const getters = {
}

const actions = {
  setAuth(context, token) {
    context.commit('recieveAuth', token)
  }
}

const mutations = {
  recieveToken(state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
