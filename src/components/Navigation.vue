<template>
	<transition appear v-on:after-appear="appear">
		<div
			:class="{
				'navbar-container': true,
				'skip-ads-layout': $nuxt.layoutName === 'skipAds'
			}"
		>
			<div :class="{ navbar: true, invisible: !pageLoad }" ref="header">
				<div class="logoWrapper" ref="headerLogo">
					<nuxt-link to="/"><h1>PreMiD</h1></nuxt-link>

					<transition name="pop">
						<div
							v-if="!isMobile && !$store.state.extension.extensionInstalled"
							class="status"
							v-tippy="{
								content: $t('store.message.error')
							}"
						>
							<i
								@click="$router.push('/downloads#ext-downloads')"
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
										<nuxt-link v-if="isStaff === false" to="/bug">{{
											$t("header.rab")
										}}</nuxt-link>
										<nuxt-link v-else to="/staff">{{
											$t("header.staff")
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

				<div v-if="countDownBtn" class="links">
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

.skip-ads-layout {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

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
	props: ["noLinks", "countDownBtn", "href", "target"],
	data() {
		return {
			hovered: false,
			pageLoad: false,
			countDownValue: 5,
			mobileMenuActive: false,
			isMobile: false,
			isStaff: false,
			contributors: [],
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
		}
	},
	mounted() {
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

		const interval = setInterval(() => {
			if (!this.countDownBtn) return;
			this.countDownValue--;

			if (this.countDownValue === 0) clearInterval(interval);
		}, 1 * 1000);

		if (this.$auth.loggedIn) {
			this.$axios(`/v2/credits/${this.$auth.user.id}`)
				.then(({ data }) => {
					if (data.userId) {
						const staffRoles = [
							"606270745299124235", //Creator
							"493135149274365975", //Executive Director
							"691382096878370837", //Operations Supervisior
							"673681900476432387", //Global Community Representative
							"673682511288598575", //Head Software Engineer
							"616646805907832833", //Web Developer
							"691393583189721088", //Linux Maintainer
							"691396820236107837", //Engineer
							"691386502566903850", //Graphic Designer
							"548518356324581377", //Senior Moderator
							"673683121971134505", //Head of Presence Verifying
							"691384256672563332", //Community Representative
							"514546359865442304", //Moderator
							"526734093560315925", //Junior Moderator
							"566417964820070421", //Support Agent
							"630445337143935009" //Presence Verifier
						];

						if (staffRoles.indexOf(data.roleId) !== -1) this.isStaff = true;
						else this.isStaff = false;
					}
				})
				.catch(() => {
					// this.$nuxt.error({ statusCode: 500 })
				});
		}
	}
};
</script>
