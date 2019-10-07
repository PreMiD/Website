<template>
  <section>
    <title>PreMiD - Store</title>
    <div v-if="!$root.isProcessing" class="store-menu">
      <div class="store-menu__searchbar-container">
        <i class="fas fa-search"></i>
        <input class="searchbar" placeholder="Search" v-model="presenceSearch" />
        <div class="searchbar-container__controls">
          <div class="nsfw_toggle pmd_checkbox">
            <p>NSFW</p>
            <label>
              <input type="checkbox" :checked="nsfw" @change="nsfw =!nsfw" />
              <span ref="checkbox" class="checkbox-container"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-down" mode="in-out">
      <div
        v-if="!$root.isProcessing"
        class="container"
      >
        <div class="category-container">
          <router-link class="label" :class="{'router-link-exact-active': currentCategory == 'all'}" :to="{ query: {page: currentPageNumber, category: 'all' } }"><i :class="'fas fa-map'" /> All</router-link>
          <router-link class="label" v-for="category in this.categories" :key="category.id" :to="{ query: {page: currentPageNumber, category: category.id } }"><i :class="'fas fa-' + category.icon" /> {{ category.title }}</router-link>
        </div>

        <h1 class="heading" v-if="filteredPresences.length <= 0">
          We can't find that presence
          <i class="fas fa-sad-tear"></i>
        </h1>
        <div class="presence-container">
          
          <StoreCard
            v-for="presence in paginatedData"
            v-bind:key="presence.service"
            :presence="presence"
          />
         
        </div>
      </div>
    </transition>
    <div
      class="pagination-container"
    >
      <Pagination
        v-if="this.$data.presenceSearch == ''"
        :pageCategory="this.currentCategory"
        :pageNumber="currentPageNumber"
        :pageCount="pageCount"
      />
    </div>
  </section>
</template>

<script>
import StoreCard from "./../components/StoreCard.vue";
import CategoryCard from "./../components/CategoryCard";
import Pagination from "./../components/Pagination";

import axios from "axios";
import { Promise } from "q";

export default {
  name: "store",
  components: {
    CategoryCard,
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
          title: "Games"
        },
        music: {
          icon: "music",
          id: "music",
          title: "Music"
        },
        socials: {
          icon: "comments",
          id: "socials",
          title: "Socials"
        },
        videos: {
          icon: "play",
          id: "videos",
          title: "Videos & Streams"
        },
        other: {
          icon: "box",
          id: "other",
          title: "Other"
        }
      },
      presences: [],
      nsfw: false,
      presenceSearch: "",
      presencesPerPage: 9
    };
  },
  created() {
    let self = this;

    this.$root.isProcessing = true;

    // Requesting presences data from our API and adding it into our Vue data.
    axios(`https://api.premid.app/v2/presences`)
      .then(function(res) {
        let presences = res.data.sort((a, b) => a.name.localeCompare(b.name));

        var foreach = res.data.map(presence => {
          self.$data.presences.push(presence.metadata);
        });

        Promise.all(foreach).finally(() => {
          self.$root.isProcessing = false;

          if (
            self.pageCount < Number(self.$route.query.page) ||
            self.$route.query.page <= -1
          ) {
            self.$router.push({
              path: "/notfound"
            });
          }
        });
      })
      .catch(function(error) {
        console.error(error);
        self.$root.isProcessing = false;
        if(error.request) self.$router.push({path: '/maintenance'});
      });
  },
  computed: {
    currentCategory() {
        if(this.$attrs.category) {
          return this.$attrs.category;
        } else {
          return 'all';
        }
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
          console.log(this.currentCategory);
          if(this.currentCategory == 'all') {
            return presence;
          } else {
            return presence.category == this.currentCategory;
          }
          
        })
        .sort((a, b) => a.service.localeCompare(b.service));
    },
    currentPageNumber() {
      if (Number(this.$route.query.page)) {
        if(this.pageCount < this.$route.query.page) {
          return 1;
        } else {
          return Number(this.$route.query.page);
        }
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
      if (this.$data.presenceSearch !== "") return this.filteredPresences;
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
