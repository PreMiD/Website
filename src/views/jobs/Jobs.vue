<template>
	<div id="jobsWrapper">
		<div id="jobsContainer">
			<div id="heading" class="pattern">
				<h1 v-text="$t('jobs.header.title')" />
				<p v-text="$t('jobs.header.description')" />
				<video
					class="job-video"
					src="@/assets/videos/jobs-heading.mp4"
					controls
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
			<div id="openings">
				<h1 v-text="$t('jobs.openings.title')" />
				<div class="jobs">
					<Job
						v-for="job in jobs.filter(j => j.available)"
						:key="job.jobName"
						:job="job"
						@click="applyModal(job)"
					/>
				</div>
			</div>
			<div class="benefits">
				<h1 v-text="$t('jobs.benefits.title')" />
				<Benefit
					v-for="benefit in benefits"
					:key="benefit.title"
					:icon="benefit.icon"
					:title="$t(benefit.title)"
					:description="$t(benefit.description)"
				/>
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

	#jobsWrapper {
		#jobsContainer {
			h1 {
				text-align: center;
				font-size: 2.2em;

				color: white;

				margin: 0;
			}

			#heading {
				position: relative;
				z-index: 1;
				overflow: hidden;
				padding: 25px 0 150px;

				&.pattern {
					background-image: url("../../assets/images/pattern.png");
					background-size: 300px 240px;
				}

				display: flex;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				align-items: center;

				h1 {
					text-transform: uppercase;
					font-size: 3.5em;
					color: #7289da;
					margin: 0;
				}

				p {
					font-size: 1.2em;
					color: white;
					margin: 0;
					margin-bottom: 2em;
				}
			}

			#openings {
				margin-bottom: 2em;

				.jobs {
					display: flex;
					justify-content: center;

					.job {
						transition: 0.15s transform ease-out;

						width: 350px;
						height: 175px;
						background: #23272a;
						border-radius: 5px;
						padding: 1em;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						margin: 1em;

						&:hover {
							transform: translateY(-10px);
						}

						i {
							font-size: 64px;
							color: #7289da;
							margin-bottom: 0.25em;
						}

						h1 {
							color: white;
							font-size: 1.75em;
						}

						.button {
							font-size: 0.9em;
							padding: 0.5rem 2.3rem;
						}
					}
				}
			}

			.benefits {
				display: block;
				max-width: 900px;
				text-align: center;
				margin: 0 auto;

				.benefit {
					width: 200px;
					height: 150px;
					display: inline-block;
					vertical-align: top;
					text-align: left;
					justify-content: space-around;
					margin: 2em;

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
</style>

<script>
	import axios from "axios";
	import Job from "~/components/Job";
	import Benefit from "~/components/Benefit";
	import JobApply from "~/components/JobApply";

	export default {
		name: "Jobs",
		components: {
			Job,
			Benefit,
			JobApply
		},
		auth: false,
		data() {
			return {
				showModal: false,
				modalJob: null
			};
		},
		async asyncData() {
			const data = await Promise.all([
				axios(`${process.env.apiBase}/jobs`),
				axios(`${process.env.apiBase}/jobs/benefits`)
			]);
			const jobs = data[0].data,
				benefits = data[1].data;

			return {
				jobs,
				benefits
			};
		},
		methods: {
			applyModal(job) {
				this.modalJob = job;
				this.$auth.loggedIn ? (this.showModal = true) : $router.push("/login");
				this.toggleScroll();
			},
			toggleScroll() {
				this.showModal
					? document.body.classList.add("no-scroll")
					: document.body.classList.remove("no-scroll");
			}
		},
		head: {
			title: "Jobs"
		}
	};
</script>
