<template>
  <div id="footer">
    <div class="footer-grid">
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.usercount.heading`)" />
        <div class="section__promo">
          <p v-text="$t(`footer.usercount.message`, [$data.installStats])" />
          <nuxt-link class="button" replace to="/downloads" v-text="$t(`footer.usercount.button`)" />
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.partners.heading`)" />
        <div class="section__promo">
          <a class="partner-logo" href="https://installbuilder.bitrock.com/">
            <img src="~/assets/images/bitrock_installbuilder.png" />
          </a>
          <a class="partner-logo" href="https://statuspage.io/">
            <img src="~/assets/images/atlassian_statuspage.svg" />
          </a>
          <a class="partner-logo" href="https://www.crowdin.com/">
            <img src="~/assets/images/crowdin.png" />
          </a>
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.developers.heading`)" />
        <div>
          <a href="https://docs.premid.app/" v-text="$t(`footer.developers.documentation`)" />
          <a
            href="https://discordapp.com/rich-presence/"
            v-text="$t(`footer.developers.richpresence`)"
          />
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.supportus.heading`)" />
        <div>
          <a href="https://patreon.com/timeraa/" v-text="$t(`footer.supportus.donate`)" />
          <a href="https://github.com/PreMiD/" v-text="$t(`footer.supportus.contribute`)" />
          <a href="https://translate.premid.app/" v-text="$t(`footer.supportus.translate`)" />
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.help.heading`)" />
        <div>
          <a href="https://wiki.premid.app/" v-text="$t(`footer.help.troubleshooting`)" />
          <a href="https://discord.gg/premid/" v-text="$t(`footer.help.getsupport`)" />
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.help.information`)" />
        <div>
          <nuxt-link to="/cookies" v-text="$t(`footer.help.information.cookies`)" />
          <nuxt-link to="/privacy" v-text="$t(`footer.help.information.privacy`)" />
          <nuxt-link to="/tos" v-text="$t(`footer.help.information.terms`)" />
        </div>
      </div>
      <div class="grid__section">
        <p class="section__title" v-text="$t(`footer.more.heading`)" />
        <div>
          <a href="https://status.premid.app/" v-text=" $t(`footer.more.status`)" />
          <a href="https://discord.gg/premid">Discord</a>
          <a href="https://github.com/PreMiD/">GitHub</a>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <p
        v-html="$t('footer.copyright.line1').replace('{0}', '<i class=\'far fa-copyright\'></i> 2019 PreMiD').replace('{1}', '<a class=\'hover-effect\' href=\'https://github.com/Timeraa/\'>Timeraa</a> & <a class=\'hover-effect\' href=\'https://github.com/Fruxh/\'>Fruxh</a>')"
      />
      <i18n path="footer.copyright.line2" tag="p">
        <a class="hover-effect" href="https://iryzhenkov.ru/">Voknehzyr</a>
      </i18n>
      <p class="footer__language-switcher">
        {{ $t(`footer.language`) }}:
        <a
          class="hover-effect"
          @click="toggleSwitcher"
        >{{ $t(`header.language`)}}</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      installStats: 0
    };
  },
  methods: {
    toggleSwitcher() {
      this.$parent.$data.switcherVisible = !this.$parent.$data.switcherVisible;
    }
  },
  mounted() {
    let self = this;

    axios("https://api.premid.app/users").then(({ data }) => {
      self.$data.installStats = data.chrome
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });
  }
};
</script>
