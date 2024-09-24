<script setup lang="ts">
    import {useAuthStore, useMachineStore} from '~/store'
    import AppButton from '~/components/shared/AppButton.vue'

    const authStore = useAuthStore()
    const machineStore = useMachineStore()
    const router = useRouter()

    const props = defineProps({
        machine: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['openOrderModal'])

    const handleViewDetails = (id) => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            router.push(`/machine/${id}`)
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }

    const handleOrderNow = (val) => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            machineStore.isOrderMachineModalOpen = true
            emit('openOrderModal', val)
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }
</script>

<template>
    <div
        class="h-full laptop:min-h-[493px] flex flex-col justify-between"
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
        <div>
            <NuxtImg
                width="384"
                height="220"
                :src="machine?.thumbnail ? machine?.thumbnail : '/images/placeholder-image.png'"
                :alt="machine?.name"
                class="mb-4 rounded-2xl"
            />
            <div class="flex items-center justify-between">
                <div class="mb-1 flex items-center gap-1">
                    <h6 class="text-royal-flycatcher-crest-500 font-semibold">
                        €{{ machine?.cost }}
                    </h6>
                    <span class="text-gray-500 text-b5">/ {{ machine?.costUnit }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <i class="dt-icon-marker-pin-03 text-b4"/>
                    <span class="text-gray-600 font-medium text-b4">
                        {{ machine?.address }}
                    </span>
                </div>
            </div>

            <h6 class="mb-2 text-gray-900 font-semibold capitalize">
                {{ machine?.name }}
            </h6>
            <!--<div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <NuxtImg
                        width="28"
                        height="28"
                        :src="machine?.author?.avatar ? machine?.author?.avatar : '/images/avatar-placeholder.svg'"
                        :alt="machine?.author?.name"
                        class="rounded-full"
                    />
                    {{ machine?.author?.name }}
                </div>
                <div class="flex items-center gap-1">
                    <i class="dt-icon-marker-pin-03 text-b4"/>
                    <span class="text-gray-600 font-medium text-b4">
                        {{ machine?.address }}
                    </span>
                </div>
            </div>-->
            <p class="mb-4 text-gray-500 text-b3 line-clamp-3 overflow-hidden">{{ machine?.description }}</p>
            <div class="mb-6 flex items-center flex-wrap gap-2">
                <!--<div class="py-1 px-3 text-gray-500 text-b5 rounded-3xl border border-gray-200">
                    {{ machine?.available_unit }} Unit Available
                </div>-->
                <template v-for="(machineConfig, machineConfigIndex) in machine?.configurations">
                    <div class="py-1 px-3 text-gray-500 text-b5 rounded-3xl border border-gray-200">
                        {{ machineConfig?.value }} {{ machineConfig?.key === 'hp' ? 'HP' : machineConfig?.key }}
                    </div>
                </template>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <app-button
                title="Vezi detalii"
                full-width
                button-color="secondary"
                :on-click-button="() => handleViewDetails(machine?.id)"
            />
            <app-button
                title="Comanda acum"
                full-width
                :on-click-button="() => handleOrderNow(machine)"
            />
        </div>
    </div>
</template>