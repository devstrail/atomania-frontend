<script setup lang="ts">
    import AppSelectInput from '~/components/shared/inputs/AppSelectInput.vue'
    import {FARM_ACTIVITIES, FARM_TYPES, LOCATIONS, MACHINE_TYPES} from '~/config/constants'

    const props = defineProps({
        searchable: {
            type: Boolean,
            default: true
        },
        searchPlaceholder: {
            type: String,
            default: 'Search'
        },
    })

    const emit = defineEmits(['change:search', 'change:payload'])

    /* -- Handle Search -- */
    const searchQuery = ref()
    const handleSearch = async () => {
        if (!props.searchable) {
            return
        }
        emit('change:search', searchQuery.value)
    }

    /* -- Handle Filters -- */
    const filters = reactive({
        location: '',
        farm_type: '',
        farm_activity: '',
        machine_type: '',
    })
    watch(() => filters, (val) => {
        const filterPayload = {}

        filterPayload.location = val.location ? val.location : null
        filterPayload.farm_type = val.farm_type ? val.farm_type : null
        filterPayload.farm_activity = val.farm_activity ? val.farm_activity : null
        filterPayload.machine_type = val.machine_type ? val.machine_type : null

        emit('change:payload', filterPayload)
    }, {deep: true})
</script>

<template>
    <div
        class="relative z-50 flex items-center gap-4 mb-10"
        v-motion="{
          initial: {
            y: 30,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 700
            },
          }
        }"
    >
        <div class="relative">
            <i class="dt-icon-search-lg text-gray-500 text-b1 absolute top-1/2 left-[14px] -translate-y-1/2"/>
            <input
                type="search"
                class="h-[44px] pl-[42px] pr-[14px] w-full text-[16px] leading-[24px] border rounded-[8px] placeholder:text-gray-500 text-gray-900 focus:ring-transparent focus-visible:outline-none focus:shadow-input border-gray-300 focus:border-primary-300"
                :placeholder="searchPlaceholder"
                v-model="searchQuery"
                @input="handleSearch"
            />
        </div>
        <div class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="location"
                type="select"
                name="location"
                :appearance-filter="true"
                placeholder="Select Location"
                form-group-class="mb-0"
                :options="LOCATIONS?.map(location => ({ id: location?.id, value: location?.name }))"
                v-model="filters.location"
            />
        </div>
        <div class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="farm_type"
                type="select"
                name="farm_type"
                :appearance-filter="true"
                placeholder="Farm type"
                form-group-class="mb-0"
                :options="FARM_TYPES?.map(type => ({ id: type?.id, value: type?.name }))"
                v-model="filters.farm_type"
            />
        </div>
        <div class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="farm_activity"
                type="select"
                name="farm_activity"
                :appearance-filter="true"
                placeholder="Farm Activity"
                form-group-class="mb-0"
                :options="FARM_ACTIVITIES?.map(activity => ({ id: activity?.id, value: activity?.name }))"
                v-model="filters.farm_activity"
            />
        </div>
        <div class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="machine_type"
                type="select"
                name="machine_type"
                :appearance-filter="true"
                placeholder="Machine type"
                form-group-class="mb-0"
                :options="MACHINE_TYPES?.map(machine => ({ id: machine?.id, value: machine?.name }))"
                v-model="filters.machine_type"
            />
        </div>
    </div>
</template>