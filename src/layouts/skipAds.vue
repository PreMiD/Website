<template>
	<div>
		<navigation
			noLinks="true"
			:target="target"
			:href="href"
			:countDownBtn="!adblock"
		/>

		<div class="breakwrapper">
			<div v-if="!adblock" class="space left">
				<adsbygoogle ad-slot="3276628083" />
			</div>

			<div v-if="!adblock" class="note">
				<h1 class="title">{{ $t("downloads.adsbox.thankyou.title") }}</h1>
				<p class="description">
					{{ $t("downloads.adsbox.thankyou.message") }}
				</p>
			</div>

			<div v-else-if="adblock" class="note smol">
				<div class="disable">
					<img
						src="https://cdn.discordapp.com/attachments/473603737135349792/695397570272559235/634432333226836020.png"
					/>
					<p>{{ $t("downloads.adsbox.disableAdblock") }}</p>
				</div>

				<div class="controls">
					<button class="button" @click="$nuxt.setLayout('default')">
						{{ $t("downloads.button.done") }}
					</button>
				</div>
			</div>

			<div v-if="isMobile && !adblock" class="mobile">
				<button
					v-if="countDown <= 0"
					class="button"
					@click="$nuxt.setLayout('default')"
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

			<div v-if="!adblock" class="space right">
				<adsbygoogle ad-slot="4398138065" />
			</div>
		</div>

		<div v-if="!adblock" class="space bottom">
			<adsbygoogle ad-slot="9757727213" />
		</div>
	</div>
</template>

<script>
	import Navigation from "../components/Navigation";
	import axios from "axios";

	export default {
		components: {
			Navigation
		},
		head: {
			title: "Downloads"
		},
		data() {
			return {
				adblock: false,
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
				navigator?.userAgent
			);

			this.target = platform === "chrome" ? "_blank" : null;
			this.href = this.urls[platform];
		},
		beforeDestroy() {
			if (this.interval) clearInterval(this.interval);
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

			axios(`/ads/ads${rads}.js`)
				.then(() => (this.adblock = false))
				.catch(() => (this.adblock = true));
		},
		methods: {
			open(url) {
				if (this.isMobile && this.target) {
					window.open(url, this.target).focus();
					this.$nuxt.setLayout("default");
				} else window.location.href = url || window.location.href;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.breakwrapper {
		display: grid;
		justify-content: space-between;
		align-items: center;
		grid-template-columns: min-content auto min-content;
		height: 100vh;
		width: 100%;

		.note {
			box-shadow: 0 10px 20px -2px rgba(27, 33, 58, 0.4);
			background-color: #191b24;
			font-size: 25px;
			max-width: 350px;
			padding: 15px;
			border-radius: 10px;

			&.smol {
				width: 400px;
				padding: 1em;
				position: relative;

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

		.space {
			width: 250px;
			height: 600px;

			&.left {
				margin-left: 50px;
			}

			&.right {
				margin-right: 50px;
			}

			&.bottom {
				margin: 1em auto;
				text-align: center;
				display: table;
				width: 100%;
				height: 250px;
			}
		}

		.mobile {
			text-align: center;
			padding: 1em;

			.disabled {
				filter: grayscale(1);
				transition: filter 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			}
		}
	}

	@media only screen and (max-width: 600px) {
		.breakwrapper {
			display: unset;

			.note {
				padding: 1em;

				&.smol {
					margin-bottom: 1em;
					width: unset;
				}
			}

			.space {
				width: 250px;
				height: 600px;

				&.left {
					display: none;
				}

				&.right {
					display: none;
				}

				&.bottom {
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
</style>
