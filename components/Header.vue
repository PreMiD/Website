<script lang="ts" setup>
	const { t } = useI18n(),
		links = computed(() => [
			{
				href: "/store",
				icon: "fa-solid fa-cart-arrow-down",
				name: t("header.links.store")
			},
			{
				href: "/downloads",
				icon: "fa-solid fa-download",
				name: t("header.links.downloads")
			},
			{
				href: "/contributors",
				icon: "fa-solid fa-handshake-angle",
				name: t("header.links.contributors")
			}
		]);
</script>

<template>
	<div class="m3 flex flex-justify-between items-center select-none">
		<div class="font-discord color-primary font-size-8">PreMiD</div>
		<div>
			<NuxtLink
				v-for="link in links"
				:key="link.href"
				:href="link.href"
				class="link color-link-inactive font-size-4.5 decoration-none mx2 font-900 hover-color-primary"
			>
				<span class="items-center gap-2 inline-flex">
					<span
						class="iconOutline inline-flex bg-link-icon-bg border-rd-100 p-2"
					>
						<FAIcon class="h-4 w-4" :icon="link.icon" />
					</span>
					<span class="uppercase">
						{{ link.name }}
					</span>
				</span>
			</NuxtLink>
		</div>
	</div>
</template>
