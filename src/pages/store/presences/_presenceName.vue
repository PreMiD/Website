<template>
	<div v-if="!presence.error">
		<transition name="fade" mode="in-out">
			<div class="fullpresence-container">
				<div class="fullpresence__header">
					<div class="header__title">
						<div class="section">
							<h1 class="presence-name">
								{{ presence.metadata.service }}
							</h1>

							<span
								v-if="partner"
								class="fa-stack"
								v-tippy="{
									content: $t('store.cards.partner')
								}"
								@click="$router.push('/partners')"
							>
								<i
									style="color: white; font-size: 24px; vertical-align: sub;"
									class="fa-gem fa-inverse fas"
								></i>
							</span>
							<span
								v-if="hot"
								class="fa-stack"
								v-tippy="{
									content: $t('store.cards.popular')
								}"
							>
								<i class="fa-circle fa-stack-2x fas"></i>
								<i
									:style="`color: ${presence.metadata.color};`"
									class="fa-fire-alt fa-inverse fa-stack-1x fas"
								></i>
							</span>
						</div>

						<div class="fullpresence__overlay">
							<div
								class="fullpresence__gradient"
								:style="`background: linear-gradient(155deg, ${presence.metadata.color}, transparent, ${presenceGradientColor}), url(${presence.metadata.thumbnail}) no-repeat center`"
							></div>
						</div>
					</div>
					<div class="header__buttons">
						<button
							v-if="
								!isInstalled &&
								this.$store.state.extension.extensionInstalled &&
								presence.metadata.button !== false
							"
							class="button button--"
							@click="sendPresence(presence.metadata.service)"
						>
							<span class="icon">
								<i class="fa-plus fas"></i>
							</span>
							{{ $t("store.card.presence.add") }}
						</button>
						<button
							v-if="
								isInstalled &&
								this.$store.state.extension.extensionInstalled &&
								presence.metadata.button !== false
							"
							class="button button--black"
							@click="removePresence(presence.metadata.service)"
						>
							<span class="icon">
								<i class="fa-minus fas"></i>
							</span>
							{{ $t("store.card.presence.remove") }}
						</button>
						<a
							class="button button--black"
							:href="githubPresenceUrl($route.params.presenceName)"
							target="_blank"
						>
							<span class="icon">
								<i class="fa-github fab"></i>
							</span>
							{{ !isMobile ? $t("presence.page.buttons.sourceCode") : "" }}
						</a>
						<a
							class="button button--lg button--red button--like"
							@click="like()"
							><i
								:class="
									$store.state.presences.likedPresences.includes(
										presence.metadata.service
									)
										? 'fas' + ' fa-heart'
										: 'far' + ' fa-heart'
								"
						/></a>
					</div>
					<hr />
					<div
						v-if="presence.metadata.button === false"
						class="header__warning"
					>
						{{ $t("store.card.presence.included") }}
					</div>
				</div>
				<div class="fullpresence__content">
					<div class="content__description">
						<h2 class="content__title">
							{{ $t("presence.sections.description.title") }}
						</h2>
						<div
							class="description-container"
							v-html="linkify(getPresenceDescription())"
						></div>
					</div>
					<div class="content__info">
						<h2 class="content__title">
							{{ $t("presence.sections.information.title") }}
						</h2>
						<ul class="info__sections">
							<li v-if="presence.metadata.author">
								<p>
									<i class="fa-user fas"></i>
									{{ $t("presence.sections.information.author") }}:
									<nuxt-link
										v-if="presence.metadata.author.userId"
										class="author-name"
										:style="`color: ${presence.metadata.author.roleColor};`"
										:to="`/users/${presence.metadata.author.userId}`"
										:disabled="true"
									>
										<img
											v-if="presence.metadata.author.avatar"
											:src="presence.metadata.author.avatar"
											class="author-avatar"
										/>
										{{ presence.metadata.author.name }}
									</nuxt-link>
									<b v-else>{{ presence.metadata.author.name }}</b>
								</p>
							</li>
							<li
								v-if="
									presence.metadata.contributors &&
									typeof presence.metadata.contributors === 'object'
								"
							>
								<p>
									<i class="fa-user-tie fas"></i>
									{{ $t("presence.sections.information.contributors") }}:
									<nuxt-link
										v-for="(contributor, index) in presence.metadata.contributors"
										:key="contributor.id"
										class="author-name"
										:to="`/users/${contributor.id}`"
									>
										{{
											contributor.name +
											`${
												presence.metadata.contributors.length === index + 1
													? ""
													: ", "
											}`
										}}
									</nuxt-link>
								</p>
							</li>
							<li v-if="presence.metadata.version">
								<p>
									<i style="margin-right: 2px;" class="fa-code-branch fas"></i>
									{{ $t("presence.sections.information.version") }}:
									<span class="presence-version">
										<b>{{ presence.metadata.version }}</b>
									</span>
								</p>
							</li>
							<li v-if="presenceUsage && presenceUsage > 0">
								<p>
									<i
										class="fa-cart-arrow-down fas"
										style="margin-left: -4px;"
									></i>
									{{ $t("presence.sections.information.users") }}:
									<span class="presence-version">
										<b>{{ presenceUsage }}</b>
									</span>
								</p>
							</li>
							<li v-if="presence.metadata.tags">
								<p>
									<i class="fa-hashtag fas"></i>
									{{ $t("presence.sections.information.tags") }}:
								</p>
								<div class="presence-tags">
									<nuxt-link
										v-for="tag of presence.metadata.tags"
										:key="tag"
										:to="`/store?q=${encodeURIComponent('tag:') + tag}`"
										:style="`background: ${presence.metadata.color}; color: ${presenceTextColor};`"
										class="label label_tag"
										>{{ tag }}</nuxt-link
									>
								</div>
							</li>
							<!-- <li>
                <p><i class="fas fa-heart" /> Likes: <span :style="`background: ${presenceData.color};`"
                        class="label label_tag">36</span></p>
              </li>-->
							<li>
								<p>
									<i class="fa-link fas"></i>
									{{ $t("presence.sections.information.supportedurls") }}:
								</p>
								<ul
									v-if="Array.isArray(presence.metadata.url)"
									class="presence-urls"
								>
									<li v-for="url in presence.metadata.url" :key="url">
										<a :href="`https://${url}`">{{ url }}</a>
									</li>
								</ul>
								<ul v-else-if="presence.metadata.url" class="presence-urls">
									<li>
										<a :href="`https://${presence.metadata.url}`">
											{{ presence.metadata.url }}
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import PresenceMixin from "~/components/mixins/Presence";
	import tinycolor from "tinycolor2";
	import axios from "axios";

	export default {
		name: "PresencePage",
		mixins: [PresenceMixin],
		auth: false,
		async asyncData({ params }) {
			let presenceUsage = (await axios(`${process.env.apiBase}/usage`)).data
					.users,
				presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
					.data,
				partnersList = (await axios(`${process.env.apiBase}/partners`)).data;

			let presenceData = await new Promise((resolve, reject) => {
				axios(
					`${process.env.apiBase}/presences/${encodeURIComponent(
						params.presenceName
					)}`
				)
					.then(res => {
						resolve(res.data);
					})
					.catch(err => {
						console.log(err);
						reject({
							error: true,
							code: 401
						});
					});
			});

			let data = {
				presenceUsage: presenceRanking[decodeURIComponent(params.presenceName)],
				partner:
					partnersList.filter(
						p => p.storeName == decodeURIComponent(params.presenceName)
					).length > 0,
				hot:
					(presenceRanking[decodeURIComponent(params.presenceName)] /
						presenceUsage) *
						100 >
					30,
				presence: presenceData
			};

			if (!presenceData.error) {
				let authorData = await new Promise((resolve, reject) => {
					axios(
						`${process.env.apiBase}/credits/${data.presence.metadata.author.id}`
					)
						.then(res => {
							if (res.data.error && res.data.message !== "User not found.")
								reject({ error: true, message: res.data.message });
							resolve(res.data);
						})
						.catch(err => {
							console.log(err);
							reject({
								error: true,
								code: 401
							});
						});
				});

				if (!authorData.error) {
					data.presence.metadata.author = authorData;
				}
			}

			data["isMobile"] = false;

			return data;
		},
		computed: {
			presenceTextColor() {
				var presenceColor = tinycolor(this.$data.presence.metadata.color);
				if (presenceColor.getLuminance() > 0.6) {
					return "#202225";
				} else {
					return "#fff";
				}
			},
			presenceGradientColor() {
				return tinycolor(this.$data.presence.metadata.color)
					.darken(45)
					.toHexString();
			}
		},
		mounted() {
			this.$data.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

			if (this.$data.presence.error)
				return this.$nuxt.error({ statusCode: this.$data.presence.error });
		},
		created() {
			if (!this.$data.presence.error) {
				this.isPresenceInstalled(this.$data.presence.metadata.service).then(
					response => {
						if (response) this.$data.isInstalled = true;
					}
				);
			}
		},
		updated() {
			this.isPresenceInstalled(this.$data.presence.metadata.service).then(
				response => {
					if (response) this.$data.isInstalled = true;
				}
			);
		},
		methods: {
			/**
			 * Returns description of the presence according to your language.
			 * If presence has non-multilingual description then we just parsing the "description" data.
			 */
			getPresenceDescription() {
				if (this.$data.presence.error) return;

				if (
					this.$data.presence.metadata.description[
						this.$root.getCurrentLanguage()
					]
				) {
					return this.$data.presence.metadata.description[
						this.$root.getCurrentLanguage()
					];
				} else if (this.$data.presence.metadata.description["en"]) {
					return this.$data.presence.metadata.description["en"];
				} else {
					return this.$data.presence.metadata.description;
				}
			},
			like() {
				const likedPresences = localStorage.getItem("likedPresences");
				if (!likedPresences)
					localStorage.setItem(
						"likedPresences",
						this.$data?.presence?.metadata?.service
					);
				else if (
					likedPresences
						.split(",")
						.includes(this.$data?.presence?.metadata?.service)
				) {
					localStorage.setItem(
						"likedPresences",
						likedPresences
							.split(",")
							.filter(i => i !== this.$data?.presence?.metadata?.service)
							.join(",")
					);
				} else if (
					!likedPresences
						.split(",")
						.includes(this.$data?.presence?.metadata?.service)
				) {
					let newPresences = likedPresences.split(",");

					newPresences.push(this.$data?.presence?.metadata?.service);

					localStorage.setItem("likedPresences", newPresences.join(","));
				}

				this.$store.commit(
					"presences/like",
					this.$data?.presence?.metadata?.service
				);
			},
			linkify(description) {
				if (!description) return;
				else if (
					!description.match(/\[([^\]]+)\]\(([^)]+)\)/g) ||
					!/\[([^\]]+)\]\(([^)]+)\)/g.exec(description)
				)
					return description;
				else {
					const match = description.match(/\[([^\]]+)\]\(([^)]+)\)/g),
						exec = /\[([^\]]+)\]\(([^)]+)\)/g.exec(description);

					return description.replace(
						match,
						`<a target="_blank" href="${exec[2]}">${exec[1]}</a>`
					);
				}
			},
			githubPresenceUrl(presenceName) {
				// first char with no diacritics
				let firstChar = presenceName.charAt(0).normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toLowerCase();
				let type;

				if (!isNaN(firstChar)) {
					type = "0-9"
				} else if ("a" <= firstChar && firstChar <= "z") {
					type = firstChar.toUpperCase();
				} else {
					type = "#";
				}

				return `https://github.com/PreMiD/Presences/tree/master/websites/${type}/${encodeURIComponent(presenceName)}`;
			}
		},

		head() {
			if (this.$data?.presence?.error) return;
			let description =
				this.$data?.presence?.metadata?.description["en"] ||
				this.$data?.presence?.metadata?.description ||
				"No description found.";

			if (description.match(/\[([^\]]+)\]\(([^)]+)\)/g)) {
				description = description.replace(
					description.match(/\[([^\]]+)\]\(([^)]+)\)/g),
					/\[([^\]]+)\]\(([^)]+)\)/g.exec(description)[1]
				);
			}

			if (description.length >= 256)
				description = description.slice(0, 256) + "...";

			return {
				title: this.$data?.presence?.metadata?.service,
				meta: [
					{
						hid: "twitter:card",
						property: "twitter:card",
						content: "summary"
					},
					{
						hid: "twitter:url",
						property: "twitter:url",
						content: "https://premid.app" + encodeURIComponent(this.$route.path)
					},
					{
						hid: "twitter:description",
						property: "twitter:description",
						content: description
					},
					{
						hid: "twitter:image",
						property: "twitter:image",
						content: this.$data?.presence?.metadata?.logo
					},
					{
						hid: "theme-color",
						property: "theme-color",
						content: this.$data?.presence?.metadata?.color || "#000000"
					},
					{
						hid: "title",
						name: "title",
						content:
							this.$data?.presence?.metadata?.service || "Invalid Service"
					},
					{
						hid: "description",
						name: "description",
						content: description
					},
					{
						hid: "og:title",
						property: "og:title",
						content:
							this.$data?.presence?.metadata?.service ||
							"The service you're looking for wasn't found in any of our records. You might want to try to check if it's still available on the store."
					},
					{
						hid: "og:description",
						property: "og:description",
						content: description
					},
					{
						hid: "og:image",
						property: "og:image",
						content:
							this.$data?.presence?.metadata?.logo ||
							"https://premid.app/assets/images/logo.png"
					}
				]
			};
		}
	};
</script>
