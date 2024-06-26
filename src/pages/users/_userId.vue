<template>
	<div v-if="!$fetchState.pending">
		<div class="userpage-container">
			<div v-if="error">
				<span>{{ $t("user.notFound.heading") }}</span>
				<ul style="max-width: 50%">
					<li>{{ $t("user.notFound.message1") }}</li>
					<li>{{ $t("user.notFound.message2") }}</li>
					<li>{{ $t("user.notFound.message3") }}</li>
				</ul>
				<span v-html="linkify($t('user.notFound.message4'))"></span>
			</div>
			<div v-else class="userpage__header">
				<div class="user-avatar">
					<nuxt-img alt="User Avatar" :src="user.avatar" />
				</div>
				<div class="user-data">
					<p class="username">
						{{ user.name }}
					</p>
					<div class="roles">
						<div v-for="role in user.roles" :key="role" :role="role">
							<i
								v-if="role == 'Project Management'"
								v-tippy="{
									content: $t('contributors.roles.projectManagement'),
									placement: 'bottom'
								}"
								class="fas fa-tools"
							></i>
							<i
								v-if="role == 'Human Resources'"
								v-tippy="{
									content: $t('contributors.roles.humanResources'),
									placement: 'bottom'
								}"
								class="fas fa-users"
							></i>
							<i
								v-if="role == 'Discord Moderator'"
								v-tippy="{
									content: $t('contributors.roles.discordModerator'),
									placement: 'bottom'
								}"
								class="fas fa-user-cog"
							></i>
							<i
								v-if="role == 'Technical Support'"
								v-tippy="{
									content: $t('contributors.roles.technicalSupport'),
									placement: 'bottom'
								}"
								class="fas fa-ticket-alt"
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
	export default {
		name: "Userpage",
		auth: false,
		data() {
			return {
				error: null,
				user: null,
				showContributions: false,
				userPresences: [],
				userContributions: []
			};
		},
		async fetch() {
			/* if (process.browser) {
				window.$nuxt.$loading.start();
			} */
			let res = await this.$graphql(
				`{
				credits(id: "${this.$route.params.userId}") {
					user {
						name
						avatar
					}
					roles{
						name
					}
				}
				authorPresences: presences(author: "${this.$route.params.userId}") {
					metadata {
						color
						service
						description
						logo
						thumbnail
						author {
							id
							name
						}
					}
				}
				contributionsPresences: presences(contributor: "${this.$route.params.userId}") {
					metadata {
						color
						service
						description
						logo
						thumbnail
						author {
							id
							name
						}
						contributors {
							id
							name
						}
					}
				}
			}`
			);

			let user = res.credits[0]?.user || {},
				userPresences = res.authorPresences.map(p => p.metadata),
				userContributions = res.contributionsPresences.map(p => p.metadata);

			user.roles = res.credits[0]?.roles?.map(role => role.name).sort();

			if (user.name?.includes("Deleted User")) user.name = null;

			user.name =
				user.name ||
				userPresences[0]?.author?.name ||
				userContributions[0]?.contributors.find(user => {
					if (user.id === this.$route.params.userId) return user;
				})?.name ||
				"Unknown user";

			if (!user.roles || user.roles.length == 0) {
				if (userPresences.length > 0) user.roles = ["Presence Developer"];
			}

			let error = false;

			if (!user.avatar || user.avatar.endsWith("null"))
				user.avatar = "https://cdn.discordapp.com/embed/avatars/0.png";

			if (user.name === "Unknown user") error = true;

			this.error = error;
			this.user = user;
			this.showContributions = false;
			this.userPresences = userPresences;
			this.userContributions = userContributions;
			/* if (process.browser) {
				window.$nuxt.$loading.finish();
			} */
		},
		methods: {
			linkify(pls) {
				if (!pls.match(/(\[.*?\])/g)) return pls;
				else
					return pls.match(/(\[.*?\])/g).map(ch => {
						return pls.replace(
							ch,
							`<a href="http://discord.premid.app/">${ch.slice(
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
					!this.error && this.user?.name ? this.user.name : "Unknown User"
				}`,
				meta: [
					{
						hid: "description",
						name: "description",
						content: `${
							!this.error && this.user?.name ? this.user.name : "Unknown user"
						}'s profile.`
					},
					{
						hid: "og:description",
						property: "og:description",
						content: `${
							!this.error && this.user?.name ? this.user.name : "Unknown user"
						}'s profile.`
					},
					{
						hid: "og:title",
						property: "og:title",
						content:
							!this.error && this.user?.name ? this.user.name : "Unknown User"
					},
					{
						hid: "og:image",
						property: "og:image",
						content:
							!this.error && this.user?.avatar
								? this.user.avatar
								: "https://premid.app/assets/images/logo.png"
					},
					{
						hid: "twitter:image",
						property: "twitter:image",
						content:
							!this.error && this.user?.avatar
								? this.user.avatar
								: "https://premid.app/assets/images/logo.png"
					}
				]
			};
		}
	};
</script>
