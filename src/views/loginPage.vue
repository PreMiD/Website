<template></template>

<script>
export default {
  head() {
    return {
      title: "Redirecting...",
      titleTemplate: ""
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
      return;
    }
    this.$auth.login("discord").then(() => console.log("LOL"));
  }
};
</script>
