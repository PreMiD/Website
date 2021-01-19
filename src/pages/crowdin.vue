<template>
	<div class="main">
		<div class="box">
			<div class="header">
				<div v-if="$route.query.success == 'true'">
					<h1 class="text-highlight">Account linked to Crowdin</h1>
					<div class="images">
						<img src="~/assets/images/pmd_logo.png" id="premid" />
						<h1 class="text-highlight" id="plus">+</h1>
						<img src="~/assets/images/crowdin.png" id="crowdin" />
					</div>
				</div>
				<div v-else class="text">
					<h1 class="text-highlight" v-text="$route.query.error" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Crowdin",
		head() {
			if (
				Object.keys(this.$route.query).length === 0 ||
				this.$route.query.success === null ||
				this.$route.query.success?.length === 0 ||
				this.$route.query.error === null ||
				this.$route.query.error?.length === 0
			)
				return this.$router.push({ path: "/" });

			return {
				title: this.$route.query.error
					? this.$route.query.error.replace(".", "")
					: "Account Linked"
			};
		}
	};
</script>

<style lang="scss">
	.content {
		display: flex;
		justify-content: center;
	}
</style>

<style lang="scss" scoped>
	.main {
		display: flex;
		justify-content: center;
		align-items: center;

		.box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 500px;
			height: 225px;
			background-color: #070d11;
			border-radius: 5px;
			padding: 1em;

			.header {
				h1 {
					text-align: center;
				}

				.images {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 0 3em;

					#plus {
						margin: 0;
						padding: 0;
						text-align: center;
						font-size: 2.5em;
					}

					#crowdin {
						width: 140px;
						float: right;
					}

					#premid {
						width: 115px;
						float: left;
					}
				}
			}
		}
	}
</style>
