<template>
  <div id="app">
    <transition name="loader" mode="out-in">
      <Loader v-if="$root.isProcessing" />
    </transition>
    <LanguageSwitcher v-if="$root.switcherVisible" />
    <transition name="route-animation" mode="out-in">
      <LanguageNotification />
    </transition>
    <header>
      <navigation />
    </header>
    <div class="page-wrapper">
      <div class="content">
        <transition name="route-animation" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div id="footer">
        <div class="footer-grid">
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.usercount.heading`) }}</p>
            <div class="section__promo">
              <p v-if="this.installStats != null">{{ $t(`footer.usercount.message`, [installStats]) }}</p>
              <router-link class="button" replace to="/downloads">{{ $t(`footer.usercount.button`) }}</router-link>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.partners.heading`) }}</p>
            <div class="section__promo">
              <a class="partner-logo" href="https://gitbook.com/">
                <img src="./assets/images/gitbook.png" />
              </a>
              <a class="partner-logo" href="https://installbuilder.bitrock.com/">
                <img src="./assets/images/bitrock_installbuilder.png" />
              </a>
              <a class="partner-logo" href="https://statuspage.io/">
                <img src="./assets/images/atlassian_statuspage.svg" />
              </a>
              <a class="partner-logo" href="https://www.crowdin.com/">
                <img src="./assets/images/crowdin.png" />
              </a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.developers.heading`) }}</p>
            <div>
              <a href="https://docs.premid.app/">{{ $t(`footer.developers.documentation`) }}</a>
              <a href="https://discordapp.com/rich-presence/">{{ $t(`footer.developers.richpresence`) }}</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.supportus.heading`) }}</p>
            <div>
              <a href="https://patreon.com/timeraa/">{{ $t(`footer.supportus.donate`) }}</a>
              <a href="https://github.com/PreMiD/">{{ $t(`footer.supportus.contribute`) }}</a>
              <a href="https://discord.premid.app/">{{ $t(`footer.supportus.design`) }}</a>
              <a href="https://translate.premid.app/">{{ $t(`footer.supportus.translate`) }}</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.help.heading`) }}</p>
            <div>
              <a
                href="https://wiki.premid.app/troubleshooting/troubleshooting/">{{ $t(`footer.help.troubleshooting`) }}</a>
              <a href="https://discord.premid.app/">{{ $t(`footer.help.getsupport`) }}</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.help.information`) }}</p>
            <div>
              <router-link to="/cookies">{{ $t(`footer.help.information.cookies`) }}</router-link>
              <router-link to="/privacy">{{ $t(`footer.help.information.privacy`) }}</router-link>
              <router-link to="/tos">{{ $t(`footer.help.information.terms`) }}</router-link>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">{{ $t(`footer.more.heading`) }}</p>
            <div>
              <a href="https://status.premid.app/">{{ $t(`footer.more.status`) }}</a>
              <a href="https://discord.premid.app/">Discord</a>
              <a href="https://github.com/PreMiD/">GitHub</a>
              <a href="https://wiki.premid.app/">{{ $t(`footer.more.wiki`) }}</a>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <p
            v-html="$t('footer.copyright.line1').replace('{0}', '<i class=\'far fa-copyright\'></i> 2019 PreMiD').replace('{1}', '<a class=\'hover-effect\' href=\'https://github.com/Timeraa/\'>Timeraa</a> & <a class=\'hover-effect\' href=\'https://github.com/Fruxh/\'>Fruxh</a>')">
          </p>
          <i18n path="footer.copyright.line2" tag="p">
            <a place="0" class="hover-effect" href="https://iryzhenkov.ru/">Voknehzyr</a>
          </i18n>
          <p class="footer__language-switcher">
            {{ $t(`footer.language`) }}:
            <a class="hover-effect" href="javascript:void(0);"
              @click="$root.switcherVisible = true;">{{ $t(`header.language`)}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation.vue";
  import Detection from "./components/mixins/Detection";

  export default {
    name: "premid-web",
    components: {
      Navigation
    },
    mixins: [Detection],
    created() {
      this.$root.$data.i18nLanguageList = this.$i18n.availableLocales;

      if (localStorage.language !== undefined) {
        this.$root.$i18n.locale = localStorage.language;
      }

      this.$root.$data.navigatorLanguage = this.getBrowserLanguage();
      this.$root.$data.i18nLanguage = this.getCurrentLanguage();

      fetch("https://api.premid.app/users")
        .then(res => res.json())
        .then(
          json =>
          (this.installStats = json.chrome
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."))
        );
    },
    data() {
      return {
        ua: navigator.userAgent,
        installStats: null
      };
    }
  };

</script>
