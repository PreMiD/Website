<template>
  <div v-if="!presence.error">
    <transition name="fade" mode="in-out">
      <div class="fullpresence-container">
        <div
          class="fullpresence__header"
          :style="`background-image: url('${presence.metadata.thumbnail}')`"
        >
          <div class="header__title">
            <h1 class="presence-name">
              {{ presence.metadata.service }}
              <span
                v-if="hot"
                class="fa-stack"
                content="This presence is very popular around users."
                v-tippy
                style="font-size:1rem;"
              >
                <i class="fas fa-circle fa-stack-2x"></i>
                <i
                  :style="`color: ${presence.metadata.color};`"
                  class="fas fa-fire-alt fa-stack-1x fa-inverse"
                ></i>
              </span>
            </h1>
            <div
              class="fullpresence__gradient"
              :style="
                `background: linear-gradient(155deg, ${presence.metadata.color} 0%, ${presenceGradientColor} 100%);`
              "
            ></div>
          </div>
          <div class="header__buttons">
            <div
              style="display: initial"
              v-if="this.$store.state.extension.extensionInstalled && presence.metadata.button != false"
            >
              <button
                v-if="
                !isInstalled && this.$store.state.extension.extensionInstalled
              "
                class="button button--"
                v-on:click="sendPresence(presence.metadata.service)"
              >
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                {{ $t("store.card.presence.add") }}
              </button>
              <button
                v-if="isInstalled && this.$store.state.extension.extensionInstalled"
                class="button button--black"
                v-on:click="removePresence(presence.metadata.service)"
              >
                <span class="icon">
                  <i class="fas fa-minus"></i>
                </span>
                {{ $t("store.card.presence.remove") }}
              </button>
            </div>
            <a
              class="button button--black"
              :href="
                `https://github.com/PreMiD/Presences/tree/master/${encodeURIComponent($route.params.presenceName)}`
              "
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              {{ $t("presence.page.buttons.sourceCode") }}
            </a>
            <!-- TODO: Implement like system. <a class="button button--lg button--red button--like"><i class="far fa-heart"/></a> -->
          </div>
        </div>
        <div class="fullpresence__content">
          <div class="content__description">
            <h2 class="content__title">{{ $t("presence.sections.description.title") }}</h2>
            <div class="description-container" v-html="linkify(getPresenceDescription())" />
          </div>
          <div class="content__info">
            <h2 class="content__title">{{ $t("presence.sections.information.title") }}</h2>
            <ul class="info__sections">
              <li v-if="presence.metadata.author">
                <p>
                  <i class="fas fa-user" />
                  {{ $t("presence.sections.information.author") }}:
                  <nuxt-link
                    v-if="presence.metadata.author.userId"
                    class="author-name"
                    :style="`color: ${presence.metadata.author.roleColor};`"
                    :to="`/users/${presence.metadata.author.userId}`"
                    :disabled="true"
                  >
                    <img
                      v-if="presence.metadata.author.avatar"
                      :src="presence.metadata.author.avatar"
                      class="author-avatar"
                    />
                    {{ presence.metadata.author.name }}
                  </nuxt-link>
                  <b v-else>{{ presence.metadata.author.name }}</b>
                </p>
              </li>
              <li
                v-if="presence.metadata.contributors && typeof presence.metadata.contributors === 'object'"
              >
                <p>
                  <i class="fas fa-user-tie" />
                  {{ $t("presence.sections.information.contributors") }}:
                  <nuxt-link
                    v-for="(contributor, index) in presence.metadata.contributors"
                    :key="contributor.id"
                    class="author-name"
                    :to="`/users/${contributor.id}`"
                    :disabled="true"
                  >{{ contributor.name + `${presence.metadata.contributors.length === index+1 ? "" : ", "}` }}</nuxt-link>
                </p>
              </li>
              <li v-if="presence.metadata.version">
                <p>
                  <i style="margin-right:2px;" class="fas fa-code-branch" />
                  {{ $t("presence.sections.information.version") }}:
                  <span
                    class="presence-version"
                  >
                    <b>{{ presence.metadata.version }}</b>
                  </span>
                </p>
              </li>
              <li v-if="presenceUsage && presenceUsage > 0">
                <p>
                  <i class="fas fa-cart-arrow-down" style="margin-left:-4px;" />
                  {{ $t("presence.sections.information.users") }}:
                  <span
                    class="presence-version"
                  >
                    <b>{{presenceUsage}}</b>
                  </span>
                </p>
              </li>
              <li v-if="presence.metadata.tags">
                <p>
                  <i class="fas fa-hashtag" />
                  {{ $t("presence.sections.information.tags") }}:
                </p>
                <div class="presence-tags">
                  <a
                    v-bind:key="tag"
                    v-for="tag of presence.metadata.tags"
                    :style="
                      `background: ${presence.metadata.color}; color: ${presenceTextColor};`
                    "
                    class="label label_tag"
                  >{{ tag }}</a>
                </div>
              </li>
              <!-- <li>
                <p><i class="fas fa-heart" /> Likes: <span :style="`background: ${presenceData.color};`"
                        class="label label_tag">36</span></p>
              </li>-->
              <li>
                <p>
                  <i class="fas fa-link" />
                  {{ $t("presence.sections.information.supportedurls") }}:
                </p>
                <ul v-if="Array.isArray(presence.metadata.url)" class="presence-urls">
                  <li v-for="url in presence.metadata.url" :key="url">
                    <a :href="`https://${url}`">{{ url }}</a>
                  </li>
                </ul>
                <ul v-else-if="presence.metadata.url" class="presence-urls">
                  <li>
                    <a :href="`https://${presence.metadata.url}`">{{ presence.metadata.url }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PresenceMixin from "~/components/mixins/Presence";
import axios from "axios";

import tinycolor from "tinycolor2";
import marked from "marked";

export default {
  name: "presencePage",
  mixins: [PresenceMixin],
  auth: false,

  head() {
    if (this.$data.presence.error) return;
    let description =
      this.$data.presence.metadata.description["en"] ||
      this.$data.presence.metadata.description;

    if (description.match(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      description = description.replace(
        description.match(/\[([^\]]+)\]\(([^)]+)\)/g),
        /\[([^\]]+)\]\(([^)]+)\)/g.exec(description)[1]
      );
    }

    if (description.length >= 256)
      description = description.slice(0, 256) + "...";

    return {
      title: this.$data.presence.metadata.service,
      meta: [
        {
          hid: "theme-color",
          property: "theme-color",
          content: this.$data.presence.metadata.color
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$data.presence.metadata.service
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.$data.presence.metadata.logo
        }
      ]
    };
  },
  async asyncData({ params }) {
    let presenceUsage = (await axios(`${process.env.apiBase}/usage`)).data
        .users,
      presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
        .data;

    let presenceData = await new Promise((resolve, reject) => {
      axios(
        `${process.env.apiBase}/presences/${encodeURIComponent(
          params.presenceName
        )}`
      )
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject({
            error: true,
            code: 401
          });
        });
    });

    let data = {
      presenceUsage: presenceRanking[encodeURIComponent(params.presenceName)],
      hot:
        (presenceRanking[encodeURIComponent(params.presenceName)] /
          presenceUsage) *
          100 >
        30,
      presence: presenceData
    };

    if (!presenceData.error) {
      let authorData = await new Promise((resolve, reject) => {
        axios(
          `${process.env.apiBase}/credits/${data.presence.metadata.author.id}`
        )
          .then(res => {
            if (res.data.error && res.data.message !== "User not found.")
              reject({ error: true, message: res.data.message });
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject({
              error: true,
              code: 401
            });
          });
      });

      if (!authorData.error) {
        data.presence.metadata.author = authorData;
      }
    }

    return data;
  },
  mounted() {
    if (this.$data.presence.error)
      return this.$nuxt.error({ statusCode: this.$data.presence.error });
  },
  created() {
    if (!this.$data.presence.error) {
      this.isPresenceInstalled(this.$data.presence.metadata.service).then(
        responce => {
          if (responce) this.$data.isInstalled = true;
        }
      );
    }
  },
  updated() {
    this.isPresenceInstalled(this.$data.presence.metadata.service).then(
      responce => {
        if (responce) this.$data.isInstalled = true;
      }
    );
  },
  methods: {
    /**
     * Returns description of the presence according to your language.
     * If presence has non-multilingual description then we just parsing the "description" data.
     */
    getPresenceDescription() {
      if (this.$data.presence.error) return;

      if (
        this.$data.presence.metadata.description[
          this.$root.getCurrentLanguage()
        ]
      ) {
        return this.$data.presence.metadata.description[
          this.$root.getCurrentLanguage()
        ];
      } else if (this.$data.presence.metadata.description["en"]) {
        return this.$data.presence.metadata.description["en"];
      } else {
        return this.$data.presence.metadata.description;
      }
    },
    linkify(description) {
      if (!description) return;
      else if (
        !description.match(/\[([^\]]+)\]\(([^)]+)\)/g) ||
        !/\[([^\]]+)\]\(([^)]+)\)/g.exec(description)
      )
        return description;
      else {
        const match = description.match(/\[([^\]]+)\]\(([^)]+)\)/g),
          exec = /\[([^\]]+)\]\(([^)]+)\)/g.exec(description);

        return description.replace(
          match,
          `<a target="_blank" href="${exec[2]}">${exec[1]}</a>`
        );
      }
    }
  },
  computed: {
    presenceTextColor() {
      var presenceColor = tinycolor(this.$data.presence.metadata.color);
      if (presenceColor.getLuminance() > 0.6) {
        return "#202225";
      } else {
        return "#fff";
      }
    },
    presenceGradientColor() {
      return tinycolor(this.$data.presence.metadata.color)
        .darken(45)
        .toHexString();
    }
  }
};
</script>
