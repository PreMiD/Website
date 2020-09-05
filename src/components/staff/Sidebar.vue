<template>
	<div class="sidebar">
		<h1 class="text-highlight">Applications</h1>
		<ul>
			<li>
				<a
					@click="
						$parent.lastPage = $parent.page;
						$parent.page = 'Applications';
					"
					>Jobs</a
				>
			</li>
			<li>
				<a>Partners</a>
			</li>
		</ul>
		<h1 class="text-highlight">Documentation</h1>
		<ul>
			<li>
				<a>Staff NDA</a>
			</li>
			<li>
				<a
					@click="
						$parent.lastPage = $parent.page;
						$parent.page = 'Staff Handbook';
					"
					>Staff Handbook</a
				>
			</li>
			<li>
				<a>Support Agent Guidelines & Tutorial</a>
			</li>
			<li>
				<a>Presence Verifier Guidelines</a>
			</li>
			<li>
				<a>Moderator Guidelines</a>
			</li>
		</ul>
		<h1 class="text-highlight">Staff</h1>
		<ul>
			<li>
				<a
					@click="
						$parent.lastPage = $parent.page;
						$parent.page = 'Tickets';
					"
					>Tickets</a
				>
			</li>
			<li>
				<a
					@click="
						$parent.lastPage = $parent.page;
						$parent.page = 'Pull Requests';
					"
					>Open Pull Requests</a
				>
			</li>
			<li>
				<a
					@click="
						$parent.lastPage = $parent.page;
						$parent.page = 'Staff Activity';
					"
					>Staff Activity</a
				>
			</li>
			<li>
				<a>Server Management</a>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
	.sidebar {
		width: 375px;
		height: 600px;
		background: #23272a;
		border-radius: 5px;
		margin-left: 4em;
		padding: 0.75em;

		h1 {
			margin: 0;
			margin-top: 0.25em;
		}

		ul {
			margin-bottom: 2em;
			padding: 0;

			li {
				list-style-type: none;
				margin-bottom: 0.5em;

				a {
					color: #888888;
					transition: 0.2s;
				}

				a:hover {
					color: #c3c3c3;
				}
			}
		}
	}
</style>

<script>
	import anime from "animejs";
	export default {
		name: "Sidebar",
		props: {
			user: Object
		},
		mounted() {
			anime({
				targets: ".sidebar h1",
				translateX: 20,
				delay: anime.stagger(40)
			});
			anime({
				targets: "li",
				translateX: 50,
				delay: anime.stagger(40)
			});
		}
	};
</script>
