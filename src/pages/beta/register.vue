<template>
	<div class="promo-container beta">
		<div class="section section--features section--features--beta-register">
			<div class="promo-container__heading">
				<h1 class="heading__logo">
					<img :src="require('@/assets/images/premid-beta.png')" />
				</h1>
			</div>
			<div id="thankYou-container" class="card--feature card--feature--reverse">
				<div class="card--feature__details">
					<h1>{{ title }}</h1>
					<p>{{ message }}</p>
					<a href="/" class="button button--sm router-link-active">{{
						$t("error.page.button")
					}}</a>
				</div>
			</div>
			<div class="waves-divider waves-divider_bottom">
				<svg
					class="wave"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 100"
					preserveAspectRatio="none"
				>
					<path
						class="wave-animation"
						d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Register",
		auth: true,
		data() {
			return {
				title: "",
				message: ""
			};
		},
		mounted() {
			if (this.$auth.loggedIn) {
				axios
					.post(
						`${process.env.apiBase}/addBetaUser/${this.$auth.$storage._state["_token.discord"]}`
					)
					.then(response => {
						if (!response.data.error) {
							this.title = this.$t("thankyou.title");
							this.message = this.$t("thankyou.description");
						} else if (response.data.error) {
							this.title = "Uh oh!";
							if (response.data.error == 3) {
								this.message =
									"Our monkeys say that you are already a beta user.";
							} else {
								this.message = response.data.message;
							}
						}
					});
			} else {
				this.$router.push("/");
			}
		},
		head: {
			title: "Register"
		}
	};
</script>
