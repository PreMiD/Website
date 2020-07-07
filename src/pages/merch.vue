<template>
	<div class="merch-container">
		<div class="merch-container__section merch-container__section_header">
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

.merch-container {
	color: white;
	position: relative;

	&__mobile-warning {
		margin-top: 2em;
		background-color: red;
		border-radius: 4px;
		margin: 2em 2em 0;
		padding: 1em !important;
	}

	&__showDownloads {
		margin-top: 1em;
		text-align: center;
		user-select: none;
		cursor: pointer;
	}

	.merch-container__section {
		position: relative;
		padding: 0 2rem;

		&_header {
			position: relative;

			margin: 0 auto;

			z-index: 1;

			padding-top: 6em;
			padding-bottom: 12em;
		}

		&_downloads {
			padding-top: 1em;
			padding-bottom: 2em;

			.bounce {
				animation: 1s bounce normal;
			}
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
			width: 55%;

			h1 {
				font-weight: 800;
				line-height: 1.1;
				font-size: 3.8em;
				letter-spacing: -3px;
				text-shadow: none;
				max-width: 600px;
			}

			p {
				font-weight: 500;
				line-height: 1.1;
				font-size: 1.5em;
				max-width: 800px;
			}
		}

		.header__steps {
			width: 35%;

			h2 {
				margin-block-start: 0.67em;
				margin-block-end: 0.67em;
				margin-inline-start: 0px;
				margin-inline-end: 0px;
			}

			ol {
				counter-reset: myCounter;
				margin: 0;
				padding: 0;

				li {
					display: flex;
					list-style: none;
					align-items: center;

					p {
						font-weight: 500;
						margin: 12px 38px;
					}
				}

				li:before {
					counter-increment: myCounter;
					content: counter(myCounter);
					line-height: 1;
					text-align: center;
					width: 16px;
					height: 16px;
					padding: 5px;
					margin-right: 12px;
					font-weight: bold;
					position: absolute;
					display: inline-block;
					border-radius: 50rem;
					background: linear-gradient(30deg, $accent-primary, #b3aeff);
				}
			}
		}
	}
}
</style>
