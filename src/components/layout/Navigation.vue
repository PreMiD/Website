<template>
  <div class="main">
    <router-link to="/home">
      <img class="logo" src="./../../assets/images/logo.svg">

      <span class="title">PREMID</span>
    </router-link>
    <span class="categories">
      <router-link
        :to="'/' + category.route"
        v-for="category of categories"
        v-bind:key="category"
        class="category"
      >
        <i :class="'fas fa-' + category.logo"></i>
        <span class="category_title" :style="'width: ' + category.title.length + 'ch;'">{{ category.title }}</span>
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
  margin-left: 0.5rem;
  margin-right: 0.3rem;
}

.title {
  vertical-align: super;
  font-family: "Discord Font";
  font-size: 2rem;
  filter: drop-shadow(.01rem .01rem 0rem rgba(0, 0, 0, 0.4));
  transition: filter .12s;
  &:hover {
    filter: drop-shadow(.2rem .2rem 0rem rgba(0, 0, 0, 0.4));
    transition: filter .12s;
  }
}

.categories {
  vertical-align: top;
  line-height: 2.5rem;
  font-size: 1.2rem;
  font-weight: bolder;
  float: right;
  display: flex;
  .category {
    margin-left: 2rem;
    &_title {
      font-family: Inter;
      font-weight: 800;
      font-size: 1.35rem;
      &::after {
        content: '';
        display: block;
        width: 0;
        height: .12rem;
        background: currentColor;
        transition: all 0.2s ease;
        margin-left: 53%;
        margin-top: -.3rem;
        transform: translate(-50%, 0); /*Add this*/
      }
    }
    &:hover {
      span::after {
        width: 80%;
      }
    }
  }
}
</style>
