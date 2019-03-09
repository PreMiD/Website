<template>
  <div class="main">
    <title>PreMiD - Downloads</title>
    <center>
      <h2 class="title">Downloads</h2>
      <h2>Application</h2>
      <div class="platforms">
        <i v-for="platform of platforms" v-bind:key="platform" :class="'platform fab fa-' + platform"></i>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "downloads",
  data() {
    return {
      platforms: ["windows","apple","linux"]
    };
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main {
  padding: 2.5rem;
  color: #99AAB5;
}

.title {
  color: @accent-primary;
}

h2 {
  font-family: 'Discord Font';
  font-size: 2.7rem;
  line-height: 2rem;
}

.platform {
  background: #23272A;
  color: @accent-primary;
  font-size: 6.5rem;
  padding: 1rem;
  margin: .5rem;
  width: 7rem;
  height: 7rem;
  border-radius: .8rem;
}
</style>
