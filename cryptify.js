(async () => {
	const { readFileSync, writeFileSync } = require("fs"),
		fGlob = require("fast-glob"),
		files = await fGlob(".nuxt/dist/*/**.js", { onlyFiles: true });

	for (let i = 0; i < files.length; i++) {
		let content = readFileSync(files[i], "utf-8");
		if (
			content.indexOf("checkBlock") ||
			content.indexOf("probsUsingAdBlock") ||
			content.indexOf("countDownValue") ||
			content.indexOf("adBlockInterval") ||
			content.indexOf("countDownBtn") ||
			content.indexOf("customInterval") ||
			content.indexOf("intervalFunc")
		) {
			content = content.replace(/checkBlock/g, rString());
			content = content.replace(/probsUsingAdBlock/g, rString());
			content = content.replace(/countDownValue/g, rString());
			content = content.replace(/adBlockInterval/g, rString());
			content = content.replace(/countDownBtn/g, rString());
			content = content.replace(/customInterval/g, rString());
			content = content.replace(/intervalFunc/g, rString());
			writeFileSync(files[i], content);
		}
	}
})();

function rString() {
	const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"];
	// and then just do:
	return [...Array(10)]
		.map(() => chars[(Math.random() * chars.length) | 0])
		.join("");
}
