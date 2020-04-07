<template>
	<div style="100% !important;">
		<navigation noLinks="true" :countDownBtn="!adBlock" />
		<div id="Wrapper">
			<div id="BreakWrapper">
				<div id="space" class="left">
					<adsbygoogle ad-slot="3276628083" />
				</div>
				<div v-if="!adBlock" id="note">
					<h1>Thank you!</h1>
					<p>
						We use ads to support our team and maintain our servers to offer you
						the best user experience!
					</p>
				</div>
				<div v-else id="note">
					<img
						src="https://cdn.discordapp.com/attachments/473603737135349792/695397570272559235/634432333226836020.png"
					/>
					<p>Please disable your adblock.</p>
				</div>
				<div id="space" class="right">
					<adsbygoogle ad-slot="4398138065" />
				</div>
			</div>
			<div id="space" class="bottom">
				<adsbygoogle ad-slot="9757727213" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Navigation from "../components/Navigation.vue";
	import Vue from "vue";
	import Axios from "axios";

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
			let rads = 0;
			while (rads === 0) {
				rads = Math.floor(Math.random() * 10);
			}

			const checkA = Axios(`/ads/ads${rads}.js`);

			checkA
				.then(() => (this.adBlock = false))
				.catch(() => (this.adBlock = true));
		}
	});
</script>

<style lang="scss" scoped>
	#Wrapper {
		height: 100% !important;
	}

	#BreakWrapper {
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

			img {
				left: 50%;
				position: relative;
				transform: translateX(-50%);
			}

			h1,
			p {
				margin: 0;
				padding: 0;
				text-align: center;
			}

			h1 {
				color: #7289da;
				text-transform: uppercase;
			}
		}
	}

	#space {
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
