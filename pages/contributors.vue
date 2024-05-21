<script lang="ts" setup>
const { error, staff, supporters, presenceDevelopers, translators }
	= useContributors();
</script>

<template>
	<div class="flex justify-center mx-5 mt-20">
		<div class="max-w-400">
			<div v-if="!error">
				<ContributorSection
					string="page.contributors.staff"
					:contributors="staff"
				/>
				<ContributorSection
					string="page.contributors.supporters"
					:contributors="supporters"
				/>
				<ContributorSection
					string="page.contributors.presenceDevelopers"
					:contributors="presenceDevelopers"
				/>
				<ContributorSection
					string="page.contributors.translators"
					:contributors="translators"
				/>
			</div>
			<div v-else>
				<h1 class="color-primary font-discord font-size-8 mb-2">
					Error
				</h1>
				<p>{{ error }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
