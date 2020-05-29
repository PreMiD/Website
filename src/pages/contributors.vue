<template>
	<div>
		<title>PreMiD - Contributors</title>
		<section class="contributors">
			<div class="contributor-container">
				<h1 class="heading" v-text="$t('contributors.headings.staff')"></h1>
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
					class="heading"
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
					class="heading"
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
		</section>
	</div>
</template>

<script>
	export default {
		name: "Contributors",
		auth: false,
		async asyncData({ app }) {
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
				contributors: contributors.credits.sort(
					(a, b) => b.user.rolePosition - a.user.rolePosition
				)
			};
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
					"606270745299124235", //Creator
					"493135149274365975", //Executive Director
					"691382096878370837", //Operations Supervisior
					"673681900476432387", //Global Community Representative
					"673682511288598575", //Head Software Engineer
					"616646805907832833", //Web Developer
					"691393583189721088", //Linux Maintainer
					"691396820236107837", //Engineer
					"691386502566903850", //Graphic Designer
					"548518356324581377", //Senior Moderator
					"673683121971134505", //Head of Presence Verifying
					"691384256672563332", //Community Representative
					"514546359865442304", //Moderator
					"526734093560315925", //Junior Moderator
					"566417964820070421", //Support Agent
					"630445337143935009" //Presence Verifier
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
