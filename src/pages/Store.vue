<template>
  <section>
    <div class="store-menu">
      <div class="store-menu__searchbar-container">
        <i class="fas fa-search"></i>
        <input class="searchbar" :placeholder="$t('store.search')" v-model="presenceSearch" />
        <div class="searchbar-container__controls">
          <div class="nsfw_toggle pmd_checkbox">
            <p>NSFW</p>
            <label>
              <input type="checkbox" :checked="nsfw" @change="nsfw = !nsfw" />
              <span ref="checkbox" class="checkbox-container"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="category-container">
        <nuxt-link class="label" :class="{ 'nuxt-link-exact-active': currentCategory == 'all' }"
          :to="{ query: { page: currentPageNumber, category: 'all' } }">
          <i :class="'fas fa-map'" />
          {{ $t("store.category.all") }}
        </nuxt-link>
        <nuxt-link class="label" v-for="category in this.categories" :key="category.id"
          :to="{ query: { page: currentPageNumber, category: category.id } }">
          <i :class="'fas fa-' + category.icon" />
          {{ category.title }}
        </nuxt-link>
      </div>

      <h1 class="heading" v-if="filteredPresences.length <= 0">
        We can't find that presence
        <i class="fas fa-sad-tear"></i>
      </h1>
      <div class="presence-container">
        <StoreCard v-for="presence in paginatedData" v-bind:key="presence.service" :presence="presence"
          :hot="hotPresences.includes(presence.service)" />
      </div>
    </div>
    <div class="pagination-container">
      <paginate :no-li-surround="true" :break-view-link-class="'hidden'" :page-link-class="'button button_pagination'" :page-count="pageCount" v-model="currentPageNumber" :page-range="3" :click-handler="paginationEvent" :prev-text="``" :next-text="``"
        :container-class="'pagination'" :page-class="'page-item'">
          <span slot="breakViewContent"></span>
      </paginate>
      <!-- <Pagination
        v-if="this.$data.presenceSearch == ''"
        :pageCategory="this.currentCategory"
        :pageNumber="currentPageNumber"
        :pageCount="pageCount"
      /> -->
    </div>
  </section>
</template>

<script>
  import StoreCard from "./../components/StoreCard.vue";
  import Pagination from "./../components/Pagination.vue";

  import axios from "axios";

  export default {
    name: "store",
    components: {
      StoreCard,
      Pagination
    },
    data() {
      return {
        categories: {
          anime: {
            icon: "star",
            id: "anime",
            title: "Anime"
          },
          games: {
            icon: "leaf",
            id: "games",
            title: this.$t("store.category.games")
          },
          music: {
            icon: "music",
            id: "music",
            title: this.$t("store.category.music")
          },
          socials: {
            icon: "comments",
            id: "socials",
            title: this.$t("store.category.socials")
          },
          videos: {
            icon: "play",
            id: "videos",
            title: this.$t("store.category.videos")
          },
          other: {
            icon: "box",
            id: "other",
            title: this.$t("store.category.other")
          }
        },
        presences: [],
        addedPresences: [],
        nsfw: false,
        presenceSearch: "",
        presencesPerPage: 9
      };
    },
    methods: {
      paginationEvent(pageNumber) {
        this.$router.push({query: {page: pageNumber, category: this.currentCategory}});
      },
    },
    async asyncData() {
      const usage = (await axios(`${process.env.apiBase}/usage`)).data.users,
        presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
        .data;

      return {
        presences: (await axios(`${process.env.apiBase}/presences`)).data,
        hotPresences: Object.keys(presenceRanking)
          .map((k, i) => {
            if ((presenceRanking[k] / usage) * 100 > 5) return k;
            else false;
          })
          .filter(p => p)
      };
    },
    created() {
      let self = this;

      // Requesting presences data from our API and adding it into our Vue data.

      this.$data.presences = this.$data.presences.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      this.$data.presences = this.$data.presences.map(
        presence => presence.metadata
      );

      if (
        this.pageCount < Number(this.$route.query.page) ||
        this.$route.query.page <= -1
      ) {
        this.$router.push({
          path: "/notfound"
        });
      }
    },
    computed: {
      currentCategory() {
        return this.$route.query.category ? this.$route.query.category : "all";
      },
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
          .filter(presence => {
            if (this.currentCategory == "all") {
              return presence;
            } else {
              return presence.category == this.currentCategory;
            }
          })
          .sort((a, b) => a.service.localeCompare(b.service));
      },
      currentPageNumber: {
        get() {
          if (Number(this.$route.query.page)) {
            if (this.pageCount < this.$route.query.page) {
              return 1;
            } else {
              return Number(this.$route.query.page);
            }
          } else {
            return 1;
          }
        },
        set(val) {
          return val;
        }
      },
      pageCount() {
        let length = this.filteredPresences.length,
          size = this.$data.presencesPerPage;

        return Math.ceil(length / size);
      },
      paginatedData() {
        if (this.$data.presenceSearch !== "") return this.filteredPresences;
        let start = (this.currentPageNumber - 1) * this.$data.presencesPerPage,
          end = start + this.$data.presencesPerPage;
        return this.filteredPresences.slice(start, end);
      }
    },
    head() {
      return {
        title: "Store"
      };
    }
  };

</script>

<style lang="scss" scoped>
  @import "./../stylesheets/variables.scss";

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
    background: lighten($background-secondary, 4%);
    color: #74787c;
    line-height: 25px;
    font-weight: bold;
    font-family: Inter;

    &:focus {
      background: lighten($background-secondary, 7%);
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
      font-weight: bold;
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
