<script setup lang="ts">
import type { PresencesQuery } from "#gql";

const { presence } = defineProps<{
    presence: PresencesQuery["presences"][number];
  }>(),
  hovered = ref(false);

function calculateTextColor(hexColor: string, threshold = 0.8): string {
  const match = hexColor.slice(1).match(/.{1,2}/g);
  if (!match) throw new Error("Invalid hexColor format");
  const [r, g, b] = match.map((value) => Number.parseInt(value, 16)),
    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > threshold ? "#232323" : "#fdfdfd";
}
</script>

<template>
  <div
    class="bg-card-primary rounded-lg bg-gradient-to-br to-black/50 from-white/50 card-dimensions"
    :aria-label="presence.metadata.service"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      class="absolute card-dimensions rounded-lg object-cover opacity-20"
      :src="presence.metadata.thumbnail"
      :alt="presence.metadata.service"
    />
    <div
      class="rounded-lg flex bg-gradient-to-br h-full from-white to-black"
      :style="`--un-gradient-from:${presence.metadata.color}B3 var(--un-gradient-from-position);--un-gradient-to:${presence.metadata.color}80 var(--un-gradient-to-position);`"
    >
      <img
        class="relative h-15 rounded-md my-a w-15 mx-5"
        :src="presence.metadata.logo"
        :alt="presence.metadata.service"
      />
      <div
        class="relative my-a mr-4"
        :style="`color:${calculateTextColor(presence.metadata.color)};`"
        style="-webkit-box-pack: end"
      >
        <h1 class="font-bold py-1">
          {{ presence.metadata.service }} {{ hovered }}
        </h1>
        <p
          class="font-light text-3 overflow-hidden line-clamp-2 line-height-3.5"
        >
          {{ presence.metadata.description.en }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-dimensions {
  width: 16rem;
  height: 8rem;
}
@media (min-width: 1400px) {
  .card-dimensions {
    width: 20rem;
    height: 10rem;
  }
}
</style>
