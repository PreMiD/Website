<template>
	<div>
		<div class="navbar" :class="pageLoad ? null : 'invisible'" ref="header">
			<div class="logoWrapper" ref="headerLogo">
				<nuxt-link to="/">
					<h1>PreMiD</h1>
				</nuxt-link>

				<transition name="pop">
					<div
						v-if="!isMobile && !$store.state.extension.extensionInstalled"
						class="status"
						v-tippy="{
							content: $t('store.message.error')
						}"
					>
						<i @click="$router.push('/downloads')" class="fa-exclamation fas" />
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
				<!--
	Commented out because as of rn its not used/needed for normal users
					<div
						class="user-info"
						v-if="$auth.loggedIn"
						@mouseenter="hovered = true"
						@mouseleave="hovered = false"
					>
						<img class="round-icon" :src="avatarify()" />
						<div class="dropdown">
							<span class="username">
								{{ $auth.user.username }}
								<span class="tag">#{{ $auth.user.discriminator }}</span>
							</span>

							<transition name="slide-down" mode="in-out">
								<div v-if="hovered" class="dropdown-container">
									<div class="dropdown-content">
										<nuxt-link to="/bug">{{
											$t("header.rab")
										}}</nuxt-link>
										<nuxt-link to="/logout">{{
											$t("header.logout")
										}}</nuxt-link>
									</div>
								</div>
							</transition>
						</div>
					</div>

					<nuxt-link v-if="!this.$auth.loggedIn" to="/login">
						<span class="round-icon">
							<i :class="`fa-user fas`"></i>
						</span>
						<p>{{ $t("header.login") }}</p>
					</nuxt-link>-->
			</div>

			<div v-if="countDownBtn && noLinks" class="links">
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
					@click="countDownValue === 0 ? open($props.href) : null"
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
					active-class="mobile-active"
					v-for="category of categories"
					:key="category.route"
					:to="'/' + category.route"
				>
					<span>
						<i :class="'fas fa-' + category.logo"></i>
						{{
							$t(
								`header.${category.route}`.replace(
									"header.downloads",
									"home.introduction.button.getPremid"
								)
							)
						}}
					</span>
				</nuxt-link>
			</div>
		</transition>
	</div>
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
			cursor: pointer;
			height: 40px;

			display: grid;
			grid-template-columns: min-content min-content;
			align-items: center;

			h1 {
				margin: 0;
				font-family: "Discord Font", "Segoe UI", Tahoma, Geneva, Verdana,
					sans-serif;
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

				.round-icon,
				img {
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

				img {
					height: 45px;
				}
			}

			.user-link {
				color: #646e90;
				display: inline;
				position: relative;
				white-space: nowrap;
			}

			.loggedin {
				display: inline-block;
				white-space: nowrap;
				font-size: 1rem;
				background: linear-gradient(30deg, #7289da, #b3aeff);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.user-info {
				z-index: 999;
				width: auto;
				display: flex;
				justify-content: space-between;
				user-select: none;
				-webkit-user-select: none;
				-moz-user-select: none;

				img {
					place-self: center;
					width: 50px;
					height: 50px;
					border-radius: 100%;
					margin-right: 8px;
				}
			}

			.username {
				display: flex;
				color: #fff;
				font-size: 1.1rem;
				white-space: nowrap;
				vertical-align: bottom;
			}

			.tag {
				display: flex;
				font-size: 0.8rem;
				color: #99aab5;
				align-self: flex-end;
			}
		}

		.hamburger {
			font-size: 1.5em;
			display: none;
			width: 25px;
			height: 25px;
			text-align: center;
		}

		.dropdown-container {
			position: absolute;
			right: 0;
			padding-top: 0.75em;

			.dropdown-content a {
				margin: unset !important;
			}
		}

		.dropdown {
			position: relative;
			display: inline-block;
			place-self: center;
		}

		.dropdown-content {
			position: absolute;
			right: 0;
			background-color: $background-secondary;
			border-radius: 10px;
			width: inherit;
			box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

			a {
				color: black;
				padding: 10px 1.3em;
				text-decoration: none;
				width: inherit;

				&:hover {
					background-color: $background-primary;
				}
			}
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

		.mobile-active {
			background-color: #7289da;
			color: #ffffff;
		}

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

	.nuxt-link-active {
		color: #7289da !important;

		span {
			background-color: #7289da !important;

			i {
				color: #ffffff;
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
		props: ["noLinks", "href", "target"],
		data() {
			return {
				btnCheckInterva: null,
				hovered: false,
				countDownBtn: false,
				pageLoad: false,
				countDownValue: 5,
				mobileMenuActive: false,
				isMobile: false,
				contributors: [],
				categories: [
					{
						logo: "cart-arrow-down",
						route: "store",
						string: "header.store"
					},
					{
						logo: "hands-helping",
						route: "contributors",
						string: "header.contributors"
					},
					{
						logo: "download",
						route: "downloads",
						string: "home.introduction.button.getPremid"
					},
				]
			};
		},
		methods: {
			open(url) {
				window.open(url, this.$props.target).focus();
				this.$nuxt.setLayout("default");
			},
			avatarify() {
				if (!this.$auth || !this.$auth.loggedIn) return "";
				else if (this.$auth && this.$auth.user.avatar)
					return `https://cdn.discordapp.com/avatars/${this.$auth.user.id}/${this.$auth.user.avatar}`;
			},
			appear() {
				this.pageLoad = true;

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
							targets: "#links a",
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
			},
			updateBtn(value) {
				this.countDownBtn = value;
			}
		},
		mounted() {
			this.btnCheckInterval = setInterval(() => {
				this.updateBtn(!(localStorage.getItem("showBtn") == "true"));
			}, 100);
			this.isMobile =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				);

			const interval = setInterval(() => {
				if (!this.countDownBtn) return;
				this.countDownValue--;

				if (this.countDownValue === 0) clearInterval(interval);
			}, 1 * 1000);

			this.appear();
		},
		beforeDestroy() {
			clearInterval(this.btnCheckInterva);
		}
	};
</script>
