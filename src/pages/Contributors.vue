<template>
  <div>
    <title>PreMiD - Contributors</title>
    <section class="contributors">
      <div class="contributor-container">
        <h1 v-text="$t('contributors.headings.staff')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <ContributorCard v-if="isStaffRole(contributor.role)" :contributor="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 v-text="$t('contributors.headings.supporters')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <ContributorCard v-if="isSupporterRole(contributor.role)" :contributor="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 v-text="$t('contributors.headings.translators')" />
        <div class="contributor-inner">
          <div
            v-for="(contributor) of contributors"
            v-bind:key="contributor.name"
            class="contributor-card"
          >
            <ContributorCard v-if="isTranslatorRole(contributor.role)" :contributor="contributor" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import ContributorCard from "../components/ContributorCard";

export default {
  name: "contributors",
  components: {
    ContributorCard
  },
  data() {
    return {
      contributors: [],
      display: false
    };
  },
  created() {
    axios.get("https://api.premid.app/v2/credits").then(res => {
      var data = res.data;
      data.sort((a, b) => b.rolePosition - a.rolePosition);
      this.$data.contributors = data;
    });
  },
  methods: {
    isStaffRole(roleName) {
      var roleName = roleName.toLowerCase();
      if (
        roleName == "core developer" ||
        roleName == "administrator" ||
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
