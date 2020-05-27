<template>
	<div class="staff-container">
		<div v-if="show == true">
			<div v-for="(ticket, i) in tickets" :key="ticket.ticketMessage + i">
				<div class="ticket" v-if="ticket.messages">
					{{ ticket.ticketId }}
					<div class="user" v-if="!ticket.userError">
						<img :src="ticket.userAvatar" @error="changeImage" />
						<h1 class="username">
							{{ ticket.userName }}
							<span class="discriminator">#{{ ticket.userTag }}</span>
							<p>{{ ticket.userId }}</p>
						</h1>
					</div>
					<div class="user" v-else>
						<img src="https://i.imgur.com/zsd0gU4.png" />
						<h1 class="username">
							User not found.
							<p>{{ ticket.userId }}</p>
						</h1>
					</div>
					<div class="read">
						<div class="abutton" @click="openTicket(ticket)">
							View Ticket
						</div>
					</div>
					<div class="created">
						Account Created: {{ ticket.createdAt || "no data" }}
					</div>
					<div class="buttons">
						<div class="abutton accept">Accept</div>
						<div class="abutton decline">Decline</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loading" v-else>
			Loading... (need premid loading animation)
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Tickets",
		data() {
			return {
				show: false,
				page: "Tickets"
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
							name
							tag
							avatar
						}
					}
				}
				`
			).then(data => {
				let discordUsers = data.discordUsers;
				let credits = data.credits;

				axios
					.post(
						`${process.env.apiBase}/tickets/${this.$auth.$storage._state["_token.discord"]}`
					)
					.then(response => {
						this.tickets = response.data;
						this.tickets.reverse().map(async ticket => {
							//* Get only the tickets with messages.
							if (ticket.messages !== undefined) {
								const supporterInfo = credits.find(
									user => user.userId == ticket.accepter
								);
								const userInfo = discordUsers.find(
									user => user.userId == ticket.userId
								);

								if (supporterInfo) {
									ticket.supporterName = supporterInfo.name;
									ticket.supporterTag = supporterInfo.tag;
									ticket.supporterAvatar = supporterInfo.avatar;
								} else ticket.supporterError = "User not found.";

								if (userInfo) {
									ticket.userName = userInfo.username;
									ticket.userTag = userInfo.discriminator;
									ticket.userAvatar = userInfo.avatar;
									ticket.createdAt = new Date(
										userInfo.created
									).toLocaleDateString("en-US", {
										day: "numeric",
										month: "short",
										year: "numeric",
										hour: "numeric",
										minute: "numeric"
									});
								} else ticket.userError = "User not found.";
							} else {
								const index = this.tickets.indexOf(ticket);
								if (index > -1) {
									this.tickets.splice(index, 1);
								}
							}
						});

						this.show = true;
					});
			});
		},
		mounted() {
			this.$parent.sortBy = false;
		},
		methods: {
			changeImage(event) {
				event.target.src = "https://i.imgur.com/zsd0gU4.png";
			},
			openTicket(ticket) {
				this.$parent.page = "Ticket";
				this.$parent.lastPage = "Tickets";
				this.$parent.ticket = ticket;
			}
		}
	};
</script>

<style lang="scss">
	.ticket {
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

			.abutton {
				margin-right: 1em;
			}

			.accept {
				border: 2px solid #57a916;
			}

			.decline {
				border: 2px solid #b70000;
			}
		}
	}

	.loading {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
