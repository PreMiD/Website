<template>
  <div
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    class="credit-card"
    :style="
      `background: linear-gradient(-35deg, ${cardGradientColor.secondary} 20%, ${cardGradientColor.primary} 130%); box-shadow: 0 2px 52px 0 ${cardShadowColor}`
    "
  >
    <div class="credit-card__user">
      <h1 :title="user.name" v-text="user.name" />
      <h2>
        {{ user.role == "Patron" ? "Patron" : $t(translationKeys[user.role]) }}
      </h2>
    </div>
    <div class="credit-card__avatar">
      <span :class="user.status" />
      <img :src="user.avatar + '?size=64'" draggable="false" />
    </div>
  </div>
</template>

<script>
import tinycolor from "tinycolor2";

export default {
  name: "creditcard",
  props: ["user"],
  data() {
    return {
      translationKeys: {
        Creator: "contributors.roles.creator",
        "Community Manager": "contributors.roles.communityManager",
        "Asst. Community Manager": "contributors.roles.asstCommunityManager",
        Administrator: "contributors.roles.administrator",
        "Website Developer": "contributors.roles.websiteDeveloper",
        "Head Moderator": "contributors.roles.headModerator",
        "Asst. Head Moderator": "contributors.roles.asstHeadModerator",
        Moderator: "contributors.roles.moderator",
        "Jr. Moderator": "contributors.roles.jrModerator",
        "Head of Presence Verifying": "contributors.roles.verificationHead",
        "Ticket Manager": "contributors.roles.ticketManager",
        "Presence Verifier": "user.roles.presenceVerifier",
        Proofreader: "user.roles.proofreader",
        Donator: "contributors.roles.donator",
        Booster: "contributors.roles.booster",
        Translator: "contributors.roles.translator",
        "Important Presence Developer": "user.importantPresenceDev.message1",
        "Presence Developer": "user.roles.presenceDeveloper"
      },
      hovered: false
    };
  },
  computed: {
    cardGradientColor() {
      return {
        primary: tinycolor(this.$props.user.roleColor)
          .setAlpha(1)
          .darken(5)
          .toRgbString(),
        secondary: tinycolor(this.$props.user.roleColor)
          .analogous()[2]
          .setAlpha(0.5)
          .saturate(20)
          .toRgbString()
      };
    },
    cardShadowColor() {
      if (this.$data.hovered) {
        return tinycolor(this.cardGradientColor.primary)
          .setAlpha(0.3)
          .saturate(20)
          .toRgbString();
      } else {
        return "transparent";
      }
    }
  }
};
</script>
