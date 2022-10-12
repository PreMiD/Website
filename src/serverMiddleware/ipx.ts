import { createIPX, createIPXMiddleware } from "ipx";
import { resolve } from "path";

console.log(resolve("./static"));

const ipx = createIPX({
	maxAge: 60 * 60 * 24 * 365,
	dir: resolve("./src/static")
});

export default createIPXMiddleware(ipx);
