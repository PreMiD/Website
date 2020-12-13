// Import base config
import buildModules from "./config/buildModules"
import loading from "./config/loading";
import modules from "./config/modules";
import plugins from "./config/plugins";
import build from "./config/build";
import proxy from "./config/proxy";
import head from "./config/head";
import env from "./config/env"

// Import module specific configs
import axios from "./config/modules/axios";
import auth from "./config/modules/auth";

// Constant variables
const loading = "~/components/Loader.vue"
const css = ["~stylesheets/root.scss"]
const components = true
const rootDir = "./"
const srcDir = "src"

export default {
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
	build,
};
