<template>
  <div>
      <paginate :no-li-surround="true" :break-view-link-class="'hidden'" :page-link-class="'button button_pagination'" :page-count="pageCount" v-model="pageNumber" :page-range="16" :click-handler="paginationEvent" :prev-text="``" :next-text="``"
        :container-class="'pagination'" :page-class="'page-item'">
          <span slot="breakViewContent"></span>
      </paginate>
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
