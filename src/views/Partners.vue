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

      <img
        class="random-img"
        src="https://i.imgur.com/NC2A7y8.png"
        style="top: 200px; left: 250px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/XXZNBIa.png"
        style="top: 150px; right: 250px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/7a8eQeG.png"
        style="top: 300px; left: 500px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/clun1ID.png"
        style="top: 750px; left: 650px; max-width: 150px; max-height: 150px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/6QKrzSk.png"
        style="top: 700px; right: 600px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://media.giphy.com/media/Pn1oMgIy1tH45Wv16s/giphy.gif"
        style="top: 1100px; left: 800px; max-width: 125px; max-height: 125px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/o7BRcfM.png"
        style="top: 950px; left: 350px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/5LJlH5W.png"
        style="top: 1075px; right: 410px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/m2D8rgd.png"
        style="top: 1250px; left: 450px; max-width: 175px; max-height: 175px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/DoO8SMp.png"
        style="top: 1350px; right: 450px; max-width: 175px; max-height: 100pxx;"
      />

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