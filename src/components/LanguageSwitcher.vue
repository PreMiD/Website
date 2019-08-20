<template>
    <div>
        <div class="languages-container">
            <div class="languages-list"><button href="#" @click="setLanguage(lang); $root.$data.switcherVisible = false;" :class="{'active': getCurrentLanguage() === lang}"
                    class="languages-list__item" v-for="(lang, i) in $root.i18nLanguageList"
                    :key="`Lang${i}`">{{ $t(`header.language`, lang) }}</button>
            </div>
            <a href="javascript:void(0);" @click="$root.$data.switcherVisible = false;" class="languages-container__close"><i class="fas fa-times"/></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'language-switcher'
    }

</script>
