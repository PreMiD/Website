<template>
  <div class="dl-container">
    <div class="dl-container__section dl-container__section_header">
      <div class="dl-container__header">
        <div class="header__content">
          <h1>{{ $t('downloads.header.title') }}</h1>
          <p>{{ $t('downloads.header.subtitle') }}</p>
        </div>
        <div class="header__steps">
          <h2>{{ $t('downloads.instructions.heading') }}</h2>
          <ol>
            <li>
              <p>
                {{ $t('downloads.instructions.step.1') }}
                [
                <a href="#app-downloads">
                  <i class="fas fa-arrow-down" />
                </a>]
              </p>
            </li>
            <li>
              <p>{{ $t('downloads.instructions.step.2') }}</p>
            </li>
            <li>
              <p>
                {{ $t('downloads.instructions.step.3') }}
                [
                <a href="#ext-downloads">
                  <i class="fas fa-arrow-down" />
                </a>]
              </p>
            </li>
            <li>
              <p>
                <i18n path="downloads.instructions.step.4">
                  <nuxt-link to="/store">{{$t('downloads.instructions.step.4.store')}}</nuxt-link>
                </i18n>
              </p>
            </li>
          </ol>
        </div>
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
          />
        </svg>
      </div>
    </div>

    <div
      id="app-downloads"
      class="dl-container__section dl-container__section_downloads waves-aligned"
    >
      <h1 class="section-header">{{ $t('downloads.appdownloading.header') }}</h1>
      <div class="dl-container__cards">
        <div v-bind:key="platform" v-for="(platform, index) of platform_order">
          <div v-on:click="open(platform)">
            <div v-bind:class="{ 'current-platform': index == 1 }" class="cards__card clickable">
              <div class="card__icon">
                <i :class="`fab fa-${platform}`"></i>
              </div>
              <div class="card__content">
                <h3>
                  {{builds[platform].os_name}}
                  <i
                    v-if="!builds[platform].has_installer"
                    class="fas fa-exclamation-circle platform-warning"
                    :content="$t('downloads.tooltips.os.not.supported.part2', {0: `<b>${$t('downloads.tooltips.os.not.supported.part1')}</b> `})"
                    v-tippy
                  />
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="ext-downloads" class="dl-container__section dl-container__section_downloads">
      <h1 class="section-header">{{ $t('downloads.extdownloading.header') }}</h1>

      <div class="dl-container__cards">
        <div
          v-on:click="openInNewTab(chrome_url)"
          v-bind:class="{ 'current-platform': browser == 'chrome' }"
          class="cards__card clickable"
        >
          <div class="card__icon">
            <i class="fab fa-chrome"></i>
          </div>
          <div class="card__content">
            <h3>Chromium</h3>
          </div>
        </div>

        <div
          v-on:click="openInNewTab(firefox_url)"
          v-bind:class="{ 'current-platform': browser == 'firefox' }"
          class="cards__card clickable"
        >
          <div class="card__icon">
            <i class="fab fa-firefox"></i>
          </div>
          <div class="card__content">
            <h3>Firefox</h3>
          </div>
        </div>
      </div>
    </div>
    <title>PreMiD - Downloads</title>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "downloads",
  head() {
    return {
      title: "Downloads"
    };
  },
  data() {
    return {
      platforms: [],
      browser: null,
      windows_url: "",
      apple_url: "",
      linux_url: "",
      chrome_url:
        "https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
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
    let ua = "";

    if (process.browser) ua = navigator.userAgent;

    //* Browser detection.
    // Thanks to https://stackoverflow.com/a/9851769 for providing code.
    if (
      !!window.chrome &&
      (!!window.chrome.webstore || !!window.chrome.runtime)
    ) {
      this.$data.browser = "chrome";
    } else if (typeof InstallTrigger !== "undefined") {
      this.$data.browser = "firefox";
    }

    let platform_temp = "linux";
    var platform_order = this.$data.platform_order;

    if (ua.includes("OS X") || ua.includes("Mac")) platform_temp = "apple";
    if (ua.includes("Windows")) platform_temp = "windows";

    //* Centering the current platform in array. Only works if array has 3 items.
    platform_order.splice(platform_order.indexOf(platform_temp), 1);
    platform_order.splice(1, 0, platform_temp);

    axios("https://api.github.com/repos/PreMiD/PreMiD/releases/latest").then(
      ({ data, err }) => {
        if (err) {
          console.error(err);
        } else {
          let win64_links = [];
          let win32_links = [];
          let mac_links = [];
          let ff_links = [];

          for (let asset of data.assets) {
            if (asset.name.endsWith("x64.exe"))
              win64_links.push(asset.browser_download_url);
            if (asset.name.endsWith("x32.exe"))
              win32_links.push(asset.browser_download_url);
            if (
              asset.name.endsWith(".app.zip") ||
              asset.name.endsWith(".tar.gz")
            )
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

<style lang="scss" scoped>
@import "../stylesheets/variables.scss";
</style>
