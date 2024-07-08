<script setup lang="ts">
import type { ContributorsQuery } from "#gql";

const { string, contributors } = defineProps<{
  string: string;
  contributors: NonNullable<ContributorsQuery["credits"]>;
}>();
</script>

<template>
  <div class="justify-center my-10">
    <h1 class="color-primary font-discord font-size-10 mb-2">
      {{ $t(string) }}
    </h1>
    <div class="inline-flex flex-wrap gap-3">
      <ContributorCard
        v-for="(item, i) in contributors"
        :key="i"
        :user="item"
      />
    </div>
  </div>
</template>
