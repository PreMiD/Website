<template>
	<div
		class="credit-card"
		:style="
			`background: linear-gradient(-35deg, ${cardGradientColor.secondary} 20%, ${cardGradientColor.primary} 130%); box-shadow: 0 2px 52px 0 ${cardShadowColor}`
		"
		@mouseover="hovered = true"
		@mouseleave="hovered = false"
	>
		<div class="credit-card__user">
			<h1 :title="user.name" v-text="user.name"></h1>
			<h2>
				{{ user.role == "Patron" ? "Patron" : $t(translationKeys[user.role]) }}
			</h2>
		</div>
		<div
			class="credit-card__avatar"
			@click="copyId(user.userId)"
			v-tippy="{ content: $t('contributors.cards.copyUserId') }"
		>
			<span :class="user.status"></span>
			<img :src="user.avatar + '?size=64'" draggable="false" />
		</div>
	</div>
</template>

<script>
	import tinycolor from "tinycolor2";

	export default {
		name: "Creditcard",
		props: ["user"],
		data() {
			return {
				translationKeys: {
					Creator: "contributors.roles.creator",
					"Executive Director": "contributors.roles.executiveDirector",
					"Operations Supervisior": "contributors.roles.operationsSupervisior",
					"Global Community Representative":
						"contributors.roles.globalCommunityRepresentative",
					"Head Software Engineer": "contributors.roles.headSoftwareEngineer",
					"Web Developer": "contributors.roles.webDeveloper",
					"Linux Maintainer": "contributors.roles.linuxMaintainer",
					Engineer: "contributors.roles.engineer",
					"Graphic Designer": "contributors.roles.graphicDesigner",
					"Senior Moderator": "contributors.roles.seniorModerator",
					"Head of Presence Verifying": "contributors.roles.verificationHead",
					"Community Representative":
						"contributors.roles.communityRepresentative",
					Moderator: "contributors.roles.moderator",
					"Junior Moderator": "contributors.roles.juniorModerator",
					"Support Agent": "contributors.roles.supportAgent",
					"Presence Verifier": "user.roles.presenceVerifier",
					Proofreader: "contributors.roles.proofreader",
					Donator: "contributors.roles.donator",
					Booster: "contributors.roles.booster",
					Translator: "contributors.roles.translator"
				},
				hovered: false
			};
		},
		computed: {
			cardGradientColor() {
				return {
					primary: tinycolor(this.$props.user.roleColor)
						.setAlpha(1)
						.darken(5)
						.toRgbString(),
					secondary: tinycolor(this.$props.user.roleColor)
						.analogous()[2]
						.setAlpha(0.5)
						.saturate(20)
						.toRgbString()
				};
			},
			cardShadowColor() {
				if (this.$data.hovered) {
					return tinycolor(this.cardGradientColor.primary)
						.setAlpha(0.3)
						.saturate(20)
						.toRgbString();
				} else {
					return "transparent";
				}
			}
		},
		methods: {
			copyId(id) {
				let el = document.createElement("textarea");

				el.value = id;
				document.body.appendChild(el);

				el.select();

				document.execCommand("copy");
				document.body.removeChild(el);

				this.$noty.success(this.$t("contributors.cards.userIdCopied"));
			}
		}
	};
</script>
