<template>
	<div class="message">
		<img :src="user.avatar" @error="changeImage" />
		<div class="text">
			<h1>
				{{ user.name }}
				<span
					v-if="badge"
					class="role"
					:style="{ background: badge.color }"
					v-text="badge.type"
				/>
			</h1>
			<p v-if="message.content.length" v-t="message.content" />
			<p v-else style="color: gray;">image</p>
		</div>
		<div class="time">
			{{ moment(message.sent).format("DD MMM YYYY hh:mm") }}
		</div>
	</div>
</template>

<script lang="ts">
	import moment from "moment";
	import Vue from "vue";
	export default Vue.extend({
		name: "Message",
		props: {
			message: Object,
			user: Object,
			badge: Object
		},
		data() {
			return {
				moment: moment
			};
		},
		methods: {
			changeImage(event: any) {
				event.target.src = "https://i.imgur.com/zsd0gU4.png";
			}
		}
	});
</script>

<style lang="scss" scoped>
	.message {
		padding: 1em;
		background: #313131;
		width: 600px;
		float: left;
		margin-bottom: 1em;
		border-radius: 3px;
		color: white;
		position: relative;

		.text {
			margin: auto 0;
			margin-left: 4em;

			h1 {
				font-size: 1em;
				margin: 0;

				.role {
					color: black;
					font-size: 0.7em;
					margin-left: 0.5em;
					border-radius: 2px;
					padding: 0.2em;
				}
			}

			p {
				margin: 0;
				font-size: 0.9em;
			}
		}

		img {
			width: 50px;
			height: 50px;
			vertical-align: middle;
			float: left;
			border-radius: 50%;
			top: 0;
			position: absolute;
			margin: auto;
			bottom: 0;
		}

		.time {
			color: #c3c3c3;
			font-size: 0.7em;
			position: absolute;
			right: 0;
			top: 0;
			padding: 1em;
		}
	}
</style>
