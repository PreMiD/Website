<script lang="ts" setup></script>

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
        class="bg-primary justify-center h-65 m-6 rounded-t-2 rounded-b-4 w-md"
      >
        <div class="flex items-center">
          <img
            class="rounded-full m-5 h-20"
            src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
          />
          <div>
            <h1 class="font-semibold text-5 font-inter subpixel-antialiased">
              PreMiD
            </h1>
            <FAIcon
              class="mr-1 h-5 mt-1 h-fit w-5"
              :icon="'fa-solid fa-download'"
            />
          </div>
        </div>
        <div class="bg-primary h-37 brightness-95 w-full rounded-b-2 top-1/2">
          <div class="pt-4 pl-4">
            <h1 class="uppercase font-extrabold text-3">Playing a game</h1>
            <div class="flex flex-wrap h-fit mt-4">
              <span class="max-h-22">
                <img
                  class="rounded-md h-22"
                  src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
                />

                <div
                  class="rounded-full bg-primary relative bottom-8 w-9 h-9 left-15"
                >
                  <img
                    class="rounded-full w-8 h-8 m-0.5"
                    src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
                  />
                </div>
              </span>
              <div class="my-a pl-5">
                <h1 class="font-bold text-sm pb-.5">
                  {{ presenceData.name }}
                </h1>
                <p class="pb-.5 text-xs font-extralight">
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
  </main>
  <!-- TODO: features showcase -->
  <!-- <hr class="mt-50" /> -->
  <!-- <section class="flex justify-center bg-bg-blue-gray">
    <h1 class="font-bold text-5xl">You will love these features!</h1>
  </section> -->
</template>

<style scoped></style>
