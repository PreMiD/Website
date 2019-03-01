<template>
  <div class="main">
    <title>PreMiD - Store</title>
    <i class="fas fa-search"></i>
    <input class="search_bar" placeholder="Search" v-on:input="update_search()">
    <div class="nsfw-check-c"><checkbox selector="nsfw-check" text="NSFW" toggle="nsfw" /></div>
    <div class="shadow"></div>
    <div class="main-container">
      <listing v-if="!searching" v-for="presence of presences" v-bind:key="presence" :presence="presence" :nsfw="nsfw" />
      <listing v-if="searching" v-for="presence of presence_search" v-bind:key="presence" :presence="presence" />
      <listing :presence="submit_own" submit="true" />
    </div>
  </div>
</template>

<script>
import Listing from "./../components/layout/Listing.vue";
import Checkbox from "./../components/Checkbox.vue";
import request from "request";
import submit from "./../assets/images/submit.svg";

export default {
  name: "store",
  components: {
    Listing,
    Checkbox
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
            user: "Timeraa",
            id: "f95c06d49eff2e88fd46733b6b61eacf",
            revision: "b828b17fcbb711ed90d64baa574d631abe65931d",
            file_name: "example"
          },
          logo: "https://svgur.com/i/BGF.svg",
          color1: "#FF0000",
          color2: "transparent",
          service: "YouTube",
          url: "https://masterani.me",
          description:
            "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
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
          service_tags: ["video", "media", "anime"]
        },
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
            discordID: "223238938716798978",
            name: "Timeraa"
          },
          source: {
            type: "github",
            user: "Timeraa",
            id: "f95c06d49eff2e88fd46733b6b61eacf",
            revision: "b828b17fcbb711ed90d64baa574d631abe65931d",
            file_name: "example"
          },
          logo: "https://svgur.com/i/BGu.svg",
          color1: "#FF0000",
          color2: "transparent",
          service: "YouTube Music",
          url: "https://youtube.com",
          description:
            "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
          service_tags: ["video", "media"]
        },
        {
          author: {
            discordID: "223238938716798978",
            name: "Timeraa"
          },
          source: {
            type: "github",
            user: "Timeraa",
            id: "f95c06d49eff2e88fd46733b6b61eacf",
            revision: "b828b17fcbb711ed90d64baa574d631abe65931d",
            file_name: "example"
          },
          logo: "https://svgur.com/i/BVz.svg",
          color1: "#F8981E",
          color2: "transparent",
          service: "Pornhub",
          url: "https://pornhub.com",
          description:
            "Porn.",
          service_tags: ["video", "media", "porn"],
          nsfw: true
        },
      ],
      submit_own: {
        logo: submit,
        color1: "#7289DA",
        color2: "transparent",
        service: "Submit your own",
        url: "https://masterani.me",
        description:
          "Can’t find the service you’re looking for? Create or suggest your own! Click below for more info.",
        service_tags: ["video", "media"]
      },
      searching: false,
      nsfw: false,
      presence_search: []
    };
  },
  mounted() {
    this.$data.presences = this.$data.presences.sort(
      this.dynamicSort("service")
    );
  },
  methods: {
    dynamicSort(property) {
      var sortOrder = 1;

      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      return function(a, b) {
        if (sortOrder == -1) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      };
    },
    update_search() {
      let input = document.getElementsByClassName("search_bar")[0];
      //this.$data.searching = true;
      if (input.value != "") {
        this.$data.searching = true;
        this.$data.presence_search = [];
        for (let presence of this.$data.presences) {
          let stop = false;
          if (
            presence.service.toLowerCase().search(input.value.toLowerCase()) !=
            -1
          ) {
            this.$data.presence_search.push(presence);
            stop = true;
          }
        }
      } else {
        this.$data.searching = false;
      }
    },
    toggleInput(input) {
      if (input == "nsfw") if (!this.$data.nsfw) this.$data.nsfw = true; else this.$data.nsfw = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main-container {
  padding: 1rem;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 18rem));
  height: 73.1vh;
}
.shadow {
  position: absolute;
  width: 100%;
  height: 0.25rem;
  margin-right: -1rem;
  margin-top: 0rem;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 0) 100%);;
}

.search_bar {
  width: 12rem;
  height: 1.8rem;
  transition: width 100ms;
  border: none;
  background: @background-secondary;
  border-radius: 1.4rem;
  margin-top: 1rem;
  margin-left: 1rem;
  padding-left: 1.8rem;
  color: @white-2;
  font-weight: bold;
  font-family: Inter;
  margin-bottom: 1rem;
  &:focus {
    color: @white;
    transition: width 100ms;
    width: 18rem;
    outline: none;
  }
  * {
    margin-left: -17.5rem;
  }
  &::placeholder {
    color: @white-2;
  }
}
.fa-search {
  position: absolute;
  margin-left: 1.5rem;
  margin-top: 1.4rem;
  color: @white-2;
}

.nsfw-check {
  &-c {
    position: absolute;
    margin-top: -2.7rem;
    margin-left: 20rem;
  }
}
</style>
