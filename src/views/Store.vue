<template>
  <section>
    <div class="store-grid">
      <div class="store-menu store-grid__sidebar">
        <p class="sidebar__subheader">{{ $t("store.header.search") }}</p>
        <div class="store-menu__searchbar-container">
          <input
            type="text"
            class="searchbar"
            :placeholder="$t('store.search')"
            v-model="presenceSearch"
          />
        </div>

        <p class="sidebar__subheader">{{ $t("store.category.filters.heading") }}</p>

        <div class="checkbox-switcher">
          <label>
            <input type="checkbox" :checked="mostUsed" @change="mostUsed = !mostUsed" />
            <span ref="checkbox" class="checkbox-container"></span>
            <p>{{ $t("store.category.filters.mostUsed") }}</p>
          </label>
        </div>

        <div class="checkbox-switcher">
          <label>
            <input type="checkbox" :checked="nsfw" @change="nsfw = !nsfw" />
            <span ref="checkbox" class="checkbox-container"></span>
            <p>{{ $t("store.category.filters.allowAdult") }}</p>
          </label>
        </div>

        <p class="sidebar__subheader">{{ $t("store.category.heading") }}</p>
        <div class="container">
          <div class="category-container">
            <nuxt-link
              class="category-item"
              :class="{ 'nuxt-link-exact-active': currentCategory == 'all' }"
              :to="{ query: { page: currentPageNumber, category: 'all' } }"
            >
              <i :class="'fas fa-map'" />
              {{ $t("store.category.all") }}
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'anime' } }"
            >
              <i class="fas fa-star" />
              Anime
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'games' } }"
            >
              <i class="fas fa-leaf" />
              {{ $t("store.category.games") }}
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'music' } }"
            >
              <i class="fas fa-music" />
              {{ $t("store.category.music") }}
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'socials' } }"
            >
              <i class="fas fa-comments" />
              {{ $t("store.category.socials") }}
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'videos' } }"
            >
              <i class="fas fa-play" />
              {{ $t("store.category.videos") }}
            </nuxt-link>
            <nuxt-link
              class="category-item"
              :to="{ query: { page: currentPageNumber, category: 'other' } }"
            >
              <i class="fas fa-box" />
              {{ $t("store.category.other") }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="store-grid__content">
        <h1 class="heading" v-if="filteredPresences.length <= 0">
          {{ $t("store.search.notFound") }}
          <i class="fas fa-sad-tear"></i>
        </h1>
        <div class="presence-container">
          <StoreCard
            v-for="presence in paginatedData"
            v-bind:key="presence.service"
            :presence="presence"
            :hot="hotPresences.includes(presence.service)"
          />
        </div>
      </div>
    </div>

    <paginate
      container-class="pagination-container"
      :no-li-surround="true"
      break-view-link-class="hidden"
      page-link-class="button--pagination"
      :page-count="pageCount"
      v-model="currentPageNumber"
      :page-range="5"
      :click-handler="paginationEvent"
      prev-text
      next-text
      page-class="page-item"
    >
      <span slot="breakViewContent"></span>
    </paginate>
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
  auth: false,
  data() {
    return {
      presences: [],
      addedPresences: [],
      nsfw: false,
      mostUsed: true,
      presenceSearch: "",
      presencesPerPage: 12
    };
  },
  methods: {
    paginationEvent(pageNumber) {
      this.$router.push({
        query: {
          page: pageNumber,
          category: this.currentCategory
        }
      });
    }
  },
  async asyncData() {
    const usage = (await axios(`${process.env.apiBase}/usage`)).data.users,
      presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
        .data,
      presencesList = (await axios(`${process.env.apiBase}/presences`)).data;

    //! This code must be deleted after API will be updated
    //! to have presence usage count inside the returned data already.
    for (var presence in presenceRanking) {
      let score = presenceRanking[presence];
      presencesList.some((element, index) => {
        // Setting zero score for all presences.
        if (!element.metadata.usage) presencesList[index].metadata.usage = 0;
        // Setting presence usage score based on the API's results.
        if (element.metadata.service.toLowerCase() == presence.toLowerCase()) {
          presencesList[index].metadata.usage = score;
          return true;
        } else return false;
      });
    }

    return {
      presences: presencesList,
      topPresences: presenceRanking,
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
      this.$nuxt.error({ statusCode: 404, message: "No presences available." });
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
        .sort((a, b) => a.service.localeCompare(b.service))
        .sort((a, b) => {
          if (this.$data.mostUsed) {
            return b.usage - a.usage;
          }
        });
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

.store-menu__searchbar-container {
  display: flex;

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

.fa-search {
  position: absolute;
  margin-left: 0.6rem;
  color: #74787c;
}
</style>
