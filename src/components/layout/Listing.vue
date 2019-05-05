<template>
  <transition name="card-animation" mode="out-in">
    <div class="presence-container__item">
      <div class="store-card" :style="`background-image: url('${presence.thumbnail}')`">
        <div class="store-card__service-logo">
          <img :src="presence.logo">
        </div>
        <div class="store-card__service-info">
          <div class="store-card__service">
            <h2>
              {{ presence.service }}
              <img
                src="./../../assets/images/verified.svg"
                title="This presence was created by a verified developer"
                v-tippy="{ theme: 'discord', arrow : true,  animation : 'scale', duration : '[150, 150]'}"
                class="store-card__verified"
              >
            </h2>
            <p>
              Creator:
              <a>{{ presence.author.name }}</a>
            </p>
            <p class="store-card__desc">{{ presence.description }}</p>
          </div>
          <transition name="btn-animation" mode="out-in">
            <div v-if="this.$parent.extension_installed" class="store-card__buttons on-desktop">
              <button
                v-if="!isInstalled"
                class="button button_light"
                v-on:click="sendPresence(presence.service)"
              >
                <span class="icon">
                  <i class="fas fa-plus-square"></i>
                </span>Add presence
              </button>
              <button
                v-if="isInstalled"
                class="button button_red"
                v-on:click="removePresence(presence.service)"
              >
                <span class="icon">
                  <i class="fas fa-minus-square"></i>
                </span>Remove presence
              </button>
            </div>
          </transition>
        </div>
        <div
          class="store-card__gradient"
          :style="`background: linear-gradient(135deg, ${presence.color} 0%, black 100%);`"
        ></div>
      </div>
    </div>

    <!-- <div class="presence-container__item">
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
        <transition name="card-animation" mode="out-in">
        <div v-if="this.$parent.extension_installed" class="store-card__buttons on-desktop">
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
      </div>
    </div>-->
  </transition>
</template>

<script>
export default {
  name: "listing",
  props: ["presence", "submit", "nsfw"],
  data() {
    return {
      isInstalled: false
    };
  },
  methods: {
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    },
    sendPresence(name) {
      console.log("Adding " + name + "...");

      var event = new CustomEvent("PreMiD_AddPresence", {
        detail: name
      });
      window.dispatchEvent(event);

      this.$data.isInstalled = true;
    },
    removePresence(name) {
      console.log("Removing " + name + "...");

      var event = new CustomEvent("PreMiD_RemovePresence", {
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
  beforeMount() {},
  mounted() {
    clamp_desc();

    if (this.isPresenceInstalled(this.presence.service)) {
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
.presence-container__item {
  flex: 0 0;
}
</style>
