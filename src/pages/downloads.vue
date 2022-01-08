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
							v-else-if="appVersion"
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
							v-if="extVersion"
							href="https://github.com/PreMiD/Extension"
							target="_blank"
							class="label label_downloads-version"
							v-text="extVersion"
						></a>
					</h1>

					<div class="dl-container__cards">
						<div
							:class="{
								'current-platform':
									browser.key == 'chrome' || browser.key == 'edge'
							}"
							class="cards__card clickable"
							@click="
								browser.warning
									? warn(browser.warning)
									: open(browser.key, 'Extension')
							"
						>
							<div class="card__icon">
								<i :class="`fa-${isChrome ? browser.icon : 'chrome'} fab`"></i>
							</div>
							<div class="card__content">
								<h3>{{ isChrome ? browser.name : "Chrome" }}</h3>
							</div>
						</div>

						<a
							:class="{ 'current-platform': browser.key == 'firefox' }"
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
						<a
							:class="{ 'current-platform': browser.key == 'safari' }"
							class="cards__card clickable"
							@click="open('safari', 'Extension')"
						>
							<div class="card__icon">
								<i class="fa-safari fab"></i>
							</div>
							<div class="card__content">
								<h3>Safari</h3>
							</div>
						</a>
					</div>
				</div>
				<div v-if="noBetas" class="show-beta">
					<p>No Betas!</p>
					<small
						>It seems like we don't have any betas to test with you at this
						time... Stay tuned!</small
					>
				</div>
				<div class="show-beta" v-else-if="!showBeta">
					<div>
						<p>{{ $t("downloads.showbeta.message") }}</p>
						<small>{{ $t("downloads.showbeta.small") }}</small>
					</div>
					<i @click="showBeta = true" class="fas fa-chevron-down"></i>
				</div>

				<div
					v-else
					id="beta-downloads"
					class="dl-container__section dl-container__section_downloads waves-aligned"
				>
					<h1 class="section-header">
						{{ $t("downloads.latest.header") }}
						<a
							v-if="$auth.loggedIn && userAccess"
							class="label label_downloads-version bv"
							@click="changeTab"
							v-text="currentTab.releaseType"
						></a>
					</h1>

					<div v-if="$auth.loggedIn">
						<div v-if="userAccess == true">
							<div class="dl-container__cards">
								<div
									v-for="(platform, index) of currentTab.appLinks"
									:key="platform.platform.toString()"
								>
									<div @click="openInNewTab(platform.link)">
										<div
											:class="{ 'current-platform': index == 1 }"
											class="cards__card clickable"
										>
											<div class="card__icon">
												<i
													:class="`fab fa-${platform.platform.toLowerCase()}`"
												></i>
											</div>
											<div class="card__content">
												<h3 v-text="platform.platform" />
												<p v-t="currentTab.releaseType" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="dl-container__cards">
								<div
									v-for="platform of currentTab.extLinks"
									:key="platform.platform.toString()"
									:class="{
										'current-platform':
											browser.key.replace('chrome', 'chromium') ==
											platform.platform.toString().toLowerCase()
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
										<p v-t="currentTab.releaseType" />
									</div>
								</div>
							</div>
						</div>
						<div class="dl-container__cards nobeta" v-else>
							<h1 v-t="'downloads.error.noaccess.title'" />
							<p
								v-if="betaUsers < availableSlots"
								v-html="
									linkify(
										$t('downloads.error.noaccess.description', {
											0: availableSlots - betaUsers
										})
									)
								"
							/>
							<p v-t="'error.noslots'" v-else></p>
						</div>
					</div>
					<div class="dl-container__cards" v-else>
						<div class="button-container">
							<p v-t="'downloads.error.login'" />
							<button
								type="button"
								class="button login"
								@click="$router.push('/login')"
							>
								{{ $t("downloads.button.login") }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>

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

		<modal
			v-if="modalAvailable"
			:classes="'modal'"
			width="400px"
			height="auto"
			name="warning"
		>
			<div class="title">{{ $t("downloads.warning.title") }}</div>
			<div class="message">
				<p
					v-html="
						linkify(
							$t(warning.messageKey),
							'https://addons.opera.com/en/extensions/details/install-chrome-extensions/'
						)
					"
				></p>
			</div>
			<div class="buttons">
				<div class="container">
					<button class="button btn cancel" @click="$modal.hide('warning')">
						{{ $t("downloads.button.cancel") }}
					</button>
					<button
						class="button btn accept"
						@click="open('chrome', 'Extension')"
					>
						{{ $t("downloads.button.okay") }}
					</button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	export default {
		name: "Downloads",
		auth: false,
		async asyncData({ $auth, app, error }) {
			try {
				let userAccess = false,
					tabs = {},
					currentTab = {};

				try {
					const data = await app.$graphql(
						`
			{
				betaUsers {
					number
				}
				discordUsers {
					userId
				}
				versions {
					app
					extension
					linux
				}
			}
		`
					);

					let noBetas = false;

					if ($auth.loggedIn) {
						const { downloads } = await app.$graphql(`
						{
							downloads(token: "${$auth.$storage._state["_token.discord"]}") {
								releaseType
								appLinks
								enabled
								extLinks {
									platform
									link
								}
							}
						}
					`);

						noBetas =
							downloads.length !== downloads.filter(d => d.enabled).length;

						userAccess = downloads.length > 0;

						if (userAccess)
							downloads.forEach(d => {
								tabs[d.releaseType] = d;
							});

						if (downloads.find(d => d.releaseType == "alpha"))
							currentTab = downloads.find(d => d.releaseType == "alpha");
						else currentTab = downloads.find(d => d.releaseType == "beta");
					}

					return {
						noBetas,
						extVersion: data.versions.extension,
						appVersion: data.versions.app,
						linuxVersion: data.versions.linux,
						userAccess: userAccess,
						extraDownloads: tabs,
						currentTab: currentTab,
						betaUsers: data.betaUsers.number,
						availableSlots: (data.discordUsers.length * 0.1).toFixed()
					};
				} catch (err) {
					return {
						noBetas: false,
						extVersion: null,
						appVersion: null,
						linuxVersion: null,
						userAccess: false,
						extraDownloads: [],
						currentTab: null,
						betaUsers: null,
						availableSlots: null
					};
				}
			} catch (err) {
				return error(err);
			}
		},
		data() {
			return {
				skipAds: false,
				showBeta: false,
				extVersion: null,
				appVersion: null,
				linuxVersion: null,
				cardHover: false,
				modalAvailable: false,
				platforms: [],
				isChrome: true,
				browser: {
					name: "Chrome",
					key: "chrome",
					warning: false
				},
				warning: {
					number: null,
					messageKey: null
				},
				platform_order: ["windows", "apple", "linux"],
				builds: {
					windows: {
						os_name: "Windows",
						has_installer: true
					},
					apple: {
						os_name: "macOS",
						has_installer: true
					},
					linux: {
						os_name: "Linux",
						warning: true,
						has_installer: true
					}
				},
				isMobile: false,
				showDownloads: true
			};
		},
		mounted() {
			let ua = "";

			this.$auth.$storage.setUniversal("redirect", "/downloads#beta-downloads");

			if (process.browser) ua = navigator.userAgent;

			//* Browser detection.
			// Thanks to https://stackoverflow.com/a/9851769 for providing code.
			this.isChrome =
				!!window.chrome &&
				(!!window.chrome.webstore || !!window.chrome.runtime);

			if (
				!this.isChrome &&
				ua.indexOf("Safari") !== -1 &&
				ua.indexOf("Chrome") === -1
			) {
				this.browser = {
					name: "Safari",
					key: "safari",
					icon: "safari",
					warning: false
				};
			} else if (this.isChrome && ua.indexOf("Edg") !== -1) {
				this.browser = {
					name: "Edge",
					key: "edge",
					icon: "edge",
					warning: false
				};
			} else if (this.isChrome && ua.indexOf("Vivaldi") !== -1) {
				this.browser = {
					name: "Vivaldi",
					key: "chrome",
					icon: "chrome", // No icons for Vivaldi in the FA pack.
					warning: false
				};
			} else if (
				(!!window.opr && !!opr.addons) ||
				!!window.opera ||
				ua.indexOf(" OPR/") >= 0
			) {
				this.browser = {
					name: "Opera",
					key: "chrome",
					icon: "opera",
					warning: 2
				};
			} else if (typeof InstallTrigger !== "undefined") {
				this.isChrome = false;
				this.browser = {
					name: "Firefox",
					key: "firefox",
					icon: null,
					warning: false
				};
			} else {
				this.browser = {
					name: "Chrome",
					key: "chrome",
					icon: "chrome",
					warning: false
				};
			}

			let platform_temp = "linux";
			var platform_order = this.platform_order;

			if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
			if (ua.includes("Windows")) platform_temp = "windows";
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					ua
				)
			) {
				this.isMobile = true;
				this.showDownloads = false;
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

			setTimeout(() => (this.modalAvailable = true));

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
				if (this.userAccess) {
					if (this.currentTab.releaseType == "beta") {
						if (!Object.keys(this.extraDownloads).find(d => d == "alpha"))
							return;

						this.currentTab = this.extraDownloads["alpha"];
					} else this.currentTab = this.extraDownloads["beta"];
				}
			},
			highlight(elementPath) {
				const element = document.querySelector(elementPath);

				if (element) {
					setTimeout(() => element.classList.add("highlight"));
					setTimeout(() => element.classList.remove("highlight"), 1000);
				}
			},
			linkify(pls, customUrl) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map(ch => {
					return pls.replace(
						ch,
						`<a class="text-highlight" href="${
							customUrl || "/beta"
						}">${ch.slice(2, ch.length - 2)}</a>`
					);
				})[0];
			},
			warn(number) {
				switch (number) {
					case 2:
						this.warning.messageKey = "downloads.warning.message.opera";
						break;
					default:
						this.warning.messageKey = "Unknown error.";
						break;
				}

				this.$modal.show("warning");
			},
			open(platform, type = "") {
				if (platform == "linux") {
					this.openInNewTab(
						"https://github.com/PreMiD/Linux/blob/master/README.md"
					);
					return;
				}

				this.$store.commit("download/setDL", { platform, type });
				this.$nuxt.setLayout("skipAds");
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
