<script setup lang="ts">
    import {machines} from '~/config'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppModal from '~/components/shared/AppModal.vue'

    const route = useRoute()
    const machine = ref(null)
    const isViewMoreModalOpen = ref(false)

    const findMachineById = (id) => {
        return machines.find(machine => machine.id == id)
    }

    onMounted(() => {
        const id = route.params.id
        machine.value = findMachineById(id)
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
                <li class="text-primary-600 font-medium">
                    {{ machine?.name }}
                </li>
            </ul>
            <div class="grid laptop:grid-cols-[488px_auto] gap-10">
                <div
                    :style="{ backgroundImage: `url(${machine?.thumbnail})` }"
                    class="min-h-[400px] laptop:min-h-[630px] overflow-hidden rounded-2xl bg-cover bg-center"
                />
                <div class="flex flex-col justify-between">
                    <div>
                        <p class="mb-3 text-primary-600 font-semibold">{{ machine?.type }}</p>
                        <h4 class="mb-4 text-gray-900 font-semibold">{{ machine?.name }}</h4>
                        <div class="mb-4 flex flex-wrap gap-2">
                            <div
                                class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 rounded-3xl bg-creamy-avocado-100">
                                <i class="dt-icon-marker-pin-03 text-b4"/> {{ machine?.address }}
                            </div>
                            <div
                                class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 rounded-3xl bg-creamy-avocado-100">
                                <i class="dt-icon-arrow-up text-b4"/> {{ machine?.type }}
                            </div>
                            <div
                                class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 rounded-3xl bg-creamy-avocado-100">
                                <i class="dt-icon-arrow-up text-b4"/> Farm activity
                            </div>
                            <div
                                class="inline-flex items-center gap-1 py-1 px-3 text-primary-700 font-medium text-b5 rounded-3xl bg-creamy-avocado-100">
                                <i class="dt-icon-arrow-up text-b4"/> Machine type
                            </div>
                        </div>
                        <div class="mb-4 flex items-center gap-3">
                            <NuxtImg
                                width="28"
                                height="28"
                                :src="machine?.author?.avatar"
                                :alt="machine?.author?.name"
                                class="rounded-full"
                            />
                            {{ machine?.author?.name }}
                        </div>
                        <p class="mb-3 text-gray-500 text-b1">{{ machine?.description }}</p>
                        <button
                            type="button"
                            class="inline-flex items-center gap-2 text-primary-600 font-medium text-b4"
                            @click="isViewMoreModalOpen = true"
                        >
                            View more <i class="dt-icon-chevron-down"/>
                        </button>
                        <div class="mt-4 grid grid-cols-2 laptop:grid-cols-4 laptop:divide-x divide-gray-200 justify-center">
                            <div class="flex flex-col items-center py-2 px-4">
                                <h4 class="text-gray-700 font-medium gap-[2px]">
                                    600
                                </h4>
                                <p class="text-gray-700">
                                    Horse Power
                                </p>
                            </div>
                            <div class="flex flex-col items-center py-2 px-4">
                                <h4 class="text-gray-700 font-medium gap-[2px]">
                                    35
                                </h4>
                                <p class="text-gray-700">
                                    HA/PD
                                </p>
                            </div>
                            <div class="flex flex-col items-center py-2 px-4">
                                <h4 class="text-gray-700 font-medium gap-[2px]">
                                    2016
                                </h4>
                                <p class="text-gray-700">
                                    Production
                                </p>
                            </div>
                            <div class="flex flex-col items-center py-2 px-4">
                                <h4 class="text-gray-700 font-medium gap-[2px]">
                                    5 Years
                                </h4>
                                <p class="text-gray-700">
                                    In service
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col laptop:flex-row gap-4 items-center justify-between p-2 pl-6 rounded-lg bg-royal-flycatcher-crest-50">
                        <div class="flex items-center gap-1">
                            <h4 class="text-royal-flycatcher-crest-500 font-semibold">
                                €{{ machine?.cost }}
                            </h4>
                            <span class="text-gray-500 text-b4">/ {{ machine?.cost_unit }}</span>
                        </div>
                        <button
                            type="button"
                            class="inline-flex py-5 px-14 text-white text-h6 font-bold bg-primary-500 hover:bg-primary-700 rounded transition-all"
                        >
                            Order now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <app-modal v-model:is-open="isViewMoreModalOpen" max-width="max-w-[708px]">
        <div class="text-left">
            <h6 class="mb-4 text-gray-900 font-semibold">{{ machine?.name }}</h6>
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
</template>