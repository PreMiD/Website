<script lang="ts" setup></script>

<template>
  <div
    class="h-full justify-center items-center flex-wrap justify-content gap-2 m-20 flex"
  >
    <div>
      <div>
        <img
          src="/assets/images/logo-wordmark.png"
          alt="PreMiD Logo"
          class="max-w-120 w-1/1"
        />
        <div class="flex justify-center">
          <p
            class="w-auto text-center font-semibold whitespace-pre-wrap max-w-screen sm:max-w-120"
          >
            <span class="color-primary">PreMiD</span> is a simple, configurable
            utility that allows you to show what you're doing on the web in your
            Discord now playing status.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 m-4 justify-center">
        <a
          href="#features"
          class="font-semibold text-nowrap bg-primary sm:py-3 rounded-full uppercase font-inter text-4 sm:px-10 px-4 py-2"
        >
          <FAIcon class="w-4 mr-1 h-4" :icon="'fa-solid fa-stream'" />{{
            $t("header.links.features")
          }}</a
        >
        <a
          href="#features"
          class="font-semibold text-nowrap bg-btn-grey sm:py-3 rounded-full uppercase font-inter text-4 sm:px-10 px-4 py-2"
        >
          <FAIcon class="w-4 mr-1 h-4" :icon="'fa-solid fa-download'" />{{
            $t("header.links.downloads")
          }}</a
        >
      </div>
    </div>
    <div
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
          <FAIcon class="h-5 mt-1 mr-1 w-5" :icon="'fa-solid fa-download'" />
        </div>
      </div>
      <div class="h-35 bg-primary brightness-95 w-full rounded-b-2 top-1/2">
        <h1 class="font-extrabold pt-5 text-3.5 font-inter pl-5">
          Playing a game
        </h1>
        <img
          class="rounded-md h-20 ml-5 mt-3"
          src="https://cdn.discordapp.com/avatars/503557087041683458/0e08c6c7ecd491094f443a86e53f1b13.png?size=1024"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
