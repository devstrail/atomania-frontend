<script setup>
    import {computed} from 'vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'

    // Define props
    const props = defineProps({
        url: {
            type: String,
            default: null
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonSize: {
            type: String,
            default: 'medium'
        },
        buttonColor: {
            type: String,
            default: 'primary'
        },
        buttonType: {
            type: String,
            default: 'button'
        },
        title: {
            type: String,
            default: null
        },
        onClickButton: {
            type: Function,
            default: null
        }
    });

    // Define computed
    const buttonClass = computed(() => {
        let color = '',
            size = '';

        if (props.buttonColor === 'primary') color = `text-white border border-primary-600 disabled:border-primary-200 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 disabled:cursor-not-allowed`;
        else if (props.buttonColor === 'danger') color = `text-white border border-error-600 disabled:border-error-200 bg-error-600 hover:bg-error-700 disabled:bg-error-200 disabled:cursor-not-allowed`;
        else if (props.buttonColor === 'secondary') color = `text-gray-700 disabled:text-gray-300 border border-gray-300 disabled:border-gray-200 bg-white hover:bg-gray-200 disabled:bg-white disabled:cursor-not-allowed`;

        if (props.buttonSize === 'x-small') size = `h-[36px] py-[9px] px-[15px] text-[14px] leading-[20px]`;
        else if (props.buttonSize === 'small') size = `h-[40px] py-[11px] px-[17px] text-[14px] leading-[20px]`;
        else if (props.buttonSize === 'medium') size = `h-[44px] py-[12px] px-[18px] text-[16px] leading-[24px]`;
        else if (props.buttonSize === 'large') size = `h-[48px] py-[15px] px-[21px] text-[16px] leading-[24px]`;
        else if (props.buttonSize === 'x-large') size = `h-[60px] py-[18px] px-[28px] text-[18px] leading-[28px]`;



        return `${props.fullWidth ? 'w-full flex' : 'inline-flex'} gap-2 ${color} font-medium items-center justify-center ${size} rounded-[8px] transition-all`
    });

    const loaderClass = computed(() => {
        let color = '';

        if (props.buttonColor === 'primary') color = `text-primary-300 fill-white`;
        else if (props.buttonColor === 'secondary') color = `text-gray-100 fill-primary-600`;
        else if (props.buttonColor === 'secondary') color = `text-gray-100 fill-primary-600`;

        return `w-4 h-4 ${color}`;
    });
</script>

<template>
    <router-link
        v-if="url"
        :to="url"
        :class="buttonClass"
    >
        <slot>
            {{ title }}
            <app-spinner-loader
                v-if="loading"
                :spinner-style="loaderClass"
            />
        </slot>
    </router-link>
    <button
        v-else
        :type="buttonType"
        :class="buttonClass"
        :disabled="loading || disabled"
        @click="onClickButton"
    >
        <slot>
            {{ title }}
            <app-spinner-loader
                v-if="loading"
                :spinner-style="loaderClass"
            />
        </slot>
    </button>
</template>