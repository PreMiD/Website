<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="limage small">
				<img src="../assets/images/pmd_logo2.png" />
				<div class="bottomText"></div>
			</div>
			<div class="modal-container small" style="background-color: #23272a;">
				<div class="modal-header">
					<h1>{{ $t("jobs.guild.required") }}</h1>
				</div>

				<div class="modal-body">
					<p>
						{{ $t("jobs.guild.explanation") }}
					</p>
				</div>
				<div class="modal-footer">
					<div class="buttons">
						<button type="button" class="button" @click="join()">
							{{ $t("jobs.modal.buttons.join") }}
						</button>
						<button type="button" class="button" @click="$emit('close')">
							{{ $t("jobs.modal.buttons.cancel") }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "JoinServer",
		methods: {
			join() {
				window.open("https://discord.premid.app/");
				this.$emit("close");
			}
		}
	};
</script>
