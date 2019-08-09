<template>
  <div>
    <title>PreMiD - Store</title>
    <div v-if="!isProcessing" class="userpage-container">
        <div class="userpage__header">
            <div class="user-avatar"><img :src="userdata.avatar"></div>
            <div class="user-data">
                <p class="username">{{userdata.name}}<span class="tag">#{{userdata.tag}}</span></p>
            </div>
        </div>
        <div class="userpage__presences">
            <h1>User presences</h1>
            <div class="presence-container">
            <listing
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
import Listing from "../../components/Listing";
import { Promise, isPromise } from 'q';

export default {
  name: "userpage",
  components: {
      Listing
  },
  data() {
    return {
      userdata: [],
      userpresences: [],
    };
  },
  created() {
      let Vue = this;
      Vue.$parent.isProcessing = true;
      axios(`https://api.premid.app/credits/${Vue.$route.params.userid}`)
      .then((res) => {
          Vue.$data.userdata = res.data;
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
                  if(presence.metadata.author.name == Vue.$data.userdata.name) Vue.$data.userpresences.push(presence.metadata);
              });

              Promise.all(foreach).finally((res) => {
                  Vue.$parent.isProcessing = false;
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
