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
    class="justify-center items-center flex-wrap gap-2 flex mx-2 h-screen lt-lg:mt-20"
  >
    <div class="xl:p-10">
      <div>
        <img
          src="/assets/images/logo-wordmark.png"
          alt="PreMiD Logo"
          class="xs:max-w-120 xs:w-1/1"
        />
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
        <!-- <a
                    href="#features"
                    class="font-semibold text-center text-nowrap bg-primary py-3 rounded-full uppercase font-inter text-4 px-14.5"
                >
                    <FAIcon
                        class="w-4 mr-1 h-4"
                        :icon="'fa-solid fa-stream'"
                    />{{ $t("header.links.features") }}</a
                > -->
        <!-- TODO: swap out /store with #features once created -->
        <a
          href="/store"
          class="font-semibold text-center uppercase font-inter text-nowrap bg-primary py-3 rounded-full text-4 px-14"
        >
          <FAIcon
            class="w-4 h-4 mr-1"
            :icon="'fa-solid fa-cart-arrow-down'"
          />{{ $t("header.links.store") }}</a
        >
        <a
          href="/downloads"
          class="font-semibold text-nowrap text-center py-3 rounded-full uppercase font-inter text-4 px-10 bg-btn-gray"
        >
          <FAIcon class="w-4 mr-1 h-4" :icon="'fa-solid fa-download'" />{{
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
          <img class="rounded-full m-5 h-20" :src="presence.user.image" />
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
            <h1 class="uppercase font-extrabold text-3">
              {{ presence.type }}
            </h1>
            <div class="flex flex-wrap h-fit mt-4">
              <span class="max-h-22">
                <img
                  class="rounded-md h-22 w-22 object-cover"
                  :src="presence.largeImage"
                />

                <div
                  class="rounded-full bg-primary relative bottom-8 w-9 h-9 left-15"
                >
                  <img
                    class="rounded-full w-8 h-8 m-0.5"
                    :src="presence.smallImage"
                  />
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
  <!-- TODO: features showcase -->
  <!-- <hr class="mt-50" /> -->
  <!-- <section class="flex justify-center bg-bg-blue-gray">
    <h1 class="font-bold text-5xl">You will love these features!</h1>
  </section> -->
</template>

<style scoped></style>
