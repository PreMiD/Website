<template>
  <div>
    <div class="languages-container">
      <div class="languages-list">
        <button
          v-for="(lang, i) in $root.$data.i18nLanguageList"
          :key="`Lang${i}`"
          :class="{ active: getCurrentLanguage() === lang }"
          class="languages-list__item"
          @click="
            setLanguage(lang)
            closeSwitcher()
          "
        >
          {{ $t(`header.language`, lang) }}
        </button>
      </div>
      <a class="languages-container__close" @click="closeSwitcher">
        <i class="fa-times fas"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  methods: {
    closeSwitcher() {
      this.$parent.$data.switcherVisible = false
    }
  }
}
</script>
