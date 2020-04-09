<template>
	<div class="staff-container">
		<div v-if="show == true">
			<div v-for="application in applications" :key="application.userId">
				<div class="application" v-if="application.position.name == 'Engineer'">
					<div class="user" v-if="!application.error">
						<img :src="application.avatar" />
						<h1 class="username">
							{{ application.name }}
							<span class="discriminator">#{{ application.tag }}</span>
							<p>{{ application.userId }}</p>
						</h1>
					</div>
					<div class="user" v-else>
						<img src="https://i.imgur.com/N7yYuh3.jpg" />
						<h1 class="username">
							User not found.
							<p>{{ application.userId }}</p>
						</h1>
					</div>
					<div class="votes">
						<div class="vote up">
							<i class="fas fa-thumbs-up"></i>
							5
						</div>
						<div class="vote down">
							<i class="fas fa-thumbs-down"></i>
							0
						</div>
					</div>
					<div class="read">
						<div class="abutton" @click="readApp(application)">
							Read Application
						</div>
					</div>
					<div class="created">Account Created: 2016-12-16 19:51:17 GMT</div>
					<div class="buttons">
						<button type="button" class="button accept">
							Accept
						</button>
						<button type="button" class="button decline">
							Decline
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Applications",
		data() {
			return {
				show: false,
				page: "Applications"
			};
		},
		beforeMount() {
			axios
				.post(
					`${process.env.apiBase}/applications/${this.$auth.$storage._state["_token.discord"]}`
				)
				.then(response => {
					this.applications = response.data;

					this.applications.map(async app => {
						const userInfo = this.credits.find(
							user => user.userId == app.userId
						);

						if (userInfo) {
							app.name = userInfo.name;
							app.tag = userInfo.tag;
							app.avatar = userInfo.avatar;
						} else app.error = "User not found.";

						this.show = true;
					});
				});
			axios(`${process.env.apiBase}/credits`).then(response => {
				this.credits = response.data;
			});
		},
		mounted() {
			this.$parent.page = "Applications";
			this.$parent.sortBy = true;
			console.log(this.$parent.page);
		},
		methods: {
			readApp(application) {
				this.$parent.page = "Application";
				this.$parent.lastPage = "Applications";
				this.$parent.userApplication = application;
			}
		}
	};
</script>

<style lang="scss">
	.application {
		display: flex;
		background: #1c1c1e;
		width: 1225px;
		height: 75px;
		border-radius: 5px;
		padding: 0.75em;
		margin-bottom: 0.75em;
		position: relative;

		.user {
			display: flex;

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
				display: block;
				width: 75px;
				height: 75px;
				border-radius: 50%;
				float: left;
				margin: auto;
				margin-left: 0;
				margin-right: 1em;
			}
		}

		.votes {
			display: flex;
			position: absolute;
			left: 300px;
			top: 32.5px;
			margin-left: 2em;

			.vote {
				margin: auto;
				margin-right: 0;
				margin-left: 1em;

				i {
					font-size: 24px;
					cursor: pointer;
					margin-right: 0.15em;
				}
			}

			.up {
				color: green;
			}

			.down {
				color: red;
			}
		}

		.read {
			margin: auto;
			margin-left: 2em;
			margin-right: 0;
			position: absolute;
			left: 450px;
			top: 32.5px;
		}

		.abutton {
			margin: auto;
			margin-left: 0;
			margin-right: 0;
			color: white;
			padding: 0.25em;
			border: 2px solid #196cce;
			border-radius: 5px;
			cursor: pointer;
		}

		.created {
			color: white;
			margin-left: 2em;
			margin-right: 0;
			text-transform: uppercase;
			position: absolute;
			left: 630px;
			top: 40.5px;
		}

		.buttons {
			display: flex;
			margin-left: 2em;
			position: absolute;
			right: 10px;
			top: 32.5px;

			button {
				padding: 0.7em 1.6em;
				font-size: 0.8em;
			}

			.abutton {
				margin-right: 1em;
				background: #111218;
				transition: all 0.2s ease-in-out;
			}

			.accept:hover {
				background: #57a916;
				box-shadow: 0 3px 16px -7px rgba(87, 169, 22, 0.7);
			}

			.decline:hover {
				background: #b70000;
				box-shadow: 0 3px 16px -7px rgba(183, 0, 0, 0.7);
			}
		}
	}
</style>
