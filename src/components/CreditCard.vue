<template>
	<div
		class="credit-card"
		:style="`background: linear-gradient(-35deg, ${cardGradientColor.secondary} 20%, ${cardGradientColor.primary} 130%); box-shadow: 0 2px 52px 0 ${cardShadowColor}`"
		@mouseover="hovered = true"
		@mouseleave="hovered = false"
	>
		<div class="credit-card__user">
			<h1 :title="user.name" v-text="user.name"></h1>
			<h2>
				{{
					{
						"515874214750715904": "Patron"
					}[user.roleId] ??
					$t(
						`contributors.roles.${
							user.role.replace(/\s/g, "").charAt(0).toLowerCase() +
							user.role.replace(/\s/g, "").substring(1)
						}`
					)
				}}
			</h2>
		</div>
		<div
			class="credit-card__avatar"
			@click="copyId(user.id)"
			v-tippy="{ content: $t('contributors.cards.copyUserId') }"
		>
			<span :class="user.status"></span>
			<nuxt-img
				alt="User Avatar"
				@error="user.avatar = 'https://premid.app/assets/images/logo.png'"
				:src="user.avatar + '?size=64'"
				draggable="false"
			/>
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
				if (this.hovered) {
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
			}
		}
	};
</script>
