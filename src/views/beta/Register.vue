<template>
  <div>
    <afterRegistration v-bind:title="title" v-bind:message="message" />
  </div>
</template>


<script>
import axios from "axios";
import afterRegistration from "~/views/beta/afterRegistration";

export default {
  name: "register",
  auth: true,
  components: { afterRegistration },
  head() {
    return {
      title: "Register"
    };
  },
  data() {
    return {
      title: "",
      message: ""
    };
  },
  mounted: function() {
    this.register();
  },
  methods: {
    register() {
      let userId = this.$auth.user.id;
      if (userId) {
        axios
          .post(`${process.env.apiBase}/addBetaUser/${userId}`)
          .then(response => {
            if (!response.data.error) {
              this.title = this.$t("thankyou.title");
              this.message = this.$t("thankyou.description");
            } else if (response.data.error) {
              this.title = "Uh oh!";
              if (response.data.error == 2) {
                this.message =
                  "Our monkeys say that you are already a beta user.";
              } else {
                this.message = response.data.message;
              }
            }
          });
      }
    }
  }
};
</script>
