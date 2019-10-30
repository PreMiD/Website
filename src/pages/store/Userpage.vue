<template>
  <div>
    <title>PreMiD - Store</title>
    <div v-if="!$root.isProcessing" class="userpage-container">
        <div class="userpage__header">
            <div class="user-avatar"><img :src="userdata.avatar"></div>
            <div class="user-data">
                <p class="username">{{userdata.name}}<span class="tag">#{{userdata.tag}}</span></p>
                <div class="roles">
                    <div v-for="role in userroles" v-bind:key="role" :role="role">
                        <i v-if="role == 'Main Developer'" class="fas fa-tools" v-tippy="{content: 'Main Developer', placement: 'bottom'}"></i>
                        <i v-if="role == 'Website Developer'" class="fas fa-tools" v-tippy="{content: 'Website Developer', placement: 'bottom'}"></i>
                        <i v-if="role == 'Community Manager'" class="fas fa-users" v-tippy="{content: 'Community Manager', placement: 'bottom'}"></i>
                        <i v-if="role == 'Head Moderator'" class="fas fa-glasses" v-tippy="{content: `Head Moderator`, placement: 'bottom'}"></i>
                        <i v-if="role == 'Moderator'" class="fas fa-user-cog" v-tippy="{content: `Moderator`, placement: 'bottom'}"></i>
                        <i v-if="role == 'Ticket Manager'" class="fas fa-ticket-alt" v-tippy="{content: 'Ticket Manager', placement: 'bottom'}"></i>
                        <i v-if="role == 'Presence Verifier'" class="fas fa-clipboard-check" v-tippy="{content: 'Presence Verifier', placement: 'bottom'}"></i>
                        <i v-if="role == 'Presence Developer'" class="fas fa-user-astronaut" v-tippy="{content: 'Presence Developer', placement: 'bottom'}"></i>
                        <i v-if="role == 'Patron'" class="fab fa-patreon" v-tippy="{content: 'Patron', placement: 'bottom'}"></i>
                        <i v-if="role == 'Donator'" class="fas fa-meteor" v-tippy="{content: 'Donator', placement: 'bottom'}"></i>
                    </div>
                    <i v-if="userpresences.length > 20" class="fas fa-crown" v-tippy="{content: 'Important Presence Developer Badge<br>Created ' + userpresences.length + ' presences.', placement: 'bottom'}"></i>
                </div>
            </div>
        </div>
        <div class="userpage__presences">
            <h1>User presences</h1>
            <div class="presence-container">
            <StoreCard
                v-for="presence of userpresences"
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
import { Promise, isPromise } from 'q';

export default {
  name: "userpage",
  components: {
      StoreCard
  },
  data() {
    return {
      userdata: [],
      userpresences: [],
      userroles: [],
    };
  },
  created() {
      let Vue = this;
      Vue.$root.isProcessing = true;
      axios(`https://api.premid.app/credits/${Vue.$route.params.userid}`)
      .then((res) => {
          Vue.$data.userdata = res.data;
          Vue.$data.userroles = res.data.roles;
          //! REMOVE THAT AFTER 404 API PAGE WILL BE IMPLEMENTED.
          if (res.data == "") Vue.$router.push({path: '/notfound'});
      })
      .catch((error) => {
          console.error(error);
          if (error.response.status == 404) Vue.$router.push({path: '/notfound'});
      })
      .finally(() => {
          axios(`https://api.premid.app/v2/presences`).then((res) => {

              var foreach = res.data.map((presence) => {
                  if(presence.metadata.author.id == Vue.$data.userdata.userID) Vue.$data.userpresences.push(presence.metadata);
              });

              Promise.all(foreach).finally((res) => {
                  Vue.$root.isProcessing = false;
              })
          })
          .catch((error) => {
              console.error(error);
          })
      });
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  }
};
</script>
