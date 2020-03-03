<template>
	<div class="navbar__container">
		<div class="navbar">
			<div class="navbar__logotype">
				<nuxt-link to="/">
					<img src="@/assets/images/logo_round.svg" />
				</nuxt-link>
			</div>

			<div class="navbar__items on-desktop">
				<nuxt-link
					v-for="category of categories"
					:key="category.route"
					:to="'/' + category.route"
					class="navbar__item"
				>
					<span class="round-icon">
						<i :class="`fa-${category.logo} fa-stack-1x fas`"></i>
					</span>
					<p>{{ category.title }}</p>
				</nuxt-link>
				<!--  <nuxt-link to="/login" class="navbar__item" v-if="!this.$auth.loggedIn">
           <i class="fas fa-sign-in-alt"></i>
          <span class="item__title">Sign in</span>
        </nuxt-link>
        <nuxt-link :to="'/users/' + this.$auth.user.id" class="navbar__item" v-if="this.$auth.loggedIn">
           <i class="fas fa-user-circle"></i>
          <span class="item__title">My profile</span>
        </nuxt-link>-->
			</div>
			<div class="mobile-navbar__menu on-mobile">
				<a ref="menuTrigger" @click="mobileMenuActive = !mobileMenuActive">
					<i class="fa-bars fas"></i>
				</a>
			</div>
		</div>
		<transition name="slide-down" mode="out-in">
			<div
				v-if="mobileMenuActive"
				class="mobile-navbar__items on-mobile"
				@click="mobileMenuActive = false"
			>
				<nuxt-link
					v-for="category of categories"
					:key="category.route"
					:to="'/' + category.route"
					class="navbar__item"
				>
					<i :class="'fas fa-' + category.logo"></i>
					<span class="item__title">{{ $t(`header.${category.route}`) }}</span>
				</nuxt-link>
			</div>
		</transition>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "Navigation",
		data() {
			return {
				extVersion: undefined,
				mobileMenuActive: false,
				categories: [
					{
						logo: "cart-arrow-down",
						route: "store",
						title: "STORE"
					},
					{
						logo: "download",
						route: "downloads",
						title: "DOWNLOADS"
					},
					{
						logo: "hands-helping",
						route: "contributors",
						title: "CONTRIBUTORS"
					}
				]
			};
		},
		created() {
			axios(`${process.env.apiBase}/versions`)
				.then(res => {
					this.$data.extVersion = res.data.extension;
				})
				.catch(err => {
					console.error(err);
				});
		}
	};
</script>
