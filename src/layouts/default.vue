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
		<header>
			<Navigation />
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
		head() {
			return {
				htmlAttrs: {
					lang: this.$i18n.locale
				}
			};
		},
		data() {
			return {
				switcherVisible: false,
				ua: process.server ? "" : navigator.userAgent
			};
		},
		methods: {
			toggleSwitcher() {
				this.switcherVisible = !this.switcherVisible;
			}
		}
	};
</script>
