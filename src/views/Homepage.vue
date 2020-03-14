<template>
	<div>
		<div class="promo-container">
			<div class="promo-container__heading">
				<div class="heading__logo">
					<img src="@/assets/images/logo_round.svg" />
				</div>
				<div class="heading__text">
					<p v-html="markdown($t('home.introduction.paragraph'))"></p>
				</div>
				<div class="heading__button-group">
					<a class="button text--uppercase" href="#features">
						<i class="fa-stream fas"></i>
						{{ $t("home.introduction.button.features") }}
					</a>
					<nuxt-link
						class="button button--black text--uppercase"
						to="/downloads"
					>
						<i class="fa-file-export fas"></i>
						{{ $t(`home.introduction.button.downloads`) }}
					</nuxt-link>
				</div>
			</div>
			<div class="promo-container__presences">
				<div
					v-for="presence of presences_display"
					:key="presence.service"
					class="discord-usercard"
					:v-if="presence.profile.name !== ''"
				>
					<div class="usercard__header">
						<div
							class="header__avatar"
							:style="
								'background-image: url(' +
									presence.profile.image +
									'?size=128' +
									');'
							"
						></div>
						<div class="header__info">
							<div class="info__nameTag">
								<span class="username">{{ presence.profile.name }}</span>
								<span class="discriminator">#{{ presence.profile.id }}</span>
							</div>
							<div class="info__badges">
								<div
									v-for="badge of presence.profile.badges"
									:key="badge"
									class="badge-wrapper"
								>
									<div
										v-if="
											badge == 'brilliance' ||
												badge == 'bravery' ||
												badge == 'balance'
										"
										v-tippy="{
											content:
												'HypeSquad ' +
												badge.charAt(0).toUpperCase() +
												badge.slice(1)
										}"
										:class="`badge badge_${badge}`"
									></div>
									<div
										v-if="badge == 'early'"
										v-tippy="{ content: 'Early Supporter' }"
										:class="`badge badge_${badge}`"
									></div>
									<div
										v-if="badge == 'hypesquad'"
										v-tippy="{ content: 'HypeSquad Events' }"
										:class="`badge badge_${badge}`"
									></div>
									<div
										v-if="badge == 'nitro'"
										v-tippy="{ content: 'Discord Nitro' }"
										:class="`badge badge_${badge}`"
									></div>
									<div
										v-if="badge == 'boost-lvl3'"
										v-tippy="{ content: 'Nitro Boosting' }"
										:class="`badge badge_${badge}`"
									></div>
								</div>
							</div>
						</div>
					</div>
					<div class="usercard__activity">
						<div class="activity__info">
							<div class="info__header">
								{{ $t(`home.examples.playingagame`) }}
							</div>
							<div class="info__game">
								<div class="game__icon">
									<img
										v-if="presence.smallImage == false"
										v-tippy="{ content: `PreMiD v${extVersion}` }"
										class="game"
										style="-webkit-mask: none;"
										alt="@/assets/images/logo-big.svg"
										:src="presence.serviceLogo"
									/>
									<img
										v-if="presence.smallImage == true"
										v-tippy="{ content: `PreMiD v${extVersion}` }"
										class="game"
										alt="@/assets/images/logo-big.svg"
										:src="presence.serviceLogo"
									/>
									<img
										v-if="presence.smallImage == true"
										v-tippy="{ content: $t('home.examples.playback.playing') }"
										class="status-icon"
										src="https://cdn.discordapp.com/app-assets/501021996336021504/501023626984816650.png"
									/>
								</div>
								<div class="game__content">
									<div class="game__title text-row">
										<span>{{ presence.service_title }}</span>
									</div>
									<div class="game__st-line text-row">
										{{ presence.data[0] }}
									</div>
									<div v-if="presence.data[1]" class="game__nd-line text-row">
										{{ presence.data[1] }}
									</div>
									<div class="game__time text-row">
										{{
											presence.smallImage == true
												? $t(`home.examples.timestamp`, [
														presence.presence_time
												  ])
												: $t(`home.examples.timestamp2`, [
														presence.presence_time
												  ])
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="features" class="section section--features">
			<div class="waves-divider waves-divider_top">
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
			<div class="section__heading section__heading--center">
				<h1 id="featuresHeading">{{ $t("home.features.heading") }}</h1>
			</div>
			<div class="card--feature">
				<div class="card--feature__details">
					<h1
						v-html="markdown($t('home.features.presencesystem.heading'))"
					></h1>
					<p>{{ $t("home.features.presencesystem.description") }}</p>
					<p>
						<nuxt-link
							class="button button--lg"
							to="/store"
							v-text="$t('home.features.presencesystem.button')"
						/>
					</p>
				</div>
				<div class="card--feature__promo">
					<img
						class="card--feature__promo--image1"
						style="max-width:100%"
						:src="cardThumbnail1"
					/>
				</div>
			</div>
			<div class="card--feature card--feature--reverse">
				<div class="card--feature__details">
					<h1>{{ $t("home.features.simpleInterface.heading") }}</h1>
					<p>{{ $t("home.features.simpleInterface.description") }}</p>
					<ul>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.1") }}</p>
						</li>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.2") }}</p>
						</li>
						<li>
							<p>{{ $t("home.features.simpleInterface.description.3") }}</p>
						</li>
					</ul>
				</div>
				<div class="card--feature__promo">
					<video autoplay loop>
						<source
							src="./../assets/images/cards/card2_video.mp4"
							type="video/mp4"
						/>
						<img class="card--feature__promo--image2" :src="cardThumbnail2" />
					</video>
				</div>
			</div>
			<div class="card--feature">
				<div class="card--feature__details">
					<h1>{{ $t("home.features.quickSupport.heading") }}</h1>
					<p>{{ $t("home.features.quickSupport.description") }}</p>
					<p>
						<a class="button button--lg" href="https://discord.premid.app">{{
							$t("home.features.quickSupport.button")
						}}</a>
					</p>
				</div>
				<div class="card--feature__promo">
					<img class="card--feature__promo--image1" :src="cardThumbnail4" />
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
	import twitchLogo from "@/assets/images/twitch.png";
	import youtubeLogo from "@/assets/images/youtube.png";
	import soundcloudLogo from "@/assets/images/soundcloud.png";
	import netflixLogo from "@/assets/images/netflix.png";
	import ytmusicLogo from "@/assets/images/youtube-music.png";
	import premidLogo from "@/assets/images/pmd_logo.png";
	import steamLogo from "@/assets/images/steam.png";

	import cardThumbnail1 from "@/assets/images/cards/card1.png";
	import cardThumbnail2 from "@/assets/images/cards/card2.png";
	import cardThumbnail3 from "@/assets/images/cards/card3.png";
	import cardThumbnail4 from "@/assets/images/cards/card4.png";

	import axios from "axios";
	import anime from "animejs";

	export default {
		name: "Home",
		auth: false,
		async asyncData() {
			const credits = (await axios(`${process.env.apiBase}/credits`)).data,
				{ extension } = (await axios(`${process.env.apiBase}/versions`)).data;

			let creditsLength = credits.length;

			return {
				extVersion: extension,
				users: [
					credits[Math.floor(0 + Math.random() * (creditsLength + 1 - 0))],
					credits[Math.floor(0 + Math.random() * (creditsLength + 1 - 0))]
				]
			};
		},
		data() {
			return {
				extVersion: null,
				cardThumbnail1,
				cardThumbnail2,
				cardThumbnail3,
				cardThumbnail4,
				presences_display: [],
				presences: [
					{
						profile: {
							DiscordID: "259407123782434816",
							badges: ["hypesquad", "balance", "early", "nitro"]
						},
						service_title: "PreMiD",
						serviceLogo: premidLogo,
						smallImage: false,
						data: ["Viewing a Page", "Store"],
						presence_time: "00:12"
					},
					{
						profile: {
							DiscordID: "223238938716798978",
							badges: ["brilliance", "nitro"]
						},
						service_title: "YouTube",
						serviceLogo: youtubeLogo,
						smallImage: true,
						data: [
							"Noisestorm - Crab Rave [Monstercat Release]",
							"Monstercat: Instinct"
						],
						presence_time: "1:36"
					},
					{
						profile: {
							DiscordID: "213305189657083905",
							badges: ["bravery", "early"]
						},
						service_title: "SoundCloud",
						serviceLogo: soundcloudLogo,
						smallImage: true,
						data: ["Dion Timmer - Panic", "Dion Timmer"],
						presence_time: "2:15"
					},
					{
						profile: {
							DiscordID: "162969778699501569",
							badges: ["balance", "early"]
						},
						service_title: "Netflix",
						serviceLogo: netflixLogo,
						smallImage: true,
						data: ["Daredevil", "S1:E1 Into the Ring"],
						presence_time: "22:15"
					},
					{
						profile: {
							DiscordID: "515668127829458945",
							badges: ["balance"]
						},
						service_title: "YouTube Music",
						serviceLogo: ytmusicLogo,
						smallImage: true,
						data: [
							"supercombo - Piloto Automático (Clipe Oficial)",
							"supercombo"
						],
						presence_time: "00:26"
					},
					{
						profile: {
							DiscordID: "293828021134295040",
							badges: ["brilliance"]
						},
						service_title: "Steam",
						serviceLogo: steamLogo,
						smallImage: false,
						data: ["Steam Store", "F1 2019"],
						presence_time: "03:32"
					},
					{
						profile: {
							DiscordID: "163319338403627008",
							badges: ["brilliance", "early", "nitro", "boost-lvl3"]
						},
						service_title: "YouTube Music",
						serviceLogo: ytmusicLogo,
						smallImage: true,
						data: ["Dance Monkey", "Tones and I - The Kids Are Coming (2019)"],
						presence_time: "3:12"
					},
					{
						profile: {
							DiscordID: "241278257335500811",
							badges: ["balance", "early", "nitro"]
						},
						service_title: "Twitch",
						serviceLogo: twitchLogo,
						smallImage: true,
						data: ["Just Chattin", "Bas950"],
						presence_time: "49:12"
					}
				]
			};
		},
		beforeMount() {
			const Vue = this;
			const length = this.$data.presences.length;

			// Randomly selects 2 presences to display.
			this.$data.presences_display.push(
				this.$data.presences.splice((Math.random() * length) | 0, 1)[0],
				this.$data.presences.splice((Math.random() * (length - 1)) | 0, 1)[0]
			);

			// Updating user information in presence examples.
			this.$data.presences_display.forEach(function(presence_item, index) {
				let presence = Vue.$data.presences_display[index];

				presence.profile["image"] =
					Vue.$data.users[index]?.avatar ||
					"https://premid.app/assets/images/logo.png";
				presence.profile["name"] = Vue.$data.users[index]?.name || "Unknown";
				presence.profile["id"] = Vue.$data.users[index]?.tag || "0000";
			});
		},
		mounted() {
			[
				document.querySelector("#featuresHeading"),
				...document.querySelectorAll(".card--feature")
			].forEach((el, i) => {
				const featuresHeading = anime({
					targets: el,
					opacity: [0, 1],
					translateX: [i % 2 ? 100 : -100, 0],
					duration: 800,
					autoplay: false
				});

				const scene1 = this.$scrollmagic.scene({
					triggerElement: el,
					offset: 0,
					duration: 250
				});

				this.$scrollmagic.addScene(scene1);

				scene1.on("progress", event =>
					featuresHeading.seek(event.progress * 100)
				);
			});
		},
		methods: {
			openInNewTab(url) {
				let page = window.open(url, "_blank");
				page.focus();
			},
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
				title: "Home"
			};
		}
	};
</script>
