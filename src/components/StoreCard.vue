<template>
	<div>
		<div
			:class="'store-card ' + (cardHovered ? 'hovered' : '')"
			:style="`box-shadow: 0 2px 64px 0 ${presenceShadowColor};`"
			@mouseover="cardHovered = true"
			@mouseleave="cardHovered = false"
		>
			<img class="store-card__background" :src="presence.thumbnail" />

			<div class="store-card__service-logo">
				<img :src="presence.logo" />
			</div>

			<div class="store-card__service-info">
				<div class="store-card__service">
					<h2>
						<nuxt-link
							:key="presenceLinkName"
							:to="`/store/presences/${encodeURIComponent(presenceLinkName)}`"
						>
							{{ presence.service }}
							<span
								v-if="partner"
								v-tippy="{
									content: $t('store.cards.partner')
								}"
								class="fa-stack"
							>
								<i
									style="color:white;font-size:16px;margin-left:-4px;"
									class="fa-gem fa-inverse fa-stack-1x fas"
								></i>
							</span>

							<span
								v-if="hot"
								v-tippy="{
									content: $t('store.cards.popular')
								}"
								class="fa-stack"
								:style="partner == true ? 'margin-left:-4px' : ''"
							>
								<i class="fa-circle fa-stack-2x fas"></i>
								<i
									:style="`color: ${presence.color};`"
									class="fa-fire-alt fa-inverse fa-stack-1x fas"
								></i>
							</span>

							<span
								v-if="
									typeof presence.warning == 'boolean' &&
										presence.warning === true
								"
								v-tippy="{
									content: $t('store.cards.extraStepsRequired')
								}"
								class="fa-stack"
								:style="hot == true || partner == true ? 'margin-left:-4px' : ''"
							>
								<i class="fa-circle fa-stack-2x fas"></i>
								<i
									:style="`color: ${presence.color};`"
									class="fa-exclamation fa-inverse fa-stack-1x fas"
								></i>
							</span>
						</nuxt-link>
					</h2>
					<p>
						{{ $t("store.cards.creator") }}:
						<nuxt-link :to="`/users/${presence.author.id}`">{{
							presence.author.name
						}}</nuxt-link>
					</p>

					<transition name="card-animation" mode="out-in">
						<div
							v-if="
								!cardHovered || !this.$store.state.extension.extensionInstalled
							"
							:key="presence.service + '_desc'"
						>
							<p
								class="store-card__desc"
								v-html="linkify(this.getPresenceDescription())"
							></p>
						</div>
						<div
							v-if="
								cardHovered && this.$store.state.extension.extensionInstalled
							"
							:key="presence.service + '_buttons'"
						>
							<div
								v-if="
									this.$store.state.extension.extensionInstalled &&
										typeof presence.button == 'undefined'
								"
								class="on-desktop store-card__buttons"
							>
								<button
									v-if="!isInstalled"
									class="button button--"
									@click="sendPresence(presence.service)"
								>
									<span class="icon">
										<i class="fa-plus fas"></i>
									</span>
									{{ $t("store.card.presence.add") }}
								</button>
								<button
									v-if="isInstalled"
									class="button button--black"
									@click="removePresence(presence.service)"
								>
									<span class="icon">
										<i class="fa-minus fas"></i>
									</span>
									{{ $t("store.card.presence.remove") }}
								</button>
								<a class="button button--red button--like" @click="like()"
									><i
										:class="
											$store.state.presences.likedPresences.includes(
												presence.service
											)
												? 'fas' + ' fa-heart'
												: 'far' + ' fa-heart'
										"
								/></a>
							</div>
							<div
								v-if="
									this.$store.state.extension.extensionInstalled &&
										presence.button == false
								"
							>
								<p class="store-card__warning">
									{{ $t("store.card.presence.included") }}
								</p>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<div
				class="store-card__gradient"
				:style="
					`background: linear-gradient(135deg, ${presence.color} 0%, ${presenceGradientColor} 100%);`
				"
			></div>
		</div>
	</div>
</template>

<script>
	import PresenceMixin from "./mixins/Presence";
	import tinycolor from "tinycolor2";
	import axios from "axios";

	export default {
		name: "StoreCard",
		mixins: [PresenceMixin],
		props: ["presence", "submit", "nsfw", "hot", "partner"],
		data() {
			return {
				cardHovered: false,
				presenceLinkName: this.$props.presence.service
			};
		},
		computed: {
			presenceGradientColor() {
				return tinycolor(this.presence.color)
					.darken(45)
					.toHexString();
			},
			presenceShadowColor() {
				if (this.cardHovered) {
					return tinycolor(this.presence.color)
						.setAlpha(0.3)
						.toRgbString();
				} else {
					return "transparent";
				}
			}
		},
		mounted() {
			this.isPresenceInstalled(this.presence.service).then(response => {
				if (response) this.isInstalled = true;
			});
		},
		methods: {
			like() {
				const likedPresences = localStorage.getItem("likedPresences");

				if (!likedPresences)
					localStorage.setItem("likedPresences", this.presence.service);
				else if (
					likedPresences.split(",").includes(this.presence.service)
				) {
					localStorage.setItem(
						"likedPresences",
						likedPresences
							.split(",")
							.filter(i => i !== this.presence.service)
							.join(",")
					);
				} else if (!likedPresences.split(",").includes(this.presence.service)) {
					let newPresences = likedPresences.split(",");

					newPresences.push(this.presence.service);

					localStorage.setItem("likedPresences", newPresences.join(","));
				}

				this.$store.commit("presences/like", this.presence.service);
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
			openInNewTab(url) {
				let page = window.open(url, "_blank");
				win.focus();
			},
			/**
			 * Returns description of the presence according to your language.
			 * If presence has non-multilingual description then we just parsing the "description" data.
			 */
			getPresenceDescription() {
				if (this.presence.description[this.$root.getCurrentLanguage()]) {
					return this.presence.description[this.$root.getCurrentLanguage()];
				} else if (this.presence.description["en"]) {
					return this.presence.description["en"];
				} else {
					return this.presence.description;
				}
			}
		}
	};
</script>
