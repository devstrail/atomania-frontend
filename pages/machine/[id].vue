<script setup lang="ts">
    import {useMachineStore} from '~/store'

    definePageMeta({
        middleware: 'auth'
    })

    import AppModal from '~/components/shared/AppModal.vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'
    import AppOrderMachineModal from '~/components/shared/AppOrderMachineModal.vue'

    /* -- Define stores -- */
    const machineStore = useMachineStore()

    const route = useRoute()
    const isViewMoreModalOpen = ref(false)

    /* -- Fetch Machine -- */
    const loading = ref(false)
    const findMachineById = async (id) => {
        loading.value = true
        await machineStore.getMachine(id)
        loading.value = false
    }
    onMounted(() => {
        const id = route.params.id
        findMachineById(id)
    })
</script>

<template>
    <section class="py-8 bg-white">
        <div class="container">
            <ul class="mb-6 flex items-center gap-3">
                <li>
                    <NuxtLink to="/">
                        <i class="dt-icon-home-01 text-gray-500 font-medium"/>
                    </NuxtLink>
                </li>
                <li>
                    <i class="dt-icon-chevron-right text-gray-300 font-medium"/>
                </li>
                <li>
                    <NuxtLink to="/marketplace" class="text-gray-500 font-medium text-b4">
                        Machines
                    </NuxtLink>
                </li>
                <li>
                    <i class="dt-icon-chevron-right text-gray-300"/>
                </li>
                <li class="text-primary-600 font-medium capitalize">
                    {{ machineStore.machine?.name }}
                </li>
            </ul>
            <div class="relative">
                <div
                    v-if="loading"
                    class="w-full h-full absolute top-0 left-0 z-10 grid place-items-center rounded-lg bg-primary-25"
                >
                    <app-spinner-loader spinner-style="w-10 h-10 text-primary-600 fill-white"/>
                </div>
                <div class="grid laptop:grid-cols-[488px_auto] gap-10">
                    <div
                        :style="{ backgroundImage: `url(${machineStore.machine?.thumbnail ? machineStore.machine?.thumbnail : '/images/placeholder-image.png'})` }"
                        class="min-h-[400px] laptop:min-h-[630px] overflow-hidden rounded-2xl bg-cover bg-center"
                    />
                    <div class="flex flex-col justify-between">
                        <div>
                            <p class="mb-3 text-primary-600 font-semibold capitalize">{{ machineStore.machine?.type }}</p>
                            <h4 class="mb-4 text-gray-900 font-semibold capitalize">{{ machineStore.machine?.name }}</h4>
                            <div class="mb-4 flex flex-wrap gap-2">
                                <div
                                    class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 capitalize rounded-3xl bg-creamy-avocado-100">
                                    <i class="dt-icon-marker-pin-03 text-b4"/> {{ machineStore.machine?.address }}
                                </div>
                                <div
                                    class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 capitalize rounded-3xl bg-creamy-avocado-100">
                                    <i class="dt-icon-arrow-up text-b4"/> {{ machineStore.machine?.type }}
                                </div>
                                <div
                                    class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 capitalize rounded-3xl bg-creamy-avocado-100">
                                    <i class="dt-icon-arrow-up text-b4"/> {{ machineStore.machine?.farmActivity }}
                                </div>
                            </div>
                            <!--<div class="mb-4 flex items-center gap-3">
                                <NuxtImg
                                    width="28"
                                    height="28"
                                    :src="machine?.author?.avatar"
                                    :alt="machine?.author?.name"
                                    class="rounded-full"
                                />
                                {{ machine?.author?.name }}
                            </div>-->
                            <p class="mb-3 text-gray-500 text-b1">{{ machineStore.machine?.description }}</p>
                            <!--<button
                                type="button"
                                class="inline-flex items-center gap-2 text-primary-600 font-medium text-b4"
                                @click="isViewMoreModalOpen = true"
                            >
                                View more <i class="dt-icon-chevron-down"/>
                            </button>-->
                            <div class="mt-4 grid grid-cols-2 laptop:grid-cols-4 laptop:divide-x divide-gray-200 justify-center">
                                <template v-for="(machineConfig, machineConfigIndex) in machineStore.machine?.configurations">
                                    <div class="flex flex-col items-center py-2 px-4">
                                        <h4 class="text-gray-700 font-medium gap-[2px]">
                                            {{ machineConfig?.value }}
                                        </h4>
                                        <p class="text-gray-700 uppercase">
                                            {{ machineConfig?.key }}
                                        </p>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="mt-4 flex flex-col laptop:flex-row gap-4 items-center justify-between p-2 pl-6 rounded-lg bg-royal-flycatcher-crest-50">
                            <div class="flex items-center gap-1">
                                <h4 class="text-royal-flycatcher-crest-500 font-semibold">
                                    €{{ machineStore.machine?.cost }}
                                </h4>
                                <span class="text-gray-500 text-b4">/ {{ machineStore.machine?.costUnit }}</span>
                            </div>
                            <button
                                type="button"
                                class="inline-flex py-5 px-14 text-white text-h6 font-bold bg-primary-500 hover:bg-primary-700 rounded transition-all"
                                @click="machineStore.isOrderMachineModalOpen = true"
                            >
                                Order now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <app-modal
        v-model:is-open="isViewMoreModalOpen"
        max-width="max-w-[708px]"
    >
        <div class="text-left">
            <h6 class="mb-4 text-gray-900 font-semibold capitalize">{{ machineStore.machine?.name }}</h6>
            <p class="mb-2 text-gray-500">
                The AgroMax T700 is a reliable 45 HP tractor built for medium to large farms. Its fuel-efficient engine,
                ergonomic design, and strong lifting capacity make it perfect for tilling, plowing, and transporting
                heavy loads with ease.
            </p>
            <div class="mb-2 text-gray-500">
                Powerful Engine: Tractors typically have diesel or gasoline engines that deliver substantial power for
                various tasks.
            </div>
            <div class="mb-2 text-gray-500">
                Transmission: A gearbox system allows for controlling the tractor's speed and direction.
            </div>
            <div class="mb-2 text-gray-500">
                Hydraulic System: This system is essential for operating various attachments, such as plows, loaders,
                and balers.
            </div>
            <div class="mb-2 text-gray-500">
                Three-Point Hitch: A system for attaching implements to the rear of the tractor.
            </div>
            <div class="mb-2 text-gray-500">
                Tires: Large, treaded tires provide excellent traction on different terrains
                <br/><br/>
                Plows: Used for turning soil.
                <br/><br/>
                Harrows: Used for leveling and breaking up soil.
                <br/><br/>
                Planters: Used for planting seeds.
                <br/><br/>
                Cultivators: Used for weeding and loosening soil.
            </div>
        </div>
    </app-modal>

    <app-order-machine-modal
        v-model:isOpen="machineStore.isOrderMachineModalOpen"
        :machine="machineStore.machine"
    />
</template>