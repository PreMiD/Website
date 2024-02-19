<script setup lang="ts">
import tinycolor from "tinycolor2";

import type { PresencesQuery } from "#gql";

const { presence } = defineProps<{
    presence: PresencesQuery["presences"][number];
  }>(),
  hovered = ref(false),
  color = {
    main: presence.metadata.color,
    shadow: tinycolor(presence.metadata.color).darken(30).toHexString(),
    shadowTint: tinycolor(presence.metadata.color).darken(65).toHexString(),
    text:
      tinycolor(presence.metadata.color).getLuminance() > 0.95
        ? "#232323"
        : "#fdfdfd",
    tint: tinycolor(presence.metadata.color).darken(45).toHexString(),
  };
</script>

<template>
  <div
    :style="`--shadow: ${color.shadow}; --shadowTint: ${color.shadowTint}; --text: ${color.text};`"
    class="relative shadow-md select-none bg-card-primary w-20 rounded-lg card-dimensions"
    :aria-label="presence.metadata.service"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      :class="{
        'opacity-60 delay-0': hovered,
        'delay-200 transition-ease-out': !hovered,
      }"
      style="background-color: var(--shadowTint)"
      class="absolute card-dimensions rounded-lg border-primary border-1.5 transition-all border-solid object-cover opacity-0 z-10"
    ></div>
    <div
      :class="{ 'opacity100 w-70 delay-200': hovered }"
      class="absolute h-full z-200 transition-all transition-ease right-0 flex gap-2 w-0 justify-center items-center rounded-md opacity-0"
    >
      <button
        class="bg-primary rounded-full text-white w-40 h-10 border-none gap-2 flex items-center justify-center"
      >
        <FAIcon class="h5 w5" icon="fa-solid fa-plus" />
        <p class="">add presence</p>
      </button>
      <button
        class="bg-red rounded-full text-white w-10 h-10 border-none gap-2 flex items-center justify-center"
      >
        <FAIcon class="h5 w5" icon="fa-solid fa-heart" />
      </button>
    </div>
    <NuxtImg
      placeholder
      preload
      fit="cover"
      draggable="false"
      class="absolute card-dimensions rounded-lg object-cover opacity-20"
      :src="presence.metadata.thumbnail"
      :alt="presence.metadata.service"
    />

    <div
      class="rounded-lg flex h-full"
      :style="`background: linear-gradient(135deg, ${color.main} 0%, ${color.tint} 100%); `"
    >
      <NuxtImg
        draggable="false"
        placeholder
        preload
        class="h-16 z-20 card-shadow rounded-md my-a w-16 mx-7"
        :src="presence.metadata.logo"
        :alt="presence.metadata.service"
      />
      <div class="relative my-a text-color mr-4 text-3 font-50 w-6/9">
        <h1
          class="card-shadow font-bold text-xl text-ellipsis text-nowrap overflow-hidden"
        >
          {{ presence.metadata.service }}
        </h1>
        <Transition name="card-animation" mode="out-in">
          <div :key="presence.metadata.service + '_desc'">
            <p class="card-shadow line-clamp-2 line-height-3.5">
              {{ presence.metadata.description.en }}
            </p>
          </div>
          <!-- <div v-if="!hovered" :key="presence.metadata.service + '_desc'">
            <p class="card-shadow line-clamp-2 line-height-3.5">
              {{ presence.metadata.description.en }}
            </p>
          </div>
          <div v-else-if="hovered" :key="presence.metadata.service + '_test'">
            <button
              class="h-10 w-45 mt-2 bg-primary card-shadow border-none rounded-3xl"
            >
              Add Presence
            </button>
          </div> -->
        </Transition>
      </div>
      <p class="text-color absolute right-0 shadow-tint mt-3 mr-2">
        {{ presence.users }} <FAIcon class="h-4 w-4" icon="fa-solid fa-bolt" />
      </p>
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
  filter: drop-shadow(0 0 0.3rem var(--shadow));
}
.shadow-tint {
  filter: drop-shadow(0 0 0.3rem var(--shadowTint));
}

.text-color {
  color: var(--text);
}

.card-animation-enter-active {
  transition: all 200ms cubic-bezier(0.26, 0.08, 0, 0.97);
}

.card-animation-leave-active {
  transition: all 0ms ease;
}

.card-animation-enter,
.card-animation-leave-to {
  transform: translateY(25%) scaleY(0.85);
  opacity: 0 !important;
}
</style>
