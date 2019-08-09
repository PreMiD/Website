<template>
<div>
    <div class="language-notify__wrapper" v-bind:key="lang" v-for="lang in langs" v-if="!declined && getNavigatorLanguage() === lang && getI18nLanguage() !== lang">
        <div class="language-notify">
            <div class="language-notify__content">
                <h2>{{ $t(`header.languageNotification.title`, lang) }}</h2>
                <p>{{ $t(`header.languageNotification.text`, lang) }}</p>
            </div>
            <div class="language-notify__buttons">
                <a class="button button_small" @click="changeLanguage(lang)" href="#">{{ $t(`header.languageNotification.btnAccept`, lang) }}</a>
                <a class="button button_small" @click="declineNotify()" href="#">{{ $t(`header.languageNotification.btnDecline`, lang) }}</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'language-notification',
        data() {
            return {
                //* Define available languages here.
                langs: this.$i18n.availableLocales,
                declined: false,
            }
        },
        methods: {
            changeLanguage(lang) {
                localStorage.language = lang;
                this.setLanguage(lang);
            },
            declineNotify() {
                localStorage.declined = true;
                this.$data.declined = localStorage.declined;
            }
        },
        created() {
            if (localStorage.declined !== 'false') this.$data.declined = localStorage.declined;
        }
    }
</script>
