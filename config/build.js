export default {
	extend(config, {}) {
		config.node = {
			dns: "empty"
		};
	},
	cache: true,
	ssr: true,
	friendlyErrors: true,
	hotMiddleware: {
		client: {
			overlay: false
		}
	}
};
