<template>
	<div class="staff-container">
		<div class="messages" v-if="ready">
			<div
				v-for="message in ticket.messages"
				:key="message.content"
				:class="{
					right:
						message.userId == ticket.accepter ||
						supporters.find(s => s.userId == message.userId)
				}"
			>
				<Message
					v-if="message.userId == ticket.accepter"
					:message="message"
					:user="{ avatar: ticket.supporterAvatar, name: ticket.supporterName }"
					:badge="{ type: 'accepter', color: '#6b0909' }"
				/>

				<Message
					v-else-if="message.userId == ticket.userId"
					:message="message"
					:user="{
						avatar: ticket.userAvatar || 'https://i.imgur.com/zsd0gU4.png',
						name: ticket.userName || 'User'
					}"
				/>

				<Message
					v-else-if="
						ticket.supporters &&
						ticket.supporters.includes(message.userId) &&
						ticket.accepter !== message.userId
					"
					:message="message"
					:user="{
						avatar: supporters.find(s => s.userId == message.userId).avatar,
						name: supporters.find(s => s.userId == message.userId).name
					}"
					:badge="{ type: 'supporter', color: '#48d41e' }"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Message from "./ticket/Message";
	import moment from "moment";

	export default {
		name: "Ticket",
		components: {
			Message
		},
		props: {
			ticket: Object
		},
		data() {
			return {
				discordUsers: [],
				supporters: [],
				ready: false,
				moment: moment
			};
		},
		beforeMount() {},
		mounted() {
			console.log(this.ticket);
			axios(`${process.env.apiBase}/discordUsers`).then(response => {
				this.discordUsers = response.data;

				if (this.ticket.supporters)
					this.ticket.supporters.forEach(s => {
						let supporter = this.discordUsers.find(u => u.userId == s);
						this.supporters.push(supporter);
					});

				this.ready = true;
				console.log(this.supporters);
			});
		}
	};
</script>

<style lang="scss" scoped>
	.staff-container {
		justify-content: normal;

		.messages {
			display: flex;
			flex-direction: column;
			width: 100%;

			.message {
				padding: 0.75em;
				background: #313131;
				width: 600px;
				float: left;
				margin-bottom: 1em;
				border-radius: 3px;
				color: white;

				.userAvatar {
					height: 100%;
					img {
						width: 50px;
						height: 50px;
						float: left;
						border-radius: 50%;
						margin-right: 1em;
					}

					.role {
						color: black;
						font-size: 0.7em;
						margin-left: 0.5em;
						border-radius: 2px;
						padding: 0.2em;
					}

					.supporter {
						background: #48d41e;
					}

					.accepter {
						background: #6b0909;
					}
				}

				.time {
					color: #c3c3c3;
					font-size: 0.7em;
				}
			}

			.right {
				margin-left: auto;
			}

			.input {
				position: fixed;
				bottom: 90px;
				width: 100%;
				height: 75px;
				background: #121212;
			}
		}
	}
</style>
