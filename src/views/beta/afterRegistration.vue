<template>
	<div>
		<div id="thankYou" class="section section--features">
			<div id="beta-heading" class="section-heading section-heading__features">
				<h1 class="section-heading__title">
					<img :src="premidBeta" />
				</h1>
			</div>
			<div id="thankYou-container" class="card--feature card--feature--reverse">
				<div class="card--feature__details">
					<h1>{{ title }}</h1>
					<p>{{ message }}</p>
					<a href="/" class="button button--sm router-link-active"
						>Return to the homepage</a
					>
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
	</div>
</template>

<script>
	import premidBeta from "@/assets/images/premid-beta.png";

	export default {
		name: "AfterRegistration",
		auth: false,
		props: {
			title: String,
			message: String
		},
		data() {
			return {
				premidBeta
			};
		}
	};
</script>
