<template>
    <div>
        <router-link class="button button_pagination" :disabled="pageItemNumber == pageNumber" :key="pageItemNumber" v-for="pageItemNumber in pageCount" :to="{ query: {page: pageItemNumber, category: pageCategory } }">{{ pageItemNumber }}</router-link>
    </div>
</template>
<script>
export default {
  name: "store",
  props: {
      pageCategory: String,
      pageNumber: Number,
      pageCount: Number
  }
};
</script>
