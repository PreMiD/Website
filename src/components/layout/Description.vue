<template>
  <div class="main">
    <!--div class="learn-more">
      <img class="waves" src="./../../assets/images/learn-more.svg">
      <center><h2>Learn more about <img src="./../../assets/images/premid-white.svg"></h2><br><i class="fas fa-angle-down"></i></center>
    </div>-->
    
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
      members: 3000
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
  height: 2vh;
  color: @white;
}

.learn-more {
  margin-top: -4.5%;
  margin-left: -6%;
  .waves {
    width: 110vw;
    height: 8vh;
    object-fit: cover;
  }
  center {
    font-family: Inter;
    margin-top: -5.2rem;
    i {
      margin-top: -3.2rem;
      font-size: 3.6rem;
    }
  }
}

.ready {
  font-weight: bold;
}
</style>
