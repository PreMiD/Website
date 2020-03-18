<template>
	<div class="partners">
		<div class="main">
			<strong
				v-t="'partners.header.title'"
				class="text-highlight title"
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
					<figure>
						<img
							:src="require(`@/static/assets/images/partners/${partner.image}`)"
						/>

						<figcaption>
							<div>
								<h1 v-text="partner.name" />
								<p v-text="$t(partner.tString)" />
							</div>
						</figcaption>
					</figure>
				</slide>
			</carousel-3d>

			<p v-t="'partners.why.title'" class="why"></p>

			<div class="randomImages"></div>

			<div class="reasons">
				<div class="reason">
					<h1 v-t="'partners.why.benefit1.title'" />
					<p v-t="'partners.why.benefit1.description'" />
				</div>
				<div class="reason">
					<h1 v-t="'partners.why.benefit2.title'" />
					<p v-t="'partners.why.benefit2.description'" />
				</div>
				<div class="reason">
					<h1 v-t="'partners.why.benefit3.title'" />
					<p v-t="'partners.why.benefit3.description'" />
				</div>
				<div class="reason">
					<h1 v-t="'partners.why.benefit4.title'" />
					<p v-t="'partners.why.benefit4.description'" />
				</div>
				<div class="reason">
					<h1 v-t="'partners.why.benefit5.title'" />
					<p v-t="'partners.why.benefit5.description'" />
				</div>
			</div>

			<div class="requirments" id="req">
				<div class="requirments--content">
					<h1 v-t="'partners.requirements.title'" class="rTitle" />
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
				class="sponsor-title text-highlight"
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
	.disabled {
		cursor: no-drop !important;
		background-color: #23272a !important;
		box-shadow: none !important;
		color: darkgray !important;
	}
</style>

<script>
	import axios from "axios";
	import Sponsor from "~/components/Sponsor";
	import Apply from "~/components/Apply";

	import anime from "animejs";

	export default {
		name: "Partners",
		components: {
			Sponsor,
			Apply
		},
		auth: false,
		async asyncData() {
			return {
				partners: (await axios(`${process.env.apiBase}/partners`)).data,
				sponsors: (await axios(`${process.env.apiBase}/sponsors`)).data,
				randomImages: [
					"https://i.imgur.com/NC2A7y8.png",
					"https://i.imgur.com/XXZNBIa.png",
					"https://i.imgur.com/7a8eQeG.png",
					"https://i.imgur.com/clun1ID.png",
					"https://i.imgur.com/6QKrzSk.png",
					"https://media.giphy.com/media/Pn1oMgIy1tH45Wv16s/giphy.gif",
					"https://i.imgur.com/o7BRcfM.png",
					"https://i.imgur.com/5LJlH5W.png",
					"https://i.imgur.com/m2D8rgd.png",
					"https://i.imgur.com/DoO8SMp.png"
				],
				showModal: false
			};
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
								Math.random() * (Math.random() - (window?.innerWidth - 150))
							) +
							(window?.innerWidth - 150) +
							"px",
						top =
							Math.floor(
								Math.random() *
									(Math.random() - (document?.body?.scrollHeight - 1050))
							) +
							(document?.body?.scrollHeight - 1050) +
							"px";

					image.style.position = "absolute";
					image.style.top = top;
					image.style.left = left;
				}
			});

			if (
				!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					`${navigator?.userAgent || true}`
				)
			) {
				anime({
					targets: ".random-img",
					scale: [1, 1.1],
					delay: 500,
					direction: "alternate",
					easing: "easeInBounce",
					loop: true
				});

				anime({
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
