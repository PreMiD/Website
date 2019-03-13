<template>
  <div class="main">
    <title>PreMiD - Downloads</title>
    <center>
      <h2 class="title">Downloads</h2>
      <h2>Application</h2>
      <div class="platforms">
        <i v-for="(platform, index) of platforms" v-bind:key="platform" :title="platform" v-on:click="open(platform)" :class="'logo fab fa-' + platform + ' pp' + index"></i>
      </div>
      <p>Support <span class="premid">PreMiD</span> financially and receive the latest builds</p>
      <h2>Extension</h2>
      <div class="browsers">
        <i class="logo fab fa-chrome" v-on:click="openInNewTab(chrome_url)"></i>
        <i class="logo fab fa-firefox" v-on:click="openInNewTab(firefox_url)"></i>
      </div>
    </center>
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
      chrome_url: "https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
      firefox_url: "",
    };
  },
  mounted() {
    let ua = navigator.userAgent;
    let platform_temp = "linux";
    let platforms_temp = ["windows","apple","linux"];

    if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
    if (ua.includes("Windows")) platform_temp = "windows";

    function arrayRemove(arr, value) {
      return arr.filter(function(ele){
          return ele != value;
      });
    }
    
    platforms_temp = arrayRemove(platforms_temp, platform_temp)
    this.$data.platforms.push(platforms_temp[0]);
    this.$data.platforms.push(platform_temp);
    this.$data.platforms.push(platforms_temp[1]);

    request("https://api.github.com/repos/PreMiD/PreMiD/releases", (err, res, dat) => {
      if (err) console.log(err);
      else {
        let data = JSON.parse(dat);
        let win64_links = [];
        let win32_links = [];
        let mac_links = [];
        let ff_links = [];
        for (let release of data.slice(0,4)) {
          for(let asset of release.assets) {
            if(asset.name.includes("x64.exe")) win64_links.push(asset.browser_download_url);
            if(asset.name.includes("x32.exe")) win32_links.push(asset.browser_download_url);
            if(asset.name.includes("Mac.dmg")) mac_links.push(asset.browser_download_url);
            if(asset.name.includes("fx.xpi")) ff_links.push(asset.browser_download_url);
          }
        }
        if (ua.includes("x32")) this.$data.windows_url = win32_links[0];
        else this.$data.windows_url = win64_links[0];
        this.$data.apple_url = mac_links[0];
        this.$data.firefox_url = ff_links[0];
      }
    })
  },
  methods: {
    open(platform) {
      if (platform == "linux") this.openInNewTab("https://github.com/PreMiD/PreMiD/archive/stable.zip");
      if (platform == "windows") this.openInNewTab(this.$data.windows_url)
      if (platform == "apple") this.openInNewTab(this.$data.apple_url)
    },
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main {
  padding: 2.5rem;
  color: #99AAB5;
}

.title {
  color: @accent-primary;
}

h2 {
  font-family: 'Discord Font';
  font-size: 2.7rem;
  line-height: 2rem;
}

.logo {
  background: @background-secondary;
  color: @accent-primary;
  font-size: 6.5rem;
  padding: 1rem;
  margin: .6rem;
  width: 7rem;
  height: 7rem;
  border-radius: .8rem;
  cursor: pointer;

  &.pp1 {
    background: @accent-primary;
    color: @background-primary;
    font-size: 6.8rem;
    padding: 1.2rem;
    margin: .7rem;
  }

  @t-time: 160ms;
  transition: background @t-time, color @t-time, margin @t-time, width @t-time, height @t-time, -webkit-background-clip @t-time, -webkit-text-fill-color @t-time;
  
  &:hover {
    color: rgba(255,255,255,1);
    transition: background @t-time, color @t-time, margin @t-time, width @t-time, height @t-time, -webkit-background-clip @t-time, -webkit-text-fill-color @t-time;
    margin: .5rem;
    width: 7.2rem;
    height: 7.2rem;
    &.fa- {
      &apple {
        background: #922e2e;
      }
      &windows {
        background: #3276bc;
      }
      &linux {
        background: #f5bd0c;
      }
      &firefox {
        margin: .6rem;
        width: 7rem;
        height: 7rem;
      }
      &chrome {
        margin: .6rem;
        width: 7rem;
        height: 7rem;
      }
    }
  }
}

.premid {
  font-family: 'Discord Font';
}

</style>
