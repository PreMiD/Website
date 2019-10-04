<template>
<transition name="fade" mode="out-in">
  <div class="presence-container__item">
    <div
      class="store-card"
      @mouseover="card_hovered = true"
      @mouseleave="card_hovered = false"
      :style="`background-image: url('${presence.thumbnail}'); box-shadow: 0 2px 64px 0 ${presenceShadowColor};`"
    >
      <div class="store-card__service-logo">
        <img :src="presence.logo" />
      </div>
      <div class="store-card__service-info">
        <div class="store-card__service">
          <h2>
            <router-link :key="presenceLinkName" :to="`/store/presences/${presenceLinkName}`">
              {{ presence.service }}
              <span
                v-if="isHot"
                class="fa-stack"
                content="This presence is very popular around users."
                v-tippy
              >
                <i class="fas fa-circle fa-stack-2x"></i>
                <i
                  :style="`color: ${presence.color};`"
                  class="fas fa-fire-alt fa-stack-1x fa-inverse"
                ></i>
              </span>
            </router-link>
          </h2>
          <p>
            {{ $t('store.cards.creator') }}:
            <router-link :to="`/users/${presence.author.id}`">{{ presence.author.name }}</router-link>
          </p>

          <transition name="card-animation" mode="out-in">
            <div
              :key="presence.service + '_desc'"
              v-if="!card_hovered || !this.$root.extensionInstalled"
            >
              <p class="store-card__desc">{{ this.getPresenceDescription() }}</p>
            </div>
            <div
              :key="presence.service + '_buttons'"
              v-if="card_hovered && this.$root.extensionInstalled"
            >
              <div
                v-if="this.$root.extensionInstalled && typeof presence.button == 'undefined'"
                class="store-card__buttons on-desktop"
              >
                <button
                  v-if="!isInstalled"
                  class="button button_light"
                  v-on:click="sendPresence(presence.service)"
                >
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  {{ $t('store.card.presence.add') }}
                </button>
                <button
                  v-if="isInstalled"
                  class="button button_black"
                  v-on:click="removePresence(presence.service)"
                >
                  <span class="icon">
                    <i class="fas fa-minus"></i>
                  </span>
                  {{ $t('store.card.presence.remove') }}
                </button>
              </div>
              <div v-if="this.$root.extensionInstalled && presence.button == false">
                <p class="store-card__warning">{{ $t('store.card.presence.included') }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div
        class="store-card__gradient"
        :style="`background: linear-gradient(135deg, ${presence.color} 0%, ${presenceGradientColor} 100%);`"
      ></div>
    </div>
  </div>
</transition>
</template>

<script>
import PresenceMixin from "./mixins/Presence";
const tinycolor = require("tinycolor2");

export default {
  name: "StoreCard",
  props: ["presence", "submit", "nsfw"],
  mixins: [PresenceMixin],
  data() {
    return {
      card_hovered: false,
      presenceLinkName: this.$props.presence.service
    };
  },
  methods: {
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    },
    /**
     * Returns description of the presence according to your language.
     * If presence has non-multilingual description then we just parsing the "description" data.
     */
    getPresenceDescription() {
      if (this.presence.description[this.$root.getCurrentLanguage()]) {
        return this.presence.description[this.$root.getCurrentLanguage()];
      } else if (this.presence.description["en"]) {
        return this.presence.description["en"];
      } else {
        return this.presence.description;
      }
    }
  },
  mounted() {
    if (this.isPresenceInstalled(this.presence.service)) {
      this.$data.isInstalled = true;
    }
  },
  computed: {
    isHot() {
      if (
        this.getHotPresences().includes(this.presence.service.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    },
    presenceGradientColor() {
      return tinycolor(this.presence.color)
        .darken(45)
        .toHexString();
    },
    presenceShadowColor() {
      if (this.$data.card_hovered) {
        return tinycolor(this.presence.color)
          .setAlpha(0.3)
          .toRgbString();
      } else {
        return "transparent";
      }
    }
  }
};
</script>

<style lang="less">
.presence-container__item {
  flex: 0 0;
}
</style>
