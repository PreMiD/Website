<template>
	<section class="rab">
		<h1 style="text-align: center;" class="section-header" v-t="'report.title'">
			{{ $t("report.title") }}
		</h1>
		<div class="rab-container">
			<h1 style="text-align: center;" v-t="'report.info'">
				{{ $t("report.info") }}
			</h1>
			<h1
				class="section-header"
				v-t="'report.bugcount'"
				style="font-size: 28px; text-align: center;"
				v-html="bugCount"
			></h1>
		</div>

		<div
			style="margin-top: -15px;"
			class="rab-container"
			v-if="bugInfo.count > 0"
		>
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
				<select
					style="width: 120px;"
					class="selection"
					required
					v-model="Report.os"
				>
					<option>Mac OS</option>
					<option>Windows</option>
					<option>Linux</option>
				</select>
				<br />
				<br />
				<textarea
					type="text"
					maxlength="14"
					style="width: 116px;"
					class="breif"
					required
					placeholder="10.0.19041.264"
					v-model="Report.browserversion"
				/>
			</div>
			<br />
			<div class="rab-container">
				<h1 class="heading" v-t="'report.browser'">
					{{ $t("report.browser") }}
				</h1>
				<select
					style="width: 120px;"
					class="selection"
					required
					v-model="Report.browser"
				>
					<option selected>Chrome</option>
					<option>Firefox</option>
				</select>
				<br />
				<br />
				<textarea
					type="text"
					maxlength="20"
					style="width: 116px;"
					class="breif"
					required
					placeholder="0.0.0.0"
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
					v-model="Report.description"
					required
				/>
			</div>
			<br />
			<div class="rab-container" style="margin-bottom: 80px;">
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
			v-if="bugInfo.count === 0"
			class="rab-container"
			style="margin-bottom: 300px; margin-top: -15px;"
		>
			<h1 style="text-align: center;" class="heading" v-t="'report.toomany'">
				{{ $t("report.toomany") }}
			</h1>
		</div>
		<div
			v-if="bugInfo.count < 3 && bugInfo.count !== -1"
			class="rab-container"
			style="margin-bottom: 80px; margin-top: 50px;"
		>
			<h2 v-t="'report.activebugs'">{{ $t("report.activebugs") }}</h2>
			<table style="width: 100%;">
				<tr v-for="bug of activeBugs" :key="bug.breif">
					<td
						style="
							vertical-align: top;
							color: #c7cfd6;
							padding-bottom: 50px;
							width: 25%;
						"
					>
						{{ bug.brief }}
					</td>
					<td
						style="
							padding-left: 50px;
							padding-bottom: 50px;
							white-space: pre-wrap;
							color: #c7cfd6;
						"
						v-html="bug.description"
					></td>
				</tr>
			</table>
		</div>
	</section>
</template>

<script>
	import axios from "axios";

	export default {
		name: "RAB",
		auth: true,
		data() {
			return {
				display: false,
				bugInfo: { count: -1 },
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
				if (this.bugInfo.count === 0)
					return this.$noty.error(this.$t("report.toomany"));
				if (
					!newReport.brief ||
					!newReport.description ||
					!newReport.date ||
					!newReport.system
				)
					return this.$noty.error(this.$t("report.error"));

				axios
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
			if (!this.$auth.loggedIn) return this.$router.push("/login");
			axios
				.get(
					`${process.env.apiBase}/bugUserInfo/${this.$auth.$storage._state["_token.discord"]}`
				)
				.then(data => {
					if (
						data.data === null ||
						data.data === undefined ||
						data.data === ""
					) {
						return (this.bugInfo.count = 3);
					}
					console.log(data.data);
					this.bugInfo.count = data.data.count;
					if (data.data.count < 3) {
						this.activeBugs = data.data.bugs;
					}
				})
				.catch(err => {});
		},
		head() {
			if (this.bugInfo.count === 0) {
				this.$noty.error(this.$t("report.toomany.alert"));
				this.bugCount = this.$t("report.bugcount").replace("{count}", 0);
			} else
				this.bugCount = this.$t("report.bugcount").replace(
					"{count}",
					this.bugInfo.count
				);
			return {
				title: "Report A Bug"
			};
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
			padding-bottom: 25px;
			max-width: 1400px;
			margin: 0 auto;
			background: #2f3136;
			border-radius: 0.5rem;
			color: white;

			.table {
				white-space: nowrap;
				width: auto;
				height: auto;
			}
			textarea::-webkit-scrollbar-thumb {
				width: 10px;
			}
			textarea::-webkit-scrollbar-track {
				border-radius: 10px;
			}
		}
		textarea[type="text"].breif {
			height: 1.8rem;
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
