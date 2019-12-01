<template></template>

<script>
export default {
  head() {
    return {
      title: "Logging out...",
      titleTemplate: ""
    };
  },
  created() {
    this.$auth.logout();
    this.$router.push("/");
  }
};
</script>