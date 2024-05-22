import type { LocationQuery } from "vue-router";

const PAGE_SIZE = 12;

export const usePresences = async (options: { search: Ref<string>; currentPage: Ref<number>; selectedCategory: Ref<string> }) => {
	const { data } = await useAsyncGql({ operation: "presences" }),
		totalPages = ref(0),
		presences = computed(() => getPresencePage()),
		route = useRoute();

	function handleQuery(query: LocationQuery) {
		const pageQuery = query.page?.toString() || "1",
			parsedPage = Number.parseInt(
				Number.isNaN(Number(pageQuery)) ? "1" : pageQuery,
			);

		options.currentPage.value = Math.max(1, Math.min(parsedPage, totalPages.value));

		options.search.value = query.search?.toString() || "";

		options.selectedCategory.value = query.category?.toString() || "";
	}

	function getPresencePage(page = options.currentPage.value, search = options.search.value) {
		const startIndex = (page - 1) * PAGE_SIZE,
			endIndex = startIndex + PAGE_SIZE,
			sortedPresences = (
				options.selectedCategory.value
					? data.value.presences.filter(
						p => p.metadata.category === options.selectedCategory.value,
					)
					: data.value.presences
			)
				.sort((a, b) => b.users - a.users)
				.filter(p => !p.metadata.tags.includes("nsfw"))
				.filter(p =>
					p.metadata.service.toLowerCase().includes(search.toLowerCase()),
				);

		totalPages.value = Math.ceil(sortedPresences.length / PAGE_SIZE);

		return {
			currentPage: page,
			data: sortedPresences.slice(startIndex, endIndex),
			pageSize: PAGE_SIZE,
			totalItems: sortedPresences.length,
		};
	}

	function startPage() {
		const { currentPage } = presences.value,
			middleOffset = Math.floor(Math.min(5, totalPages.value) / 2);

		return currentPage >= totalPages.value - middleOffset
			? Math.max(2, totalPages.value - 5)
			: Math.max(2, currentPage - middleOffset);
	}

	watch(
		() => route.query,
		(query) => {
			handleQuery(query);
		},
	);

	onMounted(() => {
		handleQuery(route.query);
	});

	return {
		presences, startPage, totalPages,
	};
};
