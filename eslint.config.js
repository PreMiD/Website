import antfu from "@antfu/eslint-config";

export default antfu({
	ignores: [".pnpm-store"],
	formatters: true,
	unocss: true,
	vue: true,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
});
