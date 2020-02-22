<template>
  <nuxt-link :to="`/store/${this.$props.category.id}`">
    <div
      class="category-card"
      :style="
        `background: linear-gradient(165deg, ${category.color} -20%, ${categoryGradientColor} 100%);`
      "
    >
      <div class="category__icon">
        <span class="fa-stack">
          <i class="fa-circle fa-stack-2x fas"></i>
          <i
            :style="`color: ${category.color};`"
            :class="`fas fa-${category.icon} fa-stack-1x fa-inverse`"
          ></i>
        </span>
      </div>
      <div class="category__data">
        <h2>{{ category.title }}</h2>
        <p>{{ category.description }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import tinycolor from "tinycolor2"

export default {
  name: "Categorycard",
  props: ["category"],
  computed: {
    categoryGradientColor() {
      return tinycolor(this.$props.category.color)
        .darken(30)
        .setAlpha(0.5)
        .toRgbString()
    }
  }
}
</script>
