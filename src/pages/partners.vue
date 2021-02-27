<template>
	<div class="partners">
		<div class="main">
			<strong
				v-t="'partners.header.title'"
				class="text-highlight title titleHeading"
			></strong>
			<p v-t="'partners.header.description'" class="description"></p>
			<p v-t="'partners.slideshow.description'" class="slideshow-title"></p>

			<carousel-3d
				:controls-visible="partners.length > 3 ? true : false"
				:clickable="true"
				:width="548"
				:height="298"
			>
				<slide
					v-for="(partner, index) in partners"
					:index="index"
					:key="partner.name"
				>
					<Partner
						v-tippy="{
							content: 'Click to visit their website',
							placement: 'bottom'
						}"
						:partner="partner"
					/>
				</slide>
			</carousel-3d>

			<p v-t="'partners.why.title'" class="why"></p>

			<div class="randomImages"></div>

			<div class="reasons">
				<div>
					<h1 v-t="'partners.why.benefit1.title'" />
					<p v-t="'partners.why.benefit1.description'" />
				</div>
				<div>
					<h1 v-t="'partners.why.benefit2.title'" />
					<p v-t="'partners.why.benefit2.description'" />
				</div>
				<div>
					<h1 v-t="'partners.why.benefit3.title'" />
					<p v-t="'partners.why.benefit3.description'" />
				</div>
				<div>
					<h1 v-t="'partners.why.benefit4.title'" />
					<p v-t="'partners.why.benefit4.description'" />
				</div>
				<div>
					<h1 v-t="'partners.why.benefit5.title'" />
					<p v-t="'partners.why.benefit5.description'" />
				</div>
			</div>

			<div class="requirments" id="req">
				<div class="requirments--content">
					<h1 v-t="'partners.requirements.title'" class="rTitle titleHeading" />
					<p v-t="'partners.requirements.first.title'" class="rText" />
					<p
						v-t="'partners.requirements.first.description'"
						class="rDescription"
					/>

					<p v-t="'partners.requirements.second.title'" class="rText" />
					<p
						v-t="'partners.requirements.second.description'"
						class="rDescription"
					/>
				</div>
			</div>

			<p v-t="'partners.apply.disclaimer'" class="applyText" />

			<div class="button-container">
				<button
					v-t="'partners.apply.button'"
					type="button"
					class="button disabled"
					@click="
						return;
						$auth.loggedIn ? (showModal = true) : $router.push('/login');
						toggleScroll();
					"
				/>
				<transition name="slide-down" mode="in-out">
					<Apply
						v-if="showModal"
						@close="
							showModal = false;
							toggleScroll();
						"
					/>
				</transition>
			</div>

			<p v-html="job($t('partners.apply.jobs'))" class="jobs"></p>

			<p
				v-t="'partners.sponsors.title'"
				class="sponsor-title text-highlight titleHeading"
			></p>

			<div class="sponsor-cards">
				<Sponsor
					v-for="sponsor in sponsors"
					:key="sponsor.name"
					:name="sponsor.name"
					:description="$t(sponsor.tString)"
					:image="sponsor.image"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.titleHeading {
		font-family: "Discord Font", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		text-transform: uppercase;
	}

	.disabled {
		cursor: no-drop !important;
		background-color: #23272a !important;
		box-shadow: none !important;
		color: darkgray !important;
	}

	.reasons {
		margin-bottom: 2em;
		max-width: 1200px;
		margin: 2em auto;
		display: flex;
		align-items: flex-start;
		position: relative;
		justify-content: center;
		flex-wrap: wrap;

		div {
			h1 {
				font-family: "Discord Font", "Segoe UI", Tahoma, Geneva, Verdana,
					sans-serif;
				color: #7289da;
				font-size: 1.25rem;
			}

			background-color: rgba(22, 23, 29, 0.75);
			border-radius: 1em;
			padding: 0.5em 2em;
			margin: 1em;
			max-width: 350px;
		}
	}
</style>

<script>
	import aniflix_icon from "~/assets/images/partners/aniflix-icon.png";
	import aok_icon from "~/assets/images/partners/aok-icon.png";
	import upbeat_icon from "~/assets/images/partners/upbeat-icon.png";
	import slr_icon from "~/assets/images/partners/slr-icon.png";
	import dtemplates_icon from "~/assets/images/partners/dtemplates-icon.png";
	import taigabot_icon from "~/assets/images/partners/taigabot-icon.png";
	import erisly_icon from "~/assets/images/partners/erisly-icon.png";
	import onlyhit_icon from "~/assets/images/partners/onlyhit-icon.png";
	import reyfm_icon from "~/assets/images/partners/reyfm-icon.jpg";

	export default {
		name: "Partners",
		auth: false,
		async asyncData({ app, error }) {
			try {
				return {
					partners: (await app.$axios(`/v2/partners`)).data,
					sponsors: (await app.$axios(`/v2/sponsors`)).data,
					randomImages: [
						aniflix_icon,
						aok_icon,
						upbeat_icon,
						slr_icon,
						dtemplates_icon,
						taigabot_icon,
						erisly_icon,
						onlyhit_icon,
						reyfm_icon
					],
					showModal: false,
					hovered: {}
				};
			} catch (err) {
				return error(err.message);
			}
		},
		mounted() {
			this.$auth.$storage.setUniversal("redirect", "/partners#req");

			this.randomImages.forEach(img => {
				let imgDestination = document.querySelector(".randomImages"),
					newImg = document.createElement("img");

				newImg.src = img;
				newImg.classList = ["random-img"];
				imgDestination.appendChild(newImg);

				ImgRandomPosition(newImg);

				function ImgRandomPosition(image) {
					let left =
							Math.floor(
								Math.random() * (Math.random() - (window.innerWidth - 150))
							) +
							(window.innerWidth - 150) +
							"px",
						top =
							Math.floor(
								Math.random() *
									(Math.random() - (document.body.scrollHeight - 1050))
							) +
							(document.body.scrollHeight - 1050) +
							"px";

					image.style.position = "absolute";
					image.style.top = top;
					image.style.left = left;
				}
			});

			if (
				!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					`${navigator.userAgent || true}`
				)
			) {
				this.$anime
					.timeline({
						targets: ".random-img",
						loop: true,
						easing: "easeInOutQuad",
						delay: this.$anime.stagger(500, [0, 1000])
					})
					.add({
						translateY: [0, -50]
					})
					.add({
						targets: ".random-img",
						translateY: [-50, 0]
					});

				this.$anime({
					targets: ".reason",
					scale: [1, 1.1],
					delay: 500,
					direction: "alternate",
					easing: "easeInBounce",
					loop: true
				});
			}
		},
		methods: {
			job(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map(ch => {
					return pls.replace(
						ch,
						`<strong><a href="/jobs" class="text-highlight">${ch.slice(
							2,
							ch.length - 2
						)}</a></strong>`
					);
				})[0];
			},
			markdown(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map(ch => {
					return pls.replace(
						ch,
						`<strong><span class="text-highlight">${ch.slice(
							2,
							ch.length - 2
						)}</span></strong>`
					);
				})[0];
			},
			toggleScroll() {
				this.showModal
					? document.body.classList.add("no-scroll")
					: document.body.classList.remove("no-scroll");
			}
		},
		head: {
			title: "Partners"
		}
	};
</script>
