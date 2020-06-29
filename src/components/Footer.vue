<template>
	<div class="footer">
		<div class="footer-grid">
			<div class="grid__section">
				<p class="section__title" v-text="$t(`footer.usercount.heading`)"></p>
				<div class="section__promo">
					<p v-text="$t(`footer.usercount.message`, [installStats !== null ? installStats : '...'])"></p>
					<nuxt-link class="button" replace to="/downloads" v-text="$t(`footer.usercount.button`)" />
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
			<div class="grid__section friendly">
				<p class="section__title">{{ $t("footer.followUs.heading") }}</p>
				<div class="section__promo">
					<a
						:href="`https://twitter.com/${
							twitterLocale[_i18n.locale] || 'PreMiDapp'
						}`"
						target="_blank"
						class="socials"
					>
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
					<a href="https://patreon.com/timeraa/" v-text="$t(`footer.supportus.donate`)"></a>
					<a href="https://github.com/PreMiD/" v-text="$t(`footer.supportus.contribute`)"></a>
					<a href="https://translate.premid.app/" v-text="$t(`footer.supportus.translate`)"></a>
					<a href="/jobs" v-text="$t(`footer.supportus.jobs`)"></a>
				</div>
			</div>
			<div class="grid__section friendly">
				<p class="section__title" v-text="$t(`footer.help.information`)"></p>
				<div>
					<a href="https://github.com/PreMiD/">GitHub</a>
					<nuxt-link to="/cookies" v-text="$t(`footer.help.information.cookies`)" />
					<nuxt-link to="/privacy" v-text="$t(`footer.help.information.privacy`)" />
					<nuxt-link to="/tos" v-text="$t(`footer.help.information.terms`)" />
				</div>
			</div>
			<div class="grid__section">
				<p class="section__title" v-text="$t('footer.more.heading')"></p>
				<div>
					<a href="https://discord.premid.app">Discord</a>
					<a href="https://docs.premid.app/troubleshooting/" v-text="$t(`footer.help.troubleshooting`)"></a>
					<a href="https://docs.premid.app/" v-text="$t(`footer.developers.documentation`)"></a>
					<a href="https://status.premid.app/" v-text="$t(`footer.more.status`)"></a>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<p
				v-html="
					$t('footer.copyright.line1', {
						0: `<i class=\'far fa-copyright\'></i> ${new Date().getFullYear()}  PreMiD`,
						1: `<a class='hover-effect' href='https://github.com/Timeraa/' target='_blank'>Timeraa</a>`
					})
				"
			></p>
			<p
				v-html="
					$t('footer.copyright.line2', {
						0: /*`<a class='hover-effect' href='https://iryzhenkov.ru/' target='_blank'>Voknehzyr</a> &`*/ `
				<a class='hover-effect' href='https://eggsy.codes/' target='_blank'>EGGSY</a> &
				<a class='hover-effect' href='https://github.com/TheDropX/' target='_blank'>TheDrop.</a>`
					})
				"
			></p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "@/stylesheets/variables.scss";

.footer {
	flex: 0 0 auto;
	background: transparent;
	color: white;
	padding: 20px;
	padding-top: 3.5em;

	.socials {
		i {
			width: 1em;
		}
	}

	.partner-logo {
		display: inline-block;

		img {
			width: 42px;
			margin: 2px;

			vertical-align: middle;

			transition: all 0.2s ease;

			filter: grayscale(100%);
			opacity: 0.5;
		}

		&:hover {
			img {
				filter: grayscale(0%);
				opacity: 1;
			}
		}
	}

	.partner-more {
		font-size: small;
		vertical-align: middle;
		transition: all 0.2s ease;
		opacity: 0.5;
		cursor: pointer;

		&:hover {
			opacity: 1;
		}
	}
}

.footer-copyright {
	p {
		margin: 3px;
	}

	text-align: center;
	font-size: 14px;
	font-weight: bold;
	color: lighten($background-secondary, 10%);

	.footer__language-switcher {
		color: #99aab5;
		margin-top: 2em;
	}
}

.footer-grid {
	max-width: 1600px;
	margin: 0 auto;

	display: flex;
	position: relative;
	justify-content: space-between;
	align-content: center;

	.grid__section {
		margin: 1em;
		.section__title {
			font-weight: bold;
			margin: 7px auto;
			font-size: 18px;
			color: white;
		}

		div {
			p {
				color: lighten($background-secondary, 30%);
				margin: 7px auto;
				font-weight: 600;
			}

			a:not(.partner-logo) {
				font-weight: 600;
				display: block;
				width: fit-content;
				margin: 2px 0;

				&:not(.button) {
					color: lighten($background-secondary, 30%);
					transition: color 0.2s ease;

					&:hover {
						color: lighten($background-primary, 40%);
						transition: color 0s ease;
					}
				}
			}
		}
	}
}

@media only screen and (max-width: 600px) {
	#footer .grid__section:first-child {
		margin: auto;
	}

	.footer-copyright {
		margin-top: 24px;
	}
}

@media only screen and (max-width: 600px) {
	.friendly {
		text-align: right;
		text-align: -webkit-right;
	}
}
</style>

<script>
	export default {
		data() {
			return {
				installStats: null,
				twitterLocale: {
					tr: "PreMiDapp_tr",
					az: "PreMiDapp_tr",
					de: "PreMiDapp_de",
					nl: "PreMiDapp_nl",
					pt: "PreMiDapp_pt",
					pt_BR: "PreMiDapp_pt"
				}
			};
		},
		mounted() {
			this.$graphql(
				`
				{
				science {
					users
				}
			}`
			)
				.then(data => {
					this.installStats = data.science.users
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				})
				.catch(() => this.installStats = 0);
		}
	};
</script>
