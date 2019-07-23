<template>
  <div class="dl-container">
    <div class="dl-container__section_header">
      <div class="dl-container__header">
        <div class="header__content">
          <h1>Time to show yourself to everyone.</h1>
          <p>Start using PreMiD now and show other people what you're watching or listening, maybe you will find someone
            with same interests.</p>
        </div>
        <div class="header__steps">
          <h2>Get Started</h2>
          <ul>
            <li>
              <p><span class="steps__counter">1</span> Download PreMiD.</p>
            </li>
            <li>
              <p><span class="steps__counter">2</span> Install PreMiD application.</p>
            </li>
            <li>
              <p><span class="steps__counter">3</span> Install extension for Chrome/Firefox.</p>
            </li>
            <li>
              <p><span class="steps__counter">4</span> Visit <router-link to="/store">store</router-link> page and check
                if extension has connected.</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="waves-divider waves-divider_bottom">
        <svg class="wave" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
          preserveAspectRatio="none">
          <path class="wave-animation"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="dl-container__section waves-aligned on-desktop">
      <h1>Application downloads</h1>
      <div class="dl-container__cards">
        <div v-bind:key="platform" v-for="(platform, index) of platform_order">
          <div v-on:click="open(platform)">
            <div v-bind:class="{ 'current_platform': index == 1 }" class="cards__card clickable">
              <div class="card__icon">
                <i :class="`fab fa-${platform}`"></i>
              </div>
              <div class="card__content">
                <h3>{{builds[platform].os_name}} <i v-if="!builds[platform].has_installer"
                    class="fas fa-exclamation-triangle platform_warning" /></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="browser-container on-desktop">
      <h2 class="container__header">
        <span class="header__step">2.</span> Install browser extension
      </h2>

      <div class="dl-container__cards">
        <div v-on:click="openInNewTab(chrome_url)" class="cards__card clickable">
          <div class="card__icon">
            <i class="fab fa-chrome"></i>
          </div>
          <div class="card__content">
            <h3>Chromium</h3>
            <p class="card__warning">Chrome, Edge, Opera, and etc.</p>
          </div>
        </div>

        <div v-on:click="openInNewTab(firefox_url)" class="cards__card clickable">
          <div class="card__icon">
            <i class="fab fa-firefox"></i>
          </div>
          <div class="card__content">
            <h3>Firefox</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- <h2 class="container__header"><span class="header__step">3.</span> Run the application</h2> -->
    <title>PreMiD - Downloads</title>
  </div>
</template>

<script>
  import request from "request";
  export default {
    name: "downloads",
    data() {
      return {
        platforms: [],
        windows_url: "",
        apple_url: "",
        linux_url: "",
        chrome_url: "https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
        firefox_url: "",
        platform_order: ["windows", "apple", "linux"],
        builds: {
          windows: {
            os_name: "Windows",
            has_installer: true
          },
          apple: {
            os_name: "OS X",
            has_installer: true
          },
          linux: {
            os_name: "Linux",
            has_installer: false
          }
        }
      };
    },
    mounted() {
      let ua = navigator.userAgent;
      let platform_temp = "linux";
      var platform_order = this.$data.platform_order;

      if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
      if (ua.includes("Windows")) platform_temp = "windows";

      // TODO: Find better implementation.
      // Centering the current platform in array. Only works if array has 3 items.
      platform_order.splice(platform_order.indexOf(platform_temp), 1);
      platform_order.splice(1, 0, platform_temp);
      
      request(
        "https://api.github.com/repos/PreMiD/PreMiD/releases/latest",
        (err, res, dat) => {
          if (err) {
            console.error(err);
          } else {
            let data = JSON.parse(dat);
            let win64_links = [];
            let win32_links = [];
            let mac_links = [];
            let ff_links = [];

            for (let asset of data.assets) {
              if (asset.name.endsWith("x64.exe"))
                win64_links.push(asset.browser_download_url);
              if (asset.name.endsWith("x32.exe"))
                win32_links.push(asset.browser_download_url);
              if (asset.name.endsWith("Mac.dmg"))
                mac_links.push(asset.browser_download_url);
              if (asset.name.endsWith(".xpi"))
                ff_links.push(asset.browser_download_url);
            }

            // Windows 64-bit detection
            if (ua.indexOf("WOW64") != -1 || ua.indexOf("Win64") != -1) {
              this.$data.windows_url = win64_links[0];
            } else this.$data.windows_url = win32_links[0];

            this.$data.apple_url = mac_links[0];
            this.$data.firefox_url = ff_links[0];
          }
        }
      );
    },
    methods: {
      open(platform) {
        if (platform == "linux")
          this.openInNewTab("https://github.com/PreMiD/PreMiD");
        if (platform == "windows") this.openInNewTab(this.$data.windows_url);
        if (platform == "apple") this.openInNewTab(this.$data.apple_url);
      },
      openInNewTab(url) {
        let page = window.open(url, "_blank");
      }
    }
  };

</script>

<style lang="less" scoped>
  @import "../stylesheets/variables.less";

</style>
