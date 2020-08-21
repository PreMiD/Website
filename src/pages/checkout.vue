<template>
	<div class="merch-container pattern">
		<div id="features" class="section section--features pattern">
			<div class="waves-divider waves-divider_top">
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
			<div class="main">
				<div class="shippingForm">
					<h1 id="billingHeader">{{ $t("checkout.title") }}</h1>
					<h2 id="billingHeader">{{ $t("checkout.shipping") }}</h2>
					<h4 id="billingSubHeader">{{ $t("checkout.subtitle") }}</h4>
					<div class="formInfo">
						<div class="nameForm">
							<h3 class="fname">{{ $t("checkout.fname") }}</h3>
							<h3 class="lname">{{ $t("checkout.lname") }}</h3>
							<input class="fname" autocomplete="given-name" />
							<input class="lname" autocomplete="family-name" />
						</div>
						<h3 class="email">{{ $t("checkout.email") }}</h3>
						<input class="email" autocomplete="email" />
						<h3 class="address">{{ $t("checkout.address") }}</h3>
						<input class="address" autocomplete="address-line1" />
						<h3 class="address2">{{ $t("checkout.address2") }}</h3>
						<input class="address2" autocomplete="address-line2" />
						<h3 class="city">{{ $t("checkout.city") }}</h3>
						<input class="city" />
						<div class="countrystatezip">
							<h3 class="country">{{ $t("checkout.country") }}</h3>
							<select class="country" v-model="selectedCountry">
								<option
									v-for="country in countries"
									:key="country.name"
									:value="country"
									>{{ $t("shipping." + country.code.toLowerCase()) }}</option
								>
							</select>
							<h3 v-if="selectedCountry.states" class="state">
								{{ $t("checkout.state") }}
							</h3>
							<select class="state" autocomplete="address-level1">
								<option
									v-for="state in selectedCountry.states"
									:key="state.name"
									:value="state"
									>{{
										$t(
											"shipping." +
												selectedCountry.code.toLowerCase() +
												"." +
												state.code.toLowerCase()
										)
									}}</option
								>
							</select>
							<h3 class="zip">{{ $t("checkout.zip") }}</h3>
							<input class="zip" autocomplete="postal-code" />
						</div>
					</div>
				</div>
				<div class="orderList">
					<h2 class="cartTitle">{{ $t("checkout.cart") }}</h2>
					<div class="cartProducts">
						<div class="items">
							<div v-for="(item, index) in usersItems" :key="index">
								{{ item }}
							</div>
						</div>
						<div class="promo"></div>
						<div class="total"></div>
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
	</div>
</template>

<script>
	export default {
		name: "Checkout",
		async asyncData({ app }) {
			return app.$axios
				.get(`${process.env.apiBase}/printfulCountries`)
				.then(async data => {
					return {
						countries: data.data,
						selectedCountry: data.data[0],
						usersItems: []
					};
				});
		},
		methods: {
			getProductInfo() {}
		},
		mounted() {
			let cart = localStorage.getItem("cartProducts");
			if (cart) {
				let listOfItems = [];
				for (let id of cart.split(",")) {
					listOfItems.push(id);
				}
				this.usersItems = listOfItems;
			}
		},
		head: {
			title: "Checkout"
		}
	};
</script>

<style lang="scss" scoped>
	@import "../stylesheets/variables.scss";

	.main {
		text-align: left;
		display: grid;
		grid-column-gap: 5%;
		margin: 0 5%;
		h1 {
			color: white;
		}
		h2,
		h4 {
			color: $accent-primary;
		}
		h4 {
			font-weight: 300;
		}
		.shippingForm {
			h3 {
				color: white;
			}
			grid-row: 1;
			grid-column: 1;
			.formInfo {
				.nameForm {
					display: grid;
					grid-column-gap: 10%;
					h3 {
						grid-row: 1;
					}
					input {
						grid-row: 2;
					}
					.fname {
						grid-column: 1;
					}
					.lname {
						grid-column: 2;
					}
				}
				.countrystatezip {
					display: grid;
					grid-column-gap: 5%;
					h3 {
						grid-row: 1;
					}
					select {
						grid-row: 2;
						background: rgba(17, 18, 24, 10);
						color: $accent-secondary;
						border: 2px solid $accent-secondary;
						border-radius: 5px;
					}
					input {
						grid-row: 2;
					}
				}
				input {
					background: transparent;
					border: none;
					border-bottom: 2px solid $accent-secondary;
					width: 100%;
					font-size: 20px;
				}
			}
		}
		.orderList {
			grid-row: 1;
			grid-column: 2;
			background: $background-primary;
			border-radius: 5px;
			padding: 15px;
			height: auto;
			.cartProducts {
				border: 1px $accent-secondary;
			}
		}
	}
</style>
