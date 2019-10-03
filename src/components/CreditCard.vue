<template>
  <div
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    class="credit-card"
    :style="`background: linear-gradient(165deg, ${cardGradientColor.primary} 0%, ${cardGradientColor.secondary} 100%); box-shadow: 0 2px 42px 0 ${cardShadowColor}`"
  >
    <div class="credit-card__user">
      <h1 :title="user.name" v-text="user.name" />
      <h2>{{ user.role }}</h2>
    </div>
    <div class="credit-card__avatar">
      <span :class="user.status" />
      <img :src="user.avatar + '?size=128'" draggable="false" />
    </div>
  </div>
</template>

<script>
import tinycolor from "tinycolor2";

export default {
  name: "creditcard",
  props: ["user"],
  data() {
    return {
      hovered: false
    };
  },
  computed: {
    cardGradientColor() {
      return {
        primary: tinycolor(this.$props.user.roleColor)
          .setAlpha(1)
          .darken(5)
          .toRgbString(),
        secondary: tinycolor(this.$props.user.roleColor)
          .analogous()[1]
          .setAlpha(0.5)
          .saturate(20)
          .toRgbString()
      };
    },
    cardShadowColor() {
      if (this.$data.hovered) {
        return tinycolor(this.cardSecondaryColor)
          .setAlpha(0.5)
          .toRgbString();
      } else {
        return "transparent";
      }
    }
  }
};
</script>
