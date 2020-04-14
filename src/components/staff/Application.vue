<template>
	<div class="application-page">
		<div class="user" v-if="!application.error">
			<img :src="application.avatar" />
			<h1 class="username">
				{{ application.name }}
				<span class="discriminator">#{{ application.tag }}</span>
				<p>{{ application.userId }}</p>
			</h1>
		</div>
		<div class="user" v-else>
			<img
				src="https://i.imgur.com/zsd0gU4.png"
				style="width: 125px; height: 125px;"
			/>
			<h1 class="username">
				User not found.
				<p>{{ application.userId }}</p>
			</h1>
		</div>
		<div class="questions">
			<h1>Application for: {{ application.position.name }}</h1>
			<div
				class="question"
				v-for="question in application.position.questions"
				:key="question.id"
			>
				<h1>{{ question.question }}</h1>
				<p>{{ question.response }}</p>
				<p v-if="!question.response">No response.</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Application",
		data() {
			return {
				show: false
			};
		},
		props: {
			application: Object
		},
		beforeMount() {
			axios
				.post(
					`${process.env.apiBase}/applications/${this.$auth.$storage._state["_token.discord"]}`
				)
				.then(response => {
					this.applications = response.data;
				});
			axios(`${process.env.apiBase}/credits`).then(response => {
				this.credits = response.data;
			});
		},
		mounted() {
			setTimeout(() => {
				this.applications.map(async app => {
					const userInfo = this.credits.find(user => user.userId == app.userId);

					if (userInfo) {
						app.name = userInfo.name;
						app.tag = userInfo.tag;
						app.avatar = userInfo.avatar;
					} else app.error = "User not found.";

					this.show = true;
				});

				console.log(this.applications);
			}, 2500);
		}
	};
</script>

<style lang="scss">
	.application-page {
		color: white;
		width: 1250px;
		height: 600px;
		background: #1c1c1e;
		border-radius: 5px;
		margin-left: 1em;
		padding: 0.75em;
		overflow-y: scroll;

		.user {
			text-align: center;

			.username {
				color: white;
				font-size: 1.25em;
				text-transform: uppercase;
				margin: 0;
				margin-top: auto;
				margin-bottom: auto;

				.discriminator {
					color: #c3c3c3;
					font-size: 0.75em;
				}

				p {
					margin: 0;
					font-size: 0.75em;
				}
			}

			img {
				border-radius: 50%;
			}
		}

		.questions {
			margin-top: 1em;

			.question {
				margin-bottom: 2em;

				h1 {
					font-size: 1.5em;
					margin: 0;
					margin-bottom: 0.25em;
				}

				p {
					font-size: 1em;
					color: #888888;
					margin: 0;
				}
			}
		}
	}
</style>
