<template>
	<div class="dl-container">
		<div class="dl-container__section dl-container__section_header pattern">
			<div class="dl-container__header">
				<div class="header__content">
					<h1>{{ $t("downloads.header.title") }}</h1>
					<p>{{ $t("downloads.header.subtitle") }}</p>
				</div>
				<div class="header__steps">
					<h2>{{ $t("downloads.instructions.heading") }}</h2>
					<ol>
						<li>
							<p>
								{{ $t("downloads.instructions.step.1") }}
								[
								<a
									href="#app-downloads"
									@click="highlight('#app-downloads .section-header')"
								>
									<i class="fa-arrow-down fas"></i>
								</a>
								]
							</p>
						</li>
						<li>
							<p>{{ $t("downloads.instructions.step.2") }}</p>
						</li>
						<li>
							<p>
								{{ $t("downloads.instructions.step.3") }}
								[
								<a
									href="#ext-downloads"
									@click="highlight('#ext-downloads .section-header')"
								>
									<i class="fa-arrow-down fas"></i>
								</a>
								]
							</p>
						</li>
						<li>
							<p>
								<i18n path="downloads.instructions.step.4">
									<nuxt-link to="/store">{{
										$t("downloads.instructions.step.4.store")
									}}</nuxt-link>
								</i18n>
							</p>
						</li>
					</ol>
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

		<transition name="card-animation" mode="out-in">
			<div
				v-if="isMobile"
				class="dl-container__section dl-container__mobile-warning waves-aligned"
			>
				{{ $t("downloads.mobile.errorMessage") }}
			</div>
		</transition>

		<transition name="card-animation" mode="out-in">
			<div v-if="showDownloads">
				<div
					id="app-downloads"
					class="dl-container__section dl-container__section_downloads waves-aligned"
				>
					<h1 class="section-header">
						{{ $t("downloads.appdownloading.header") }}
						<a
							v-if="platform_order[1] == 'linux'"
							href="https://github.com/PreMiD/Linux/releases"
							target="_blank"
							class="label label_downloads-version linux"
							v-tippy="{
								content: $t('downloads.warning.differentVersion2', {
									0: appVersion
								})
							}"
							v-text="linuxVersion"
						></a>

						<a
							v-else
							href="https://github.com/PreMiD/PreMiD/releases"
							target="_blank"
							class="label label_downloads-version"
							v-text="appVersion"
						></a>
					</h1>
					<div class="dl-container__cards">
						<div v-for="(platform, index) of platform_order" :key="platform">
							<div @click="open(platform, 'Application')">
								<div
									:class="{ 'current-platform': index == 1 }"
									class="cards__card clickable"
								>
									<div class="card__icon">
										<i :class="`fab fa-${platform}`"></i>
									</div>
									<div class="card__content">
										<h3>
											{{ builds[platform].os_name }}
											<i
												v-if="!builds[platform].has_installer"
												v-tippy
												class="fa-exclamation-circle fas platform-warning"
												:content="
													$t('downloads.tooltips.os.not.supported.part2', {
														0: `<b>${$t(
															'downloads.tooltips.os.not.supported.part1'
														)}</b> `
													})
												"
											></i>

											<i
												v-if="
													platform_order[1] != 'linux' &&
													builds[platform].os_name == 'Linux' &&
													builds[platform].warning
												"
												class="fa-question-circle fas platform-warning linux"
												v-tippy="{
													content: $t('downloads.warning.differentVersion', {
														0: linuxVersion
													})
												}"
											></i>
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					id="ext-downloads"
					class="dl-container__section dl-container__section_downloads"
				>
					<h1 class="section-header">
						{{ $t("downloads.extdownloading.header") }}
						<a
							href="https://github.com/PreMiD/Extension"
							target="_blank"
							class="label label_downloads-version"
							v-text="extVersion"
						></a>
					</h1>

					<div class="dl-container__cards">
						<div
							:class="{ 'current-platform': browser == 'chrome' }"
							class="cards__card clickable"
							@click="open('chrome', 'Extension')"
						>
							<div class="card__icon">
								<i class="fa-chrome fab"></i>
							</div>
							<div class="card__content">
								<h3>Chromium</h3>
							</div>
						</div>

						<a
							:class="{ 'current-platform': browser == 'firefox' }"
							class="cards__card clickable"
							@click="open('firefox', 'Extension')"
						>
							<div class="card__icon">
								<i class="fa-firefox fab"></i>
							</div>
							<div class="card__content">
								<h3>Firefox</h3>
							</div>
						</a>
					</div>
				</div>
			</div>
		</transition>

		<div
			id="beta-downloads"
			class="dl-container__section dl-container__section_downloads waves-aligned"
		>
			<h1 class="section-header">
				{{ $t("downloads.latest.header") }}
				<a
					v-if="$auth.loggedIn && beta.access"
					class="label label_downloads-version bv"
					@click="changeTab"
					v-text="tab"
				></a>
			</h1>

			<div v-if="$auth.loggedIn">
				<div v-if="beta.access == true">
					<div class="dl-container__cards">
						<div
							v-for="(platform, index) of cTab.app_links"
							:key="platform.platform.toString()"
						>
							<div @click="openInNewTab(platform.link)">
								<div
									:class="{ 'current-platform': index == 1 }"
									class="cards__card clickable"
								>
									<div class="card__icon">
										<i :class="`fab fa-${platform.platform.toLowerCase()}`"></i>
									</div>
									<div class="card__content">
										<h3>{{ platform.platform }}</h3>
										<p v-t="tab" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="dl-container__cards">
						<div
							v-for="platform of cTab.ext_links"
							:key="platform.platform.toString()"
							:class="{
								'current-platform':
									browser == platform.platform.toString().toLowerCase()
							}"
							class="cards__card clickable"
							@click="openInNewTab(platform.link)"
						>
							<div class="card__icon">
								<i
									:class="`fab fa-${
										platform.platform.toString() == 'Chromium'
											? 'chrome'
											: platform.platform.toString().toLowerCase()
									}`"
								></i>
							</div>
							<div class="card__content">
								<h3 v-t="platform.platform"></h3>
								<p v-t="tab" />
							</div>
						</div>
					</div>
				</div>
				<div class="dl-container__cards nobeta" v-else>
					<h1 v-t="'downloads.error.noaccess.title'" />
					<p
						v-html="
							linkpls($t('downloads.error.noaccess.description')).replace(
								'{0}',
								200 - betaUsers
							)
						"
					/>
				</div>
			</div>
			<div class="dl-container__cards" v-else>
				<div class="button-container">
					<p v-t="'downloads.error.login'" />
					<button
						type="button"
						class="button"
						id="login"
						@click="$router.push('/login')"
					>
						Login
					</button>
				</div>
			</div>
		</div>

		<transition name="card-animation" mode="out-in">
			<div v-if="isMobile" class="dl-container__showDownloads">
				<span @click="showDownloads = !showDownloads">
					{{
						showDownloads
							? $t("downloads.mobile.hideDownloads")
							: $t("downloads.mobile.showDownloads")
					}}
				</span>
			</div>
		</transition>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Downloads",
		auth: false,
		async asyncData() {
			const { extension, app, linux } = (
				await axios(`${process.env.apiBase}/versions`)
			).data;

			return {
				extVersion: extension,
				appVersion: app,
				linuxVersion: linux,
				betaUsers: (
					await axios(`${process.env.apiBase}/credits`)
				).data.filter(u => u.roles.includes("BETA")).length
			};
		},
		data() {
			return {
				adBreak: false,
				extVersion: null,
				appVersion: null,
				linuxVersion: null,
				cardHover: false,
				platforms: [],
				browser: null,
				windows_url: "https://dl.premid.app/PreMiD-installer.exe",
				apple_url: "https://dl.premid.app/PreMiD-installer.app.zip",
				linux_url: "",
				chrome_url:
					"https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
				firefox_url: "https://dl.premid.app/PreMiD.xpi",
				platform_order: ["windows", "apple", "linux"],
				builds: {
					windows: {
						os_name: "Windows",
						has_installer: true
					},
					apple: {
						os_name: "OS X",
						has_installer: true
					},
					linux: {
						os_name: "Linux",
						warning: true,
						has_installer: true // So no tippy warning.
					}
				},
				isMobile: false,
				showDownloads: true,
				tab: null,
				alpha: {
					access: false,
					app_links: [],
					ext_links: []
				},
				beta: {
					access: false,
					app_links: [],
					ext_links: []
				},
				cTab: {}
			};
		},
		beforeMount() {
			if (this.$auth.loggedIn) {
				axios(`${process.env.apiBase}/alphaAccess/${this.$auth.user.id}`).then(
					response => {
						this.alpha.access = response.data.access;

						if (response.data.access) {
							this.beta.access = true;

							axios
								.post(
									`${process.env.apiBase}/downloads/${this.$auth.$storage._state["_token.discord"]}/alpha`
								)
								.then(response => {
									console.log(response.data);
									this.alpha.app_links = response.data.app_links;
									this.alpha.ext_links = response.data.ext_links;

									this.cTab = this.alpha;
									this.tab = "alpha";
								});

							axios
								.post(
									`${process.env.apiBase}/downloads/${this.$auth.$storage._state["_token.discord"]}/beta`
								)
								.then(response => {
									this.beta.app_links = response.data.app_links;
									this.beta.ext_links = response.data.ext_links;
								});
						} else
							axios(
								`${process.env.apiBase}/betaAccess/${this.$auth.user.id}`
							).then(response => {
								this.beta.access = response.data.access;
								if (response.data.access) {
									axios
										.post(
											`${process.env.apiBase}/downloads/${this.$auth.$storage._state["_token.discord"]}/beta`
										)
										.then(response => {
											this.beta.app_links = response.data.app_links;
											this.beta.ext_links = response.data.ext_links;

											this.cTab = this.beta;
											this.tab = "beta";
										});
								}
							});
					}
				);
			}
		},
		mounted() {
			let ua = "";

			this.$auth.$storage.setUniversal("redirect", "/downloads#beta-downloads");

			if (process.browser) ua = navigator.userAgent;

			//* Browser detection.
			// Thanks to https://stackoverflow.com/a/9851769 for providing code.
			if (
				!!window.chrome &&
				(!!window.chrome.webstore || !!window.chrome.runtime)
			) {
				this.$data.browser = "chrome";
			} else if (typeof InstallTrigger !== "undefined") {
				this.$data.browser = "firefox";
			}

			let platform_temp = "linux";
			var platform_order = this.$data.platform_order;

			if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
			if (ua.includes("Windows")) platform_temp = "windows";
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					ua
				)
			) {
				this.$data.isMobile = true;
				this.$data.showDownloads = false;
			}

			//* Centering the current platform in array. Only works if array has 3 items.
			platform_order.splice(platform_order.indexOf(platform_temp), 1);
			platform_order.splice(1, 0, platform_temp);

			if (
				["#app-downloads", "#ext-downloads", "#beta-downloads"].includes(
					window.location.hash
				)
			) {
				this.highlight(
					`${
						["#app-downloads", "#ext-downloads", "#beta-downloads"].filter(i =>
							i.includes(window.location.hash)
						)[0]
					} .section-header`
				);
			}

			this.$anime({
				targets: "#bv",
				scale: [1, 1.1],
				delay: 500,
				direction: "alternate",
				easing: "easeInBounce",
				loop: true
			});
		},
		methods: {
			changeTab() {
				if (this.alpha.access) {
					if (this.tab == "alpha") {
						this.tab = "beta";
						this.cTab = this.beta;
					} else {
						this.tab = "alpha";
						this.cTab = this.alpha;
					}
				} else return;
			},
			highlight(elementPath) {
				const element = document.querySelector(elementPath);

				if (!element) return false;
				console.log("HIGHLIGHT");

				setTimeout(() => element.classList.add("highlight"));

				setTimeout(() => element.classList.remove("highlight"), 1000);
			},
			linkpls(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map(ch => {
					return pls.replace(
						ch,
						`<a class="text-highlight" href="/beta">${ch.slice(
							2,
							ch.length - 2
						)}</a>`
					);
				})[0];
			},
			open(platform, type = "") {
				if (platform == "linux") {
					this.openInNewTab(
						"https://github.com/PreMiD/Linux/blob/master/README.md"
					);
					return;
				}

				this.$store.commit("download/setDL", { platform, type });
				this.$nuxt.setLayout("adBreak");
			},
			openInNewTab(url) {
				window.open(url, "_blank");
			}
		},
		head: {
			title: "Downloads"
		}
	};
</script>

<style lang="scss">
	@import "../stylesheets/variables.scss";

	.highlight::after {
		opacity: 1 !important;
	}

	.button-container {
		text-align: center;

		p {
			margin-top: 0;
		}
	}

	#login {
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
