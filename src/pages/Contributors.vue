<template>
  <div class="main">
    <title>PreMiD - Contributors</title>
    <div
      v-for="(contributor, index) of contributors"
      v-bind:key="contributor.name"
      :style="'color: ' + contributor.roleColor + ';'"
      v-on:mouseover="animate(index)"
      v-on:mouseout="de_animate(index)"
      :onmouseover="'this.style.background=\'' + contributor.roleColor + '\'; this.style.color=\'#23272A\''"
      :onmouseout="'this.style.background=\'' + '\'; this.style.color=\'' + contributor.roleColor + '\''"
      class="contributor"
    >
      <div class="picture">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk1IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5NSAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMTcuNVYzMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMDEiLz48L3N2Zz4="
          width="100%"
          height="100%"
          :onload="'let avatar = `' + contributor.avatar.split('?')[0] + '`; if (!this.still) { this.src = avatar; this.still = ` `; if (avatar.includes(`.gif`)) { this.src = avatar.replace(`.gif`, `.png`); this.still = avatar.replace(`.gif`, `.png`); } }'"
        >
      </div>
      <span>{{ contributor.role.toUpperCase() }}</span>
      <br>
      <span class="name">{{ contributor.name.toUpperCase() }}</span>
    </div>
  </div>
</template>

<script>
import request from "request";
import gif_frames from "gif-frames";

export default {
  name: "contributors",
  data() {
    return {
      contributors: [],
      display: false
    };
  },
  mounted() {
    request("https://api.premid.app/credits", (err, res, dat) => {
      let data = JSON.parse(dat);
      data.sort((a, b) => b.rolePosition - a.rolePosition);
      this.$data.contributors = data;
    });
  },
  methods: {
    animate(index) {
      if (
        this.$data.contributors[index].avatar.split(".")[
          this.$data.contributors[index].avatar.split(".").length - 1
        ] == "gif"
      ) {
        let src = (document.body.getElementsByClassName("contributor")[
          index
        ].children[0].children[0].src = this.$data.contributors[index].avatar);
      }
    },
    de_animate(index) {
      if (
        this.$data.contributors[index].avatar.split(".")[
          this.$data.contributors[index].avatar.split(".").length - 1
        ] == "gif"
      ) {
        let src = (document.body.getElementsByClassName("contributor")[
          index
        ].children[0].children[0].src = document.body.getElementsByClassName(
          "contributor"
        )[index].children[0].children[0].still);
      }
    }
  }
};
</script>

<style lang="less" scoped>

@import "../stylesheets/colors.less";

.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 12.5rem));
  justify-content: center;
  padding: 1.5rem;
}

</style>
