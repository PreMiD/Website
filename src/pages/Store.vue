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
      <listing v-for="presence in paginatedData" v-bind:key="presence.service" :presence="presence" />
    </div>
    <div class="pagination-container">
      <Pagination v-if="this.$data.presenceSearch == ''" :pageNumber="currentPageNumber" :pageCount="pageCount" />
    </div>
  </div>
</template>

<script>
  import Listing from "./../components/Listing.vue";
  import Pagination from "./../components/Pagination";

  import request from "request";

  import axios from "axios";
  import {
    Promise
  } from 'q';

  export default {
    name: "store",
    components: {
      Listing,
      Pagination
    },
    data() {
      return {
        presences: [],
        nsfw: false,
        presenceSearch: "",
        presencesPerPage: 9
      };
    },
    created() {
      let self = this;

      this.$parent.isProcessing = true;

      // Requesting presences data from our API and adding it into our Vue data.
      axios(`https://api.premid.app/v2/presences`)
        .then(function (res) {
          let presences = res.data.sort((a, b) => a.name.localeCompare(b.name));

          var foreach = res.data.map((presence) => {
            self.$data.presences.push(presence.metadata);
          });

          Promise.all(foreach).finally(() => {
            self.$parent.isProcessing = false;
          });

        })
        .catch(function (error) {
          console.error(error);
        });
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
      },
      currentPageNumber() {
        if(Number(this.$route.query.page)) {
          return Number(this.$route.query.page);
        } else {
          return 1;
        }
      },
      pageCount() {
        let length = this.filteredPresences.length,
          size = this.$data.presencesPerPage;

        return Math.ceil(length / size);
      },
      paginatedData() {
        if(this.$data.presenceSearch !== "") return this.filteredPresences;
        let start = (this.currentPageNumber - 1) * this.$data.presencesPerPage,
          end = start + this.$data.presencesPerPage;
        return this.filteredPresences.slice(start, end);
      }
    },
    methods: {}
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
    align-items: center;

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
      margin: 0 2em;
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
    color: #74787c;
  }

  .nsfw_toggle {
    height: 35px;
    display: flex;
    align-items: center;

    p {
      margin: 0;
      margin-right: 10px;
      font-size: 1.1rem;
      font-weight: 800;
    }
  }

  .nsfw-check {
    &-c {
      position: absolute;
      margin-top: -2.7rem;
      margin-left: 20rem;
    }
  }

</style>
