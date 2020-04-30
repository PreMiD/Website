<template>
	<div>
		<navigation
			noLinks="true"
			:target="target"
			:href="href"
			:countDownBtn="!adblock"
		/>

		<div class="breakwrapper">
			<div class="space left">
				<adsbygoogle ad-slot="3276628083" />
			</div>

			<div v-if="!adblock" class="note">
				<h1 class="title">{{ $t("downloads.adsbox.thankyou.title") }}</h1>
				<p class="description">
					{{ $t("downloads.adsbox.thankyou.message") }}
				</p>
			</div>

			<div v-else-if="!isMobile" class="note smol">
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

			<div v-if="isMobile" class="mobile">
				<button class="button skip">Skip</button>
			</div>

			<div class="space right">
				<adsbygoogle ad-slot="4398138065" />
			</div>
		</div>

		<div class="space bottom">
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

			this.target = platform === "chrome" ? "_blank" : null;
			this.href = this.urls[platform];
		},
		mounted() {
			this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator?.userAgent
			);
			
			// Users not seing the skip button
			window.scrollTo(0, 0);
			let rads = 0;

			while (rads === 0) {
				rads = Math.floor(Math.random() * 10);
			}

			axios(`/ads/ads${rads}.js`)
				.then(() => (this.adblock = false))
				.catch(() => (this.adblock = true));
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
			background-color: #191b24;
			font-size: 25px;
			max-width: 350px;
			padding: 15px;
			border-radius: 10px;

			&.smol {
				max-width: 225px;
				padding: 1em;
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
					margin-left: 0.5em;
					font-size: large;
				}
			}

			.controls {
				text-align: center;

				.button {
					margin-top: 1em;
					padding: 0.5em 1em;
					font-size: large;
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
	}

	@media only screen and (max-width: 600px) {
		.breakwrapper {
			display: unset;

			.note {
				padding: 1em;

				&.smol {
					max-width: 100%;
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
