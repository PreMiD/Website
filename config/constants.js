let baseURL;
if (process.env.HOSTNAME) baseURL = `${process.env.HOSTNAME}`;
else baseURL = "https://api.premid.app";

export default {
	baseURL
};
