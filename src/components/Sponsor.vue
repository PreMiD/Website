<template>
	<div class="sponsor-card">
		<div class="sponsor-info">
			<h1>{{ name }}</h1>
			<p>{{ description }}</p>
		</div>
		<img class="sponsor-image" :src="rImage" />
	</div>
</template>

<style>
	.sponsor-card {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.7);
		color: rgba(0, 0, 0, 0.7);
		width: 350px;
		height: 150px;
		margin: 1em;
		border-radius: 5px;
		padding: 1em;
		transition: 0.3s;
	}

	.sponsor-card:hover {
		background-color: rgba(255, 255, 255, 1);
		color: rgba(0, 0, 0, 1);
		cursor: default;
		user-select: none;
	}

	.sponsor-image {
		float: right;
		width: 100px;
		height: 100px;
	}

	.sponsor-info {
		width: 200px;
		float: left;
		text-align: left;
		margin-right: 2em;
	}

	.sponsor-info h1 {
		line-height: 0.4;
	}
</style>

<script>
	export default {
		name: "sponsor",
		props: {
			name: String,
			description: String,
			image: String
		},
		data() {
			return {
				rImage: require(`${this.image}`)
			};
		}
	};
</script>
