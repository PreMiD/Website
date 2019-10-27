<template>
  <div>
    <div class="loader-container">
      <div class="loader">
        <img :src="Logo">
        <p>{{ randomLoadingString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from "../assets/images/pmd_newlogo.svg"

  export default {
    name: "loading",
    data() {
      return {
        Logo
      }
    },
    mounted() {},
    methods: {
      randomLoadingString() {
        var textArray = this.$t('header.loader.phrases').split(';');
        var randomNumber = Math.floor(Math.random() * textArray.length);

        return textArray[randomNumber];
      }
    }
  };

</script>
