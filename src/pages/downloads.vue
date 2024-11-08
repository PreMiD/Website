<template>
	<div class="dl-container">
		<div class="dl-container__section dl-container__section_header pattern">
			<div class="dl-container__header">
				<div class="header__content">
					<h1>{{ $t("downloads.header.title") }}</h1>
					<p>{{ $t("downloads.header.subtitle") }}</p>
				</div>
				<!-- <div class="header__steps">
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
				</div> -->
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
				PreMiD is not available for mobile devices. Please use a desktop browser to install PreMiD.
			</div>
		</transition>

		<transition name="card-animation" mode="out-in">
			<div v-if="showDownloads">
				<div class="dl-container__section dl-container__notice">
					<div class="notice__content">
						<div class="notice__header">
							<div class="header__icon">
								<i class="fas fa-wand-sparkles"></i>
							</div>
							<h2>Big News!</h2>
						</div>
						<div class="notice__body">
							<p>We've removed the application completely!<br> Now you only need the browser extension - no extra downloads needed.</p>
							<div class="body__tags">
								<span class="tag"><i class="fas fa-bolt"></i> One-Click Setup</span>
								<span class="tag"><i class="fas fa-feather"></i> No App Needed</span>
								<span class="tag"><i class="fas fa-rocket"></i> Just Works™</span>
							</div>
							<small>Application removed in v2.6.0 to make your life easier ✨</small>
						</div>

						<div class="notice__downloads">
							<h3>Get PreMiD for your browser</h3>
							<div class="downloads__cards">
								<div
									:class="{
										'current-platform':
											browser.key == 'chrome' || browser.key == 'edge'
									}"
									class="download-card"
									@click="open(browser.key, 'Extension')"
								>
									<i :class="`fa-${isChrome ? browser.icon : 'chrome'} fab`"></i>
									<span>{{ isChrome ? browser.name : "Chrome" }}</span>
								</div>

								<div
									:class="{ 'current-platform': browser.key == 'firefox' }"
									class="download-card"
									@click="open('firefox', 'Extension')"
								>
									<i class="fa-firefox fab"></i>
									<span>Firefox</span>
								</div>

								<div class="download-card download-card--disabled">
									<i class="fa-safari fab"></i>
									<span>Safari</span>
									<div class="coming-soon">Coming Soon</div>
								</div>
							</div>
						</div>

						<div class="notice__beta-info">
							<div class="beta-info__item">
								<div class="item__icon">
									<i class="fas fa-flask"></i>
								</div>
								<div class="item__content">
									<h3>Beta Program</h3>
									<p>Love trying new stuff? Join our Discord and use <code>/beta</code> to get early access!</p>
								</div>
							</div>
							<div class="beta-info__item">
								<div class="item__icon">
									<i class="fas fa-crown"></i>
								</div>
								<div class="item__content">
									<h3>Alpha Access</h3>
									<p>Support us on <strong>GitHub</strong> or <strong>Patreon</strong> to get the bleeding-edge features!</p>
								</div>
							</div>
						</div>
						<div class="notice__support">
							<i class="fas fa-question-circle"></i>
							<p>Need help? Join our <a href="https://discord.premid.app" target="_blank">Discord</a> for support!</p>
						</div>
						<div class="notice__appreciation">
							<div class="appreciation__content">
								<h3><i class="fas fa-heart"></i> Love PreMiD?</h3>
								<p>Consider supporting us or leaving a review - it means the world to us!</p>
								<div class="appreciation__buttons">
									<a href="https://github.com/sponsors/PreMiD" target="_blank" class="button button--github">
										<i class="fab fa-github"></i>
										GitHub Sponsors
									</a>
									<a href="https://patreon.com/Timeraa" target="_blank" class="button button--patreon">
										<i class="fab fa-patreon"></i>
										Patreon
									</a>
									<a href="https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi" target="_blank" class="button button--review">
										<i class="fas fa-star"></i>
										Review Us
									</a>
								</div>
							</div>
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
	</div>
</template>

<script>
	export default {
		name: "Downloads",
		auth: false,
		data() {
			return {
				isChrome: true,
				browser: {
					name: "Chrome",
					key: "chrome",
					warning: false
				},
				isMobile: false,
				showDownloads: true
			};
		},
		mounted() {
			let ua = "";

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
					icon: "chrome",
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

			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					ua
				)
			) {
				this.isMobile = true;
				this.showDownloads = false;
			}
		},
		methods: {
			highlight(elementPath) {
				const element = document.querySelector(elementPath);

				if (element) {
					setTimeout(() => element.classList.add("highlight"));
					setTimeout(() => element.classList.remove("highlight"), 1000);
				}
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

	.dl-container__notice {
		text-align: center;
		background: rgba(23, 23, 23, 0.5);
		border-radius: 1rem;
		padding: 2rem;
		margin: 4rem 2rem 2rem;
		max-width: 800px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(114, 137, 218, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		margin-left: auto;
		margin-right: auto;

		@media (max-width: 768px) {
			margin: 1rem;
			padding: 1.5rem;
		}

		.notice__content {
			.notice__header {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1.5rem;
				margin-bottom: 2rem;

				@media (max-width: 768px) {
					gap: 1rem;

					.header__icon {
						width: 3.5rem;
						height: 3.5rem;

						i {
							font-size: 2rem;
						}
					}

					h2 {
						font-size: 2rem;
					}
				}

				.header__icon {
					background: linear-gradient(135deg, #7289da, #4e5d94);
					width: 4.5rem;
					height: 4.5rem;
					border-radius: 1.2rem;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 0 4px 12px rgba(114, 137, 218, 0.3);
					transform: rotate(-5deg);

					i {
						color: white;
						font-size: 2.5rem;
					}
				}

				h2 {
					margin: 0;
					color: #7289da;
					font-size: 2.5rem;
					font-weight: 800;
				}
			}

			.notice__body {
				p {
					margin: 0 0 1.5rem 0;
					opacity: 0.9;
					font-size: 1.3rem;
					line-height: 1.5;

					@media (max-width: 768px) {
						font-size: 1.1rem;
						br {
							display: none;
						}
					}
				}

				small {
					display: block;
					margin-top: 1.5rem;
					color: rgba(255, 255, 255, 0.5);
					font-size: 0.9rem;
					font-style: italic;
				}

				.body__tags {
					display: flex;
					gap: 1.2rem;
					justify-content: center;
					margin-bottom: 0.5rem;

					.tag {
						background: rgba(114, 137, 218, 0.1);
						padding: 0.6rem 1.2rem;
						border-radius: 2rem;
						font-size: 1rem;
						color: #7289da;
						border: 1px solid rgba(114, 137, 218, 0.2);
						display: flex;
						align-items: center;
						gap: 0.6rem;
						transition: none;

						&:hover {
							background: rgba(114, 137, 218, 0.1);
							transform: none;
						}

						i {
							font-size: 1rem;
						}
					}

					@media (max-width: 768px) {
						flex-wrap: wrap;
						gap: 0.8rem;

						.tag {
							padding: 0.5rem 1rem;
							font-size: 0.9rem;
						}
					}
				}
			}

			.notice__beta-info {
				margin-top: 1.5rem;
				padding-top: 1.5rem;
				border-top: 1px solid rgba(255, 255, 255, 0.1);
				display: flex;
				gap: 2rem;
				justify-content: center;

				@media (max-width: 768px) {
					flex-direction: column;
					gap: 1.5rem;
				}

				.beta-info__item {
					display: flex;
					align-items: center;
					gap: 1.2rem;
					max-width: 300px;

					.item__icon {
						background: rgba(114, 137, 218, 0.1);
						min-width: 4rem;
						height: 4rem;
						border-radius: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid rgba(114, 137, 218, 0.2);
						transition: none;

						&:hover {
							background: rgba(114, 137, 218, 0.1);
							transform: none;
						}

						i {
							color: #7289da;
							font-size: 1.8rem;
						}
					}

					.item__content {
						text-align: left;

						h3 {
							margin: 0 0 0.4rem 0;
							font-size: 1.2rem;
							color: #7289da;
							font-weight: 600;
						}

						p {
							margin: 0;
							font-size: 1rem;
							opacity: 0.9;
							line-height: 1.5;
						}

						code {
							background: rgba(114, 137, 218, 0.1);
							padding: 0.2rem 0.4rem;
							border-radius: 0.3rem;
							font-size: 0.9rem;
							color: #7289da;
						}

						strong {
							color: #7289da;
						}
					}
				}
			}

			.notice__support {
				margin-top: 1.5rem;
				padding-top: 1.5rem;
				border-top: 1px solid rgba(255, 255, 255, 0.1);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.75rem;
				color: rgba(255, 255, 255, 0.7);

				i {
					color: #7289da;
					font-size: 1.2rem;
				}

				p {
					margin: 0;
					font-size: 1rem;

					a {
						color: #7289da;
						text-decoration: none;
						font-weight: 600;
						transition: opacity 0.2s ease;

						&:hover {
							opacity: 0.8;
						}
					}
				}
			}

			.notice__appreciation {
				margin-top: 1.5rem;
				padding-top: 1.5rem;
				border-top: 1px solid rgba(255, 255, 255, 0.1);

				.appreciation__content {
					h3 {
						color: #ff6b81;
						font-size: 1.4rem;
						margin: 0 0 0.5rem 0;
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 0.5rem;

						i {
							font-size: 1.2rem;
						}
					}

					p {
						margin: 0 0 1.2rem 0;
						opacity: 0.9;
						font-size: 1.1rem;
					}

					.appreciation__buttons {
						display: flex;
						gap: 1rem;
						justify-content: center;
						flex-wrap: wrap;

						.button {
							padding: 0.6rem 1.2rem;
							border-radius: 0.5rem;
							text-decoration: none;
							font-weight: 600;
							display: flex;
							align-items: center;
							gap: 0.5rem;
							font-size: 0.95rem;
							transition: transform 0.2s ease;

							&:hover {
								box-shadow: unset;
								transform: translateY(-2px);
							}

							i {
								font-size: 1.1rem;
							}

							&--github {
								background: #24292e;
								color: white;
							}

							&--patreon {
								background: #ff424d;
								color: white;
							}

							&--review {
								background: #ffd700;
								color: #1a1a1a;

								i {
									color: #1a1a1a;
								}
							}
						}
					}
				}
			}

			.notice__downloads {
				margin-top: 2rem;
				padding: 2rem;
				background: rgba(114, 137, 218, 0.05);
				border-radius: 1rem;
				border: 1px solid rgba(114, 137, 218, 0.1);

				h3 {
					margin: 0 0 1.5rem 0;
					font-size: 1.4rem;
					color: #7289da;
				}

				.downloads__cards {
					display: flex;
					gap: 1rem;
					justify-content: center;
					flex-wrap: wrap;

					.download-card {
						background: rgba(114, 137, 218, 0.1);
						padding: 1.5rem;
						border-radius: 1rem;
						border: 1px solid rgba(114, 137, 218, 0.2);
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 0.8rem;
						min-width: 120px;
						cursor: pointer;
						transition: all 0.2s ease;

						&:hover {
							background: rgba(114, 137, 218, 0.15);
							transform: translateY(-2px);
						}

						&.current-platform {
							background: rgba(114, 137, 218, 0.2);
							border-color: rgba(114, 137, 218, 0.3);
						}

						i {
							font-size: 2.5rem;
							color: #7289da;
						}

						span {
							font-size: 1.1rem;
							font-weight: 600;
							color: #7289da;
						}

						&--disabled {
							opacity: 0.5;
							cursor: not-allowed;
							position: relative;
							overflow: hidden;

							&:hover {
								background: rgba(114, 137, 218, 0.1);
								transform: none;
							}

							.coming-soon {
								position: absolute;
								bottom: 0;
								left: 0;
								right: 0;
								background: rgba(114, 137, 218, 0.3);
								color: white;
								font-size: 0.8rem;
								padding: 0.2rem;
								text-align: center;
								font-weight: 500;
							}
						}
					}
				}
			}
		}
	}

	// Add mobile warning styles
	.dl-container__mobile-warning {
		background: rgba(255, 87, 87, 0.1);
		border: 1px solid rgba(255, 87, 87, 0.2);
		border-radius: 1rem;
		padding: 1.5rem;
		margin: 1rem;
		text-align: center;
		color: #ff5757;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;

		&::before {
			content: "\f071";
			font-family: "Font Awesome 5 Free";
			font-weight: 900;
		}
	}

	// Update mobile toggle button
	.dl-container__showDownloads {
		text-align: center;
		margin: 1rem;

		span {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			background: rgba(114, 137, 218, 0.1);
			border: 1px solid rgba(114, 137, 218, 0.2);
			padding: 0.75rem 1.5rem;
			border-radius: 2rem;
			cursor: pointer;
			font-weight: 500;
			transition: background 0.2s ease;

			&::after {
				content: "\f078";
				font-family: "Font Awesome 5 Free";
				font-weight: 900;
				font-size: 0.8rem;
			}

			&:hover {
				background: rgba(114, 137, 218, 0.15);
			}
		}
	}
</style>
