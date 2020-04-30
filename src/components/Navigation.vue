<template>
	<transition appear v-on:after-appear="appear">
		<div>
			<div class="navbar" :class="pageLoad ? null : 'invisible'" ref="header">
				<div class="logoWrapper" ref="headerLogo">
					<nuxt-link
						to="/"
						tag="img"
						:src="require('@/assets/images/logo_round.svg')"
						data-not-lazy
					/>

					<transition name="pop">
						<div
							v-if="!isMobile && !$store.state.extension.extensionInstalled"
							class="status"
							v-tippy="{
								content: $t('store.message.error')
							}"
						>
							<i
								@click="redirect('/downloads#ext-downloads')"
								class="fa-exclamation fas"
							/>
						</div>
					</transition>
				</div>

				<div v-if="!noLinks" class="links">
					<nuxt-link
						v-for="category of categories"
						:key="category.route"
						:to="'/' + category.route"
						ref="headerLink"
					>
						<span class="round-icon">
							<i :class="`fa-${category.logo} fas`"></i>
						</span>
						<p>{{ $t(category.string) }}</p>
					</nuxt-link>
				</div>

				<div v-if="$props.countDownBtn" class="links">
					<a
						v-if="countDownValue === 0"
						@click="$nuxt.setLayout('default')"
						class="navbar__item"
					>
						<span class="round-icon">
							<i :class="`fa-backward fas`"></i>
						</span>
						<p>{{ $t("downloads.button.back") }}</p>
					</a>

					<a
						@click="countDownValue === 0 ? redirect($props.href) : null"
						class="navbar__item"
					>
						<span class="round-icon">
							<i :class="`fa-forward fas`"></i>
						</span>
						<p
							v-text="
								countDownValue === 0
									? $t('downloads.button.skip')
									: countDownValue
							"
						/>
					</a>
				</div>

				<div
					class="hamburger"
					ref="hamburger"
					@click="mobileMenuActive = !mobileMenuActive"
				>
					<i v-if="mobileMenuActive" class="fa-times fas" />
					<i v-else class="fa-bars fas" />
				</div>
			</div>

			<transition name="slide-down">
				<div
					class="mobileLinks"
					v-if="mobileMenuActive"
					@click="mobileMenuActive = !mobileMenuActive"
				>
					<nuxt-link
						v-for="category of categories"
						:key="category.route"
						:to="'/' + category.route"
					>
						<span>
							<i :class="'fas fa-' + category.logo"></i>
							{{ $t(`header.${category.route}`) }}
						</span>
					</nuxt-link>
				</div>
			</transition>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
	@import "~/stylesheets/variables.scss";

	.navbar {
		background-color: $background-primary;
		position: relative;
		height: 75px;
		margin: 0 15px;

		display: grid;
		grid-template-columns: min-content min-content;
		align-items: center;
		justify-content: space-between;

		.logoWrapper {
			height: 40px;

			display: grid;
			grid-template-columns: min-content min-content;
			align-items: center;

			img {
				height: 40px;
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
				justify-content: center;
			}
		}

		.links {
			display: flex;
			font-size: 1.1rem;
			font-weight: 800;
			text-transform: uppercase;

			a {
				transition: 0.25s margin ease-out;

				//* Fix for chinese etc languages
				white-space: nowrap;

				display: grid;
				grid-template-columns: min-content min-content;
				align-items: center;
				margin: 0 1.3em;
				color: lighten($background-secondary, 40%);

				&:hover {
					color: $accent-primary;

					.round-icon {
						background-color: $accent-primary;

						i {
							color: #fff;
						}
					}
				}

				.round-icon {
					transition: 0.15s background-color ease-out;

					align-items: center;
					display: flex;
					width: 30px;
					height: 30px;
					border-radius: 100em;
					background-color: lighten($background-secondary, 12%);
					margin-right: 0.5em;
					justify-content: center;

					i {
						transition: 0.15s color ease-out !important;

						font-size: 0.8em;
					}
				}
			}
		}

		.hamburger {
			font-size: 1.5em;
			display: none;
			width: 25px;
			height: 25px;
			text-align: center;
		}
	}

	.mobileLinks {
		position: absolute;
		top: 75px;
		z-index: 99999;
		background: $background-primary;
		display: grid;
		grid-gap: 10px;
		padding-bottom: 10px;

		a {
			display: grid;
			grid-template-columns: auto min-content auto;
			align-items: center;

			width: 100vw;
			height: 35px;

			font-size: 20px;
			font-weight: 800;
			text-transform: uppercase;

			span {
				grid-area: 1/3;
				width: max-content;
			}
		}
	}
	//* Responsive Design

	@media only screen and (max-width: 900px) {
		.links {
			a {
				margin: 0 0.5em !important;
			}
		}
	}

	@media only screen and (max-width: 715px) {
		.links {
			display: none !important;
		}

		.hamburger {
			display: block !important;
		}
	}
</style>

<script>
	export default {
		name: "Navigation",
		props: ["noLinks", "countDownBtn", "href", "target"],
		data() {
			return {
				pageLoad: false,
				countDownValue: 5,
				mobileMenuActive: false,
				isMobile: false,
				categories: [
					{
						logo: "cart-arrow-down",
						route: "store",
						string: "header.store"
					},
					{
						logo: "download",
						route: "downloads",
						string: "header.downloads"
					},
					{
						logo: "hands-helping",
						route: "contributors",
						string: "header.contributors"
					}
				]
			};
		},
		methods: {
			reload() {
				location.reload();
			},
			redirect(url) {
				if (this.$props.countDownBtn && this.$props.target) {
					window.open(url, this.$props.target).focus();
					this.$nuxt.setLayout("default");
				} else window.location.href = url || window.location.href;
			},
			appear() {
				this.pageLoad = true;
				let targets = [];

				if (this.$refs.headerLink)
					targets.push(...this.$refs.headerLink.map(i => i.$el));

				this.$anime
					.timeline({
						duration: 500,
						delay: this.$anime.stagger(100),
						opacity: [0, 1],
						easing: "easeOutExpo",
						begin: () => this.$refs.header.classList.remove("invisible")
					})
					.add(
						{
							targets: targets,
							translateY: [-200, 0]
						},
						0
					)
					.add(
						{
							targets: this.$refs.headerLogo,
							translateX: [-400, 0]
						},
						0
					)
					.add(
						{
							targets: this.$refs.hamburger,
							translateX: [100, 0]
						},
						0
					);
			}
		},
		beforeDestroy() {
			clearInterval(this.interval);
		},
		mounted() {
			this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator?.userAgent
			);

			if (this.$props.countDownBtn)
				this.interval = setInterval(() => {
					this.countDownValue--;

					if (this.countDownValue === 0) clearInterval(this.interval);
				}, 1 * 1000);
		}
	};
</script>
