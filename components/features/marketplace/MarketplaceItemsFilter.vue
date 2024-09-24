<script setup lang="ts">
    import {useMachineStore} from '~/store'
    import AppSelectInput from '~/components/shared/inputs/AppSelectInput.vue'

    /* -- Define stores -- */
    const machineStore = useMachineStore()

    const props = defineProps({
        searchable: {
            type: Boolean,
            default: true
        },
        searchPlaceholder: {
            type: String,
            default: 'Search'
        },
        showLocation: {
            type: Boolean,
            default: true
        },
        showFarmType: {
            type: Boolean,
            default: true
        },
        showFarmActivity: {
            type: Boolean,
            default: true
        },
        showMachineType: {
            type: Boolean,
            default: true
        },
        showDesignation: {
            type: Boolean,
            default: false
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
        address: '',
        type: '',
        farmType: '',
        farmActivity: '',
        // designation: '',
    })
    const hasActiveFilters = computed(() => {
        return filters.address || filters.type || filters.farmType || filters.farmActivity
    })
    const resetFilters = () => {
        filters.address = ''
        filters.type = ''
        filters.farmType = ''
        filters.farmActivity = ''
        searchQuery.value = ''

        // emit('change:payload', {
        //     address: null,
        //     type: null,
        //     farmType: null,
        //     farmActivity: null,
        // });
    }
    watch(() => filters, (val) => {
        const filterPayload = {}

        filterPayload.address = val.address ? val.address : null
        filterPayload.type = val.type ? val.type : null
        filterPayload.farmType = val.farmType ? val.farmType : null
        filterPayload.farmActivity = val.farmActivity ? val.farmActivity : null
        // filterPayload.designation = val.designation ? val.designation : null

        emit('change:payload', filterPayload)
    }, {deep: true})
</script>

<template>
    <div
        class="relative z-10 flex flex-wrap laptop:flex-nowrap items-center gap-4 mb-10"
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
        <div v-if="searchable" class="relative">
            <i class="dt-icon-search-lg text-gray-500 text-b1 absolute top-1/2 left-[14px] -translate-y-1/2"/>
            <input
                type="search"
                class="h-[44px] pl-[42px] pr-[14px] w-full text-[16px] leading-[24px] border rounded-[8px] placeholder:text-gray-500 text-gray-900 focus:ring-transparent focus-visible:outline-none focus:shadow-input border-gray-300 focus:border-primary-300"
                :placeholder="searchPlaceholder"
                v-model="searchQuery"
                @input="handleSearch"
            />
        </div>
        <div v-if="showLocation" class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="address"
                type="select"
                name="address"
                :appearance-filter="true"
                placeholder="Select Location"
                form-group-class="mb-0"
                :options="machineStore?.filters?.address?.map(location => ({ id: location, value: location }))"
                v-model="filters.address"
            />
        </div>
        <div v-if="showMachineType" class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="type"
                type="select"
                name="type"
                :appearance-filter="true"
                placeholder="Machine Type"
                form-group-class="mb-0"
                :options="machineStore?.filters?.type?.map(type => ({ id: type, value: type }))"
                v-model="filters.type"
            />
        </div>
        <div v-if="showFarmType" class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="farmType"
                type="select"
                name="farmType"
                :appearance-filter="true"
                placeholder="Farm Type"
                form-group-class="mb-0"
                :options="machineStore?.filters?.farmType?.map(type => ({ id: type, value: type }))"
                v-model="filters.farmType"
            />
        </div>
        <div v-if="showFarmActivity" class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="farmActivity"
                type="select"
                name="farmActivity"
                :appearance-filter="true"
                placeholder="Farm Activity"
                form-group-class="mb-0"
                :options="machineStore?.filters?.farmActivity?.map(activity => ({ id: activity, value: activity }))"
                v-model="filters.farmActivity"
            />
        </div>
        <!--<div v-if="showDesignation" class="w-full laptop:max-w-[195px]">
            <app-select-input
                id="designation"
                type="select"
                name="designation"
                :appearance-filter="true"
                placeholder="Designation"
                form-group-class="mb-0"
                :options="EXPERT_DESIGNATIONS?.map(designation => ({ id: designation?.id, value: designation?.name }))"
                v-model="filters.designation"
            />
        </div>-->
        <button
            v-if="hasActiveFilters"
            type="button"
            class="flex gap-2 items-center py-2 px-4 text-error-600 font-medium text-b4 rounded-3xl bg-error-100"
            @click="resetFilters"
        >
            <i class="dt-icon-x-close"/> Reset
        </button>
    </div>
</template>