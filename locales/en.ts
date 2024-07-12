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
			avatar: {
				tooltip: "Click to copy {name}'s avatar",
			},
		},
		downloads: {
			title: "Downloads",
			steps: {
				install: "Install Extension",
				login: "Login with Discord",
				add: "Add Presences",
				showoff: "Show off!",
			},
			section: {
				heading: {
					title: "Time to show off.",
					description: "Use PreMiD now and show off to your friends what you're doing, maybe you find someone with the same interests.",
				},
			},
			browser: {
				your: "Your browser",
				other: "Other browsers",
				support: {
					safari: "We're working on supporting Safari, stay tuned!",
				},
			},
			faq: "Frequently Asked Questions",
		},
		store: {
			noPresence: "No presence matches your search...",
			presence: {
				button: {
					add: "Add Presence",
					remove: "Remove Presence",
					reportIssue: "Report an Issue",
					suggestFeature: "Suggest a Feature",
					viewCode: "View Code",
				},
				title: {
					description: "Description",
					information: "Information",
				},
				informationSection: {
					contributors: "Contributors:",
					version: "Version: {version}",
					users: "Users: {users}",
					tags: "Tags:",
					supportedUrls: "Supported URLs:",
				},
			},
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
	},
	footer: {
		partners: "Partners",
		followUs: "Follow us",
		supportUs: "Support us",
		more: "More",
		legal: "Legal",
		supportList: {
			donate: "Donate",
			contribute: "Contribute",
			translate: "Translate",
		},
		moreList: {
			troubleshooting: "Troubleshooting",
			faq: "FAQ",
			documentation: "Documentation",
			status: "Status",
		},
		legalList: {
			privacyPolicy: "Privacy Policy",
			termsOfService: "Terms of Service",
			cookiePolicy: "Cookie Policy",
		},
		withLoveBy: "With",
		by: "by",
		copyright: "© {year}-{currentYear} {company} All rights reserved.",
	},
}));
