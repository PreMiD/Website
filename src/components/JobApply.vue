<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="limage">
				<img src="../assets/images/pmd_logo2.png" />
				<div class="bottomText">
					<p>
						{{
							$t("partners.apply.loggedUser", {
								0: `${$auth.user.username}#${$auth.user.discriminator}`
							})
						}}
					</p>
					<a href="/logout">{{ $t("partners.apply.notYou") }}</a>
					<p class="steps">
						{{ $t("jobs.modal.step", { 0: currentPage + 1 }) }}
					</p>
				</div>
			</div>
			<div class="modal-container" style="background-color: #23272a;">
				<div class="modal-header">
					<h1>{{ $t("jobs.modal.title", { 0: job.jobName }) }}</h1>
				</div>

				<div class="modal-body">
					<p v-text="error" style="color: red; font-size: 1em; margin: 0;"></p>

					<First v-if="currentPage == 0" :job="job" />
					<Questions v-if="currentPage == 1" :job="job" />
					<div v-if="currentPage == 1" class="jobCheckbox">
						<div class="checkbox-switcher">
							<label>
								<input type="checkbox" v-model="check" />
								<span ref="checkbox" class="checkbox-container fa jobs"></span>
								<p>{{ $t("jobs.modal.notice") }}</p>
							</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="buttons">
						<button
							v-if="currentPage == 1"
							type="button"
							class="button"
							@click="apply()"
						>
							{{ $t("partners.apply.form.button.apply") }}
						</button>
						<button
							v-if="currentPage != 1"
							type="button"
							class="button"
							@click="currentPage++"
						>
							{{ $t("jobs.modal.buttons.next") }}
						</button>
						<button type="button" class="button" @click="$emit('close')">
							{{ $t("jobs.modal.buttons.cancel") }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.checkbox-container.jobs::after {
		top: 75% !important;
		left: 75% !important;
		transform: translateX(-50%) translateY(-50%) !important;
	}
</style>

<script>
	import axios from "axios";
	import First from "~/components/steps/First";
	import Questions from "~/components/steps/Questions";

	export default {
		name: "JobApply",
		components: {
			First,
			Questions
		},
		props: {
			job: Object
		},
		data() {
			return {
				showModal: false,
				check: false,
				errors: 0,
				error: "",
				currentPage: 0
			};
		},
		methods: {
			apply() {
				this.errors = 0;
				this.job.questions.map(question => {
					if (!question.response && question.required == true) this.errors++;
				});

				if (!this.check) this.errors++;

				if (this.errors == 0 && this.check) {
					axios
						.post(`${process.env.apiBase}/jobs/apply`, {
							position: this.job.jobName,
							questions: this.job.questions,
							token: this.$auth.$storage._state["_token.discord"]
						})
						.then(({ data }) => {
							if (data.error === 3)
								this.$noty.error(this.$t("jobs.error.alreadyApplied"));
							if (!data.error) {
								this.$noty.success(this.$t("jobs.success.applied"));
								this.$emit("close");
							}
						})
						.catch(err => console.error(err));
				} else {
					this.error = this.$t("jobs.modal.error");
				}
			}
		}
	};
</script>
