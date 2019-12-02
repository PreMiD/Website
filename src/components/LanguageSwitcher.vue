<template>
  <div>
    <div class="languages-container">
      <div class="languages-list">
        <button
          @click="setLanguage(lang); closeSwitcher();"
          :class="{'active': getCurrentLanguage() === lang}"
          class="languages-list__item"
          v-for="(lang, i) in $root.$data.i18nLanguageList"
          :key="`Lang${i}`"
        >{{ $t(`header.language`, lang) }}</button>
      </div>
      <a @click="closeSwitcher" class="languages-container__close">
        <i class="fas fa-times" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "language-switcher",
  methods: {
    closeSwitcher() {
      this.$parent.$data.switcherVisible = false;
    }
  }
};
</script>
