<template>
<div class="navbar__container">
  <div class="navbar">
    <router-link to="/home">
    <div class="navbar__logotype">
      <img src="./../../assets/images/logo.svg">
      <p class="logotype__title">PREMID</p>
      </div>
    </router-link>
    <span class="navbar__items">
      <router-link
        :to="'/' + category.route"
        v-for="category of categories"
        v-bind:key="category"
        class="navbar__item"
      >
        <i :class="'fas fa-' + category.logo"></i>
        <span class="item__title" :style="'width: ' + category.title.length + 'ch;'">{{ category.title }}</span>
      </router-link>
    </span>
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
  }
};
</script>

<style lang="less" scoped>
@import "./../../stylesheets/colors.less";
@import "./../../stylesheets/navbar.less";
</style>
