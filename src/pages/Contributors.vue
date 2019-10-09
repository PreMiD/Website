<template>
  <div>
    <title>PreMiD - Contributors</title>
    <section class="contributors">
      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.staff')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <CreditCard v-if="isStaffRole(contributor.role)" :user="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.supporters')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <CreditCard v-if="isSupporterRole(contributor.role)" :user="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.translators')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <CreditCard v-if="isTranslatorRole(contributor.role)" :user="contributor" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import CreditCard from "../components/CreditCard";

export default {
  name: "contributors",
  components: {
    CreditCard
  },
  data() {
    return {
      contributors: [],
      display: false
    };
  },
  created() {
    const $Vue = this;

    this.$root.isProcessing = true;

    axios
      .get("https://api.premid.app/v2/credits")
      .then(res => {
        var data = res.data;
        data.sort((a, b) => b.rolePosition - a.rolePosition);
        $Vue.$data.contributors = data;
      })
      .catch(function(error) {
        $Vue.$root.isProcessing = false;
        if(error.request) $Vue.$router.push({path: '/maintenance'});
      })
      .finally(res => {
        $Vue.$root.isProcessing = false;
      });
  },
  methods: {
    isStaffRole(roleName) {
      var roleName = roleName.toLowerCase();
      if (
        roleName == "main developer" ||
        roleName == "website developer" ||
        roleName == "community manager" ||
        roleName == "ticket manager" ||
        roleName == "moderator" ||
        roleName == "jr. moderator"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isSupporterRole(roleName) {
      var roleName = roleName.toLowerCase();
      if (
        roleName == "donator" ||
        roleName == "patron" ||
        roleName == "supporter" ||
        roleName == "booster"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isTranslatorRole(roleName) {
      var roleName = roleName.toLowerCase();
      if (roleName == "translator" || roleName == "proofreader") {
        return true;
      } else {
        return false;
      }
    },
    isContributorRole(roleName) {
      var roleName = roleName.toLowerCase();
      if (roleName == "contributor" || roleName == "designer") {
        return true;
      } else {
        return false;
      }
    },
    userNameColor(patronColor, userColor) {
      if (patronColor == "#fff") {
        return userColor;
      } else {
        return patronColor;
      }
    }
  }
};
</script>
