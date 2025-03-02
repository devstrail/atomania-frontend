<script setup lang="ts">
    import {useAuthStore, useMachineStore} from '~/store'
    import AppButton from '~/components/shared/AppButton.vue'
    import Swal from "sweetalert2";
    import AppSpinnerLoader from "~/components/shared/AppSpinnerLoader.vue";

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

    const loading = ref(false)
    const handleSaveMachine = async (id) => {
        loading.value = true

        const payload = {
            type: 'FarmingTool',
            type_id: id
        }


        const response = await machineStore.saveMachine(payload)
        loading.value = false

        if (response?.data?.success) {
            Swal.fire({
                title: 'Mașina a fost salvată cu succes!',
                icon: 'success',
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar: true
            });
        }
    }

    const handleViewDetails = (id) => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            router.push(`/machine/${id}`)
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }

    const handleOrderNow = (val, event) => {
        event.stopPropagation()

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
        class="h-full laptop:min-h-[493px] flex flex-col justify-between cursor-pointer"
        @click="handleViewDetails(machine?.id)"
    >
        <div>
            <div class="relative">
                <div
                    :style="{ backgroundImage: `url(${machine?.cover_photo ? machine?.cover_photo : '/images/placeholder-image.png'})` }"
                    class="min-h-[200px] laptop:min-h-[265px] mb-4 overflow-hidden rounded-2xl bg-cover bg-center"
                />
                <!--<button
                    type="button"
                    class="size-9 absolute top-3 right-3 grid place-items-center text-gray-700 text-b2 rounded-md bg-white"
                    @click="handleSaveMachine(machine?.id)"
                >
                    <app-spinner-loader
                        v-if="loading"
                        spinner-style="w-5 h-5 text-gray-100 fill-primary-600"
                    />
                    <i v-else class="dt-icon-bookmark-add"/>
                </button>-->
            </div>
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
            <h6 class="mb-2 text-gray-900 font-semibold capitalize line-clamp-1 overflow-hidden">
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
        <div class="grid desktop:grid-cols-2 gap-3">
            <app-button
                title="Vezi detalii"
                full-width
                button-color="secondary"
                :on-click-button="() => handleViewDetails(machine?.id)"
            />
            <app-button
                title="Închiriați acum"
                full-width
                :on-click-button="(event) => handleOrderNow(machine, event)"
            />
        </div>
    </div>
</template>