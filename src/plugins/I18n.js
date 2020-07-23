import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app, store }) => {
	// Set i18n instance on app
	// This way we can use it in middleware and pages asyncData/fetch
	app.i18n = new VueI18n({
		locale:
			process.env.VUE_APP_I18N_LOCALE || process.client
				? window.navigator.language
				: "en" || "en",
		fallbackLocale: "en",
		messages: loadLocaleMessages(),
		numberFormats: loadLocaleCurrencies()
	});

	app.i18n.path = link => {
		if (app.i18n.locale === app.i18n.fallbackLocale) {
			return `/${link}`;
		}

		return `/${app.i18n.locale}/${link}`;
	};
};

function loadLocaleMessages() {
	const locales = require.context("~/langs", true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const messages = {};
	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);
		if (matched && matched.length > 1) {
			const locale = matched[1];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

function loadLocaleCurrencies() {
	const locales = require.context("~/langs", true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const numberFormats = {};
	locales.keys().forEach(key => {
		key = key.match(/([A-Za-z0-9-_]+)\./i);
		numberFormats[key[1]] = {
			currency: { style: "currency", currency: "EUR" }
		};
	});
	return numberFormats;
}
