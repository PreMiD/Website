<template></template>

<script>
// Do not remove <template> from the document, it will not work without them.

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
