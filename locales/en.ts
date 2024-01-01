import { defineI18nLocale } from "#i18n";

export default defineI18nLocale(() => ({
	header: {
		links: {
			contributors: "Contributors",
			downloads: "Downloads",
			store: "Store"
		}
	},
	page: {
		contributors: {
			presenceDevelopers: "Presence Developers",
			staff: "Staff",
			supporters: "Supporters",
			translators: "Translators"
		}
	}
}));
