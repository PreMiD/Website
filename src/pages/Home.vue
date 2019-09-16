<template>
  <div>
    <title>PreMiD</title>
    <div class="promo-container">
      <div class="promo-container__heading">
        <div class="heading__logo">
          <img src="./../assets/images/logo-big.svg" />
        </div>
        <div class="heading__text">
          <h1>PreMiD</h1>
          <p>{{ $t(`home.introduction.catchphrase`) }}</p>
        </div>
        <div class="heading__button-group">
          <a class="button button_black button_uppercase" href="https://github.com/PreMiD" target="_blank">
            <i class="fab fa-github"></i>
            SOURCE CODE
          </a>
          <router-link class="button button_uppercase" replace to="/downloads">
            <i class="fas fa-file-export"></i>
            {{ $t(`home.introduction.button.downloads`) }}
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
              <div class="info__header">{{ $t(`home.examples.playingagame`) }}</div>
              <div class="info__game">
                <div class="game__icon">
                  <img class="game" alt="./../assets/images/logo-big.svg" :src="presence.service_logo" v-tippy="{content: 'PreMiD v2.0'}"/>
                  <img
                    class="status-icon"
                    src="https://cdn.discordapp.com/app-assets/501021996336021504/501023626984816650.png"
                  />
                </div>
                <div class="game__content">
                  <div class="game__title text-row">
                    <span>{{presence.service_title}}</span>
                  </div>
                  <div class="game__st-line text-row">{{ presence.data[0] }}</div>
                  <div v-if="presence.data[1]" class="game__nd-line text-row">{{ presence.data[1] }}</div>
                  <div
                    class="game__time text-row"
                  >{{ $t(`home.examples.timestamp`, [presence.presence_time]) }}</div>
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
          />
        </svg>
      </div>
      <div data-aos="sliding-down" class="section-heading">
        <h1 class="section-heading__title">{{ $t('home.cards.heading') }}</h1>
        <p class="section-heading__subtitle">{{ $t('home.cards.subheading') }}</p>
      </div>
      <div data-aos="sliding-down" class="feature-cards">
        <Card
          :title="$t('home.cards.presencesystem.title')"
          :desc="$t('home.cards.presencesystem.explanation')"
          icon="fas fa-puzzle-piece"
          :image="cardThumbnail1"
        />
        <Card
          :title="$t('home.cards.mediacontrols.title')"
          :desc="$t('home.cards.mediacontrols.explanation')"
          icon="fas fa-keyboard"
          theme="media"
          :image="cardThumbnail2"
        />
        <Card
          :title="$t('home.cards.multilingual.title')"
          :desc="$t('home.cards.multilingual.explanation')"
          icon="fas fa-laptop"
          theme="lang"
          :image="cardThumbnail3"
        />
        <Card
          :title="$t('home.cards.opensource.title')"
          :desc="$t('home.cards.opensource.explanation')"
          icon="fas fa-code"
          theme="opensource"
          :image="cardThumbnail4"
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
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import twitch_logo from "./../assets/images/twitch.png";
import youtube_logo from "./../assets/images/youtube.png";
import soundcloud_logo from "./../assets/images/soundcloud.png";
import netflix_logo from "./../assets/images/netflix.png";
import youtube_music_logo from "./../assets/images/youtube-music.png";

import cardThumbnail1 from "./../assets/images/cards/card1.png";
import cardThumbnail2 from "./../assets/images/cards/card2.png";
import cardThumbnail3 from "./../assets/images/cards/card3.png";
import cardThumbnail4 from "./../assets/images/cards/card4.png";

import Card from "../components/Card.vue";

import axios from "axios";

export default {
  name: "home",
  components: {
    Card
  },
  data() {
    return {
      cardThumbnail1,
      cardThumbnail2,
      cardThumbnail3,
      cardThumbnail4,
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
            DiscordID: "515668127829458945",
            badges: ["balance", "nitro", "boost-lvl3"]
          },
          service_title: "YouTube Music",
          service_logo: youtube_music_logo,
          data: ["Old Town Road [cover]", "senzawa"],
          presence_time: "00:26"
        },
        {
          profile: {
            DiscordID: "223238938716798978",
            badges: ["brilliance", "nitro"]
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
      Vue.$root.isProcessing = true;
      axios(`https://api.premid.app/credits/${presence_item.profile.DiscordID}`)
        .then(function(res) {
          let data = res.data;
          let presence = Vue.$data.presences_display[index];

          Vue.$set(presence.profile, "image", data.avatar);
          Vue.$set(presence.profile, "name", data.name);
          Vue.$set(presence.profile, "id", data.tag);
        })
        .catch(function(error) {
          Vue.errorMessage(error);
        })
        .finally(() => {
          Vue.$root.isProcessing = false;
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
@import "../stylesheets/variables.less";
</style>
