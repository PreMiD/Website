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
