<template>
	<div>
		<div class="languages-container" @click="closeSwitcher">
			<div class="languages-list">
				<button
					v-for="lang in $i18n.locales"
					:key="lang.code"
					:class="{ active: $i18n.locale === lang.code }"
					class="languages-list__item"
					@click="$i18n.setLocale(lang.code)"
					v-text="lang.name"
				/>
			</div>
			<a class="languages-container__close" @click="closeSwitcher">
				<i class="fa-times fas" />
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LanguageSwitcher",
		methods: {
			closeSwitcher() {
				this.$parent.$data.switcherVisible = false;
			},
			closeSwitcherListener(ev) {
				if (ev.key.toLowerCase() == "escape") this.closeSwitcher();
			}
		},
		beforeDestroy() {
			window.removeEventListener("keydown", this.closeSwitcherListener);
		},
		mounted() {
			window.addEventListener("keydown", this.closeSwitcherListener);
		}
	};
</script>
