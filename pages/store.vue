<script setup lang="ts">
useHead({
  title: "Store",
});

const { data } = await useAsyncGql({ operation: "presences" }),
  sortedPresences = data.value.presences
    .sort((a, b) => b.users - a.users)
    .filter((p) => !p.metadata.tags.includes("nsfw")),
  // .filter((p) => p.metadata.service === "PlutoTV"),
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
    <div class="h-a card-columns card-columns-template ml-70 grid-cols-2">
      <StoreCard
        v-for="presence in presences.data"
        :key="presence.metadata.service"
        :presence="presence"
      />

      <div class="relative">
        <button
          class="button"
          :class="{ active: 1 === presences.currentPage }"
          @click="loadPage(1)"
        >
          1
        </button>

        <button
          v-for="i in Math.min(5, totalPages)"
          :key="i"
          class="button"
          :class="{
            active: startPage() + i - 1 === presences.currentPage,
          }"
          @click="loadPage(startPage() + i - 1)"
        >
          {{ startPage() + i - 1 }}
        </button>
        <button
          :class="{ active: totalPages === presences.currentPage }"
          class="button"
          @click="loadPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: fit-content(0%) fit-content(0%) fit-content(0%);
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
}

.button:hover {
  background-color: #7289da33;
}
.button.active {
  background-color: #7289da;
}
</style>
