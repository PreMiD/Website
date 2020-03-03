<template>
	<div>
		<afterRegistration :title="title" :message="message" />
	</div>
</template>

<script>
	import axios from "axios";
	import afterRegistration from "~/views/beta/afterRegistration";

	export default {
		name: "Register",
		auth: true,
		components: { afterRegistration },
		data() {
			return {
				title: "",
				message: ""
			};
		},
		mounted: function() {
			this.register();
		},
		methods: {
			register() {
				let userId = this.$auth.user.id;
				if (userId) {
					axios
						.post(`${process.env.apiBase}/addBetaUser/${userId}`)
						.then(response => {
							if (!response.data.error) {
								this.title = this.$t("thankyou.title");
								this.message = this.$t("thankyou.description");
							} else if (response.data.error) {
								this.title = "Uh oh!";
								if (response.data.error == 2) {
									this.message =
										"Our monkeys say that you are already a beta user.";
								} else {
									this.message = response.data.message;
								}
							}
						});
				}
			}
		},
		head() {
			return {
				title: "Register"
			};
		}
	};
</script>
