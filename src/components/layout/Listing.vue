<template>
  <transition name="route-animation" mode="out-in">
    <div class="presence-container__item">
      <!--v-if="nsfw || !presence.nsfw"-->
      <div class="store-card">
        <div class="store-card__content">
          <div class="store-card__logo"
            :style="`background: linear-gradient(135deg, ${presence.color} 0%, transparent 100%);`">
            <img :src="presence.logo" class="service-logo">
          </div>
          <div class="store-card__service">
            <h2>{{ presence.service }} <img src="./../../assets/images/verified.svg" title="Verified"
                v-tippy="{ inertia : true, arrow : true,  animation : 'scale', duration : '[250]'}"
                class="store-card__verified" v-if="!submit"></h2>
            <p v-if="!submit">Creator: <a>{{ presence.author.name }}</a></p>
          </div>
          <p class="store-card__desc">{{ presence.description }}</p>
        </div>
        <transition name="route-animation" mode="out-in">
        <div v-if="this.$parent.extension_installed" class="store-card__buttons">
          <button v-if="!isInstalled" class="button" v-on:click="sendPresence(presence.service)">
            <span class="icon">
              <i class="fas fa-plus-square"></i>
            </span>Add presence
          </button>
          <button v-if="isInstalled" class="button" v-on:click="removePresence(presence.service)">
            <span class="icon">
              <i class="fas fa-plus-square"></i>
            </span>Remove presence
          </button>
        </div>
        </transition>
        <!-- <div class="buttons">
          <div class="container">
            <div class="left" v-if="!submit">
              <button class="service" v-on:click="openInNewTab(presence.url)">
                <span class="icon">
                  <i class="fas fa-external-link-alt"></i>
                </span> Service
              </button>
            </div>
            <div class="right" v-if="!submit">
              <button class="add" v-on:click="sendPresence(presence.service)">
                <span class="icon">
                  <i class="fas fa-plus-square"></i>
                </span> Add to PreMiD
              </button>
            </div>
            <router-link replace to="/submit">
              <button class="submit" v-if="submit">Submit</button>
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "listing",
    props: ["presence", "submit", "nsfw"],
    data() {
      return {
        isInstalled: false,
      };
    },
    methods: {
      openInNewTab(url) {
        let page = window.open(url, "_blank");
        win.focus();
      },
      sendPresence(name) {
        console.log("Adding " + name + "...");

        var event = new CustomEvent('PreMiD_AddPresence', {
          detail: name
        });
        window.dispatchEvent(event);

        this.$data.isInstalled = true;
      },
      removePresence(name) {
        console.log("Removing " + name + "...");

        var event = new CustomEvent('PreMiD_RemovePresence', {
          detail: name
        });
        window.dispatchEvent(event);

        this.$data.isInstalled = false;
      },
      // This function compares the array elements that we get from Extension with `presenceName` string.
      // If we find presence in array we return true.
      isPresenceInstalled(presenceName) {
        var array = this.$parent.presences_installed;

        for (let element of array) {
          if (element.toLowerCase() == presenceName.toLowerCase()) {
            return true;
          }
        }

        return false;
      }
    },
    beforeMount() {
    },
    mounted() {
      clamp_desc();

      if(this.isPresenceInstalled(this.presence.service)) {
        this.$data.isInstalled = true;
      }

    }
  };

  function clamp_desc() {
    for (let element of document.getElementsByClassName("line-clamp")) {
      $clamp(element, {
        clamp: 3
      });
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../stylesheets/colors.less";

  .presence-container__item {
    flex: 0 0;
  }

  .store-card {
    width: 200px;
    position: relative;
    background: @background-secondary;
    border-radius: 0.5rem;
    margin: 1em;
    padding: 0.5rem;

    transition &:hover {
      box-shadow: 0 6px 32px 0 rgba(114, 137, 218, 0.3);
    }

    .store-card__verified {
      position: relative;
      display: inline-block;
      width: 16px;
      vertical-align: baseline;
    }

    .store-card__content {
      padding: 0.5rem;
      grid-area: top;
      justify-self: top;
      z-index: 10;

      .store-card__desc {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
      }

      .store-card__logo {
        border-radius: 0.4rem;
        transition: box-shadow 120ms;
        position: relative;
        height: 0;
        padding: 50% 20px;

        .service-logo {
          height: 6rem;
          position: absolute;
          top: 50%;
          right: 50%;
          transform: translate(50%, -50%);
          transition: height 120ms ease, width 120ms ease, transform 120ms ease;
          position: absolute;
          filter: drop-shadow(0rem 0rem 0.7rem rgba(0, 0, 0, 0.5));
        }
      }

      h2 {
        font-size: 1.3rem;
        line-height: 0.2rem;

        span {
          color: @white-2;
          font-size: 1.1rem;

          a {
            color: inherit;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      p {
        color: @white-2;
        font-weight: bold;
        font-size: 0.8rem;
      }
    }

    button {
      padding: 5px 10px;
      font-weight: bold;
      font-size: 14px;
      margin: 3px 0;
      width: 100%;

      &.service {
        background: @background-primary;
        color: @white-2;
      }

      &.add {
        background: @accent-primary;
        color: @white;
      }

      &.submit {
        background: @background-primary;
        color: @white-2;
        width: 16rem;
      }
    }
  }

</style>
