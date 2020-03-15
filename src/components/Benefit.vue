<template>
	<div class="benefit">
		<i v-bind:class="icon"></i>
		<h1 v-text="title"></h1>
		<p v-text="description"></p>
	</div>
</template>

<script>
	export default {
		name: "Benefit",
		props: {
			icon: String,
			title: String,
			description: String
		}
	};
</script>
