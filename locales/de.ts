import { defineI18nLocale } from "#i18n";

export default defineI18nLocale(() => ({
	component: {
		searchBar: {
			search: "Suchen",
			sortBy: "Sortieren nach",
			searchPresence: "Presence suchen",
			sort: {
				mostUsed: "Am häufigsten verwendet",
				alphabetical: "Alphabetisch",
				likedFirst: "Beliebteste zuerst",
			},
			categories: {
				all: "Alle",
				anime: "Anime",
				games: "Spiele",
				music: "Musik",
				other: "Sonstiges",
				socials: "Soziale Medien",
				videos: "Videos & Streams",
			},
		},
		browserCard: {
			wip: "In Bearbeitung",
			support: {
				safari: "Wir arbeiten daran, Safari zu unterstützen, bleibt dran!",
			},
		},
		userChip: {
			loading: "Lädt...",
		},
		storeCard: {
			addPresence: "Presence hinzufügen",
		},
		donationModal: {
			title: "Eine kleine Bitte...",
			description: "Wir hoffen, dir gefällt PreMiD! Wenn es dir ein Lächeln ins Gesicht zaubert, warum nicht etwas Liebe zurückgeben? Unser Team aus Freiwilligen steckt ihr Herzblut hinein, um es dir großartig zu machen!",
			continue: "Weiter",
			close: "Schließen",
			patreon: "Unterstützen auf {name}",
			github: "Sponsern auf {name}",
			holdTight: "Halte durch... Lade den magischen Knopf...",
		},
	},
	header: {
		links: {
			contributors: "Mitwirkende",
			downloads: "Downloads",
			features: "Funktionen",
			store: "Store",
		},
	},
	page: {
		users: {
			userPage: {
				title: "Presence-Beiträge",
				error: {
					title: "Fehler",
					description: "Wir haben Probleme, diesen Benutzer zu laden... Bitte versuche es später erneut.",
				},
			},
		},
		home: {
			meta: {
				title: "Startseite",
			},
			title: "Verbessere deine Online-Präsenz mit PreMiD",
			subtitle: "Zeige deinen Freunden, welche {word} du genießt.",
			words: {
				music: "Musik",
				videos: "Videos",
				streams: "Streams",
				media: "Medien",
			},
			description: "PreMiD ist ein einfaches, leistungsstarkes Tool, mit dem du deine aktuellen Medienaktivitäten auf mehreren Plattformen wie YouTube, Spotify, Netflix und mehr teilen kannst. Bleib verbunden und lass deine Freunde in Echtzeit sehen, was du machst.",
			getStarted: "Loslegen",
			sections: {
				feature: {
					title: "Warum du PreMiD lieben wirst",
					feature1: {
						title: "Datenschutzkontrolle",
						description: "Übernimm die Kontrolle über deine Datenschutzeinstellungen und entscheide, welche Aktivitäten du mit anderen teilst. Deine Daten, deine Regeln.",
					},
					feature2: {
						title: "Community-Getrieben",
						description: "Erlebe beispiellose Unterstützung für eine Vielzahl von Plattformen, angetrieben von einer leidenschaftlichen und engagierten Community.",
					},
					feature3: {
						title: "Anpassbare Einstellungen",
						description: "Passe dein PreMiD-Erlebnis mit umfangreichen Anpassungsoptionen an deine Vorlieben und Bedürfnisse an.",
					},
					feature4: {
						title: "Einfache Einrichtung",
						description: "In kürzester Zeit mit PreMiD startklar. Unser unkomplizierter Einrichtungsprozess sorgt für einen reibungslosen Start.",
					},
					feature5: {
						title: "Discord ToS Konform",
						description: "Vollständig konform mit den Nutzungsbedingungen von Discord durch die Nutzung offizieller Endpunkte von Discord.",
					},
					feature6: {
						title: "Zukünftige Funktionen",
						description: "Bleib gespannt auf spannende neue Funktionen und Verbesserungen, die dein PreMiD-Erlebnis noch weiter verbessern werden.",
					},
				},
				howItWorks: {
					title: "So funktioniert es",
					step1: {
						title: "Erweiterung installieren",
						description: "Füge PreMiD zu deinem Browser hinzu.",
					},
					step2: {
						title: "Mit Discord einloggen",
						description: "Verbinde PreMiD mit deinem Discord-Konto.",
					},
					step3: {
						title: "Dienste hinzufügen",
						description: "Wähle die Dienste aus, die du anzeigen möchtest, wie YouTube, Spotify und mehr.",
					},
					step4: {
						title: "Genießen",
						description: "Teile deine Aktivitäten und genieße die Nutzung von PreMiD.",
					},
				},
				callToAction: {
					title: "Bereit loszulegen?",
					description: "Schließe dich den {count} Benutzern an, die PreMiD bereits lieben.",
					button: "Jetzt starten",
				},
			},
		},
		contributors: {
			title: "Mitwirkende",
			presenceDevelopers: "Presence-Entwickler",
			staff: "Mitarbeiter",
			supporters: "Unterstützer",
			translators: "Übersetzer",
			avatar: {
				tooltip: "Klicken, um {name}s Avatar zu kopieren",
			},
		},
		downloads: {
			title: "Downloads",
			steps: {
				install: "Erweiterung installieren",
				login: "Mit Discord einloggen",
				add: "Presences hinzufügen",
				showoff: "Angeben!",
			},
			section: {
				heading: {
					title: "Zeit zum Angeben.",
					description: "Nutze PreMiD jetzt und zeige deinen Freunden, was du machst. Vielleicht findest du jemanden mit den gleichen Interessen.",
					getStarted: "Loslegen",
					extension: "Erweiterung",
				},
			},
			browser: {
				your: "Dein Browser",
				other: "Andere Browser",
				based: "{browser} basierend",
			},
			faq: "Häufig gestellte Fragen",
		},
		store: {
			title: "Store",
			noPresence: "Keine Presence entspricht deiner Suche...",
			presence: {
				button: {
					add: "Presence hinzufügen",
					remove: "Presence entfernen",
					reportIssue: "Ein Problem melden",
					suggestFeature: "Eine Funktion vorschlagen",
					viewCode: "Code anzeigen",
				},
				title: {
					description: "Beschreibung",
					information: "Informationen",
				},
				informationSection: {
					contributors: "Mitwirkende:",
					version: "Version: {version}",
					users: "Benutzer: {users}",
					tags: "Tags:",
					supportedUrls: "Unterstützte URLs:",
				},
			},
			header: { categories: "Kategorien", search: "Presence suchen" },
		},
	},
	footer: {
		partners: "Partner",
		followUs: "Folge uns",
		supportUs: "Unterstütze uns",
		more: "Mehr",
		legal: "Rechtliches",
		supportList: {
			donate: "Spenden",
			contribute: "Beitragen",
			translate: "Übersetzen",
		},
		moreList: {
			faq: "FAQ",
			documentation: "Dokumentation",
			status: "Status",
		},
		legalList: {
			privacyPolicy: "Datenschutzrichtlinie",
			termsOfService: "Nutzungsbedingungen",
			cookiePolicy: "Cookie-Richtlinie",
		},
		withLoveBy: "Mit",
		by: "von",
		copyright: "© {year}-{currentYear} {company} Alle Rechte vorbehalten.",
	},
	error: {
		404: {
			title: "404",
			message: "Die Seite, die du suchst, existiert nicht.",
		},
		500: {
			title: "500",
			message: "Etwas ist auf unserer Seite schiefgelaufen.",
		},
		default: {
			title: "Fehler",
			message: "Etwas ist auf unserer Seite schiefgelaufen.",
			button: "Zurück",
		},
	},
}));
