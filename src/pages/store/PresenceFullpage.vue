<template>
  <div>
    <title>
      PreMiD -
      {{ presenceData.service }}
    </title>
    <transition name="fade" mode="in-out">
      <div v-if="!$root.isProcessing" class="fullpresence-container">
        <div
          class="fullpresence__header"
          :style="`background-image: url('${presenceData.thumbnail}')`"
        >
          <div class="header__title">
            <h1 class="presence-name">{{ presenceData.service }}</h1>
            <div
              class="fullpresence__gradient"
              :style="`background: linear-gradient(155deg, ${presenceData.color} 0%, ${presenceGradientColor} 100%);`"
            ></div>
          </div>
          <div class="header__buttons">
            <button
              v-if="!isInstalled && this.$root.extensionInstalled && typeof presenceData.button == 'undefined'"
              class="button button_light"
              v-on:click="sendPresence(presenceData.service)"
            >
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              {{ $t('store.card.presence.add') }}
            </button>
            <button
              v-if="isInstalled"
              class="button button_black"
              v-on:click="removePresence(presenceData.service)"
            >
              <span class="icon">
                <i class="fas fa-minus"></i>
              </span>
              {{ $t('store.card.presence.remove') }}
            </button>
            <a
              class="button button_black"
              :href="`https://github.com/PreMiD/Presences/tree/master/${$route.params.presenceName}`"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              Source Code
            </a>
            <!-- TODO: Implement like system. <a class="button button_large button_red button_like"><i class="far fa-heart"/></a> -->
          </div>
        </div>
        <div class="fullpresence__content">
          <div class="content__description">
            <h2 class="content__title">{{ $t('presence.sections.description.title') }}</h2>
            <div
              class="description-container"
              v-if="!presenceData.fullDescription && presenceData.description"
              v-html="getPresenceDescription()"
            />
            <div
              class="description-container"
              v-if="presenceData.fullDescription"
              v-html="presenceData.fullDescription"
            />
          </div>
          <div class="content__info">
            <h2 class="content__title">{{ $t('presence.sections.information.title') }}</h2>
            <ul class="info__sections">
              <li v-if="presenceData.author">
                <p>
                  <i class="fas fa-user" />
                  {{ $t('presence.sections.information.author') }}:
                  <router-link
                    v-if="presenceAuthor"
                    class="author-name"
                    :style="`color: ${presenceAuthor.roleColor};`"
                    :to="`/users/${presenceAuthor.userID}`"
                  >
                    <img
                      v-if="presenceAuthor.avatar"
                      :src="presenceAuthor.avatar"
                      class="author-avatar"
                    />
                    {{ presenceData.author.name }}
                  </router-link>
                  <b v-else>{{ presenceData.author.name }}</b>
                </p>
              </li>
              <li v-if="presenceData.version">
                <p>
                  <i class="fas fa-code-branch" />
                  {{ $t('presence.sections.information.version') }}:
                  <span
                    class="presence-version"
                  >
                    <b>{{ presenceData.version }}</b>
                  </span>
                </p>
              </li>
              <li v-if="presenceData.tags">
                <p>
                  <i class="fas fa-hashtag" />
                  {{ $t('presence.sections.information.tags') }}:
                </p>
                <div class="presence-tags">
                  <a
                    v-bind:key="tag"
                    v-for="(tag) of presenceData.tags"
                    :style="`background: ${presenceData.color}; color: ${presenceTextColor};`"
                    class="label label_tag"
                  >{{tag}}</a>
                </div>
              </li>
              <!-- <li>
                                <p><i class="fas fa-heart" /> Likes: <span :style="`background: ${presenceData.color};`"
                                        class="label label_tag">36</span></p>
              </li>-->
              <li v-if="!presenceData.regExp">
                <p>
                  <i class="fas fa-link" />
                  {{ $t('presence.sections.information.supportedurls') }}:
                </p>
                <ul class="presence-urls">
                  <li v-for="url in presenceURLs" :key="url">
                    <a :href="`https://${url}`">{{ url }}</a>
                  </li>
                </ul>
              </li>
              <li v-if="presenceData.regExp">
                <p>
                  <i class="fas fa-link" />
                  URL RegExp:
                </p>
                <div class="presence-regexp">
                  <ul class="presence-urls">
                    <li>
                  <p>{{ presenceData.regExp }}</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PresenceMixin from "../../components/mixins/Presence";
import axios from "axios";

const tinycolor = require("tinycolor2");
const marked = require("marked");

export default {
  name: "presencePage",
  mixins: [PresenceMixin],
  data() {
    return {
      presenceData: [],
      presenceAuthor: [],
      presenceURLs: []
    };
  },
  async created() {
    let Vue = this;

    this.$root.isProcessing = true;

    await axios(
      `https://api.premid.app/v2/presences/${this.$route.params.presenceName}`
    )
      .then(res => {
        Vue.$data.presenceData = res.data.metadata;
        Array.isArray(Vue.$data.presenceData.url)
          ? (Vue.$data.presenceURLs = Vue.$data.presenceData.url)
          : (Vue.$data.presenceURLs = Array.of(Vue.$data.presenceData.url));
        if (this.isPresenceInstalled(Vue.$data.presenceData.service))
          Vue.$data.isInstalled = true;
      })
      .catch(error => {
        Vue.$router.push({
          path: "/store"
        });
        return;
      })
      .then(() => {
        return axios(
          `https://api.premid.app/credits/${Vue.$data.presenceData.author.id}`
        );
      })
      .then(res => {
        Vue.$data.presenceAuthor = res.data;
      })
      .then(() => {
        var ReadmeFileName =
          Vue.$root.getCurrentLanguage() == "en"
            ? "README"
            : "README_" + Vue.$root.getCurrentLanguage();
        return axios(
          `https://raw.githubusercontent.com/PreMiD/Presences/master/${Vue.$route.params.presenceName}/dist/${ReadmeFileName}.md`
        );
      })
      .then(res => {
        Vue.$data.presenceData.fullDescription = marked(res.data);
      })
      .finally(() => {
        Vue.$root.isProcessing = false;
      })
      .catch(error => {
        if (error.responce == undefined || error.response.status == 404) return;
        Vue.$router.push({
          path: "/store"
        });
        return;
      });
  },
  updated() {
    if (this.$root.isProcessing == true) return;
    if (this.isPresenceInstalled(this.$data.presenceData.service)) {
      this.$data.isInstalled = true;
    }
  },
  methods: {
    /**
     * Returns description of the presence according to your language.
     * If presence has non-multilingual description then we just parsing the "description" data.
     */
    getPresenceDescription() {
      if (
        this.$data.presenceData.description[this.$root.getCurrentLanguage()]
      ) {
        return this.$data.presenceData.description[
          this.$root.getCurrentLanguage()
        ];
      } else if (this.$data.presenceData.description["en"]) {
        return this.$data.presenceData.description["en"];
      } else {
        return this.$data.presenceData.description;
      }
    }
  },
  computed: {
    presenceTextColor() {
      var presenceColor = tinycolor(this.$data.presenceData.color);
      if (presenceColor.getLuminance() > 0.6) {
        return "#202225";
      } else {
        return "#fff";
      }
    },
    presenceGradientColor() {
      return tinycolor(this.$data.presenceData.color)
        .darken(45)
        .toHexString();
    }
  }
};
</script>
