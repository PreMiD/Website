<template>
  <div class="main">
    <router-link to="/Home">
      <img class="logo" src="./../../assets/images/logo.svg">
      
      <img src="./../../assets/images/premid.svg" class="title">
    </router-link>
    <span class="categories">
      <router-link
        :to="'/' + category.route"
        v-for="category of categories"
        v-bind:key="category"
        class="category"
      >
        <i :class="'fas fa-' + category.logo"></i>
        <span class="category_title">{{ category.title }}</span>
      </router-link>
    </span>
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
          route: "Store",
          title: "STORE"
        },
        {
          logo: "download",
          route: "Downloads",
          title: "DOWNLOADS"
        },
        {
          logo: "users",
          route: "Contributors",
          title: "CONTRIBUTORS"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "./../../stylesheets/colors.less";

.main {
  background: @background-secondary;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: @accent-primary;
  * {
    user-select: none;
  }
}

.logo {
  margin-right: 0.3rem;
}

.title {
  vertical-align: top;
  margin-top: 0.5rem;
}

.categories {
  vertical-align: top;
  line-height: 2.5rem;
  font-size: 1.2rem;
  font-weight: bolder;
  float: right;
  .category {
    margin-left: 1.2rem;
    &_title {
      font-family: Inter;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}
</style>
