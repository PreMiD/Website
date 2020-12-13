let baseURL;

if (process.env.HOSTNAME) baseURL = `http://${process.env.HOSTNAME}`;
else baseURL = "https://api.premid.app";

export default {
	HOSTNAME: process.env.HOSTNAME,
	baseURL
};
