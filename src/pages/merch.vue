<template>
	<div class="merch-container">
		<div class="merch-container__section merch-container__section_header">
			<div class="merch-container__header">
				<div class="header__content">
					<h1 v-html="markdown($t('merch.title'))"></h1>
				</div>
			</div>
		</div>
		<div class="section section--products">
			<div
				v-for="(category, index) in products.Categories"
				:key="category"
				:class="{ pattern: index % 2 == 0 }"
			>
				<div class="category-container__content">
					<div
						v-if="index % 2 == 0"
						class="waves-divider waves-divider_top"
						style="position: inherit;"
					>
						<svg
							class="wave"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							style="width: 100%;"
							preserveAspectRatio="none"
						>
							<path
								class="wave-animation"
								d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h1
						class="product-swag"
						v-if="index === 0"
						v-html="markdown($t('merch.swag'))"
					></h1>
					<div class="product-container" :class="{ left: index % 2 != 0 }">
						<div class="product-images">
							<img
								:src="
									require(`@/static/assets/images/merch/${selected_product[category].images.front}`)
								"
							/>
							<img
								:src="
									require(`@/static/assets/images/merch/${selected_product[category].images.back}`)
								"
							/>
						</div>
						<div class="product-content">
							<h1 v-html="markdown($t('merch.' + category))" />
							<p>
								{{
									$t("merch.description." + selected_product[category].title)
								}}
							</p>
							<h1
								class="product-colours"
								v-html="markdown($t('merch.colours'))"
							/>
							<div class="product-colours">
								<button
									v-for="colour in selected_product[category].colours"
									class="button product-colour-button"
									:class="{
										'colour-selected':
											selected_product[category].selected_colour.name ==
											colour.name
									}"
									:key="colour.name"
									@click="
										selected_product[category].selected_colour = colour;
										selected_product[category].selected_id =
											colour.sizes[Object.keys(colour.sizes)[0]];
									"
									:style="'background-color:#' + colour.hex"
								></button>
							</div>
							<h1 class="product-size" v-html="markdown($t('merch.fit'))" />
							<div class="product-sizes">
								<button
									v-for="(size_id, size_name) in selected_product[category]
										.selected_colour.sizes"
									class="button product-size-button"
									:class="{
										selected: selected_product[category].selected_id == size_id
									}"
									:key="size_name"
									@click="selected_product[category].selected_id = size_id"
								>
									{{ size_name.toUpperCase() }}
								</button>
							</div>
						</div>
						<div class="product-buttons">
							<button
								v-for="product in products.Products[category]"
								class="button product-button"
								:class="{
									selected: selected_product[category].title == product.title
								}"
								:key="product.title"
								@click="
									selected_product[category] = product;
									selected_product[category].selected_id =
										product.sizes[Object.keys(product.colours.sizes)[0]];
								"
							>
								{{ $t("merch." + product.title) }}
							</button>
						</div>
						<div class="product-info">
							<button class="button product-cart" @click="addProduct(category)">
								{{ $t("merch.cart") }}
							</button>
							<h1 ref="product_price">
								{{
									$t("merch.price").replace(
										"X",
										selected_product[category].price / 100
									)
								}}
							</h1>
						</div>
					</div>

					<div
						v-if="index % 2 == 0"
						class="waves-divider waves-divider_bottom"
						style="position: inherit;"
					>
						<svg
							class="wave"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							style="width: 100%;"
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
			<div class="product-help">
				//FIXME Replace with support link
				<h2
					class="text-help"
					v-html="
						$t('merch.help')
							.replace('{0}', '<a href=`https://www.google.com`>')
							.replace('{1}', '</a>')
					"
				></h2>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Merch",
		async asyncData({ app }) {
			return app.$axios
				.get(`${process.env.apiBase}/products`)
				.then(async data => {
					var Categories = data.data.Categories;
					var default_product = {};
					for (var i in Categories) {
						default_product[Categories[i]] =
							data.data.Products[Categories[i]][0];
						default_product[Categories[i]].selected_colour =
							data.data.Products[Categories[i]][0].colours[0];
						default_product[Categories[i]].selected_id =
							default_product[Categories[i]].selected_colour.sizes[
								Object.keys(
									default_product[Categories[i]].selected_colour.sizes
								)[0]
							];
					}
					var ratedata = await app.$axios.get(
						`${process.env.apiBase}/currencyRates`
					);
					return {
						products: data.data,
						selected_product: default_product,
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
						this.$t("merch." + this.selected_product[category].title)
					)
				);
			},
			getPrice(amount) {
				/*if (amount == null) return NaN;

				var CurrencyCode = this.$root.$i18n.currency;
				return (amount * (this.rates[CurrencyCode] || 1)) / 100;*/
				return amount / 100;
				//TODO Create currency selector
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
			title: "Merch"
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
			}
			.product-content {
				grid-row: 1;
				grid-column: 2;
				padding-left: 5rem;
				h1 {
					margin-top: 0px;
				}
				.product-colour-button {
					width: 40px;
					height: 40px;
					padding: 0px;
					border: 2px solid transparent;
				}
				.colour-selected {
					border: 2px solid #7289da;
					width: 42px;
					height: 42px;
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
				padding-left: 5rem;
				.product-cart {
					grid-column: 1;
					width: 75%;
					margin: 20px 0px;
					padding: 0px;
					border-radius: 0.5rem;
				}
				h1 {
					grid-column: 2;
					grid-row: 1;
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
