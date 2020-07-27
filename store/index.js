export const state = () => ({
  user: null
});

export const mutations = {
  updateUser(state, user) {
    state.user = user;
  }
};
