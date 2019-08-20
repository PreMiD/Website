var PresenceMixin = {
  data() {
    return {
      isInstalled: false,
    };
  },
  methods: {
    sendPresence(name) {
      this.debugMessage("Trying to add " + name + "...");

      var event = new CustomEvent("PreMiD_AddPresence", {
        detail: name,
      });
      window.dispatchEvent(event);

      this.$root.presenceList.push(name);
      this.$data.isInstalled = true;
    },
    removePresence(name) {
      this.debugMessage("Trying to remove " + name + "...");

      var event = new CustomEvent("PreMiD_RemovePresence", {
        detail: name,
      });
      window.dispatchEvent(event);

      this.$root.presenceList.pop(name);
      this.$data.isInstalled = false;
    },
    // This function compares the array elements that we get from Extension with `presenceName` string.
    // If it will find a presence in array it will return true.
    isPresenceInstalled(presenceName) {
      var array = this.$root.presenceList;

      for (let element of array) {
        if (element.toLowerCase() == presenceName.toLowerCase()) {
          return true;
        }
      }

      return false;
    },
    getInstalledPresences() {
      return this.$root.presenceList;
    },
    getHotPresences() {
      var hotPresencesArray = [
        "YouTube",
        "YouTube Music",
        "Twitch",
        "Twitter",
        "SoundCloud",
        "GitHub",
        "Dream Animes"
      ];
      return hotPresencesArray.map((item) => {return item.toLowerCase()});
    },
  },
};

export default PresenceMixin;
