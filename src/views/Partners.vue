<template>
  <div class="partners">
    <div class="main">
      <strong class="title text-highlight">PARTNERS</strong>
      <p class="description">
        Join the fam and get some partner-only benefits to show off how much swag you
        have.
      </p>
      <p class="slideshow-title">Our lovely pets</p>

      <div class="slider">
        <div class="left" v-bind:style="{ 'background-image': `url(${left.image})` }">
          <div class="arrow" v-on:click="goPrev()">
            <i class="fas fa-arrow-left"></i>
          </div>
        </div>
        <div class="middle" v-bind:style="{ 'background-image': `url(${middle.image})` }">
          <div class="text">
            <h1>{{ middle.name }}</h1>
            <p>{{ middle.description }}</p>
          </div>
        </div>
        <div class="right" v-bind:style="{ 'background-image': `url(${right.image})` }">
          <div class="arrow" v-on:click="goNext()">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <p class="why">Why you should partner with us?</p>

      <img
        class="random-img"
        src="https://i.imgur.com/NC2A7y8.png"
        style="top: 200px; left: 250px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/XXZNBIa.png"
        style="top: 150px; right: 250px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/7a8eQeG.png"
        style="top: 300px; left: 500px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/clun1ID.png"
        style="top: 750px; left: 650px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/6QKrzSk.png"
        style="top: 700px; right: 600px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/ofVt9zJ.png"
        style="top: 1100px; left: 800px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/o7BRcfM.png"
        style="top: 950px; left: 350px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/5LJlH5W.png"
        style="top: 1075px; right: 410px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/m2D8rgd.png"
        style="top: 1250px; left: 450px;"
      />

      <img
        class="random-img"
        src="https://i.imgur.com/DoO8SMp.png"
        style="top: 1350px; right: 450px;"
      />

      <div class="reasons">
        <div class="reason" style="margin-right: 50em">
          <h1>Your free presence</h1>
          <p>Our team will provide you with a Presence of your Homepage.</p>
        </div>
        <div class="reason" style="margin-left: 50em">
          <h1>Become verified</h1>
          <p>A special role and great honor will be given to you in our Discord server.</p>
        </div>
        <div class="reason" style="margin-right: 30em">
          <h1>Meta-tag integration</h1>
          <p>Automatically enables your Presence when someone is visiting your Website.</p>
        </div>
      </div>

      <div class="requirments">
        <h1 class="rTitle">REQUIREMENTS</h1>
        <p class="rText">Which specific animal you should be</p>
        <p class="rDescription">
          We keep an out out for growing communities and exiting things around the
          internet. TL;DR you should already using PreMiD and be ready to spread it to
          even more internet freaks. Acceptance into the program is extremely qualitative
          and will vary from one candidate to the next.
        </p>

        <p class="rText">Your current online barrier</p>
        <p class="rDescription">
          We are currently accepting any kind of effort into our partnership program.
          Anyone should have the chance to be noticed. Twitch broadcasters should have at
          least 100 followers and at least 10 concurrent viewers. You must be streaming at
          least 1 time per week.
        </p>
      </div>

      <div class="button-container">
        <button type="button" class="button">Apply now!</button>
      </div>

      <p class="jobs">
        If you are rather interesed in a direct job at PreMiD, then take a look at our
        job advertisement.
      </p>

      <p class="sponsor-title text-highlight">THE GUCCI GANG</p>

      <div class="sponsor-cards">
        <Sponsor
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          :name="sponsor.name"
          :description="sponsor.description"
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
      left: {
        name: "",
        description: "",
        image: ""
      },
      middle: {
        name: "",
        description: "",
        image: ""
      },
      right: {
        name: "",
        description: "",
        image: ""
      },
      partners: [
        {
          name: "Arena of Kings",
          description:
            "Arena of Kings is a next-gen fast-paced PvP Arena Game played in the browser.",
          image: require("../assets/images/aok.jpg")
        },
        {
          name: "UpBeatRadio",
          description:
            "UpBeat is a non-profit international radio which strives to provide non-stop, quality radio and news entertainment.",
          image:
            "https://upbeatradio.net/staff/_assets/_newsImages/default.png?3"
        },
        {
          name: "iLoot",
          description: "The gamer earning platform.",
          image: require("../assets/images/iloot.png")
        }
      ],
      sponsors: [
        {
          name: "BitRock",
          description:
            "A powerful and easy to use cross platform installer creation tool.",
          image: "./sponsors/bitrock_installbuilder.png"
        },
        {
          name: "Statuspage",
          description: "Easily communicate real-time status to your users.",
          image: "./sponsors/atlassian_statuspage.svg"
        },
        {
          name: "Crowdin",
          description: "Agile localization for tech companies.",
          image: "./sponsors/crowdin.png"
        }
      ],
      currentPos: 1
    };
  },
  beforeMount() {
    this.currentPos = Math.floor(Math.random() * this.partners.length);

    this.middle.name = this.partners[this.currentPos].name;
    this.middle.description = this.partners[this.currentPos].description;
    this.middle.image = this.partners[this.currentPos].image;

    if (this.currentPos + 1 > this.partners.length - 1) {
      this.currentPos = 0;
      this.left = this.partners[this.currentPos + 1];
      this.right = this.partners[this.currentPos];
    } else if (this.currentPos - 1 < 0) {
      this.right = this.partners[this.currentPos + 1];
      this.currentPos = this.partners.length - 1;
      this.left = this.partners[this.currentPos];
    } else {
      this.left = this.partners[this.currentPos - 1];
      this.right = this.partners[this.currentPos + 1];
    }
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
  computed: {
    isLast() {
      return this.currentPos === this.partners.length - 1;
    }
  },
  methods: {
    markdown(pls) {
      if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
      return pls.match(/(\*\*.*?\*\*)/g).map((ch, i) => {
        return pls.replace(
          ch,
          `<strong><span class="text-highlight">${ch.slice(
            2,
            ch.length - 2
          )}</span></strong>`
        );
      })[0];
    },
    goPrev() {
      let lImg = this.left,
        mImg = this.middle;

      this.middle = this.right;
      this.left = mImg;
      this.right = lImg;
    },
    goNext() {
      let mImg = this.middle,
        rImg = this.right;

      this.currentPos = this.isLast
        ? 0
        : (this.currentPos = this.currentPos + 1);

      this.middle = this.left;
      this.right = mImg;
      this.left = rImg;
    },
    getIndex(n) {
      var index = this.partners.indexOf(
        this.partners.find(({ name }) => name === n)
      );

      return index;
    }
  }
};
</script>
