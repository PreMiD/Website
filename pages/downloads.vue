<script lang="ts" setup>
import Bowser from "bowser";
import type DonationModal from "~/components/DonationModal.vue";

const { t } = useI18n();

useSeoMeta({
	title: t("page.downloads.title"),
});

const steps = [t("page.downloads.steps.install"), t("page.downloads.steps.login"), t("page.downloads.steps.add"), t("page.downloads.steps.showoff")];
const browsers = ["Chromium based", "Firefox", "Edge", "Safari"];

const userBrowser = ref<string>();

const otherBrowsers = computed(() => browsers.filter(browser => browser !== userBrowser.value));

onMounted(() => {
	const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
	switch (browser) {
		case "Safari":
			userBrowser.value = browsers[3];
			break;
		case "Edge":
			userBrowser.value = browsers[2];
			break;
		case "Firefox":
			userBrowser.value = browsers[1];
			break;
		default:
			userBrowser.value = browsers[0];
			break;
	}
});

const faqs = [
	{
		question: "What is PreMiD?",
		answer: "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
	},
	{
		question: "How do I use PreMiD?",
		answer: "You can use PreMiD by installing the extension and logging in with your Discord account. Once you're logged in, you can add presences to your profile and show off to your friends.",
	},
	{
		question: "Is PreMiD against Discord's ToS?",
		answer: "No, PreMiD is not against Discord's ToS. PreMiD uses Discord's API (including gated API endpoints provided by Discord) to set your activity. This means that PreMiD is in full compliance with Discord's ToS.",
	},
	{
		question: "What platforms does PreMiD support?",
		answer: "PreMiD supports many different platforms including YouTube, Twitch, and Netflix. The list of supported platforms is constantly growing. You can view the complete list of Presences on our store page.",
	},
	{
		question: "How can I contribute to PreMiD?",
		answer: "You can contribute to PreMiD by joining our community on GitHub. You can help by reporting issues, suggesting features, or contributing code.",
	},
	{
		question: "Is PreMiD free to use?",
		answer: "Yes, PreMiD is free to use. However, we do accept donations through Patreon and GitHub Sponsors to help support the development of the project.",
	},
	{
		question: "What should I do if I encounter an issue with PreMiD?",
		answer: "If you encounter any issues with PreMiD, you can join our Discord server for support. We also have a troubleshooting guide on our documentation.",
	},
	{
		question: "PreMiD doesn't support xyz, can you add it?",
		answer: "Our so called Presences are community-driven, we don't have the resources to add every single platform. However, you can add your own Presence by following the instructions on our documentation.",
	},
	{
		question: "How often is PreMiD updated?",
		answer: "We are a small volunteer-driven project, we aim to update PreMiD as often as possible but we can't promise that we will always be on top of things.",
	},
];

const donationModal = ref<InstanceType<typeof DonationModal>>();

const continueToStoreOf = ref<string>();
function openModal(browser: string) {
	continueToStoreOf.value = browser;
	if (donationModal.value)
		donationModal.value.visible = true;
}

function goToStore() {
	switch (continueToStoreOf.value) {
		case browsers[0]:
			window.open("https://chromewebpage.store.google.com/detail/premid/agjnjboanicjcpenljmaaigopkgdnihi");
			break;
		case browsers[1]:
			window.open("https://dl.premid.app/PreMiD.xpi");
			break;
		case browsers[2]:
			window.open("https://microsoftedge.microsoft.com/addons/detail/premid/hkchpjlnddoppadcbefbpgmgaeidkkkm");
			break;
		case browsers[3]:
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
					Time to show off.
				</h1>
				<p class="font-semibold font-size-5 lt-sm:font-size-4.5">
					Use PreMiD now and show off to your friends what you're doing, maybe you find someone with the same interests.
				</p>
			</div>
			<div>
				<h2 class="font-extrabold mb-6 c-white font-size-6">
					Get Started
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
				Extension
			</h1>
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
				<FAQCard v-for="faq in faqs" :key="faq.question" :question="faq.question" :answer="faq.answer" />
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
