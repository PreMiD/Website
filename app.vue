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

useSeoMeta({
	title: "PreMiD",
	ogTitle: "PreMiD",
	description: "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
	ogDescription: "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
	ogImage: "https://cdn.rcd.gg/PreMiD.png",
	twitterCard: "summary_large_image",
	ogUrl: "https://premid.app",
	twitterTitle: "PreMiD",
	twitterDescription: "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
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
