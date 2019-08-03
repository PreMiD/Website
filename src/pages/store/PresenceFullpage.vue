<template>
    <div>
        <title>PreMiD -
            {{ presenceData.service }}</title>
        <transition name="fade" mode="in-out">
            <div class="fullpresence-container">
                <div class="fullpresence__header" :style="`background-image: url('${presenceData.thumbnail}')`">
                    <div class="header__title">
                        <h1 class="presence-name">{{ presenceData.service }} <span>
                                <svg width="32" height="32" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" :title="`${$t('store.cards.verified')}.`" v-tippy
                                    class="fullpresence__verified" :style="`fill: ${presenceData.color}`">
                                    <g>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M10.0004 17.9551C10.0859 17.9614 10.1667 17.9642 10.2413 17.9634C11.0085 17.8521 11.8843 17.635 12.2814 17.2112C12.606 16.8648 12.8945 16.4383 13.0053 16C13.9884 16.7219 15.6293 16.4558 16.5 15.5267C17.3313 14.6396 16.8177 13.307 16.5 12.5C16.7653 12.3701 17.0421 12.1311 17.2608 11.8977C17.7709 11.3533 18.0169 10.7074 18 10.0001C18.0169 9.29273 17.7709 8.64677 17.2608 8.10244C17.0421 7.86902 16.7653 7.63005 16.5 7.50012C16.8177 6.69311 17.3313 5.36053 16.5 4.47341C15.6293 3.54432 13.9884 3.27818 13.0053 4.00012C12.8945 3.56179 12.606 3.13535 12.2814 2.78891C11.8843 2.36516 11.0072 2.10302 10.24 2.02092C10.1657 1.99098 10.0851 1.99373 10 2C9.90258 1.99364 9.81486 1.99085 9.74004 1.99163C9.11145 2.1173 8.10554 2.37692 7.71945 2.78891C7.3948 3.13535 7.10628 3.56179 6.99552 4.00012C6.01242 3.27818 4.37149 3.54432 3.50082 4.47341C2.66947 5.36053 3.18311 6.69311 3.50082 7.50012C3.23547 7.63005 2.95876 7.86902 2.74001 8.10244C2.2299 8.64677 1.9839 9.29273 2.00082 10.0001C1.9839 10.7074 2.2299 11.3533 2.74001 11.8977C2.95876 12.1311 3.23547 12.3701 3.50082 12.5C3.18311 13.307 2.66947 14.6396 3.50082 15.5267C4.37149 16.4558 6.01242 16.7219 6.99552 16C7.10628 16.4383 7.3948 16.8648 7.71945 17.2112C8.10554 17.6232 9.11273 17.8379 9.74133 17.9269C9.81592 17.9642 9.90334 17.9614 10.0004 17.9551Z" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M10.3011 19.9998C10.2079 20.0008 10.1068 19.9973 10 19.9894C9.87867 19.9973 9.76941 20.0008 9.67616 19.9541C8.89046 19.8426 7.63153 19.5738 7.14895 19.0579C6.74315 18.6241 6.38252 18.0901 6.24408 17.5413C5.01527 18.4453 2.96422 18.112 1.87593 16.9486C0.836797 15.8378 1.47881 14.1691 1.87593 13.1586C1.54426 12.9959 1.19838 12.6967 0.924969 12.4044C0.287363 11.7228 -0.0201294 10.9139 0.00102082 10.0282C-0.0201294 9.14251 0.287363 8.33365 0.924969 7.65204C1.19838 7.35975 1.54426 7.06052 1.87593 6.89783C1.47881 5.88729 0.836797 4.21866 1.87593 3.10781C2.96422 1.94442 5.01527 1.61116 6.24408 2.51517C6.38252 1.9663 6.74315 1.43231 7.14895 0.998511C7.63153 0.482616 8.88885 0.15753 9.67456 0.000158C9.76808 -0.000811949 9.87772 0.00268415 9.99949 0.0106399C10.1059 0.00279555 10.2066 -0.00064766 10.2995 0.0368403C11.2584 0.139641 12.3547 0.467897 12.8511 0.998511C13.2569 1.43231 13.6175 1.9663 13.7559 2.51517C14.9847 1.61116 17.0358 1.94442 18.1241 3.10781C19.1632 4.21866 18.5212 5.88729 18.1241 6.89783C18.4557 7.06052 18.8016 7.35975 19.075 7.65204C19.7126 8.33365 20.0201 9.14251 19.999 10.0282C20.0201 10.9139 19.7126 11.7228 19.075 12.4044C18.8016 12.6967 18.4557 12.9959 18.1241 13.1586C18.5212 14.1691 19.1632 15.8378 18.1241 16.9486C17.0358 18.112 14.9847 18.4453 13.7559 17.5413C13.6175 18.0901 13.2569 18.6241 12.8511 19.0579C12.3547 19.5885 11.26 19.8604 10.3011 19.9998ZM13.8643 7.79521L8.84275 12.8168L8.83231 12.8275L8.82159 12.8379L8.80031 12.8592C8.61231 13.0472 8.30931 13.0472 8.12231 12.8592C8.10846 12.8454 8.09563 12.831 8.08382 12.816L6.15231 10.8835C5.94931 10.6805 5.94931 10.3515 6.15231 10.1475C6.35531 9.94451 6.68431 9.94451 6.88831 10.1475L8.52304 11.7814L13.1863 7.11721C13.3743 6.93121 13.6773 6.93121 13.8643 7.11721C14.0513 7.30421 14.0513 7.60721 13.8643 7.79521Z"
                                            fill="white" />
                                    </g>
                                </svg>
                            </span></h1>
                        <div class="fullpresence__gradient"
                            :style="`background: linear-gradient(135deg, ${presenceData.color} 0%, black 100%);`"></div>
                    </div>
                    <div class="header__buttons">
                        <button v-if="!isInstalled && this.$root.extension_installed && typeof presenceData.button == 'undefined'" class="button button_light"
                            v-on:click="sendPresence(presenceData.service)">
                            <span class="icon">
                                <i class="fas fa-plus"></i>
                            </span>
                            {{ $t('store.card.presence.add') }}
                        </button>
                        <button v-if="isInstalled" class="button button_black"
                            v-on:click="removePresence(presenceData.service)">
                            <span class="icon">
                                <i class="fas fa-minus"></i>
                            </span>
                            {{ $t('store.card.presence.remove') }}
                        </button>
                        <!-- TODO: Implement like system. <a class="button button_large button_red button_like"><i class="far fa-heart"/></a> -->
                    </div>
                </div>
                <div class="fullpresence__content">
                    <div class="content__description">
                        <h2 class="content__title">{{ $t('presence.sections.description.title') }}</h2>
                        <div class="description-container" v-html="presenceData.description" />
                    </div>
                    <div class="content__info">
                        <h2 class="content__title">{{ $t('presence.sections.information.title') }}</h2>
                        <ul class="info__sections">
                            <li>
                                <p><i class="fas fa-user" /> {{ $t('presence.sections.information.author') }}:
                                    <router-link class="author-name" :style="`color: ${presenceAuthor.roleColor};`"
                                        :to="`/users/${presenceAuthor.userID}`"><img :src="presenceAuthor.avatar"
                                            class="author-avatar"> {{ presenceAuthor.name }}</router-link>
                                </p>
                            </li>
                            <li v-if="presenceData.version !== undefined">
                                <p><i class="fas fa-code-branch" /> {{ $t('presence.sections.information.version') }}:
                                    <span class="presence-version"><b>{{ presenceData.version }}</b></span></p>
                            </li>
                            <li v-if="presenceData.tags !== undefined">
                                <p><i class="fas fa-hashtag" /> {{ $t('presence.sections.information.tags') }}: <a
                                        v-bind:key="tag" v-for="(tag, index) of presenceData.tags"
                                        :style="`background: ${presenceData.color};`"
                                        class="label label_tag">{{tag}}</a></p>
                            </li>
                            <!-- <li>
                                <p><i class="fas fa-heart" /> Likes: <span :style="`background: ${presenceData.color};`"
                                        class="label label_tag">36</span></p>
                            </li> -->
                            <li>
                                <p><i class="fas fa-external-link-square-alt" />
                                    {{ $t('presence.sections.information.supportedurls') }}: <span
                                        class="presence-url"><a
                                            :href="'https://' + presenceData.url">{{ presenceData.url }}</a></span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from "axios";
    const marked = require('marked');

    import Loading from "../../components/Loading";
    import {
        setTimeout
    } from 'timers';

    export default {
        name: "presencePage",
        components: {
            Loading
        },
        data() {
            return {
                presenceData: [],
                presenceAuthor: [],
                processing: false,
                isInstalled: false
            };
        },
        created() {
            let Vue = this;

            this.$parent.isProcessing = true;

            axios(
                    `https://api.premid.app/v2/presences/${this.$route.params.presenceName}`
                )
                .then((res) => {
                    Vue.$data.presenceData = res.data.metadata;
                    if (this.isPresenceInstalled(Vue.$data.presenceData.service)) {
                        Vue.$data.isInstalled = true;
                    }
                }).catch((error) => {
                    console.error(error);
                    Vue.$router.push({
                        path: '/store'
                    });
                    return false;
                }).finally(() => {
                    axios(
                            `https://raw.githubusercontent.com/PreMiD/Presences/master/${this.$route.params.presenceName}/README.md`
                        )
                        .then((res) => {
                            Vue.$data.presenceData.description = marked(res.data);
                        }).catch((error) => {
                            if (error.response.status == 404)
                                return;
                            Vue.errorMessage(error);
                        }).finally(() => {
                            axios(`https://api.premid.app/credits/${Vue.$data.presenceData.author.id}`).then((
                                res) => {
                                Vue.$data.presenceAuthor = res.data;
                            }).finally(() => {
                                Vue.$parent.isProcessing = false;
                            });
                        });
                });
        },
        methods: {
            sendPresence(name) {
                this.debugMessage("Trying to add " + name + "...");

                var event = new CustomEvent("PreMiD_AddPresence", {
                    detail: name
                });
                window.dispatchEvent(event);

                this.$root.presences_installed.push(name);
                this.$data.isInstalled = true;
            },
            removePresence(name) {
                this.debugMessage("Trying to remove " + name + "...");

                var event = new CustomEvent("PreMiD_RemovePresence", {
                    detail: name
                });
                window.dispatchEvent(event);

                this.$root.presences_installed.pop(name);
                this.$data.isInstalled = false;
            },
            // This function compares the array elements that we get from Extension with `presenceName` string.
            // If we find presence in array we return true.
            isPresenceInstalled(presenceName) {
                var presences = this.$root.presences_installed;

                for (let presence of presences) {
                    if (presence.toLowerCase() == presenceName.toLowerCase()) {
                        return true;
                    }
                }
                return false;
            }
        }
    };

</script>
