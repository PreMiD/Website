// Import base config

import auth from "./config/modules/auth";
import axios from "./config/modules/axios";
import build from "./config/build";
import buildModules from "./config/buildModules";
import env from "./config/env";
import head from "./config/head";
import modules from "./config/modules";
import plugins from "./config/plugins";
import proxy from "./config/proxy";

// Import module specific configs

// Constant variables
const loading = "~/components/Loader.vue";
const css = ["~stylesheets/root.scss"];
const components = true;
const rootDir = "./";
const srcDir = "src";

export default {
	serverMiddleware: ["~/middleware/crawlerCheck.js"],
	rootDir,
	srcDir,
	head,
	auth,
	axios,
	proxy,
	loading,
	buildModules,
	components,
	css,
	env,
	modules,
	plugins,
	build
};
