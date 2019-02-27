<template>
  <div class="main">
    <title>PreMiD - Contributors</title>
    <div v-for="contributor of contributors" v-bind:key="contributor" class="contributor">
      <div class="picture"><img :src="contributor.picture" width="100%" height="100%"></div>
      <span :class="contributor.position">{{ contributor.position.toUpperCase() }}</span>
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
      contributors: [
        {
          name: "Timeraa#7947",
          picture: "https://cdn.discordapp.com/avatars/223238938716798978/96d2e1c86178c8c79c99577e9772ada8.png",
          position: "developer"
        },
        {
          name: "Fruxh#3282",
          picture: "https://cdn.discordapp.com/avatars/259407123782434816/a_cd2423939738e2e32713da9da189707d.gif",
          position: "developer"
        },
        {
          name: "MulverineX#0001",
          picture: "https://cdn.discordapp.com/avatars/178551656714076161/a_d0e66e232c888d6f937887ada48eaa4c.gif",
          position: "contributor"
        },
        {
          name: "Timeraa",
          picture: "",
          position: "Lead Dev"
        },
        {
          name: "Timeraa",
          picture: "",
          position: "Lead Dev"
        },
        {
          name: "Timeraa",
          picture: "",
          position: "Lead Dev"
        }
      ]
    }
  },
  mounted() {
    request("https://api.premid.app/credits", () => {
      let data = JSON.parse(dat);
    })
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 12.5rem));
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
    font-family: Inter;
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
