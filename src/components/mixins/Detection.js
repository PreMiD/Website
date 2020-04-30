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
			this.$data.extensionInstalled = true;
			this.debugMessage("Extension installed, unlocking functions...");
		} else {
			this.$data.extensionInstalled = false;
			this.errorMessage("Extension not found, locking functions...");
		}

		// Catching response event from extension after we'll fire `PreMiD_GetPresenceList`.
		window.addEventListener("PreMiD_GetWebisteFallback", data => {
			this.$store.commit("presences/set", data.detail.toString().split(","));
			this.debugMessage("Recieved information from Extension!");
		});

		// Firing event to get response from Extension with installed presences data.
		window.dispatchEvent(new CustomEvent("PreMiD_GetPresenceList", {}));
	}
};

export default DetectionMixin;
