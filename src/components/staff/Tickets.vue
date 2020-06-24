<template>
	<div class="staff-container">
		<div v-if="show == true">
			<div v-for="(ticket, i) in tickets" :key="ticket.userId + i">
				<div class="ticket" v-if="ticket.messages !== null">
					<div class="user" v-if="!ticket.userError && ticket.userName">
						<img :src="ticket.userAvatar" />
						<h1 class="username">
							{{ cut(ticket.userName) }}
							<span class="discriminator" v-if="ticket.userName.length < 10"
								>#{{ ticket.userTag }}</span
							>
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
					<div
						class="supporters"
						v-if="ticket.supporters && ticket.supporters.length > 0"
					>
						<p>Supporters:</p>
						<div class="images">
							<div
								class="review"
								v-for="supporter in ticket.supportersInfo"
								:key="supporter.id"
							>
								<img
									:src="supporter.user.avatar"
									v-tippy="{
										placement: 'bottom',
										content: supporter.user.name
									}"
								/>
							</div>
						</div>
					</div>
					<div class="supporters" v-else>
						<p style="margin: 0;">Supporters:</p>
						<p style="color: gray; font-size: 0.8em;">None.</p>
					</div>
					<div class="info">
						<p>ID: #{{ ticket.ticketId }}</p>
						<p>
							Ticket status:
							{{
								!ticket.status
									? "Opened"
									: ticket.status == 1
									? "Pending"
									: "Closed"
							}}
						</p>
						<p>
							Ticket created on:
							{{
								new Date(ticket.created).toLocaleDateString("en-US", {
									day: "numeric",
									month: "short",
									year: "numeric",
									hour: "numeric",
									minute: "numeric"
								})
							}}
						</p>
					</div>
					<div class="buttons">
						<button type="button" class="button" @click="openTicket(ticket)">
							View ticket
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
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
					tickets(token: "${this.$auth.$storage._state["_token.discord"]}") {
						ticketId
						userId
						timestamp
						created
						accepter
						status
						supporters
						lastUserMessage
						messages {
							userId
							content
							sent
						}
					}
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
			).then(async data => {
				let tickets = data.tickets.reverse();
				let discordUsers = data.discordUsers;
				let credits = data.credits;

				await tickets.map(async ticket => {
					//* Get only the tickets with messages.
					if (ticket.messages !== null) {
						const supporterInfo = credits.find(
							u => u.user.id == ticket.accepter
						);
						const userInfo = discordUsers.find(u => u.userId == ticket.userId);

						if (supporterInfo) {
							ticket.supporterName = supporterInfo.user.name;
							ticket.supporterTag = supporterInfo.user.tag;
							ticket.supporterAvatar = supporterInfo.user.avatar;
						} else ticket.supporterError = "User not found.";

						if (userInfo) {
							ticket.userName = userInfo.username;
							ticket.userTag = userInfo.discriminator;
							ticket.userAvatar = userInfo.avatar;
							ticket.createdAt = new Date(userInfo.created).toLocaleDateString(
								"en-US",
								{
									day: "numeric",
									month: "short",
									year: "numeric",
									hour: "numeric",
									minute: "numeric"
								}
							);
						} else ticket.userError = "User not found.";

						if (ticket.supporters) {
							ticket.supporters.map(s => {
								let sInfo = credits.find(u => u.user.id == s);

								if (sInfo) {
									ticket.supportersInfo = [];
									ticket.supportersInfo.push(sInfo);
								}
							});

							let accepterInfo = credits.find(
								u => u.user.id == ticket.accepter
							);
							if (
								accepterInfo &&
								ticket.supportersInfo.find(
									s => s.user.id == ticket.accepter
								) === undefined
							)
								ticket.supportersInfo.push(accepterInfo);
						}
					}
				});
				this.tickets = tickets;
				this.show = true;
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
			},
			cut(string) {
				return string.length > 10 ? string.substring(0, 10) + "..." : string;
			}
		}
	};
</script>

<style lang="scss">
	.ticket {
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

		.supporters {
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
				cursor: pointer;
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
