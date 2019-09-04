<template>
  <div>
    <title>PreMiD - Contributors</title>
    <section class="contributors">
      <h1 class="section-header">{{ $t(`contributors.headings.coreteam`) }}</h1>
      <div class="contributor-container">
        <div v-for="(contributor, index) of contributors" v-bind:key="contributor.name" class="contributor-card"
          v-if="isStaffRole(contributor.role)">
          <ContributorCard :contributor="contributor" />
        </div>
      </div>
      <h1 class="section-header">{{ $t(`contributors.headings.supporters`) }}</h1>
      <div class="contributor-container">
        <div v-for="(contributor, index) of contributors" v-bind:key="contributor.name" class="contributor-card"
          v-if="isSupporterRole(contributor.role)">
          <ContributorCard :contributor="contributor" />
        </div>
      </div>
      <h1 class="section-header">{{ $t(`contributors.headings.translators`) }}</h1>
      <div class="contributor-container">
        <div v-for="(contributor, index) of contributors" v-bind:key="contributor.name" class="contributor-card"
          v-if="isTranslatorRole(contributor.role)">
          <ContributorCard :contributor="contributor" />
        </div>
      </div>
      <h1 class="section-header">{{ $t(`contributors.headings.contributors`) }}</h1>
      <div class="contributor-container">
        <div v-for="(contributor, index) of contributors" v-bind:key="contributor.name" class="contributor-card"
          v-if="isContributorRole(contributor.role)">
          <ContributorCard :contributor="contributor" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import request from "request";
  import gif_frames from "gif-frames";

  import ContributorCard from "../components/ContributorCard";

  export default {
    name: "contributors",
    components: {
      ContributorCard,
    },
    data() {
      return {
        contributors: [],
        display: false
      };
    },
    created() {
      request("https://api.premid.app/credits", (err, res, dat) => {
        let data = JSON.parse(dat);
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
        if (roleName == 'donator' || roleName == 'patreon' || roleName == 'supporter') {
          return true;
        } else {
          return false;
        }
      },
      isTranslatorRole(roleName) {
        var roleName = roleName.toLowerCase();
        if (roleName == 'translator' || roleName == 'proofreader') {
          return true;
        } else {
          return false;
        }
      },
      isContributorRole(roleName) {
        var roleName = roleName.toLowerCase();
        if (roleName == 'contributor' || roleName == 'designer') {
          return true;
        } else {
          return false;
        }
      },
      userNameColor(patronColor, userColor) {
        if (patronColor == '#fff') {
          return userColor;
        } else {
          return patronColor;
        }
      }
    }
  };

</script>
