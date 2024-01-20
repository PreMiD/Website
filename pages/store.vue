<script setup lang="ts">
useHead({
  title: "Store",
});

const { data } = await useAsyncGql({ operation: "presences" }),
  sortedPresences = data.value.presences
    .sort((a, b) => b.users - a.users)
    .filter((p) => p.metadata.service !== "PreMiD"),
  pageSize = ref(12),
  presences = ref(getPresencePage()),
  totalPages = Math.ceil(sortedPresences.length / pageSize.value);

function getPresencePage(page = 1) {
  const startIndex = (page - 1) * pageSize.value,
    endIndex = startIndex + pageSize.value;

  return {
    currentPage: page,
    data: sortedPresences.slice(startIndex, endIndex),
    pageSize: pageSize.value,
    totalItems: sortedPresences.length,
  };
}
function startPage() {
  const { currentPage } = presences.value,
    middleOffset = Math.floor(Math.min(5, totalPages) / 2);

  return currentPage >= totalPages - middleOffset
    ? Math.max(2, totalPages - 5)
    : Math.max(2, currentPage - middleOffset);
}
function loadNextPage() {
  if (presences.value.currentPage < totalPages)
    presences.value = getPresencePage(presences.value.currentPage + 1);
}

function loadPreviousPage() {
  if (presences.value.currentPage > 1)
    presences.value = getPresencePage(presences.value.currentPage - 1);
}
function loadPage(page: number) {
  presences.value = getPresencePage(page);
}
</script>

<template>
  <main class="h-screen flex flex-col m-5 justify-center items-center">
    <div class="absolute bg-card-primary w-70 h-146 left-5"></div>
    <div class="grid gap-2 xl:grid-cols-3 lg:grid-cols-2 h-min ml-70">
      <StoreCard
        v-for="presence in presences.data"
        :key="presence.metadata.service"
        :presence="presence"
      />
      <div class="w-full mt-3">
        <p class="self-center">
          {{ presences.currentPage }} / {{ totalPages }}
        </p>
        <button
          :disabled="presences.currentPage === 1"
          @click="loadPreviousPage"
        >
          Previous Page
        </button>
        <button
          :disabled="presences.currentPage === totalPages"
          @click="loadNextPage"
        >
          Next Page
        </button>
      </div>
      <div>
        <button
          :class="{ 'bg-blue': 1 === presences.currentPage }"
          @click="loadPage(1)"
        >
          1
        </button>

        <button
          v-for="i in Math.min(5, totalPages)"
          :key="i"
          :class="{
            'bg-blue': startPage() + i - 1 === presences.currentPage,
          }"
          @click="loadPage(startPage() + i - 1)"
        >
          {{ startPage() + i - 1 }}
        </button>
        <button
          :class="{ 'bg-blue': totalPages === presences.currentPage }"
          @click="loadPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>
    </div>
  </main>
</template>
