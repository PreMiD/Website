<template>
  <div class="main">
    <title>PreMiD - Contributors</title>
    <div v-for="contributor of contributors" v-bind:key="contributor" :onmouseover="'this.style.background=\'' + contributor.roleColor + '\'; this.style.color=\'#23272A\''" :onmouseout="'this.style.background=\'' + '\'; this.style.color=\'' + contributor.roleColor + '\''" class="contributor">
      <div class="picture"><img :src="contributor.avatar" width="100%" height="100%"></div>
      <span>{{ contributor.role.toUpperCase() }}</span>
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
  overflow: scroll;
  height: 77.9vh;
}

.contributor {
  width: 11.5rem;
  height: 15.2rem;
  border-radius: .3rem;
  background: @background-secondary;
  transform: translate(0.5rem);
  margin-bottom: 1rem;
  padding-left: .5rem;
  @transition-time: 150ms;
  transition: box-shadow @transition-time ease, transform @transition-time ease, color @transition-time, background @transition-time;
  &:hover {
    transform: translate(.2rem, -.3rem);
    margin-bottom: .5rem;
    box-shadow: 0.35rem 0.35rem rgba(0, 0, 0, 0.2);
    transition: box-shadow @transition-time ease, transform @transition-time ease, color @transition-time, background @transition-time;
    .picture {
      width: 11rem;
      height: 11rem;
      margin-top: .5rem;
      margin-left: 0rem;
      transition: margin-top @transition-time ease, margin-left @transition-time ease, width @transition-time ease, height @transition-time ease;
    }
  }
  .picture {
    width: 12rem;
    height: 12rem;
    margin-bottom: .25rem;
    margin-left: -.5rem;
    transition: margin-top @transition-time ease, margin-left @transition-time ease, width @transition-time ease, height @transition-time ease;
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
  }
}
</style>
