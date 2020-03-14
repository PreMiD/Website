<template>
	<div class="job">
		<i v-bind:class="jobIcon"></i>
		<h1 v-text="jobName"></h1>
		<div class="button-container">
			<div class="button-container">
				<button
					v-t="'partners.apply.button'"
					type="button"
					class="button"
					@click="$auth.loggedIn ? (showModal = true) : $router.push('/login'); toggleScroll()"
				></button>
				<transition name="slide-down" mode="in-out">
					<JobApply
						v-if="showModal"
						:jobName="jobName"
						:jobQuestions="jobQuestions"
						@close="showModal = false; toggleScroll()"
					/>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import JobApply from "~/components/JobApply";

export default {
	name: "Job",
	components: {
		JobApply
	},
	props: {
		jobIcon: String,
		jobName: String,
		jobQuestions: Array
	},
	data() {
		return {
			showModal: false
		};
	},
	methods: {
		toggleScroll() {
			this.showModal
				? document.body.classList.add("no-scroll")
				: document.body.classList.remove("no-scroll");
		}
	}
};
</script>
