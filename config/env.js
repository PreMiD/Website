let apiBase, graphQLapiBase;

if (process.env.HOSTNAME) {
	apiBase = `${process.env.HOSTNAME}/v2`;
	graphQLapiBase = `${process.env.HOSTNAME}/v3`;
} else {
	apiBase = "https://api.premid.app/v2";
	graphQLapiBase = "https://api.premid.app/v3";
}

export default {
	apiBase,
	graphQLapiBase
};
