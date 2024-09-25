<script setup lang="ts">
    import {drones} from '~/config'
    import {useDroneStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppDroneCard from '~/components/shared/AppDroneCard.vue'

    /* -- Define stores -- */
    const paginationStore = usePaginationStore()
    const droneStore = useDroneStore()

    /* -- Fetch Drones -- */
    const isLoading = ref(false)
    const fetchDrones = async (payload = {}) => {
        isLoading.value = true
        // await droneStore.fetchDrones(payload)
        isLoading.value = false
    }
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Găsește-ți drona agricolă"
            title-class="!mb-2"
            description="Avem toate cele mai bune drone din țară."
        />
        <div class="grid laptop:grid-cols-3 gap-8">
            <template
                v-for="(drone, droneIndex) in drones"
                :key="drone.id"
            >
                <app-drone-card class="!bg-gray-50" :drone="drone"/>
            </template>
        </div>
    </div>
</template>