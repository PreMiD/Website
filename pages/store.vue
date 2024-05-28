<script setup lang="ts">

useHead({
	title: "Store",
});

const { t } = useI18n(),
	{ categories } = useAppConfig(),
	route = useRoute(),
	search = ref(route.query.search?.toString() ?? ""),
	currentPage = ref(Number.parseInt(route.query.page?.toString() || "1")),
	selectedCategory = ref(""),
	{ presences, totalPages, startPage } = await usePresences({
		currentPage,
		search,
		selectedCategory,
	});

function getLinkProperties({
	page = currentPage.value,
	search: searchTo = search.value,
	category = selectedCategory.value,
}) {
	const query = { category, page, search: searchTo };

	return {
		query: Object.fromEntries(
			Object.entries(query).filter(([, value]) => value !== ""),
		),
	};
}
</script>

<template>
	<main class="relative items-center justify-center flex lt-sm:flex-col mx-3vw min-h-dvh">
		<div
			id="filters"
			class="rounded-lg text-nowrap w-full sticky z-30 bg-card p-5 sm:max-w-70 lt-sm:max-h-50 lt-sm:overflow-scroll top-14"
		>
			<h1 class="color-primary filter-header">
				{{ $t("store.header.search") }}
			</h1>
			<input
				v-model="search"
				type="text"
				class="text-white border-none bg-gray p-2 w-full h-8 rounded"
				:placeholder="$t('store.filter.search')"
				@:input="$router.replace(getLinkProperties({}))"
			>
			<h1 class="filter-header color-primary mt-8">
				{{ $t("store.header.categories") }}
			</h1>
			<div class="flex w-full items-center flex-col">
				<NuxtLink
					v-for="c of categories"
					:key="c"
					:class="{ 'bg-primary text-white': c == 'all' ? selectedCategory == '' : c === selectedCategory }"
					class="w-full flex items-center h-8 p-2 rounded font-bold border-solid border-1 m-1 text-link-inactive border-gray-secondary"
					:to="getLinkProperties({ category: c === 'all' ? '' : c })"
				>
					{{ t(`store.categories.${c}`) }}
				</NuxtLink>
			</div>
		</div>
		<div
			v-if="presences.data.length === 0"
			class="flex justify-center items-center rounded-lg w-2/3 h-50 ml-5"
		>
			couldn't find any presences
		</div>
		<div
			v-if="presences.data.length > 0"
			class="items-center mt-5 flex-col flex sm:mt-10 min-h-688px sm:ml-3vw"
		>
			<div
				class="gap-4 grid grid-cols-[fit-content(0%)] lg:grid-cols-[repeat(2,fit-content(0%))] 2xl:grid-cols-[repeat(3,fit-content(0%))] overflow-unset"
			>
				<StoreCard
					v-for="presence in presences.data"
					:key="presence.metadata.service"
					tabindex="0"
					:presence="presence"
				/>
			</div>
			<div
				v-if="presences.data.length > 0"
				class="flex mt-5 sticky bottom-1 z-40"
			>
				<NuxtLink
					:to="getLinkProperties({ page: 1 })"
					:replace="true"
					prefetch
					class="page-nav-button"
					:class="{ active: 1 === presences.currentPage }"
				>
					1
				</NuxtLink>
				<NuxtLink
					v-for="i in Math.min(5, totalPages)"
					v-show="totalPages - startPage() - i > -1"
					:key="i"
					prefetch
					:to="getLinkProperties({ page: startPage() + i - 1 })"
					class="page-nav-button"
					:class="{ active: startPage() + i - 1 === presences.currentPage }"
				>
					{{ startPage() + i - 1 }}
				</NuxtLink>
				<NuxtLink
					v-if="totalPages > 1"
					:to="getLinkProperties({ page: totalPages })"
					prefetch
					:class="{ active: totalPages === presences.currentPage }"
					class="page-nav-button"
				>
					{{ totalPages }}
				</NuxtLink>
			</div>
		</div>
	</main>
</template>

<style scoped>
#filters {
	&::-webkit-scrollbar {
		width: 0.4rem;
		height: 100%;
		overflow: hidden;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}
}

.filter-header {
	margin-bottom: 0.6rem;
	font-size: 1.3rem;
	font-weight: 700;
}

@screen lt-xs {
	.page-nav-button {
		font-size: 4.5vw;
		height: 12vw;
		width: 12vw;
	}
}

@screen xs {
	.page-nav-button {
		font-size: 1.3rem;
		height: 3.4rem;
		width: 3.4rem;
	}
}

.page-nav-button {
	color: white;
	font-weight: 600;
	background-color: #2e3242;
	border-radius: 10vw;
	border: none;
	margin: 0.2rem;
	transition: background-color 150ms;
	display: flex;
	justify-content: center;
	align-items: center;
}

.page-nav-button:hover {
	background-color: #373b4f;
}

.page-nav-button.active {
	transition: background-color 400ms;
	background-color: #7289da;
}
</style>
