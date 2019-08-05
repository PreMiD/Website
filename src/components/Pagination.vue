<template>
    <div>
        <router-link class="button button_pagination" :disabled="pageItemNumber == pageNumber" :key="pageItemNumber" v-for="pageItemNumber in pageCount" :to="{ name: 'store', query: {page: pageItemNumber } }">{{ pageItemNumber }}</router-link>
    </div>
</template>
<script>
export default {
  name: "store",
  props: {
      pageNumber: Number,
      pageCount: Number
  }
};
</script>
