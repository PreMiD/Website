<template>
	<div>
		<div class="tasks">
			<h1>Your tasks</h1>
			<p v-for="task in job.tasks" :key="task" v-text="task"></p>
		</div>
		<div class="tasks">
			<h1>What you should bring</h1>
			<p
				v-for="requirement in job.requirements"
				:key="requirement"
				v-text="requirement"
			></p>
		</div>
		<div class="tasks">
			<h1>Bonus points</h1>
			<p
				v-for="bonusPoint in job.bonusPoints"
				:key="bonusPoint"
				v-text="bonusPoint"
			></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "First",
		props: {
			job: Object
		}
	};
</script>
