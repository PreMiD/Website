<template>
  <div>
    <title>PreMiD - Contributors</title>
    <section class="contributors">
      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.staff')"></h1>
        <div class="contributor-inner">
          <div v-for="contributor of contributors" :key="contributor.id" class="contributor-card">
            <CreditCard v-if="isStaffRole(contributor.role)" :user="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.supporters')"></h1>
        <div class="contributor-inner">
          <div v-for="contributor of contributors" :key="contributor.id" class="contributor-card">
            <CreditCard v-if="isSupporterRole(contributor.role)" :user="contributor" />
          </div>
        </div>
      </div>

      <div class="contributor-container">
        <h1 class="heading" v-text="$t('contributors.headings.translators')"></h1>
        <div class="contributor-inner">
          <div v-for="contributor of contributors" :key="contributor.id" class="contributor-card">
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
  name: "Contributors",
  auth: false,
  components: {
    CreditCard
  },
  async asyncData() {
    return {
      contributors: (await axios(`${process.env.apiBase}/credits`)).data.sort(
        (a, b) => b.rolePosition - a.rolePosition
      )
    };
  },
  data() {
    return {
      contributors: [],
      display: false
    };
  },
  methods: {
    isStaffRole(roleName) {
      const staffRoles = [
        "Creator",
        "Website Developer",
        "Community Manager",
        "Ticket Manager",
        "Moderator",
        "Jr. Moderator",
        "Administrator",
        "Asst. Head Moderator",
        "Asst. Community Manager",
        "Head Moderator",
        "Senior Moderator",
        "Head of Presence Verifying"
      ];

      if (staffRoles.indexOf(roleName) !== -1) return true;
      else return false;
    },
    isSupporterRole(roleName) {
      const supportRoles = ["Donator", "Patron", "Booster"];

      if (supportRoles.indexOf(roleName) !== -1) return true;
      else return false;
    },
    isTranslatorRole(roleName) {
      const translatorRoles = ["Translator", "Proofreader"];

      if (translatorRoles.indexOf(roleName) !== -1) return true;
      else return false;
    },
    userNameColor(patronColor, userColor) {
      if (patronColor == "#fff") return userColor;
      else return patronColor;
    }
  },

  head() {
    return {
      title: "Contributors"
    };
  }
};
</script>
