<template>
	<div>
		<div v-for="lang in $root.$data.i18nLanguageList" :key="lang">
			<div
				v-if="
					!declined &&
						getBrowserLanguage() === lang &&
						getCurrentLanguage() !== lang
				"
				class="language-notify__wrapper"
			>
				<div class="language-notify">
					<div class="language-notify__content">
						<h2>{{ $t(`header.languageNotification.title`, lang) }}</h2>
						<p>{{ $t(`header.languageNotification.text`, lang) }}</p>
					</div>
					<div class="language-notify__buttons">
						<a class="button button--sm" href="#" @click="setLanguage(lang)">{{
							$t(`header.languageNotification.btnAccept`, lang)
						}}</a>
						<a class="button button--sm" href="#" @click="declineNotify()">{{
							$t(`header.languageNotification.btnDecline`, lang)
						}}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LanguageNotification",
		data() {
			return {
				declined: false
			};
		},
		created() {
			if (process.server) return;
			if (localStorage.declined !== "false")
				this.declined = localStorage.declined;
		},
		methods: {
			declineNotify() {
				if (process.server) return;
				localStorage.declined = true;
				this.declined = localStorage.declined;
			}
		}
	};
</script>
