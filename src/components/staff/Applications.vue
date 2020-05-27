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
							<i class="fas fa-caret-up"></i>
							{{
								application.reviewers !== undefined
									? application.reviewers.filter(r => r.accepted == true).length
									: "0"
							}}
						</div>
						<div class="vote down">
							<i class="fas fa-caret-down"></i>
							{{
								application.reviewers !== undefined
									? application.reviewers.filter(r => r.accepted == false)
											.length
									: "0"
							}}
						</div>
					</div>
					<div class="reviews" v-if="application.reviewers">
						<p>Reviewed by:</p>
						<div class="images">
							<div
								class="review"
								v-for="reviewer in application.reviewers"
								:key="reviewer.userId"
							>
								<img :src="reviewer.avatar" />
							</div>
						</div>
					</div>
					<div class="reviews" v-else>
						<p style="margin: 0;">Reviewed by:</p>
						<p style="color: gray; font-size: 0.8em;">Nobody.</p>
					</div>
					<div class="info">
						<p>Application for: {{ application.position.name }}</p>
						<p>Account Created: {{ application.createdAt || "No data" }}</p>
					</div>
					<div class="buttons" v-if="application.reviewed == false">
						<button
							type="button"
							class="button"
							@click="readApp(application, sheads)"
						>
							Review application
						</button>
					</div>
					<div class="buttons" v-else-if="application.reviewed == true">
						Application closed
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
				page: "Applications",
				sheads: []
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
					credits {
						user {
							id
							avatar
							status
							name
							role
							roleId
							roleColor
							rolePosition
						}
						roles {
							id
						}
					}
				}`
			).then(async data => {
				let discordUsers = data.discordUsers;
				let credits = data.credits;

				credits.map(u => {
					let sh = u.roles.find(r => r.id == "685969048399249459");
					if (sh) this.sheads.push(u.user);
				});

				axios
					.post(
						`${process.env.apiBase}/applications/${this.$auth.$storage._state["_token.discord"]}`
					)
					.then(async response => {
						this.applications = response.data.reverse();

						this.applications.map(async app => {
							const userInfo = discordUsers.find(
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

							if (app.reviewers) {
								app.reviewers.map(r => {
									const shInfo = credits.find(user => user.user.id == r.userId);
									if (shInfo) {
										Object.assign(r, shInfo.user);
									}
								});
							}

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
				this.$parent.sheads = this.sheads;
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

		.reviews {
			width: 200px;

			.images {
				display: flex;
				flex-wrap: wrap;
			}

			p {
				color: white;
				margin: 0;
				margin-bottom: 0.4em;
			}

			img {
				width: 25px;
				border-radius: 50%;
				margin-right: 0.5em;
			}
		}

		.info {
			width: 350px;
			font-size: 0.95em;
			color: white;
			text-align: center;

			p {
				margin: 0;
				text-align: left;
				margin-bottom: 0.2em;
			}
		}

		.buttons {
			display: flex;
			width: 200px;

			button {
				padding: 1em 1.6em;
				font-size: 0.8em;
				border-radius: 6px;
			}
		}

		.rinfo {
			width: 200px;

			p {
				color: white;
				margin: 0;
			}

			span {
				font-size: 0.9em;
			}
		}
	}
</style>
