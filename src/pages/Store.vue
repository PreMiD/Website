<template>
  <div>
    <title>PreMiD - Store</title>
    <div class="store-menu">
      <div class="store-menu__searchbar-container">
        <i class="fas fa-search"></i>
        <input class="searchbar" placeholder="Search" v-model="presenceSearch" />
        <div class="searchbar-container__controls">
          <div class="nsfw_toggle pmd_checkbox">
            <p>NSFW</p>
            <label>
              <input type="checkbox" :value="nsfw" @change="nsfw =!nsfw" />
              <span ref="checkbox" class="checkbox-container"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="presence-container">
      <listing
        v-for="presence of filteredPresences"
        v-bind:key="presence.service"
        :presence="presence"
      />
    </div>
  </div>
</template>

<script>
import Listing from "./../components/Listing.vue";
import Checkbox from "./../components/Checkbox.vue";
import request from "request";

import axios from "axios";

export default {
  name: "store",
  components: {
    Listing
    // Checkbox
  },
  data() {
    return {
      presences: [],
      extension_installed: false,
      presences_installed: "",
      nsfw: false,
      presenceSearch: ""
    };
  },
  created() {
    // Vue hook to call it inside JS functions.
    var self = this;

    // Requesting presences data from our API and adding it into our Vue data.
    axios
      .get(`https://api.premid.app/presences`)
      .then(function(res) {
        let presences = res.data.sort((a, b) => a.name.localeCompare(b.name));
        for (let presence of presences) {
          let url =
            presence.url
              .replace(
                "https://gist.githubusercontent.com/",
                "https://gistcdn.githack.com/"
              )
              .slice(0, -1) + "/metadata.json";
          self.getPresenceData(url);
        }
      })
      .catch(function(error) {
        console.error(error);
      });

    // Capturing event with presence data from extension.
    window.addEventListener("PreMiD_GetWebisteFallback", function(data) {
      self.debugMessage("Recieved information from Extension!");
      var dataString = data.detail.toString().split(",");
      self.$data.presences_installed = dataString;
    });
  },
  mounted() {
    // Vue hook to call it inside JS functions.
    var self = this;
    // Checking if user has the extension installed.
    setTimeout(function() {
      if (self.extensionInstalled()) {
        self.$data.extension_installed = true;
        self.$noty.success(self.$t(`store.message.success`));
        self.debugMessage("Extension installed, unlocking functions...");
      } else {
        self.$data.extension_installed = false;
        self.$noty.error(self.$t(`store.message.error`));
        self.errorMessage("Extension not found, locking functions...");
      }
    }, 1000);

    // Firing event to get response from Extension with installed presences data.
    var event = new CustomEvent("PreMiD_GetPresenceList", {});
    window.dispatchEvent(event);
  },
  computed: {
    filteredPresences() {
      return this.$data.presences
        .filter(presence => {
          return presence.service
            .toLowerCase()
            .includes(this.presenceSearch.toLowerCase());
        })
        .filter(presence =>
          this.$data.nsfw ? true : !presence.tags.includes("nsfw")
        )
        .sort((a, b) => a.service.localeCompare(b.service));
    }
  },
  methods: {
    getPresenceData: async function(url) {
      await axios
        .get(url)
        .then(res => {
          this.$data.presences.push(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/variables.less";

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
    width: stretch;
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
  color: #74787c;
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
    color: #74787c;
  }
}

.fa-search {
  position: absolute;
  margin-left: 0.6rem;
  margin-top: 7px;
  color: #74787c;
}

.nsfw-check {
  &-c {
    position: absolute;
    margin-top: -2.7rem;
    margin-left: 20rem;
  }
}
</style>
