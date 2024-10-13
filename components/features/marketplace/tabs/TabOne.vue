<script setup lang="ts">
    import {useMachineStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import MarketplaceItemsFilter from '~/components/features/marketplace/MarketplaceItemsFilter.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'
    import AppOrderMachineModal from '~/components/shared/AppOrderMachineModal.vue'
    import AppEmptyStateCard from '~/components/shared/AppEmptyStateCard.vue'
    import AppPagination from '~/components/shared/AppPagination.vue'

    /* -- Define stores -- */
    const paginationStore = usePaginationStore()
    const machineStore = useMachineStore()

    /* -- Fetch Machines -- */
    const isLoading = ref(false)
    const selectedMachine = ref(null)
    const fetchMachines = async (payload = {}) => {
        isLoading.value = true

        try {
            await machineStore.fetchMachines(payload)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            isLoading.value = false
        }
    }
    onMounted(() => {
        fetchMachines({page: 1})
    })

    /* -- Handle Filters -- */
    const handleSearch = (query: string) => {
        debouncedUpdate(query)
    }
    const debouncedUpdate = debounce(async (query: string) => {
        await paginationStore.setCurrentPage(1)
        await fetchMachines({name: query})
    }, 800)
    const handleFilter = async (payload: object) => {
        await paginationStore.setCurrentPage(1)
        await fetchMachines(payload)
    }

    /* -- Handle Pagination -- */
    const handlePageChange = (newPage) => {
        fetchMachines({page: newPage})
    }
    watch(() => paginationStore.current_page, (newPage) => {
        if (newPage !== paginationStore.current_page) {
            fetchMachines({page: newPage})
        }
    })
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Găsiți utilaje"
            title-class="!mb-2"
            description="Obțineți cel mai bun utilaj agricol disponibil în apropiere de dvs"
        />
        <marketplace-items-filter
            search-placeholder="Căutare după cuvinte cheie"
            @change:search="handleSearch"
            @change:payload="handleFilter"
        />
        <div class="relative">
            <div
                v-if="isLoading"
                class="w-full h-full min-h-[400px] grid place-items-center rounded-lg bg-primary-25"
            >
                <app-spinner-loader
                    spinner-style="w-10 h-10 text-primary-600 fill-white"
                />
            </div>
            <div
                v-else
                :class="[
                    `grid gap-8`,
                    {'laptop:grid-cols-3': machineStore.machines.length}
                ]"
            >
                <template
                    v-if="machineStore.machines.length"
                    v-for="(machine, machineIndex) in machineStore.machines"
                    :key="machine.id"
                >
                    <app-machine-card
                        :machine="machine"
                        @open-order-modal="(value) => selectedMachine = value"
                    />
                </template>
                <template v-else>
                    <app-empty-state-card/>
                </template>
            </div>
        </div>
        <app-pagination
            :current-page="paginationStore.current_page"
            :last-page="paginationStore.last_page"
            @page-change="handlePageChange"
        />
        <app-order-machine-modal
            v-model:isOpen="machineStore.isOrderMachineModalOpen"
            :machine="selectedMachine"
        />
    </div>
</template>