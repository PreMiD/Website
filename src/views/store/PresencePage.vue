<template>
  <div>
    <title>
      PreMiD -
      {{ presence.metadata.service }}
    </title>
    <transition name="fade" mode="in-out">
      <div class="fullpresence-container">
        <div class="fullpresence__header" :style="`background-image: url('${presence.metadata.thumbnail}')`">
          <div class="header__title">
            <h1 class="presence-name">
              {{ presence.metadata.service }}
              <span v-if="hot" class="fa-stack" content="This presence is very popular around users." v-tippy
                style="font-size:1rem;">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i :style="`color: ${presence.metadata.color};`" class="fas fa-fire-alt fa-stack-1x fa-inverse"></i>
              </span>
            </h1>
            <div class="fullpresence__gradient" :style="
                `background: linear-gradient(155deg, ${presence.metadata.color} 0%, ${presenceGradientColor} 100%);`
              "></div>
          </div>
          <div class="header__buttons">
            <button v-if="
                !isInstalled &&
                  this.$root.extensionInstalled &&
                  typeof presence.metadata.button == 'undefined'
              " class="button button_light" v-on:click="sendPresence(presence.metadata.service)">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              {{ $t("store.card.presence.add") }}
            </button>
            <button v-if="isInstalled" class="button button_black"
              v-on:click="removePresence(presence.metadata.service)">
              <span class="icon">
                <i class="fas fa-minus"></i>
              </span>
              {{ $t("store.card.presence.remove") }}
            </button>
            <a class="button button_black" :href="
                `https://github.com/PreMiD/Presences/tree/master/${$route.params.presenceName}`
              " target="_blank">
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
            <h2 class="content__title">
              {{ $t("presence.sections.description.title") }}
            </h2>
            <div class="description-container" v-text="getPresenceDescription()" />
          </div>
          <div class="content__info">
            <h2 class="content__title">
              {{ $t("presence.sections.information.title") }}
            </h2>
            <ul class="info__sections">
              <li v-if="presence.metadata.author">
                <p>
                  <i class="fas fa-user" />
                  {{ $t("presence.sections.information.author") }}:
                  <nuxt-link v-if="author && author.userId" class="author-name" :style="`color: ${author.roleColor};`"
                    :to="`/users/${author.userId}`" :disabled="true">
                    <img v-if="author.avatar" :src="author.avatar" class="author-avatar" />
                    {{ presence.metadata.author.name }}
                  </nuxt-link>
                  <b v-else>{{ presence.metadata.author.name }}</b>
                </p>
              </li>
              <li v-if="presence.metadata.version">
                <p>
                  <i class="fas fa-code-branch" />
                  {{ $t("presence.sections.information.version") }}:
                  <span class="presence-version">
                    <b>{{ presence.metadata.version }}</b>
                  </span>
                </p>
              </li>
              <li v-if="presence.metadata.tags">
                <p>
                  <i class="fas fa-hashtag" />
                  {{ $t("presence.sections.information.tags") }}:
                </p>
                <div class="presence-tags">
                  <a v-bind:key="tag" v-for="tag of presence.metadata.tags" :style="
                      `background: ${presence.metadata.color}; color: ${presenceTextColor};`
                    " class="label label_tag">{{ tag }}</a>
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
                <ul class="presence-urls">
                  <li v-for="url in presence.metadata.url" :key="url">
                    <a :href="`https://${url}`">{{ url }}</a>
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
    head() {
      let description =
        this.$data.presence.metadata.description["en"] ||
        this.$data.presence.metadata.description;
      if (description.length >= 256)
        description = description.slice(0, 256) + "...";
      return {
        title: this.$data.presence.metadata.service,
        meta: [{
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
    async asyncData({
      params
    }) {
      const usage = (await axios(`${process.env.apiBase}/usage`)).data.users,
        presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
        .data;

      let presence = (
        await axios(`${process.env.apiBase}/presences/${params.presenceName}`)
      ).data;

      let res = {
        hot: (presenceRanking[params.presenceName] / usage) * 100 > 30,
        presence: presence,
        author: (
          await axios(
            `${process.env.apiBase}/credits/${presence.metadata.author.id}`
          )
        ).data
      };

      if (
        res.presence.metadata.url &&
        typeof res.presence.metadata.url === "string"
      )
        res.presence.metadata.url = [res.presence.metadata.url];

      return res;
    },
    async created() {
      if (this.isPresenceInstalled(this.$data.presence.metadata.service))
        this.$data.isInstalled = true;
    },
    updated() {
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
