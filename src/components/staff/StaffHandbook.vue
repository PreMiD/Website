<template>
	<div class="staff-container">
		<iframe
			src="https://docs.google.com/document/d/e/2PACX-1vTxV2fDH3Z50RSID2LLjlb43Ce-ctr0I_kO5IKjPW6YpoE_q7Eo41_tDJhCJlExCushjpid2XKTAITw/pub?embedded=true"
		></iframe>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	export default Vue.extend({
		name: "StaffHandbook"
	});
</script>

<style lang="scss">
	.staff-container {
		display: flex;
		justify-content: center;

		iframe {
			width: 100%;
			border: none;
		}
	}
</style>
