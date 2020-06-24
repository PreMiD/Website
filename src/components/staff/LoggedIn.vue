<template>
	<div class="loggedIn-container">
		<a href="/logout" class="notyou">Not you?</a>
		<img :src="user.avatar" />
		<div class="user">
			<h1 class="text-highlight">Logged in as</h1>
			<h1 class="username">
				{{user.name}}
				<span class="discriminator">#{{user.tag}}</span>
			</h1>
			<p :style="{ color: user.roleColor }">{{user.role}}</p>
		</div>
	</div>
</template>

<style lang="scss">
.loggedIn-container {
	position: relative;
	display: flex;
	justify-content: center;
	width: 375px;
	height: 100px;
	background: #23272a;
	border-radius: 5px;
	margin-left: 4em;
	margin-bottom: 0.5em;
	padding: 0.75em;

	h1 {
		font-size: 1.25em;
		text-transform: uppercase;
		margin: 0;
	}

	img {
		display: block;
		width: 90px;
		border-radius: 50%;
		float: left;
		margin: auto;
		margin-left: 0;
		margin-right: 1em;
	}

	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.username {
			color: white;
			font-size: 1.25em;
			text-transform: uppercase;
			margin: 0;

			.discriminator {
				color: #c3c3c3;
				font-size: 0.75em;
			}
		}

		p {
			margin: 0;
		}
	}

	.notyou {
		position: absolute;
		top: 0;
		right: 0;
		color: #7289da;
		font-size: 0.75em;
		padding: 0.5em;
	}
}
</style>

<script>

	export default {
		name: "LoggedIn",
		props: {
			user: Object
    }
	};
</script>
