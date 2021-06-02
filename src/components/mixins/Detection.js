var DetectionMixin = {
	data() {
		return {
			extensionInstalled: true
		};
	},
	async mounted() {
		// Liked presences initialization:
		this.$store.commit("presences/initializeLikedPresences", localStorage);

		const Checker = new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(
					document.getElementById("app").getAttribute("extension-ready") ==
						"true"
				);
			}, 500);
		});

		await Checker.then(result => {
			if (result) {
				this.$store.commit("extension/setInstalled", true);
			} else {
				this.$store.commit("extension/setInstalled", false);
			}
		});

		if (this.$store.state.extension.extensionInstalled) {
			this.extensionInstalled = true;
			this.debugMessage(
				"Extension installed, unlocking functions... [1st try]"
			);
		} else {
			this.extensionInstalled = false;
			this.errorMessage("Extension not found, locking functions... [1st try]");
		}

		// Catching response event from extension after we'll fire `PreMiD_GetPresenceList`.
		window.addEventListener("PreMiD_GetWebisteFallback", data => {
			this.$store.commit("presences/set", data.detail.toString().split(","));
			this.debugMessage("Recieved information from Extension!");

			//* Changing the DOM doesn't always work. If we will get this data - it means that Extension is installed.
			if (!this.$store.state.extension.extensionInstalled) {
				this.$store.commit("extension/setInstalled", true);
				this.extensionInstalled = true;
				this.debugMessage(
					"Extension installed, unlocking functions... [2nd try]"
				);
			}
		});
		// Firing event to get response from Extension with installed presences data.
		window.dispatchEvent(new CustomEvent("PreMiD_GetPresenceList", {}));
	}
};

export default DetectionMixin;
