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
						<p
							class="error"
							v-if="error !== undefined && error.length > 0"
							v-text="error"
						/>
						<select v-model="type" placeholder="Link">
							<option disabled value>
								{{ $t("partners.apply.select.default") }}
							</option>
							<option value="Website">{{
								$t("partners.apply.select.website")
							}}</option>
							<option>Twitch</option>
							<option value="Other">{{
								$t("partners.apply.select.other")
							}}</option>
						</select>
						<p>
							<label>{{ $t("partners.apply.form.name") }}:</label>
							<input
								v-model="name"
								:placeholder="$t('partners.apply.form.name.placeholder')"
							/>
						</p>
						<p>
							<label>{{ $t("partners.apply.form.link") }}:</label>
							<input
								v-model="link"
								:placeholder="$t('partners.apply.form.link.placeholder')"
							/>
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
							<input
								v-model="imageLink"
								:placeholder="$t('partners.apply.form.imageLink.placeholder')"
							/>
						</p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="button" @click="$emit('close')">
						{{ $t("partners.apply.form.button.close") }}
					</button>
					<button type="button" class="button" @click="apply()">
						{{ $t("partners.apply.form.button.apply") }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Apply",
		data() {
			return {
				showModal: false,
				type: "",
				name: "",
				link: "",
				description: "",
				imageLink: "",
				error: ""
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
					this.$axios
						.post(`/v2/partners/apply`, {
							type: this.type,
							name: this.name,
							link: this.link,
							description: this.description,
							imageLink: this.imageLink,
							token: this.$auth.$storage._state["_token.discord"]
						})
						.then(({ data }) => {
							if (data.error)
								this.$noty.error(this.$t("partners.apply.error4"));
							else {
								this.$noty.success(this.$t("partners.apply.success"));
								this.$emit("close");
							}
						})
						.catch(err => console.error);
				}
			}
		}
	};
</script>
