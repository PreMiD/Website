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
				<div class="modal-header" style="margin-bottom: 3em;">
					<h1>{{ $t("jobs.modal.title", { 0: job.jobName }) }}</h1>
					<p v-text="error" style="color: red; font-size: 1em; margin: 0;"></p>
				</div>

				<div class="modal-body">
					<First v-if="currentPage == 0" :job="job" />
					<Questions v-if="currentPage == 1" :job="job" />
					<div v-if="currentPage == 1" class="jobCheckbox">
						<!-- TODO: Fix the checkbox. -->
						<div class="checkbox-switcher">
							<label>
								<input
									type="checkbox"
									v-model="check"
								/>
								<span ref="checkbox" class="checkbox-container"></span>
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

<script>
	import axios from "axios";
	import VueRecaptcha from "vue-recaptcha";
	import First from "~/components/steps/First";
	import Questions from "~/components/steps/Questions";

	export default {
		name: "JobApply",
		components: {
			VueRecaptcha,
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
				sitekey: "6LcafeAUAAAAAOH9ukc2DVPpZJQLSWp9_cxKAQXC",
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
							questions: this.job.questions,
							discordUser: this.$auth.user
						})
						.then(data => console.log(data))
						.catch(err => console.error(err));
				} else {
					this.error = this.$t("jobs.modal.error");
				}
			},
			onSubmit: function() {
				this.$refs.invisibleRecaptcha.execute();
			},
			onVerify: function(response) {
				this.response = response;
			},
			onExpired: function() {
				console.log("Expired");
			},
			resetRecaptcha() {
				this.$refs.recaptcha.reset();
			}
		}
	};
</script>
