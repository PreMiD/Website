<template>
	<section>
		<div class="store-grid">
			<div class="store-grid__sidebar store-menu">
				<p class="sidebar__subheader">{{ $t("store.header.search") }}</p>
				<div class="store-menu__searchbar-container">
					<input
						v-model="presenceSearch"
						ref="search"
						@keydown="searchHandle"
						@click="typing = true"
						type="text"
						class="searchbar"
						:placeholder="$t('store.search')"
					/>

					<span
						v-if="filters.tag.enabled"
						v-tippy="{ content: $t('store.search.removeFilter') }"
						@click="removeFilter('tag')"
						>tag:</span
					>
					<span
						v-if="filters.author.enabled"
						v-tippy="{ content: $t('store.search.removeFilter') }"
						@click="removeFilter('author')"
						>author:</span
					>

					<transition name="card-animation" mode="out-in">
						<div
							v-if="
								typing &&
									filters.author.enabled == false &&
									filters.tag.enabled == false
							"
							class="searchSuggestions"
						>
							<div
								@click="
									filters.tag.enabled = true;
									setSearchStyle();
								"
								class="filterBox"
							>
								<span>tag</span>
								<span>{{ $t("store.search.filters") }}</span>
							</div>
							<div
								@click="
									filters.author.enabled = true;
									setSearchStyle();
								"
								class="filterBox"
							>
								<span>author</span>
								<span>{{ $t("store.search.filters") }}</span>
							</div>
						</div>
					</transition>
				</div>

				<p class="sidebar__subheader">
					{{ $t("store.category.filters.heading") }}
				</p>

				<div class="checkbox-switcher">
					<label>
						<input
							type="checkbox"
							:checked="mostUsed"
							@change="mostUsed = !mostUsed"
						/>
						<span ref="checkbox" class="checkbox-container"></span>
						<p>{{ $t("store.category.filters.mostUsed") }}</p>
					</label>
				</div>

				<div class="checkbox-switcher">
					<label>
						<input type="checkbox" :checked="nsfw" @change="nsfw = !nsfw" />
						<span ref="checkbox" class="checkbox-container"></span>
						<p>{{ $t("store.category.filters.allowAdult") }}</p>
					</label>
				</div>

				<p class="sidebar__subheader">{{ $t("store.category.heading") }}</p>
				<div class="container">
					<div class="category-container">
						<nuxt-link
							class="category-item"
							:class="{ 'nuxt-link-exact-active': currentCategory == 'all' }"
							:to="{ query: { page: currentPageNumber, category: 'all' } }"
						>
							<i :class="'fas fa-map'"></i>
							{{ $t("store.category.all") }}
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'anime' } }"
						>
							<i class="fa-star fas"></i>
							Anime
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'games' } }"
						>
							<i class="fa-leaf fas"></i>
							{{ $t("store.category.games") }}
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'music' } }"
						>
							<i class="fa-music fas"></i>
							{{ $t("store.category.music") }}
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'socials' } }"
						>
							<i class="fa-comments fas"></i>
							{{ $t("store.category.socials") }}
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'videos' } }"
						>
							<i class="fa-play fas"></i>
							{{ $t("store.category.videos") }}
						</nuxt-link>
						<nuxt-link
							class="category-item"
							:to="{ query: { page: currentPageNumber, category: 'other' } }"
						>
							<i class="fa-box fas"></i>
							{{ $t("store.category.other") }}
						</nuxt-link>
					</div>
				</div>
			</div>

			<div class="store-grid__content">
				<h1 v-if="filteredPresences.length <= 0" class="heading">
					{{ $t("store.search.notFound") }}
					<i class="fa-sad-tear fas"></i>
				</h1>
				<div class="presence-container">
					<StoreCard
						v-for="presence in paginatedData"
						:key="presence.service"
						:presence="presence"
						:hot="hotPresences.includes(presence.service)"
					/>
				</div>
			</div>
		</div>

		<paginate
			v-model="currentPageNumber"
			container-class="pagination-container"
			:no-li-surround="true"
			break-view-link-class="hidden"
			page-link-class="button--pagination"
			:page-count="pageCount"
			:page-range="5"
			:click-handler="paginationEvent"
			prev-text
			next-text
			page-class="page-item"
		>
			<span slot="breakViewContent"></span>
		</paginate>
	</section>
</template>

<script>
	import StoreCard from "./../components/StoreCard.vue";
	import Pagination from "./../components/Pagination.vue";

	import axios from "axios";

	export default {
		name: "Store",
		components: {
			StoreCard,
			Pagination
		},
		auth: false,
		async asyncData() {
			const usage = (await axios(`${process.env.apiBase}/usage`)).data.users,
				presenceRanking = (await axios(`${process.env.apiBase}/presenceUsage`))
					.data,
				presencesList = (await axios(`${process.env.apiBase}/presences`)).data;

			//! This code must be deleted after API will be updated
			//! to have presence usage count inside the returned data already.
			for (var presence in presenceRanking) {
				let score = presenceRanking[presence];
				presencesList.some((element, index) => {
					// Setting zero score for all presences.
					if (!element.metadata.usage) presencesList[index].metadata.usage = 0;
					// Setting presence usage score based on the API's results.
					if (
						element.metadata.service.toLowerCase() == presence.toLowerCase()
					) {
						presencesList[index].metadata.usage = score;
						return true;
					} else return false;
				});
			}

			return {
				presences: presencesList,
				topPresences: presenceRanking,
				hotPresences: Object.keys(presenceRanking)
					.map((k, i) => {
						if ((presenceRanking[k] / usage) * 100 > 5) return k;
						else false;
					})
					.filter(p => p)
			};
		},
		data() {
			return {
				presences: [],
				addedPresences: [],
				nsfw: false,
				mostUsed: true,
				presenceSearch: "",
				presencesPerPage: 12,
				filters: {
					tag: { enabled: false, padding: 50 },
					author: { enabled: false, padding: 75 }
				},
				typing: false
			};
		},
		computed: {
			currentCategory() {
				return this.$route.query.category ? this.$route.query.category : "all";
			},
			filteredPresences() {
				return this.$data.presences
					.filter(presence => {
						if (this.$data.filters.tag.enabled == true)
							return presence.tags.includes(this.presenceSearch);
						else if (this.$data.filters.author.enabled == true)
							return (
								presence.author.name
									.toLowerCase()
									.includes(this.presenceSearch.toLowerCase()) ||
								presence.author.id.includes(this.presenceSearch)
							);
						else
							return presence.service
								.toLowerCase()
								.includes(this.presenceSearch.toLowerCase());
					})
					.filter(presence =>
						this.$data.nsfw ? true : !presence.tags.includes("nsfw")
					)
					.filter(presence => {
						if (this.currentCategory == "all") {
							return presence;
						} else {
							return presence.category == this.currentCategory;
						}
					})
					.sort((a, b) => a.service.localeCompare(b.service))
					.sort((a, b) => {
						if (this.$data.mostUsed) {
							return b.usage - a.usage;
						}
					});
			},
			currentPageNumber: {
				get() {
					if (Number(this.$route.query.page)) {
						if (this.pageCount < this.$route.query.page) {
							return 1;
						} else {
							return Number(this.$route.query.page);
						}
					} else {
						return 1;
					}
				},
				set(val) {
					return val;
				}
			},
			pageCount() {
				let length = this.filteredPresences.length,
					size = this.$data.presencesPerPage;

				return Math.ceil(length / size);
			},
			paginatedData() {
				let start = (this.currentPageNumber - 1) * this.$data.presencesPerPage,
					end = start + this.$data.presencesPerPage;
				return this.filteredPresences.slice(start, end);
			}
		},
		created() {
			let self = this;
			// Requesting presences data from our API and adding it into our Vue data.

			this.$data.presences = this.$data.presences.sort((a, b) =>
				a.name.localeCompare(b.name)
			);

			this.$data.presences = this.$data.presences.map(
				presence => presence.metadata
			);

			if (
				this.pageCount < Number(this.$route.query.page) ||
				this.$route.query.page <= -1
			) {
				this.$nuxt.error({
					statusCode: 404,
					message: "No presences available."
				});
			}
		},
		mounted() {
			const query =
				this.$route.query.q ||
				this.$route.query.query ||
				this.$route.query.search;

			query ? (this.$data.presenceSearch = query.replace(/\+/g, " ")) : false;

			// For search suggestions removal
			this.$el.addEventListener("click", evt => {
				evt.target.className != "searchbar" ? (this.typing = false) : false;
			});
		},
		methods: {
			setSearchStyle() {
				let padding = 10;

				for (let key in this.$data.filters) {
					this.$data.filters[key].enabled === true
						? (padding = this.$data.filters[key].padding)
						: false;
				}

				this.$refs.search.style.paddingLeft = `${padding}px`;
				return true;
			},
			searchHandle(evt) {
				if (!this.$data.presenceSearch) this.typing = false;

				if (
					this.$data.presenceSearch == "" &&
					evt.key.toLowerCase() == "backspace"
				) {
					for (let key in this.$data.filters)
						this.$data.filters[key].enabled = false;
					this.setSearchStyle();
				} else if (evt.key.toLowerCase() != "backspace") {
					this.typing = true;
					const handles = Object.keys(this.$data.filters);

					if (handles.indexOf(this.$data.presenceSearch) !== -1) {
						for (let key in this.$data.filters) {
							key == this.$data.presenceSearch
								? (this.$data.filters[key].enabled = true)
								: (this.$data.filters[key].enabled = false);
						}

						this.$data.presenceSearch = this.$data.presenceSearch.replace(
							this.$data.presenceSearch,
							""
						);

						this.setSearchStyle();
					}
				}
			},
			removeFilter(filter) {
				this.$data.filters[filter].enabled = false;
				this.setSearchStyle();
				return true;
			},
			paginationEvent(pageNumber) {
				this.$router.push({
					query: {
						page: pageNumber,
						category: this.currentCategory
					}
				});
			}
		},
		head() {
			return {
				title: "Store"
			};
		}
	};
</script>

<style lang="scss">
	@import "./../stylesheets/variables.scss";

	.store-menu__searchbar-container {
		span {
			position: absolute;
			margin: 2px;
			background-color: #191b24;
			padding: 2.5px 5px;
			border-radius: 4px;
			cursor: pointer;
		}

		.searchSuggestions {
			font-size: small;
			z-index: 999;
			min-height: 60px;
			position: absolute;
			margin: 2.5em 0;
			background-color: #191b24;
			max-width: 85%;
			border-bottom-right-radius: 4px;
			border-bottom-left-radius: 4px;
			width: 100%;
			box-shadow: 0px 1px teal;

			span {
				position: unset;
				width: 100%;
			}

			.filterBox {
				width: 100%;
				display: inline-flex;

				span:nth-child(1) {
					float: left;
					text-align: left;
				}

				span:nth-child(2) {
					float: right;
					text-align: right;
				}
			}
		}

		display: flex;

		button,
		.button {
			&:not(:last-child),
			&:not(:first-child) {
				border-radius: 0 0 0 0;
			}

			display: inline-block;
			padding: 0.09rem 10px;
			font-size: 14px;
			line-height: 25px;
			font-weight: bold;
		}
	}

	.fa-search {
		position: absolute;
		margin-left: 0.6rem;
		color: #74787c;
	}
</style>
