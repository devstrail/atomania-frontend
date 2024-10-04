<script setup lang="ts">
    import {experts} from '~/config'
    import {useExpertStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import MarketplaceItemsFilter from '~/components/features/marketplace/MarketplaceItemsFilter.vue'
    import AppExpertCard from '~/components/shared/AppExpertCard.vue'

    /* -- Define stores -- */
    const paginationStore = usePaginationStore()
    const expertStore = useExpertStore()

    /* -- Fetch Experts -- */
    const isLoading = ref(false)
    const fetchExperts = async (payload = {}) => {
        isLoading.value = true
        // await expertStore.fetchExperts(payload);
        isLoading.value = false
    }
    const handleFilter = (payload: object) => {
        fetchExperts(payload)
    }
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Găsiți-vă expertul în agricultură"
            title-class="!mb-2"
            description="Primiți sfaturi de la cei mai buni profesioniști. Desemnare"
        />
        <!--<marketplace-items-filter
            :searchable="false"
            :show-farm-type="false"
            :show-farm-activity="false"
            :show-machine-type="false"
            :show-designation="true"
            @change:payload="handleFilter"
        />-->
        <div class="grid laptop:grid-cols-3 gap-8">
            <template
                v-for="(expert, expertIndex) in experts"
                :key="expert.id"
            >
                <app-expert-card :expert="expert"/>
            </template>
        </div>
    </div>
</template>