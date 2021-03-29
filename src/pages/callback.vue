<template>
	<h1 class="text-highlight">
		Please wait while we are processing your information...
	</h1>
</template>

<script>
	export default {
		head() {
			return {
				title: "Authorization...",
				titleTemplate: ""
			};
		}
	};
</script>

<style lang="scss" scoped>
	h1 {
		text-align: center;
	}
</style>
