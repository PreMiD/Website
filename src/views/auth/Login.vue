<template></template>

<script>
// Do not remove <template> from the document, it will not work without them.

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
