<template>
	<div>
		<p v-for="question in jobQuestions" :key="question.question" style="margin-bottom: 1em;">
			<label>{{ question.label }}</label>
			<input v-model="question.response" />
		</p>
	</div>
</template>

<script>
export default {
	name: "Questions",
	props: {
		jobQuestions: Array
	},
	data() {
		return {
			questionLabel: ""
		};
	},
	beforeMount() {
		this.jobQuestions.map(question => {
			if (!question.required)
				question.label = question.question + " (Optional)";
			else question.label = question.question;

			console.log(question);
		});
	}
};
</script>