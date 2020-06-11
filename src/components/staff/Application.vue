<template>
	<div class="application-page">
		<div class="pattern"></div>
		<div class="appinfo">
			<div class="user" v-if="!application.error">
				<img :src="application.avatar" />
				<h1 class="username">
					{{ application.name }}
					<span class="discriminator">#{{ application.tag }}</span>
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
			<div
				class="buttons"
				v-if="
					application.reviewed == false &&
					((application.reviewers &&
						application.reviewers.find(r => r.userId == $auth.user.id) ===
							undefined) ||
						application.reviewers == null) == true
				"
			>
				<p>Your review:</p>
				<button
					type="button"
					class="button accept"
					@click="review(true, application.userId)"
				>
					Accept
				</button>
				<button
					type="button"
					class="button decline"
					@click="review(false, application.userId)"
				>
					Decline
				</button>
			</div>
			<div
				class="buttons"
				v-else-if="
					application.reviewers !== null &&
					application.reviewers.find(r => r.userId == $auth.user.id).length !==
						0
				"
				style="margin-right: 2em;"
			>
				<p style="margin: 0;">Submitted review:</p>
				<span
					v-bind:style="{
						color:
							application.reviewers.find(r => r.userId == $auth.user.id)
								.accepted == true
								? 'green'
								: 'red'
					}"
					>{{
						application.reviewers.find(r => r.userId == $auth.user.id)
							.accepted == true
							? "Accept"
							: "Reject"
					}}</span
				>
			</div>
			<div class="buttons" v-else-if="application.reviewed == true">
				Application closed
			</div>
		</div>

		<div class="acontent">
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
				<h1 style="margin-top: 1em;">Reviews</h1>
				<div class="reviews" v-if="application.reviewers">
					<div
						class="review"
						v-for="reviewer in application.reviewers"
						:key="reviewer.userId"
					>
						<img :src="reviewer.avatar" />
						<p>
							{{ reviewer.name }} -
							<span
								v-bind:style="{
									color: reviewer.accepted == true ? 'green' : 'red'
								}"
								>{{ reviewer.accepted == true ? "Accept" : "Reject" }}</span
							>
						</p>
					</div>
				</div>
				<div class="reviews" v-else>
					<p>None.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import anime from "animejs";

	export default {
		name: "Application",
		data() {
			return {
				show: false
			};
		},
		props: {
			application: Object,
			sheads: Array
		},
		mounted() {
			this.$parent.sortBy = false;
			console.log(this.sheads);
			anime({
				targets: ".question",
				translateX: 25,
				delay: anime.stagger(40)
			});
			anime({
				targets: ".review",
				translateX: 15,
				delay: anime.stagger(40)
			});
			anime({
				targets: ".shead",
				translateX: 5,
				delay: anime.stagger(40)
			});
		},
		methods: {
			review(accepted, userId) {
				this.$graphql(
					`
					mutation {
						addReview(token: "${this.$auth.$storage._state["_token.discord"]}", accepted: ${accepted}, userId: "${userId}") {
							userId
							accepted
						}
					}`
				)
					.then(data => {
						console.log(data);
					})
					.catch(err => {
						console.log(err);
					});

				this.$parent.page = "Applications";
				this.$parent.lastPage = "";
			}
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

		.acontent {
			display: flex;
			justify-content: space-between;
			padding: 1em;
			margin-top: 1em;

			.questions {
				max-width: 800px;

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

				h1 {
					margin: 0;
					margin-bottom: 0.5em;
					font-size: 1.5em;
				}

				.users,
				.reviews {
					display: flex;
					max-width: 325px;
					flex-wrap: wrap;

					.shead,
					.review {
						display: flex;
						align-items: center;
						margin-right: 1em;

						p {
							margin: 0;
							margin-left: 0.4em;
						}

						img {
							width: 30px;
							border-radius: 50%;
						}
					}
				}

				.reviews {
					flex-direction: column;

					p {
						margin: 0;
						margin-left: 1em;
					}

					.review {
						margin-left: 0;
						margin-bottom: 0.5em;
					}
				}
			}
		}
	}
</style>
