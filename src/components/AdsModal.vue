<template>
	<transition name="fade">
		<div v-if="value" class="skip-ads-modal">
			<div class="skip-ads-container columns">
				<div v-if="!$device.isMobile">
					<adsense root-class="ad" ad-slot="3276628083"></adsense>
				</div>

				<div :class="{ 'ads-container': true, 'grid-full': $device.isMobile }">
					<div class="text-center">
						<div class="back-button" @click="$emit('input', false)">
							{{ $t("downloads.button.back") }}
						</div>
					</div>

					<div class="card">
						<div v-if="probsUsingAdBlock" class="image">
							<img
								alt="peepo cry emoji"
								src="https://cdn.discordapp.com/attachments/473603737135349792/695397570272559235/634432333226836020.png"
							/>
						</div>

						<div class="title">
							<h1>{{ $t("downloads.adsbox.thankyou.title") }}</h1>
							<p v-if="!probsUsingAdBlock" class="mx-auto">
								{{ $t("downloads.adsbox.thankyou.message") }}
							</p>
						</div>

						<div :class="{ 'mt-2': probsUsingAdBlock }">
							<button
								v-if="probsUsingAdBlock"
								class="button"
								@click="skipAnyway"
							>
								{{ $t("downloads.button.skipanyway") }}
							</button>

							<button
								v-else-if="!probsUsingAdBlock"
								:class="{ 'button mr-0': true, disabled: countDown > 0 }"
								@click="countDown > 0 ? false : open(getHref)"
							>
								{{ countDown > 0 ? countDown : $t("downloads.button.skip") }}
							</button>
						</div>
					</div>

					<div>
						<adsense root-class="ad" ad-slot="9757727213"></adsense>
					</div>
				</div>

				<div v-if="!$device.isMobile">
					<adsense root-class="ad" ad-slot="4398138065"></adsense>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true,
			default: false
		},
		platform: {
			type: String,
			required: true,
			default: ""
		}
	},
	data() {
		return {
			probsUsingAdBlock: false,
			countDown: 10,
			target: "",
			href: "",
			urls: {
				windows: "https://dl.premid.app/PreMiD-installer.exe",
				apple: "https://dl.premid.app/PreMiD-installer.app.zip",
				edge:
					"https://microsoftedge.microsoft.com/addons/detail/hkchpjlnddoppadcbefbpgmgaeidkkkm",
				chrome:
					"https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
				firefox: "https://dl.premid.app/PreMiD.xpi",
				safari: "https://github.com/PreMiD/Extension-Safari"
			}
		};
	},
	watch: {
		value: "resetCountdown"
	},
	computed: {
		getPlatform() {
			return this.platform;
		},
		getHref() {
			return this.urls[this.getPlatform];
		},
		getTarget() {
			return this.getPlatform === "chrome" ? "_blank" : "_same";
		}
	},
	beforeDestroy() {
		if (this.adBlockInterval) clearInterval(this.adBlockInterval);
		if (this.interval) clearInterval(this.interval);
	},
	methods: {
		resetCountdown() {
			if (this.value === false) {
				clearInterval(this.interval);
				this.countDown = 10;
			} else if (this.value === true) {
				this.checkBlock();
				this.startInterval();
			}
		},
		startInterval() {
			this.interval = setInterval(() => {
				this.countDown--;

				if (this.countDown < 0) clearInterval(this.interval);
			}, 1000);
		},
		skipAnyway() {
			this.open(this.getHref);
			this.$emit("input", false);
		},
		open(url) {
			if (this.getTarget) {
				window.open(url, this.getTarget).focus();
				this.$emit("input", false);
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
.skip-ads-modal {
	z-index: 50;
	background-color: rgba(0, 0, 0, 0.95);
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}

.skip-ads-container {
	max-width: 100vw;

	&.columns {
		min-height: 100vh;
		max-height: 100vh;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 1em;
	}

	> div:not(:nth-child(2)) {
		padding: 1em;
	}
}

.ads-container {
	grid-template-rows: repeat(5, minmax(0, 1fr));
	grid-column: span 3 / span 3;
	max-height: 100vh;
	display: grid;
	gap: 2em;

	&.grid-full {
		grid-column: 1 / -1;
	}

	.card {
		grid-row: span 3 / span 3;
	}

	> div:last-child {
		padding: 1em;
	}

	@media screen and (max-width: 1024px) {
		grid-template-rows: repeat(5, minmax(0, 1fr));
		max-height: 100vh;
		padding: 0;

		.card > div:not(:nth-child(2)) {
			grid-row: span 1 / span 1;
		}
	}
}

.card {
	text-align: center;
	align-self: center;

	.image {
		text-align: center;

		img {
			border-radius: 100%;
			transition: transform 1s;

			&:hover {
				transform: rotate(-180);
			}
		}
	}

	.title {
		h1 {
			display: block;
			margin-top: 0;
			margin-bottom: 0;
		}

		p {
			max-width: 20rem;
		}
	}

	.buttons:not(.not-grid) {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 0.5em;

		.button {
			margin-right: unset;
		}
	}
}

.back-button {
	font-size: 1.25rem;
	cursor: pointer;
	margin-top: 0.75em;

	&:hover {
		text-decoration: underline;
	}
}
</style>
