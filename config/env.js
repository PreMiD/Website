let graphQLapiBase;

if (process.env.HOSTNAME) {
	graphQLapiBase = `${process.env.HOSTNAME}/v3`;
} else {
	graphQLapiBase = "https://api.premid.app/v3";
}

export default {
	graphQLapiBase
};
