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
            class="button_black"
          >
            <i class="fab fa-github"></i>SOURCE CODE
          </button>
          <router-link replace to="/downloads">
            <button class="button_green">
              <i class="fas fa-download"></i>DOWNLOADS
            </button>
          </router-link>
        </div>
      </div>
      <div class="promo-container__presences">
        <div class="presences">
          <div class="presence" v-for="presence of presences_display" v-bind:key="presence">
            <div class="top">
              <div class="logo">
                <div
                  class="logo_image"
                  :style="'background-image: url(' + presence.profile.image + ');'"
                ></div>
              </div>
              <div class="name">
                <h2>
                  {{ presence.profile.name }}
                  <span class="id">{{ '#' + presence.profile.id }}</span>
                </h2>
              </div>
            </div>
            <div class="bottom">
              <h2>PLAYING A GAME</h2>
              <div class="service">
                <div class="service_logo">
                  <img :src="presence.service_logo">
                </div>
                <div class="details">
                  <h2>{{ presence.service }}</h2>
                  <p>
                    {{ presence.item1[0] }}
                    <br>
                    {{ presence.item1[1] }}
                  </p>
                  <p>{{ presence.item2 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "request";
import fruxh_picture from "./../assets/images/fruxh.gif";
import mulv_picture from "./../assets/images/mulv.gif";
import brilliance from "./../assets/images/brilliance.svg";
import partner from "./../assets/images/partner.svg";
import nitro from "./../assets/images/nitro.svg";
import early from "./../assets/images/early.svg";
import twitch_logo from "./../assets/images/twitch-logo.svg";
import youtube_logo from "./../assets/images/youtube-logo.svg";
import master_logo from "./../assets/images/master-logo.svg";
import soundcloud_logo from "./../assets/images/soundcloud_logo.svg";

export default {
  name: "home",
  data() {
    return {
      presences_display: [],
      presences: [
        {
          profile: {
            image:
              "https://cdn.discordapp.com/avatars/259407123782434816/a_a8fe91c6234feda015e5b1c5cdac753c.gif",
            name: "Fruxh",
            id: "3282"
          },
          service: "Twitch",
          service_logo: twitch_logo,
          item1: ["osu! World Cup 2018 Grand Finals", "osulive"],
          item2: "01:24:18 elapsed"
        },
        {
          profile: {
            image:
              "https://cdn.discordapp.com/avatars/178551656714076161/a_d0e66e232c888d6f937887ada48eaa4c.gif",
            name: "MulverineX",
            id: "0001"
          },
          service: "Masteranime",
          service_logo: master_logo,
          item1: [
            "Sword Art Online: Alicization",
            "The Legendary Hero - Episode 18"
          ],
          item2: "15:35 left"
        },
        {
          profile: {
            image:
              "https://cdn.discordapp.com/avatars/223238938716798978/321b8f503d76666f34db8ea043c93d0b.png",
            name: "Timeraa",
            id: "7947"
          },
          service: "YouTube",
          service_logo: youtube_logo,
          item1: [
            "Noisestorm - Crab Rave [Monstercat Release]",
            "Monstercat: Instinct"
          ],
          item2: "1:36 left"
        },
        // TODO: Fix SoundCloud logo.
        // {
        //   profile: {
        //     image:
        //       "https://cdn.discordapp.com/avatars/213305189657083905/f1f139ab21d7979d91bb874fbae5e91e.png",
        //     name: "Voknehzyr",
        //     id: "8754"
        //   },
        //   service: "SoundCloud",
        //   service_logo: soundcloud_logo,
        //   item1: ["Dion Timmer - Panic", "Dion Timmer"],
        //   item2: "2:15 left"
        // }
      ]
    };
  },
  mounted() {
    const length = this.$data.presences.length;
    this.$data.presences_display.push(
      this.$data.presences.splice((Math.random() * length) | 0, 1)[0],
      this.$data.presences.splice((Math.random() * (length - 1)) | 0, 1)[0]
    );
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
@import "./../stylesheets/colors.less";

.promo-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-content: center;

  padding-top: 5em;

  .promo-container__heading {
    margin-right: 60px;

    .heading__logo {
      vertical-align: middle;
      display: inline-block;
    }

    .heading__text {
      margin-left: 20px;
      vertical-align: middle;
      display: inline-block;

      h1 {
        font-size: 3.5em;
        font-family: "Discord Font";
        text-transform: uppercase;
        margin: 0;
      }

      p {
        position: relative;
        left: 3px;

        margin-left: 3px;
        font-size: 1.2em;
        margin: 0;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        max-width: 300px;
      }
    }

    .heading__button-group {
      max-width: fit-content;
      margin: 40px auto;
    }
  }

  .promo-container__presences {
    margin-left: 60px;
  }
}

.presences {
  grid-area: right;
  justify-self: right;
}

.presence {
  width: 28rem;
  height: 13.246rem;
  background: @accent-primary;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: inset 0rem -8rem #6c82cf;
  display: grid;
  color: @white;
  margin-bottom: 1rem;

  .top {
    display: flex;

    .logo {
      width: 5rem;
      height: 5rem;

      &_image {
        width: 5rem;
        height: 5rem;
        border-radius: 2.5rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }

    .name {
      margin-left: 0.8rem;
      margin-top: 1.8rem;

      h2 {
        font-size: 18px;
        font-weight: 600;

        span {
          color: hsla(0, 0%, 100%, 0.6);
          font-size: 14px;
          font-weight: 400;
        }

        margin-block-start: 0px;
        margin-block-end: 0px;
      }

      .badges {
        display: flex;
        margin-top: 0.4rem;

        .badge {
          width: 24px;
          height: 24px;
          margin-right: 0.4rem;
        }
      }
    }
  }

  .bottom {
    margin-top: 2.7rem;

    h2 {
      margin-block-start: 0px;
      margin-block-end: 0px;
      font-size: 0.8rem;
      letter-spacing: 0.06rem;
    }

    .service {
      display: flex;

      .service_logo {
        margin-top: 0.4rem;
        width: 5.5rem;
        height: 5.5rem;
      }

      .details {
        h2 {
          margin-top: 0.6rem;
        }

        p {
          font-size: 0.8rem;
          letter-spacing: 0.06rem;
          margin-block-start: 0px;
          margin-block-end: 0px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
