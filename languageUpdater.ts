import axios from "axios";
import { existsSync, mkdirSync, writeFileSync } from "fs";

run();

async function run() {
	if (!existsSync("./src/langs/")) mkdirSync("./src/langs/");

	let awaitingTranslations = true,
		translations: any;

	while (awaitingTranslations) {
		try {
			translations = (
				await axios.post("https://api.premid.app/v3", {
					query: `
            {
              langFiles(project:"website") {
                lang
                translations
              }
            }`
				})
			).data.data.langFiles;
			awaitingTranslations = false;
		} catch (_) {}
	}

	translations.forEach((langTranslations: any) => {
		const keys = Object.keys(langTranslations.translations);
		for (let i = 0; keys.length > i; i++) {
			const translations = langTranslations.translations[keys[i]];
			delete langTranslations.translations[keys[i]];
			langTranslations.translations[keys[i].replace(/_/g, ".")] = translations;
		}

		writeFileSync(
			`./src/langs/${langTranslations.lang}.json`,
			JSON.stringify(langTranslations.translations)
		);
	});
}
