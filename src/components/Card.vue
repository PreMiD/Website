<template>
    <div class="feature-cards__card">
        <p class="card__feature-icon"><i :class="icon"></i></p>
        <h3>{{ title }}</h3>
        <p class="card__desc">{{ desc }}</p>
        <p class="card__background-icon"><i :class="icon"></i></p>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: ["icon", "title", "desc"],
    };
</script>

<style lang="less" scoped>

    .feature-cards__card {
        * {
            margin: 0;
            padding: 0;
        }

        z-index: 1;
        position: relative;
        width: 440px;
        overflow: hidden;
        text-align: center;
        padding: 2em;
        background: #202225;
        border-radius: 5px;
        margin: 0 1em;
        transition: transform .2s ease,
        -webkit-transform .2s ease;

        h3 {
            font-weight: 600;
            font-size: 1.4em;
            padding-bottom: 8px;
        }

        .card__desc {
            opacity: .6;
            text-align: left;
        }

        .card__feature-icon {
            opacity: .8;
            font-size: 3em;
            padding-bottom: 0.5em;
        }

        .card__background-icon {
            position: absolute;
            overflow: hidden;
            opacity: .05;
            bottom: -70px;
            right: 0;
            transform: translate(35px, 5px);
            font-size: 14em;
        }

        &:hover {
            transform: translateY(-8px);
        }

    }
</style>
