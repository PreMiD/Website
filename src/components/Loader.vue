<template lang="html">
	<transition name="loader">
		<div v-if="loading" class="loader-container">
			<div class="loader">
				<nuxt-img alt="Logo" :src="Logo" />
				<p>{{ randomLoadingString() }}</p>
			</div>
		</div>
	</transition>
</template>

<script>
	import Logo from "../assets/images/pmd_logo.svg";

	export default {
		name: "Loader",
		data() {
			return {
				loading: false,
				Logo
			};
		},
		mounted() {},
		methods: {
			start() {
				this.loading = true;
			},
			finish() {
				this.loading = false;
			},
			randomLoadingString() {
				var textArray = this.$t("header.loader.phrases").split(";");
				var randomNumber = Math.floor(Math.random() * textArray.length);

				return textArray[randomNumber];
			}
		}
	};
</script>
