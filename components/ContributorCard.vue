<script lang="ts" setup>
	import tinycolor from "tinycolor2";

	import { type ContributorsQuery } from "#gql";

	type ContributorType = NonNullable<ContributorsQuery["credits"]>[number];

	const { user } = defineProps<{ user: ContributorType }>();

	// eslint-disable-next-line one-var
	const hovered = ref(false);

	// eslint-disable-next-line one-var
	const cardGradientColor = computed(() => {
			return {
				primary: tinycolor(user?.user?.roleColor ?? "")
					.setAlpha(1)
					.darken(5)
					.toRgbString(),
				secondary: tinycolor(user?.user?.roleColor ?? "")
					.analogous()[2]
					.setAlpha(0.5)
					.saturate(20)
					.toRgbString()
			};
		}),
		cardShadowColor = computed(() =>
			hovered.value
				? tinycolor(cardGradientColor.value.primary)
						.setAlpha(0.3)
						.saturate(20)
						.toRgbString()
				: "transparent"
		),
		computedBackground = computed(() => {
			return `background: linear-gradient(-35deg, ${cardGradientColor.value.secondary} 20%, ${cardGradientColor.value.primary} 130%); box-shadow: 0 2px 52px 0 ${cardShadowColor.value}`;
		});
</script>

<template>
	<div
		class="h-15 w-60 flex items-center rd-2 py-1 justify-between px-3 select-none transition-all hover:translate-y--1.5 duration-200"
		:style="computedBackground"
		@mouseover="hovered = true"
		@mouseleave="hovered = false"
	>
		<div class="grid gap-1">
			<h1 class="font-800 font-size-4.5">{{ user?.user?.name }}</h1>
			<p class="color-white:85">{{ user?.user?.role }}</p>
		</div>
		<div class="relative">
			<img
				v-if="user?.user?.avatar"
				:src="user?.user?.avatar"
				class="h-auto w-10 rd-100"
				draggable="false"
			/>
			<span
				class="bg-green block rd-100 absolute right-0 h-2.5 w-2.5 bottom-0 border-1 border-solid border-black"
			/>
		</div>
	</div>
</template>
