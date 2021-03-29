<template>
	<h1 class="text-highlight">Redirecting...</h1>
</template>

<script>
	export default {
		mounted() {
			if (this.$auth.loggedIn) {
				this.$router.push("/");
				return;
			}
			this.$auth.login("discord");
		},
		head() {
			return {
				title: "Authorization",
				titleTemplate: ""
			};
		}
	};
</script>

<style lang="scss" scoped>
	h1 {
		text-align: center;
	}
</style>
