<template>
	<div v-if="presence">
		<transition name="fade" mode="in-out">
			<div class="fullpresence-container">
				<div class="fullpresence__header">
					<div class="header__title">
						<div class="section">
							<img
								v-if="!isMobile"
								@error="
									getPresenceMetadata.logo =
										'https://premid.app/assets/images/logo.png'
								"
								:src="getPresenceMetadata.logo"
							/>

							<h1
								:style="`color: ${brightColorFix()}`"
								v-text="getPresenceMetadata.service"
							/>

							<span
								v-if="partner"
								class="fa-stack presence-badge"
								v-tippy="{
									content: $t('store.cards.partner')
								}"
								@click="$router.push('/partners')"
							>
								<i
									style="color: white; font-size: 24px; vertical-align: sub"
									class="fa-gem fa-inverse fas"
								></i>
							</span>
							<span
								v-if="hot"
								class="fa-stack presence-badge"
								v-tippy="{
									content: $t('store.cards.popular')
								}"
							>
								<i class="fa-circle fa-stack-2x fas"></i>
								<i
									:style="`color: ${getPresenceMetadata.color};`"
									class="fa-fire-alt fa-inverse fa-stack-1x fas"
								></i>
							</span>
						</div>

						<div class="fullpresence__overlay">
							<div
								class="fullpresence__gradient"
								:style="`background: linear-gradient(155deg, ${getPresenceMetadata.color}, transparent, ${getPresenceGradientColor}), url(${getPresenceMetadata.thumbnail}) no-repeat center`"
							></div>
						</div>
					</div>
					<div class="header__buttons">
						<button
							v-if="
								!isInstalled &&
								this.$store.state.extension.extensionInstalled &&
								getPresenceMetadata.button !== false &&
								getPresenceMetadata.button !== 'false'
							"
							class="button button--"
							@click="sendPresence(getPresenceMetadata.service)"
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
								getPresenceMetadata.button !== false &&
								getPresenceMetadata.button !== 'false'
							"
							class="button button--black"
							@click="removePresence(getPresenceMetadata.service)"
						>
							<span class="icon">
								<i class="fa-minus fas"></i>
							</span>
							{{ $t("store.card.presence.remove") }}
						</button>
						<a
							class="button button--black"
							:href="getGithubLink"
							rel="noreferrer"
							target="_blank"
						>
							<i class="fa-github fab" />
						</a>
						<a
							class="button button--lg button--red button--like"
							@click="like()"
						>
							<i
								:class="
									$store.state.presences.likedPresences.includes(
										getPresenceMetadata.service
									)
										? 'fas' + ' fa-heart'
										: 'far' + ' fa-heart'
								"
							/>
						</a>
					</div>
					<hr />
					<div
						v-if="
							getPresenceMetadata.button === false ||
							getPresenceMetadata.button === 'false'
						"
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
							v-html="getLinkifiedDescription"
						></div>
					</div>
					<div class="content__info">
						<h2 class="content__title">
							{{ $t("presence.sections.information.title") }}
						</h2>
						<ul class="info__sections">
							<li v-if="getPresenceMetadata.author">
								<p>
									<i class="fa-user fas"></i>
									{{ $t("presence.sections.information.author") }}:
									<nuxt-link
										v-if="getPresenceMetadata.author.id"
										class="author-name"
										:style="`color: ${getPresenceMetadata.author.roleColor};`"
										:to="`/users/${getPresenceMetadata.author.id}`"
										:disabled="true"
									>
										<img
											v-if="getPresenceMetadata.author.avatar"
											:src="getPresenceMetadata.author.avatar"
											class="author-avatar"
										/>
										{{ getPresenceMetadata.author.name }}
									</nuxt-link>
									<b v-else>{{ getPresenceMetadata.author.name }}</b>
								</p>
							</li>
							<li
								v-if="
									getPresenceMetadata.contributors &&
									typeof getPresenceMetadata.contributors === 'object'
								"
							>
								<p>
									<i class="fa-user-tie fas"></i>
									{{ $t("presence.sections.information.contributors") }}:
									<nuxt-link
										v-for="(
											contributor, index
										) in getPresenceMetadata.contributors"
										:key="contributor.id"
										class="author-name"
										:to="`/users/${contributor.id}`"
									>
										{{
											contributor.name +
											`${
												getPresenceMetadata.contributors.length === index + 1
													? ""
													: ", "
											}`
										}}
									</nuxt-link>
								</p>
							</li>
							<li v-if="getPresenceMetadata.version">
								<p>
									<i style="margin-right: 2px" class="fa-code-branch fas"></i>
									{{ $t("presence.sections.information.version") }}:
									<span class="presence-version">
										<b>{{ getPresenceMetadata.version }}</b>
									</span>
								</p>
							</li>
							<li v-if="presenceUsage && presenceUsage > 0">
								<p>
									<i
										class="fa-cart-arrow-down fas"
										style="margin-left: -4px"
									></i>
									{{ $t("presence.sections.information.users") }}:
									<span class="presence-version">
										<b>{{ presenceUsage }}</b>
									</span>
								</p>
							</li>
							<li v-if="getPresenceMetadata.tags">
								<p>
									<i class="fa-hashtag fas"></i>
									{{ $t("presence.sections.information.tags") }}:
								</p>
								<div class="presence-tags">
									<nuxt-link
										v-for="tag of getPresenceMetadata.tags"
										:key="tag"
										:to="`/store?q=${encodeURIComponent('tag:') + tag}`"
										:style="`background: ${
											getPresenceMetadata.color
										}; color: ${brightColorFix()};`"
										class="label label_tag"
										v-text="tag"
									/>
								</div>
							</li>
							<li>
								<p>
									<i class="fa-link fas"></i>
									{{ $t("presence.sections.information.supportedurls") }}:
								</p>
								<ul
									v-if="Array.isArray(getPresenceMetadata.url)"
									class="presence-urls"
								>
									<li v-for="url in getPresenceMetadata.url" :key="url">
										<a :href="`https://${url}`">{{ url }}</a>
									</li>
								</ul>

								<ul v-else-if="getPresenceMetadata.url" class="presence-urls">
									<li>
										<a :href="`https://${getPresenceMetadata.url}`">
											{{ getPresenceMetadata.url }}
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

<style lang="scss" scoped>
.section {
	img {
		height: 64px;
		width: 64px;
		border-radius: 100%;
		margin-right: 8px;
		place-self: center;
		transition: opacity 0.2s ease-in-out;

		&:hover {
			opacity: 0.75;
		}
	}

	h1 {
		line-height: 100px;
		margin-left: 25px;
	}
}

.presence-badge {
	place-self: center;
}
</style>

<script>
import PresenceMixin from "~/components/mixins/Presence";
import tinycolor from "tinycolor2";

export default {
	name: "PresencePage",
	mixins: [PresenceMixin],
	auth: false,
	async asyncData({ params, app, error }) {
		const presenceUsage = (await app.$axios(`/v2/usage`)).data.users;
		const presenceRanking = (await app.$axios(`/v2/presenceUsage`)).data;
		const partnersList = (await app.$axios(`/v2/partners`)).data;

		let { presences } = await app.$graphql(
				`
				{
					presences(service: "${params.presenceName}") {
						metadata {
							color
							service
							description
							button
							logo
							url
							thumbnail
							author {
								id
								name
							}
							contributors {
								id
								name
							}
							version
							tags
						}
					}
				}
				`
			),
			presenceData = presences[0];

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

		if (presenceData) {
			try {
				data.presence.metadata.author = (
					await app.$graphql(
						`{
							credits(id: "${data.presence.metadata.author.id}") {
								user {
									name
									id
									avatar
									roleColor
								}
							}
						}`
					)
				).credits[0].user;
			} catch (err) {}
		}

		data["isMobile"] = false;
		return data;
	},
	computed: {
		/**
		 * Returns presence's metadata, if none, returns an empty object instead.
		 * @returns {object} The {@link https://docs.premid.app/dev/presence/metadata|Presence metadata}.
		 */
		getPresenceMetadata() {
			return this.presence?.metadata || {};
		},
		/**
		 * Darkens the initial presence color and returns.
		 * @returns {string} Color code in HEX format.
		 */
		getPresenceGradientColor() {
			return tinycolor(this.presence?.metadata?.color).darken(45).toHexString();
		},
		/**
		 * Gets Presence's first character, does some checks and returns the link value to GitHub folder of the Presence.
		 * @returns {string} The direct link to Presence's folder in PreMiD GitHub repository.
		 */
		getGithubLink() {
			const serviceName = this.presence?.metadata?.service;
			if (!serviceName) return "https://github.com/PreMiD/Presences";

			const firstChar = serviceName
				.charAt(0)
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.charAt(0)
				.toLowerCase();

			let type;
			if (!isNaN(firstChar)) {
				type = "0-9";
			} else if ("a" <= firstChar && firstChar <= "z") {
				type = firstChar.toUpperCase();
			} else {
				type = "#";
			}

			return `https://github.com/PreMiD/Presences/tree/master/websites/${type}/${encodeURIComponent(
				serviceName
			)}`;
		},
		/**
		 * Replaces the markdown-like links in the presence description into HTML anchors and returns the value.
		 * @returns {string} Replaced description value, in HTML format if any links found.
		 */
		getLinkifiedDescription() {
			const description =
				this.presence?.metadata?.description?.[this.getCurrentLanguage()] ||
				this.presence?.metadata?.description?.["en"];

			const replaced = description?.replace(
				/\[([^\]]+)\]\(([^\)]+)\)/gm,
				`<a href="$2" target="_blank" rel="noreferrer">$1</a>`
			);

			return replaced;
		}
	},
	mounted() {
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

		if (!this.presence)
			return this.$nuxt.error({
				statusCode: 404,
				message: "Presence does not exist."
			});
	},
	created() {
		if (this.presence)
			this.isPresenceInstalled(this.presence.metadata?.service).then(
				response => {
					if (response) this.isInstalled = true;
				}
			);
	},
	updated() {
		this.isPresenceInstalled(this.presence?.metadata?.service).then(
			response => {
				if (response) this.isInstalled = true;
			}
		);
	},
	methods: {
		/**
		 * Checks if presence color is light and returns a dark/light color based on the presence color.
		 * @returns {string} The color HEX code.
		 */
		brightColorFix() {
			return tinycolor(this.presence?.metadata?.color).getBrightness() >= 200
				? "#111218"
				: "#ffffff";
		},
		/**
		 * Presence liking method, used to like presences. Stores them in the browser storage and doesn't sync anywhere else.
		 */
		like() {
			const likedPresences = localStorage.getItem("likedPresences");

			if (!likedPresences)
				localStorage.setItem(
					"likedPresences",
					this.presence?.metadata?.service
				);
			else if (
				likedPresences.split(",").includes(this.presence?.metadata?.service)
			) {
				localStorage.setItem(
					"likedPresences",
					likedPresences
						.split(",")
						.filter(i => i !== this.presence?.metadata?.service)
						.join(",")
				);
			} else if (
				!likedPresences.split(",").includes(this.presence?.metadata?.service)
			) {
				let newPresences = likedPresences.split(",");

				newPresences.push(this.presence?.metadata?.service);
				localStorage.setItem("likedPresences", newPresences.join(","));
			}

			this.$store.commit("presences/like", this.presence?.metadata?.service);
		}
	},
	head() {
		if (this.presence?.error) return;
		let description =
			this.presence?.metadata?.description?.["en"] ||
			this.presence?.metadata?.description ||
			"No description found for this presence. Maybe it's a secret one?";

		/**
		 * Replace the markdown-like links in description
		 */
		description = description.replace(/\[([^\]]+)\]\(([^\)]+)\)/gm, "$1");

		if (description.length >= 256)
			description = description.slice(0, 256) + "...";

		return {
			title: this.presence?.metadata?.service || "Unknown Service",
			meta: [
				/* Twitter */
				{
					hid: "twitter:card",
					property: "twitter:card",
					content: "summary"
				},
				{
					hid: "twitter:url",
					property: "twitter:url",
					content: `https://premid.app${encodeURIComponent(this.$route.path)}`
				},
				{
					hid: "twitter:description",
					property: "twitter:description",
					content: description
				},
				{
					hid: "twitter:image",
					property: "twitter:image",
					content: this.presence?.metadata?.logo
				},
				/* Open-Graph */
				{
					hid: "og:title",
					property: "og:title",
					content: this.presence?.metadata?.service || "Unknown Service"
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
						this.presence?.metadata?.logo ||
						"https://premid.app/assets/images/logo.png"
				},
				/* General */
				{
					hid: "description",
					name: "description",
					content: description
				},
				{
					hid: "theme-color",
					property: "theme-color",
					content: this.presence?.metadata?.color || "#000000"
				}
			]
		};
	}
};
</script>
