<template>
  <div id="app">
    <header>
      <navigation/>
    </header>
    <div class="page-wrapper">
      <div id="content">
        <transition name="route-animation" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div id="footer">
        <div class="footer-grid">
          <div class="grid__section">
            <p class="section__title">Ready to try PreMiD?</p>
            <div class="section__promo">
              <p>Join over 6 thousand users today!</p>
              <router-link class="button" replace to="/downloads">INSTALL</router-link>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Partners</p>
            <div class="section__promo">
              <a class="poeditor-logo" href="https://poeditor.com/">
                <span class="poeditor-logo__title">POEditor</span>
              </a>
              <a class="gitbook-logo" href="https://gitbook.com/">
                <img src="./assets/images/gitbook.png">
              </a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Developers</p>
            <div>
              <a href="https://docs.premid.app/">Documentation</a>
              <a href="https://discordapp.com/rich-presence/">Rich Presence</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Support us</p>
            <div>
              <a v-on:click="openNavigation()">Donate</a>
              <a href="https://github.com/PreMiD/">For coders</a>
              <a href="https://discord.premid.app/">For designers</a>
              <a href="https://poeditor.com/join/project/Zzl1oOQV5g/">For translators</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">Help</p>
            <div>
              <a href="https://wiki.premid.app/troubleshooting/troubleshooting/">Troubleshooting</a>
              <a href="https://discord.premid.app/">Get Support</a>
            </div>
          </div>
          <div class="grid__section">
            <p class="section__title">More</p>
            <div>
              <a href="https://status.premid.app/">Status</a>
              <a href="https://discord.premid.app/">Discord</a>
              <a href="https://github.com/PreMiD/">GitHub</a>
              <a href="https://wiki.premid.app/">Wiki</a>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <p>
            <i class="far fa-copyright"></i> 2019 PreMiD by
            <a href="https://github.com/Timeraa/">Timeraa</a> &
            <a href="https://github.com/Fruxh/">Fruxh</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";

export default {
  name: "premid-web",
  components: {
    Navigation
  },
  methods: {
    isElementVisible(elm) {
      var rect = elm.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  },
  data() {
    return {
      ua: navigator.userAgent
    };
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./stylesheets/colors.less";
@import "./stylesheets/mobile_design.less";

* {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

html,
body {
  height: 100%;
}

#app {
  overflow: -webkit-paged-x;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
  background: #2c2f33;
  color: @accent-primary;
}

header {
  z-index: 10000;
  width: 100%;
}

#content {
  min-height: 100vh - 11rem;
  flex: 1 0 auto;
}

.verified-icon {
  fill: gray;
}

#footer {
  flex: 0 0 auto;
  background: @background-secondary;
  color: white;
  padding: 20px;
  margin-top: 2.5em;
}

.gitbook-logo img {
  position: relative;
  width: 150px;
}

.poeditor-logo {
  position: relative;
  width: 166px;
  height: 47px;
  background: url(./assets/images/poeditor.svg) no-repeat center center;
  background-size: 166px 47px;

  .poeditor-logo__title {
    color: rgba(255, 255, 255, 1);
    position: absolute;
    font-size: 22px;
    top: 10px;
    left: 56px;
    font-weight: 700;
  }
}

.footer-copyright {
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #43484e;
}

.footer-grid {
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  position: relative;
  justify-content: space-between;
  align-content: center;

  .grid__section {
    .section__title {
      font-weight: 700;
      margin: 7px auto;
      font-size: 18px;
      color: white;
    }

    div {
      p {
        color: #99aab5;
        margin: 7px auto;
        font-weight: 600;
      }

      a {
        &:not(.button) {
          color: #99aab5;
          transition: color 0.2s ease;

          &:hover {
            color: lighten(#99aab5, 10%);
            transition: color 0s ease;
          }
        }

        font-weight: 600;
        display: block;
        margin: 2px 0;
      }
    }
  }
}

h3 {
  font-weight: normal;
}

a {
  text-decoration: none;
  color: @accent-primary;
  cursor: pointer;
}

button,
a.button {
  user-select: none;
  border: none;
  padding: 10px 20px;
  border-radius: 1.5rem;
  font-size: 1.15rem;
  background: #7289da;
  font-weight: 700;
  letter-spacing: 0.04rem;
  color: fade(white, 95%);
  cursor: pointer;
  margin-right: 0.7rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 transparent;
  text-align: center;

  i {
    margin-right: 5px;
  }

  &:hover {
    box-shadow: 0 3px 26px -5px fade(lighten(#7289da, 5%), 50%);
    background: lighten(#7289da, 5%);
  }

  &:active {
    background: darken(#7289da, 5%);
    box-shadow: none;
    transition: all 0.1s ease;
  }

  &:focus {
    outline: none;
    cursor: pointer;
  }
}

.colored-button(@color) {
  background: @color;

  &:hover {
    box-shadow: 0 3px 26px -5px fade(lighten(@color, 2%), 50%);
    background: lighten(@color, 2%);
  }

  &:active {
    background: darken(@color, 2%);
  }
}

button,
a.button {
  &.button_gray {
    .colored-button(#2c2f33);
  }
  &.button_black {
    .colored-button(#202225);
  }
}

::-webkit-scrollbar {
  width: 12px;
  height: 0.6rem;
}

::-webkit-scrollbar-track {
  background: @background-secondary;
  border: none;
}

::-webkit-scrollbar-thumb {
  border: 3px solid @background-secondary;
  border-radius: 20px;
  background: @accent-primary;

  &:hover {
    background: lighten(@accent-secondary, 3%);
  }
}

::-webkit-scrollbar-corner {
  background: transparent;
}

footer {
  width: 100%;
  position: absolute;
  bottom: 0;
}

img {
  user-select: none;
  -webkit-user-drag: none;
}

.route-animation-enter-active,
.route-animation-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.route-animation-enter,
.route-animation-leave-to {
  opacity: 0;
}
</style>
