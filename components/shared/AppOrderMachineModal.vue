<script setup lang="ts">
    import {watch} from 'vue'
    import {showSuccessMessage} from '~/utils'
    import {useAuthStore, useMachineStore, useOrderStore} from '~/store'
    import AppModal from '~/components/shared/AppModal.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppDateInput from '~/components/shared/inputs/AppDateInput.vue'
    import AppCheckboxInput from '~/components/shared/inputs/AppCheckboxInput.vue'

    /* -- Define utils -- */
    const router = useRouter()

    /* -- Define store -- */
    const authStore = useAuthStore()
    const orderStore = useOrderStore()
    const machineStore = useMachineStore()

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        },
        machine: {}
    })

    const totalAmount = computed(() => {
        if (props.machine?.cost) {
            return props.machine?.cost * formData.quantity
        } else {
            return 0
        }
    })

    /* -- Handle Order -- */
    const loading = ref(false)
    const isAgreePrivacyPolicy = ref(false)
    const formData = reactive({
        start_date: '',
        quantity: '',
        farming_tool_id: ''
    })
    const handleConfirmOrder = async () => {
        loading.value = true

        const values = formData
        values.start_date = formatDateForBackend(values.start_date)
        values.farming_tool_id = props.machine?.id

        try {
            const response = await orderStore.storeOrder(values)

            loading.value = false

            if (response.data?.success) {
                machineStore.isOrderMachineModalOpen = false
                showSuccessMessage('Comanda plasata cu succes.')
            }
        } catch (exception) {
            console.error('Something Went Wrong!', 'error')
            loading.value = false
        }
    }

    watch(() => props.isOpen, (val) => {
        if (!val) {
            formData.start_date = '';
            formData.quantity = '';
        }
    });
</script>

<template>
    <app-modal
        max-width="max-w-[930px]"
        :is-open="isOpen"
        @update:isOpen="val => $emit('update:isOpen', val)"
    >
        <div class="text-left">
            <h6 class="mb-6 text-gray-900 font-semibold text-center">
                Calculator de prețuri
            </h6>
            <div class="max-w-[220px]">
                <app-date-input
                    label="Data începerii închirierii mașinii:"
                    label-class="!mb-2"
                    name="starting_date"
                    placeholder="Selectați datele"
                    auto-apply
                    v-model="formData.start_date"
                />
            </div>
            <div>
                <p class="block mb-2 text-gray-700 text-b4 font-medium">
                    Calculați prețul dvs.:
                </p>
                <div class="grid laptop:grid-cols-[210px_auto_340px_auto_210px] items-center justify-between mb-6">
                    <div
                        class="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-gray-200 bg-gray-25">
                        <h5 class="text-gray-700 font-semibold">€{{ machine?.cost }}</h5>
                        <p class="text-gray-700">Pe hectare</p>
                    </div>
                    <div class="grid place-items-center text-gray-900 font-semibold text-h4">X</div>
                    <input
                        type="number"
                        class="w-full max-w-full h-full py-6 px-4 text-gray-700 placeholder:text-gray-500 font-semibold text-h5 text-center rounded-xl border border-wispy-white-200 focus:border-wispy-white-700 bg-wispy-white-50 focus:ring-wispy-white-700"
                        placeholder="Intră în Hectare"
                        v-model="formData.quantity"
                    />
                    <div class="grid place-items-center text-gray-900 font-semibold text-h4">=</div>
                    <div
                        class="h-full flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-royal-flycatcher-crest-600 bg-royal-flycatcher-crest-600">
                        <h5 class="text-white font-semibold">€{{ totalAmount ? totalAmount : 0 }}</h5>
                        <!--<p class="text-white">Per Hectares</p>-->
                    </div>
                </div>
            </div>
            <div class="grid laptop:grid-cols-[auto_291px] gap-6">
                <div class="p-4 border border-gray-200 bg-gray-25 rounded-xl">
                    <p class="mb-2 text-gray-700 font-semibold">Pretul include:</p>
                    <ul class="grid laptop:grid-cols-2 gap-y-1 gap-x-4 list-disc pl-4 text-gray-500 text-b4">
                        <li>Inspecție pe teren</li>
                        <li>Toate cheltuielile pentru mașină</li>
                        <li>Analiză și consiliere experți</li>
                        <li>Operatori calificați</li>
                        <li>Livrați direct pe teren</li>
                        <li>Asigurare pentru mașină</li>
                        <li>Reparație și înlocuire rapidă</li>
                    </ul>
                </div>
                <div class="p-4 border border-creamy-avocado-400 bg-creamy-avocado-50 rounded-xl">
                    <i class="dt-icon-info-circle text-primary-600"/>
                    <p class="my-2 text-gray-700 font-medium text-b4">
                        Dacă întâmpinați orice problemă la plasarea comenzii, vă rugăm să ne contactați
                    </p>
                    <a href="tel:+440157986574" class="text-primary-600 font-semibold text-b2">+440157986574</a>
                </div>
            </div>
            <div class="mt-6 flex gap-5 flex-col laptop:flex-row items-center justify-between">
                <app-checkbox-input
                    name="isAgreePrivacyPolicy"
                    id="isAgreePrivacyPolicy"
                    label="Sunteți de acord cu politica noastră de confidențialitate prietenoasă."
                    v-model="isAgreePrivacyPolicy"
                />
                <AppButton
                    class="w-full laptop:w-[initial]"
                    title="Confirmați comanda"
                    :loading="loading"
                    :disabled="!formData.quantity || !formData.start_date || !isAgreePrivacyPolicy"
                    :on-click-button="() => handleConfirmOrder()"
                />
            </div>
        </div>
    </app-modal>
</template>

<style scoped>
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>