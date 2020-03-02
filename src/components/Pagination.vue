<template>
  <div>
    <paginate
      v-model="pageNumber"
      :no-li-surround="true"
      :break-view-link-class="'hidden'"
      :page-link-class="'button button--pagination'"
      :page-count="pageCount"
      :page-range="16"
      :click-handler="paginationEvent"
      :prev-text="``"
      :next-text="``"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
      <span slot="breakViewContent"></span>
    </paginate>
  </div>
</template>
<script>
export default {
  name: "Store",
  props: {
    pageCategory: String,
    pageNumber: Number,
    pageCount: Number
  }
}
</script>
