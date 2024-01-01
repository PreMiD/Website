<script lang="ts" setup>
	const i18n = useI18n(),
		locales = i18n.availableLocales;
</script>

<template>
	<div>
		Page: foo
		{{ $t("store.header.search") }}
		{{ locales }}
		{{ $t("downloads.instructions.footer") }}
		<button @click="i18n.setLocale('en')">en</button>
		<button @click="i18n.setLocale('de')">de</button>
	</div>
</template>

<style scoped></style>
