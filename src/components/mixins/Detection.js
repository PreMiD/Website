var DetectionMixin = {
  methods: {
    isExtensionInstalled: () => {
      // Checking if user has the extension installed.
      if (
        document.getElementById("app").getAttribute("extension-ready") == "true"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // Vue hook to call it inside JS functions.
    var self = this;
    // Checking if user has the extension installed.
    setTimeout(function() {
      if (self.isExtensionInstalled()) {
        self.$root.extensionInstalled = true;
        self.$noty.success(self.$t(`store.message.success`));
        self.debugMessage("Extension installed, unlocking functions...");
      } else {
        self.$root.extensionInstalled = false;
        self.$noty.error(self.$t(`store.message.error`));
        self.errorMessage("Extension not found, locking functions...");
      }
    }, 1000);

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
