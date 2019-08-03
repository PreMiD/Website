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
      this.$data.submitted = true;
    }
  }
};
</script>
