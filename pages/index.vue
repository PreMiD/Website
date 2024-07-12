<script lang="ts" setup>
import type { DiscordUserCardActivity } from "@discord-user-card/core";
import { DiscordUserCard } from "@discord-user-card/vue";
import "@discord-user-card/vue/style.css";

useSeoMeta({ title: "Home" });

const words = ["music", "videos", "streams", "media"];
const currentWord = ref(words[0]);
let currentWordIndex = 0;

let wordInterval: number;
onMounted(() => {
	wordInterval = window.setInterval(() => {
		currentWordIndex = (currentWordIndex) % words.length;
		currentWord.value = words[currentWordIndex];
	}, 2000);
});

onUnmounted(() => {
	clearInterval(wordInterval);
});

const scroller = ref<HTMLDivElement>();

const activities = ref<DiscordUserCardActivity[]>([
	{
		name: "YouTube",
		type: 3,
		details: "Let's play Minecraft together!",
		state: "PreMiD",
	},
	{
		name: "Netflix",
		type: 3,
		details: "Let's watch a movie together!",
		state: "PreMiD",
	},
	{
		name: "YouTube Music",
		type: 3,
		details: "Do What I Say (feat. Vito Z Holmes)",
		state: "Single - Black Gryphon",
		largeImage: "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/logo.png",
	},
	{
		name: "Twitch",
		type: 3,
		details: "Let's play Minecraft together!",
		state: "PreMiD",
	},
	{
		name: "YouTube",
		type: 3,
		details: "Let's play Minecraft together!",
		state: "PreMiD",
	},
]);

function getActivity(index: number) {
	const activity = activities.value[index];
	return activity;
}

const features = ref([
	{
		icon: "fas fa-lock",
		title: "Privacy Control",
		description: "Take charge of your privacy settings and decide what activities you share with others. Your data, your rules.",
	},
	{
		icon: "fas fa-users",
		title: "Community Driven",
		description: "Experience unparalleled support for a multitude of platforms, powered by a passionate and dedicated community.",
	},
	{
		icon: "fas fa-cogs",
		title: "Customizable Settings",
		description: "Tailor your PreMiD experience with extensive customization options to suit your preferences and needs.",
	},
	{
		icon: "fas fa-check-circle",
		title: "Easy Setup",
		description: "Get up and running with PreMiD in no time. Our straightforward setup process ensures a hassle-free start.",
	},
	{
		icon: "fas fa-handshake",
		title: "Discord ToS Compliant",
		description: "Fully compliant with Discord's Terms of Service by utilizing official endpoints provided by Discord.",
	},
	{
		icon: "fas fa-lightbulb",
		title: "Future Features",
		description: "Stay tuned for exciting new features and improvements that will enhance your PreMiD experience even further.",
	},
]);

const steps = ref([
	{
		icon: "download",
		title: "Install the Extension",
		description: "Get the PreMiD extension from the official website or your browser's web page.store.",
	},
	{
		icon: "sign-in-alt",
		title: "Login with Discord",
		description: "Connect PreMiD with your Discord account.",
	},
	{
		icon: "plus",
		title: "Add Services",
		description: "Choose the services you want to display, like YouTube, Spotify, and more.",
	},
	{
		icon: "smile",
		title: "Enjoy",
		description: "Share your activity and enjoy using PreMiD.",
	},
]);

onMounted(() => {
	setInterval(() => {
		currentWordIndex = (currentWordIndex + 1) % words.length;
		currentWord.value = words[currentWordIndex];
	}, 2000); // Change word every 2 seconds
});
</script>

<template>
	<div>
		<!-- Hero Section -->
		<section class="flex flex-col items-center justify-center text-white min-h-screen">
			<div class="text-center flex flex-col items-center mx-5">
				<img src="/assets/images/icon.png" alt="PreMiD Logo" class="mb-2 w-32">
				<h1 class="font-extrabold mb-4 text-4xl">
					Enhance Your Online Presence with PreMiD
				</h1>
				<p class="text-2xl flex mb-8">
					Show your friends what
					<span class="relative flex text-center justify-center mx-2 w-25">
						<transition-group name="slide" tag="span">
							<span v-for="word in [currentWord]" :key="word" class="absolute left-0 w-25 font-bold text-gradient">{{ word }}</span>
						</transition-group>
					</span>
					you're enjoying.
				</p>
				<p class="text-lg mb-8 max-w-2xl">
					PreMiD is a simple, powerful tool that allows you to share your current media activity across multiple platforms like YouTube, Spotify, Netflix, and more. Stay connected and let your friends see what you're up to in real-time.
				</p>
				<NuxtLink to="/downloads" class="transition-colors text-white font-bold font-size-4 px-6 rounded-full shadow-lg mb-8 bg-gradient-to-r from-primary to-purple-600 border-transparent py-4 transition-transform hover:scale-105">
					Get Started
				</NuxtLink>
			</div>
			<div ref="scroller" class="w-full overflow-hidden relative max-w-screen scroller mt25">
				<ul class="flex scroller-items flex-nowrap gap-4 animate-duration-20000 animate-iteration-infinite animate-ease-linear w-max">
					<ClientOnly>
						<DiscordUserCard v-for="i in 5" :key="i" :activities="[getActivity(i)]" />
						<!-- Duplicate to prevent weird jumping -->
						<DiscordUserCard v-for="i in 5" :key="i" :activities="[getActivity(i)]" />
					</ClientOnly>
				</ul>
				<div class="absolute top-0 left-0 bg-gradient-to-r h-full w-16 fade-left from-#111218 to-transparent" />
				<div class="absolute top-0 right-0 h-full w-16 from-#111218 to-transparent fade-right bg-gradient-to-l" />
			</div>
		</section>

		<!-- Unique Feature Section -->
		<section class="text-white mx5 pb-12 mt-10">
			<div class="text-center container mx-auto">
				<h2 class="text-4xl font-extrabold mb-12">
					Why You'll Love PreMiD
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
					<div
						v-for="feature in features"
						:key="feature.title"
						class="p-6 rounded-lg shadow-lg transition hover:scale-105 feature-card bg-background-secondary transform duration-500 hover:translate-y--2"
					>
						<div class="mb-4 icon">
							<FAIcon :icon="feature.icon" class="text-gradient fa-3x" />
						</div>
						<h3 class="text-2xl font-bold mb-2">
							{{ feature.title }}
						</h3>
						<p class="text-gray-400">
							{{ feature.description }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- How It Works Section -->
		<section class="mx5 py-12 bg-gray-100">
			<div class="container mx-auto text-center">
				<h2 class="text-4xl font-extrabold mb-12 text-gray-900">
					How It Works
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div
						v-for="(step, index) in steps"
						:key="step.title"
						class="p-6 bg-background-secondary rounded-lg relative transform transition duration-500 hover:translate-y--2 hover:scale-105 shadow-md"
					>
						<div class="bg-primary text-white rounded-full w-10 flex items-center justify-center mx-auto mb-4 absolute h-10 top--3 left--3">
							{{ index + 1 }}
						</div>
						<div class="icon mb-4">
							<FAIcon :icon="step.icon" class="fa-3x text-primary" />
						</div>
						<h3 class="font-bold mb-2 text-xl">
							{{ step.title }}
						</h3>
						<p>{{ step.description }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Call to Action Section -->
		<section class="py-12 bg-gradient-to-r from-primary to-purple-600 text-white mx5 rounded">
			<div class="container mx-auto text-center">
				<h2 class="text-4xl font-extrabold mb-6">
					Ready to Get Started?
				</h2>
				<p class="text-lg mb-6">
					Join the <span class="font-bold">572.312</span> users who are already love PreMiD.
				</p>
				<NuxtLink to="/downloads" class="b-none font-size-4 font-bold px-6 rounded-full shadow-lg transition-colors cursor-pointer bg-white text-black py-3 hover:bg-light-900">
					Start Now
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
/* Add styles for the sliding word effect */
.slide-enter-active,
.slide-leave-active {
	transition:
		transform 0.5s,
		opacity 0.5s;
}
.slide-enter-from {
	transform: translateY(-100%);
	opacity: 0;
}
.slide-enter-to {
	transform: translateY(0);
	opacity: 1;
}
.slide-leave-from {
	transform: translateY(0);
	opacity: 1;
}
.slide-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

.text-gradient {
	background: linear-gradient(90deg, #7289da, #b3aeff);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

@keyframes scroll {
	to {
		transform: translate(calc(-50% - 0.5rem));
	}
}

.scroller-items {
	animation-name: scroll;
}

/* Testimonial Section */
.testimonial-card {
	background: #f9fafb;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Footer Section */
footer {
	background: #1f2937;
}
footer a {
	color: #9ca3af;
}
footer a:hover {
	color: #ffffff;
}
</style>
