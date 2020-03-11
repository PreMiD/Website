<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="limage">
					<img src="../assets/images/pmd_logo2.png" />
					<p>
						Logged in as {{ $auth.user.username }}#{{
						$auth.user.discriminator
						}}
					</p>
				</div>
				<div class="modal-container">
					<div class="modal-header">
						<h1>Apply for partner</h1>
					</div>

					<div class="modal-body">
						<form id="demo-form" action="?" method="POST">
							<p class="error" v-if="error !== undefined && error.length > 0" v-text="error" />
							<select v-model="type" placeholder="Link">
								<option disabled value>Please select one</option>
								<option>Website</option>
								<option>Twitch</option>
								<option>Other</option>
							</select>
							<p>
								<label>Name:</label>
								<input v-model="name" placeholder="Ex: PreMiD" />
							</p>
							<p>
								<label>Link:</label>
								<input v-model="link" placeholder="Ex: https://premid.app" />
							</p>
							<p>
								<label>Description: (Maximum 150 characters)</label>
								<input v-model="description" placeholder="Description for featured" />
							</p>
							<p>
								<label>Image link: (550x300, PNG only)</label>
								<input v-model="imageLink" placeholder="Ex: https://i.imgur.com/clun1ID.png" />
							</p>
							<VueRecaptcha
								@verify="onVerify"
								@expired="onExpired"
								:loadRecaptchaScript="true"
								:sitekey="sitekey"
								class="recaptcha"
							></VueRecaptcha>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="button" @click="$emit('close')">Close</button>
						<button type="button" class="button" @click="apply()">Apply</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import axios from "axios";
import VueRecaptcha from "vue-recaptcha";

export default {
	name: "Apply",
	components: {
		VueRecaptcha
	},
	data() {
		return {
			showModal: false,
			type: "",
			name: "",
			link: "",
			description: "",
			imageLink: "",
			error: "",
			sitekey: "6LcafeAUAAAAAOH9ukc2DVPpZJQLSWp9_cxKAQXC"
		};
	},
	methods: {
		apply() {
			if (
				!this.type ||
				!this.name ||
				!this.link ||
				!this.description ||
				!this.imageLink
			)
				this.error = "Please complete all the fields.";
			else if (this.description.length > 150)
				this.error = "Maximum 150 characters description.";
			else if (
				!this.imageLink.startsWith("https://") ||
				!this.imageLink.endsWith(".png")
			)
				this.error =
					"Please add a link (has to start with https:// and end with .png).";
			else {
				axios
					.post(`${process.env.apiBase}/partners/apply`, {
						type: this.type,
						name: this.name,
						link: this.link,
						description: this.description,
						imageLink: this.imageLink,
						discordUser: {
							userTag: `${this.$auth.user.username}#${this.$auth.user.discriminator}`,
							userId: this.$auth.user.id
						},
						gresponse: this.response
					})
					.then(data => this.$emit("close"))
					.catch(err => console.error);
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
