<script setup lang="ts">
import type { LocationQuery } from "vue-router";

useHead({
  title: "Store",
});
const { t } = useI18n(),
  { data } = await useAsyncGql({ operation: "presences" }),
  pageSize = ref(12),
  totalPages = ref(0),
  presences = computed(() => getPresencePage()),
  route = useRoute(),
  currentPage = ref(Number.parseInt(route.query.page?.toString() || "1")),
  searchTerm = ref(route.query.search?.toString() || ""),
  selectedCategory = ref(""),
  categories = [
    { tag: "", text: t("store.categories.all") },
    { tag: "anime", text: t("store.categories.anime") },
    { tag: "games", text: t("store.categories.games") },
    { tag: "music", text: t("store.categories.music") },
    { tag: "other", text: t("store.categories.other") },
    { tag: "socials", text: t("store.categories.socials") },
    { tag: "videos", text: t("store.categories.videos") },
  ];

function handleQuery(query: LocationQuery) {
  const pageQuery = query.page?.toString() || "",
    parsedPage = Number.parseInt(
      Number.isNaN(Number(pageQuery)) ? "1" : pageQuery,
    );
  currentPage.value = Math.min(parsedPage, totalPages.value);
  searchTerm.value = query.search?.toString() || "";
  selectedCategory.value = query.category?.toString() || "";
}

watch(
  () => route.query,
  (query) => {
    handleQuery(query);
  },
);

function getPresencePage(page = currentPage.value, search = searchTerm.value) {
  const startIndex = (page - 1) * pageSize.value,
    endIndex = startIndex + pageSize.value,
    sortedPresences = (
      selectedCategory.value
        ? data.value.presences.filter(
            (p) => p.metadata.category === selectedCategory.value,
          )
        : data.value.presences
    )
      .sort((a, b) => b.users - a.users)
      .filter((p) => !p.metadata.tags.includes("nsfw"))
      .filter((p) =>
        p.metadata.service.toLowerCase().includes(search.toLowerCase()),
      );
  totalPages.value = Math.ceil(sortedPresences.length / pageSize.value);
  return {
    currentPage: page,
    data: sortedPresences.slice(startIndex, endIndex),
    pageSize: pageSize.value,
    totalItems: sortedPresences.length,
  };
}

function getLinkProperties({
  page = currentPage.value,
  search = searchTerm.value,
  category = selectedCategory.value,
}) {
  const query = { category, page, search };

  return {
    query: Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== ""),
    ),
  };
}

function startPage() {
  const { currentPage } = presences.value,
    middleOffset = Math.floor(Math.min(5, totalPages.value) / 2);

  return currentPage >= totalPages.value - middleOffset
    ? Math.max(2, totalPages.value - 5)
    : Math.max(2, currentPage - middleOffset);
}
onMounted(() => {
  handleQuery(route.query);
});
</script>

<template>
  <main class="mx-3vw items-center justify-center flex h-screen">
    <div class="bg-card-filter rounded-md w-70 p-5 mb-3.6rem">
      <h1 class="header color-primary">{{ $t("store.header.search") }}</h1>
      <input
        v-model="searchTerm"
        type="text"
        class="bg-gray p-2 w-full text-white border-none h-8 rounded-sm"
        :placeholder="$t('store.filter.search')"
        @:input="$router.replace(getLinkProperties({}))"
      />
      <h1 class="header mt-8 color-primary">
        {{ $t("store.header.categories") }}
      </h1>
      <div class="flex flex-col w-full items-center">
        <NuxtLink
          v-for="c of categories"
          :key="c.text"
          :class="{ 'bg-primary text-white': c.tag === selectedCategory }"
          class="w-full m-1 h-8 p-2 font-bold text-link-inactive border-gray-secondary border-1 rounded border-solid"
          :to="getLinkProperties({ category: c.tag })"
        >
          {{ c.text }}
        </NuxtLink>
      </div>
    </div>
    <div class="min-h-688px items-center flex-col ml-3vw flex max-w-content">
      <div class="card-columns grid-cols-2 overflow-unset">
        <StoreCard
          v-for="presence in presences.data"
          :key="presence.metadata.service"
          tabindex="0"
          :presence="presence"
        />
      </div>
      <div class="mt-5 flex">
        <NuxtLink
          :to="getLinkProperties({ page: 1 })"
          :replace="true"
          prefetch
          class="button"
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
          class="button"
          :class="{ active: startPage() + i - 1 === presences.currentPage }"
        >
          {{ startPage() + i - 1 }}
        </NuxtLink>
        <NuxtLink
          v-if="totalPages > 1"
          :to="getLinkProperties({ page: totalPages })"
          prefetch
          :class="{ active: totalPages === presences.currentPage }"
          class="button"
        >
          {{ totalPages }}
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.header {
  margin-bottom: 0.6rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.card-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: fit-content(20%) fit-content(20%) fit-content(200%);
}

@screen lt-2xl {
  .card-columns {
    grid-template-columns: fit-content(0%) fit-content(0%);
  }
}

.button {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  height: 3.4rem;
  width: 3.4rem;
  background-color: #2e3242;
  border-radius: 10vw;
  border: none;
  margin: 0.2rem;
  transition: background-color 150ms;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:hover {
  background-color: #373b4f;
}
.button.active {
  transition: background-color 400ms;
  background-color: #7289da;
}
</style>
