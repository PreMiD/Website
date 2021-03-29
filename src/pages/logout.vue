<template>
	<h1 class="text-highlight">Please wait while we are logging you out...</h1>
</template>

<script>
	export default {
		created() {
			this.$auth.logout();
			this.$router.push("/");
		},
		head() {
			return {
				title: "Logout",
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
