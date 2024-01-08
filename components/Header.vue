<script lang="ts" setup>
const { t } = useI18n(),
  links = computed(() => [
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
</script>

<template>
  <div
    class="flex items-center absolute select-none flex-justify-between top-0 w-full p-3"
  >
    <a href="/" class="color-primary font-discord font-size-8">PreMiD</a>
    <div class="lt-lg:hidden">
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="font-size-4.5 link color-link-inactive decoration-none mx2 font-900 hover-color-primary"
      >
        <span class="items-center inline-flex gap-2">
          <span
            class="inline-flex iconOutline bg-link-icon-bg border-rd-100 p-2"
          >
            <FAIcon class="h-4 w-4" :icon="link.icon" />
          </span>
          <span class="uppercase">
            {{ link.name }}
          </span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
