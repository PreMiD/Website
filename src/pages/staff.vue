<template>
	<div class="staff-panel">
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
</template>

<script>
	import axios from "axios";

	export default {
		name: "Staff",
		auth: true,
		data() {
			return {
				user: {},
				page: "Staff",
				application: null,
				sortBy: false
			};
		},
		beforeMount() {
			if (this.$auth.loggedIn) {
				axios(`${process.env.apiBase}/credits/${this.$auth.user.id}`).then(
					response => {
						this.user = response.data;
						//! Temporary
						if (!this.user.roleIds.includes("656913616100130816"))
							this.$router.push("/");
					}
				);
			} else this.$router.push("/login");
		},
		mounted() {
			this.page = "Applications";
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
