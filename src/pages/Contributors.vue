<template>
  <div class="main">
    <title>PreMiD - Contributors</title>
    <div v-for="contributor of contributors" v-bind:key="contributor" :onmouseover="'this.style.background=\'' + contributor.roleColor + '\''" :onmouseout="'this.style.background=\'' + '\''" class="contributor">
      <div class="picture"><img :src="contributor.avatar" width="100%" height="100%"></div>
      <span :style="'color: ' + contributor.roleColor + ';'">{{ contributor.role.toUpperCase() }}</span>
      <br>
      <span class="name">{{ contributor.name.toUpperCase() }}</span>
    </div>
  </div>
</template>

<script>
import request from "request";

export default {
  name: "contributors",
  data() {
    return {
      contributors: []
    }
  },
  mounted() {
    request("https://api.premid.app/credits", (err, res, dat) => {
      let data = JSON.parse(dat);
      data.sort((a, b) => b.rolePosition - a.rolePosition);
      this.$data.contributors = data;
    })
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 12.5rem));
  justify-content: center;
  padding: 1.5rem;
}

.contributor {
  width: 12rem;
  height: 15.2rem;
  border-radius: .3rem;
  background: @background-secondary;
  margin-bottom: .5rem;
  .picture {
    width: 12rem;
    height: 12rem;
    img {
      border-radius: .3rem .3rem 0 0;
    }
  }
  span {
    font-weight: bold;
    font-family: 'Discord Font';
    &.name {
      color: white;
      font-size: .8rem;
    }
    &.developer {
      color: #349BE1;
    }
    &.admin {
      color: #C62828;
    }
  }
}
</style>
