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
          <img :src="user.avatar" >
        </div>
        <div class="user-data">
          <p class="username">
            {{ user.name }}
            <span class="tag">#{{ user.tag }}</span>
          </p>
          <div class="roles">
            <div v-for="role in user.roles" :key="role" :role="role">
              <i
                v-if="role == 'Main Developer'"
                v-tippy="{
                  content: $t('contributors.roles.mainDeveloper'),
                  placement: 'bottom'
                }"
                class="fas fa-tools"
              />
              <i
                v-if="role == 'Website Developer'"
                v-tippy="{
                  content: $t('contributors.roles.websiteDeveloper'),
                  placement: 'bottom'
                }"
                class="fas fa-tools"
              />
              <i
                v-if="role == 'Community Manager'"
                v-tippy="{
                  content: $t('contributors.roles.communityManager'),
                  placement: 'bottom'
                }"
                class="fas fa-users"
              />
              <i
                v-if="role == 'Moderator'"
                v-tippy="{
                  content: $t('contributors.roles.moderator'),
                  placement: 'bottom'
                }"
                class="fas fa-user-cog"
              />
              <i
                v-if="role == 'Head Moderator'"
                v-tippy="{
                  content: $t('contributors.roles.headModerator'),
                  placement: 'bottom'
                }"
                class="fas fa-glasses"
              />
              <i
                v-if="role == 'Ticket Manager'"
                v-tippy="{
                  content: $t('contributors.roles.ticketManager'),
                  placement: 'bottom'
                }"
                class="fas fa-ticket-alt"
              />
              <i
                v-if="role == 'Presence Developer'"
                v-tippy="{
                  content: $t('user.roles.presenceDeveloper'),
                  placement: 'bottom'
                }"
                class="fas fa-user-astronaut"
              />
              <i
                v-if="role == 'Presence Verifier'"
                v-tippy="{
                  content: $t('user.roles.presenceVerifier'),
                  placement: 'bottom'
                }"
                class="fas fa-clipboard-check"
              />
              <i
                v-if="role == 'Patron'"
                v-tippy="{ content: 'Patron', placement: 'bottom' }"
                class="fab fa-patreon"
              />
              <i
                v-if="role == 'Donator'"
                v-tippy="{
                  content: $t('contributors.roles.donator'),
                  placement: 'bottom'
                }"
                class="fas fa-meteor"
              />
            </div>
            <i
              v-if="userPresences.length > 20"
              v-tippy="{
                content: `${$t('user.importantPresenceDev.message1')}<br>${$t(
                  'user.importantPresenceDev.message2'
                ).replace('{0}', userPresences.length)}`,
                placement: 'bottom'
              }"
              class="fas fa-crown"
            />
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
          />
          <div
            v-else
            class="noContributes"
            v-html="tabbify($t('user.switch.contributed'))"
          />
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
import axios from "axios"
import StoreCard from "../../components/StoreCard"
import { Promise, isPromise } from "q"

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
      presences = (await axios(`${process.env.apiBase}/presences`)).data

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
    }
  },
  data() {
    return {
      user: [],
      userPresences: [],
      userContributions: [],
      showContributions: false
    }
  },
  methods: {
    linkify(pls) {
      if (!pls.match(/(\[.*?\])/g)) return pls
      else
        return pls.match(/(\[.*?\])/g).map((ch, i) => {
          return pls.replace(
            ch,
            `<a href="https://discord.gg/premid">${ch.slice(
              1,
              ch.length - 1
            )}</a>`
          )
        })[0]
    },
    tabbify(pls) {
      if (!pls.match(/(\[.*?\])/g)) return pls
      else if (!this.showContributions)
        return pls.match(/(\[.*?\])/g).map((ch, i) => {
          return pls.replace(
            ch,
            `<span style="color:#7288da">${
              ch.slice(1, ch.length - 1).split("/")[0]
            }</span>`
          )
        })[0]
      else if (this.showContributions)
        return pls.match(/(\[.*?\])/g).map((ch, i) => {
          return pls.replace(
            ch,
            `<span style="color:#7288da">${
              ch.slice(1, ch.length - 1).split("/")[1]
            }</span>`
          )
        })[0]
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
    }
  }
}
</script>
