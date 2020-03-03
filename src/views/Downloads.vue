<template>
  <div class="dl-container">
    <div class="dl-container__section dl-container__section_header">
      <div class="dl-container__header">
        <div class="header__content">
          <h1>{{ $t("downloads.header.title") }}</h1>
          <p>{{ $t("downloads.header.subtitle") }}</p>
        </div>
        <div class="header__steps">
          <h2>{{ $t("downloads.instructions.heading") }}</h2>
          <ol>
            <li>
              <p>
                {{ $t("downloads.instructions.step.1") }}
                [
                <a href="#app-downloads">
                  <i class="fa-arrow-down fas"></i>
                </a>
                ]
              </p>
            </li>
            <li>
              <p>{{ $t("downloads.instructions.step.2") }}</p>
            </li>
            <li>
              <p>
                {{ $t("downloads.instructions.step.3") }}
                [
                <a href="#ext-downloads">
                  <i class="fa-arrow-down fas"></i>
                </a>
                ]
              </p>
            </li>
            <li>
              <p>
                <i18n path="downloads.instructions.step.4">
                  <nuxt-link to="/store">{{ $t("downloads.instructions.step.4.store") }}</nuxt-link>
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
      <h1 class="section-header">
        {{ $t("downloads.appdownloading.header") }}
        <a
          href="https://github.com/PreMiD/PreMiD/releases"
          target="_blank"
          class="label label_downloads-version"
          v-text="appVersion"
        ></a>
      </h1>
      <transition name="card-animation" mode="out-in"></transition>
      <div class="dl-container__cards">
        <div v-for="(platform, index) of platform_order" :key="platform">
          <div @click="open(platform)">
            <div :class="{ 'current-platform': index == 1 }" class="cards__card clickable">
              <div class="card__icon">
                <i :class="`fab fa-${platform}`"></i>
              </div>
              <div class="card__content">
                <h3>
                  {{ builds[platform].os_name }}
                  <i
                    v-if="!builds[platform].has_installer"
                    v-tippy
                    class="fa-exclamation-circle fas platform-warning"
                    :content="
                      $t('downloads.tooltips.os.not.supported.part2', {
                        0: `<b>${$t(
                          'downloads.tooltips.os.not.supported.part1'
                        )}</b> `
                      })
                    "
                  ></i>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="ext-downloads" class="dl-container__section dl-container__section_downloads">
      <h1 class="section-header">
        {{ $t("downloads.extdownloading.header") }}
        <a
          href="https://github.com/PreMiD/Extension"
          target="_blank"
          class="label label_downloads-version"
          v-text="extVersion"
        ></a>
      </h1>

      <div class="dl-container__cards">
        <div
          :class="{ 'current-platform': browser == 'chrome' }"
          class="cards__card clickable"
          @click="openInNewTab(chrome_url)"
        >
          <div class="card__icon">
            <i class="fa-chrome fab"></i>
          </div>
          <div class="card__content">
            <h3>Chromium</h3>
          </div>
        </div>

        <a
          :href="firefox_url"
          :class="{ 'current-platform': browser == 'firefox' }"
          class="cards__card clickable"
        >
          <div class="card__icon">
            <i class="fa-firefox fab"></i>
          </div>
          <div class="card__content">
            <h3>Firefox</h3>
          </div>
        </a>
      </div>
    </div>
    <title>PreMiD - Downloads</title>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Downloads",
  auth: false,
  async asyncData() {
    const { extension, app } = (
      await axios(`${process.env.apiBase}/versions`)
    ).data;

    return {
      extVersion: extension,
      appVersion: app
    };
  },
  data() {
    return {
      extVersion: null,
      appVersion: null,
      platforms: [],
      browser: null,
      windows_url: "https://dl.premid.app/PreMiD-installer.exe",
      apple_url: "https://dl.premid.app/PreMiD-installer.app.zip",
      linux_url: "",
      chrome_url:
        "https://chrome.google.com/webstore/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi",
      firefox_url: "https://dl.premid.app/PreMiD.xpi",
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
      },
      isMobile: false
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
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    )
      this.$noty.error(this.$t(`downloads.mobile.errorMessage`));

    //* Centering the current platform in array. Only works if array has 3 items.
    platform_order.splice(platform_order.indexOf(platform_temp), 1);
    platform_order.splice(1, 0, platform_temp);
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
  },

  head() {
    return {
      title: "Downloads"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/variables.scss";
</style>
