<template>
	<div class="job">
		<i v-bind:class="job.jobIcon"></i>
		<h1 v-text="job.jobName"></h1>
		<div class="button-container">
			<div class="button-container">
				<button
					v-t="'partners.apply.button'"
					type="button"
					class="button"
					@click="
						$auth.loggedIn ? (showModal = true) : $router.push('/login');
						toggleScroll();
					"
				></button>
				<transition name="slide-down" mode="in-out">
					<JobApply
						v-if="showModal"
						:job="job"
						@close="
							showModal = false;
							toggleScroll();
						"
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
		job: Object
	},
	data() {
		return {
			showModal: false
		};
	},
	mounted() {
		this.$auth.$storage.setUniversal("redirect", "/jobs");
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
