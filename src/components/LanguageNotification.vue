<template>
  <div>
    <div v-for="lang in $root.$data.i18nLanguageList" v-bind:key="lang">
      <div
        class="language-notify__wrapper"
        v-if="!declined && getBrowserLanguage() === lang && getCurrentLanguage() !== lang"
      >
        <div class="language-notify">
          <div class="language-notify__content">
            <h2>{{ $t(`header.languageNotification.title`, lang) }}</h2>
            <p>{{ $t(`header.languageNotification.text`, lang) }}</p>
          </div>
          <div class="language-notify__buttons">
            <a
              class="button button_small"
              @click="setLanguage(lang)"
              href="#"
            >{{ $t(`header.languageNotification.btnAccept`, lang) }}</a>
            <a
              class="button button_small"
              @click="declineNotify()"
              href="#"
            >{{ $t(`header.languageNotification.btnDecline`, lang) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "language-notification",
  data() {
    return {
      declined: false
    };
  },
  methods: {
    declineNotify() {
      if (process.server) return;
      localStorage.declined = true;
      this.$data.declined = localStorage.declined;
    }
  },
  created() {
    if (process.server) return;
    if (localStorage.declined !== "false")
      this.$data.declined = localStorage.declined;
  }
};
</script>
