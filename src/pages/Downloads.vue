<template>
<div>
  <div class="dl-container">
    <div class="dl-container__content">
      <h2 class="dl-container__header">Downloads</h2>
    </div>
  
          <div class="waves-divider waves-divider_bottom">
        <svg
          class="wave"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            class="wave-animation"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

  </div>
    <!-- <title>PreMiD - Downloads</title>
    <center>
      <h2 class="title">Downloads</h2>
      <h2>Application</h2>
      <div class="platforms">
        <i
          v-for="(platform, index) of platforms"
          v-bind:key="platform"
          :title="platform"
          v-on:click="open(platform)"
          :class="'logo fab fa-' + platform + ' pp' + index"
        ></i>
      </div>
      <p>
        Support
        <span class="premid">PreMiD</span> financially and receive the latest dev-builds
      </p>
      <h2>Extension</h2>
      <div class="browsers">
        <i class="logo fab fa-chrome" v-on:click="openInNewTab(chrome_url)"></i>
        <i class="logo fab fa-firefox" v-on:click="openInNewTab(firefox_url)"></i>
      </div>
    </center> -->
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
      chrome_url:
        "https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
      firefox_url: ""
    };
  },
  mounted() {

    let ua = navigator.userAgent;
    let platform_temp = "linux";
    let platforms_temp = ["windows", "apple", "linux"];

    if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
    if (ua.includes("Windows")) platform_temp = "windows";

    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    }

    platforms_temp = arrayRemove(platforms_temp, platform_temp);
    this.$data.platforms.push(platforms_temp[0]);
    this.$data.platforms.push(platform_temp);
    this.$data.platforms.push(platforms_temp[1]);

    request(
      "https://api.github.com/repos/PreMiD/PreMiD/releases",
      (err, res, dat) => {
        if (err) console.log(err);
        else {
          let data = JSON.parse(dat);
          let win64_links = [];
          let win32_links = [];
          let mac_links = [];
          let ff_links = [];
          for (let release of data) {
            for (let asset of release.assets) {
              if (asset.name.includes("x64.exe"))
                win64_links.push(asset.browser_download_url);
              if (asset.name.includes("x32.exe"))
                win32_links.push(asset.browser_download_url);
              if (asset.name.includes("Mac.dmg"))
                mac_links.push(asset.browser_download_url);
              if (asset.name.includes(".xpi"))
                ff_links.push(asset.browser_download_url);
            }
          }
          if (ua.includes("x32")) this.$data.windows_url = win32_links[0];
          else this.$data.windows_url = win64_links[0];
          this.$data.apple_url = mac_links[0];
          this.$data.firefox_url = ff_links[0];
        }
      }
    );
  },
  methods: {
    open(platform) {
      if (platform == "linux")
        this.openInNewTab(
          "https://github.com/PreMiD/PreMiD/archive/stable.zip"
        );
      if (platform == "windows") this.openInNewTab(this.$data.windows_url);
      if (platform == "apple") this.openInNewTab(this.$data.apple_url);
    },
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="less" scoped>

@import "../stylesheets/colors.less";

</style>
