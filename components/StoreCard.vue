<script setup lang="ts">
import tinycolor from "tinycolor2";

import type { PresencesQuery } from "#gql";

const { presence } = defineProps<{
    presence: PresencesQuery["presences"][number];
  }>(),
  hovered = ref(false),
  color = [
    presence.metadata.color,
    tinycolor(presence.metadata.color).darken(45).toHexString(),
    tinycolor(presence.metadata.color).darken(30).toHexString(),
  ];

// function calculateTextColor(hexColor: string, threshold = 0.8): string {
//   const match = hexColor.slice(1).match(/.{1,2}/g);
//   if (!match) throw new Error("Invalid hexColor format");
//   const [r, g, b] = match.map((value) => Number.parseInt(value, 16)),
//     luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//   return luminance > threshold ? "#232323" : "#fdfdfd";
// }

function calculateTextColor(): string {
  return tinycolor(color[0]).getLuminance() > 0.95 ? "#232323" : "#fdfdfd";
}
</script>

<template>
  <div
    :style="`--color2: ${color[2]}`"
    class="bg-card-primary w-20 rounded-lg card-dimensions"
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
      class="rounded-lg flex h-full"
      :style="`background: linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%); `"
    >
      <img
        class="relative h-16 rounded-md my-a w-16 mx-7 card-shadow"
        :src="presence.metadata.logo"
        :alt="presence.metadata.service"
      />
      <div
        class="relative my-a mr-4 text-3 font-50 w-6/9"
        :style="`color:${calculateTextColor()};`"
      >
        <h1
          class="font-bold text-xl card-shadow text-ellipsis text-nowrap overflow-hidden"
        >
          {{ presence.metadata.service }}
        </h1>

        <p class="card-shadow line-clamp-2 line-height-3.5">
          {{ presence.metadata.description.en }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-dimensions {
  width: 23rem;
  height: 9rem;
}
@media (min-width: 1400px) {
  .card-dimensions {
    width: 25rem;
    height: 10rem;
  }
}
.card-shadow {
  filter: drop-shadow(0 0 0.3rem var(--color2));
}
</style>
