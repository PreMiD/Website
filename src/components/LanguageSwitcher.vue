<template>
    <div>
        <div class="languages-container">
            <div class="languages-list"><a href="#" @click="changeLanguage(lang)" :class="{'active': currentLanguage === lang}"
                    class="languages-list__item" v-for="(lang, i) in langs"
                    :key="`Lang${i}`">{{ $t(`header.language`, lang) }}</a>
            </div>
            <a href="javascript:void(0);" @click="$parent.switcherVisible = false;" class="languages-container__close"><i class="fas fa-times"/></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'language-switcher',
        data() {
            return {
                currentLanguage: localStorage.language,
                langs: this.$i18n.availableLocales
            }
        },
        methods: {
            changeLanguage(lang) {
                this.$parent.switcherVisible = false;
                
                this.setLanguage(lang);
                this.$data.currentLanguage = localStorage.language;
            }
        }
    }

</script>
