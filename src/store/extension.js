export const state = () => ({
    extensionInstalled: false
});

export const getters = {
    userHasExtension(state) {
        return state.extensionInstalled;
    },
}

export const mutations = {
    setInstalled(state, boolean) {
        state.extensionInstalled = boolean;
    },
}
