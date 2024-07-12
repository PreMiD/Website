<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["continue"]);

const visible = ref(false);

const showButton = ref(false);

let interval: number;

watch(visible, () => {
	if (visible.value) {
		showButton.value = false;
		interval = window.setTimeout(() => {
			showButton.value = !showButton.value;
		}, 10000);
	}
	else {
		window.clearTimeout(interval);
	}
});

useHead({
	htmlAttrs: computed(() => ({
		class: visible.value ? "overflow-hidden" : "",
	})),
});

function continueButton() {
	visible.value = false;
	emit("continue");
}

defineExpose({
	visible,
});
</script>

<template>
	<Transition name="fade">
		<div v-if="visible" class="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-9999">
			<div class="relative bg-gray w-full rounded-lg bg-gray-800 p-6 max-w-md shadow-lg">
				<button class="absolute cursor-pointer transition-colors bg-transparent border-none top-4 right-4 text-text hover:text-red" @click="visible = false">
					<FAIcon icon="fa-solid fa-times" class="h-5 w-5" />
				</button>
				<div class="text-center">
					<h1 class="font-extrabold text-2xl text-primary mb-4">
						A Quick Favor...
					</h1>
					<p class="mb-4 text-lg text-gray-300">
						We hope you're gonna love PreMiD! If it brings a smile to your face, why not spread some love back? Our team of volunteers put their hearts into making it awesome just for you!
					</p>
					<div class="flex items-center justify-center mb-6">
						<div class="grid grid-cols-2">
							<a href="https://www.patreon.com/Timeraa" target="_blank" class="flex items-center justify-center font-bold text-white rounded-full h12.5 bg-orange-500 py-2 px-4 m-2 hover:bg-orange-600 transition duration-300 inline-block">
								<FAIcon icon="fa-brands fa-patreon" class="mr-2 h5" /> Support on Patreon
							</a>
							<a href="https://github.com/sponsors/PreMiD" target="_blank" class="h12.5 bg-black font-bold text-white rounded-full py-2 px-4 m-2 transition duration-300 inline-block flex items-center justify-center cursor-pointer hover:bg-op-80">
								<FAIcon icon="fa-brands fa-github" class="mr-2 h5" /> Sponsor on GitHub
							</a>
						</div>
					</div>
					<p v-if="!showButton" class="text-gray-400">
						Hold tight... loading the magic button...
					</p>
					<button v-if="showButton" class="cursor-pointer text-white rounded-full py-2 transition duration-300 font-size-4 bg-primary hover:bg-primary-highlight outline-none b-solid b-transparent font-semibold px-6" @click="continueButton">
						Continue
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
