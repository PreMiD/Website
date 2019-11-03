export const state = () => ({
  addedPresences: []
});

export const mutations = {
  set(state, presences) {
    state.addedPresences = presences;
  },
  add(state, presence) {
    state.addedPresences.push(presence);
  }
};
