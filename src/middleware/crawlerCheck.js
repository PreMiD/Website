const verify = require("googlebot-verify");

export default async function (req, res, next) {
	if (req.headers["user-agent"].toLowerCase().includes("googlebot")) {
		if (
			!(await verify(
				req.headers["x-forwarded-for"] || req.connection.remoteAddress
			))
		)
			return res.connection.destroy();
	}

	return next();
}
