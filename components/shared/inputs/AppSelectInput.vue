<script setup>
    import {useField} from 'vee-validate'
    import {onClickOutside as vOnClickOutside} from '~/directives/clickOutsideDirective'
    import AppInputError from '~/components/shared/inputs/AppInputError.vue'
    import {computed} from "vue";

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
        labelClass: {
            type: String,
            default: '',
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        appearanceFilter: {
            type: Boolean,
            default: false
        },

        // Select
        options: {
            type: Array,
            default: () => {
                return [
                    {title: 'Option 1', value: 'option 1'},
                    {title: 'Option 2', value: 'option 2'},
                    {title: 'Option 3', value: 'option 3'},
                ]
            }
        },
        listTrackBy: {
            type: String,
            default: 'id'
        },
        listValueField: {
            type: String,
            default: 'value'
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        searchSelectPlaceholder: {
            type: String,
            default: ''
        },
        checkAll: {
            type: Boolean,
            default: false
        },
        multiselect: {
            type: Boolean,
            default: false
        },
        checkboxValue: {
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
            default: 'dt-icon-chevron-down'
        },
        inputIcon: {
            type: String,
            default: null
        },
        hideClearIcon: {
            type: Boolean,
            default: true
        },

        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Define Data
    const selectDropdownRefElement = ref(null);
    const selectDropdownMenuPosition = ref('bottom');
    const isOpenSelectMenu = ref(false);
    const checkAllItem = ref(false);
    const searchQuery = ref('');
    const selectedOption = ref();
    const selectedItems = ref(props.modelValue);

    // Define computed
    const formControlSizeClass = computed(() => {
        if (props.inputSize === 'small') {
            return 'h-[36px] px-2.5 py-1.5'
        } else {
            return `h-[44px] pl-[14px] pr-[14px]`
        }
    });
    const formControlClass = computed(() => {
        return 'w-full text-[16px] leading-[24px] border rounded-[8px] placeholder:text-gray-500 focus:ring-transparent focus-visible:outline-none focus:shadow-input'
    });
    const menuAlignmentClass = computed(() => {
        if (props.menuPosition === 'right') return 'right-0';
    });
    const filteredOptions = computed(() => {
        if (!searchQuery.value.length) return props.options;

        return props.options.filter((item) => {
            return item[props.listValueField].toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1
        });
    });
    const filteredOptionNames = computed(() => {
        const filteredArray = props.options.filter((item) => {
            return props.modelValue.includes(item[props.listTrackBy]);
        });

        return filteredArray.map((item) => item[props.listValueField]).join(", ");
    });
    const isEmptyModelValue = computed(() => {
        return !props.modelValue || (Array.isArray(props.modelValue) && props.modelValue.length === 0);
    });

    // Watch effects
    watch(() => isOpenSelectMenu.value, (val) => {
        if (!val) {
            if (props.showSearch) {
                searchQuery.value = '';
            }
        }
    });

    watch(() => selectedItems.value, (val) => {
        emit('update:modelValue', val);
        if (props.multiselect && props.checkAll) {
            checkAllItem.value = val.length === props.options.length;
        }
    });

    // Methods
    const toggleSelectMenu = (e) => {
        const footer = document.querySelector('footer'),
            footerTop = footer?.getBoundingClientRect().top,
            dropdownMenu = selectDropdownRefElement?.value;

        isOpenSelectMenu.value = !isOpenSelectMenu.value;

        if (isOpenSelectMenu.value) {
            nextTick(() => {
                const availableGap = footerTop - e.target.getBoundingClientRect().bottom,
                    dropdownMenuHeight = dropdownMenu?.clientHeight;

                if (dropdownMenuHeight >= availableGap) {
                    selectDropdownMenuPosition.value = 'top';
                } else {
                    selectDropdownMenuPosition.value = 'bottom';
                }
            });
        }
    }

    const closeSelectMenu = (e) => {
        const targetElementId = e.target.getAttribute('id');

        if (targetElementId !== `${props.id}_dropdown_button`) {
            isOpenSelectMenu.value = false;
        }
    }

    const selectDropdownMenuItem = (item) => {
        if (!props.multiselect) {
            selectedOption.value = item;
            emit('update:modelValue', item[props.listTrackBy]);
            toggleSelectMenu();
        }
    }

    const toggleCheckAllItem = () => {
        if (checkAllItem.value) {
            selectedItems.value = props.options.map(item => item[props.listTrackBy]);
        } else {
            selectedItems.value = [];
        }
        emit('update:modelValue', selectedItems.value);
    }

    const clearAll = () => {
        if (props.multiselect) {
            emit('update:modelValue', []);
            selectedItems.value = [];
            checkAllItem.value = false;
        } else {
            emit('update:modelValue', '')
        }
    }
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
        <div class="relative">
            <button
                :id="`${id}_dropdown_button`"
                type="button"
                :class="[
                    `relative whitespace-nowrap text-ellipsis overflow-hidden text-left`,
                    formControlSizeClass,
                    formControlClass,
                    !isEmptyModelValue ? 'text-gray-900' : 'text-gray-500',
                    readOnly ? 'text-gray-500 focus:!border-gray-300' : '',
                    errorMessage ? 'border-error-600 focus:border-error-600' : 'border-gray-300 focus:border-primary-300',
                    {'pr-12': multiselect},
                    // {'bg-gray-100': appearanceFilter && !isEmptyModelValue}
                ]"
                @click="toggleSelectMenu($event)"
            >
                <template v-if="multiselect">
                    {{ modelValue.length ? `${modelValue.length} items selected` : placeholder }}
                </template>
                <template v-else>
                    <slot name="selectedOption" :item="selectedOption">
                        {{
                            modelValue ? filteredOptions.find(option => option[listTrackBy] === modelValue)[listValueField] : placeholder
                        }}
                    </slot>
                </template>
                <button
                    v-if="multiselect && !isEmptyModelValue && !appearanceFilter"
                    type="button"
                    class="absolute right-9 text-light transition hover:text-action"
                    @click="clearAll"
                >
                    <i class="icon-xmark-regular"/>
                </button>
                <i
                    v-if="!hideClearIcon && !isEmptyModelValue"
                    :class="[
                        `icon-x-circle absolute top-1/2 -translate-y-1/2 ${inputSize === 'xs-small' ? 'right-[10px]' : 'right-4'} text-light`,
                        {'!right-9 text-[16px]': !hideClearIcon && !isEmptyModelValue && !appearanceFilter}
                    ]"
                    @click.stop="clearAll"
                    title="Clear selection"
                />
                <i
                    v-else
                    :class="[`absolute top-1/2 -translate-y-1/2 ${inputSize === 'xs-small' ? 'right-[10px]' : 'right-4'} text-light ${dropdownMenuIcon} pointer-events-none`]"
                />
                <i
                    v-if="!hideClearIcon && modelValue && !appearanceFilter"
                    :class="[`absolute top-1/2 -translate-y-1/2 ${inputSize === 'xs-small' ? 'right-[10px]' : 'right-4'} text-light ${dropdownMenuIcon} pointer-events-none`]"
                />
            </button>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <div
                    v-show="isOpenSelectMenu"
                    ref="selectDropdownRefElement"
                    v-on-click-outside="closeSelectMenu"
                    :class="[
                        `w-max min-w-full max-w-max absolute ${menuAlignmentClass} p-[10px] z-50 shadow-elevation-3 rounded-md bg-white focus:outline-none`,
                        {'bottom-full': selectDropdownMenuPosition === 'top'}
                    ]"
                >
                    <div
                        v-if="props.showSearch"
                        class="relative mb-2"
                    >
                        <i class="icon-search absolute top-1/2 left-2.5 -translate-y-1/2"/>
                        <input
                            type="search"
                            class="w-full h-[36px] py-1.5 px-2.5 pl-8 text-gray-900 placeholder:text-gray-500 text-b5 rounded-[6px] border border-gray-300 focus:border-primary-300 focus:ring-transparent focus-visible:outline-none focus:shadow-input"
                            :placeholder="searchSelectPlaceholder"
                            v-model="searchQuery"
                        />
                    </div>
                    <div class="max-h-[208px] overflow-auto custom-scrollbar">
                        <template v-if="multiselect && checkAll">
                            <button
                                type="button"
                                class="w-full py-2 px-4 flex items-center text-gray-500 text-b4 transition hover:text-primary hover:bg-artboard"
                            >
                                <input
                                    :id="`${id}_check_all`"
                                    type="checkbox"
                                    v-model="checkAllItem"
                                    @change="toggleCheckAllItem"
                                    class='h-4 w-4 mr-2 cursor-pointer border-2 border-gray-300 rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
                                />
                                <label :for="`${id}_check_all`">
                                    All
                                </label>
                            </button>
                        </template>
                        <template
                            v-if="filteredOptions.length"
                            v-for="(option, index) in filteredOptions"
                        >
                            <button
                                type="button"
                                class="w-full py-2 px-4 flex items-center text-gray-500 text-b4 transition hover:text-primary"
                                :class="{'text-primary': option[listTrackBy] === value}"
                                @click="selectDropdownMenuItem(option)"
                            >
                                <template v-if="multiselect">
                                    <input
                                        :id="option[listTrackBy]"
                                        type="checkbox"
                                        :value="option[listTrackBy]"
                                        v-model="selectedItems"
                                        class='h-4 w-4 mr-2 cursor-pointer border-2 border-gray-300 rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
                                    />
                                    <label :for="option[listTrackBy]">
                                        <slot name="option" :item="option">
                                            {{ option[listValueField] }}
                                        </slot>
                                    </label>
                                </template>
                                <template v-else>
                                    <slot name="option" :item="option">
                                        {{ option[listValueField] }}
                                    </slot>
                                </template>
                            </button>
                        </template>
                        <template v-else>
                            <span
                                class="w-full py-2 px-4 flex items-center justify-center text-gray-500 text-b4">
                                No items found
                            </span>
                        </template>
                    </div>
                </div>
            </transition>
        </div>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
