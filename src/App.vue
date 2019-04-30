<template>
  <div id="app">
    <header>
      <navigation />
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
              <p>Join over 6 thousand users today!</p>
              <router-link class="button" replace to="/downloads">INSTALL</router-link>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Partners</p>
            <div class="section__promo">
              <a class="poeditor-logo" href="https://poeditor.com/">
                <span class="poeditor-logo__title">POEditor</span>
              </a>
              <a class="gitbook-logo" href="https://gitbook.com/">
                <img src="./assets/images/gitbook.png">
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
              <a v-on:click="openNavigation()">Donate</a>
              <a href="https://github.com/PreMiD/">For coders</a>
              <a href="https://discord.premid.app/">For designers</a>
              <a href="https://poeditor.com/join/project/Zzl1oOQV5g/">For translators</a>
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
            <a href="https://github.com/Timeraa/">Timeraa</a> &
            <a href="https://github.com/Fruxh/">Fruxh</a>
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
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
      }
    },
    data() {
      return {
        ua: navigator.userAgent
      };
    },
    mounted() {}
  };

</script>

<style lang="less">
  @import "./stylesheets/root.less";

</style>
