const state = {
  currentUser: null,
}

const actions = {
  setCurrentUser(context, user) {
    context.commit('recieveUser', user)
  }
}

const mutations = {
  recieveUser (state, user) {
    state.currentUser = user
  }
};

const getters = {
  currentUser (state) {
    return state.currentUser;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
