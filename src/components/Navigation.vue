<template>
  <div class="navbar__container">
    <div class="navbar">
      <nuxt-link to="/">
        <div class="navbar__logotype">
          <img src="./../assets/images/logo.svg" />
          <h1>PreMiD</h1>
        </div>
      </nuxt-link>
      <div class="navbar__items on-desktop">
        <nuxt-link
          :to="'/' + category.route"
          v-for="category of categories"
          v-bind:key="category.route"
          class="navbar__item"
        >
          <i :class="'fas fa-' + category.logo" />
          <span class="item__title">{{ $t(`header.${category.route}`) }}</span>
        </nuxt-link>
      </div>
      <div class="mobile-navbar__menu on-mobile">
        <a ref="menuTrigger" v-on:click="mobileMenuActive = !mobileMenuActive">
          <i class="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <transition name="slide-down" mode="out-in">
      <div
        v-if="mobileMenuActive"
        v-on:click="mobileMenuActive = false"
        class="mobile-navbar__items on-mobile"
      >
        <nuxt-link
          :to="'/' + category.route"
          v-for="category of categories"
          v-bind:key="category.route"
          class="navbar__item"
        >
          <i :class="'fas fa-' + category.logo" />
          <span class="item__title">{{ $t(`header.${category.route}`) }}</span>
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      mobileMenuActive: false,
      categories: [
        {
          logo: "box-open",
          route: "store",
          title: "STORE"
        },
        {
          logo: "file-export",
          route: "downloads",
          title: "DOWNLOADS"
        },
        {
          logo: "project-diagram",
          route: "contributors",
          title: "CONTRIBUTORS"
        }
      ]
    };
  },
  methods: {
    showMobileNavigation() {
      if (this.$refs.menuMobile.style.display !== "flex") {
        this.$refs.menuMobile.style.display = "flex";
      } else this.$refs.menuMobile.style.display = "none";
    }
  }
};
</script>