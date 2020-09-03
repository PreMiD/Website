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
					<div class="listTop">
						<h2 id="title">{{ $t("checkout.cart") }}</h2>
						<h2 id="count">{{ usersItems.length }}</h2>
					</div>
					<div class="cartProducts">
						<div class="items">
							<div v-for="(item, index) in usersItemsInfo" :key="index">
								<h3>
									{{
										$t(
											"merch." + usersItemsInfo[index].category.toLowerCase()
										) +
										" - " +
										$t("merch." + usersItemsInfo[index].title.toLowerCase())
									}}
								</h3>
								<h3>
									{{
										$t("merch.size") +
										": " +
										productSize(index) +
										"  " +
										$t("merch.colour") +
										": " +
										$t("merch." + usersItems[index].split("-")[1].toLowerCase())
									}}
								</h3>
							</div>
						</div>
						<div class="promo"></div>
						<div class="total">
							<h2 id="text">{{ $t("checkout.total") }}</h2>
							<h2 id="price">
								{{ $t("checkout.price").replace("{0}", getPrice()) }}
							</h2>
							<div class="pattern"></div>
						</div>
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
				.get(`${process.env.apiBase}/printful/countries`)
				.then(async data => {
					return {
						countries: data.data.countries,
						selectedCountry: data.data.countries[0],
						usersItems: [],
						usersItemsInfo: []
					};
				});
		},
		methods: {
			productSize(index) {
				let usersItems = this.usersItems[index];
				let sizeString;
				this.usersItemsInfo[index].colours.find(function (colour) {
					if (colour.name == usersItems.split("-")[1]) {
						Object.keys(colour.sizes).forEach(size => {
							if (colour.sizes[size] == usersItems.split("-")[2]) {
								sizeString = size.toUpperCase();
							}
						});
					}
				});
				return sizeString;
			},
			getPrice() {
				let price = 0;
				for (let item in this.usersItemsInfo) {
					price += item.price;
				}

				price = price / 100;

				return price;
			}
		},
		mounted() {
			let cart = localStorage.getItem("cartProducts");
			if (cart) {
				let listOfItems = [];
				for (let id of cart.split(",")) {
					listOfItems.push(id);
				}
				this.usersItems = listOfItems;
				this.$axios
					.get(
						`${process.env.apiBase}/printful/productInfo/${localStorage.getItem(
							"cartProducts"
						)}`
					)
					.then(async data => {
						this.usersItemsInfo = data.data.items;
					});
			} else {
				return this.$router.push("/merch");
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
			height: fit-content;
			.listTop {
				display: grid;
				#title {
					grid-column: 1;
					grid-row: 1;
				}
				#count {
					grid-column: 2;
					grid-row: 1;
					text-align: right;
					color: #fff;
					background: #7289da;
					border-radius: 50%;
					width: 40px;
					line-height: 40px;
					text-align: center;
					margin-left: calc(100% - 40px);
				}
			}
			.cartProducts {
				h3 {
					color: #fff;
				}
				.items {
					border: 1px solid $accent-secondary;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					div {
						border-bottom: 1px solid $accent-secondary;
						padding: 10px;
					}
				}

				.total {
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					background: rgba(70, 76, 96, 100%);
					display: grid;
					.pattern {
						grid-column: 1/-1;
						grid-row: 1;
						width: 100%;
						padding: 10px;
						opacity: 0.5;
						border-bottom-left-radius: 10px;
						border-bottom-right-radius: 10px;
						background-size: cover;
					}
					h2 {
						color: #fff;
					}
					#text {
						grid-row: 1;
						grid-column: 1;
					}
					#price {
						grid-column: 2;
						grid-row: 1;
					}
				}
			}
		}
	}
</style>
