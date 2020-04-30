<template>
	<div class="container error-container">
		<div v-if="error.statusCode === 404">
			<h1>{{ $t("error.code.404") }}</h1>
		</div>
		<div v-else-if="error.statusCode === 4">
			<h1>{{ $t("error.code.4") }}</h1>
		</div>
		<div v-else>
			<h1>{{ $t("error.code.500") }}</h1>
		</div>
		<div v-if="$props.error.message" class="error-textarea">
			<p>
				<b>{{ $t("error.page.details") }}:</b>
			</p>
			<p>{{ $props.error.message }}</p>
		</div>
		<div class="error-container--btns">
			<router-link
				to="/"
				class="button button--sm"
				v-text="$t('error.page.button')"
			></router-link
			><span class="button button--sm" @click="reload" v-text="'Reload'"></span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["error"],
		head: {
			title: "Error"
		},
		mounted() {
			console.log(this.$props.error);
		},
		methods: {
			reload() {
				location.reload();
			}
		}
	};
</script>
