export const state = () => ({
	addedPresences: [],
	likedPresences: []
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
	},
	initializeLikedPresences(state, storage) {
		const likedPresences = storage.getItem("likedPresences");

		if (!likedPresences) return;
		else if (likedPresences && likedPresences.split(",").length > 0)
			state.likedPresences = likedPresences.split(",");
	},
	like(state, presence) {
		state.likedPresences.includes(presence)
			? state.likedPresences.pop(presence)
			: state.likedPresences.push(presence);
	}
};
