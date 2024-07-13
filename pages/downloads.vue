<script lang="ts" setup>
import Bowser from "bowser";
import type DonationModal from "~/components/DonationModal.vue";

const { t, tm } = useI18n();
const { userAgent, isMobile } = useDevice();

useSeoMeta({
	title: t("page.downloads.title"),
});

const steps = [t("page.downloads.steps.install"), t("page.downloads.steps.login"), t("page.downloads.steps.add"), t("page.downloads.steps.showoff")];
const browsers = computed(() => [t("page.downloads.browser.based", { browser: "Chromium" }), "Firefox", "Edge", "Safari"]);

const userBrowser = ref<string>();

const otherBrowsers = computed(() => browsers.value.filter(browser => browser !== userBrowser.value));

onMounted(() => {
	const browser = Bowser.getParser(userAgent).getBrowserName();
	switch (browser) {
		case "Safari":
			userBrowser.value = browsers.value[3];
			break;
		case "Edge":
			userBrowser.value = browsers.value[2];
			break;
		case "Firefox":
			userBrowser.value = browsers.value[1];
			break;
		default:
			userBrowser.value = browsers.value[0];
			break;
	}
});

const faqs = computed(() => Object.keys(tm("page.downloads.faqs")));

const donationModal = ref<InstanceType<typeof DonationModal>>();

const continueToStoreOf = ref<string>();
function openModal(browser: string) {
	continueToStoreOf.value = browser;
	if (donationModal.value)
		donationModal.value.visible = true;
}

function goToStore() {
	switch (continueToStoreOf.value) {
		case browsers.value[0]:
			window.open("https://chromewebstore.google.com/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi");
			break;
		case browsers.value[1]:
			window.open("https://dl.premid.app/PreMiD.xpi");
			break;
		case browsers.value[2]:
			window.open("https://microsoftedge.microsoft.com/addons/detail/premid/hkchpjlnddoppadcbefbpgmgaeidkkkm");
			break;
		case browsers.value[3]:
			// TODO: Safari
			break;
	}
}
</script>

<template>
	<div>
		<DonationModal ref="donationModal" @continue="goToStore" />
		<section class="flex justify-center items-center relative gap-10 h100 lt-md:flex-col mb-10">
			<div class="max-w-60%">
				<h1 class="c-primary font-size-10 font-extrabold mb-6">
					{{ $t("page.downloads.section.heading.title") }}
				</h1>
				<p class="font-semibold font-size-5 lt-sm:font-size-4.5">
					{{ $t("page.downloads.section.heading.description") }}
				</p>
			</div>
			<div>
				<h2 class="font-extrabold mb-6 c-white font-size-6">
					{{ $t("page.downloads.section.heading.getStarted") }}
				</h2>
				<ol class="grid gap-3 list-inside counter-step">
					<li v-for="step in steps" :key="step" class="before:inline-block before:text-center before:p1 before:w6 before:h6 before:bg-gradient-to-r before:from-primary before:to-primary-highlight before:rounded-full before:font-bold before:mr2">
						{{ step }}
					</li>
				</ol>
			</div>
		</section>
		<section class="flex flex-col gap-5 items-center w-full">
			<h1 id="extension" class="c-primary font-size-10 font-extrabold mb-6">
				{{ $t("page.downloads.section.heading.extension") }}
			</h1>
			<!-- User on mobile, not supported error -->
			<div v-if="isMobile" class="bg-red-500 text-white p-5 rounded-lg flex flex-col items-center justify-center gap-2 mb-5">
				<h2 class="font-bold font-size-5">
					{{ $t("page.downloads.mobile.title") }}
				</h2>
				<p class="font-bold">
					{{ $t("page.downloads.mobile.description") }}
				</p>
			</div>
			<template v-if="userBrowser">
				<h2 class="font-bold font-size-5">
					{{ $t("page.downloads.browser.your") }}
				</h2>
				<BrowserCard :browser="userBrowser" :highlight="true" @click="openModal(userBrowser)" />
			</template>
			<h2 class="font-bold font-size-5">
				{{ $t("page.downloads.browser.other") }}
			</h2>
			<div class="flex flex-wrap gap-5 justify-center">
				<BrowserCard v-for="browser in otherBrowsers" :key="browser" :browser="browser" @click="openModal(browser)" />
			</div>
		</section>
		<section id="faq" class="flex flex-col gap-5 items-center w-full my-10">
			<h1 class="c-primary font-size-10 font-extrabold mb-6">
				{{ $t("page.downloads.faq") }}
			</h1>
			<div class="flex flex-wrap gap-7 max-w-80%">
				<FAQCard v-for="faq in faqs" :key="faq" :question="t(`page.downloads.faqs.${faq}.question`)" :answer="t(`page.downloads.faqs.${faq}.answer`)" />
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
.counter-step {
	counter-reset: step;

	li::before {
		content: counter(step);
		counter-increment: step;
	}
}
</style>
