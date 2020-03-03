<template>
  <div class="partners">
    <div class="main">
      <strong class="title text-highlight" v-t="'partners.header.title'" />
      <p class="description" v-t="'partners.header.description'" />
      <p class="slideshow-title" v-t="'partners.slideshow.description'" />

      <carousel-3d
        :width="540"
        :height="405"
        :controls-visible="partners.length > 3 ? true : false"
      >
        <slide
          v-tippy="{content: $t(partner.tString) }"
          v-for="(partner, index) in partners"
          :index="index"
          :key="partner.name"
        >
          <img class="partnerImg" :src="partner.image" />
        </slide>
      </carousel-3d>

      <p class="why" v-t="'partners.why.title'" />

      <div class="randomImages"></div>

      <div class="reasons">
        <div class="reason" style="margin-right: 50em">
          <h1 v-t="'partners.why.benefit1.title'" />
          <p v-t="'partners.why.benefit1.description'" />
        </div>
        <div class="reason" style="margin-left: 50em">
          <h1 v-t="'partners.why.benefit2.title'" />
          <p v-t="'partners.why.benefit2.description'" />
        </div>
        <div class="reason" style="margin-right: 30em">
          <h1 v-t="'partners.why.benefit3.title'" />
          <p v-t="'partners.why.benefit3.description'" />
        </div>
      </div>

      <div class="requirments">
        <h1 class="rTitle" v-t="'partners.requirements.title'" />
        <p class="rText" v-t="'partners.requirements.first.title'" />
        <p class="rDescription" v-t="'partners.requirements.first.description'" />

        <p class="rText" v-t="'partners.requirements.second.title'" />
        <p class="rDescription" v-t="'partners.requirements.second.description'" />
      </div>

      <p class="applyText" v-t="'partners.apply.disclaimer'" />

      <div class="button-container">
        <button type="button" class="button" v-t="'partners.apply.button'" />
      </div>

      <p class="jobs" v-t="'partners.apply.jobs'" />

      <p class="sponsor-title text-highlight" v-t="'partners.sponsors.title'" />

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
import Sponsor from "./../components/Sponsor";
import anime from "animejs";

export default {
  name: "partners",
  components: {
    Sponsor
  },
  auth: false,
  head() {
    return {
      title: "Partners"
    };
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
      ],
      partners: [
        {
          name: "Arena of Kings",
          description:
            "Arena of Kings is a next-gen fast-paced PvP Arena Game played in the browser.",
          image: require("../assets/images/aok.jpg"),
          tString: "partners.partner.arenaOfKings"
        },
        {
          name: "UpBeatRadio",
          description:
            "UpBeat is a non-profit international radio which strives to provide non-stop, quality radio and news entertainment.",
          image:
            "https://upbeatradio.net/staff/_assets/_newsImages/default.png?3",
          tString: "partners.partner.upBeat"
        },
        {
          name: "iLoot",
          description: "The gamer earning platform.",
          image: require("../assets/images/iloot.png"),
          tString: "partners.partner.iLoot"
        }
      ],
      sponsors: [
        {
          name: "BitRock",
          description:
            "A powerful and easy to use cross platform installer creation tool.",
          image: "./sponsors/bitrock_installbuilder.png",
          tString: "partners.partner.bitRock"
        },
        {
          name: "Statuspage",
          description: "Easily communicate real-time status to your users.",
          image: "./sponsors/atlassian_statuspage.svg",
          tString: "partners.partner.statusPage"
        },
        {
          name: "Crowdin",
          description: "Agile localization for tech companies.",
          image: "./sponsors/crowdin.png",
          tString: "partners.partner.crowdin"
        }
      ]
    };
  },
  mounted() {
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
              Math.random() * (Math.random() - 1200)
            ) +
            1200 +
            "px",
          top =
            Math.floor(
              Math.random() * (Math.random() - 1200)
            ) +
            1200 +
            "px";

        image.style.position = "absolute";
        image.style.top = top;
        image.style.left = left;
      }
    });

    anime({
      targets: ".random-img",
      scale: [1, 1.1],
      delay: 500,
      direction: "alternate",
      easing: "easeInBounce",
      loop: true
    });

    anime({
      targets: this.$refs.test,
      keyframes: [{ translateY: 100 }, { translateX: -100 }],
      delay: 500,
      easing: "easeOutExpo",
      direction: "alternate",
      duration: 1000
    });

    anime({
      targets: ".reason",
      scale: [1, 1.1],
      delay: 500,
      direction: "alternate",
      easing: "easeInBounce",
      loop: true
    });
  },
  methods: {
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
    }
  }
};
</script>