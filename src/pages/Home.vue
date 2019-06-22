<template>
  <div>
    <title>PreMiD</title>
    <div class="promo-container">
      <div class="promo-container__heading">
        <div class="heading__logo">
          <img src="./../assets/images/logo-big.svg">
        </div>
        <div class="heading__text">
          <h1>PreMiD</h1>
          <p>Let everyone know what you are watching and listening to!</p>
        </div>
        <div class="heading__button-group">
          <button
            v-on:click="openInNewTab('https://github.com/PreMiD/PreMiD')"
            class="button button_black"
          >
            <i class="fab fa-github"></i>SOURCE CODE
          </button>
          <router-link replace to="/downloads">
            <button class="button">
              <i class="fas fa-download"></i>DOWNLOADS
            </button>
          </router-link>
        </div>
      </div>
      <div class="promo-container__presences">
        <div
          class="discord-usercard"
          v-for="presence of presences_display"
          v-bind:key="presence.service"
          :v-if="presence.profile.name !== ''"
        >
          <div class="usercard__header">
            <div
              class="header__avatar"
              :style="'background-image: url(' + presence.profile.image + ');'"
            ></div>
            <div class="header__info">
              <div class="info__nameTag">
                <span class="username">{{presence.profile.name}}</span>
                <span class="discriminator">#{{presence.profile.id}}</span>
              </div>
              <div class="info__badges">
                <div
                  v-for="badge of presence.profile.badges"
                  v-bind:key="badge"
                  class="badge-wrapper"
                >
                  <div :class="`badge badge_${badge}`"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="usercard__activity">
            <div class="activity__info">
              <div class="info__header">Playing a game</div>
              <div class="info__game">
                <div class="game__icon">
                  <img class="game" :src="presence.service_logo">
                  <img
                    class="status-icon"
                    src="https://cdn.discordapp.com/app-assets/501021996336021504/501023626984816650.png"
                  >
                </div>
                <div class="game__content">
                  <div class="game__title text-row">
                    <span>{{presence.service_title}}</span>
                  </div>
                  <div class="game__st-line text-row">{{ presence.data[0] }}</div>
                  <div v-if="presence.data[1]" class="game__nd-line text-row">{{ presence.data[1] }}</div>
                  <div class="game__time text-row">{{ presence.presence_time }} left</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="features-container">
      <div class="waves-divider waves-divider_top">
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
      <div class="section-heading">
        <h1 class="section-heading__title">Some of our features</h1>
        <p class="section-heading__subtitle">
          These cards will show you our main features to help you understand what our
          extension can do!
        </p>
      </div>
      <div class="feature-cards">
        <Card
          title="Media Controls"
          desc="Most of our presences provide support for Media Controls. You can skip & pause tracks while using other applications."
          icon="fas fa-keyboard"
        />
        <Card
          title="Tab Priority"
          desc="When changing between tabs, our extension prioritizes the active one."
          icon="fas fa-laptop"
        />
        <Card
          title="Open Source"
          desc="You noticed a bug or just want to improve our code? Then you can contribute to our project on our GitHub page!"
          icon="fas fa-code"
        />
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
  </div>
</template>

<script>
import request from "request";
import twitch_logo from "./../assets/images/twitch.png";
import youtube_logo from "./../assets/images/youtube.png";
import soundcloud_logo from "./../assets/images/soundcloud.png";
import netflix_logo from "./../assets/images/netflix.png";

import Card from "../components/Card.vue";

import axios from "axios";

export default {
  name: "home",
  components: {
    Card
  },
  data() {
    return {
      presences_display: [],
      presences: [
        {
          profile: {
            DiscordID: "259407123782434816",
            badges: ["hypesquad", "balance", "early", "nitro"]
          },
          service_title: "Twitch",
          service_logo: twitch_logo,
          data: ["osu! World Cup 2018 Grand Finals", "osulive"],
          presence_time: "44:18"
        },
        {
          profile: {
            DiscordID: "465105167751315471"
          },
          service_title: "Netflix",
          service_logo: netflix_logo,
          data: ["Breaking Bad", "S5:E16 Felina"],
          presence_time: "15:35"
        },
        {
          profile: {
            DiscordID: "223238938716798978",
            badges: ["brilliance", "early"]
          },
          service_title: "YouTube",
          service_logo: youtube_logo,
          data: [
            "Noisestorm - Crab Rave [Monstercat Release]",
            "Monstercat: Instinct"
          ],
          presence_time: "1:36"
        },
        {
          profile: {
            DiscordID: "213305189657083905",
            badges: ["bravery", "early"]
          },
          service_title: "SoundCloud",
          service_logo: soundcloud_logo,
          data: ["Dion Timmer - Panic", "Dion Timmer"],
          presence_time: "2:15"
        },
        {
          profile: {
            DiscordID: "291599690812882945",
            badges: ["balance"]
          },
          service_title: "Netflix",
          service_logo: netflix_logo,
          data: ["You", "S1:E6 Amour Fou"],
          presence_time: "17:37"
        }
      ]
    };
  },
  beforeMount() {
    const Vue = this;
    const length = this.$data.presences.length;

    // Randomly selects 2 presences to display.
    this.$data.presences_display.push(
      this.$data.presences.splice((Math.random() * length) | 0, 1)[0],
      this.$data.presences.splice((Math.random() * (length - 1)) | 0, 1)[0]
    );

    // Updating user information in presence examples.
    this.$data.presences_display.forEach(function(presence_item, index) {
      // Axios provides Promises that will help us with handling errors and getting data.
      axios
        .get(
          `https://api.premid.app/credits/${presence_item.profile.DiscordID}`
        )
        .then(function(res) {
          let data = res.data;
          // TODO: Remove dirty code from here.
          Vue.$set(
            Vue.$data.presences_display[index].profile,
            "image",
            data.avatar
          );
          Vue.$set(
            Vue.$data.presences_display[index].profile,
            "name",
            data.name
          );
          Vue.$set(Vue.$data.presences_display[index].profile, "id", data.tag);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  mounted() {
    // Nothing here yet...
  },
  methods: {
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../stylesheets/colors.less";

.features-container {
  position: relative;
  z-index: 1;
  overflow: hidden;

  .feature-cards {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;

    justify-content: center;
    align-items: normal;
  }

  padding: 120px 0 150px;

  background-image: linear-gradient(125deg, #738ef5, #b3aeff);
  color: #f8f9fd;
}
</style>
