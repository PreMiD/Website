<template>
	<section class="rab">
		<h1 class="section-header" v-t="'report.title'">
			{{ $t("report.title") }}
		</h1>
		<div class="rab-container">
			<h1 style="text-align: center;" v-t="'report.info'">
				{{ $t("report.info") }}
			</h1>
			<h1
				class="section-header"
				v-t="'report.bugcount'"
				style="font-size: 28px;"
				v-html="bugCount"
			></h1>
		</div>

		<div v-if="bugInfo.data.info.count > 0">
			<div class="rab-container">
				<h1 class="heading" v-t="'report.overview'">
					{{ $t("report.overview") }}"
				</h1>
				<textarea
					type="text"
					class="breif"
					maxlength="50"
					v-model="Report.brief"
					required
				/>
			</div>
			<br />
			<div class="rab-container">
				<h1 class="heading" v-t="'report.os'">{{ $t("report.os") }}</h1>
				<select class="selection" required v-model="Report.os">
					<option disabled value>Please select one</option>
					<option>OS X</option>
					<option>Windows</option>
					<option>Linux</option>
				</select>
				<br />
				<br />
				<textarea
					type="text"
					maxlength="4"
					style="width: 50px;"
					class="breif"
					required
					v-model="Report.browserversion"
				/>
			</div>
			<br />
			<div class="rab-container">
				<h1 class="heading" v-t="'report.browser'">
					{{ $t("report.browser") }}
				</h1>
				<select class="selection" required v-model="Report.browser">
					<option disabled value>Please select one</option>
					<option>Chrome</option>
					<option>Firefox</option>
				</select>
				<br />
				<br />
				<textarea
					type="text"
					maxlength="10"
					style="width: 80px;"
					class="breif"
					required
					v-model="Report.osversion"
				/>
			</div>
			<br />
			<div class="rab-container">
				<h1 class="heading" v-t="'report.description'">
					{{ $t("report.description") }}
				</h1>
				<textarea
					style="white-space: pre-wrap;"
					type="text"
					class="desc"
					maxlength="2000"
					v-model="Report.description"
					required
				/>
			</div>
			<br />
			<div class="rab-container" style="margin-bottom: 10px;">
				<button
					type="button"
					class="button"
					@click="addToDB"
					v-t="'report.button'"
				>
					{{ $t("report.button") }}
				</button>
			</div>
		</div>
		<div
			v-if="bugInfo.data.info.count === 0"
			class="rab-container"
			style="margin-bottom: 300px;"
		>
			<h1 style="text-align: center;" class="heading" v-t="'report.toomany'">
				{{ $t("report.toomany") }}
			</h1>
		</div>
		<div
			v-if="bugInfo.data.info.count < 3 && bugInfo.data.info.count !== -1"
			class="rab-container"
		>
			<h2 v-t="'report.activebugs'">{{ $t("report.activebugs") }}</h2>
			<table style="width: 100%;">
				<tr v-for="bug of activeBugs.data" :key="bug.breif">
					<td style="vertical-align: top;">{{ bug.brief }}</td>
					<td
						style="padding-bottom: 20px; white-space: pre;"
						v-html="bug.description"
					></td>
				</tr>
			</table>
		</div>
	</section>
</template>

<script>
	export default {
		name: "RAB",
		auth: true,
		data() {
			return {
				display: false,
				bugInfo: { data: { info: { count: -1 } } },
				bugCount: "Loading...",
				Report: {
					brief: "",
					description: "",
					os: "",
					browser: "",
					osversion: "",
					browserversion: "",
					status: "New",
					date: new Date().valueOf()
				},
				activeBugs: []
			};
		},
		methods: {
			addToDB() {
				let newReport = {
					brief: this.Report.brief,
					system:
						this.Report.os +
						"-" +
						this.Report.osversion +
						";" +
						this.Report.browser +
						"-" +
						this.Report.browserversion,
					description: this.Report.description,
					status: this.Report.status,
					date: this.Report.date
				};
				if (this.bugInfo.data.info.count === 0)
					return this.$noty.error(this.$t("report.toomany"));
				if (
					!newReport.brief ||
					!newReport.description ||
					!newReport.date ||
					!newReport.system
				)
					return this.$noty.error(this.$t("report.error"));

				this.$axios
					.post(
						`${process.env.apiBase}/bugPost/${this.$auth.$storage._state["_token.discord"]}`,
						newReport
					)
					.then(response => {
						this.$noty.success(this.$t("report.success"));
						this.$router.push("/");
					})
					.catch(error => {
						this.$noty.error(error);
					});
			}
		},
		mounted() {
			this.$auth.$storage.setUniversal("redirect", "/bug");
			if (!this.$auth.loggedIn) return this.$auth.loginWith("discord");

			this.$axios
				.get(
					`${process.env.apiBase}/bugUserInfo/${this.$auth.$storage._state["_token.discord"]}`
				)
				.then(data => {
					if (!data.info) return (this.bugInfo.data.info.count = 3);

					this.bugInfo = data;
					if (data.data.info.count < 3) {
						this.$axios
							.get(
								`${process.env.apiBase}/bugInfo/${this.$auth.$storage._state["_token.discord"]}`
							)
							.then(data => {
								if (data.result === null) {
									this.activeBugs[0].brief = null;
									return (this.activeBugs[0].description = null);
								}

								this.bugCount = this.$t("report.bugcount").replace(
									"{count}",
									this.data.data.info.count
								);

								this.activeBugs = data;
							});
					}
				})
				.catch(err => {
					his.$router.push("/");
					this.$noty.error(this.$t("report.error.unauth"));
				});
		},
		head: {
			title: "Report A Bug"
		}
	};
</script>

<style lang="scss" scoped>
	@import "../stylesheets/variables.scss";

	.rab {
		.rab-container {
			padding-left: 25px;
			padding-right: 25px;
			padding-top: 25px;
			max-width: 1400px;
			margin: 0 auto;
		}
		textarea[type="text"].breif {
			height: 1.8rem;
			padding: 20 20;
			font-size: 14px;
			transition: all 300ms ease;
			border: none;
			background: lighten($background-secondary, 4%);
			color: lighten($background-secondary, 40%);
			line-height: 25px;
			font-weight: bold;
			width: 400px;
			border-radius: 8px;
			resize: none;

			&:focus {
				background: lighten($background-secondary, 7%);
				outline: none;
			}

			* {
				margin-left: -17.5rem;
			}

			&::placeholder {
				color: lighten($background-secondary, 45%);
			}
		}

		textarea[type="text"].desc {
			height: 150px;
			padding: 20 20;
			font-size: 14px;
			transition: all 300ms ease;
			border: none;
			background: lighten($background-secondary, 4%);
			color: lighten($background-secondary, 40%);
			line-height: 25px;
			font-weight: bold;
			width: 100%;
			border-radius: 10px;
			resize: none;

			&:focus {
				background: lighten($background-secondary, 7%);
				outline: none;
			}

			* {
				margin-left: -17.5rem;
			}

			&::placeholder {
				color: lighten($background-secondary, 45%);
			}
		}

		.selection {
			height: 1.8rem;
			font-size: 14px;
			transition: all 300ms ease;
			border: none;
			background: lighten($background-secondary, 4%);
			color: lighten($background-secondary, 40%);
			line-height: 25px;
			font-weight: bold;
			border-radius: 8px;

			&:focus {
				background: lighten($background-secondary, 7%);
				outline: none;
			}

			* {
				margin-left: -17.5rem;
			}

			&::placeholder {
				color: lighten($background-secondary, 45%);
			}
		}

		h1.section-header {
			text-align: center;
			font-weight: 800;
			font-size: 52px;
			letter-spacing: -1px;
			background: linear-gradient(30deg, $accent-primary, #b3aeff);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: none;

			&::after {
				transition: 0.15s opacity ease-out;
				position: absolute;
				content: "";
				background: rgba(114, 137, 218, 0.25) !important;
				width: 100%;
				height: 100%;
				display: inline-block;
				left: 0;
				margin-top: -15px;
				z-index: -1;
				opacity: 0;
			}
		}
		.button {
			padding: 0 50;
		}
	}
</style>
