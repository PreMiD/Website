<template>
	<div>
		<title>PreMiD - Contributors</title>
		<section class="contributors">
			<div v-if="contributors">
				<div class="contributor-container">
					<h1
						class="titleHeading"
						v-text="$t('contributors.headings.staff')"
					></h1>
					<div class="contributor-inner">
						<div
							v-for="contributor of contributors"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard
								v-if="isStaffRole(contributor.user.roleId)"
								:user="contributor.user"
							/>
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
							v-for="contributor of contributors"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard
								v-if="isSupporterRole(contributor.user.roleId)"
								:user="contributor.user"
							/>
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
							v-for="contributor of contributors"
							:key="contributor.user.id"
							class="contributor-card"
						>
							<CreditCard
								v-if="isTranslatorRole(contributor.user.roleId)"
								:user="contributor.user"
							/>
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
		async asyncData({ app }) {
			try {
				const contributors = await app.$graphql(
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
						}
					}`
				);

				return {
					contributors: contributors.credits
						.sort((a, b) =>
							a.user.name.toLowerCase().localeCompare(b.user.name.toLowerCase())
						)
						.sort((a, b) => b.user.rolePosition - a.user.rolePosition)
						.reverse()
				};
			} catch (err) {
				return {
					contributors: null
				};
			}
		},
		data() {
			return {
				contributors: [],
				display: false
			};
		},
		methods: {
			isStaffRole(roleId) {
				const staffRoles = [
					"514546359865442304", // Discord Mod
					"566417964820070421", // Technical Support
					"673682085608816652", // Project Management
					"685969048399249459", // Human Resources
					"994342612532199525", // Community Management
					"673682085608816652", // Project Management
					"811262682408943616", // Localization Manager
				];

				if (staffRoles.indexOf(roleId) !== -1) return true;
				else return false;
			},
			isSupporterRole(roleId) {
				const supportRoles = [
					"502165799172309013", //Donator
					"515874214750715904", //Patron
					"585532751663333383" //Booster
				];

				if (supportRoles.indexOf(roleId) !== -1) return true;
				else return false;
			},
			isTranslatorRole(roleId) {
				const translatorRoles = ["502148045991968788", "522755339448483840"]; //Translator, Proofreader

				if (translatorRoles.indexOf(roleId) !== -1) return true;
				else return false;
			},
			userNameColor(patronColor, userColor) {
				if (patronColor == "#fff") return userColor;
				else return patronColor;
			}
		},

		head() {
			return {
				title: "Contributors"
			};
		}
	};
</script>
