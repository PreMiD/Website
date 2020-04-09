<template>
	<div class="bar">
		<i
			class="fas fa-arrow-left"
			v-if="$parent.lastPage"
			@click="
				$parent.page = $parent.lastPage;
				$parent.lastPage = '';
			"
		></i>
		<h1>{{ this.$parent.page }}</h1>
		<div class="sort" v-if="$parent.sortBy">Sort by</div>
	</div>
</template>

<style lang="scss">
	.bar {
		display: flex;
		justify-content: center;
		position: relative;
		color: white;
		width: 1250px;
		height: 100px;
		background: #23272a;
		border-radius: 5px;
		margin-left: 1em;
		padding: 0.75em;

		h1 {
			margin: 0;
			margin-top: auto;
			margin-bottom: auto;
		}

		i {
			position: absolute;
			left: 20px;
			top: 50px;
			font-size: 32px;
			cursor: pointer;
		}
	}

	.sort {
		width: 50px;
		height: 10px;
		padding: 1em;
		background: #121212;
		border-radius: 5px;
		font-size: 0.75em;
		text-align: center;
		margin: auto 0;
		margin-left: 2em;
	}
</style>

<script>
	export default {
		name: "Bar",
		mounted() {
			if (this.$parent.page == "Applications") {
				this.$parent.sortBy = true;
			} else this.$parent.sortBy = false;
		}
	};
</script>
