<template>
	<transition appear v-on:after-appear="appear">
		<div class="invisible navbar__container" ref="header">
			<div class="navbar">
				<div class="navbar__logotype" ref="headerLogo">
					<nuxt-link to="/">
						<img src="@/assets/images/logo_round.svg" data-not-lazy />
					</nuxt-link>

					<transition name="pop">
						<div
							v-if="
								!isMobile &&
								plsFinishLoading &&
								!$store.state.extension.extensionInstalled
							"
							class="status"
							v-tippy="{
								content: $t('store.message.error')
							}"
						>
							<i
								@click="redirect('/downloads#ext-downloads')"
								class="fa-exclamation fa-stack-1x fas"
							></i>
						</div>
					</transition>
				</div>

				<div v-if="!noLinks" class="navbar__items on-desktop">
					<nuxt-link
						v-for="category of categories"
						:key="category.route"
						:to="'/' + category.route"
						class="navbar__item"
						ref="headerLink"
					>
						<span class="round-icon">
							<i :class="`fa-${category.logo} fa-stack-1x fas`"></i>
						</span>
						<p>{{ category.title }}</p>
					</nuxt-link>
				</div>
				<div v-if="countDownBtn" class="navbar__items on-desktop">
					<a
						@click="countDownValue === 0 ? $nuxt.setLayout('dl') : null"
						class="navbar__item"
					>
						<span class="round-icon">
							<i :class="`fa-forward fa-stack-1x fas`"></i>
						</span>
						<p v-text="countDownValue === 0 ? 'Skip' : countDownValue" />
					</a>
				</div>
				<div class="mobile-navbar__menu on-mobile">
					<a ref="menuTrigger" @click="mobileMenuActive = !mobileMenuActive">
						<i class="fa-bars fas"></i>
					</a>
				</div>
			</div>
			<div
				v-if="mobileMenuActive"
				class="mobile-navbar__items on-mobile"
				@click="mobileMenuActive = false"
			>
				<nuxt-link
					v-for="category of categories"
					:key="category.route"
					:to="'/' + category.route"
					class="navbar__item"
					ref="headerLink"
				>
					<i :class="'fas fa-' + category.logo"></i>
					<span class="item__title">{{ $t(`header.${category.route}`) }}</span>
				</nuxt-link>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
	@import "~/stylesheets/variables.scss";

	.navbar__container {
		background: $background-primary;
		position: relative;

		.fa,
		.fab,
		.fal,
		.far,
		.fas {
			bottom: -1px;
			position: relative;

			padding: 1px 4px;
			font-size: 0.9em;
			vertical-align: middle;
		}

		.navbar {
			max-width: 1600px;
			margin: 0 auto;
			padding-top: 1rem;
			padding-bottom: 1rem;
			padding-left: 1rem;
			padding-right: 1rem;
			color: $purplewhite;
			display: flex;
			align-items: center;

			* {
				user-select: none;
			}

			.navbar__logotype {
				display: inline-flex;
				align-items: center;

				img {
					height: 36px;
					bottom: -3px;
					position: relative;
					display: inline-block;
				}

				h1 {
					font-size: 1.5rem;
					/* font-family: "Discord Font"; */
					margin: 0 5px;
					margin-top: 5px;
				}
			}

			.status {
				display: flex;
				align-items: center;
				font-size: small;
				width: 25px;
				height: 25px;
				border-radius: 100%;
				margin-left: 0.6em;
				animation: pulseWarn 2s infinite;
				background-color: #ffff00;
				color: black;
				cursor: pointer;
			}

			.navbar__items {
				vertical-align: top;
				line-height: 2.5rem;
				font-size: 1.1rem;
				letter-spacing: 0.05rem;
				font-weight: 800;
				text-transform: uppercase;
				display: flex;
				margin-left: auto;

				a.navbar__item {
					display: flex;
					align-items: center;
					margin: 0 1.3em;
					position: relative;
					color: lighten($background-secondary, 40%);
					transition: 0.1s ease-out;

					.round-icon {
						transition: 0.1s ease-out;
						align-items: center;
						display: flex;
						width: 30px;
						height: 30px;
						border-radius: 100em;
						background-color: lighten($background-secondary, 12%);
						margin-right: 0.5em;

						i {
							transition: 0.1s ease-out;
							font-size: 0.8em;
							color: lighten($background-secondary, 40%);
						}
					}

					p {
						margin: 0;
					}

					.item__title {
						vertical-align: middle;
						// text-transform: uppercase;
						font-size: 1.15rem;
					}

					&:hover {
						.round-icon {
							background-color: $accent-primary;
							i {
								color: white;
							}
						}
					}

					&:hover,
					&.router-link-active {
						color: lighten($accent-primary, 15%);
					}
				}
			}

			.mobile-navbar__menu {
				margin-left: auto;

				a {
					font-size: 23px;
				}
			}
		}

		.mobile-navbar__items {
			background: $background-primary;
			box-shadow: 0 4px 32px 0 $background-primary;

			left: 0;
			right: 0;
			z-index: 1111;
			position: absolute;

			display: flex;
			flex-flow: column;
			text-align: center;

			.navbar__item {
				.item__title {
					vertical-align: middle;
					text-transform: uppercase;
				}
			}

			a {
				padding: 5px 0;
				line-height: 2.5rem;
				font-size: 1.2rem;
				font-weight: 800;

				transition: all 0.2s ease;
				box-shadow: inset 0px 0 0 0 $accent-primary;

				&.nuxt-link-exact-active,
				&.router-link-exact-active {
					box-shadow: inset 4px 0 0 0 $accent-primary;
					background: rgba(255, 255, 255, 0.01);
				}
			}
		}
	}
</style>

<script>
	export default {
		name: "Navigation",
		props: ["noLinks", "countDownBtn"],
		data() {
			return {
				countDownValue: 5,
				mobileMenuActive: false,
				isMobile: false,
				plsFinishLoading: false,
				categories: [
					{
						logo: "cart-arrow-down",
						route: "store",
						title: this.$t("header.store")
					},
					{
						logo: "download",
						route: "downloads",
						title: this.$t("header.downloads")
					},
					{
						logo: "hands-helping",
						route: "contributors",
						title: this.$t("header.contributors")
					}
				]
			};
		},
		methods: {
			redirect(location) {
				window.location.href = location || window.location.href;
			},
			appear() {
				let targets = [this.$refs.headerLogo];

				if (this.$refs.headerLink)
					targets.push(...this.$refs.headerLink.map(i => i.$el));

				this.$anime({
					targets: targets,
					opacity: [0, 1],
					translateY: [-200, 0],
					easing: "easeOutExpo",
					delay: this.$anime.stagger(100),
					duration: 500,
					begin: () => this.$refs.header.classList.remove("invisible")
				});
			}
		},
		mounted() {
			this.$data.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator?.userAgent
			);

			const interval = setInterval(() => {
				if (!this.countDownBtn) return;
				this.countDownValue--;

				if (this.countDownValue === 0) clearInterval(interval);
			}, 1 * 1000);

			setTimeout(() => {
				this.$data.plsFinishLoading = true;
			}, 500);
		}
	};
</script>
