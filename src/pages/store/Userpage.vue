<template>
  <div>
    <title>PreMiD - Store</title>
    <div v-if="!$root.isProcessing" class="userpage-container">
        <div class="userpage__header">
            <div class="user-avatar"><img :src="userdata.avatar"></div>
            <div class="user-data">
                <p class="username">{{userdata.name}}<span class="tag">#{{userdata.tag}}</span></p>
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
    };
  },
  created() {
      let Vue = this;
      Vue.$root.isProcessing = true;
      axios(`https://api.premid.app/credits/${Vue.$route.params.userid}`)
      .then((res) => {
          Vue.$data.userdata = res.data;
          //! REMOVE THAT AFTER 404 API PAGE WILL BE IMPLEMENTED.
          if (res.data == "") Vue.$router.push({path: '/notfound'});
      })
      .catch((error) => {
          console.error(error);
          Vue.$root.isProcessing = false;
          if (error.response.status == 404) Vue.$router.push({path: '/notfound'});
          if(error.request) Vue.$router.push({path: '/maintenance'});
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
