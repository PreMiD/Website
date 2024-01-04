<template>
	<section v-if="!$fetchState.pending">
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
						v-if="filters.url.enabled"
						v-tippy="{ content: $t('store.search.removeFilter') }"
						@click="
							removeFilter('url');
							$refs.search.focus();
						"
						>url:</span
					>
					<span
						v-if="filters.tag.enabled"
						v-tippy="{ content: $t('store.search.removeFilter') }"
						@click="
							removeFilter('tag');
							$refs.search.focus();
						"
						>tag:</span
					>
					<span
						v-if="filters.author.enabled"
						v-tippy="{ content: $t('store.search.removeFilter') }"
						@click="
							removeFilter('author');
							$refs.search.focus();
						"
						>author:</span
					>

					<transition name="card-animation" mode="out-in">
						<div
							v-if="
								typing &&
								filters.author.enabled == false &&
								filters.url.enabled == false
							"
							class="searchSuggestions"
						>
							<div
								@click="
									filters.url.enabled = true;
									$refs.search.focus();
									setSearchStyle();
								"
								class="filterBox"
							>
								<span>url</span>
								<span>{{ $t("store.search.filters") }}</span>
							</div>
							<div
								@click="
									filters.tag.enabled = true;
									$refs.search.focus();
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
									$refs.search.focus();
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
						<input type="checkbox" v-model="mostUsed" />
						<span ref="checkbox" class="checkbox-container"></span>
						<span class="title">
							{{ $t("store.category.filters.mostUsed") }}
						</span>
					</label>
				</div>

				<div
					class="checkbox-switcher"
					v-if="
						$store.state.extension.extensionInstalled &&
						addedPresences.length > 0
					"
				>
					<label>
						<input type="checkbox" v-model="showAdded" />
						<span ref="checkbox" class="checkbox-container"></span>
						<span class="title">{{ $t("store.filters.added") }}</span>
					</label>
				</div>

				<div class="checkbox-switcher">
					<label>
						<input type="checkbox" v-model="nsfw" />
						<span ref="checkbox" class="checkbox-container"></span>
						<span class="title">
							{{ $t("store.category.filters.allowAdult") }}
						</span>
					</label>
				</div>

				<div class="checkbox-switcher">
					<label>
						<input type="checkbox" v-model="filterLiked" />
						<span ref="checkbox" class="checkbox-container"></span>
						<span class="title">
							{{ $t("store.category.filters.likedOnly") }}
						</span>
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

			<div class="store-grid__content" v-if="!$fetchState.error">
				<div class="presence-container" v-if="filteredPresences.length">
					<StoreCard
						v-for="presence in paginatedData"
						:key="presence.metadata.service"
						:presence="presence.metadata"
						:altnamesSearch="presenceSearch"
						:hot="
							hotPresences.filter(
								p => p.metadata.service === presence.metadata.service
							).length > 0
						"
						:partner="
							partners.filter(p => p.storeName == presence.metadata.service)
								.length
						"
					/>
				</div>
				<div class="presence-container" id="error" v-else>
					<h1 class="heading text-highlight">
						{{ $t("store.search.notFound") }}
						<i class="fa-sad-tear fas"></i>
					</h1>
				</div>
			</div>
			<div v-else class="store-grid__content">
				<div
					class="presence-container"
					style="display: block !important; padding: 2rem 0"
					id="error"
				>
					<h1 class="errorHeading">Well, that's unfortunate...</h1>
					<h2 class="errorText">
						We were unable to load the Presence Store data... Please try again
						later
					</h2>
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
	export default {
		name: "Store",
		auth: false,
		head: {
			title: "Store"
		},
	async fetch() {
/* 		if(process.browser)
			this.$nuxt.$loading.start(); */

			const { presences, partners, science } = await this.$graphql(
				`
					{
						presences {
							metadata {
								author {
									name
									id
								}
								altnames
								logo
								thumbnail
								service
								color
								url
								warning
								tags
								description
								button
								category
							}
							users
						}
						partners {
							storeName
						}
						science {
							users
						}
					}`
			);

			let usage = science.users;

			this.presences = presences;
			this.topPresences = presences.sort((a, b) => b.users - a.users) || [];
			this.partners = partners;
			this.hotPresences = presences.filter(p => {
				if ((p.users / usage) * 100 > 5) return p;
			});

			/* if(process.browser)
				this.$nuxt.$loading.finish(); */
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
		data() {
			return {
				presences: [],
				addedPresences: [],
				topPresences: [],
				partners: [],
				hotPresences: [],
				nsfw: false,
				mostUsed: true,
				showAdded: true,
				filterLiked: false,
				presenceSearch: "",
				presencesPerPage: 12,
				filters: {
					url: { enabled: false, padding: 45 },
					tag: { enabled: false, padding: 50 },
					author: { enabled: false, padding: 75 }
				},
				typing: false
			};
		},
		computed: {
			currentCategory() {
				return this.$route.query.category || "all";
			},
			filteredPresences() {
				if (!this.presences) return [];
				return this.presences
					.filter(presence => {
						if (this.filters.url.enabled == true)
							return (
								(Array.isArray(presence.metadata.url) &&
									presence.metadata.url.filter(url =>
										url
											.toLowerCase()
											.includes(this.presenceSearch.toLowerCase())
									).length > 0) ||
								(typeof presence.metadata.url == "string" &&
									presence.metadata.url
										.toLowerCase()
										.includes(this.presenceSearch.toLowerCase()))
							);
						else if (this.filters.author.enabled == true)
							return (
								presence.metadata.author.name
									.toLowerCase()
									.includes(this.presenceSearch.toLowerCase()) ||
								presence.metadata.author.id.includes(this.presenceSearch)
							);
						else if (this.filters.tag.enabled == true)
							return Array.isArray(presence.metadata.tags)
								? presence.metadata.tags.filter(tag =>
										tag
											.toLowerCase()
											.includes(this.presenceSearch.toLowerCase())
								  ).length > 0
								: false;
						else if (
							!this.showAdded &&
							(presence.metadata.service
								.toLowerCase()
								.includes(this.presenceSearch.toLowerCase()) ||
								(Array.isArray(presence.metadata.altnames) &&
									presence.metadata.altnames.filter(altname =>
										altname
											.toLowerCase()
											.includes(this.presenceSearch.toLowerCase())
									).length > 0))
						)
							return !this.addedPresences.includes(presence.metadata.service);
						else
							return (
								presence.metadata.service
									.toLowerCase()
									.includes(this.presenceSearch.toLowerCase()) ||
								(Array.isArray(presence.metadata.tags) &&
									presence.metadata.tags.filter(tag =>
										tag
											.toLowerCase()
											.includes(this.presenceSearch.toLowerCase())
									).length > 0) ||
								(Array.isArray(presence.metadata.altnames) &&
									presence.metadata.altnames.filter(altname =>
										altname
											.toLowerCase()
											.includes(this.presenceSearch.toLowerCase())
									).length > 0)
							);
					})
					.filter(presence =>
						this.nsfw ? true : !presence.metadata.tags.includes("nsfw")
					)
					.filter(presence =>
						this.filterLiked &&
						this.$store.state.presences.likedPresences.includes(
							presence.metadata.service
						)
							? true
							: !this.filterLiked
					)
					.filter(presence => {
						if (this.currentCategory === "all") {
							return presence.metadata;
						} else {
							return presence.metadata.category == this.currentCategory;
						}
					})
					.sort((a, b) => a.metadata.service.localeCompare(b.metadata.service))
					.sort((a, b) => {
						if (this.mostUsed) {
							return b.users - a.users;
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
					size = this.presencesPerPage;

				return Math.ceil(length / size);
			},
			paginatedData() {
				let start = (this.currentPageNumber - 1) * this.presencesPerPage,
					end = start + this.presencesPerPage;
				return this.filteredPresences.slice(start, end);
			}
		},
		watch: {
			"$store.state.presences.addedPresences": function () {
				this.addedPresences = this.$store.state.presences.addedPresences;
			}
		},
		mounted() {
			const query =
				this.$route.query.q ||
				this.$route.query.query ||
				this.$route.query.search;

			if (query) {
				this.presenceSearch = query
					.replace("author:", "author ")
					.replace("url:", "url ")
					.replace("tag:", "tag ")
					.replace(/\+/g, " ");

				this.searchHandle(null, false);
			}

			// For search suggestions removal
			this.listener = this.$el.addEventListener("click", evt => {
				evt.target.className != "searchbar" ? (this.typing = false) : false;
			});
		},
		beforeDestroy() {
			this.$el.removeEventListener("click", this.listener);
			if (this.interval) clearInterval(this.interval);
		},
		methods: {
			setSearchStyle() {
				let padding = 10;

				for (let key in this.filters) {
					this.filters[key].enabled === true
						? (padding = this.filters[key].padding)
						: false;
				}

				this.$refs.search.style.paddingLeft = `${padding}px`;
				return true;
			},
			searchHandle(evt, typing) {
				const presenceSearch = this.presenceSearch.trim();

				if (!presenceSearch) this.typing = false;

				if (
					evt &&
					presenceSearch == "" &&
					evt.key.toLowerCase() == "backspace"
				) {
					for (let key in this.filters) this.filters[key].enabled = false;
					this.setSearchStyle();
				} else if (!evt || evt.key.toLowerCase() != "backspace") {
					this.typing = typing != "undefined" ? typing : true;
					const handles = Object.keys(this.filters);

					if (handles.indexOf(presenceSearch.split(" ")[0]) !== -1) {
						evt.preventDefault();
						for (let key in this.filters) {
							key == presenceSearch.split(" ")[0]
								? (this.filters[key].enabled = true)
								: (this.filters[key].enabled = false);
						}

						this.presenceSearch =
							presenceSearch
								.split(" ")[0]
								.replace(presenceSearch.split(" ")[0], "") +
							presenceSearch.split(" ").slice(1);

						this.setSearchStyle();
					}
				}
			},
			removeFilter(filter) {
				this.filters[filter].enabled = false;
				this.setSearchStyle();
				return true;
			},
			paginationEvent(pageNumber) {
				this.$router.replace({
					query: {
						page: pageNumber,
						category: this.currentCategory
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	@import "../../stylesheets/variables.scss";

	.store-menu__searchbar-container {
		position: relative;

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
			position: absolute;
			background-color: #191b24;
			border-bottom-right-radius: 4px;
			border-bottom-left-radius: 4px;
			box-shadow: 0px 1px teal;
			width: -webkit-fill-available;
			width: -moz-available;
			margin-top: 2.5em;

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
