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
			<div class="section__heading section__heading--center">
				<h1 id="featuresHeading">{{ $t("checkout.title") }}</h1>
			</div>
			<div class="card--feature">
				<div class="card--feature__details">
					<h1
						v-html="markdown($t('home.features.presencesystem.heading'))"
					></h1>
					<p>{{ $t("home.features.presencesystem.description") }}</p>
					<p>
						<nuxt-link
							class="button button--lg"
							to="/store"
							v-text="$t('home.features.presencesystem.button')"
						/>
					</p>
				</div>
				<div class="card--feature__promo">
					<img
						class="card--feature__promo--image1"
						style="max-width: 100%;"
						:src="cardThumbnail1"
					/>
				</div>
			</div>
			<div class="card--feature card--feature--reverse">
				<div class="card--feature__details">
					<h1>{{ $t("home.features.simpleInterface.heading") }}</h1>
					<p>{{ $t("home.features.simpleInterface.description") }}</p>
					<ul>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.1") }}</p>
						</li>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.2") }}</p>
						</li>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.3") }}</p>
						</li>
					</ul>
				</div>
				<div class="card--feature__promo">
					<video autoplay loop>
						<source
							src="./../assets/images/cards/card2_video.mp4"
							type="video/mp4"
						/>
						<img class="card--feature__promo--image2" :src="cardThumbnail2" />
					</video>
				</div>
			</div>
			<div class="card--feature">
				<div class="card--feature__details">
					<h1>{{ $t("home.features.quickSupport.heading") }}</h1>
					<p>{{ $t("home.features.quickSupport.description") }}</p>
					<p>
						<a class="button button--lg" href="https://discord.premid.app">{{
							$t("home.features.quickSupport.button")
						}}</a>
					</p>
				</div>
				<div class="card--feature__promo">
					<img class="card--feature__promo--image1" :src="cardThumbnail4" />
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
	export default {
		name: "Checkout",
		async asyncData({ app }) {
			return app.$axios
				.get(`${process.env.apiBase}/products`)
				.then(async data => {
					var selected_category_default_product = {};
					for (var index in data.data.Categories) {
						selected_category_default_product[data.data.Categories[index]] =
							data.data.Products[data.data.Categories[index]][0];
						selected_category_default_product[
							data.data.Categories[index]
						].selected_id =
							data.data.Products[data.data.Categories[index]][0].sizes[
								Object.keys(
									data.data.Products[data.data.Categories[index]][0].sizes
								)[0]
							];
					}
					var ratedata = await app.$axios.get(
						`${process.env.apiBase}/currencyRates`
					);
					return {
						products: data.data,
						selected_product: selected_category_default_product,
						rates: ratedata.data[0].rates
					};
				});
		},
		methods: {
			addProduct(category) {
				var itemIdToAdd = this.selected_product[category].selected_id;
				if (itemIdToAdd === null)
					return this.$noty.error(this.$t("merch.error.noitem"));
				let cartProducts = localStorage.getItem("cartProducts");
				if (!cartProducts) localStorage.setItem("cartProducts", itemIdToAdd);
				else {
					cartProducts = cartProducts.split(",");
					cartProducts.push(itemIdToAdd);
					localStorage.setItem("cartProducts", cartProducts.join(","));
				}
				this.$noty.success(
					this.$t("merch.item.added").replace(
						"{0}",
						$t("merch." + this.selected_product[category].title)
					)
				);
			},
			getPrice(amount) {
				/*if (amount == null) return NaN;

				var CurrencyCode = this.$root.$i18n.currency;
				return (amount * (this.rates[CurrencyCode] || 1)) / 100;*/
				return amount / 100;
			},
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

	.merch-container {
		color: white;
		position: relative;

		.merch-container__section {
			position: relative;
			padding: 0 2rem;

			.section--products {
				position: relative;
				z-index: 1;
				overflow: hidden;
				padding: 0px;
			}

			h1.section-header {
				text-align: center;
				font-weight: 800;
				font-size: 52px;
				letter-spacing: -1px;
				text-shadow: none;

				&::after {
					top: 0;
					transition: 0.15s opacity ease-out;
					position: absolute;
					content: "";
					background: rgba(114, 137, 218, 0.25) !important;
					width: 100%;
					height: 100%;
					display: inline-block;
					left: 0;
					margin-top: -15px;
					z-index: -1;
					opacity: 0;
				}
			}
		}

		.merch-container__header {
			display: flex;
			max-width: 1600px;
			margin: 0 auto;
			justify-content: space-between;
			align-items: flex-start;

			.header__content {
				width: 100%;

				h1 {
					font-weight: 800;
					line-height: 1.1;
					font-size: 3.8em;
					letter-spacing: -3px;
					text-shadow: none;
					width: 50%;
					text-align: left;
				}
			}
		}

		.category-container__content {
			padding: 30px 0px;
		}

		.product-swag {
			font-size: 2.5rem;
			text-align: center;
		}
		.product-container {
			display: grid;
			width: 65%;
			margin: 0 auto;
			padding: 40px;
			.product-images {
				grid-row: 1;
				grid-column: 1;
				text-align: center;
				word-spacing: 3rem;
			}
			.product-content {
				grid-row: 1;
				grid-column: 2;
				.product-size {
					margin-bottom: 0px;
				}
				.product-size-button {
					padding: 8px;
					width: 50px;
					background: transparent;
					color: #6f789b;
				}
				.selected {
					background: #7289da;
					color: #fff;
				}
			}
			.product-buttons {
				grid-row: 2;
				grid-column: 1;
				text-align: center;
				margin-top: 20px;

				.product-button {
					background: transparent;
					color: #6f789b;
					border-radius: 0.5rem;
					padding: 10px;
				}
				.selected {
					background: #7289da;
					color: #fff;
				}
			}
			.product-info {
				display: grid;
				grid-template-columns: 50%;
				.product-cart {
					grid-column: 1;
					width: 75%;
					margin: 20px auto;
					padding: 0px;
					border-radius: 0.5rem;
				}
				h1 {
					grid-column: 2;
				}
			}
		}

		.left {
			.product-images {
				grid-row: 1;
				grid-column: 2;
			}
			.product-content {
				grid-row: 1;
				grid-column: 1;
			}
			.product-buttons {
				grid-row: 2;
				grid-column: 2;
			}
			.product-cart {
				grid-column: 1;
			}
		}

		.product-help {
			width: 90%;
			margin-right: auto;
			margin-left: auto;
			.text-help {
				font-weight: 600;
				font-size: 2em;
				max-width: 820px;
			}
		}
	}
</style>
