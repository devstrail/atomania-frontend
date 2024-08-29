<script setup>
    import {computed} from 'vue';
    import {useField} from 'vee-validate';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import {formatDateRangeForFrontend} from '~/utils/index.ts';
    import AppInputError from '~/components/shared/inputs/AppInputError.vue';

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
            default: 'relative w-full mb-8 group'
        },
        appearanceFilter: {
            type: Boolean,
            default: false
        },

        // Datepicker
        range: {
            type: Boolean,
            default: false
        },
        enableTime: {
            type: Boolean,
            default: false
        },
        weekPicker: {
            type: Boolean,
            default: false
        },
        monthPicker: {
            type: Boolean,
            default: false
        },
        yearPicker: {
            type: Boolean,
            default: false
        },
        hideInputIcon: {
            type: Boolean,
            default: false
        },
        hideClearIcon: {
            type: Boolean,
            default: false
        },
        menuPosition: {
            type: String,
            default: 'left'
        },
        showNavigationButton: {
            type: Boolean,
            default: false
        },
        autoApply: {
            type: Boolean,
            default: false
        },

        modelValue: {},
    });

    // Define emits
    const emits = defineEmits(['update:modelValue', 'onChange', 'handleNavigation']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Define computed
    const formControlSizeClass = computed(() => {
        if (props.inputSize === 'small') {
            return '!h-[34px] px-2.5 !py-1.5 !text-b4 !leading-[34px]';
        } else {
            return '!h-[36px] px-3 !py-[10px] !text-b4 !leading-[36px]';
        }
    });
    const formControlClass = computed(() => {
        return '!w-full !border !rounded-[6px] !placeholder:text-placeholder !focus:ring-transparent !focus-visible:outline-none !focus:shadow-input'
    });

    // Define methods
    const formatDate = (date) => {
        if (props.range) {
            return formatDateRangeForFrontend(date);
        }

        if (props.weekPicker) {
            return formatDateRangeForFrontend(value.value);
        }
    }
</script>

<template>
    <div :class="[`range-picker`, formGroupClass]">
        <label
            v-if="label"
            :for="id"
            :class="[
                `text-b6 font-semibold text-dark uppercase bg-white`,
                {'text-danger': errorMessage}
            ]">
            {{ label }}
        </label>
        <div :class="[
            `relative flex items-center gap-[10px] text-grey-300`,

        ]">
            <template v-if="showNavigationButton">
                <button
                    type="button"
                    class="absolute top-1/2 left-3 -translate-y-1/2 z-[100] inline-flex items-center text-b3"
                    @click="emits('handleNavigation', 'previous')"
                >
                    <i class="icon-arrow-left-circle"/>
                </button>
                <button
                    type="button"
                    class="absolute top-1/2 right-3 -translate-y-1/2 z-[100] inline-flex items-center text-b3"
                    @click="emits('handleNavigation', 'next')"
                >
                    <i class="icon-arrow-right-circle"/>
                </button>
            </template>
            <VueDatePicker
                v-model="value"
                :auto-apply="autoApply"
                :enable-time-picker="enableTime"
                :month-picker="monthPicker"
                :week-picker="weekPicker"
                :year-picker="yearPicker"
                :range="range"
                :multi-calendars="range"
                :position="menuPosition"
                :hide-input-icon="hideInputIcon"
                :input-class-name="`${formControlSizeClass} ${formControlClass} !font-sans ${errorMessage ? 'border-danger focus:border-danger' : 'border-off-white-400 focus:border-info'} ${hideInputIcon ? '' : 'pl-8'} ${hideClearIcon ? 'hide-clear-icon' : '!pr-[30px]'} ${hideInputIcon && hideClearIcon ? '!text-center' : 'text-left'} ${showNavigationButton ? '!px-10' : ''} ${appearanceFilter && value ? '!bg-off-white-200' : ''}`"
                :menu-class-name="`!p-2 !font-sans shadow-lg ${menuPosition === 'right' ? 'dp--menu-wrapper_right' : null} ${monthPicker ? 'dp--menu-wrapper_month' : null}`"
                calendar-cell-class-name="!font-sans !text-b4"
                :placeholder="placeholder"
                :format="formatDate"
                @update:model-value="emits('onChange', value)"
            >
                <template #clear-icon="{ clear }">
                    <div class="pr-3">
                        <i class="icon-x-circle" @click="clear"/>
                    </div>
                </template>
            </VueDatePicker>
        </div>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>

<style>
    @import '@vuepic/vue-datepicker/dist/main.css';

    .dp__theme_light {
        --dp-background-color: #fff;
        --dp-text-color: #6C7287;
        --dp-hover-color: #f3f3f3;
        --dp-hover-text-color: #212121;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #F78E1E;
        --dp-primary-disabled-color: #f1b678;
        --dp-primary-text-color: #f8f5f5;
        --dp-secondary-color: #c0c4cc;
        --dp-border-color: #ddd;
        --dp-menu-border-color: #F6F7FB;
        --dp-border-color-hover: #aaaeb7;
        --dp-disabled-color: #f6f6f6;
        --dp-scroll-bar-background: #f3f3f3;
        --dp-scroll-bar-color: #959595;
        --dp-success-color: #76d275;
        --dp-success-color-disabled: #a3d9b1;
        --dp-icon-color: #959595;
        --dp-danger-color: #ff6f60;
        --dp-marker-color: #ff6f60;
        --dp-tooltip-color: #fafafa;
        --dp-disabled-color-text: #8e8e8e;
        --dp-highlight-color: rgb(25 118 210 / 10%);
        --dp-range-between-dates-background-color: #F78E1E33;
        --dp-range-between-dates-text-color: #6C7287;
        --dp-range-between-border-color: #F78E1E33;
        --dp-border-radius: 6px;
        --dp-preview-font-size: 12px;
        --dp-action-button-height: 36px;
        --dp-action-buttons-padding: 9px 14px;
    }

    .range-picker .hide-clear-icon ~ .dp__clear_icon {
        display: none;
    }

    .range-picker .dp__cell_inner,
    .range-picker .dp__range_between {
        border: none;
    }

    .range-picker .dp--menu-wrapper_right {
        .dp__arrow_top {
            left: auto;
            right: 10px;
        }

        .dp__arrow_bottom {
            left: auto;
            right: 10px;
        }
    }

    .dp__input::placeholder {
        color: #454B5F;
    }
</style>
