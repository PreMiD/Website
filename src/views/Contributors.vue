<template>
  <div>
    <title>PreMiD - Contributors</title>
    <section style="margin-left:20px;" class="contributors">
      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.staff')" />
        <div class="contributor-inner">
          <div
            v-for="contributor of contributors"
            v-bind:key="contributor.id"
            class="contributor-card"
          >
            <CreditCard
              v-if="isStaffRole(contributor.role)"
              :user="contributor"
            />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.supporters')" />
        <div class="contributor-inner">
          <div
            v-for="contributor of contributors"
            v-bind:key="contributor.id"
            class="contributor-card"
          >
            <CreditCard
              v-if="isSupporterRole(contributor.role)"
              :user="contributor"
            />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.translators')" />
        <div class="contributor-inner">
          <div
            v-for="contributor of contributors"
            v-bind:key="contributor.id"
            class="contributor-card"
          >
            <CreditCard
              v-if="isTranslatorRole(contributor.role)"
              :user="contributor"
            />
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
  auth: false,

  head() {
    return {
      title: "Contributors"
    };
  },
  components: {
    CreditCard
  },
  data() {
    return {
      contributors: [],
      display: false
    };
  },
  async asyncData() {
    return {
      contributors: (await axios(`${process.env.apiBase}/credits`)).data.sort(
        (a, b) => b.rolePosition - a.rolePosition
      )
    };
  },
  methods: {
    isStaffRole(roleName) {
      roleName = roleName.toLowerCase();
      if (
        roleName == "creator" ||
        roleName == "community manager" ||
        roleName == "asst. community manager" ||
        roleName == "administrator" ||
        roleName == "website developer" ||
        roleName == "head moderator" ||
        roleName == "asst. head moderator" ||
        roleName == "moderator" ||
        roleName == "ticket manager" ||
        roleName == "jr. moderator"
      )
        return true;
      else return false;
    },
    isSupporterRole(roleName) {
      roleName = roleName.toLowerCase();
      if (
        roleName == "donator" ||
        roleName == "patron" ||
        roleName == "supporter" ||
        roleName == "booster"
      )
        return true;
      else return false;
    },
    isTranslatorRole(roleName) {
      roleName = roleName.toLowerCase();
      if (roleName == "translator" || roleName == "proofreader") return true;
      else return false;
    },
    isContributorRole(roleName) {
      roleName = roleName.toLowerCase();
      if (roleName == "contributor" || roleName == "designer") return true;
      else return false;
    },
    userNameColor(patronColor, userColor) {
      if (patronColor == "#fff") return userColor;
      else return patronColor;
    }
  }
};
</script>
