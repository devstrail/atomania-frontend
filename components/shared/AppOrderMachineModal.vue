<script setup lang="ts">
    import {useMachineStore} from '~/store'
    import AppModal from '~/components/shared/AppModal.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppDateInput from "~/components/shared/inputs/AppDateInput.vue";
    import AppCheckboxInput from "~/components/shared/inputs/AppCheckboxInput.vue";
    import {watch} from "vue";

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        },
        machine: {}
    })

    const machineStore = useMachineStore()
    const router = useRouter()

    const totalAmount = computed(() => {
        if (props.machine?.cost) {
            return props.machine?.cost * formData.hector
        } else {
            return 0
        }
    })

    /* -- Handle Order -- */
    const isAgreePrivacyPolicy = ref(false)
    const formData = reactive({
        starting_date: '',
        hector: ''
    })
    const handleConfirmOrder = (): void => {
        machineStore.isOrderMachineModalOpen = false
    }

    watch(() => props.isOpen, (val) => {
        if (!val) {
            formData.starting_date = '';
            formData.hector = '';
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
                Pricing Calculator
            </h6>
            <div class="max-w-[220px]">
                <app-date-input
                    label="Machine rent starting date:"
                    label-class="!mb-2"
                    name="starting_date"
                    placeholder="Select dates"
                    auto-apply
                    v-model="formData.starting_date"
                />
            </div>
            <div>
                <p class="block mb-2 text-gray-700 text-b4 font-medium">
                    Calculate your price:
                </p>
                <div class="grid laptop:grid-cols-[210px_auto_340px_auto_210px] items-center justify-between mb-6">
                    <div
                        class="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-gray-200 bg-gray-25">
                        <h5 class="text-gray-700 font-semibold">€{{ machine?.cost }}</h5>
                        <p class="text-gray-700">Per Hectares</p>
                    </div>
                    <div class="grid place-items-center text-gray-900 font-semibold text-h4">X</div>
                    <input
                        type="number"
                        class="max-w-full h-full py-6 px-4 text-gray-700 placeholder:text-gray-500 font-semibold text-h5 text-center rounded-xl border border-wispy-white-200 focus:border-wispy-white-700 bg-wispy-white-50 focus:ring-wispy-white-700"
                        placeholder="Enter Hectares"
                        v-model="formData.hector"
                    />
                    <div class="grid place-items-center text-gray-900 font-semibold text-h4">=</div>
                    <div
                        class="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-royal-flycatcher-crest-600 bg-royal-flycatcher-crest-600">
                        <h5 class="text-white font-semibold">€{{ totalAmount ? totalAmount : 0 }}</h5>
                        <p class="text-white">Per Hectares</p>
                    </div>
                </div>
            </div>
            <div class="grid laptop:grid-cols-[auto_291px] gap-6">
                <div class="p-4 border border-gray-200 bg-gray-25 rounded-xl">
                    <p class="mb-2 text-gray-700 font-semibold">Price Includes:</p>
                    <ul class="grid laptop:grid-cols-2 gap-y-1 gap-x-4 list-disc pl-4 text-gray-500 text-b4">
                        <li>Inspection on field</li>
                        <li>All expenses for the machine</li>
                        <li> Expert analysis and advise</li>
                        <li>Skilled Operators</li>
                        <li>Deliver directly to the field</li>
                        <li>Insurance for the machine</li>
                        <li> Fast repairing and replacement</li>
                    </ul>
                </div>
                <div class="p-4 border border-creamy-avocado-400 bg-creamy-avocado-50 rounded-xl">
                    <i class="dt-icon-info-circle text-primary-600"/>
                    <p class="my-2 text-gray-700 font-medium text-b4">
                        If you face any problem to place order please contact with us
                    </p>
                    <a href="tel:+440157986574" class="text-primary-600 font-semibold text-b2">+440157986574</a>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
                <app-checkbox-input
                    name="isAgreePrivacyPolicy"
                    id="isAgreePrivacyPolicy"
                    label="You agree to our friendly privacy policy."
                    v-model="isAgreePrivacyPolicy"
                />
                <AppButton
                    title="Confirm Order"
                    :disabled="!formData.hector || !isAgreePrivacyPolicy"
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