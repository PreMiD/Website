<template>
	<div>
		<transition appear v-on:after-appear="appear">
			<div class="invisible" ref="mainDiv">
				<div class="promo-container">
					<div class="promo-container__heading" ref="promoHeading">
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
					<div class="promo-container__presences" ref="promoPresences">
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
										presence.profile.avatar +
										'?size=128' +
										');'
									"
								></div>
								<div class="header__info">
									<div class="info__nameTag">
										<span class="username">{{ presence.profile.name }}</span>
										<span class="discriminator"
											>#{{ presence.profile.discriminator }}</span
										>
									</div>
									<div class="info__badges">
										<div
											v-for="flag of presence.profile.flags"
											:key="flag"
											class="badge-wrapper"
										>
											<div
												v-if="
													flag == 'HOUSE_BRILLIANCE' ||
													flag == 'HOUSE_BRAVERY' ||
													flag == 'HOUSE_BALANCE'
												"
												v-tippy="{
													content:
														'HypeSquad ' +
														flag.replace('HOUSE_', '')[0] +
														flag
															.replace('HOUSE_', '')
															.slice(1, 10)
															.toLowerCase()
												}"
												:class="`badge badge_${flag
													.replace('HOUSE_', '')
													.toLowerCase()}`"
											></div>
											<div
												v-if="flag == 'EARLY_SUPPORTER'"
												v-tippy="{ content: 'Early Supporter' }"
												:class="`badge badge_early`"
											></div>
											<div
												v-if="flag == 'HYPESQUAD_EVENTS'"
												v-tippy="{ content: 'HypeSquad Events' }"
												:class="`badge badge_hypesquad`"
											></div>
											<div
												v-if="flag == 'NITRO'"
												v-tippy="{ content: 'Discord Nitro' }"
												:class="`badge badge_nitro`"
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
												v-if="presence.smallImage == 'search'"
												v-tippy="{ content: `PreMiD v${extVersion}` }"
												class="game"
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
												v-if="presence.smallImage == 'search'"
												v-tippy="{
													content: $t('home.examples.status.browsing')
												}"
												class="status-icon"
												:src="require('@/assets/images/search.png')"
											/>
											<img
												v-if="presence.smallImage == true"
												v-tippy="{
													content: $t('home.examples.status.playing')
												}"
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
											<div
												v-if="presence.data[1]"
												class="game__nd-line text-row"
											>
												{{ presence.data[1] }}
											</div>
											<div class="game__time text-row">
												{{
													presence.smallImage != "search"
														? $t(`home.examples.timestamp`, {
																0: presence.presence_time
														  })
														: $t(`home.examples.timestamp2`, {
																0: presence.presence_time
														  })
												}}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="features" class="section section--features pattern">
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
								style="max-width: 100%;"
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
								<img
									class="card--feature__promo--image2"
									:src="cardThumbnail2"
								/>
							</video>
						</div>
					</div>
					<div class="card--feature">
						<div class="card--feature__details">
							<h1>{{ $t("home.features.quickSupport.heading") }}</h1>
							<p>{{ $t("home.features.quickSupport.description") }}</p>
							<p>
								<a class="button button--lg" href="https://discord.premid.app">
									{{ $t("home.features.quickSupport.button") }}
								</a>
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
		</transition>
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
							badges: []
						},
						service_title: "PreMiD",
						serviceLogo: premidLogo,
						smallImage: "search",
						data: ["Store"],
						presence_time: "00:12"
					},
					{
						profile: {
							badges: []
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
							badges: []
						},
						service_title: "SoundCloud",
						serviceLogo: soundcloudLogo,
						smallImage: true,
						data: ["Dion Timmer - Panic", "Dion Timmer"],
						presence_time: "2:15"
					},
					{
						profile: {
							badges: []
						},
						service_title: "Netflix",
						serviceLogo: netflixLogo,
						smallImage: true,
						data: ["Daredevil", "S1:E1 Into the Ring"],
						presence_time: "22:15"
					},
					{
						profile: {
							badges: []
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
							badges: []
						},
						service_title: "Steam",
						serviceLogo: steamLogo,
						smallImage: false,
						data: ["Steam Store", "F1 2019"],
						presence_time: "03:32"
					},
					{
						profile: {
							badges: []
						},
						service_title: "YouTube Music",
						serviceLogo: ytmusicLogo,
						smallImage: true,
						data: ["Dance Monkey", "Tones and I - The Kids Are Coming (2019)"],
						presence_time: "3:12"
					},
					{
						profile: {
							badges: []
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
			const length = this.presences.length;

			// Randomly selects 2 presences to display.
			this.presences_display.push(
				this.presences.splice((Math.random() * length) | 0, 1)[0],
				this.presences.splice((Math.random() * (length - 1)) | 0, 1)[0]
			);

			// Updating user information in presence examples.
			this.presences_display.forEach((presence_item, index) => {
				let presence = this.presences_display[index];

				presence.profile = {
					name: this.users[index]?.name || "Unknown",
					discriminator: this.users[index]?.tag || "0000",
					flags: this.users[index]?.flags || [],
					avatar:
						this.users[index]?.avatar ||
						"https://premid.app/assets/images/logo.png"
				};

				// Temporary solution
				presence.profile["avatar"].endsWith(".gif")
					? presence.profile["flags"].push("NITRO")
					: false;
			});
		},
		mounted() {
			[
				document.querySelector("#featuresHeading"),
				...document.querySelectorAll(".card--feature")
			].forEach((el, i) => {
				let hasRun = false;
				const heading = anime({
						targets: el,
						opacity: [0, 1],
						translateX: [i % 2 ? 100 : -100, 0],
						duration: 1500,
						autoplay: false
					}),
					scene1 = this.$scrollmagic.scene({
						triggerElement: el,
						offset: 0,
						duration: 1000
					});

				this.$scrollmagic.addScene(scene1);

				scene1.on("start", event => {
					if (hasRun) return;
					heading.play();
					hasRun = true;
				});
			});
		},
		methods: {
			appear() {
				this.$anime
					.timeline({
						duration: 1000,
						easing: "easeOutExpo",
						opacity: [0, 1],
						begin: () => this.$refs.mainDiv.classList.remove("invisible")
					})
					.add(
						{
							targets: this.$refs.promoHeading,
							translateX: ["-100%", 0]
						},
						0
					)
					.add(
						{
							targets: ".promo-container__heading *",
							delay: this.$anime.stagger(50),
							scale: [0, 1],
							opacity: [0, 1]
						},
						0
					)
					.add(
						{
							targets: ".discord-usercard",
							translateX: ["100%", 0],
							delay: this.$anime.stagger(50),
							opacity: [0, 1]
						},
						0
					)
					.add(
						{
							duration: 500,
							targets: ".discord-usercard *",
							delay: this.$anime.stagger(50),
							scale: [0, 1],
							opacity: [0, 1]
						},
						0
					);
			},
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
		head: {
			title: "Home"
		}
	};
</script>
