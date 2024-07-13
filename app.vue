<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/assets/images/icon.png",
		},
	],
});

const { t } = useI18n();

useSeoMeta({
	title: "PreMiD",
	ogTitle: "PreMiD",
	description: t("page.home.description"),
	ogDescription: t("page.home.description"),
	ogImage: "https://cdn.rcd.gg/PreMiD.png",
	twitterCard: "summary_large_image",
	ogUrl: "https://premid.app",
	twitterTitle: "PreMiD",
	twitterDescription: t("page.home.description"),
	applicationName: "PreMiD",
	twitterImage: "https://cdn.rcd.gg/PreMiD.png",
});
</script>

<template>
	<NuxtRouteAnnouncer />
	<NuxtLoadingIndicator
		color="#7289da"
		:height="4"
	/>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition:
		opacity 0.3s ease-in-out,
		transform 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
