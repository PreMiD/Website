<template>
  <label for="cbx" class="label-cbx">
    <input id="cbx" type="checkbox" :class="'invisible ' + selector" v-on:input="toggleInput" />
    <div class="checkbox">
      <svg width="1.4rem" height="1.4rem" viewBox="0 0 20 20">
        <path
          d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
        />
        <polyline points="4 11 8 15 16 6" />
      </svg>
    </div>
    <div class="text">{{ text }}</div>
  </label>
</template>

<script>
export default {
  name: "checkbox",
  props: ["selector", "text", "toggle"],
  methods: {
    toggleInput() {
      this.$parent.toggleInput(this.$props.toggle);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/variables.less";

.label-cbx {
  user-select: none;
  cursor: pointer;
  margin-bottom: 0;
}
.label-cbx input:checked + .checkbox {
  border-color: @color-btn-green;
}
.label-cbx input:checked + .checkbox svg path {
  fill: @color-btn-green;
}
.label-cbx input:checked + .checkbox svg polyline {
  stroke-dashoffset: 0;
}
.label-cbx:hover .checkbox svg path {
  stroke-dashoffset: 0;
}
.label-cbx .checkbox {
  position: relative;
  top: 2px;
  float: left;
  margin-right: 8px;
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid #c8ccd4;
  border-radius: 3px;
}
.label-cbx .checkbox svg {
  position: absolute;
  top: -2px;
  left: -2px;
}
.label-cbx .checkbox svg path {
  fill: none;
  stroke: @color-btn-green;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 71px;
  stroke-dashoffset: 71px;
  transition: all 0.6s ease;
}
.label-cbx .checkbox svg polyline {
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: 18px;
  transition: all 0.3s ease;
}
.label-cbx > span {
  pointer-events: none;
  vertical-align: middle;
}

.text {
  margin-left: 1.9rem;
  margin-top: 0.2rem;
  color: #c8ccd4;
}

.invisible {
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
