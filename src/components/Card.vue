<template>
    <div class="feature-cards__card">
        <div class="items-centered">
            <!-- <p class="card__feature-icon"><i :class="icon"></i></p> -->
            <h3>{{ title }}</h3>
            <p class="card__desc">{{ desc }}</p>
        </div>
        <div :class="`card__background card-theme_${theme}`" v-if="image !== undefined"><img :src="image"></div>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: {
            title: String,
            icon: String,
            desc: String,
            theme: {
                default: 'default',
                type: String
            },
            image: String,
        }
    };

</script>
