<template></template>

<script>
export default {
  head() {
    return {
      title: "Authorization",
      titleTemplate: ""
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
      return;
    }
    this.$auth.login("discord");
  }
};
</script>
