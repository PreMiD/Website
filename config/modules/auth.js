export default {
	redirect: {
		login: "/login",
		logout: "/",
		callback: "/callback",
		home: "/"
	},
	strategies: {
		local: false,
		discord: {
			_scheme: "oauth2",
			authorization_endpoint: "https://discordapp.com/api/oauth2/authorize",
			userinfo_endpoint: "https://discordapp.com/api/users/@me",
			scope: ["identify"],
			client_id: "503557087041683458"
		}
	}
};
