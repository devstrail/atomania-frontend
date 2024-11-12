<script setup lang="ts">
    import Isotope from 'isotope-layout'
    import {useAuthStore, useErrorStore, useMachineStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppOrderMachineModal from '~/components/shared/AppOrderMachineModal.vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'

    /* -- Define stores -- */
    const authStore = useAuthStore()
    const errorStore = useErrorStore()
    const machineStore = useMachineStore()

    /* -- Define utils -- */
    const router = useRouter()

    const handleShowAllMachine = () => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            router.push('/marketplace')
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }

    /* -- Fetch Machines -- */
    const loading = ref(false)
    const machineTypes = computed(() => {
        const types = machineStore.machines?.slice(0, 6)?.map((machine) => machine.type)
        return ['*', ...new Set(types)]
    })
    const fetchMachines = async (payload = {}) => {
        loading.value = true
        await machineStore.fetchMachines(payload)
        loading.value = false

        initiateIsotope()
    }
    onMounted(() => {
        fetchMachines({page: 1});
    })

    /* -- Handle Isotope Filter -- */
    const container = ref<HTMLElement | null>(null)
    const isotopeInstance = ref<Isotope | null>(null)
    const activeFilter = ref('*')
    const selectedMachine = ref(null)
    const setFilter = (filter: string) => {
        activeFilter.value = filter
        nextTick(() => {
            isotopeInstance.value?.arrange({
                filter: filter === '*' ? '*' : `.${filter.replace(/\s+/g, '')}`,
            })
        })
    }
    const initiateIsotope = () => {
        nextTick(() => {
            if (container.value) {
                isotopeInstance.value = new Isotope(container.value, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows',
                    percentPosition: true,
                })
            }
        })
    }
</script>

<template>
    <section id="marketplaceSection" class="pt-10 pb-2 laptop:pt-[96px] laptop:pb-8 bg-wispy-white-25">
        <div class="container">
            <div class="flex flex-col laptop:flex-row gap-5 items-start laptop:items-center justify-between">
                <app-breadcrumb
                    class="laptop:mb-8"
                    title="Aici găsiți toate utilajele agricole de care aveți nevoie"
                    description="Sunteți la un click distanță de o experiență profesională."
                />
                <app-button
                    class="mb-5 laptop:mb-0"
                    title="Afișați toate utilajele agricole"
                    :on-click-button="() => handleShowAllMachine()"
                />
            </div>

            <div class="relative">
                <div
                    v-if="loading"
                    class="w-full h-full absolute top-0 left-0 z-10 grid place-items-center rounded-lg bg-primary-25"
                >
                    <app-spinner-loader spinner-style="w-10 h-10 text-primary-600 fill-white"/>
                </div>
                <div v-else>
                    <div
                        class="flex flex-wrap gap-3 mb-8 laptop:mb-16"
                        v-motion="{
                          initial: {
                            y: 30,
                            opacity: 0
                          },
                          visible: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 400
                            },
                          }
                        }"
                    >
                        <button
                            v-for="(type, index) in machineTypes"
                            :key="index"
                            @click="setFilter(type)"
                            :class="[
                                'py-2 px-5 text-b2 capitalize rounded-3xl border transition-all',
                                activeFilter === type ? 'bg-royal-flycatcher-crest-600 border-royal-flycatcher-crest-600 text-white' : 'text-gray-500 border-gray-200 bg-transparent',
                            ]"
                        >
                            {{ type === '*' ? 'Toate utilajele agricole' : type }}
                        </button>
                    </div>
                    <div ref="container" class="flex flex-wrap -mx-4">
                        <div
                            v-for="(machine, machineIndex) in machineStore.machines.slice(0, 6)"
                            :key="machine.id"
                            class="isotope-item w-full block tablet:w-1/2 laptop:w-1/3 px-4 mb-8 laptop:mb-16"
                            :class="`${machine.type.replace(/\s+/g, '')}`"
                        >
                            <app-machine-card
                                :machine="machine"
                                @open-order-modal="(value) => selectedMachine = value"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <app-order-machine-modal
        v-model:isOpen="machineStore.isOrderMachineModalOpen"
        :machine="selectedMachine"
    />
</template>
