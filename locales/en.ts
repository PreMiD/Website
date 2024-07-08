import { defineI18nLocale } from "#i18n";

export default defineI18nLocale(() => ({
	header: {
		links: {
			contributors: "Contributors",
			downloads: "Downloads",
			features: "Features",
			store: "Store",
		},
	},
	page: {
		contributors: {
			presenceDevelopers: "Presence Developers",
			staff: "Staff",
			supporters: "Supporters",
			translators: "Translators",
		},
	},
	store: {
		categories: {
			all: "All",
			anime: "Anime",
			games: "Games",
			music: "Music",
			other: "Other",
			socials: "Socials",
			videos: "Videos & Streams",
		},
		filter: { search: "Search" },
		header: { categories: "Categories", search: "Search Presence" },
	},
}));
