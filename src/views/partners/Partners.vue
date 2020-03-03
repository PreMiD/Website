<template>
	<div class="partners">
		<div class="main">
			<strong v-t="'partners.header.title'" class="text-highlight title"></strong>
			<p v-t="'partners.header.description'" class="description"></p>
			<p v-t="'partners.slideshow.description'" class="slideshow-title"></p>

			<carousel-3d
				:width="540"
				:height="405"
				:controls-visible="partners.length > 3 ? true : false"
			>
				<slide
					v-for="(partner, index) in partners"
					:key="partner.name"
					v-tippy="{ content: $t(partner.tString) }"
					:index="index"
				>
					<img
						class="partnerImg"
						:src="require(`@/static/assets/images/partners/${partner.image}`)"
					/>
				</slide>
			</carousel-3d>

			<p v-t="'partners.why.title'" class="why"></p>

			<div class="randomImages"></div>

			<div class="reasons">
				<div class="reason" style="margin-right: 50em">
					<h1 v-t="'partners.why.benefit1.title'"></h1>
					<p v-t="'partners.why.benefit1.description'"></p>
				</div>
				<div class="reason" style="margin-left: 50em">
					<h1 v-t="'partners.why.benefit2.title'"></h1>
					<p v-t="'partners.why.benefit2.description'"></p>
				</div>
				<div class="reason" style="margin-right: 40em">
					<h1 v-t="'partners.why.benefit3.title'"></h1>
					<p v-t="'partners.why.benefit3.description'"></p>
				</div>
				<div class="reason" style="margin-left: 60em">
					<h1 v-t="'partners.why.benefit4.title'"></h1>
					<p v-t="'partners.why.benefit4.description'"></p>
				</div>
				<div class="reason" style="margin-right: 30em">
					<h1 v-t="'partners.why.benefit5.title'"></h1>
					<p v-t="'partners.why.benefit5.description'"></p>
				</div>
			</div>

			<div class="requirments">
				<h1 v-t="'partners.requirements.title'" class="rTitle"></h1>
				<p v-t="'partners.requirements.first.title'" class="rText"></p>
				<p v-t="'partners.requirements.first.description'" class="rDescription"></p>

				<p v-t="'partners.requirements.second.title'" class="rText"></p>
				<p v-t="'partners.requirements.second.description'" class="rDescription"></p>
			</div>

			<p v-t="'partners.apply.disclaimer'" class="applyText"></p>

			<div class="button-container">
				<button v-t="'partners.apply.button'" type="button" class="button"></button>
			</div>

			<p v-t="'partners.apply.jobs'" class="jobs"></p>

			<p v-t="'partners.sponsors.title'" class="sponsor-title text-highlight"></p>

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

<script>
import axios from "axios"
import Sponsor from "~/components/Sponsor"
import anime from "animejs"

export default {
	name: "Partners",
	components: {
		Sponsor
	},
	auth: false,
	async asyncData() {
		return {
			partners: (await axios(`${process.env.apiBase}/partners`)).data,
			sponsors: (await axios(`${process.env.apiBase}/sponsors`)).data
		}
	},
	data() {
		return {
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
			]
		}
	},
	mounted() {
		this.randomImages.forEach(img => {
			let imgDestination = document.querySelector(".randomImages"),
				newImg = document.createElement("img")

			newImg.src = img
			newImg.classList = ["random-img"]
			imgDestination.appendChild(newImg)

			ImgRandomPosition(newImg)

			function ImgRandomPosition(image) {
				let left =
						Math.floor(Math.random() * (Math.random() - (window?.innerWidth - 150))) +
						(window?.innerWidth - 150) +
						"px",
					top =
						Math.floor(
							Math.random() * (Math.random() - (document?.body?.scrollHeight - 1050))
						) +
						(document?.body?.scrollHeight - 1050) +
						"px"

				image.style.position = "absolute"
				image.style.top = top
				image.style.left = left
			}
		})

		anime({
			targets: ".random-img",
			scale: [1, 1.1],
			delay: 500,
			direction: "alternate",
			easing: "easeInBounce",
			loop: true
		})

		anime({
			targets: this.$refs.test,
			keyframes: [{ translateY: 100 }, { translateX: -100 }],
			delay: 500,
			easing: "easeOutExpo",
			direction: "alternate",
			duration: 1000
		})

		anime({
			targets: ".reason",
			scale: [1, 1.1],
			delay: 500,
			direction: "alternate",
			easing: "easeInBounce",
			loop: true
		})
	},
	methods: {
		markdown(pls) {
			if (!pls.match(/(\*\*.*?\*\*)/g)) return pls
			return pls.match(/(\*\*.*?\*\*)/g).map(ch => {
				return pls.replace(
					ch,
					`<strong><span class="text-highlight">${ch.slice(
						2,
						ch.length - 2
					)}</span></strong>`
				)
			})[0]
		}
	},
	head() {
		return {
			title: "Partners"
		}
	}
}
</script>
