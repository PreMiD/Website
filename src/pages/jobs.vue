<template>
	<div class="jobsWrapper">
		<div class="container">
			<div class="heading pattern">
				<h1 v-text="$t('jobs.header.title')" />
				<p v-text="$t('jobs.header.description')" />

				<video
					class="job-video"
					src="@/assets/videos/jobs-heading.mp4"
					autoplay
					loop
					muted
				/>
				<div class="waves-divider waves-divider_bottom">
					<svg
						class="wave"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1440 100"
						preserveAspectRatio="none"
					>
						<path
							class="wave-animation"
							d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
							fill="currentColor"
						/>
					</svg>
				</div>
			</div>
			<div class="openings">
				<h1 v-text="$t('jobs.openings.title')" />

				<div class="jobs">
					<div
						class="job"
						v-for="job in jobs.filter(j => j.available)"
						:key="job.jobName"
					>
						<div class="job-header">
							<i :class="job.jobIcon"></i>
							<h1>{{ job.jobName }}</h1>
						</div>

						<div class="button-container">
							<button
								v-t="'partners.apply.button'"
								type="button"
								class="button"
								@click="applyModal(job)"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="benefits">
				<h1 v-text="$t('jobs.benefits.title')" />

				<table class="table">
					<tbody>
						<tr>
							<td v-for="benefit in benefits.slice(0, 3)" :key="benefit.title">
								<Benefit
									:icon="benefit.icon"
									:title="$t(benefit.title)"
									:description="$t(benefit.description)"
								/>
							</td>
						</tr>
						<tr>
							<td v-for="benefit in benefits.slice(3, 6)" :key="benefit.title">
								<Benefit
									:icon="benefit.icon"
									:title="$t(benefit.title)"
									:description="$t(benefit.description)"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<transition name="slide-down" mode="in-out">
			<JobApply
				v-if="showModal"
				:job="modalJob"
				@close="
					showModal = false;
					toggleScroll();
				"
			/>
			<JoinGuild
				v-if="showJoinModal"
				@close="
					showJoinModal = false;
					toggleScroll();
				"
			/>
		</transition>
	</div>
</template>

<style lang="scss">
	.job-video {
		width: 250px;
		height: 250px;
		border-radius: 5px;
		box-shadow: 3px 5px 5px #202226;
	}

	.jobsWrapper {
		.container {
			h1 {
				text-align: center;
				font-size: 2.2em;
				padding-bottom: 0.25em;
				color: white;
				margin: 0;
			}

			.heading {
				position: relative;
				z-index: 1;
				overflow: hidden;
				padding: 25px 0 150px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				align-items: center;

				h1 {
					text-transform: uppercase;
					color: #7289da;
					margin: 0;
				}

				p {
					color: white;
					margin: 0;
					margin-bottom: 2em;
				}
			}

			.openings {
				margin-bottom: 2em;

				.jobs {
					display: flex;
					justify-content: center;

					.job {
						transition: all 0.15s ease-out;
						width: 200px;
						position: relative;
						background: #23272a;
						border-radius: 5px;
						padding: 1em;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						margin: 1em;

						&:hover {
							transform: translateY(-5px);
							box-shadow: 0 2.5px 20px -10px rgba(122, 144, 220, 0.7);
						}

						.job-header {
							display: contents;

							h1 {
								color: #ffffff;
								font-size: large;
							}

							i {
								color: #7289da;
								margin-bottom: 8px;
							}
						}

						.button-container {
							padding-top: 0.5em;

							.button {
								font-size: 1em;
								padding: 0.5rem 1rem;
							}
						}
					}
				}
			}

			.benefits {
				display: block;
				max-width: 900px;
				text-align: center;
				margin: 0 auto;

				.table {
					width: 100%;

					td {
						vertical-align: -webkit-baseline-middle;
					}
				}

				.benefit {
					width: 200px;
					display: inline-block;
					text-align: left;
					justify-content: space-around;
					padding: 2em;

					i {
						font-size: 64px;
						color: #7289da;
						margin-bottom: 0.25em;
					}

					h1 {
						color: white;
						font-size: 1.6em;
						margin: 0;
						text-align: left;
					}

					p {
						color: white;
						font-size: 0.85em;
					}
				}
			}
		}
	}

	@media only screen and (max-width: 600px) {
		.jobsWrapper {
			.heading {
				padding-bottom: 5em;

				h1 {
					font-size: 2em !important;
					margin-bottom: 4px !important;
				}
			}

			.openings {
				h1 {
					margin: 1em 0;
				}

				.jobs {
					padding: 0 1.5em;
					display: block !important;

					.job {
						width: unset !important;

						h1 {
							margin-top: 0;
							margin-bottom: 0;
						}
					}
				}
			}

			.benefits table tr {
				display: grid;
			}
		}
	}
</style>

<script>
	export default {
		name: "Jobs",
		auth: false,
		data() {
			return {
				showModal: false,
				showJoinModal: false,
				modalJob: null
			};
		},
		async asyncData({ app }) {
			const data = await app.$graphql(`
				{
					jobs {
						available
						bonusPoints
						jobIcon
						jobName
						questions {
							id
							question
							required
						}
						requirements
						tasks
					}
					benefits {
						description
						icon
						title
					}
					discordUsers {
						avatar
						created
						userId
						username
						discriminator
					}
				}
			`);

			return {
				jobs: data.jobs,
				benefits: data.benefits,
				discordUsers: data.discordUsers.map(u => u.userId)
			};
		},
		mounted() {
			this.$auth.$storage.setUniversal("redirect", "/jobs");
		},
		methods: {
			applyModal(job) {
				this.modalJob = job;
				this.$auth.loggedIn || this.$router.push("/login");
				if (this.discordUsers.indexOf(this.$auth.user.id) == -1) {
					this.showJoinModal = true;
				} else {
					this.showModal = true;
				}
				this.toggleScroll();
			},
			toggleScroll() {
				this.showModal || this.showJoinModal
					? document.body.classList.add("no-scroll")
					: document.body.classList.remove("no-scroll");
			}
		},
		head: {
			title: "Jobs"
		}
	};
</script>
