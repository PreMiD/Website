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
				<div class="billingForm">
					<h1 id="billingHeader">{{ $t("checkout.title") }}</h1>
					<h2 id="billingHeader">{{ $t("checkout.billing") }}</h2>
					<h4 id="billingSubHeader">{{ $t("checkout.subtitle") }}</h4>
					<div class="formInfo">
						<div class="nameForm">
							<h3 class="fname">{{ $t("checkout.fname") }}</h3>
							<h3 class="lname">{{ $t("checkout.lname") }}</h3>
							<input class="fname" />
							<input class="lname" />
						</div>
						<h3 class="email">{{ $t("checkout.email") }}</h3>
						<input class="email" />
						<h3 class="address">{{ $t("checkout.address") }}</h3>
						<input class="address" />
						<h3 class="address2">{{ $t("checkout.address2") }}</h3>
						<input class="address2" />
						<div class="countrystatezip">
							<h3 class="country">{{ $t("checkout.country") }}</h3>
							<select class="country">
								<option
									value="uk
								"
									>United Kingdom</option
								>
							</select>
							<h3 class="state">{{ $t("checkout.state") }}</h3>
							<select class="state" />
							<h3 class="zip">{{ $t("checkout.zip") }}</h3>
							<input class="zip" />
						</div>
					</div>
				</div>
				<div class="orderList"></div>
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
		methods: {
			markdown(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map((ch, i) => {
					return pls.replace(
						ch,
						`<strong><span class="text-highlight">${ch.slice(
							2,
							ch.length - 2
						)}</span></strong>`
					);
				})[0];
			},
			cartProducts() {
				const cart = localStorage.getItem("cartProducts");
				if (cart == null) return;

				let listOfItems = {};
				for (let id of cart.split(",")) {
					if (listOfItems[id]) return listOfItems[id].count++;
					listOfItems[id] = [];
					listOfItems[id].count = 1;
				}
				console.log(listOfItems);
			}
		},
		async mounted() {},
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
		margin: 0 5%;
		.billingForm {
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
					}
					input {
						grid-row: 2;
					}
				}
				input {
					background: transparent;
					border: none;
					border-bottom: 2px solid $accent-secondary;
				}
			}
		}
		.orderList {
			grid-row: 1;
			grid-column: 2;
		}
	}
</style>
