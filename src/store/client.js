const state = {
  client: null,
  token: null,
  dockers: null,
  offers: null
}

const getters = {
  client(state) {
    return state.client
  },
  token(state) {
    return state.token
  },
  dockers(state) {
    return state.dockers
  },
  offers(state) {
    return state.offers
  }
}

const actions = {
  setClient(context, client) {
    context.commit('buildClient', client)
  },
  setToken(context, token) {
    context.commit('buildToken', token)
  },
  setDockers(context, dockers) {
    context.commit('buildDockers', dockers)
  },
  setOffers(context, offers) {
    context.commit('buildOffers', offers)
  }
}

const mutations = {
  buildClient(state, client) {
    state.client = client
  },
  buildToken(state, token) {
    state.token = token
  },
  buildDockers(state, dockers) {
    state.dockers = dockers
  },
  buildOffers(state, offers) {
    state.offers = offers
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
