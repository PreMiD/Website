<template>
	<div class="application-page">
		<div class="pattern"></div>
		<div class="appinfo" v-if="!application.error">
			<div class="user">
				<img :src="application.avatar" />
				<h1 class="username">
					{{ application.name }}
					<span class="discriminator">#{{ application.tag }}</span>
					<p>{{ application.userId }}</p>
				</h1>
			</div>
			<div class="buttons" v-if="application.reviewed == false">
				<p>Your review:</p>
				<button type="button" class="button accept">
					Accept
				</button>
				<button type="button" class="button decline">
					Decline
				</button>
			</div>
			<div class="buttons" v-else>Application reviewed</div>
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
		<div class="content">
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
			<div class="staffheads">
				<h1>Reviewers</h1>
				<div class="users">
					<div class="shead" v-for="sh in sheads" :key="sh.id">
						<img :src="sh.avatar" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import anime from "animejs";

	export default {
		name: "Application",
		data() {
			return {
				show: false,
				sheads: []
			};
		},
		props: {
			application: Object
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
			).then(data => {
				let dUsers = data.discordUsers;
				let credits = data.credits;

				axios
					.post(
						`${process.env.apiBase}/applications/${this.$auth.$storage._state["_token.discord"]}`
					)
					.then(response => {
						this.applications = response.data.reverse();

						this.applications.map(async app => {
							const userInfo = dUsers.find(user => user.userId == app.userId);

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
						});

						credits.map(u => {
							let sh = u.roles.find(r => r.id == "685969048399249459");
							if (sh) this.sheads.push(u.user);
						});
					});
				this.show = true;
			});
		},
		mounted() {
			this.$parent.sortBy = false;

			anime({
				targets: ".question",
				translateX: 25,
				delay: anime.stagger(40)
			});
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
		overflow-y: auto;
		position: relative;
		padding: 0.75em;

		.pattern {
			position: absolute;
			background-image: url("../../assets/images/pattern.png");
			background-size: 300px 240px;
			width: 100%;
			height: 160px;
			margin: -0.75em;
			filter: brightness(0.94);
		}

		.appinfo {
			position: relative;
			padding: 0.75em;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: left;

			.user {
				display: flex;
				align-items: center;
				justify-content: center;

				.username {
					color: white;
					font-size: 1.5em;
					margin-left: 1em;

					.discriminator {
						color: #c3c3c3;
						font-size: 0.75em;
					}

					p {
						margin: 0;
						font-size: 0.75em;
					}
				}
			}

			img {
				border-radius: 50%;
				width: 110px;
			}

			.buttons {
				p {
					margin-top: 0;
					margin-bottom: 0.3em;
				}

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

		.content {
			display: flex;
			justify-content: space-between;
			padding: 1em;
			margin-top: 1em;

			.questions {
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

			.staffheads {
				display: flex;
				flex-direction: column;
				padding: 1em;
				border-radius: 5px;
				background: #0c0c0c;
				height: 100px;

				h1 {
					margin: 0;
					margin-bottom: 0.5em;
				}

				.users {
					display: flex;

					.shead {
						margin-left: 1em;

						img {
							width: 30px;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
</style>
