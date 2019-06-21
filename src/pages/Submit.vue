<template>
    <div class="main">
        <center v-if="!submitted">
            <p>Author</p>
            <input class="entry name" placeholder="Name" v-on:input="update('name')">
            <br>
            <input class="entry discord" placeholder="DiscordID" v-on:input="update('discord')">
            <p>Source</p>
            <input class="entry source" placeholder="Gist Link" v-on:input="update('source')">
            <br>
            <div class="notes_back"><textarea class="entry notes" placeholder="Notes" cols="40" rows="5" v-on:input="update('notes')"></textarea></div>

            <br>
            <button class="submit" v-on:click="submit()">Submit</button>
        </center>
        <center v-if="submitted">
            <h2>Sent!</h2>
        </center>
    </div>
</template>

<script>
export default {
  name: "submit",
  data() {
    return {
      submition: {
        author: {
          discordID: "223238938716798978",
          name: "Timeraa"
        },
        source: {
          type: "github",
          user: "Timeraa",
          id: "f95c06d49eff2e88fd46733b6b61eacf"
        },
        notes: "Foo Bar"
      },
      submitted: false
    };
  },
  methods: {
    update(src) {
      let value = document.body.getElementsByClassName(src)[0].value;

      if (src == "name") this.$data.submition.author.name = value;
      if (src == "discord") this.$data.submition.author.discordID = value;
      if (src == "source") {
        this.$data.submition.source.type = "github";
        this.$data.submition.source.user = "foo";
        this.$data.submition.source.id = value;
      }
      if (src == "notes") this.$data.submition.notes = value;
    },
    submit() {
      console.log(this.$data.submition);
      this.$data.submitted = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../stylesheets/colors.less";

.main {
  height: 75%;
  overflow: scroll;
}

p {
  font-weight: bold;
}

.entry {
  border: none;
  background: @background-secondary;
  color: @accent-primary;
  padding: 0.8rem;
  border-radius: 2rem;
  width: 18rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  &::placeholder {
    color: @accent-secondary;
  }
  &:focus {
    outline: none;
    border: none;
  }
  &.source {
    margin-bottom: 2rem;
  }
  &.notes {
    resize: none;
    width: 25rem;
    height: 5rem;
    background: transparent;
  }
}
.notes_back {
  width: 25rem;
  height: 5rem;
  border-radius: 0.6rem;
  background: @background-secondary;
}

.submit {
  padding: 0.6rem;
  border: none;
  background: @accent-primary;
  color: @background-secondary;
  border-radius: 0.3rem;
  font-weight: bold;
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0.2rem 0.2rem rgba(255, 255, 255, 0.15);
  }
}
</style>
