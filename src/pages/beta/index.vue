<template>
	<div class="promo-container beta">
		<div class="promo-container__heading">
			<h1 class="heading__logo">
				<img :src="premidBeta" />
			</h1>
		</div>

		<div class="card--feature card--feature--reverse card--feature--beta">
			<div class="card--feature__details">
				<h1>{{ $t("beta.title") }}</h1>

				<p
					v-html="
						markdown($t('beta.description.1')) +
						'<br />' +
						$t('beta.description.2')
					"
				></p>

				<ul>
					<li>
						<p>{{ $t("beta.features.1") }}</p>
					</li>
					<li>
						<p>{{ $t("beta.features.2") }}</p>
					</li>
					<li>
						<p>{{ $t("beta.features.3") }}</p>
					</li>
				</ul>
			</div>
			<div class="card--feature__promo">
				<video autoplay loop>
					<source
						src="./../../assets/images/cards/card2_video.mp4"
						type="video/mp4"
					/>
					<img class="card--feature__promo--image2" :src="cardThumbnail2" />
				</video>
			</div>
		</div>
		<div class="beta-join">
			<p
				v-html="
					$t('beta.register.text').replace(
						'{0}',
						'<span class=\'text-highlight\'>' + betaUsers + '</span>'
					)
				"
			></p>
			<a class="button text--uppercase" href="/beta/register">
				{{ $t(`beta.register.button`) }}
			</a>
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
</template>

<script>
	import premidBeta from "@/assets/images/premid-beta.png";
	import cardThumbnail2 from "@/assets/images/cards/card2.png";

	import axios from "axios";

	export default {
		name: "Beta",
		auth: false,
		async asyncData() {
			return {
				betaUsers: (await axios(`${process.env.apiBase}/betaUsers`)).data
					.betaUsers
			};
		},
		data() {
			return {
				betaUsers: 0,
				premidBeta,
				cardThumbnail2
			};
		},
		methods: {
			markdown(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map((ch, i) => {
					return pls.replace(
						ch,
						`<strong><span class="text-highlight">${ch.slice(
							2,
							ch.length - 2
						)}</span></strong>`
					);
				})[0];
			}
		},
		head() {
			return {
				title: "Beta"
			};
		}
	};
</script>
