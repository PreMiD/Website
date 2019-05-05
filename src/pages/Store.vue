<template>
  <div>
    <title>PreMiD - Store</title>
    <div class="store-menu">
      <div class="store-menu__searchbar-container">
        <i class="fas fa-search"></i>
        <input class="searchbar" placeholder="Search" v-on:input="update_search()">
        <!-- // TODO: Implement when we will be moving to DB.-->
        <!-- <div class="searchbar-container__controls">
          <a href="#" class="button">Submit</a>
          <a href="#" class="button">Toggle NSFW</a>
        </div> -->
      </div>
      <!-- TODO: Implement when we will be moving to DB.-->
      <!-- <div class="nsfw-check-c"><checkbox selector="nsfw-check" text="NSFW" toggle="nsfw" /></div> -->
    </div>
    <div class="presence-container">
      <listing v-if="!searching" v-for="presence of presences" v-bind:key="presence.service" :presence="presence"
        :nsfw="nsfw" />
      <listing v-if="searching" v-for="presence of presence_search" v-bind:key="presence_search.service"
        :presence="presence" />
    </div>
  </div>
  </div>
</template>

<script>
  import Listing from "./../components/layout/Listing.vue";
  import Checkbox from "./../components/Checkbox.vue";
  import request from "request";
  import submit from "./../assets/images/submit.svg";

  import axios from "axios";

  export default {
    name: "store",
    components: {
      Listing,
      Checkbox
    },
    data() {
      return {
        presences: [],
        extension_installed: false,
        presences_installed: "",
        searching: false,
        nsfw: false,
        presence_search: []
      };
    },
    created() {
      // Vue hook to call it inside JS functions.
      var self = this;

      // Capturing event with presence data from extension.
      window.addEventListener('PreMiD_GetWebisteFallback', function (data) {
        console.log('Recieved information from Extension!');
        var dataString = data.detail.toString().split(',');
        self.$data.presences_installed = dataString;
      });
    },
    mounted() {

      // Vue hook to call it inside JS functions.
      var self = this;

      // Checking if user has the extension installed.
      setTimeout(function () {
        if (document.getElementById('PreMiD_PageVariables') !== null) {
          self.$data.extension_installed = true;
          console.log('Gay stuff!');
        } else {
          self.$data.extension_installed = false;
          console.log('not Gay stuff!');
        }
      }, 1000);

      // Firing event to get response from Extension with installed presences data.
      var event = new CustomEvent('PreMiD_GetPresenceList', {});
      window.dispatchEvent(event);

      // Requesting presences data from our API and adding it into our Vue data.
      axios.get(`https://api.premid.app/presences`)
        .then(function (res) {
          let presences = res.data;
          for (let presence of presences) {
            let url = presence.url.replace("https://gist.githubusercontent.com/", 'https://gistcdn.githack.com/')
              .slice(0, -1) + '/metadata.json';
            self.getPresenceData(url);
          }
        }).catch(function (error) {
          console.log(error);
        });

    },
    methods: {

      getPresenceData: async function (url) {
        await axios.get(url)
          .then((res) => {
            this.$data.presences.push(res.data);
          }).catch((err) => {
            console.log(err);
          });
      },
      dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
        }

        return function (a, b) {
          if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
          } else {
            return a[property].localeCompare(b[property]);
          }
        };
      },
      update_search() {
        let input = document.getElementsByClassName("searchbar")[0];
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
        if (input == "nsfw")
          if (!this.$data.nsfw) this.$data.nsfw = true;
          else this.$data.nsfw = false;
      }
    }
  };

</script>

<style lang="less" scoped>
  @import "./../stylesheets/colors.less";

  .store-menu {
    display: flex;
    background: hsl(216, 7%, 11%);
    padding-bottom: 0.5rem;
  }

  .store-menu__searchbar-container {
    flex: 1 1 auto;
    display: flex;

    position: relative;

    max-width: 700px;
    margin: 0 auto;
    padding: 20px;

    width: 1%;

    input {
      width: -webkit-fill-available;
      border-radius: 99em;
    }

    .searchbar-container__controls {
      margin: 0 4em;
    }

    button,
    .button {

      &:not(:last-child),
      &:not(:first-child) {
        border-radius: 0 0 0 0;
      }

      display: inline-block;
      padding: 0.09rem 10px;
      font-size: 14px;
      line-height: 25px;
      font-weight: bold;
    }

  }

  .searchbar {
    height: 1.8rem;
    padding: 0 10px;
    padding-left: 32px;
    font-size: 14px;
    transition: all 300ms ease;
    border: none;
    background: lighten(@background-secondary, 4%);
    color: fadeOut(@white-2, 15%);
    line-height: 25px;
    font-weight: bold;
    font-family: Inter;

    &:focus {
      background: lighten(@background-secondary, 7%);
      outline: none;
    }

    * {
      margin-left: -17.5rem;
    }

    &::placeholder {
      color: fadeOut(@white-2, 65%);
    }
  }

  .fa-search {
    position: absolute;
    margin-left: 0.6rem;
    margin-top: 7px;
    color: fadeOut(@white-2, 65%);
  }

  .nsfw-check {
    &-c {
      position: absolute;
      margin-top: -2.7rem;
      margin-left: 20rem;
    }
  }

</style>
