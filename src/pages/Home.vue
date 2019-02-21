<template>
  <div class="main">
    <title>PreMiD</title>
    <div class="container">
      <div class="top">
        <div class="main-container">
          <div class="logo">
            <img src="./../assets/images/logo-big.svg">
          </div>
          <div class="right">
            <img src="./../assets/images/premid.svg" class="premid">
            <div class="desc">
              <span>Let everyone know what you are watching and listening to!</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <button v-on:click="openInNewTab('https://github.com/PreMiD/PreMiD')" class="github">
          <i class="fab fa-github"></i>LEARN MORE
        </button>
        <router-link replace to="/Downloads">
          <button class="downloads">
            <i class="fas fa-download"></i>DOWNLOADS
          </button>
        </router-link>
      </div>
    </div>
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
            <div class="badges">
              <div v-for="badge of presence.profile.badges" v-bind:key="badge" class="badge">
                <img :src="badge">
              </div>
            </div>
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

export default {
  name: "home",
  data() {
    return {
      presences_display: [],
      presences: [
        {
          profile: {
            image:
              "https://cdn.discordapp.com/avatars/259407123782434816/a_cd2423939738e2e32713da9da189707d.gif",
            name: "Fruxh",
            id: "3282",
            badges: [partner, brilliance, early, nitro]
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
            id: "0001",
            badges: [brilliance, early, nitro]
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
              "https://cdn.discordapp.com/avatars/223238938716798978/96d2e1c86178c8c79c99577e9772ada8.png",
            name: "Timeraa",
            id: "7947",
            badges: [brilliance, nitro]
          },
          service: "YouTube",
          service_logo: youtube_logo,
          item1: [
            "Noisestorm - Crab Rave [Monstercat Release]",
            "Monstercat: Instinct"
          ],
          item2: "1:36 left"
        }
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

.main {
  text-align: left;
  padding-top: 6%;
  padding-left: 6%;
  padding-right: 4%;
  display: grid;
  grid-template-areas: "left right";
}

.container {
  display: grid;
  grid-area: left;
  justify-self: left;
  .main-container {
    display: flex;
  }
  .right {
    display: flex;
    .desc {
      margin-left: -12.5rem;
      vertical-align: top;
      margin-top: 5.5rem;
      font-family: Inter;
      font-style: italic;
      font-weight: bold;
      font-size: 1.5rem;
      width: 40%;
      text-shadow: 0.2rem 0.25rem rgba(0, 0, 0, 0.2);
    }
    .premid {
      width: 12.5rem;
      vertical-align: top;
      margin-top: -8rem;
      margin-left: 1.8rem;
      filter: drop-shadow(0rem 0.35rem 0rem rgba(0, 0, 0, 0.2));
    }
  }
  .bottom {
    margin-left: 3rem;
    margin-top: -8rem;
    button {
      border: none;
      padding: 0.8rem;
      border-radius: 1.5rem;
      font-size: 1.2rem;
      letter-spacing: 0.03rem;
      color: @white;
      cursor: pointer;
      margin-right: 0.7rem;
      i {
        letter-spacing: 0.5rem;
      }
      &.github {
        background: #d76464;
        i {
          font-weight: normal;
        }
      }
      &.downloads {
        background: black;
      }
    }
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
  box-shadow: inset 0rem -8rem rgba(0, 0, 0, 0.2);
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
      font-family: Roboto;
      margin-left: 0.8rem;
      margin-top: 0.4rem;
      h2 {
        font-weight: normal;
        span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.2rem;
        }
        margin-block-start: 0px;
        margin-block-end: 0px;
        font-size: 1.35rem;
      }
      .badges {
        vertical-align: top;
        display: flex;
        margin-top: 0.4rem;
        .badge {
          width: 2rem;
          height: 2rem;
          margin-right: 0.4rem;
        }
      }
    }
  }
  .bottom {
    margin-top: 2.4rem;
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
