<template>
  <div
    class="creditCard"
    :style="'background: linear-gradient(45deg,'+contributor.roleColor+' 0%, #23272A 100%)'"
  >
    <h1
      v-text="contributor.name.length > 16 ? contributor.name.slice(0, 15) + '...' : contributor.name"
    />
    <h2 v-text="contributor.role" />
    <span :class="contributor.status" />
    <img :src="contributor.avatar + '?size=128'" draggable="false" />
  </div>
</template>

<script>
export default {
  name: "contributorscard",
  props: ["contributor"]
};
</script>