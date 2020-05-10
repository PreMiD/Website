(async () => {
	const child_process = require("child_process"),
		{ readFileSync, writeFileSync } = require("fs"),
		fGlob = require("fast-glob"),
		child = child_process.execFileSync("git rev-parse HEAD", { shell: true }),
		rHash = child.toString().trim().replace(/\d/g, ""),
		files = await fGlob(".nuxt/dist/*/**.js", { onlyFiles: true });

	for (let i = 0; i < files.length; i++) {
		let content = readFileSync(files[i], "utf-8");
		if (
			content.indexOf("checkBlock") ||
			content.indexOf("probsUsingAdBlock") ||
			content.indexOf("countDownValue")
		) {
			content = content.replace(/checkBlock/g, rHash);
			content = content.replace(
				/probsUsingAdBlock/g,
				rHash
					.split("")
					.slice(0, rHash.length - 1 - Math.random() * 20)
					.reverse()
					.join("")
			);
			content = content.replace(
				/countDownValue/g,
				rHash.split("").reverse().join("")
			);
			writeFileSync(files[i], content);
		}
	}
})();
