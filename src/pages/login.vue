<template>
	<p>Please wait for the redirection...</p>
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
