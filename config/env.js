let apiBase, graphQLapiBase;

if (process.env.HOSTNAME) {
	apiBase = `http://${process.env.HOSTNAME}/v2`;
	graphQLapiBase = `http://${process.env.HOSTNAME}/v2`;
} else {
	apiBase = "https://api.premid.app/v2";
	graphQLapiBase = "https://api.premid.app/v3";
}

export default {
	apiBase,
	graphQLapiBase
};
