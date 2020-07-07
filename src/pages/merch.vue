<template>
	<div class="dl-container">
		<div class="dl-container__section dl-container__section_header">
			<div class="merch-container__header">
				<div class="header__content">
					<h1>{{ markdown($t("merch.title")) }}</h1>
				</div>
			</div>
		</div>
		<div class="section section--features">
			<div
				v-for="(category, index) in products.Categories"
				:key="category.name"
				:class="{ 'pattern' : index % 2 == 0}"
			>
				<div
					v-if="index % 2 == 0"
					class="waves-divider waves-divider_top pattern"
					style="position: inherit;"
				>
					<svg
						class="wave"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						style="width:100%;"
						preserveAspectRatio="none"
					>
						<path
							class="wave-animation"
							d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<h1>{{category}}</h1>
				<div
					v-if="index % 2 == 0"
					class="waves-divider waves-divider_bottom pattern"
					style="position: inherit;"
				>
					<svg
						class="wave"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						style="width:100%;"
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
