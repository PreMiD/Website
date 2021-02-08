<template>
	<div class="staff-panel" v-if="show">
		<div class="flex">
			<LoggedIn :user="user" />
			<Bar :page="page" />
		</div>
		<div class="flex">
			<Sidebar />
			<Applications v-if="page === 'Applications'" :page="page" />
			<Application
				v-on:updatePage="updatePage"
				v-if="page === 'Application'"
				:application="userApplication"
				:sheads="sheads"
				:page="page"
			/>
			<Tickets v-if="page === 'Tickets'" :page="page" />
			<Ticket
				v-on:updatePage="updatePage"
				v-if="page === 'Ticket'"
				:ticket="ticket"
				:page="page"
			/>
			<PullRequests v-if="page === 'Pull Requests'" />
			<StaffActivity v-if="page === 'Staff Activity'" />
			<StaffHandbook v-if="page === 'Staff Handbook'" />
		</div>
	</div>
	<div class="staff-panel" v-else>
		<h2 class="text-highlight" style="text-align: center">
			Getting data from the API...
		</h2>
	</div>
</template>

<script>
	export default {
		name: "Staff",
		auth: true,
		async asyncData(context) {
			if (context.$auth.loggedIn) {
				let { credits } = await context.app.$graphql(
						`
					{
						credits(id: "${context.$auth.user.id}") {
							user {
								id
								name
								tag
								avatar
								role
								roleColor
							}
							roles {
								id
							}
						}
					}
				`
					),
					user = credits[0];

				if (user.roles.find(r => r.id === "656913616100130816").length === 0)
					context.redirect("/");

				return {
					user: user.user,
					show: true
				};
			} else context.redirect("/login");
		},
		data() {
			return {
				user: {},
				page: "Staff",
				application: null,
				sortBy: false,
				show: false
			};
		},
		beforeMount() {},
		mounted() {
			console.log(this.show);

			this.page = "Staff Handbook";
		},
		methods: {
			updatePage(event) {
				const { value } = event.page;
				this.page = value;
			}
		},
		head() {
			return {
				title: "Staff Panel"
			};
		}
	};
</script>

<style lang="scss">
	.staff-panel {
		margin-top: 3em;

		.flex {
			display: flex;
		}
	}
</style>
