<script lang="ts" setup>
const { t } = useI18n();
const links = computed(() => [
	{
		href: "/store",
		icon: "fa-solid fa-cart-arrow-down",
		name: t("header.links.store"),
	},
	{
		href: "/downloads",
		icon: "fa-solid fa-download",
		name: t("header.links.downloads"),
	},
	{
		href: "/contributors",
		icon: "fa-solid fa-handshake-angle",
		name: t("header.links.contributors"),
	},
]);

const navOpen = ref(false);
</script>

<template>
	<div>
		<PageBanner />
		<div
			id="header"
			class="flex items-center w-full select-none top-0 lg-md:relative lt-md:sticky z-1000 flex-justify-between p-3 bg-bg-primary"
		>
			<NuxtLink
				to="/"
				class="color-primary font-discord font-size-8"
				aria-label="Homepage"
			>
				PreMiD
			</NuxtLink>

			<div class="lt-md:hidden">
				<transition-group name="slide-fade" tag="div">
					<NuxtLink
						v-for="link in links"
						:key="link.href"
						:href="link.href"
						class="font-size-4.5 color-link-inactive decoration-none mx2 font-900 hover-color-primary"
						active-class="active"
						:aria-label="`Link to ${link.name}`"
					>
						<span class="items-center inline-flex gap-2">
							<span
								class="inline-flex iconOutline bg-link-icon-bg border-rd-100 p-2"
							>
								<FAIcon
									class="h-4 w-4"
									:icon="link.icon"
									aria-hidden="true"
								/>
							</span>
							<span class="uppercase">
								{{ link.name }}
							</span>
						</span>
					</NuxtLink>
				</transition-group>
			</div>

			<!-- Mobile Nav -->
			<div class="md:hidden">
				<button
					class="md:hidden cursor-pointer bg-transparent b-none p0 c-primary h7"
					aria-label="Toggle navigation menu"
					@click="navOpen = !navOpen"
				>
					<FAIcon class="hfull" icon="fa-solid fa-bars" />
				</button>
				<Transition>
					<div
						v-if="navOpen"
						class="top-0 w-full fixed left-0 z-50 h-screen bg-black/50 p-5 backdrop-blur-sm transition-opacity"
					>
						<div class="flex gap-2 flex-col">
							<button
								class="b-none bg-transparent p0 fixed hover-color-primary cursor-pointer duration-200 transition-color c-link-inactive h8 top-3 right-3"
								aria-label="Close navigation menu"
								@click="navOpen = !navOpen"
							>
								<FAIcon class="hfull" icon="fa-solid fa-times" />
							</button>

							<NuxtLink
								v-for="link in links"
								:key="link.href"
								:href="link.href"
								class="font-size-4.5 color-link-inactive decoration-none mx2 font-900 hover-color-primary"
							>
								<span class="items-center block">
									<span
										class="inline-flex bg-link-icon-bg border-rd-100 p-2 mr-2"
									>
										<FAIcon
											class="h-4 w-4"
											:icon="link.icon"
											aria-hidden="true"
										/>
									</span>
									<span class="uppercase">
										{{ link.name }}
									</span>
								</span>
							</NuxtLink>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.active {
	color: #7289da;
}
</style>
