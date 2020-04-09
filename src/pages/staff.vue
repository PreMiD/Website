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
				:page="page"
			/>
			<Tickets v-if="page === 'Tickets'" :page="page" />
			<PullRequests v-if="page === 'Pull Requests'" />
			<StaffActivity v-if="page === 'Staff Activity'" />
			<StaffHandbook v-if="page === 'Staff Handbook'" />
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	import Applications from "../components/staff/Applications";
	import Application from "../components/staff/Application";
	import Bar from "../components/staff/Bar";
	import LoggedIn from "../components/staff/LoggedIn";
	import PullRequests from "../components/staff/PullRequests";
	import Sidebar from "../components/staff/Sidebar";
	import StaffActivity from "../components/staff/StaffActivity";
	import StaffHandbook from "../components/staff/StaffHandbook";
	import Tickets from "../components/staff/Tickets";

	export default {
		name: "Staff",
		auth: true,
		components: {
			Applications,
			Application,
			Bar,
			LoggedIn,
			PullRequests,
			Sidebar,
			StaffActivity,
			StaffHandbook,
			Tickets
		},
		data() {
			return {
				user: {},
				page: "Staff",
				application: null,
				sortBy: false
			};
		},
		beforeMount() {
			axios(`${process.env.apiBase}/credits/${this.$auth.user.id}`).then(
				response => {
					this.user = response.data;
					//! Temporary
					this.user.roles = this.user.roles.filter(el => el !== "Staff Member");

					if (!this.user.roles.includes("Staff Member")) this.$router.push("/");
				}
			);
		},
		mounted() {},
		methods: {
			updatePage(event) {
				console.log("updatePage");
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
