<template>
	<div id="app">
		<LanguageSwitcher v-if="switcherVisible" />
		<div class="floating-button">
			<span
				v-tippy
				:content="$t('home.languageSelector.tippy')"
				class="button button--gray button--language-switch"
				@click="toggleSwitcher"
			>
				<i class="fa-language fas"></i>
			</span>
		</div>
		<!--
      ! Disabled for now as it somehow breaks the page in production
    <LanguageNotification />
		-->
		<header>
			<navigation />
		</header>
		<div class="app-wrapper">
			<div class="content">
				<nuxt />
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Detection from "~/components/mixins/Detection";
	import Debug from "~/components/mixins/Debug";

	export default {
		name: "PremidWeb",
		mixins: [Debug, Detection],
		data() {
			return {
				switcherVisible: false,
				ua: process.server ? "" : navigator.userAgent
			};
		},
		created() {
			this.$root.$data.i18nLanguageList = this.$i18n.availableLocales;

			if (process.browser) {
				if (localStorage.language !== undefined) {
					this.$root.$i18n.locale = localStorage.language;
				}
			} else this.$root.$i18n.locale = "en";

			this.$root.$data.navigatorLanguage = this.getBrowserLanguage();
			this.$root.$data.i18nLanguage = this.getCurrentLanguage();
		},
		methods: {
			toggleSwitcher() {
				this.$data.switcherVisible = !this.$data.switcherVisible;
			}
		}
	};
</script>
