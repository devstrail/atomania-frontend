<script setup>
    import {ref, watch} from 'vue';
    import {useField} from 'vee-validate';
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

        // File
        fileType: {
            type: String,
            default: 'image.*'
        },
        acceptedFileTypes: {
            type: String,
            default: '.png, .jpg, .jpeg, .webp'
        },
        fileUploaderType: {
            type: String,
            default: 'avatar'
        },
        fileUploaderLabel: {
            type: String,
            default: 'Browse'
        },
        showRemoveFile: {
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


    // Methods
    const handleFileInput = (e) => {
        if (!e.currentTarget.files.length) {
            return
        }

        const previewWrapper = document.querySelector(`#imagePreview${props.id}`);

        let file = e.currentTarget.files[0],
            reader = new FileReader(),
            fileType = new RegExp(props.fileType);

        if (!file?.type.match(fileType)) {
            console.error('File type not supported');
        } else if (!file) {
            console.error('Not A File!');
        } else {
            reader.onload = () => {
                previewWrapper.style.backgroundImage = `url('${reader.result}')`;
            }
            reader.readAsDataURL(file);
            emit('update:modelValue', file);
        }
    }

    const removeFile = () => {
        const previewWrapper = document.querySelector(`#imagePreview${props.id}`);

        value.value = null;
        previewWrapper.style.backgroundImage = ``;
    }
</script>

<template>
    <template v-if="type === 'file'">
        <label
            v-if="label"
            :class="[`block mb-3 text-b6 font-semibold text-dark uppercase bg-white`]">
            {{ label }}
        </label>
        <div
            class="w-full h-[240px] relative flex flex-col items-center justify-between border border-dashed border-off-white-400 rounded">
            <div
                :id="`imagePreview${id}`"
                class="w-full h-full relative bg-contain bg-center bg-no-repeat"
                :style="`background-image: url(${value ? value : ''})`"
            >

                <button
                    type="button"
                    v-if="value"
                    class="absolute top-3 right-3 flex gap-2 items-center px-3 py-1 text-white text-b5 rounded-[20px] bg-danger"
                    @click.prevent="removeFile"
                >
                    <i class="icon-xmark-regular"/> Remove
                </button>
            </div>
            <div v-if="!value" class="w-full h-full absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <span class="block mb-1 font-semibold text-b4">Upload Image</span>
                <span class="block mb-3 text-b6">Supported files are JPG, JPEG, PNG</span>
                <label
                    :for="id"
                    class="flex items-center gap-[6px] py-[8px] px-4 text-info hover:text-white font-semibold text-b6 rounded-lg border-off-white-300 hover:bg-info cursor-pointer shadow-elevation-1 transition"
                >
                    <input
                        type="file"
                        :id="id"
                        class="sr-only"
                        :accept="acceptedFileTypes"
                        @change="handleFileInput($event)"
                    />
                    <i class="icon-file-plus text-b4"/> {{ fileUploaderLabel }}
                </label>
            </div>
            <app-input-error :error-message="errorMessage"/>
        </div>
    </template>
</template>
