<template>
	<div class="staff-container">
		<div
			class="staffMember"
			v-for="sU in staffMembers"
			:key="sU.user.id"
			:style="{ 'box-shadow': `${sU.user.roleColor} 0px 0px 7px;` }"
		>
			<div
				class="bg"
				:style="{
					'background-image': `url(${sU.user.avatar.replace('gif', 'png')})`
				}"
			></div>
			<div class="userInfo">
				<img :src="sU.user.avatar" />
				<h1>
					{{ sU.user.name }}
					<p :style="{ color: sU.user.roleColor }">{{ sU.user.role }}</p>
				</h1>
			</div>
			<div class="chart-container" v-if="loaded">
				<LineChart
					v-if="sU.ready"
					:chartdata="sU.chartdata"
					:options="sU.options"
					class="userChart"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { Line } from "vue-chartjs";

	export default {
		name: "StaffActivity",
		extends: Line,
		data() {
			return {
				staffMembers: [],
				loaded: false,
				tickets: [],
				allDates: [],
				counts: {},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						yAxes: [
							{
								ticks: {
									fontColor: "#eaeaea",
									stepSize: 2,
									min: 0
								}
							}
						],
						xAxes: [
							{
								ticks: {
									fontColor: "#c3c3c3"
								}
							}
						]
					},
					legend: {
						display: true,
						labels: {
							fontColor: "#ffffff"
						}
					}
				}
			};
		},
		beforeMount() {
			this.$graphql(
				`{
						tickets(token: "${this.$auth.$storage._state["_token.discord"]}") {
							ticketId
							userId
							timestamp
							created
							accepter
							status
							supporters
							lastUserMessage
							messages {
								userId
								content
								sent
							}
						}
						credits {
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
			).then(async data => {
				let credits = data.credits,
					tickets = data.tickets;

				credits.map(user => {
					if (
						user.roles.find(r => r.id === "566417964820070421") !== undefined
					) {
						this.staffMembers.push(user);
					}
				});

				this.tickets = tickets.filter(
					ticket =>
						ticket.timestamp >
						new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).valueOf()
				);

				this.staffMembers.map(sU => {
					let userTickets = {
							acceptedTickets: this.tickets.filter(
								ticket => ticket.accepter === sU.user.id
							),
							joinedTickets: this.tickets.filter(
								ticket =>
									ticket.accepter !== sU.user.id &&
									ticket.supporters &&
									ticket.supporters.find(s => s === sU.user.id)
							),
							a: { allDates: [], counts: {} },
							j: { allDates: [], counts: {} }
						},
						accepted = [],
						joined = [];

					userTickets.acceptedTickets.forEach(t =>
						userTickets.a.allDates.push(this.formatDate(new Date(t.timestamp)))
					);

					userTickets.joinedTickets.forEach(t =>
						userTickets.j.allDates.push(this.formatDate(new Date(t.timestamp)))
					);

					userTickets.a.allDates.forEach(
						d => (userTickets.a.counts[d] = (userTickets.a.counts[d] || 0) + 1)
					);
					userTickets.j.allDates.forEach(
						d => (userTickets.j.counts[d] = (userTickets.j.counts[d] || 0) + 1)
					);

					this.last14Days().forEach(d => {
						if (userTickets.a.counts[d]) accepted.push(userTickets.a.counts[d]);
						else accepted.push(0);

						if (userTickets.j.counts[d]) joined.push(userTickets.j.counts[d]);
						else joined.push(0);
					});

					sU.chartdata = {
						labels: this.last14Days(),
						datasets: [
							{
								label: "Accepted tickets",
								borderColor: "#7289da",
								pointBackgroundColor: "#7289da",
								pointRadius: 3,
								data: accepted
							},
							{
								label: "Joined tickets",
								borderColor: "rgba(126, 81, 194, 1)",
								borderDash: [5, 5],
								pointBackgroundColor: "#7E51C2",
								pointRadius: 3,
								data: joined
							}
						]
					};

					sU.options = this.options;

					let total = {
						accepted: 0,
						joined: 0
					};

					accepted.forEach(a => (total.accepted += a));
					joined.forEach(j => (total.joined += j));

					sU.options.scales.yAxes[0].ticks.max = Math.max.apply(
						this,
						total.accepted > total.joined ? accepted : joined
					);

					sU.ready = true;
				});

				this.loaded = true;
			});
		},
		mounted() {
			this.$parent.sortBy = false;
		},
		methods: {
			formatDate(date) {
				var dd = date.getDate();
				var mm = date.getMonth() + 1;
				var yyyy = date.getFullYear();
				if (dd < 10) {
					dd = "0" + dd;
				}
				if (mm < 10) {
					mm = "0" + mm;
				}
				date = dd + "/" + mm + "/" + yyyy;
				return date;
			},
			last14Days() {
				var result = [];
				for (var i = 0; i < 14; i++) {
					var d = new Date();
					d.setDate(d.getDate() - i);
					result.push(this.formatDate(d));
				}

				result.reverse();

				return result;
			}
		}
	};
</script>

<style lang="scss">
	.staff-container {
		display: flex;
		flex-wrap: wrap;

		.staffMember {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 620px;
			height: 400px;
			background: #121212;
			margin-left: 0.5em;
			margin-bottom: 0.5em;
			text-align: center;
			overflow: hidden;
			border-radius: 3px;

			.bg {
				background-position: center;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-size: contain;
				background-repeat: no-repeat;
				filter: blur(130px);
			}

			.userInfo {
				display: flex;
				justify-content: center;
				padding: 1em;
				z-index: 99;

				h1 {
					text-align: left;
					font-size: 1.25em;
					color: white;
					text-transform: uppercase;

					p {
						text-transform: none;
						font-size: 0.75em;
						margin: 0;
					}
				}

				img {
					border-radius: 50%;
					width: 69px;
					height: 69px;
					margin-right: 0.5em;
				}
			}

			.chart-container {
				display: flex;
				height: 300px;
				width: 100%;
				z-index: 99;

				.userChart {
					height: 300px;
					width: 100%;
				}
			}
		}
	}
</style>
