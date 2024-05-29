<script lang="ts" setup>
type presenceData = {
	calculatedTime: string;
	details: string;
	name: string;
	largeImage: string;
	smallImage: string;
	state: string;
	time: [number, "elapsed" | "left"];
	type: string;
	user: {
		image: string;
		name: string;
	};
}[];

const elapsedTime = ref(0),
	presences = ref<presenceData>([
		{
			calculatedTime: "",
			details: 'S2:E10 "Over"',
			largeImage:
        "https://occ-0-7202-769.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABcTBR2zKjrPP2hApy9ff-kf-0fSIZo-17obE5NcYcFsudoaKjJxyWtCEZMFrWWsyq9axKmsDKQpWgv3AQVskSxHbiw6TSS-qKbmqgtoJOV4Xu1gnKXaLQ64M3Q.webp?r=c3b",
			name: "Netflix",
			smallImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png",
			state: "Breaking Bad",
			time: [4937, "left"],
			type: "Watching Netflix",
			user: {
				image:
          "https://s3.vasc.dev/presencedb/avatars/576097150359044106/9d3dd2004c4d005f62d9b86e23e1d20a",
				name: "veryCrunchy",
			},
		},
		{
			calculatedTime: "",
			details: "detail",
			largeImage:
        "https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024",
			name: "PreMiD",
			smallImage:
        "https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024",

			state: "state",
			time: [157, "elapsed"],
			type: "Playing a game",
			user: {
				image:
          "https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024",
				name: "PreMiD",
			},
		},
	]),
	updateTimes = () => {
		elapsedTime.value++;

		for (const presenceData of presences.value) {
			let time;
			if (presenceData.time[1] === "elapsed")
				time = Math.max(0, presenceData.time[0] + elapsedTime.value);
			if (presenceData.time[1] === "left")
				time = Math.max(0, presenceData.time[0] - elapsedTime.value);
			const seconds = time ?? 0,
				minutes = Math.floor(seconds / 60),
				hours = Math.floor(minutes / 60),
				h = hours > 0 ? `${String(hours).padStart(2, "0")}:` : "",
				m = minutes > 0 ? `${String(minutes % 60).padStart(2, "0")}:` : "00:",
				s = `${String(seconds % 60).padStart(2, "0")}`;
			presenceData.calculatedTime = `${h}${m}${s} ${presenceData.time[1]}`;
		}
	};

let updateTimesInterval: NodeJS.Timeout;
updateTimes();
onMounted(() => {
	updateTimesInterval = setInterval(updateTimes, 1000);
});
onBeforeUnmount(() => {
	clearInterval(updateTimesInterval);
});
</script>

<template>
	<main
		class="justify-center items-center gap-2 flex flex-wrap min-h-screen mx-2 lt-lg:mt-20"
	>
		<div class="xl:p-10">
			<div>
				<img
					src="/assets/images/logo-wordmark.png"
					alt="PreMiD Logo"
					class="xs:max-w-120 xs:w-1/1"
				>
				<div class="flex justify-center">
					<p
						class="xs:max-w-120 w-1/1 mt-5 text-center font-semibold whitespace-pre-wrap max-w-screen text-5"
					>
						<span class="color-primary">PreMiD</span> is a simple, configurable
						utility that allows you to show what you're doing on the web in your
						Discord now playing status.
					</p>
				</div>
			</div>
			<div class="flex justify-center gap-4 lt-sm:flex-col m-10">
				<a
					href="#features"
					class="font-semibold text-center text-nowrap bg-primary rounded-full uppercase font-inter py-3 text-4 px-14.5"
				>
					<FAIcon
						class="w-4 h-4 mr-1"
						:icon="'fa-solid fa-stream'"
					/>{{
						$t("header.links.features")
					}}</a>
				<a
					href="/downloads"
					class="font-semibold text-nowrap text-center py-3 rounded-full uppercase font-inter text-4 px-10 bg-gray"
				>
					<FAIcon
						class="w-4 mr-1 h-4"
						:icon="'fa-solid fa-download'"
					/>{{
						$t("header.links.downloads")
					}}
				</a>
			</div>
		</div>
		<section class="flex-col">
			<div
				v-for="presence in presences"
				:key="presence.name"
				class="bg-primary justify-center h-65 m-6 rounded-t-2 rounded-b-4 w-md"
			>
				<div class="flex items-center">
					<img
						class="rounded-full m-5 h-20"
						:src="presence.user.image"
					>
					<div>
						<h1 class="font-semibold font-inter text-5 subpixel-antialiased">
							{{ presence.user.name }}
						</h1>
						<FAIcon
							class="mr-1 h-5 mt-1 h-fit w-5"
							:icon="'fa-solid fa-handshake-angle'"
						/>
					</div>
				</div>
				<div class="bg-primary w-full h-37 brightness-95 rounded-b-2 top-1/2">
					<div class="pt-4 pl-4">
						<h1 class="uppercase text-3 font-extrabold">
							{{ presence.type }}
						</h1>
						<div class="flex flex-wrap h-fit mt-4">
							<span class="max-h-22">
								<img
									class="rounded-md object-cover h-22 w-22"
									:src="presence.largeImage"
								>

								<div
									class="rounded-full bg-primary relative bottom-8 w-9 h-9 left-15"
								>
									<img
										class="rounded-full w-8 h-8 m-0.5"
										:src="presence.smallImage"
									>
								</div>
							</span>
							<div class="my-a pl-5">
								<h1 class="font-bold text-sm pb-.5">
									{{ presence.name }}
								</h1>
								<p class="pb-.5 text-xs font-extralight">
									{{ presence.state }}
								</p>
								<p class="text-xs font-extralight pb-.5">
									{{ presence.details }}
								</p>
								<p class="text-xs font-extralight pb-.5">
									{{ presence.calculatedTime }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<section
		id="features"
		class="relative flex flex-col overflow-hidden gap-20 lg:gap-0 bg-[linear-gradient(125deg,#191b24,#111218)] bg-cover lg:bg-[url(/assets/images/pattern.png)] bg-repeat pt-[120px] pb-20 lg:bg-[size:300px_240px]"
	>
		<svg
			class="top-0 w-full absolute z-10 [transform:scaleX(1.5)_rotate(180deg)]"
			viewBox="0 0 1440 100"
			preserveAspectRatio="none"
		>
			<path
				class="[animation:wave_25s_linear_infinite_alternate]"
				d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
				fill="#111218"
			/>
		</svg>
		<h1
			class="text-center md:py-20 md:px-20 text-8 md:text-15 color-[#f8f9fd] font-700"
		>
			You will love these features!
		</h1>

		<div class="flex flex-col items-center lg:flex-row lg:py-40 px-8">
			<div class="flex flex-col flex-1 self-stretch lg:self-center gap-8">
				<h1
					class="text-white text-8 font-700 py-4 lg:py-0 stretch lg:text-[56px]"
				>
					Find
					<span
						class="bg-[linear-gradient(30deg,#7289da,#b3aeff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
					>your</span>
					Presence
				</h1>
				<p
					class="hidden lg:block text-7 leading-[34px] font-500 color-[#c4c4c4]"
				>
					We created our extension in a way that lets you add and use Presences
					created by others and manage them in our extension!
				</p>

				<a
					href="/store"
					class="hidden lg:block text-xl font-700 text-center uppercase font-inter text-nowrap bg-primary rounded-full py-4 self-start px-14"
				>
					Visit store
				</a>
			</div>
			<div class="flex-1">
				<img
					class="block grow"
					src="/assets/images/features/card1.webp"
					width="1117"
					height="714"
				>
			</div>
		</div>

		<div class="flex flex-col items-center lg:py-40 px-8 lg:flex-row-reverse">
			<div class="flex-1 self-stretch lg:self-center flex flex-col gap-8">
				<h1
					class="text-white py-4 lg:py-0 stretch text-8 lg:text-[56px] font-700"
				>
					Simple user interface
				</h1>
				<div
					class="hidden lg:block text-7 color-[#c4c4c4] leading-[34px]font-500"
				>
					Tired of complicated user interfaces? That's why we created and try to
					keep our UI as simple and useful as possible with important features
					like:
					<br>
					<br>
					<ul class="px-8 [list-style:initial] text-lg">
						<li class="py-1">
							App and Extension settings
						</li>
						<li class="py-1">
							Presence management
						</li>
						<li class="py-1">
							Sort by category
						</li>
					</ul>
				</div>
			</div>
			<div class="flex-1 flex justify-center">
				<video
					class="block rounded"
					autoplay
					loop
					src="/assets/videos/card2.mp4"
					width="310"
					height="450"
				/>
			</div>
		</div>

		<div class="flex flex-col lg:flex-row items-center lg:py-40 px-12">
			<div class="flex-1 self-stretch lg:self-center flex flex-col gap-8">
				<h1
					class="text-white py-4 lg:py-0 stretch text-8 lg:text-[56px] font-700"
				>
					Quick support
				</h1>
				<p
					class="hidden lg:block text-7 leading-[34px] font-500 color-[#c4c4c4]"
				>
					Something is glitched, sending you tons of errors or simply not
					working? We will help you get rid of those issues on our Discord
					server. We also created our very own support system that will make
					sure your issue gets resolved as soon as possible.
				</p>

				<a
					href="https://discord.premid.app"
					class="self-start hidden lg:block text-xl font-700 text-center uppercase font-inter text-nowrap bg-primary rounded-full py-4 px-14"
				>
					Join Our Discord
				</a>
			</div>
			<div class="flex-1 flex justify-center">
				<img
					class="block rounded"
					src="/assets/images/features/card3.webp"
					width="595"
					height="506"
				>
			</div>
		</div>
	</section>
</template>

<style>
@keyframes wave {
  0% {
    d: path(
      "M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
    );
  }

  50% {
    d: path(
      "M655.558582,28.4898877 C500.191373,61.6062216 422.833785,83.5422763 266.940085,49.8995879 C112.480383,16.5663637 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,49.8995879 C1580.91676,-34.8808285 1438.10804,73.6768193 1148.0266,38.0019829 C857.945166,2.32714659 810.925791,-4.62644617 655.558582,28.4898877 Z"
    );
  }

  100% {
    d: path(
      "M842.322034,38.0019829 C686.954825,71.1183168 623.386282,53.08497 467.492582,19.4422816 C313.032879,-13.8909426 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,76.8685643 C1512.23604,-35.3595639 1568.70222,67.4289432 1278.62078,31.7541069 C988.539347,-3.92072949 997.689243,4.88564905 842.322034,38.0019829 Z"
    );
  }
}
</style>
