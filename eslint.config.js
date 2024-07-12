import antfu from "@antfu/eslint-config";

export default antfu({
	formatters: true,
	unocss: true,
	vue: true,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
});
