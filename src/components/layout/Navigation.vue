<template>
<div class="navbar__container">
  <div class="navbar">
    <router-link to="/home">
    <div class="navbar__logotype">
      <img src="./../../assets/images/logo.svg">
      <p class="logotype__title">PREMID</p>
      </div>
    </router-link>
    <div class="navbar__items on-desktop">
      <router-link
        :to="'/' + category.route"
        v-for="category of categories"
        v-bind:key="category.route"
        class="navbar__item"
      >
        <i :class="'fas fa-' + category.logo"></i>
        <span class="item__title">{{ category.title }}</span>
      </router-link>
    </div>
    <div class="mobile-navbar__menu on-mobile">
      <a ref="menuTrigger" v-on:click="showMobileNavigation" href="javascript:void(0);"><i class="fas fa-bars"></i></a>
    </div>
  </div>
      <div ref="menuMobile" class="mobile-navbar__items on-mobile">
        <router-link
        :to="'/' + category.route"
        v-for="category of categories"
        v-bind:key="category.route"
        class="navbar__item"
      >
        <i :class="'fas fa-' + category.logo"></i>
        <span class="item__title">{{ category.title }}</span>
      </router-link>
    </div>
</div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      categories: [
        {
          logo: "store",
          route: "store",
          title: "STORE"
        },
        {
          logo: "download",
          route: "downloads",
          title: "DOWNLOADS"
        },
        {
          logo: "users",
          route: "contributors",
          title: "CONTRIBUTORS"
        }
      ]
    };
  },
  methods: {
    showMobileNavigation() {
      if (this.$refs.menuMobile.style.display !== 'flex') {
        this.$refs.menuMobile.style.display = 'flex'
      } else this.$refs.menuMobile.style.display = 'none';
    }
  }
};
</script>
