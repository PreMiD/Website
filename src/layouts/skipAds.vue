<template>
	<div id="wrapper">
		<navigation
			noLinks="true"
			:target="target"
			:href="href"
			:countDownBtn="!probsUsingAdBlock"
		/>

		<div class="adswrapper" v-if="!isMobile">
			<adsense
				root-class="ad"
				ad-slot="3276628083"
				:ad-style="{ display: 'block', height: '85vh', minWidth: '250px' }"
			></adsense>

			<adsense
				root-class="ad"
				ad-slot="4398138065"
				:ad-style="{ display: 'block', height: '85vh', minWidth: '250px' }"
			></adsense>
		</div>

		<div v-if="!probsUsingAdBlock" class="note">
			<h1 class="title">{{ $t("downloads.adsbox.thankyou.title") }}</h1>
			<p class="description">{{ $t("downloads.adsbox.thankyou.message") }}</p>

			<div v-if="isMobile && !probsUsingAdBlock" class="mobile">
				<button
					v-if="countDown <= 0"
					class="button"
					@click="$router.go({ path: '/downloads' })"
				>
					{{ $t("downloads.button.back") }}
				</button>
				<button
					:disabled="countDown > 0"
					:class="`button ${this.countDown > 0 ? 'disabled' : ''}`"
					@click="countDown > 0 ? false : open(href)"
				>
					{{ countDown > 0 ? countDown : $t("downloads.button.skip") }}
				</button>
			</div>
		</div>

		<div v-else-if="probsUsingAdBlock" class="note smol">
			<div class="disable">
				<img
					src="https://cdn.discordapp.com/attachments/473603737135349792/695397570272559235/634432333226836020.png"
				/>
				<p>{{ $t("downloads.adsbox.disableAdblock") }}</p>
			</div>

			<div class="controls">
				<button class="button" @click="$router.go({ path: '/downloads' })">
					{{ $t("downloads.button.done") }}
				</button>
			</div>

			<a class="skip-anyway" @click="skipAnyway">
				{{ texts[0] }}
			</a>
		</div>

		<adsense
			root-class="ad"
			ad-slot="9757727213"
			:ad-style="{
				display: 'block',
				margin: '15px auto',
				'text-align': 'center',
				height: '250px',
				width: '100%',
				position: 'absolute',
				bottom: '0'
			}"
		></adsense>
	</div>
</template>

<script>
	export default {
		head: {
			title: "Downloads"
		},
		data() {
			return {
				texts: [
					this.$t("downloads.skipanyway.message1"),
					this.$t("downloads.skipanyway.message2"),
					this.$t("downloads.skipanyway.message3"),
					this.$t("downloads.skipanyway.message4"),
					this.$t("downloads.skipanyway.message5"),
					this.$t("downloads.skipanyway.message6")
				],
				probsUsingAdBlock: false,
				target: null,
				countDown: 5,
				href: null,
				isMobile: false,
				urls: {
					windows: "https://dl.premid.app/PreMiD-installer.exe",
					apple: "https://dl.premid.app/PreMiD-installer.app.zip",
					chrome:
						"https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
					firefox: "https://dl.premid.app/PreMiD.xpi"
				}
			};
		},
		beforeMount() {
			let platform = this.$store.state.download.platform;
			this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

			this.target = platform === "chrome" ? "_blank" : null;
			this.href = this.urls[platform];
			this.checkBlock();
		},
		mounted() {
			if (this.isMobile)
				this.interval = setInterval(() => {
					this.countDown--;

					if (this.countDown < 0) clearInterval(this.interval);
				}, 1000);

			// Users not seing the skip button
			window.scrollTo(0, 0);
			let rads = 0;

			while (rads === 0) {
				rads = Math.floor(Math.random() * 10);
			}
		},
		beforeDestroy() {
			if (this.adBlockInterval) clearInterval(this.adBlockInterval);
		},
		methods: {
			skipAnyway() {
				this.texts = this.texts.slice(1);
				if (!this.texts.length) {
					this.open(this.href);
					this.$nuxt.setLayout("default");
				}
			},
			open(url) {
				if (this.isMobile && this.target) {
					window.open(url, this.target).focus();
					this.$nuxt.setLayout("default");
				} else window.location.href = url || window.location.href;
			},
			checkBlock(callback) {
				// deepscan-disable-line
				this.adBlockInterval = setInterval(() => {
					this.probsUsingAdBlock =
						Array.from(document.querySelectorAll(".adsbygoogle")).filter(
							el => el.innerHTML !== ""
						).length === 0;

					if (this.probsUsingAdBlock) clearInterval(this.adBlockInterval);
				}, 100);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.adswrapper {
		justify-content: space-between;
		display: flex;
		padding: 0 1em;
		height: 85vh;
	}

	.skip-anyway {
		font-size: 1rem;
		position: absolute;
		bottom: -1.5em;
		left: 0;
		width: 100%;
		transition: opacity 0.2s ease-in-out;

		&:hover {
			opacity: 0.75;
		}
	}

	.space {
		.left,
		.right {
			width: 250px;
			height: 85vh;
		}

		&.bottom {
			text-align: -webkit-center;
			text-align: -moz-center;
			width: 100%;
			height: 250px;
		}
	}

	.note {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		box-shadow: 0 10px 20px -2px rgba(27, 33, 58, 0.4);
		background-color: #191b24;
		font-size: 25px;
		width: 350px;
		padding: 15px;
		border-radius: 10px;

		&.smol {
			width: 400px;
			padding: 1em;

			img {
				height: 128px;
			}

			.controls {
				position: absolute;
				right: 0;
				bottom: 0;
				padding: 0.75em;

				.button {
					margin-right: unset;
					padding: 0.5em 1em;
					font-size: large;
				}
			}
		}

		.title {
			margin: 0;
			font-size: large;
			color: #7289da;
			text-transform: uppercase;
		}

		.disable {
			display: flex;

			p {
				height: fit-content;
				padding: 0;
				margin: 0 0 0 4px;
				font-size: large;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.description {
			margin: 0;
			font-size: large;
		}
	}

	@media only screen and (max-width: 600px) {
		.adswrapper {
			display: unset;
		}

		.note {
			position: relative;
			left: 0;
			transform: unset;
			margin-bottom: unset;
			width: unset;

			&.smol {
				margin-bottom: 1em;
				width: unset;
			}

			.mobile {
				font-size: medium;
				text-align: center;
				padding-top: 1em;

				.disabled {
					filter: grayscale(1);
					transition: filter 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
				}
			}
		}

		.space {
			width: 250px;
			height: 600px;

			&.bottom {
				position: absolute;
				bottom: 0;
			}
		}
	}
</style>
