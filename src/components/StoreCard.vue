<template>
	<div>
		<div
			:class="'store-card ' + (card_hovered ? 'hovered' : '')"
			@mouseover="card_hovered = true"
			@mouseleave="card_hovered = false"
			:style="`box-shadow: 0 2px 64px 0 ${presenceShadowColor};`"
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
								v-if="hot"
								class="fa-stack"
								:content="$t('store.cards.popular')"
								v-tippy
							>
								<i class="fas fa-circle fa-stack-2x"></i>
								<i
									:style="`color: ${presence.color};`"
									class="fas fa-fire-alt fa-stack-1x fa-inverse"
								></i>
							</span>
						</nuxt-link>
					</h2>
					<p>
						{{ $t("store.cards.creator") }}:
						<nuxt-link :to="`/users/${presence.author.id}`">
							{{ presence.author.name }}
						</nuxt-link>
					</p>

					<transition name="card-animation" mode="out-in">
						<div
							:key="presence.service + '_desc'"
							v-if="
								!card_hovered || !this.$store.state.extension.extensionInstalled
							"
						>
							<p class="store-card__desc">
								{{ this.getPresenceDescription() }}
							</p>
						</div>
						<div
							:key="presence.service + '_buttons'"
							v-if="
								card_hovered && this.$store.state.extension.extensionInstalled
							"
						>
							<div
								v-if="
									this.$store.state.extension.extensionInstalled &&
										typeof presence.button == 'undefined'
								"
								class="store-card__buttons on-desktop"
							>
								<button
									v-if="!isInstalled"
									class="button button--"
									v-on:click="sendPresence(presence.service)"
								>
									<span class="icon">
										<i class="fas fa-plus"></i>
									</span>
									{{ $t("store.card.presence.add") }}
								</button>
								<button
									v-if="isInstalled"
									class="button button--black"
									v-on:click="removePresence(presence.service)"
								>
									<span class="icon">
										<i class="fas fa-minus"></i>
									</span>
									{{ $t("store.card.presence.remove") }}
								</button>
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
	props: ["presence", "submit", "nsfw", "hot"],
	mixins: [PresenceMixin],
	data() {
		return {
			card_hovered: false,
			presenceLinkName: this.$props.presence.service
		};
	},
	methods: {
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
	},
	mounted() {
		this.isPresenceInstalled(this.presence.service).then(responce => {
			if (responce) this.$data.isInstalled = true;
		});
	},
	computed: {
		presenceGradientColor() {
			return tinycolor(this.presence.color)
				.darken(45)
				.toHexString();
		},
		presenceShadowColor() {
			if (this.$data.card_hovered) {
				return tinycolor(this.presence.color)
					.setAlpha(0.3)
					.toRgbString();
			} else {
				return "transparent";
			}
		}
	}
};
</script>
