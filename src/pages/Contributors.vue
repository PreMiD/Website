<template>
  <div class="main">
    <title>PreMiD - Contributors</title>
    <div v-for="(contributor, index) of contributors" v-bind:key="contributor" :style="'color: ' + contributor.roleColor + ';'" v-on:mouseover="animate(index)" v-on:mouseout="de_animate(index)" :onmouseover="'this.style.background=\'' + contributor.roleColor + '\'; this.style.color=\'#23272A\''" :onmouseout="'this.style.background=\'' + '\'; this.style.color=\'' + contributor.roleColor + '\''" class="contributor">
      <div class="picture"><img src="foo" width="100%" height="100%"></div>
      <span>{{ contributor.role.toUpperCase() }}</span>
      <br>
      <span class="name">{{ contributor.name.toUpperCase() }}</span>
    </div>
  </div>
</template>

<script>
import request from "request";
import gif_frames from "gif-frames"

export default {
  name: "contributors",
  data() {
    return {
      contributors: [{foo: "bar"}]
    }
  },
  mounted() {
    request("https://api.premid.app/credits", (err, res, dat) => {
      let data = JSON.parse(dat);
      data.sort((a, b) => b.rolePosition - a.rolePosition);
      this.$data.contributors = data;
      console.log("foo")
      setTimeout(() => { 
        
        for(let index in this.$data.contributors) {
          // this.$data.contributors[index].avatar

          if (this.$data.contributors[index].avatar.split(".")[this.$data.contributors[index].avatar.split(".").length - 1] == "gif") {
            console.log(this.$data.contributors[index].avatar)
            gif_frames({ url: this.$data.contributors[index].avatar, frames: 0, outputType: 'canvas' }).then(function (frameData) {
              console.log(frameData[0].getImage());
              let src = document.body.getElementsByClassName("contributor")[index].children[0].children[0].style = "display: none;"
              let can = document.body.getElementsByClassName("contributor")[index].children[0].appendChild(frameData[0].getImage());
              for (let canvas of document.body.getElementsByTagName("canvas")) {
                canvas.style = 'width: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; height: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; border-radius: .3rem .3rem 0 0;';
              }
            }); 
          } else {
            let src = document.body.getElementsByClassName("contributor")[index].children[0].children[0].src = this.$data.contributors[index].avatar;
          }
        }
      }, 1000);
    })
  },
  methods: {
    animate(index) {
      if (this.$data.contributors[index].avatar.split(".")[this.$data.contributors[index].avatar.split(".").length - 1] == "gif") {
        let src = document.body.getElementsByClassName("contributor")[index].children[0].children[0].src = this.$data.contributors[index].avatar;
        let style = document.body.getElementsByClassName("contributor")[index].children[0].children[0].style = "display: block";
        let canvas = document.body.getElementsByClassName("contributor")[index].children[0].children[1].style = 'width: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; height: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; display: none; border-radius: .3rem .3rem 0 0;';
      }
    },
    de_animate(index) {
      if (this.$data.contributors[index].avatar.split(".")[this.$data.contributors[index].avatar.split(".").length - 1] == "gif") {
        let src = document.body.getElementsByClassName("contributor")[index].children[0].children[0].src = this.$data.contributors[index].avatar;
        let style = document.body.getElementsByClassName("contributor")[index].children[0].children[0].style = "display: none";
        let canvas = document.body.getElementsByClassName("contributor")[index].children[0].children[1].style = 'width: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; height: ' + document.body.getElementsByClassName("picture")[0].clientHeight + 'px; display: block; border-radius: .3rem .3rem 0 0;';
      }
    }
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
  transition: 
    box-shadow @transition-time ease, 
    transform @transition-time ease, 
    color @transition-time, 
    background @transition-time;
  &:hover {
    transform: translate(.2rem, -.3rem);
    margin-bottom: .5rem;
    box-shadow: 0.35rem 0.35rem rgba(0, 0, 0, 0.2);
    transition: 
      box-shadow @transition-time ease, 
      transform @transition-time ease, 
      color @transition-time, 
      background @transition-time;
    .picture {
      width: 11rem;
      height: 11rem;
      margin-top: .5rem;
      margin-left: 0rem;
      transition: 
        margin-top @transition-time ease, 
        margin-left @transition-time ease, 
        width @transition-time ease, 
        height @transition-time ease;
    }
  }
  .picture {
    width: 12rem;
    height: 12rem;
    margin-bottom: .25rem;
    margin-left: -.5rem;
    transition: 
      margin-top @transition-time ease, 
      margin-left @transition-time ease, 
      width @transition-time ease, 
      height @transition-time ease;
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
