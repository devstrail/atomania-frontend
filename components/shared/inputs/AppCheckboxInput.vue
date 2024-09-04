<script setup>
    import {computed} from 'vue'
    import {useField} from 'vee-validate'
    import AppInputError from '~/components/shared/inputs/AppInputError.vue'

    const props = defineProps({
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        checkboxValue: {
            type: [String, Boolean],
            default: null
        },
        modelValue: {
            type: [Array, Boolean],
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inputWrapperStyle: {
            type: String,
            default: ''
        },
    })

    const emit = defineEmits(['update:modelValue', 'onChange'])

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    })

    const isChecked = computed(() => {
        if (Array.isArray(value.value)) {
            return value.value.includes(props.checkboxValue)
        }
        return !!value.value
    })

    const handleChange = () => {
        emit('onChange')
    }
</script>

<template>
    <div :class="['relative flex group', inputWrapperStyle, { 'has-error': !!errorMessage }]">
        <div class="inline-flex items-center gap-2.5">
            <input
                :id="id || name"
                v-model="value"
                :name="name"
                type="checkbox"
                :value="checkboxValue"
                :disabled="disabled"
                @change="handleChange"
                class="hidden"
            />
            <label
                :for="id || name"
                class="flex items-center cursor-pointer text-gray-700 text-b4 font-medium group"
                :class="{ 'cursor-not-allowed opacity-60': disabled }"
            >
                <span
                    class="w-5 h-5 relative mr-2 rounded border border-gray-300 flex-shrink-0 transition group-hover:bg-primary-100"
                    :class="{
                        'bg-primary-100 border-primary-600': isChecked,
                        'bg-white': !isChecked
                    }"
                >
                    <transition name="fade" mode="out-in">
                        <svg
                            v-if="isChecked"
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <path
                                d="M9 1L3.5 6.5L1 4"
                                stroke="#015345"
                                stroke-width="1.6666"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </transition>
                </span>
                {{ label }}
            </label>
        </div>
        <AppInputError :error-message="errorMessage"/>
    </div>
</template>

<style scoped>
    input[type="checkbox"]:focus + label span {
        box-shadow: 0 0 0 2px rgba(1, 83, 69, 0.2);
    }

    input[type="checkbox"]:focus:not(:focus-visible) + label span {
        box-shadow: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>