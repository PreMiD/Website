export const state = () => ({
	addedPresences: []
});

export const getters = {
	presenceList(state) {
		return state.addedPresences;
	}
};

export const actions = {
	getPresences(store) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(store.state.addedPresences);
			}, 100);
		});
	}
};

export const mutations = {
	set(state, presences) {
		state.addedPresences = presences;
	},
	add(state, presence) {
		state.addedPresences.push(presence);
	},
	remove(state, presence) {
		state.addedPresences.pop(presence);
	}
};
