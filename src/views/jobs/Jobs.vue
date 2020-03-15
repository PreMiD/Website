<template>
	<div>
		<div class="jobs-container">
			<div class="jobs-heading">
				<h1 v-text="$t('jobs.header.title')"></h1>
				<p v-text="$t('jobs.header.description')"></p>
				<img src="https://i.imgur.com/PwSpU7o.png" />
			</div>
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
		<div class="jobs-heading">
			<div class="openings">
				<h1 v-text="$t('jobs.openings.title')"></h1>
				<div class="jobs">
					<Job
						v-for="job in jobs.filter(j => j.available)"
						:key="job.jobName"
						:job="job"
					></Job>
				</div>
			</div>
			<div class="benefits">
				<h1 v-text="$t('jobs.benefits.title')"></h1>
				<Benefit
					v-for="benefit in benefits"
					:key="benefit.title"
					:icon="benefit.icon"
					:title="$t(benefit.title)"
					:description="$t(benefit.description)"
				></Benefit>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Job from "~/components/Job";
	import Benefit from "~/components/Benefit";

	export default {
		name: "Jobs",
		components: {
			Job,
			Benefit
		},
		auth: false,
		async asyncData() {
			const jobs = (await axios(`${process.env.apiBase}/jobs`)).data,
				benefits = (await axios(`${process.env.apiBase}/jobs/benefits`)).data;

			return {
				jobs,
				benefits
			};
		},
		head: {
			title: "Jobs"
		}
	};
</script>
