<template>
	<p>Please wait while we are logging you out...</p>
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
