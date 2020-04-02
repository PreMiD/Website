<template>
	<div style="100% !important;">
		<navigation noLinks="true" countDownBtn="true" />
		<div id="adWrapper">
			<div id="adBreakWrapper">
				<div id="ad" class="left">
					<adsbygoogle ad-slot="3276628083" />
				</div>
				<div id="note">
					<h1>Thank you!</h1>
					<p>
						We use ads to support our team and maintain our servers to offer you
						the best user experience!
					</p>
				</div>
				<div id="ad" class="right">
					<adsbygoogle ad-slot="4398138065" />
				</div>
			</div>
			<div id="ad" class="bottom">
				<adsbygoogle ad-slot="9757727213" />
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
