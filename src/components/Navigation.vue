<template>
  <div class="navbar__container">
    <div class="navbar">
      
        <div class="navbar__logotype">
          <nuxt-link to="/"><img src="@/assets/images/logo_round.svg" /></nuxt-link>
          <a href="https://github.com/PreMiD/PreMiD/releases" target="_blank" class="label label_pmd-version" v-html="'2.0.1.5'"/>
        </div>
      
      <div class="navbar__items on-desktop">
        <nuxt-link
          :to="'/' + category.route"
          v-for="category of categories"
          v-bind:key="category.route"
          class="navbar__item"
        >
          <i :class="'fas fa-' + category.logo" />
          <span class="item__title">{{ $t(`header.${category.route}`) }}</span>
        </nuxt-link>
        <nuxt-link to="/login" class="navbar__item" v-if="!this.$auth.loggedIn">
           <i class="fas fa-sign-in-alt"></i>
          <span class="item__title">Sign in</span>
        </nuxt-link>
        <nuxt-link :to="'/users/' + this.$auth.user.id" class="navbar__item" v-if="this.$auth.loggedIn">
           <i class="fas fa-user-circle"></i>
          <span class="item__title">My profile</span>
        </nuxt-link>
      </div>
      <div class="mobile-navbar__menu on-mobile">
        <a ref="menuTrigger" v-on:click="mobileMenuActive = !mobileMenuActive">
          <i class="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <transition name="slide-down" mode="out-in">
      <div
        v-if="mobileMenuActive"
        v-on:click="mobileMenuActive = false"
        class="mobile-navbar__items on-mobile"
      >
        <nuxt-link
          :to="'/' + category.route"
          v-for="category of categories"
          v-bind:key="category.route"
          class="navbar__item"
        >
          <i :class="'fas fa-' + category.logo" />
          <span class="item__title">{{ $t(`header.${category.route}`) }}</span>
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navigation",
  data() {
    return {
      latestReleaseVersion: undefined,
      mobileMenuActive: false,
      categories: [
        {
          logo: "box-open",
          route: "store",
          title: "STORE"
        },
        {
          logo: "file-export",
          route: "downloads",
          title: "DOWNLOADS"
        },
        {
          logo: "project-diagram",
          route: "contributors",
          title: "CONTRIBUTORS"
        }
      ]
    };
  }
};
</script>
