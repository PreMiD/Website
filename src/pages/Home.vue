<template>
  <div>
    <title>PreMiD</title>
    <div class="promo-container">
      <div class="promo-container__heading">
        <div data-aos="sliding-down" class="heading__logo">
          <img src="./../assets/images/logo.gif" />
        </div>
        <div class="heading__text">
          <h1>PreMiD</h1>
          <p>{{ $t(`home.introduction.catchphrase`) }}</p>
        </div>
        <div class="heading__button-group">
          <a class="button button_uppercase" href="#features">
            <i class="fas fa-stream"></i>
            Our features
          </a>
          <router-link class="button button_black button_uppercase" replace to="/downloads">
            <i class="fas fa-file-export"></i>
            {{ $t(`home.introduction.button.downloads`) }}
          </router-link>
        </div>
      </div>
      <div class="promo-container__presences">
        <div
          data-aos="sliding-down"
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
                  <div v-if="badge == 'brilliance' || badge == 'bravery' || badge == 'balance'" v-tippy="{content: 'HypeSquad ' + badge.charAt(0).toUpperCase() + badge.slice(1)}" :class="`badge badge_${badge}`"></div>
                  <div v-if="badge == 'early'" v-tippy="{content: 'Early Supporter'}" :class="`badge badge_${badge}`"></div>
                  <div v-if="badge == 'hypesquad'" v-tippy="{content: 'HypeSquad Events'}" :class="`badge badge_${badge}`"></div>
                  <div v-if="badge == 'nitro'" v-tippy="{content: 'Discord Nitro'}" :class="`badge badge_${badge}`"></div>
                  <div v-if="badge == 'boost-lvl3'" v-tippy="{content: 'Nitro Boosting'}" :class="`badge badge_${badge}`"></div>

                </div>
              </div>
            </div>
          </div>
          <div class="usercard__activity">
            <div class="activity__info">
              <div class="info__header">{{ $t(`home.examples.playingagame`) }}</div>
              <div class="info__game">
                <div class="game__icon">
                  <img
                    v-if="presence.smallImage == false"
                    class="game"
                    style="-webkit-mask: none;"
                    alt="./../assets/images/logo-big.svg"
                    :src="presence.service_logo"
                    v-tippy="{content: 'PreMiD v2.0'}"
                  />
                  <img
                    v-if="presence.smallImage == true"
                    class="game"
                    alt="./../assets/images/logo-big.svg"
                    :src="presence.service_logo"
                    v-tippy="{content: 'PreMiD v2.0'}"
                  />
                  <img
                    v-if="presence.smallImage == true"
                    class="status-icon"
                    src="https://cdn.discordapp.com/app-assets/501021996336021504/501023626984816650.png"
                    v-tippy="{content: 'Playing back'}"
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
    <div class="features-container" id="features">
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
      <div class="section-heading section-heading__features">
        <h1 class="section-heading__title">You will love these features!</h1>
      </div>
      <div class="container section-container">
        <div data-aos="sliding-left" class="section-container__details">
          <h1>
            Find
            <span class="text-highlight">your</span> presence.
          </h1>
          <p>{{ $t('home.cards.presencesystem.explanation') }}</p>
          <p>
            <a class="button button_large" href="/store">Open store</a>
          </p>
        </div>
        <div data-aos="sliding-right" class="section-container__promo">
          <img class="section-container__promo--image1" :src="cardThumbnail1" />
        </div>
      </div>
      <div class="container section-container section-container_reverse">
        <div data-aos="sliding-down" class="section-container__details">
          <h1>Simple user interface.</h1>
          <p>Tired of complicated user interfaces? That's why we created a simple and useful interface with only important functions included:</p>
          <ul>
            <li>
              <p>App and Extension settings.</p>
            </li>
            <li>
              <p>Presence management.</p>
            </li>
            <li>
              <p>Sorting by category.</p>
            </li>
          </ul>
        </div>
        <div data-aos="sliding-left-2" class="section-container__promo">
          <video autoplay loop>
            <source src="./../assets/images/cards/card2_video.mp4" type="video/mp4" />
            <img class="section-container__promo--image2" :src="cardThumbnail2" />
          </video>
        </div>
      </div>
      <!-- <div class="container section-container section-container_alternative">
        <div data-aos="sliding-down" class="section-container__details">
          <h1>Not enough languages.</h1>
          <p>We know that we have users using our software around the globe and we're providing everyone an ability to translate our extension and app to your language!</p>
        </div>
        <div data-aos="sliding-down" class="section-container__promo">
          <img class="section-container__promo--image1" :src="cardThumbnail3">
        </div>
      </div>-->
      <div class="container section-container">
        <div data-aos="sliding-left" class="section-container__details">
          <h1>Quick support.</h1>
          <p>Something is glitching or sending you tons of errors? We will help you to get rid of that on our Discord sever, we also developed a support system that will make your life easier.</p>
          <p>
            <a class="button button_large" href="https://discord.gg/premid">Visit our server</a>
          </p>
        </div>
        <div data-aos="sliding-down" class="section-container__promo">
          <img class="section-container__promo--image1" :src="cardThumbnail4" />
        </div>
      </div>
      <!-- <div data-aos="sliding-down" class="feature-cards">
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
      </div>-->
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
import premid_logo from "./../assets/images/premid-presence.png";
import steam_logo from "./../assets/images/steam.png";

import cardThumbnail1 from "./../assets/images/cards/card1.png";
import cardThumbnail2 from "./../assets/images/cards/card2.png";
import cardThumbnail3 from "./../assets/images/cards/card3.png";
import cardThumbnail4 from "./../assets/images/cards/card4.png";

import Card from "../components/Card.vue";

import axios from "axios";

export default {
  name: "home",
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
          service_title: "PreMiD",
          service_logo: premid_logo,
          smallImage: false,
          data: ["Store"],
          presence_time: "00:12"
        },
                {
          profile: {
            DiscordID: "223238938716798978",
            badges: ["brilliance", "nitro"]
          },
          service_title: "YouTube",
          service_logo: youtube_logo,
          smallImage: true,
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
          smallImage: true,
          data: ["Dion Timmer - Panic", "Dion Timmer"],
          presence_time: "2:15"
        },
        {
          profile: {
            DiscordID: "515668127829458945",
            badges: ["balance"]
          },
          service_title: "YouTube Music",
          service_logo: youtube_music_logo,
          smallImage: true,
          data: ["supercombo - Piloto Automático (Clipe Oficial)", "supercombo"],
          presence_time: "00:26"
        },
        {
          profile: {
            DiscordID: "293828021134295040",
            badges: ["brilliance"]
          },
          service_title: "Steam",
          service_logo: steam_logo,
          smallImage: false,
          data: ["Steam Store", "F1 2019"],
          presence_time: "03:32"
        },
        {
          profile: {
            DiscordID: "163319338403627008",
            badges: ["brilliance", "early", "nitro", "boost-lvl3"]
          },
          service_title: "YouTube Music",
          service_logo: youtube_music_logo,
          smallImage: true,
          data: ["Dance Monkey", "Tones and I - The Kids Are Coming (2019)"],
          presence_time: "3:12"
        },
        {
          profile: {
            DiscordID: "241278257335500811",
            badges: ["balance", "early", "nitro"]
          },
          service_title: "Twitch",
          service_logo: twitch_logo,
          smallImage: true,
          data: ["Just Chattin", "Bas950"],
          presence_time: "49:12"
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
          if(error.request) Vue.$router.push({path: '/maintenance'});
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
