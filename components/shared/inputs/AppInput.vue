<script setup>
    import {computed, nextTick, ref, watch} from 'vue'
    import {useField} from 'vee-validate'
    import AppInputError from '~/components/shared/inputs/AppInputError.vue'

    // Define props
    const props = defineProps({
        type: {
            type: String,
            default: 'text'
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
            default: 'Type here'
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
        inlineAlignment: {
            type: Boolean,
            default: true
        },
        showErrorMessage: {
            type: Boolean,
            default: true
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        inputSize: {
            type: String,
            default: 'medium'
        },
        formGroupClass: {
            type: String,
            default: 'mb-5'
        },
        menuPosition: {
            type: String,
            default: 'left'
        },
        dropdownMenuIcon: {
            type: String,
            default: 'icon-sort-down-regular'
        },
        inputIcon: {
            type: String,
            default: null
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Data
    const passwordType = ref(props.type);
    const phoneInputElementRef = ref(null);

    // Define computed
    const formControlSizeClass = computed(() => {
        if (props.inputSize === 'small') {
            return 'h-[36px] px-2.5 py-1.5'
        } else {
            return `${props.type === 'textarea' ? 'h-32' : 'h-[44px]'} pl-[14px] ${props.type === 'password' ? 'pr-10' : 'pr-[14px]'}`
        }
    });
    const formControlClass = computed(() => {
        return 'w-full text-[16px] leading-[24px] border rounded-[8px] placeholder:text-gray-500 text-gray-900 focus:ring-transparent focus-visible:outline-none focus:shadow-input'
    });

    // Methods
    const formatPhoneForFrontend = (phone) => {
        try {
            let phoneValue = phone
                .replace(/\D/g, "")
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

            return !phoneValue[2]
                ? phoneValue[1]
                : '(' + phoneValue[1] + ')' + " " + phoneValue[2] + (phoneValue[3] ? "-" + phoneValue[3] : "");
        } catch (e) {
            return phone;
        }
    }

    const handlePhoneInput = () => {
        value.value = formatPhoneForFrontend(value.value);
    }

    // Watch effects
    watch(() => props.modelValue, (val) => {
        if (props.type === 'phone') {
            // value.value = formatPhoneForFrontend(value.value)
        }
    });

    watch(() => props.autofocus, (val) => {
        if (val && props.type === 'phone') {
            nextTick(() => {
                const inputElement = phoneInputElementRef?.value;
                inputElement.focus();
            });
        }
    }, {immediate: true});
</script>

<template>
    <template v-if="type === 'text' || type === 'number' || type === 'email' || type === 'password'">
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
            <div class="relative">
                <input
                    :type="type === 'password' ? passwordType : type"
                    :id="id"
                    :name="name"
                    v-model="value"
                    :placeholder="placeholder"
                    :readonly="readOnly"
                    :class="[
                        formControlSizeClass,
                        formControlClass,
                        readOnly ? 'text-gray-500 focus:!border-gray-300' : '',
                        errorMessage ? 'border-error-600 focus:border-error-600' : 'border-gray-300 focus:border-primary-300'
                    ]"
                />
                <slot name="input-prepend-action"/>
                <!--<button
                    v-if="type === 'password'"
                    type="button"
                    class="absolute top-[10px] right-4 text-light"
                    @click="passwordType = passwordType === 'password' ? 'text' : 'password'"
                >
                    <i :class="passwordType === 'password' ? 'icon-eye-regular' : 'icon-eye-slash-regular'"/>
                </button>-->
            </div>
            <span
                v-if="inputIcon && type !== 'password'"
                type="button"
                class="absolute top-[10px] right-4 text-light"
            >
                <i :class="inputIcon"/>
            </span>
            <app-input-error v-if="showErrorMessage" :error-message="errorMessage"/>
        </div>
    </template>

    <template v-if="type === 'phone'">
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
            <div class="relative">
                <input
                    ref="phoneInputElementRef"
                    :type="type"
                    :id="id"
                    :name="name"
                    v-model="value"
                    :placeholder="placeholder"
                    :readonly="readOnly"
                    :class="[
                        `!pl-[47px] peer`,
                        formControlSizeClass,
                        formControlClass,
                        readOnly ? 'text-gray-500 focus:!border-gray-300' : '',
                        errorMessage ? 'border-error-600 focus:border-error-600' : 'border-gray-300 focus:border-primary-300'
                    ]"
                />
                <div class="absolute top-1/2 left-[14px] -translate-y-1/2 flex gap-2 items-center text-gray-500 peer-focus:text-gray-900">
                    <NuxtImg width="20" height="20" src="/images/romanian-flag.svg" alt="romanian-flag" />
                    <!-- +40 - -->
                </div>
            </div>
            <app-input-error v-if="showErrorMessage" :error-message="errorMessage"/>
        </div>
    </template>
</template>
