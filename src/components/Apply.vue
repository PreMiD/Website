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
				</div>
			</div>
			<div class="modal-container">
				<div class="modal-header">
					<h1>{{ $t("partners.apply.title") }}</h1>
				</div>

				<div class="modal-body">
					<form id="demo-form" action="?" method="POST">
						<p class="error" v-if="error !== undefined && error.length > 0" v-text="error" />
						<select v-model="type" placeholder="Link">
							<option disabled value>
								{{
								$t("partners.apply.select.default")
								}}
							</option>
							<option>{{ $t("partners.apply.select.website") }}</option>
							<option>Twitch</option>
							<option>{{ $t("partners.apply.select.other") }}</option>
						</select>
						<p>
							<label>{{ $t("partners.apply.form.name") }}:</label>
							<input v-model="name" :placeholder="$t('partners.apply.form.name.placeholder')" />
						</p>
						<p>
							<label>{{ $t("partners.apply.form.link") }}:</label>
							<input v-model="link" :placeholder="$t('partners.apply.form.link.placeholder')" />
						</p>
						<p>
							<label>{{ $t("partners.apply.form.description") }}</label>
							<input
								v-model="description"
								:placeholder="$t('partners.apply.form.description.placeholder')"
							/>
						</p>
						<p>
							<label>{{ $t("partners.apply.form.imageLink") }}</label>
							<input v-model="imageLink" :placeholder="$t('partners.apply.form.imageLink.placeholder')" />
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
					<button
						type="button"
						class="button"
						@click="$emit('close')"
					>{{ $t("partners.apply.form.button.close") }}</button>
					<button
						type="button"
						class="button"
						@click="apply()"
					>{{ $t("partners.apply.form.button.apply") }}</button>
				</div>
			</div>
		</div>
	</div>
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
				this.error = this.$t("partners.apply.error1");
			else if (this.description.length > 150)
				this.error = this.$t("partners.apply.error2");
			else if (
				!this.imageLink.startsWith("https://") ||
				!this.imageLink.endsWith(".png")
			)
				this.error = this.$t("partners.apply.error3");
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
					.then(data => {
						this.$emit("close");
						alert(
							"Thank you! We will review your form as soon as possible! Stay safe."
						); // temporary solution.
					})
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
