<template>
	<div>
		<div class="invisible" ref="mainDiv">
			<div class="promo-container">
				<div class="promo-container__heading" ref="promoHeading">
					<div class="heading__logo">
						<nuxt-img
							alt="Logo Wordmark"
							src="/images/logo-wordmark-blue.png"
							height="150px"
							width="450px"
						/>
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
						v-if="presence.profile.name !== ''"
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
													flag.replace('HOUSE_', '').slice(1, 10).toLowerCase()
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
										<nuxt-img
											v-if="presence.smallImage == false"
											v-tippy="{ content: `PreMiD v${extVersion}` }"
											class="game"
											style="-webkit-mask: none"
											alt="Small Image"
											:src="presence.serviceLogo"
										/>
										<nuxt-img
											v-if="presence.smallImage == 'search'"
											v-tippy="{ content: `PreMiD v${extVersion}` }"
											class="game"
											alt="Small Image"
											:src="presence.serviceLogo"
										/>
										<nuxt-img
											v-if="presence.smallImage == true"
											v-tippy="{ content: `PreMiD v${extVersion}` }"
											class="game"
											alt="Small Image"
											:src="presence.serviceLogo"
										/>
										<nuxt-img
											alt="Small Image"
											v-if="presence.smallImage == 'search'"
											v-tippy="{
												content: $t('home.examples.status.browsing')
											}"
											class="status-icon"
											src="/images/activity/actions/search.png"
										/>
										<nuxt-img
											alt="Small Image"
											v-if="presence.smallImage == true"
											v-tippy="{
												content: $t('home.examples.status.playing')
											}"
											class="status-icon"
											src="/images/activity/actions/play.png"
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
												presence.elapsed
													? $t(`home.examples.timestamp2`, {
															0: presence.presence_time
													  })
													: $t(`home.examples.timestamp`, {
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
						<nuxt-img
							alt="Feature Image"
							class="card--feature__promo--image1"
							style="max-width: 100%"
							src="/images/features/card1.png"
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
							<source src="/videos/card2_video.mp4" type="video/mp4" />
							<nuxt-img
								alt="Feature Image"
								class="card--feature__promo--image2"
								src="/images/features/card2.png"
							/>
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
						<nuxt-img
							alt="Feature Image"
							class="card--feature__promo--image1"
							src="/images/features/card3.png"
						/>
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
	</div>
</template>

<script>
	import {
		uniqueNamesGenerator,
		adjectives,
		colors,
		animals
	} from "unique-names-generator";

	import anime from "animejs";

	export default {
		name: "Home",
		auth: false,
		async fetch() {
			try {
				const res = await this.$graphql(
					`
					{
						versions {
							extension
						}
						credits(limit:2, random:true) {
							user {
								name
								tag
								avatar
								flags
							}
						}
					}`
				);

				this.extVersion = res.versions.extension;
				this.users = res.credits;
			} catch (err) {
				this.extVersion = "2.2.3";
				this.users = [generateTemplateUser(), generateTemplateUser()];
			}

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
					name: this.users[index].user.name,
					flags: this.users[index].user.flags || [],
					avatar: this.users[index].user.avatar
				};

				// Temporary solution
				presence.profile["avatar"].endsWith(".gif")
					? presence.profile["flags"].push("NITRO")
					: false;

				presence.seconds = Math.floor(Math.random() * presence.seconds) + 1;

				let minutes = Math.floor(presence.seconds / 60);
				let seconds = presence.seconds - minutes * 60;

				presence.presence_time =
					minutes.toString().padStart(2, "0") +
					":" +
					seconds.toString().padStart(2, "0");
			});
		},
		data() {
			return {
				controller: null,
				extVersion: null,
				users: [],
				presences_display: [],
				presences: [
					{
						service_title: "PreMiD",
						serviceLogo: "/images/logo.png",
						smallImage: "search",
						data: ["Store"],
						presence_time: "00:12",
						seconds: "500", //Suitable range for timer
						elapsed: true
					},
					{
						service_title: "YouTube",
						serviceLogo: "/images/activity/youtube.png",
						smallImage: true,
						data: [
							"Noisestorm - Crab Rave [Monstercat Release]",
							"Monstercat: Instinct"
						],
						seconds: "300", //Suitable range for timer
						presence_time: "01:36"
					},
					{
						service_title: "SoundCloud",
						serviceLogo: "/images/activity/soundcloud.png",
						smallImage: true,
						data: ["Dion Timmer - Panic", "Dion Timmer"],
						seconds: "300", //Suitable range for timer
						presence_time: "02:15"
					},
					{
						service_title: "Netflix",
						serviceLogo: "/images/activity/netflix.png",
						smallImage: true,
						data: ["Daredevil", "S1:E1 Into the Ring"],
						seconds: "1750", //Suitable range for timer
						presence_time: "22:15"
					},
					{
						service_title: "YouTube Music",
						serviceLogo: "/images/activity/youtube_music.png",
						smallImage: true,
						data: [
							"supercombo - Piloto Automático (Clipe Oficial)",
							"supercombo"
						],
						seconds: "200", //Suitable range for timer
						presence_time: "00:26"
					},
					{
						service_title: "Steam",
						serviceLogo: "/images/activity/steam.png",
						smallImage: false,
						data: ["Steam Store", "F1 2022"],
						presence_time: "03:32",
						seconds: "650", //Suitable range for timer
						elapsed: true
					},
					{
						service_title: "YouTube Music",
						serviceLogo: "/images/activity/youtube_music.png",
						smallImage: true,
						data: ["Dance Monkey", "Tones and I - The Kids Are Coming (2019)"],
						seconds: "210", //Suitable range for timer
						presence_time: "03:12"
					},
					{
						service_title: "Twitch",
						serviceLogo: "/images/activity/twitch.png",
						smallImage: true,
						data: ["PreMiD coding stream!", "alexbcberio"],
						seconds: "2750", //Suitable range for timer
						presence_time: "49:12",
						elapsed: true
					},
					{
						service_title: "V LIVE",
						serviceLogo: "/images/activity/vlive.png",
						smallImage: true,
						data: ["[LOONA] Orbit! Thank you ❤️", "이달의 소녀(LOONA)"],
						seconds: "600", //Suitable range for timer
						presence_time: "09:50"
					}
				]
			};
		},
		mounted() {
			this.appear();

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
					scene1 = new this.$scrollmagic.Scene({
						triggerElement: el,
						offset: 0,
						duration: 1000
					}).addTo(new this.$scrollmagic.Controller());

				/* 				this.$scrollmagic.addScene(scene1);
				 */
				scene1.on("start", event => {
					if (hasRun) return;
					heading.play();
					hasRun = true;
				});
			});
		},
		created() {
			let timeOfLastUpdate = Date.now(),
				timers = setInterval(() => {
					//Prevent adblockers from breaking the timer
					if (Date.now() - timeOfLastUpdate < 1000) return;

					timeOfLastUpdate = Date.now();
					let oneFinished = false;
					this.presences_display.forEach((el, i) => {
						if (el.presence_time === "00:00" || el.live) {
							if (oneFinished) {
								return clearInterval(timers);
							}
							return (oneFinished = true);
						}

						let minutes = el.presence_time.split(":")[0];
						let seconds = el.presence_time.split(":")[1];

						if (el.elapsed) {
							if (seconds === "59") {
								el.presence_time =
									(parseInt(minutes) + 1).toString().padStart(2, "0") + ":00";
							} else {
								el.presence_time =
									minutes +
									":" +
									(parseInt(seconds) + 1).toString().padStart(2, "0");
							}
						} else {
							if (el.presence_time === "00:00") {
								return;
							} else if (seconds === "00") {
								el.presence_time =
									(parseInt(minutes) - 1).toString().padStart(2, "0") + ":59";
							} else if (seconds.split("")[1] === "0") {
								el.presence_time =
									minutes + ":" + parseInt(seconds.split("")[0] - 1) + "9";
							} else {
								el.presence_time =
									minutes +
									":" +
									(parseInt(seconds) - 1).toString().padStart(2, "0");
							}
						}
					});
				}, 100);
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

	function generateTemplateUser() {
		const username = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
			separator: " ",
			length: 2,
			style: "capital"
		});

		return {
			user: {
				name: username,
				tag: Math.floor(1000 + Math.random() * 9000),
				avatar: encodeURI(
					`https://cdn.discordapp.com/embed/avatars/${getRandomInt(0, 5)}.png`
				),
				flags: null
			}
		};
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>
