<template>
	<div class="job">
		<i v-bind:class="job.jobIcon" />
		<h1 v-text="job.jobName" />
		<div class="button-container">
			<div class="button-container">
				<button v-t="'partners.apply.button'" type="button" class="button" @click="$emit('click')" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Job",
	props: {
		job: Object
	},
	mounted() {
		this.$auth.$storage.setUniversal("redirect", "/jobs");
	}
};
</script>
