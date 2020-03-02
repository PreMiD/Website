<template>
  <div>
    <div class="userpage-container">
      <div v-if="error">
        <span>{{ $t("user.notFound.heading") }}</span>
        <ul style="max-width:50%">
          <li>{{ $t("user.notFound.message1") }}</li>
          <li>{{ $t("user.notFound.message2") }}</li>
          <li>{{ $t("user.notFound.message3") }}</li>
        </ul>
        <span>{{ linkify($t("user.notFound.message4")) }}</span>
      </div>
      <div v-else class="userpage__header">
        <div class="user-avatar">
          <img :src="user.avatar" />
        </div>
        <div class="user-data">
          <p class="username">
            {{ user.name }}
            <span class="tag">#{{ user.tag }}</span>
          </p>
          <div class="roles">
            <div v-for="role in user.roles" :key="role" :role="role">
              <i
                v-if="role == 'Creator'"
                class="fas fa-tools"
                v-tippy="{
                  content: $t('contributors.roles.creator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Community Manager'"
                class="fas fa-users"
                v-tippy="{
                  content: $t('contributors.roles.communityManager'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Asst. Community Manager'"
                class="fas fa-users"
                v-tippy="{
                  content: $t('contributors.roles.asstCommunityManager'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Administrator'"
                class="fas fa-database"
                v-tippy="{
                  content: $t('contributors.roles.administrator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Website Developer'"
                class="fas fa-tools"
                v-tippy="{
                  content: $t('contributors.roles.websiteDeveloper'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Head Moderator'"
                class="fas fa-hat-cowboy"
                v-tippy="{
                  content: $t('contributors.roles.headModerator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Asst. Head Moderator'"
                class="fas fa-hat-cowboy"
                v-tippy="{
                  content: $t('contributors.roles.asstHeadModerator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Moderator'"
                class="fas fa-user-cog"
                v-tippy="{
                  content: $t('contributors.roles.moderator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Ticket Manager'"
                class="fas fa-ticket-alt"
                v-tippy="{
                  content: $t('contributors.roles.ticketManager'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Presence Developer'"
                class="fas fa-user-astronaut"
                v-tippy="{
                  content: $t('user.roles.presenceDeveloper'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Presence Verifier'"
                class="fas fa-clipboard-check"
                v-tippy="{
                  content: $t('user.roles.presenceVerifier'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Patron'"
                class="fab fa-patreon"
                v-tippy="{ content: 'Patron', placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Donator'"
                class="fas fa-meteor"
                v-tippy="{
                  content: $t('contributors.roles.donator'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Proofreader'"
                class="fas fa-check"
                v-tippy="{
                  content: $t('contributors.roles.proofreader'),
                  placement: 'bottom'
                }"
              ></i>
              <i
                v-if="role == 'Translator'"
                class="fas fa-globe"
                v-tippy="{
                  content: $t('contributors.roles.translator'),
                  placement: 'bottom'
                }"
              ></i>
            </div>
            <i
              v-if="userPresences.length > 20"
              class="fas fa-crown"
              v-tippy="{
                content: `${$t('user.importantPresenceDev.message1')}<br>${$t(
                  'user.importantPresenceDev.message2'
                ).replace('{0}', userPresences.length)}`,
                placement: 'bottom'
              }"
            ></i>
            <i
              v-if="userPresences.length > 100"
              class="fas fa-brain"
              v-tippy="{
                content: `${$t('user.geniusPresenceDev.message1')}<br>${$t(
                  'user.geniusPresenceDev.message2'
                )}`,
                placement: 'bottom'
              }"
            ></i>
          </div>
        </div>
      </div>
      <div v-if="!error" class="userpage__presences">
        <h1 class="heading">
          <div
            v-if="userContributions.length > 0"
            v-tippy="{
              content: showContributions
                ? $t('user.presences.created')
                : $t('user.presences.contributed'),
              placement: 'top'
            }"
            class="contributes"
            @click="showContributions = !showContributions"
            v-html="tabbify($t('user.switch.contributed'))"
          ></div>
          <div v-else class="noContributes" v-html="tabbify($t('user.switch.contributed'))"></div>
        </h1>
        <div v-if="!showContributions" class="presence-container">
          <StoreCard
            v-for="presence of userPresences"
            :key="presence.service"
            :presence="presence"
            store-functions="true"
          />
        </div>
        <div
          v-else-if="showContributions && userContributions.length > 0"
          class="presence-container"
        >
          <StoreCard
            v-for="presence of userContributions"
            :key="presence.service"
            :presence="presence"
            store-functions="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StoreCard from "../../components/StoreCard";

export default {
  name: "Userpage",
  auth: false,
  components: {
    StoreCard
  },
  async asyncData({ params }) {
    const user = (
        await axios(`${process.env.apiBase}/credits/${params.userid}`)
      ).data,
      presences = (await axios(`${process.env.apiBase}/presences`)).data;

    return {
      error: user.error ? true : false,
      user: user,
      showContributions: false,
      userPresences: presences
        .filter(p => p.metadata.author.id === user.userId)
        .map(p => p.metadata),
      userContributions: presences
        .filter(p =>
          p.metadata.contributors?.some(cont => cont.id == user.userId)
        )
        .map(p => p.metadata)
    };
  },
  data() {
    return {
      user: [],
      userPresences: [],
      userContributions: [],
      showContributions: false
    };
  },
  methods: {
    linkify(pls) {
      if (!pls.match(/(\[.*?\])/g)) return pls;
      else
        return pls.match(/(\[.*?\])/g).map(ch => {
          return pls.replace(
            ch,
            `<a href="https://discord.gg/premid">${ch.slice(
              1,
              ch.length - 1
            )}</a>`
          );
        })[0];
    },
    tabbify(pls) {
      if (!pls.match(/(\[.*?\])/g)) return pls;
      else if (!this.showContributions)
        return pls.match(/(\[.*?\])/g).map(ch => {
          return pls.replace(
            ch,
            `<span style="color:#7288da">${
              ch.slice(1, ch.length - 1).split("/")[0]
            }</span>`
          );
        })[0];
      else if (this.showContributions)
        return pls.match(/(\[.*?\])/g).map(ch => {
          return pls.replace(
            ch,
            `<span style="color:#7288da">${
              ch.slice(1, ch.length - 1).split("/")[1]
            }</span>`
          );
        })[0];
    }
  },
  head() {
    return {
      title: `${
        !this.error && this.user.name ? this.user.name : "Unknown User"
      }`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${
            !this.error && this.user.name ? this.user.name : "Unknown user"
          }'s profile.`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${
            !this.error && this.user.name ? this.user.name : "Unknown user"
          }'s profile.`
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            !this.error && this.user.name ? this.user.name : "Unknown User"
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            !this.error && this.user.avatar
              ? this.user.avatar
              : "https://premid.app/assets/images/logo.png"
        }
      ]
    };
  }
};
</script>
