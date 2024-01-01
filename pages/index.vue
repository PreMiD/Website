<script lang="ts" setup></script>

<template>
  <section
    class="h-full justify-center items-center flex-wrap gap-2 flex mx-2 mt-20"
  >
    <div class="xs:pr-10">
      <div>
        <img
          src="/assets/images/logo-wordmark.png"
          alt="PreMiD Logo"
          class="xs:max-w-120 xs:w-1/1"
        />
        <div class="flex justify-center">
          <p
            class="w-1/1 mt-5 text-center font-semibold whitespace-pre-wrap max-w-screen xs:max-w-120 text-5"
          >
            <span class="color-primary">PreMiD</span> is a simple, configurable
            utility that allows you to show what you're doing on the web in your
            Discord now playing status.
          </p>
        </div>
      </div>
      <div class="flex gap-4 justify-center lt-sm:flex-col m-10">
        <a
          href="#features"
          class="font-semibold text-nowrap bg-primary text-center py-3 rounded-full uppercase font-inter text-4 px-10"
        >
          <FAIcon class="w-4 mr-1 h-4" :icon="'fa-solid fa-stream'" />{{
            $t("header.links.features")
          }}</a
        >
        <a
          href="/downloads"
          class="font-semibold text-nowrap text-center bg-btn-grey py-3 rounded-full uppercase font-inter text-4 px-10"
        >
          <FAIcon class="w-4 mr-1 h-4" :icon="'fa-solid fa-download'" />{{
            $t("header.links.downloads")
          }}</a
        >
      </div>
    </div>
    <section class="flex-col">
      <div
        v-for="presenceData in [
          {
            name: 'PreMiD',
            details: 'detail',
            state: 'state',
            time: '19:00 elapsed',
          },
          {
            user: {
              image:
                'https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024',
              name: 'PreMiD',
            },
            name: 'PreMiD',
            details: 'detail',
            state: 'state',
            time: '19:00 elapsed',
          },
        ]"
        :key="presenceData.name"
        class="h-65 bg-primary m-4 rounded-t-2 rounded-b-4 justify-center w-md"
      >
        <div class="flex items-center">
          <img
            class="rounded-full h-20 m-5"
            src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
          />
          <div>
            <h1 class="font-semibold subpixel-antialiased text-5 font-inter">
              PreMiD
            </h1>
            <FAIcon
              class="h-5 mt-1 h-fit mr-1 w-5"
              :icon="'fa-solid fa-download'"
            />
          </div>
        </div>
        <div class="h-37 bg-primary brightness-95 w-full rounded-b-2 top-1/2">
          <div class="pt-4 pl-4">
            <h1 class="font-extrabold uppercase text-3">Playing a game</h1>
            <div class="flex flex-wrap mt-4 h-fit">
              <span class="max-h-22">
                <img
                  class="rounded-md h-22"
                  src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
                />

                <div
                  class="rounded-full relative bottom-8 bg-primary w-9 h-9 left-15"
                >
                  <img
                    class="w-8 h-8 rounded-full m-0.5"
                    src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
                  />
                </div>
              </span>
              <div class="pl-5 my-a">
                <h1 class="font-bold text-sm pb-.5">{{ presenceData.name }}</h1>
                <p class="text-xs font-extralight pb-.5">
                  {{ presenceData.state }}
                </p>
                <p class="text-xs font-extralight pb-.5">
                  {{ presenceData.details }}
                </p>
                <p class="text-xs font-extralight pb-.5">
                  {{ presenceData.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped></style>
