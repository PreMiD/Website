<template>
  <div class="main">
    <title>PreMiD - Store</title>
    <listing v-for="presence of presences" v-bind:key="presence" :presence="presence" />
    <listing :presence="submit_own" submit="true" />
  </div>
</template>

<script>
import Listing from "./../components/layout/Listing.vue";
import request from "request";

export default {
  name: "store",
  components: {
    Listing
  },
  data() {
    return {
      presences: [
        {
          author: {
            discordID: "223238938716798978",
            name: "Timeraa"
          },
          source: {
            type: "github",
            user: "MulverineX",
            id: "37896f882bf9f052ef6cc863ae33ef91",
            revision: "0079b5b9c88d7e648d513582d4d39e6d01f52936",
            file_name: "example"
          },
          logo: "https://svgur.com/i/BEw.svg",
          color1: "#6441a5",
          color2: "transparent",
          service: "Twitch",
          url: "https://twitch.com",
          description:
            "We are a global community of millions who come together each day to create their own entertainment.",
          service_tags: ["video", "media"]
        },
        {
          author: {
            discordID: "178551656714076161",
            name: "Mulverine"
          },
          source: {
            type: "github",
            user: "MulverineX",
            id: "37896f882bf9f052ef6cc863ae33ef91",
            revision: "0079b5b9c88d7e648d513582d4d39e6d01f52936",
            file_name: "example"
          },
          logo: "https://svgur.com/i/BGB.svg",
          color1: "#E40813",
          color2: "transparent",
          service: "Masteranime",
          url: "https://masterani.me",
          description: "Watch. Track. Anime.",
          service_tags: ["video", "media"]
        }
      ],
      submit_own: {
        logo: "https://svgur.com/i/BGB.svg",
        color1: "#7289DA",
        color2: "transparent",
        service: "Submit your own",
        url: "https://masterani.me",
        description:
          "Can’t find the service you’re looking for? Create or suggest your own! Click below for more info.",
        service_tags: ["video", "media"]
      }
    };
  },
  mounted() {
    request(

    )
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main {
  padding: 1rem;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 18rem));
  height: 78%;
}
</style>
