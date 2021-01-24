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
                            slot-scope="{ currentRefinement, isSearchStalled, refine }">
                            <b-form-input
                                type="search"
                                class="asdasd"
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
                                                <b-icon icon="tag-fill"></b-icon>

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
                    <!-- <ais-pagination
                        :show-first="true"
                        :show-previous="true"
                        :show-next="true"
                        :show-last="true"
                        :padding="2"
                        :total-pages="100"
                    /> -->


                    <b-row class="mb-3">
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
                                    'ais-Pagination-list': 'pagination mb-0',
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

        <footer>
            
        </footer>

        <b-modal ref="package-modal" title="Detail info about npm package">
            <div class="d-block text-center">
                <h3>Hello From My Modal!</h3>
            </div>

            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
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
                searchText: ''
            };
        },
        methods: {
            showModal(item) {
                this.$refs['package-modal'].show();

                console.log(item);
            },
            hideModal() {
                this.$refs['package-modal'].hide();
            },
        },
    };
</script>
