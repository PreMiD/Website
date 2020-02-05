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
        <span v-html="linkify($t('user.notFound.message4'))" />
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
            <div v-for="role in user.roles" v-bind:key="role" :role="role">
              <i
                v-if="role == 'Main Developer'"
                class="fas fa-tools"
                v-tippy="{ content: $t('contributors.roles.mainDeveloper'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Website Developer'"
                class="fas fa-tools"
                v-tippy="{ content: $t('contributors.roles.websiteDeveloper'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Community Manager'"
                class="fas fa-users"
                v-tippy="{ content: $t('contributors.roles.communityManager'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Moderator'"
                class="fas fa-user-cog"
                v-tippy="{ content: $t('contributors.roles.moderator'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Head Moderator'"
                class="fas fa-glasses"
                v-tippy="{ content: $t('contributors.roles.headModerator'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Ticket Manager'"
                class="fas fa-ticket-alt"
                v-tippy="{ content: $t('contributors.roles.ticketManager'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Presence Developer'"
                class="fas fa-user-astronaut"
                v-tippy="{ content: $t('user.roles.presenceDeveloper'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Presence Verifier'"
                class="fas fa-clipboard-check"
                v-tippy="{ content: $t('user.roles.presenceVerifier'), placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Patron'"
                class="fab fa-patreon"
                v-tippy="{ content: 'Patron', placement: 'bottom' }"
              ></i>
              <i
                v-if="role == 'Donator'"
                class="fas fa-meteor"
                v-tippy="{ content: $t('contributors.roles.donator'), placement: 'bottom' }"
              ></i>
            </div>
            <i
              v-if="userPresences.length > 20"
              class="fas fa-crown"
              v-tippy="{
                content:
                `${$t('user.importantPresenceDev.message1')}<br>${$t('user.importantPresenceDev.message2').replace('{0}', userPresences.length)}`,
                placement: 'bottom'
              }"
            ></i>
          </div>
        </div>
      </div>
      <div class="userpage__presences" v-if="!error">
        <h1 class="heading">{{ $t("store.userpage.userPresences") }}</h1>
        <div class="presence-container">
          <StoreCard
            v-for="presence of userPresences"
            v-bind:key="presence.service"
            :presence="presence"
            storeFunctions="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StoreCard from "../../components/StoreCard";
import { Promise, isPromise } from "q";

export default {
  name: "userpage",
  auth: false,
  components: {
    StoreCard
  },
  head() {
    return {
      title: `${!this.error ? this.user.name : "Unknown User"}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${!this.error ? this.user.name : "Unknown User"}'s profile.`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${!this.error ? this.user.name : "Unknown User"}'s profile.`
        },
        {
          hid: "og:title",
          property: "og:title",
          content: !this.error ? this.user.name : "Unknown User"
        },
        {
          hid: "og:image",
          property: "og:image",
          content: !this.error
            ? this.user.avatar
            : "https://premid.app/assets/images/logo.png"
        }
      ]
    };
  },
  data() {
    return {
      user: [],
      userPresences: []
    };
  },
  async asyncData({ params }) {
    const user = (await axios(
        `${process.env.apiBase}/credits/${params.userid}`
      )).data,
      presences = (await axios(`${process.env.apiBase}/presences`)).data;

    return {
      error: user.error ? true : false,
      user: user,
      userPresences: presences
        .filter(p => p.metadata.author.id === user.userId)
        .map(p => p.metadata)
    };
  },
  methods: {
    linkify(pls) {
      return pls.match(/(\[.*?\])/g).map((ch, i) => {
        return pls.replace(
          ch,
          `<a href="https://discord.gg/premid">${ch.slice(1, ch.length - 1)}</a>`
        );
      })[0];
    }
  }
};
</script>
