let baseURL;
if (process.env.NODE_ENV == "development" && process.env.HOSTNAME)
	baseURL = `http://${process.env.HOSTNAME}`;
else if (process.env.HOSTNAME) baseURL = `${process.env.HOSTNAME}`;
else baseURL = "https://api.premid.app";

export default {
	baseURL
};
