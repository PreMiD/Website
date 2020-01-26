<template>
  <div class="container error-container">
    <div v-if="error.statusCode === 404">
      <h1>Sorry, we can't find this page.</h1>
    </div>
    <div v-else-if="error.statusCode === 4">
      <h1>You're looking for not existing or deleted presence.</h1>
    </div>
    <div v-else>
      <h1>Internal server error has occurred.</h1>
    </div>
    <div v-if="$props.error.message" class="error-textarea">
      <p><b>Details:</b></p>
      <p>{{ $props.error.message }}</p>
    </div>
    <div class="error-container--btns">
      <router-link to="/" class="button button--sm">Return to the homepage</router-link>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'default',
    mounted() {
      console.log(this.$props.error);
    },
  }

</script>
