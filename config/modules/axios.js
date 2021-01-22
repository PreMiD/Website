import constants from "../constants";

export default {
	baseURL: constants.baseURL,
	retry: { retries: 3 },
	credentials: false,
	proxy: true
};
