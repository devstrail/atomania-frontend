<script setup>
    import {computed} from 'vue';
    import {useField} from 'vee-validate';
    import AppInputError from '~/components/shared/inputs/AppInputError.vue';

    // Define props
    const props = defineProps({
        type: {
            type: String,
            default: 'textarea'
        },
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: ''
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        successMessage: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: false,
        },
        labelClass: {
            type: String,
            default: '',
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        formGroupClass: {
            type: String,
            default: 'mb-5'
        },
        modelValue: {}
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Define computed
    const formControlClass = computed(() => {
        return 'w-full h-[134px] px-[14px] text-[16px] leading-[24px] border rounded-[8px] placeholder:text-gray-500 text-gray-900 focus:ring-transparent focus-visible:outline-none focus:shadow-input'
    });
</script>

<template>
    <div
        :class="[
            `relative w-full group`,
            formGroupClass
        ]"
    >
        <label
            v-if="label || $slots['label']"
            :for="id"
            :class="[
                `block mb-[6px] text-b4 font-medium`,
                errorMessage ? 'text-error-600' : 'text-gray-700',
                labelClass
            ]">
            <slot name="label">
                {{ label }}
            </slot>
        </label>
        <textarea
            :id="id"
            :name="name"
            v-model="value"
            :placeholder="placeholder"
            :readonly="readOnly"
            :class="[
                formControlClass,
                readOnly ? 'text-gray-500 focus:!border-gray-300' : '',
                errorMessage ? 'border-error-600 focus:border-error-600' : 'border-gray-300 focus:border-primary-300'
            ]"
        />
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
