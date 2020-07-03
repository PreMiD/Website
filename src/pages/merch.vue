<template>
	<div class="dl-container">
		<div class="dl-container__section dl-container__section_header pattern">
			<div class="dl-container__header">
				<div class="header__content">
					<h1>{{ $t("merch.title") }}</h1>
				</div>
			</div>
		</div>
		<div v-for="(category, index) in products.Categories" :key="category.name">
			<button>{{ index }}</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Merch",
		async asyncData({ app }) {
			return app.$axios.get(`${process.env.apiBase}/products`).then(data => {
				return { products: data.data };
			});
		},
		methods: {
			addProduct(id) {
				if (id == null) return;
				let cartProducts = localStorage.getItem("cartProducts");
				if (!cartProducts) return localStorage.setItem("cartProducts", id);
				cartProducts = cartProducts.split(",");
				cartProducts.push(id);
				localStorage.setItem("cartProducts", cartProducts.join(","));
			}
		},
		mounted() {
			console.log(this.products);
		},
		head: {
			title: "Merch"
		}
	};
</script>

<style lang="scss" scoped>
	@import "../stylesheets/variables.scss";

	.highlight::after {
		opacity: 1 !important;
	}

	.show-beta {
		text-align: center;

		p {
			line-height: 0;
		}

		i {
			font-size: 2rem;
			margin-top: 4px;
			transition: opacity 0.2s ease-in-out;
			cursor: pointer;

			&:hover {
				opacity: 0.75;
			}
		}
	}

	.button-container {
		text-align: center;

		p {
			margin-top: 0;
		}
	}

	.login {
		padding: 0.55em 3em;
	}

	#beta-downloads {
		.nobeta {
			flex-direction: column;
			text-align: center;

			h1 {
				margin: 0;
			}
		}

		.card__content {
			h3 {
				margin-bottom: 0;
				text-transform: capitalize;
			}

			p {
				margin-top: 0;
				color: #c3c3c3;
				text-transform: uppercase;
				font-size: 0.75rem;
			}
		}
	}
</style>
