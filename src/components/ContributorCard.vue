<template>
  <div>
    <img :src="contributor.avatar">
    <div class="contributor-card__content">
    <p :style="`color: ${userNameColor(contributor.patronColor, contributor.roleColor)}`" :title="`${contributor.name}#${contributor.tag}`" class="usertitle">{{ contributor.name }}</p>
    <p class="label label_role">{{ contributor.role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "contributorscard",
  props: ['contributor'],
  methods: {
    isStaffRole(roleName) {
      var roleName = roleName.toLowerCase();
      if(roleName == 'developer' || roleName == 'ticket manager' || roleName == 'moderator'  || roleName == 'jr. moderator' || roleName == 'head moderator') {
        return true;
      } else {
        return false;
      }
    },
    userNameColor(patronColor, userColor) {
      if(patronColor == '#fff') {
        return userColor;
      } else {
        return patronColor;
      }
    }
  }
};
</script>
