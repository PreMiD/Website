<template>
	<div class="staff-container">
		<div v-if="show == true">
			<div
				v-for="(application, i) in applications"
				:key="application.userId + i"
			>
				<div class="application">
					<div class="user" v-if="!application.error">
						<img :src="application.avatar" />
						<h1 class="username">
							{{ cut(application.name) }}
							<span class="discriminator" v-if="application.name.length < 10"
								>#{{ application.tag }}</span
							>
							<p>{{ application.userId }}</p>
						</h1>
					</div>
					<div class="user" v-else>
						<img src="https://i.imgur.com/zsd0gU4.png" />
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
					<div class="created">
						<p>Account Created: {{ application.createdAt || "No data" }}</p>
						<p>Application for: {{ application.position.name }}</p>
					</div>
					<div class="buttons" v-if="application.reviewed == false">
						<button type="button" class="button accept">
							Accept
						</button>
						<button type="button" class="button decline">
							Decline
						</button>
					</div>
					<div class="buttons" v-else>Application reviewed</div>
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
			this.$graphql(
				`{
					discordUsers {
						avatar
						created
						userId
						username
						discriminator
					}
				}`
			).then(dUsers => {
				axios
					.post(
						`${process.env.apiBase}/applications/${this.$auth.$storage._state["_token.discord"]}`
					)
					.then(response => {
						this.applications = response.data.reverse();

						this.applications.map(async app => {
							const userInfo = dUsers.discordUsers.find(
								user => user.userId == app.userId
							);

							if (userInfo) {
								app.name = userInfo.username;
								app.tag = userInfo.discriminator;
								app.avatar = userInfo.avatar;
								app.createdAt = new Date(userInfo.created).toLocaleDateString(
									"en-US",
									{
										day: "numeric",
										month: "short",
										year: "numeric",
										hour: "numeric",
										minute: "numeric"
									}
								);
							} else app.error = "User not found.";

							this.show = true;
						});
					});
			});
		},
		mounted() {
			this.$parent.page = "Applications";
			this.$parent.sortBy = true;
		},
		methods: {
			readApp(application) {
				this.$parent.page = "Application";
				this.$parent.lastPage = "Applications";
				this.$parent.userApplication = application;
			},
			cut(string) {
				if (string.length > 10) return string.substring(0, 10) + "...";
				else return string;
			}
		}
	};
</script>

<style lang="scss">
	.application {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #1c1c1e;
		width: 1225px;
		height: 75px;
		border-radius: 5px;
		padding: 0.75em;
		margin-bottom: 0.75em;
		position: relative;

		.user {
			display: flex;
			width: 300px;

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
			width: 150px;

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
			width: 150px;

			.abutton {
				color: white;
				padding: 0.25em;
				border: 2px solid #196cce;
				border-radius: 5px;
				cursor: pointer;
				display: flex;
				justify-content: center;
			}
		}

		.created {
			width: 400px;
			color: white;
			text-align: center;

			p {
				margin: 0;
				text-transform: capitalize;
			}
		}

		.buttons {
			display: flex;
			width: 200px;

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
