<template>
	<div>
		<title>PreMiD - Contributors</title>
		<section class="contributors" v-if="!$fetchState.pending">
			<div v-if="contributors">
				<div class="contributor-container">
					<h1
						class="titleHeading"
						v-text="$t('contributors.headings.staff')"
					></h1>
					<div class="contributor-inner">
						<div
							v-for="contributor of staffs"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard :user="contributor.user" />
						</div>
					</div>
				</div>

				<div class="contributor-container">
					<h1
						class="titleHeading"
						v-text="$t('contributors.headings.supporters')"
					></h1>
					<div class="contributor-inner">
						<div
							v-for="contributor of supporters"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard :user="contributor.user" />
						</div>
					</div>
				</div>

				<div class="contributor-container">
					<h1
						class="titleHeading"
						v-text="$t('contributors.headings.translators')"
					></h1>
					<div class="contributor-inner">
						<div
							v-for="contributor of translators"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard :user="contributor.user" />
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="contributor-container">
					<h1 class="errorHeading">Well, that's unfortunate...</h1>
					<h2 class="errorText">
						We were unable to load the contributors list... Please try again
						later
					</h2>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss">
	@import "../stylesheets/variables.scss";

	.errorHeading {
		text-align: center;
		font-family: "Discord Font", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		font-size: 2em;
		color: $accent-primary;
		margin: 0;
	}

	.errorText {
		text-align: center;
		margin: 0;
		font-size: 1em;
	}

	.titleHeading {
		margin: 0 5px;
		font-family: "Discord Font", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		color: $accent-primary;
		font-size: 2.5em;
	}
</style>

<script>
	export default {
		name: "Contributors",
		auth: false,
		async fetch() {
			if (process.client) this.$nuxt.$loading.start();
			try {
				const contributors = await this.$graphql(
					`
					{
						credits {
							user {
								id
								avatar
								status
								name
								role
								roleId
								roleColor
								rolePosition
							}
							roles {
								id
							}
						}
					}`
				);

				this.contributors = contributors.credits
					.sort((a, b) =>
						a.user.name.toLowerCase().localeCompare(b.user.name.toLowerCase())
					)
					.sort((a, b) => b.user.rolePosition - a.user.rolePosition)
					.reverse();
			} catch (err) {
				this.contributors = null;
			}

			if (process.client) this.$nuxt.$loading.finish();
		},
		data() {
			return {
				contributors: [],
				display: false,
				roles: {
					staff: [
						"673682085608816652", // Project Management
						"691382432246530150" // Project Staff
					],
					support: [
						"515874214750715904", // Patron
						"585532751663333383", // Booster
						"502165799172309013" // Donator
					],
					translator: [
						"522755339448483840", // Proofreader
						"502148045991968788" // Translator
					]
				}
			};
		},
		computed: {
			staffs() {
				const contributors = this.contributors
					.filter(
						contributor =>
							contributor.roles &&
							contributor.roles.filter(r => this.isStaffRole(r.id)).length > 0
					)
					.map(contributor => {
						if (
							!contributor.roles.map(r => r.id).includes(this.roles.staff[0])
						) {
							contributor.user.roleId = this.roles.staff[1];
							contributor.user.role = "Project Staff";
							contributor.user.roleColor = "#42b883";
						}

						return contributor;
					});

				this.sortContributorsByRoles(contributors, this.roles.staff);

				return contributors;
			},
			supporters() {
				const contributors = this.contributors.filter(contributor =>
					this.isSupporterRole(contributor.user.roleId)
				);

				this.sortContributorsByRoles(contributors, this.roles.support);

				return contributors;
			},
			translators() {
				const contributors = this.contributors.filter(contributor =>
					this.isTranslatorRole(contributor.user.roleId)
				);

				this.sortContributorsByRoles(contributors, this.roles.translator);

				return contributors;
			}
		},
		methods: {
			isStaffRole(roleId) {
				return this.roles.staff.indexOf(roleId) !== -1;
			},
			isSupporterRole(roleId) {
				return this.roles.support.indexOf(roleId) !== -1;
			},
			isTranslatorRole(roleId) {
				return this.roles.translator.indexOf(roleId) !== -1;
			},
			userNameColor(patronColor, userColor) {
				if (patronColor == "#fff") return userColor;
				else return patronColor;
			},
			sortContributorsByRoles(contributors, roles) {
				const stringCollator = new Intl.Collator("en", {
					sensitivity: "base"
				});

				contributors.sort((contributor1, contributor2) => {
					const contributor1RolePos = roles.indexOf(contributor1.user.roleId);
					const contributor2RolePos = roles.indexOf(contributor2.user.roleId);

					const rolesCompare = contributor1RolePos - contributor2RolePos;

					if (rolesCompare !== 0) {
						return rolesCompare;
					}

					return stringCollator.compare(
						contributor1.user.name,
						contributor2.user.name
					);
				});
			}
		},

		head() {
			return {
				title: "Contributors"
			};
		}
	};
</script>
