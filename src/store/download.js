export const state = () => ({
	platform: "",
	type: ""
});

export const mutations = {
	setDL(state, value) {
		state.platform = value.platform;
		state.type = value.type;
	}
};
