<script setup>
    import {useField} from 'vee-validate';

    // Define props
    const props = defineProps({
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
        inlineAlignment: {
            type: Boolean,
            default: true
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: () => []
        },
        listTrackBy: {
            type: String,
            default: 'id'
        },
        listValueField: {
            type: String,
            default: 'value'
        },
        inputSize: {
            type: String,
            default: 'medium'
        },
        formGroupClass: {
            type: String,
            default: 'mb-8'
        },
        activeColor: {
            type: String,
            default: 'white'
        },
        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });
</script>

<template>
    <div
        :class="[formGroupClass, { 'has-error': !!errorMessage}]"
    >
        <label v-if="label" class="block mb-2 text-b6 font-semibold text-dark capitalize">
            {{ label }}
        </label>
        <div class="inline-flex items-center p-[2px] rounded-lg bg-off-white-200">
            <div
                v-for="(option, index) in options"
            >
                <input
                    type="radio"
                    :id="`radio-${name}-${id}-${index}`"
                    :name="name"
                    :value="option[listTrackBy]"
                    class="peer hidden"
                    v-model="value"
                    @change="$emit('onChange')"
                />
                <label
                    :for="`radio-${name}-${id}-${index}`"
                    :class="[
                        `block py-[6px] px-5 text-center cursor-pointer select-none border border-off-white-200 peer-checked:border-primary rounded-lg transition`,
                        activeColor === 'white' ? 'peer-checked:text-primary peer-checked:bg-white' : 'peer-checked:text-white peer-checked:bg-primary'
                    ]"
                >
                    {{ option[listValueField] }}
                </label>
            </div>
        </div>
    </div>
</template>
