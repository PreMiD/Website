<template>
	<div style="100% !important;">
		<navigation />
		<div id="adWrapper">
			<div id="adBreakWrapper">
				<div id="ad" class="left">
					<adsbygoogle ad-slot="1070101295" />
				</div>
				<div v-if="!adBlock" id="note">
					<h1 v-text="$store.state.download.type" />
					<a
						id="button"
						:target="
							$store.state.download.platform === 'chrome' ? '_blank' : null
						"
						:href="
							$store.state.download.platform === 'windows'
								? 'https://dl.premid.app/PreMiD-installer.exe'
								: $store.state.download.platform === 'chrome'
								? 'https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi'
								: $store.state.download.platform === 'firefox'
								? 'https://dl.premid.app/PreMiD.xpi'
								: 'https://dl.premid.app/PreMiD-installer.app.zip'
						"
						@click="$nuxt.setLayout('default')"
					>
						<i :class="`fab fa-${$store.state.download.platform}`"></i>
						<p>Download</p>
					</a>
				</div>
				<div v-else id="note">
					<img
						src="https://cdn.discordapp.com/attachments/473603737135349792/695397570272559235/634432333226836020.png"
					/>
					<p>Please disable your adblock.</p>
				</div>
				<div id="ad" class="right">
					<adsbygoogle ad-slot="7443937958" />
				</div>
			</div>
			<div id="ad" class="bottom">
				<adsbygoogle ad-slot="8565447939" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Navigation from "../components/Navigation.vue";
	import Vue from "vue";

	export default Vue.extend({
		components: {
			Navigation
		},
		head: {
			title: "Downloads"
		},
		data() {
			return {
				adBlock: true
			};
		},
		mounted() {
			const self = this;

			//@ts-ignore
			fuckAdBlock = new FuckAdBlock({
				checkOnLoad: true
			});
			//@ts-ignore
			fuckAdBlock.check();
			//@ts-ignore
			fuckAdBlock.onNotDetected(function () {
				self.adBlock = false;
			});
			//@ts-ignore
			fuckAdBlock.onDetected(function () {
				self.adBlock = true;
			});
		}
	});
</script>

<style lang="scss" scoped>
	#adWrapper {
		height: 100% !important;
	}

	#adBreakWrapper {
		display: grid;
		justify-content: space-between;
		align-items: center;
		grid-template-columns: min-content auto min-content;
		height: 100vh;
		width: 100%;

		#note {
			background-color: #191b24;
			font-size: 25px;
			max-width: 350px;
			padding: 15px;
			border-radius: 10px;

			h1 {
				margin: 0;
				padding: 0;
				text-align: center;
				color: #7289da;
				text-transform: uppercase;
				margin-bottom: 15px;
			}

			img {
				left: 50%;
				position: relative;
				transform: translateX(-50%);
			}

			#button {
				background-color: #7289da;
				padding: 15px;
				border-radius: 15px;
				margin-top: 15px;
				position: relative;
				transform: translateX(-50%);
				margin-left: 50%;
				display: inline-block;
				text-align: center;
				min-width: 155px;

				p {
					margin: 0;
					display: inline-block;
					color: white;
				}

				i,
				a {
					color: #fff !important;
				}
			}
		}
	}

	#ad {
		width: 250px;
		height: 600px;

		&.left {
			margin-left: 50px;
		}

		&.right {
			margin-right: 50px;
		}

		&.bottom {
			text-align: center;
			display: table;
			margin: 0 auto;
			width: 100%;
			height: 250px;
		}
	}
</style>
