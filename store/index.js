export const state = () => {
  token: null
}

export const mutations = {
  updateToken(state, token) {
    state.token = token
  }
}
