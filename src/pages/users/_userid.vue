<template>
  <div>
    <div class="userpage-container">
      <div class="userpage__header">
        <div class="user-avatar">
          <img :src="user.avatar" />
        </div>
        <div class="user-data">
          <p class="username">
            {{user.name}}
            <span class="tag">#{{user.tag}}</span>
          </p>
          <div class="roles">
            <div v-for="role in user.roles" v-bind:key="role" :role="role">
              <i
                v-if="role == 'Main Developer'"
                class="fas fa-tools"
                v-tippy="{content: 'Main Developer', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Website Developer'"
                class="fas fa-tools"
                v-tippy="{content: 'Website Developer', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Community Manager'"
                class="fas fa-users"
                v-tippy="{content: 'Community Manager', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Moderator'"
                class="fas fa-user-cog"
                v-tippy="{content: `Moderator`, placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Head Moderator'"
                class="fas fa-glasses"
                v-tippy="{content: `Head Moderator`, placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Ticket Manager'"
                class="fas fa-ticket-alt"
                v-tippy="{content: 'Ticket Manager', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Presence Developer'"
                class="fas fa-user-astronaut"
                v-tippy="{content: 'Presence Developer', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Patron'"
                class="fab fa-patreon"
                v-tippy="{content: 'Patron', placement: 'bottom'}"
              ></i>
              <i
                v-if="role == 'Donator'"
                class="fas fa-meteor"
                v-tippy="{content: 'Donator', placement: 'bottom'}"
              ></i>
            </div>
            <i
              v-if="userPresences.length > 20"
              class="fas fa-crown"
              v-tippy="{content: 'Important Presence Developer Badge<br>Created ' + userPresences.length + ' presences.', placement: 'bottom'}"
            ></i>
          </div>
        </div>
      </div>
      <div class="userpage__presences">
        <h1 class="heading">User presences</h1>
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
  components: {
    StoreCard
  },
  head() {
    return {
      title: `PreMiD - ${this.user.name}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.user.name}'s profile.`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${this.user.name}'s profile.`
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.user.name
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.user.avatar
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
        `https://api.premid.app/v2/credits/${params.userid}`
      )).data,
      presences = (await axios(`https://api.premid.app/v2/presences`)).data;

    return {
      user: user,
      userPresences: presences
        .filter(p => p.metadata.author.id === user.userId)
        .map(p => p.metadata)
    };
  }
};
</script>
