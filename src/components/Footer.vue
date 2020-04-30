<template>
	<div id="footer">
		<div class="footer-grid">
			<div class="grid__section">
				<p class="section__title" v-text="$t(`footer.usercount.heading`)"></p>
				<div class="section__promo">
					<p v-text="$t(`footer.usercount.message`, [$data.installStats])"></p>
					<nuxt-link
						class="button"
						replace
						to="/downloads"
						v-text="$t(`footer.usercount.button`)"
					/>
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title">
					{{ $t("footer.partners.heading") }}
					<i
						class="fas fa-external-link-square-alt partner-more"
						@click="$router.push('/partners')"
						v-tippy="{ content: $t('footer.partners.more') }"
					></i>
				</p>
				<div class="section__promo">
					<a class="partner-logo" href="https://installbuilder.bitrock.com/">
						<img src="~/assets/images/bitrock_installbuilder.png" />
					</a>
					<a class="partner-logo" href="https://statuspage.io/">
						<img src="~/assets/images/atlassian_statuspage.svg" />
					</a>
					<a class="partner-logo" href="https://www.crowdin.com/">
						<img src="~/assets/images/crowdin.png" />
					</a>
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title">
					{{ $t("footer.socials.heading") }}
				</p>
				<div class="section__promo">
					<a href="https://twitter.com/PreMiDApp" target="_blank" class="socials">
						<i class="fab fa-twitter"></i> Twitter
					</a>
					<a href="https://facebook.com/PreMiDApp" target="_blank" class="socials">
						<i class="fab fa-facebook-square"></i> Facebook
					</a>
					<a href="https://instagram.com/PreMiDapp" target="_blank" class="socials">
						<i class="fab fa-instagram"></i> Instagram
					</a>
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title" v-text="$t(`footer.supportus.heading`)"></p>
				<div>
					<a
						href="https://patreon.com/timeraa/"
						v-text="$t(`footer.supportus.donate`)"
					></a>
					<a
						href="https://github.com/PreMiD/"
						v-text="$t(`footer.supportus.contribute`)"
					></a>
					<a
						href="https://translate.premid.app/"
						v-text="$t(`footer.supportus.translate`)"
					></a>
					<a href="/jobs" v-text="$t(`footer.supportus.jobs`)"></a>
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title" v-text="$t(`footer.help.information`)"></p>
				<div>
					<a href="https://github.com/PreMiD/">GitHub</a>
					<nuxt-link
						to="/cookies"
						v-text="$t(`footer.help.information.cookies`)"
					/>
					<nuxt-link
						to="/privacy"
						v-text="$t(`footer.help.information.privacy`)"
					/>
					<nuxt-link to="/tos" v-text="$t(`footer.help.information.terms`)" />
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title" v-text="$t('footer.more.heading')"></p>
				<div>
					<a href="https://discord.premid.app">Discord</a>
					<a
						href="https://docs.premid.app/troubleshooting/"
						v-text="$t(`footer.help.troubleshooting`)"
					></a>
					<a
						href="https://docs.premid.app/"
						v-text="$t(`footer.developers.documentation`)"
					></a>
					<a
						href="https://status.premid.app/"
						v-text="$t(`footer.more.status`)"
					></a>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<p
				v-html="
					$t('footer.copyright.line1', {
						0: `<i class=\'far fa-copyright\'></i> ${new Date().getFullYear()}  PreMiD`,
						1: `<a class='hover-effect' href='https://github.com/Timeraa/' target='_blank'>Timeraa</a> & <a class='hover-effect' href='https://github.com/Fruxh/' target='_blank'>Fruxh</a>`
					})
				"
			></p>
			<p
				v-html="
					$t('footer.copyright.line2', {
						0: `<a class='hover-effect' href='https://iryzhenkov.ru/' target='_blank'>Voknehzyr</a> &
				<a class='hover-effect' href='https://eggsy.codes/' target='_blank'>EGGSY</a> &
				<a class='hover-effect' href='https://github.com/TheDropX/' target='_blank'>TheDrop.</a>`
					})
				"
			></p>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		data() {
			return {
				installStats: 0
			};
		},
		mounted() {
			let self = this;

			axios(`${process.env.apiBase}/usage`).then(({ data }) => {
				self.$data.installStats = data.users
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			});
		}
	};
</script>
