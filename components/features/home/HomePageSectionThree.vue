<script setup lang="ts">
    import Isotope from 'isotope-layout'
    import {machines} from '~/config'
    import {useAuthStore, useMachineStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppOrderMachineModal from "~/components/shared/AppOrderMachineModal.vue";

    // Define stores
    const authStore = useAuthStore()
    const machineStore = useMachineStore()

    const router = useRouter()
    const container = ref<HTMLElement | null>(null)
    const isotopeInstance = ref<Isotope | null>(null)
    const activeFilter = ref('*')
    const selectedMachine = ref(null)

    // Extract unique machine types for dynamic filter buttons
    const machineTypes = computed(() => {
        const types = machines.map((machine) => machine.type)
        return ['*', ...new Set(types)]
    })

    // Set the active filter and rearrange the Isotope layout
    const setFilter = (filter: string) => {
        activeFilter.value = filter
        nextTick(() => {
            isotopeInstance.value?.arrange({
                filter: filter === '*' ? '*' : `.${filter.replace(/\s+/g, '')}`,
            })
        })
    }

    // Initialize Isotope after component is mounted
    onMounted(() => {
        nextTick(() => {
            if (container.value) {
                isotopeInstance.value = new Isotope(container.value, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows',
                    percentPosition: true,
                })
            }
        })
    })

    const handleShowAllMachine = () => {
        if (authStore.type === 2) {
            router.push('/marketplace')
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }
</script>

<template>
    <section id="marketplaceSection" class="pt-10 pb-2 laptop:pt-[96px] laptop:pb-8 bg-wispy-white-25">
        <div class="container">
            <div class="flex gap-5 items-center justify-between">
                <app-breadcrumb
                    class="mb-8"
                    title="Find machines"
                    description="All machines are available to us."
                />
                <app-button
                    title="Show all machine"
                    :on-click-button="() => handleShowAllMachine()"
                />
            </div>

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
                        'py-2 px-5 text-b2 rounded-3xl border transition-all',
                        activeFilter === type ? 'bg-royal-flycatcher-crest-600 border-royal-flycatcher-crest-600 text-white' : 'text-gray-500 border-gray-200 bg-transparent',
                    ]"
                >
                    {{ type === '*' ? 'All Machine' : type }}
                </button>
            </div>

            <!-- Isotope Flexbox Container -->
            <div ref="container" class="flex flex-wrap -mx-4">
                <div
                    v-for="(machine, machineIndex) in machines"
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
    </section>

    <app-order-machine-modal
        v-model:isOpen="machineStore.isOrderMachineModalOpen"
        :machine="selectedMachine"
    />
</template>
