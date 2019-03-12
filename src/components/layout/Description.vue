<template>
  <div class="main">
    <div class="ready-c">
      <span class="ready">Ready to try PreMiD? It’s free!</span>
      <br>
      <span class="ready-sub">Join {{ members }} members</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "description",
  data() {
    return {
      members: 4000
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
  padding-left: 5%;
  padding-right: 1rem;
  height: 10vh;
  color: @white;
}

.learn-more {
  margin-left: -6%;
  center {
    font-family: Inter;
    i {
      font-size: 3.6rem;
    }
  }
}

.ready {
  font-weight: bold;
}
</style>
