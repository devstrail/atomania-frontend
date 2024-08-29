<script setup>
    import {computed} from 'vue';
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';

    // Define props
    const props = defineProps({
        url: {
            type: Object,
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
            default: 'small'
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

        if (props.buttonColor === 'primary') color = `text-white border-primary bg-primary hover:shadow-btn-primary`;
        else if (props.buttonColor === 'danger') color = `text-white border border-danger bg-danger hover:shadow-btn-primary`;
        else if (props.buttonColor === 'secondary') color = `text-grey-300 border border-off-white-200 hover:border-off-white-300 bg-off-white-200 hover:bg-off-white-300`;
        else if (props.buttonColor === 'secondary-dark') color = `text-white border border-grey-200 bg-grey-200 hover:shadow-btn-primary`;
        else if (props.buttonColor === 'secondary-outline') color = `text-grey-300 hover:text-primary border border-off-white-300 hover:border-primary bg-white hover:shadow-btn-primary`;

        if (props.buttonSize === 'medium') size = `py-[9px] text-b4`;
        else if (props.buttonSize === 'large') size = `py-[12px] text-b4`;
        else if (props.buttonSize === 'small') size = `h-[36px] py-[7px] text-b5`;
        else if (props.buttonSize === 'x-small') size = `h-[32px] py-[7px] text-b6`;

        return `${props.fullWidth ? 'w-full flex' : 'inline-flex'} gap-2 ${color} font-semibold items-center justify-center ${size} px-[14px] rounded-[6px] transition disabled:pointer-events-none disabled:opacity-80`
    });

    const loaderClass = computed(() => {
        let color = '';

        if (props.buttonColor === 'primary') color = `text-primary-lighter fill-white`;
        else if (props.buttonColor === 'secondary') color = `text-grey-100 fill-primary`;
        else if (props.buttonColor === 'secondary-outline') color = `text-grey-100 fill-primary`;

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
            <app-spinner-loader v-if="loading" :spinner-style="loaderClass"/>
        </slot>
    </button>
</template>