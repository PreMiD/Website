var PresenceMixin = {
  data() {
    return {
      isInstalled: false
    };
  },
  methods: {
    sendPresence(name) {
      var event = new CustomEvent("PreMiD_AddPresence", {
        detail: name
      });
      window.dispatchEvent(event);

      this.$root.addedPresences.push(name);
      this.$data.isInstalled = true;
    },
    removePresence(name) {
      var event = new CustomEvent("PreMiD_RemovePresence", {
        detail: name
      });
      window.dispatchEvent(event);

      this.$root.addedPresences.pop(name);
      this.$data.isInstalled = false;
    },
    // This function compares the array elements that we get from Extension with `presenceName` string.
    // If it will find a presence in array it will return true.
    isPresenceInstalled(presenceName) {
      if (!this.$root.addedPresences) return false;
      return this.$root.addedPresences.find(
        p => p.toLowerCase() === presenceName.toLowerCase()
      );
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
      return hotPresencesArray.map(item => {
        return item.toLowerCase();
      });
    }
  }
};

export default PresenceMixin;
