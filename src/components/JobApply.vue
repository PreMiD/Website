<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="limage">
				<img src="../assets/images/pmd_logo2.png" />
				<div class="text">
					<p>
						{{
						$t("partners.apply.loggedUser", {
						0: `${$auth.user.username}#${$auth.user.discriminator}`
						})
						}}
					</p>
					<a href="/logout">{{ $t("partners.apply.notYou") }}</a>
					<p class="steps">STEP {{ currentPage + 1 }} OF 2</p>
				</div>
			</div>
			<div class="modal-container" style="background-color: #23272a;">
				<div class="modal-header" style="margin-bottom: 3em;">
					<h1>Apply for {{ jobName }}</h1>
					<p v-text="error" style="color: red; font-size: 1em; margin: 0;"></p>
				</div>

				<div class="modal-body">
					<First v-if="currentPage == 0" />
					<Questions v-if="currentPage == 1" :jobQuestions="jobQuestions" />
					<div v-if="currentPage == 1" class="jobCheckbox">
						<!-- TODO: Fix the checkbox. -->
						<div class="checkbox-switcher">
							<label>
								<input type="checkbox" :checked="check" @change="check = !check" />
								<span ref="checkbox" class="checkbox-container"></span>
								<p>{{ text }}</p>
							</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="buttons">
						<button v-if="currentPage == 1" type="button" class="button" @click="apply()">Apply</button>
						<button v-if="currentPage != 1" type="button" class="button" @click="currentPage++">Next</button>
						<button type="button" class="button" @click="$emit('close')">Cancel</button>
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
		jobName: String,
		jobQuestions: Array
	},
	data() {
		return {
			showModal: false,
			check: false,
			errors: 0,
			error: "",
			sitekey: "6LcafeAUAAAAAOH9ukc2DVPpZJQLSWp9_cxKAQXC",
			text:
				"PreMiD is an open-source product, meaning we are a non-profit team, every donation or patreon money goes back into the product. By applying for a job position at PreMiD you acknowledge that you are volunteering in the team, you will not be payed for your work.",
			currentPage: 0
		};
	},
	methods: {
		apply() {
			this.errors = 0;
			this.jobQuestions.map(question => {
				if (!question.response && question.required == true) this.errors++;
			});

			if (!this.check) this.errors++;

			if (this.errors == 0 && this.check) {
				axios
					.post(`${process.env.apiBase}/jobs/apply`, {
						questions: this.jobQuestions,
						discordUser: this.$auth.user
					})
					.then(data => console.log(data))
					.catch(err => console.error(err));
			} else {
				this.error = "Please complete all fields";
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
