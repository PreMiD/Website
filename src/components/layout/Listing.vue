<template>
  <div class="listing_container" v-if="nsfw || !presence.nsfw">
    <div class="listing">
        <div class="content">
          <div
            class="logo"
            :style="`background: linear-gradient(135deg, ${presence.color1} 0%, ${presence.color2} 100%);`"
          >
            <a title="Verified" style="cursor: default;"><img src="./../../assets/images/verified.svg" class="verified" v-if="!submit"></a>
            <img :src="presence.logo" class="service_logo">
          </div>
          <h2>
            {{ presence.service }}
            <span v-if="!submit">
              -
              <a>{{ presence.author.name }}</a>
            </span>
          </h2>
          <p class="desc">{{ presence.description }}</p>
        </div>
        <div class="buttons">
          <div class="container">
            <div class="left" v-if="!submit">
              <button class="service" v-on:click="openInNewTab(presence.url)">
                <span class="icon">(a)</span> Service
              </button>
            </div>
            <div class="right" v-if="!submit">
              <button
                class="add"
                v-on:click="openInNewTab(`chrome-extension://agjnjboanicjcpenljmaaigopkgdnihi/add.html?src=https://gistcdn.githack.com/${presence.source.user}/${presence.source.id}/raw/${presence.source.revision}/${presence.source.file_name}.js`)"
              >
                <span class="icon">+</span> Add to PreMiD
              </button>
            </div>
            <router-link replace to="/Submit"><button class="submit" v-if="submit">Submit</button></router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "listing",
  props: ["presence", "submit", "nsfw"],
  methods: {
    openInNewTab(url) {
      let page = window.open(url, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../../stylesheets/colors.less";

.listing {
  width: 16rem;
  height: 24rem;
  &_container {
    width: 18rem;
    height: 25.9rem;
  }
  background: @background-secondary;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-right: 3rem;
  color: @white;
  display: grid;
  grid-template-areas:
    "top"
    "bottom";
  transition: box-shadow 120ms;
  &:hover {
    box-shadow: 0.25rem 0.25rem rgba(0, 0, 0, 0.09);
    transition: box-shadow 120ms;
    .content .logo {
      transition: box-shadow 120ms;
      box-shadow: inset 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
      img.service_logo {
        width: 6.2rem;
        height: 6.2rem;
        transition: width 120ms;
        transition: height 120ms;
        top: 28%;
        left: 16%;
        transition: top 120ms;
        transition: left 120ms;
      }
    }
  }
  .content {
    padding: 0.5rem;
    grid-area: top;
    justify-self: top;
    .logo {
      width: 15rem;
      height: 15rem;
      border-radius: 0.4rem;
      transition: box-shadow 120ms;
      img.verified {
        position: relative;
        margin-left: 0.5rem;
        top: -4.2rem;
      }
      img.service_logo {
        width: 6rem;
        height: 6rem;
        transition: width 120ms;
        transition: height 120ms;
        top: 30%;
        left: 17%;
        transition: top 120ms;
        transition: left 120ms;
        position: relative;
        filter: drop-shadow(0rem 0rem 0.7rem rgba(0, 0, 0, 0.5));
      }
    }
    h2 {
      font-size: 1.3rem;
      line-height: 0.2rem;
      span {
        color: @white-2;
        font-size: 1.1rem;
        a {
          color: inherit;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    p {
      color: @white-2;
      font-weight: bold;
      font-size: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .buttons {
    width: 100%;
    position: relative;
    grid-area: bottom;
    margin-top: auto;
    .container {
      display: grid;
      grid-template-areas: "left right";
      .left {
        grid-area: left;
        justify-self: left;
      }
      .right {
        grid-area: right;
        justify-self: right;
      }
    }
    button {
      border: none;
      border-radius: 0.2rem;
      padding: 0.4rem;
      font-weight: bold;
      font-family: Roboto;
      letter-spacing: 0.06rem;
      transition: box-shadow 120ms;
      transition: text-shadow 120ms;
      &:hover {
        box-shadow: 0.18rem 0.18rem rgba(0, 0, 0, 0.2);
        text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
        transition: box-shadow 120ms;
        transition: text-shadow 120ms;
        cursor: pointer;
      }
      &.service {
        background: @background-primary;
        color: @white-2;
      }

      &.add {
        background: @accent-primary;
        color: @white;
      }

      &.submit {
        background: @background-primary;
        color: @white-2;
        width: 16rem;
      }
    }
  }
}
</style>
