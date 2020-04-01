<template>
	<div>
		<div class="userpage-container">
			<div v-if="error">
				<span>{{ $t("user.notFound.heading") }}</span>
				<ul style="max-width: 50%;">
					<li>{{ $t("user.notFound.message1") }}</li>
					<li>{{ $t("user.notFound.message2") }}</li>
					<li>{{ $t("user.notFound.message3") }}</li>
				</ul>
				<span v-html="linkify($t('user.notFound.message4'))"></span>
			</div>
			<div v-else class="userpage__header">
				<div class="user-avatar">
					<img :src="user.avatar" />
				</div>
				<div class="user-data">
					<p class="username">
						{{ user.name }}
						<span class="tag">#{{ user.tag }}</span>
					</p>
					<div class="roles">
						<div v-for="role in user.roles" :key="role" :role="role">
							<i
								v-if="role == 'Creator'"
								v-tippy="{
									content: $t('contributors.roles.creator'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Executive Director'"
								v-tippy="{
									content: $t('contributors.roles.executiveDirector'),
									placement: 'bottom'
								}"
								class="fas fa-users"
							></i>
							<i
								v-if="role == 'Operations Supervisior'"
								v-tippy="{
									content: $t('contributors.roles.operationsSupervisior'),
									placement: 'bottom'
								}"
								class="fas fa-users"
							></i>
							<i
								v-if="role == 'Global Community Representative'"
								v-tippy="{
									content: $t(
										'contributors.roles.globalCommunityRepresentative'
									),
									placement: 'bottom'
								}"
								class="fas fa-database"
							></i>
							<i
								v-if="role == 'Head Software Engineer'"
								v-tippy="{
									content: $t('contributors.roles.headSoftwareEngineer'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Web Developer'"
								v-tippy="{
									content: $t('contributors.roles.webDeveloper'),
									placement: 'bottom'
								}"
								class="fas fa-hat-cowboy"
							></i>
							<i
								v-if="role == 'Linux Maintainer'"
								v-tippy="{
									content: $t('contributors.roles.linuxMaintainer'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Engineer'"
								v-tippy="{
									content: $t('contributors.roles.engineer'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Graphic Designer'"
								v-tippy="{
									content: $t('contributors.roles.graphicDesigner'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Senior Moderator'"
								v-tippy="{
									content: $t('contributors.roles.seniorModerator'),
									placement: 'bottom'
								}"
								class="fas fa-hat-cowboy"
							></i>
							<i
								v-if="role == 'Head of Presence Verifying'"
								v-tippy="{
									content: $t('contributors.roles.verificationHead'),
									placement: 'bottom'
								}"
								class="fas fa-hat-cowboy"
							></i>
							<i
								v-if="role == 'Community Representative'"
								v-tippy="{
									content: $t('contributors.roles.communityRepresentative'),
									placement: 'bottom'
								}"
								class="fas fa-hat-cowboy"
							></i>
							<i
								v-if="role == 'Moderator'"
								v-tippy="{
									content: $t('contributors.roles.moderator'),
									placement: 'bottom'
								}"
								class="fas fa-user-cog"
							></i>
							<i
								v-if="role == 'Junior Moderator'"
								v-tippy="{
									content: $t('contributors.roles.juniorModerator'),
									placement: 'bottom'
								}"
								class="fas fa-user-cog"
							></i>
							<i
								v-if="role == 'Support Agent'"
								v-tippy="{
									content: $t('contributors.roles.supportAgent'),
									placement: 'bottom'
								}"
								class="fas fa-ticket-alt"
							></i>
							<i
								v-if="role == 'Presence Verifier'"
								v-tippy="{
									content: $t('user.roles.presenceVerifier'),
									placement: 'bottom'
								}"
								class="fas fa-clipboard-check"
							></i>
							<i
								v-if="role == 'Presence Developer'"
								v-tippy="{
									content: $t('user.roles.presenceDeveloper'),
									placement: 'bottom'
								}"
								class="fas fa-user-astronaut"
							></i>
							<i
								v-if="role == 'Patron'"
								v-tippy="{ content: 'Patron', placement: 'bottom' }"
								class="fab fa-patreon"
							></i>
							<i
								v-if="role == 'Donator'"
								v-tippy="{
									content: $t('contributors.roles.donator'),
									placement: 'bottom'
								}"
								class="fas fa-meteor"
							></i>
							<i
								v-if="role == 'Proofreader'"
								v-tippy="{
									content: $t('contributors.roles.proofreader'),
									placement: 'bottom'
								}"
								class="fas fa-check"
							></i>
							<i
								v-if="role == 'Translator'"
								v-tippy="{
									content: $t('contributors.roles.translator'),
									placement: 'bottom'
								}"
								class="fas fa-globe"
							></i>
						</div>
						<i
							v-if="userPresences.length > 20"
							v-tippy="{
								content: `${$t('user.importantPresenceDev.message1')}<br>${$t(
									'user.importantPresenceDev.message2'
								).replace('{0}', userPresences.length)}`,
								placement: 'bottom'
							}"
							class="fas fa-crown"
						></i>
						<i
							v-if="userPresences.length > 100"
							v-tippy="{
								content: `${$t('user.geniusPresenceDev.message1')}<br>${$t(
									'user.geniusPresenceDev.message2'
								)}`,
								placement: 'bottom'
							}"
							class="fas fa-brain"
						></i>
					</div>
				</div>
			</div>
			<div v-if="!error" class="userpage__presences">
				<h1 class="heading">
					<div
						v-if="userContributions.length > 0"
						v-tippy="{
							content: showContributions
								? $t('user.presences.created')
								: $t('user.presences.contributed'),
							placement: 'top'
						}"
						class="contributes"
						@click="showContributions = !showContributions"
						v-html="tabbify($t('user.switch.contributed'))"
					></div>
					<div
						v-else
						class="noContributes"
						v-html="tabbify($t('user.switch.contributed'))"
					></div>
				</h1>
				<div v-if="!showContributions" class="presence-container">
					<StoreCard
						v-for="presence of userPresences"
						:key="presence.service"
						:presence="presence"
						store-functions="true"
					/>
				</div>
				<div
					v-else-if="showContributions && userContributions.length > 0"
					class="presence-container"
				>
					<StoreCard
						v-for="presence of userContributions"
						:key="presence.service"
						:presence="presence"
						store-functions="true"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import StoreCard from "../../components/StoreCard";

	export default {
		name: "Userpage",
		auth: false,
		components: {
			StoreCard
		},
		async asyncData({ params }) {
			const user = (
					await axios(`${process.env.apiBase}/credits/${params.userId}`)
				).data,
				presences = (await axios(`${process.env.apiBase}/presences`)).data;

			return {
				error: user.error ? true : false,
				user: user,
				showContributions: false,
				userPresences: presences
					.filter(p => p.metadata.author.id === user.userId)
					.map(p => p.metadata),
				userContributions: presences
					.filter(p =>
						p.metadata.contributors?.some(cont => cont.id == user.userId)
					)
					.map(p => p.metadata)
			};
		},
		data() {
			return {
				user: [],
				userPresences: [],
				userContributions: [],
				showContributions: false
			};
		},
		methods: {
			linkify(pls) {
				if (!pls.match(/(\[.*?\])/g)) return pls;
				else
					return pls.match(/(\[.*?\])/g).map(ch => {
						return pls.replace(
							ch,
							`<a href="https://discord.gg/premid">${ch.slice(
								1,
								ch.length - 1
							)}</a>`
						);
					})[0];
			},
			tabbify(pls) {
				if (!pls.match(/(\[.*?\])/g)) return pls;
				else if (!this.showContributions)
					return pls.match(/(\[.*?\])/g).map(ch => {
						return pls.replace(
							ch,
							`<span style="color:#7288da">${
								ch.slice(1, ch.length - 1).split("/")[0]
							}</span>`
						);
					})[0];
				else if (this.showContributions)
					return pls.match(/(\[.*?\])/g).map(ch => {
						return pls.replace(
							ch,
							`<span style="color:#7288da">${
								ch.slice(1, ch.length - 1).split("/")[1]
							}</span>`
						);
					})[0];
			}
		},
		head() {
			return {
				title: `${
					!this.error && this.user.name ? this.user.name : "Unknown User"
				}`,
				meta: [
					{
						hid: "description",
						name: "description",
						content: `${
							!this.error && this.user.name ? this.user.name : "Unknown user"
						}'s profile.`
					},
					{
						hid: "og:description",
						property: "og:description",
						content: `${
							!this.error && this.user.name ? this.user.name : "Unknown user"
						}'s profile.`
					},
					{
						hid: "og:title",
						property: "og:title",
						content:
							!this.error && this.user.name ? this.user.name : "Unknown User"
					},
					{
						hid: "og:image",
						property: "og:image",
						content:
							!this.error && this.user.avatar
								? this.user.avatar
								: "https://premid.app/assets/images/logo.png"
					}
				]
			};
		}
	};
</script>
