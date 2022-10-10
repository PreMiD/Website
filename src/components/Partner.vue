<template>
	<figure
		@click="open($event, partner.url)"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
	>
		<nuxt-img :alt="partner.name" :src="`/images/partners/${partner.image}`" />

		<transition name="fade" mode="out-in">
			<figcaption v-if="!hovered">
				<div>
					<h1 v-text="partner.name" />
					<p v-text="$t(partner.tString)" />
				</div>
			</figcaption>
		</transition>
	</figure>
</template>

<script>
	export default {
		props: ["partner"],
		data() {
			return {
				hovered: false
			};
		},
		methods: {
			open(ev, url) {
				if (
					ev.srcElement.parentElement.parentElement.classList.contains(
						"current"
					) &&
					url
				)
					window.open(url, "_blank").focus();
			}
		}
	};
</script>
