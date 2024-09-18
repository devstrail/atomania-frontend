<script setup lang="ts">
    import {machines} from '~/config'
    import {useMachineStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import MarketplaceItemsFilter from '~/components/features/marketplace/MarketplaceItemsFilter.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'

    /* -- Define stores -- */
    const paginationStore = usePaginationStore()
    const machineStore = useMachineStore()

    /* -- Fetch Machines -- */
    const isLoading = ref(false)
    const fetchMachines = async (payload = {}) => {
        isLoading.value = true
        await machineStore.fetchMachines(payload);
        isLoading.value = false
    }
    const handleSearch = (query: string) => {
        debouncedUpdate(query)
    }
    const debouncedUpdate = debounce(async (query: string) => {
        await paginationStore.setCurrentPage(1)
        await fetchMachines({query: query})
    }, 800)
    const handleFilter = (payload: object) => {
        fetchMachines(payload)
    }

    onMounted(() => {
        fetchMachines();
    })
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Find your machines"
            title-class="!mb-2"
            description="We have all the best farming machine in country"
        />
        <marketplace-items-filter
            search-placeholder="Search machine"
            @change:search="handleSearch"
            @change:payload="handleFilter"
        />
        <div class="grid laptop:grid-cols-3 gap-8">
            <template
                v-for="(machine, machineIndex) in machines"
                :key="machine.id"
            >
                <app-machine-card :machine="machine"/>
            </template>
        </div>
    </div>
</template>