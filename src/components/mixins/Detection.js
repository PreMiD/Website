var DetectionMixin = {
  data() {
    return {
      extensionInstalled: false
    }
  },
  mounted() {

    if (document.getElementById("app").getAttribute("extension-ready") == "true") {
      this.$store.commit('extension/setInstalled', true);
    } else {
      this.$store.commit('extension/setInstalled', false);
    }

    if (this.$store.state.extension.extensionInstalled) {
      this.$data.extensionInstalled = true;
      this.$noty.success(this.$t(`store.message.success`));
      this.debugMessage("Extension installed, unlocking functions...");
    } else {
      this.$data.extensionInstalled = false;
      this.$noty.error(this.$t(`store.message.error`));
      this.errorMessage("Extension not found, locking functions...");
    }

    // Registering Vue hook.
    var self = this;

    // Catching response event from extension after we'll fire `PreMiD_GetPresenceList`.
    window.addEventListener("PreMiD_GetWebisteFallback", function(data) {
      var dataString = data.detail.toString().split(",");
      self.$store.commit('presences/set', dataString);
      self.debugMessage("Recieved information from Extension!");
    });

    // Firing event to get response from Extension with installed presences data.
    var event = new CustomEvent("PreMiD_GetPresenceList", {});
    window.dispatchEvent(event);
  }
};

export default DetectionMixin;
