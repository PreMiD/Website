var PresenceMixin = {
	data() {
		return {
			isInstalled: false,
			presencesInstalled: []
		};
	},
	methods: {
		sendPresence(name) {
			var event = new CustomEvent("PreMiD_AddPresence", {
				detail: name
			});
			window.dispatchEvent(event);

			this.$store.commit("presences/add", name);
			this.isInstalled = true;
		},
		removePresence(name) {
			var event = new CustomEvent("PreMiD_RemovePresence", {
				detail: name
			});
			window.dispatchEvent(event);

			this.$store.commit("presences/remove", name);
			this.isInstalled = false;
		},
		//TODO: Needs recoding due to big ammount of useless code.
		// This function compares the array elements that we get from Extension with `presenceName` string.
		// If it will find a presence in array it will return true.
		async isPresenceInstalled(presenceName) {
			return new Promise((resolve, reject) => {
				this.$store
					.dispatch("presences/getPresences")
					.then(presenceList => {
						if (!presenceList) {
							return false;
						} else {
							return Array.from(presenceList).find(
								p => p.toLowerCase() == presenceName.toLowerCase()
							);
						}
					})
					.then(response => {
						if (!response) return resolve(false);
						if (response.toLowerCase() == presenceName.toLowerCase())
							return resolve(true);
					});
			});
		},
		getInstalledPresences() {
			return this.$root.presenceList;
		}
	}
};

export default PresenceMixin;
