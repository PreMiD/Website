<template>
  <div id="app">
    <header>
      <navigation/>
    </header>
    <div class="page-wrapper">
      <div id="content">
        <transition name="route-animation" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div id="footer">
        <div class="footer-grid">
          <div class="grid__section">
            <p class="section__title">Ready to try PreMiD?</p>
            <div class="section__promo">
<<<<<<< HEAD
              <p v-if="this.installStats != null">Join over {{installStats}} users today!</p>
=======
              <p>Join over 8 thousand users today!</p>
>>>>>>> 1d0763b2081b6daaf819a33c0e62d9e4e3cd854c
              <router-link class="button" replace to="/downloads">INSTALL</router-link>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Partners</p>
            <div class="section__promo">
              <a class="partner-logo" href="https://poeditor.com/">
                <img src="./assets/images/poeditor.png">
              </a>
              <a class="partner-logo" href="https://gitbook.com/">
                <img src="./assets/images/gitbook.png">
              </a>
              <a class="partner-logo" href="https://installbuilder.bitrock.com/">
                <img src="./assets/images/bitrock_installbuilder.png">
              </a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Developers</p>
            <div>
              <a href="https://docs.premid.app/">Documentation</a>
              <a href="https://discordapp.com/rich-presence/">Rich Presence</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Support us</p>
            <div>
              <!-- // TODO finish after V2
              <a v-on:click="openNavigation()">Donate</a>-->
              <a href="https://patreon.com/timeraa/">Donate</a>
              <a href="https://github.com/PreMiD/">Contribute</a>
              <a href="https://discord.premid.app/">Design</a>
              <a href="https://poeditor.com/join/project/Zzl1oOQV5g/">Translate</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Help</p>
            <div>
              <a href="https://wiki.premid.app/troubleshooting/troubleshooting/">Troubleshooting</a>
              <a href="https://discord.premid.app/">Get Support</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">More</p>
            <div>
              <a href="https://status.premid.app/">Status</a>
              <a href="https://discord.premid.app/">Discord</a>
              <a href="https://github.com/PreMiD/">GitHub</a>
              <a href="https://wiki.premid.app/">Wiki</a>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <p>
            <i class="far fa-copyright"></i> 2019 PreMiD by
            <a class="hover-effect" href="https://github.com/Timeraa/">Timeraa</a> &
            <a class="hover-effect" href="https://github.com/Fruxh/">Fruxh</a>
          </p>
          <p>
            Website design by
            <a class="hover-effect" href="https://voknehzyr.ru/">Voknehzyr</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";

export default {
  name: "premid-web",
  components: {
    Navigation
  },
  methods: {
    isElementVisible(elm) {
      var rect = elm.getBoundingClientRect();
      var viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  },
  created() {
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
      extension_installed: false,
      installStats: null
    };
  }
};
</script>

<style lang="less">
@import "./stylesheets/root.less";
</style>
