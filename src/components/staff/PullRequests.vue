<template>
	<div class="staff-container">
		<div class="select">
			<select v-model="repo" @change="updatePullRequests" placeholder="Link">
				<option disabled value>Select a repository</option>
				<option
					v-for="repository in repositories"
					:key="repository.name"
					:value="repository.name"
					>{{ repository.name }}</option
				>
			</select>
		</div>
		{{ repo.full_name }}
		<div v-if="pReady">
			<div
				class="pullRequest"
				v-for="pullRequest in pullRequests"
				:key="pullRequest.id"
			>
				<div class="user">
					<img :src="pullRequest.user.avatar_url" />
					<h1 class="username">
						{{ pullRequest.user.login }}
						<p>PR #{{ pullRequest.number }}</p>
					</h1>
				</div>
				Title: {{ pullRequest.title }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import axios from "axios";
	import Vue from "vue";

	export default Vue.extend({
		name: "PullRequests",
		data() {
			return {
				ready: false,
				repositories: [],
				repo: "",
				pullRequests: [],
				pReady: false
			};
		},
		beforeMount() {
			axios("https://api.github.com/orgs/PreMiD/repos").then(response => {
				this.repositories = response.data;
				this.ready = true;
			});
		},
		mounted() {},
		methods: {
			updatePullRequests() {
				console.log("Updating...");
				this.pReady = false;
				axios(`https://api.github.com/repos/PreMiD/${this.repo}/pulls`).then(
					response => {
						this.pullRequests = response.data;
						this.pReady = true;
					}
				);
			}
		}
	});
</script>

<style lang="scss">
	.select {
		display: flex;
		justify-content: center;
	}

	select {
		font-family: "Inter";
		background-color: #151518;
		color: white;
		display: block;
		border-radius: 4px;
		width: 200px;
		height: 35px;
		margin-bottom: 1em;
		padding: 0.5em;
		border: 1px solid #7289da;
		transition: all 0.6s ease;
	}

	select option {
		color: white;
	}

	.pullRequest {
		display: flex;
		background: #1c1c1e;
		width: 1225px;
		height: 75px;
		border-radius: 5px;
		padding: 0.75em;
		margin-bottom: 0.75em;
		position: relative;

		.user {
			display: flex;

			.username {
				color: white;
				font-size: 1.25em;
				text-transform: uppercase;
				margin: 0;
				margin-top: auto;
				margin-bottom: auto;

				.discriminator {
					color: #c3c3c3;
					font-size: 0.75em;
				}

				p {
					margin: 0;
					font-size: 0.75em;
				}
			}

			img {
				display: block;
				width: 75px;
				border-radius: 50%;
				float: left;
				margin: auto;
				margin-left: 0;
				margin-right: 1em;
			}
		}
	}
</style>
