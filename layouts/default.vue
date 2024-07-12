<script lang="ts" setup>
useHead({
	htmlAttrs: {
		class: "font-inter",
	},
});
</script>

<template>
	<Header />
	<div class="flex justify-center min-h-screen">
		<div class="mt-5 max-w-screen-lg mx5">
			<slot />
		</div>
	</div>
	<Footer />
</template>

<style scoped></style>
