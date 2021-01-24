<template>
    <b-container fluid="sm">
        <header>
            <h1 class="mt-1 mb-3 p-3 bg-light border-bottom shadow-sm">Real-time search by Algolia</h1>
        </header>

        <b-row>
            <b-col>
                <ais-instant-search
                    :search-client="searchClient"
                    index-name="npm-search">
                    <ais-search-box
                        placeholder='search all of npm'
                        :show-loading-indicator="true">
                        <div
                            class="mt-1 mb-3 p-5 bg-light border-bottom shadow-sm"
                            slot-scope="{ refine }">
                            <b-form-input
                                type="search"
                                placeholder="search all of npm"
                                v-model="searchText"
                                @input="refine(searchText)">
                            </b-form-input>
                        </div>
                    </ais-search-box>

                    <ais-hits>
                        <b-row cols="1" slot-scope="{ items }">
                            <b-col
                                v-for="item in items"
                                :key="item.objectID"
                                class="mb-3">
                                <b-card
                                    border-variant="secondary"
                                    class="shadow-sm"
                                    :header="item.name">
                                    <b-row align-v="center" class="mb-3">
                                        <b-col cols="12" md="auto">
                                            <b-avatar class="mr-3" variant="info" :src="item.owner.avatar"></b-avatar>

                                            {{ item.owner.name }}
                                        </b-col>

                                        <b-col cols="auto">
                                            <b-badge class="p-2" variant="info">
                                                <b-icon class="mr-2" icon="tag-fill"></b-icon>

                                                {{ item.version }}
                                            </b-badge>
                                        </b-col>

                                        <b-col cols="auto">
                                            <b-badge class="p-2" variant="info">
                                                <b-icon icon="shield-check"></b-icon>

                                                {{ item.license }}
                                            </b-badge>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mb-3" cols="1">
                                        <b-col>
                                            {{ item.description }}
                                        </b-col>
                                    </b-row>

                                    <b-row class="mb-3" cols="1">
                                        <b-col>
                                            <b-badge
                                                v-for="(keyword, index) in item.keywords"
                                                :key="index"
                                                variant="light"
                                                class="mr-2 mb-1 p-3">{{ keyword }}
                                            </b-badge>
                                        </b-col>
                                    </b-row>

                                    <b-row cols="1">
                                        <b-col class="text-right">
                                            <b-button
                                                href="#"
                                                variant="primary"
                                                @click="showModal(item)">show further info
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>
                    </ais-hits>

                    <ais-configure
                        :hitsPerPage="10"
                    />

                    <b-row class="mb-5">
                        <b-col>
                            <ais-pagination
                                :show-first="true"
                                :show-previous="true"
                                :show-next="true"
                                :show-last="true"
                                :padding="2"
                                :total-pages="100"
                                :class-names="{
                                    'ais-Pagination': 'pagination-wrapper p-5 bg-light border-bottom shadow-sm',
                                    'ais-Pagination-list': 'pagination mb-0 justify-content-center',
                                    'ais-Pagination-item': 'page-item',
                                    'ais-Pagination-item--selected': 'active',
                                    'ais-Pagination-item--disabled': 'disabled',
                                    'ais-Pagination-link': 'page-link'
                                }"
                            />
                        </b-col>
                    </b-row>
                </ais-instant-search>
            </b-col>
        </b-row>

        <footer class="mb-5 p-5 bg-light border-bottom shadow-sm">
            <b-card no-body>
                <b-row align-v="stretch" no-gutters>
                    <b-col cols="2 d-flex bg-light border-right justify-content-center align-items-center">
                       <b-icon icon="person-fill" class="display-2"></b-icon>
                    </b-col>

                    <b-col>
                        <b-card-body title="Alexandr Andriyanov">
                            <b-card-text>
                                <p>Front End Developer | Vue.js</p>

                                <p>Kyiv, Ukraine</p>

                                <p>
                                    <a
                                        href="https://github.com/alexwertand/algolia-search"
                                        target="_blank">https://github.com/alexwertand/algolia-search
                                    </a>
                                </p>
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </footer>

        <b-modal
            ref="package-modal"
            title="Detail info about npm package"
            ok-only>
            <div class="d-block text-secondary">
                <div>
                    <b>Package's name:</b>

                    {{ modalData.name }}
                </div>

                <div>
                    <b>Owner's name:</b>

                    {{ modalData.authorName }}
                </div>

                <div>
                    <b>Created:</b>

                    {{ modalData.createdTime }}
                </div>

                <div>
                    <b>Deprecated:</b>

                    {{ modalData.deprecated }}
                </div>

                <div>
                    <b>Keywords:</b>

                    <span
                        v-for="(keyword, index) in modalData.keywords"
                        :key="index">
                        {{ keyword }}
                    </span>
                </div>

                <div>
                    <b>license:</b>

                    {{ modalData.license }}
                </div>

                <div>
                    <b>Repository link:</b>

                    {{ modalData.repositoryLink }}
                </div>

                <div>
                    <b>Package's version:</b>

                    {{ modalData.version }}
                </div>

                <div>
                    <b>Short description:</b>

                    {{ modalData.description }}
                </div>
            </div>
        </b-modal>
    </b-container>
</template>

<script>
    import algoliasearch from 'algoliasearch/lite';

    export default {
        data() {
            return {
                searchClient: algoliasearch(
                    'OFCNCOG2CU',
                    'f54e21fa3a2a0160595bb058179bfb1e'
                ),
                searchText: '',
                modalData: {}
            };
        },
        methods: {
            showModal(item) {
                console.log(item);

                this.setModalData(item);

                this.$refs['package-modal'].show();

            },
            setModalData({ created, deprecated, description, keywords, license, name, owner, repository, version} = {}) {
                let { url: repositoryLink } = repository,
                    { name: authorName }  = owner,
                    createdTime = new Date(created).toLocaleDateString("en-US");

                this.modalData = Object.assign(
                    {},
                    this.modalData,
                    { createdTime, deprecated, description, keywords, license, name, authorName, repositoryLink, version }
                );
            }
        },
    };
</script>
